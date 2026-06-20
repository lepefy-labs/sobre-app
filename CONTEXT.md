# SOBRE — Contesto di Progetto

## Prodotto
PWA di benessere per pubblico adulto 30–45, mercati IT e FR.
- **Nome:** Sobre
- **Dominio:** sobrewellness.app (già associato a Vercel)
- **Payoff:** "L'energia giusta, dove conta."
- **Tono:** caldo ma adulto, distacco emotivo come forza consapevole
- **Target:** originariamente femminile 30–45, ora volutamente neutro per non escludere altri segmenti — nessuna label UI deve essere connotata al femminile/maschile

## Business Model
- **Free:** contenuto da libreria manuale (210 items totali — 10 originali + 200 espansione, target raggiunto)
- **Pro:** €3.99/mese o €29.99/anno — contenuto generato da Claude Haiku in batch notturno basato su mood + profilo
- Domenica sera: nessuna notifica (scelta editoriale di brand)
- Break-even stimato: ~35 abbonati Pro

## Stack Tecnico
- Next.js 14 App Router
- Supabase (PostgreSQL + Auth + RLS)
- Tailwind CSS
- Vercel (deploy)
- OneSignal (push notifications Web — **integrato e funzionante**)
- Stripe (subscription)
- Claude API Haiku (batch notturno Pro)
- Resend (email transazionale, SMTP custom configurato)
- Railway (sobre-batch: generate.js + notify.js, due servizi separati stesso progetto)
- PostHog (analytics — pianificato, non ancora integrato)

## Repo e Infrastruttura
- **GitHub:** github.com/lepefy-labs/sobre-app (privata, org lepefy-labs)
- **Batch repo:** github.com/lepefy-labs/sobre-batch (separata) ✅ DEPLOYED
  - Servizio `generate.js` — batch notturno Pro (cron 23:00 CET)
  - Servizio `notify.js` — invio push notifications (cron */15 min) ✅ NUOVO, completato in questa sessione
- **Vercel:** sobre-app.vercel.app + sobrewellness.app
- **Supabase:** org "Sobre", progetto attivo con schema completo
- **Resend:** dominio robertinboukeng.com verificato, sender ciao@robertinboukeng.com
- **Railway:** piano mensile attivo, entrambi i servizi batch deployati e funzionanti
- **OneSignal:** app Web Push configurata e funzionante (Custom Code, non Typical Site)
- **NOTA:** la repo `sobre-app` non aveva (e tuttora non ha avuto bisogno fino ad ora di) cartella `public/` standard — è stata creata in questa sessione per i file Service Worker OneSignal (vedi sezione dedicata)

## Supabase URL Configuration
- **Site URL:** https://www.sobrewellness.app
- **Redirect URLs:**
  - https://sobre-app.vercel.app/api/auth/callback (sviluppo)
  - https://www.sobrewellness.app/api/auth/callback (produzione)

## Workflow di Sviluppo
- Robertin lavora **solo via interfacce web** — no CLI, no terminale locale
- **Claude Code** scrive e corregge il codice, ha accesso diretto alla repo, consegna zip da caricare su GitHub
- **Claude chat** progetta, decide architettura, prepara prompt per Claude Code
- Ogni prompt a Claude Code deve chiedere uno **zip con i file modificati**
- Per inventari o analisi sulla repo (es. ricerca stringhe hardcoded), chiedere direttamente a Claude Code invece di lavorare sui file allegati in chat — ha accesso diretto e risultati più precisi
- Principio: proporre soluzioni con pro/contro prima di implementare
- Modifiche a singola riga o upload file statici: Robertin le fa direttamente via GitHub web UI senza passare da Claude Code

## Stato Attuale — Completato ✅

### sobre-app (Next.js su Vercel)
1. Struttura Next.js 14 App Router completa
2. Schema Supabase completo (profiles, subscriptions, contents, moods, notifications + RLS + trigger)
3. Seed contenuti — 210 totali: 10 originali (`contents.sql`) + 200 nuovi (`contents_v2.sql`)
4. Auth magic link funzionante end-to-end (SMTP custom via Resend, callback con verifyOtp, middleware protezione rotte)
5. Dashboard home — content card del giorno + mood check-in 5 tap
6. Onboarding — lingua, orari notifiche, nome, set onboarding_completed = true
7. Stripe integrazione completa — checkout Pro + webhook + aggiornamento subscription_status (end-to-end testato)
8. Free-user banner su dashboard home
9. Landing page — sezioni in `app/landing/` con i18n proprio separato dal resto dell'app
10. i18n UI app — sistema traduzione IT/FR senza librerie esterne (lib/i18n/) con pagina /lang pre-login
11. Mood check-in — 5 livelli: very_low / low / neutral / good / great
12. Routing landing/lang/dashboard — risolto conflitto tra root pubblica e flusso autenticato
13. **OneSignal Web Push** ✅ NUOVO — vedi sezione dedicata sotto

### sobre-batch (Node.js ESM su Railway) ✅

**Servizio `generate.js`** — batch notturno Pro
- Cron: ogni notte alle 23:00 CET
- Legge utenti Pro da Supabase (service role, bypassa RLS)
- Per ogni utente: legge mood serale + profilo, genera thought (morning) + story/tip (evening) via Claude Haiku
- Inserisce in `contents` con source='claude-haiku', generated_for_user, generated_at, **slot** (confermato valorizzato correttamente in tabella)
- Deduplicazione: skippa utenti già processati oggi
- Domenica sera: nessuna generazione (brand decision)
- Fix storico: strip backtick markdown prima del JSON.parse (Claude Haiku wrappa la risposta)

**Servizio `notify.js`** — invio push notifications ✅ NUOVO, completato in questa sessione
- Cron: ogni 15 minuti (`*/15 * * * *`)
- Stesso repo `sobre-batch`, servizio Railway separato con Custom Start Command `node notify.js`
- Per ogni slot (morning/evening), per ogni utente con `onesignal_player_id` non nullo e slot abilitato:
  - Calcola ora/data locale utente da `profiles.timezone` (Intl.DateTimeFormat, no librerie esterne)
  - Logica "in debito": invia se `notif_{slot}_time <= ora_locale_corrente` E non esiste già riga in `notifications` per (user_id, slot, sent_date oggi locale) — pattern di recupero automatico, non finestra temporale, scelto esplicitamente per resilienza a crash/restart del processo
  - Domenica sera: skip silenzioso (stessa regola di generate.js)
  - Contenuto: Pro → query diretta su `contents` (generated_for_user + slot + generated_at oggi); se non trovato, fallback su endpoint Free. Free → chiama `GET {SOBRE_APP_URL}/api/internal/content-for-user` con header `x-internal-secret`
  - Invio via OneSignal REST API, poi insert in `notifications` con `onesignal_notification_id`
  - Errori di invio: NON salvati in notifications (retry al giro successivo), webhook opzionale a n8n se configurato (`N8N_ALERT_WEBHOOK_URL`), nessun blocco del loop per gli altri utenti
- Variabili Railway (servizio notify.js): `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (duplicate manualmente dal servizio generate.js — niente shared variables tra servizi confermato funzionante), `ONESIGNAL_APP_ID`, `ONESIGNAL_REST_API_KEY`, `SOBRE_APP_URL`, `INTERNAL_API_SECRET`, `N8N_ALERT_WEBHOOK_URL` (opzionale, non ancora configurata)
- Testato end-to-end con successo: invio reale ricevuto, riga `notifications` creata con `sent_date` corretto, nessun doppio invio al giro cron successivo

## OneSignal Web Push — Setup Completo ✅ (sessione corrente)

### Architettura
```
sobre-app (Vercel)
  components/OneSignalInit.tsx — client component, montato in app/dashboard/layout.tsx
    inizializza SDK OneSignal Web, cattura player_id, salva via server action
  server action saveOneSignalPlayerId() — update profiles.onesignal_player_id
  app/api/internal/content-for-user/route.ts — endpoint interno per contenuto Free,
    autenticato via header x-internal-secret, usato da notify.js

sobre-batch (Railway, servizio notify.js)
  cron */15 min, logica "in debito" descritta sopra

OneSignal Dashboard
  App configurata in modalità "Custom Code" (non "Typical Site")
  → richiede gestione esplicita nel codice di init + richiesta permesso
  → NESSUNA gestione automatica del prompt da parte di OneSignal
```

### File statici critici
- `public/OneSignalSDKWorker.js` — Service Worker scaricato dal dashboard OneSignal (v16), DEVE stare nella root di `public/`, non in sottocartelle, perché lo scope del Service Worker dipende dal path URL
- La cartella `public/` NON esisteva nella repo prima di questa sessione — creata appositamente
- File creato via GitHub web UI: "Create new file" con path `public/OneSignalSDKWorker.js` (GitHub crea la cartella automaticamente da un path con `/`)

### Problemi riscontrati e risolti in questa sessione
1. **Permesso browser su "chiedi" mai attivato** — causa radice: modalità "Custom Code" su OneSignal richiede chiamata esplicita a `OneSignal.Notifications.requestPermission()` (o equivalente SDK) nel codice, non scatta automaticamente come in "Typical Site". **Verificare se questa chiamata esplicita è presente in OneSignalInit.tsx — PUNTO APERTO, vedi sotto.**
2. **Errore console "App not configured for web push"** — causa: canale Web Push mai completato nel dashboard OneSignal (configurazione Platforms → Web mancante). Risolto completando il wizard di configurazione Web sul dashboard OneSignal.
3. **Service Worker non raggiungibile** — causa: file caricato erroneamente sotto `app/` invece che `public/` (cartella inesistente nella repo). In App Router, solo `public/` è servita staticamente dalla root del dominio; tutto sotto `app/` è gestito dal router Next.js. Risolto creando `public/` e ricaricando il file nel path corretto.

### Punto aperto — da verificare/sistemare
**Richiesta esplicita di permesso non confermata in codice.** Il flusso ha funzionato sulla macchina di test solo dopo aver impostato manualmente il permesso browser su "Consenti" da pannello impostazioni — non è stato confermato che il prompt nativo del browser compaia spontaneamente per un nuovo utente reale. Prossima sessione: verificare in `OneSignalInit.tsx` se è presente una chiamata esplicita di richiesta permesso; se assente, è il fix prioritario prima che altri utenti reali (beta tester Fase 0) possano effettivamente sottoscriversi alle notifiche.

### Campo `notifications.opened_at` — non implementato, di proposito
Resta sempre `null`. Richiederebbe un click handler OneSignal lato client (`notificationClick`) che aggiorni la riga al click sulla notifica. Non bloccante per il prodotto attuale (regola "ricevi, poi reagisci" — il contenuto si vede comunque aprendo l'app, indipendentemente dal click sulla notifica). Deciso di rimandare l'implementazione al blocco PostHog, dove ha senso decidere insieme se trattarlo come evento analytics, aggiornamento DB diretto, o entrambi.

## Routing — Architettura Definitiva

```
/ (root)
  → utente loggato → redirect /dashboard/home
  → utente non loggato → mostra LandingPage (da app/landing/)
       → CTA "Inizia gratis" / "Prova Pro" → /lang → /auth/login → ...

PWA installata (start_url: /dashboard/home)
  → utente loggato → dashboard diretta
  → utente non loggato → middleware redirige a /auth/login (corretto, non serve landing in PWA)
```

**Middleware (`middleware.ts`):** utente loggato che tenta di accedere a `/auth/login`, `/lang`, o `/landing` viene rediretto a `/dashboard/home`. Matcher esclude `_next/static`, `_next/image`, `favicon.ico`, `sitemap.xml`, `robots.txt` — non esclude esplicitamente i file OneSignal in `public/`, ma non risulta causare problemi (file statici in `public/` serviti correttamente).

**File chiave:**
- `app/page.tsx` — Server Component, controlla sessione via `createClient().auth.getUser()`, mostra `LandingPage` o fa redirect
- `app/landing/page.tsx` — orchestratore sezioni
- `app/landing/*.tsx` — sezioni individuali, CTA puntano a `/lang`

## i18n — Architettura Implementata
```
lib/i18n/
  types.ts      ← tipo Translations
  it.ts         ← dizionario italiano
  fr.ts         ← dizionario francese
  index.ts      ← getT(lang), getLangFromStorage(), setLangInStorage()

app/lang/page.tsx  ← selezione lingua pre-login (salva in localStorage)
```

**Flusso lingua:**
- Utente non autenticato: localStorage → fallback 'it'
- Utente autenticato: profiles.lang da DB (fonte di verità)
- Onboarding: pre-seleziona lingua da localStorage, aggiorna UI in tempo reale al cambio

**Nota:** `app/landing/` ha gestione i18n propria separata (componente `LangToggle.tsx`) — non collegata a `lib/i18n/`.

## Mood Check-in — Stato Attuale
5 livelli:

| Value | IT | FR |
|-------|----|----|
| very_low | A zero | À vide |
| low | Giù | Pas top |
| neutral | Così così | Bof |
| good | Bene | Bien |
| great | Carica | Au top |

Label neutre per genere. Label FR riviste per tono e lunghezza (bottone a 5 elementi su mobile).

## Espansione Libreria Contenuti — 10 → 210 (completato)
- **File:** `supabase/seed/contents_v2.sql`
- Lingua: 100 IT + 100 FR
- Type: 68 thought (morning), 64 story (evening), 68 tip (morning/evening split)
- mood_target: 100 null + 100 distribuiti sui 5 valori, sovrappeso intenzionale su very_low/low
- Blocchi tematici: Lavoro e confini, Relazioni e spazio personale, Corpo e ritmo, Identità e tempo
- Vocabolario tag fissato (16 tag): energia, lavoro, relazioni, corpo, mente, confini, routine, presenza, resilienza, silenzio, rituali, priorità, emozioni, leggerezza, tempo, autocura
- Nota per espansioni future: stesso processo per arrivare a 500+ post-launch

## Stripe — Completato ✅
- Checkout hosted, toggle mensile/annuale (annuale pre-selezionato, badge "Risparmia il 37%")
- Webhook: checkout.session.completed, customer.subscription.updated, customer.subscription.deleted
- End-to-end testato

## Prodotto — Logica Contenuti
- 2 notifiche/giorno: mattino (pensiero breve + mood check-in) e sera (storia o consiglio)
- Mood check-in: 5 tap non bloccanti, sotto la content card
- **Regola "Ricevi, poi reagisci"**: il contenuto non è mai bloccato dall'azione dell'utente. Regola UX permanente.
- Free: contenuto random dalla libreria filtrato per lingua + mood
- Pro: contenuto generato da Claude Haiku la notte precedente via batch Railway
- **Push notifications** ora attive per consegna proattiva di entrambi gli slot (vedi sezione OneSignal)

## Database — Tabelle Principali
- `profiles` — utente, lingua, timezone, preferenze notifiche, onesignal_player_id
- `contents` — libreria contenuti (type, lang, mood_target, slot, tags, source)
- `moods` — check-in giornaliero (max 2/die: morning + evening)
- `notifications` — log invii con deduplicazione (campo `opened_at` non popolato, vedi punto aperto sopra)
- `subscriptions` — dati Stripe

## Enum DB
- content_type: thought | story | tip
- mood_value: very_low | low | neutral | good | great
- notification_slot: morning | evening
- subscription_status: free | pro | cancelled | past_due

## Note Tecniche Importanti
- `pg_cron` non disponibile su Supabase free — batch e notify schedulati via Railway
- Il callback auth NON usa createClient() da next/headers — client inline con cookie manuali sul NextResponse
- RLS upsert trap: usare `.update()` puro su profiles (non `.upsert()`)
- Claude Haiku wrappa le risposte JSON in backtick markdown — fare strip prima del parse
- `createServiceClient()` richiesto nelle webhook routes e negli endpoint interni per bypassare RLS
- `subscriptions` upsert: usare `onConflict: 'stripe_subscription_id'`; evitare `onConflict: 'user_id'`
- Mobile-width layout (`max-w-sm mx-auto`) usato per test desktop; prodotto live è mobile PWA
- Root `/` deve verificare la sessione prima di decidere se mostrare landing o fare redirect
- Migrazioni enum Postgres vanno eseguite manualmente su Supabase SQL Editor PRIMA del deploy
- **Railway: le variabili d'ambiente NON sono condivise automaticamente tra servizi nello stesso progetto** — vanno duplicate manualmente per servizio, oppure collegate esplicitamente come reference se l'opzione è disponibile nell'interfaccia
- **Railway: ogni deploy di un servizio con Cron Schedule esegue il comando una volta subito dopo il deploy**, indipendentemente dall'orario cron configurato — comportamento di piattaforma, non evitabile via configurazione. Reso innocuo dalla logica di idempotenza di notify.js e dalla deduplicazione di generate.js; non richiede fix
- **Next.js App Router: solo `public/` è servita come file statico dalla root del dominio** — file sotto `app/` sono sempre gestiti dal router, mai serviti 1:1. Cartella `public/` va creata esplicitamente se non esiste
- **OneSignal "Custom Code" mode**: a differenza di "Typical Site", richiede gestione esplicita nel codice sia dell'init sia (probabilmente) della richiesta di permesso — non automatico. Verifica nella prossima sessione

## Launch Strategy — Decisioni Prese
- **Fase 0:** outreach personale a 20–30 contatti nel target → reclutare ~10 beta tester (accesso Pro gratuito in cambio di feedback)
- **Fase 1 (zero-budget):** community online esistenti per donne professioniste (entrambi i mercati), lancio su Product Hunt + Indie Hackers, landing page SEO minimali, scambi promozionali con newsletter piccole
- **Fase 2:** canale audience proprio (Substack o video brevi) solo dopo break-even
- **Fase 3:** Meta Ads solo dopo validazione del tasso di conversione organico
- **Mercato:** lancio simultaneo IT + FR, partendo da zero social, budget marketing sotto €100/mese nei primi 3 mesi
- PostHog per funnel tracking dal giorno 1 di lancio

## Pre-Launch Checklist
- Verifica trademark su tmdn.org (Classi 9, 42, 44) via EUIPO
- Logo — deferred; percorso consigliato: Brandmark.io o Fiverr (concept S selezionato)
- ~~OneSignal push notifications~~ ✅ COMPLETATO (punto aperto: verifica richiesta esplicita permesso)
- PWA Service Worker — nota: Service Worker OneSignal già presente in public/, verificare se serve anche un Service Worker applicativo separato per funzionalità PWA standard (offline, cache) o se sono gestibili insieme
- Seed 200+ contenuti libreria Free ✅ (210 totali, completato)
- Integrazione PostHog (includerà anche tracking apertura notifiche, vedi nota opened_at)

## Prossimi Blocchi da Costruire (in ordine)
1. **Verifica/fix richiesta esplicita permesso OneSignal** — priorità alta, blocca l'onboarding reale dei beta tester
2. **PWA Service Worker applicativo** — chiarire sovrapposizione con Service Worker OneSignal già presente
3. **PostHog** — funnel tracking + eventuale tracking apertura notifiche (opened_at)
4. **Launch** — eseguire go-to-market
