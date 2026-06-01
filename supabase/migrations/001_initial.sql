-- ============================================================
-- SOBRE - Schema iniziale v1
-- ============================================================

-- Abilita estensioni necessarie
create extension if not exists "uuid-ossp";
create extension if not exists "pg_cron"; -- per batch notturno (opzionale su Supabase Pro)

-- ============================================================
-- ENUM TYPES
-- ============================================================

create type content_type as enum ('thought', 'story', 'tip');
create type content_lang as enum ('it', 'fr');
create type mood_value as enum ('low', 'neutral', 'good', 'great');
create type notification_slot as enum ('morning', 'evening');
create type subscription_status as enum ('free', 'pro', 'cancelled', 'past_due');

-- ============================================================
-- TABLE: profiles
-- Estende auth.users con dati applicativi
-- ============================================================

create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  name text,
  avatar_url text,
  lang content_lang not null default 'it',
  timezone text not null default 'Europe/Rome',
  -- Preferenze notifiche
  notif_morning_enabled boolean not null default true,
  notif_morning_time time not null default '08:00',
  notif_evening_enabled boolean not null default true,
  notif_evening_time time not null default '21:00',
  -- OneSignal
  onesignal_player_id text,
  -- Stato abbonamento (cache locale da subscriptions)
  subscription_status subscription_status not null default 'free',
  -- Onboarding
  onboarding_completed boolean not null default false,
  -- Timestamps
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Trigger: updated_at automatico
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

-- Trigger: crea profilo automaticamente al signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- TABLE: subscriptions
-- Dati Stripe per abbonamento Pro
-- ============================================================

create table public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  stripe_price_id text,
  status subscription_status not null default 'free',
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger subscriptions_updated_at
  before update on public.subscriptions
  for each row execute procedure public.handle_updated_at();

create index idx_subscriptions_user_id on public.subscriptions(user_id);
create index idx_subscriptions_stripe_customer on public.subscriptions(stripe_customer_id);

-- ============================================================
-- TABLE: contents
-- Libreria manuale + contenuti generati da Claude
-- ============================================================

create table public.contents (
  id uuid default uuid_generate_v4() primary key,
  type content_type not null,
  lang content_lang not null default 'it',
  -- Contenuto
  title text,                          -- titolo opzionale (per storie)
  body text not null,                  -- testo principale
  source text,                         -- "manual" | "claude-haiku"
  -- Targeting mood (null = universale)
  mood_target mood_value,
  -- Slot notifica consigliato
  slot notification_slot,
  -- Tags tematici liberi (energia, lavoro, relazioni, corpo, mente)
  tags text[] default '{}',
  -- Attivo/disattivo senza eliminare
  is_active boolean not null default true,
  -- Se generato da Claude: riferimento all'utente target (batch notturno)
  generated_for_user uuid references public.profiles(id) on delete set null,
  generated_at timestamptz,
  created_at timestamptz not null default now()
);

create index idx_contents_type on public.contents(type);
create index idx_contents_lang on public.contents(lang);
create index idx_contents_mood_target on public.contents(mood_target);
create index idx_contents_slot on public.contents(slot);
create index idx_contents_active on public.contents(is_active);

-- ============================================================
-- TABLE: moods
-- Check-in umore giornaliero (max 2/die: mattino + sera)
-- ============================================================

create table public.moods (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  value mood_value not null,
  slot notification_slot not null,
  -- Nota libera opzionale (max 280 caratteri)
  note text check (char_length(note) <= 280),
  -- Data locale dell'utente (per query "oggi")
  recorded_date date not null default current_date,
  created_at timestamptz not null default now(),
  -- Un solo check-in per slot per giorno
  unique(user_id, slot, recorded_date)
);

create index idx_moods_user_date on public.moods(user_id, recorded_date desc);

-- ============================================================
-- TABLE: notifications
-- Log delle notifiche inviate (evita duplicati + analytics)
-- ============================================================

create table public.notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  content_id uuid references public.contents(id) on delete set null,
  slot notification_slot not null,
  -- Stato delivery OneSignal
  onesignal_notification_id text,
  sent_at timestamptz not null default now(),
  -- Interazione utente
  opened_at timestamptz,
  -- Data locale per de-duplicazione giornaliera
  sent_date date not null default current_date,
  -- Evita di inviare stesso contenuto due volte allo stesso utente
  unique(user_id, content_id),
  -- Un solo invio per slot per giorno
  unique(user_id, slot, sent_date)
);

create index idx_notifications_user_slot on public.notifications(user_id, slot, sent_date);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.contents enable row level security;
alter table public.moods enable row level security;
alter table public.notifications enable row level security;

-- Profiles: utente vede solo se stesso
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Subscriptions: utente vede solo la propria
create policy "Users can view own subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- Contents: tutti gli utenti autenticati vedono contenuti attivi
create policy "Authenticated users can view active contents"
  on public.contents for select
  to authenticated
  using (is_active = true);

-- Moods: utente vede e gestisce solo i propri
create policy "Users can view own moods"
  on public.moods for select
  using (auth.uid() = user_id);

create policy "Users can insert own moods"
  on public.moods for insert
  with check (auth.uid() = user_id);

create policy "Users can update own moods"
  on public.moods for update
  using (auth.uid() = user_id);

-- Notifications: utente vede solo le proprie
create policy "Users can view own notifications"
  on public.notifications for select
  using (auth.uid() = user_id);

create policy "Users can update own notifications (opened_at)"
  on public.notifications for update
  using (auth.uid() = user_id);

-- ============================================================
-- FUNZIONE: get_today_content
-- Restituisce il contenuto del giorno per utente + slot
-- (usata dal dashboard per mostrare contenuto corrente)
-- ============================================================

create or replace function public.get_today_content(
  p_user_id uuid,
  p_slot notification_slot
)
returns table (
  content_id uuid,
  content_type content_type,
  title text,
  body text,
  tags text[]
) as $$
declare
  v_last_mood mood_value;
  v_lang content_lang;
begin
  -- Recupera lingua utente
  select lang into v_lang from public.profiles where id = p_user_id;

  -- Recupera ultimo mood registrato oggi per questo slot
  select value into v_last_mood
  from public.moods
  where user_id = p_user_id
    and recorded_date = current_date
    and slot = p_slot
  limit 1;

  -- Cerca contenuto dalla notifica di oggi (se già inviato)
  return query
  select c.id, c.type, c.title, c.body, c.tags
  from public.notifications n
  join public.contents c on c.id = n.content_id
  where n.user_id = p_user_id
    and n.slot = p_slot
    and n.sent_date = current_date
  limit 1;
end;
$$ language plpgsql security definer;
