# SOBRE — Contesto di Progetto

## Prodotto
PWA + App Android nativa di benessere per pubblico adulto 30–45, mercati IT e FR.
- **Nome:** Sobre
- **Dominio:** sobrewellness.app (associato a Vercel)
- **Payoff:** "L'energia giusta, dove conta."
- **Tono:** caldo ma adulto, distacco emotivo come forza consapevole
- **Target:** originariamente femminile 30–45, ora volutamente neutro per non escludere altri segmenti — nessuna label UI deve essere connotata al femminile/maschile

## ⚠️ Pivot Strategico Maggiore (sessione corrente)
**L'app nativa Android (Play Store) è ora il CANALE PRIMARIO di lancio, non la PWA.**
- App nativa Android = focus principale, dal day 1 del lancio
- PWA via browser resta funzionante ma è secondaria/non prioritaria
- iOS rimandato a fase successiva (non bloccante per il lancio)
- Tecnologia scelta: **Capacitor** (wrappa il codice Next.js esistente, nessuna riscrittura)
- Decisione presa dopo analisi pro/contro: GitHub Actions (gratuito) preferito a servizi di build cloud dedicati (es. Capawesome), anche perché **Ionic Appflow è stato dismesso** (chiusura annunciata, nessun nuovo cliente accettato, supporto solo fino al 31/12/2027 per clienti esistenti) — confermato non più un'opzione valida per progetti nuovi

## Business Model
- **Free:** contenuto da libreria manuale (210 items totali — 10 originali + 200 espansione, target raggiunto)
- **Pro:** €3.99/mese o €29.99/anno — contenuto generato da Claude Haiku in batch notturno basato su mood + profilo
- Domenica sera: nessuna notifica (scelta editoriale di brand)
- Break-even stimato: ~35 abbonati Pro
- **Diritto di recesso:** 14 giorni standard UE per abbonamenti Pro, nessuna rinuncia esplicita richiesta in checkout (decisione presa esplicitamente — niente clausola di esclusione, evita rischio di clausola vessatoria non opponibile)

## Stack Tecnico
- Next.js 14 App Router
- **Capacitor** (wrapper Android nativo, server.url remoto verso Vercel — NUOVO)
- Supabase (PostgreSQL + Auth + RLS)
- Tailwind CSS
- Vercel (deploy web, serve sia browser che WebView Capacitor)
- OneSignal (push: Web SDK funzionante; integrazione nativa Capacitor in corso)
- Stripe (subscription)
- Claude API Haiku (batch notturno Pro)
- Resend (email transazionale, SMTP custom configurato)
- Railway (sobre-batch: generate.js + notify.js, due servizi separati stesso progetto)
- GitHub Actions (build Android debug + release — NUOVO)
- PostHog (analytics — pianificato, non ancora integrato)

## Repo e Infrastruttura
- **GitHub:** github.com/lepefy-labs/sobre-app (privata, org lepefy-labs)
  - **NUOVO:** ora include anche `android/` (progetto Gradle Capacitor) e `.github/workflows/` (build Android)
- **Batch repo:** github.com/lepefy-labs/sobre-batch (separata) ✅ DEPLOYED
  - Servizio `generate.js` — batch notturno Pro (cron 23:00 CET)
  - Servizio `notify.js` — invio push notifications (cron */15 min) ✅ deployato e testato
- **Vercel:** sobre-app.vercel.app + sobrewellness.app
- **Supabase:** org "Sobre", progetto attivo con schema completo
- **Resend:** dominio robertinboukeng.com verificato, sender ciao@robertinboukeng.com
- **Railway:** piano mensile attivo, entrambi i servizi batch deployati e funzionanti
- **OneSignal:** Web Push configurato e funzionante; plugin nativo Capacitor in fase di integrazione
- **Google Play Console:** account creato, **verifica identità in corso** (bloccante per Internal Testing — vedi sezione dedicata)
- **NOTA:** cartella `public/` creata in sessione precedente per i file Service Worker OneSignal

## Supabase URL Configuration
- **Site URL:** https://www.sobrewellness.app
- **Redirect URLs:**
  - https://sobre-app.vercel.app/api/auth/callback (sviluppo)
  - https://www.sobrewellness.app/api/auth/callback (produzione)

## Workflow di Sviluppo
- Robertin lavora **solo via interfacce web** — no CLI, no terminale locale
  - **Eccezione concordata:** GitHub Codespaces è usato per operazioni che richiedono un comando locale isolato e sicuro (es. generazione keystore Android, estrazione fingerprint SHA-256, uso di `bundletool`) — resta "via web" nel senso che non richiede nulla installato sul PC di Robertin, ma è un terminale (Codespace), da tenere a mente come eccezione esplicita al vincolo "no CLI"
- **Claude Code** scrive e corregge il codice, ha accesso diretto alla repo, consegna zip da caricare su GitHub
- **Claude chat** progetta, decide architettura, prepara prompt per Claude Code
- Ogni prompt a Claude Code deve chiedere uno **zip con i file modificati**
- Per inventari o analisi sulla repo, chiedere direttamente a Claude Code invece di lavorare sui file allegati in chat
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
13. **OneSignal Web Push** ✅ completato e testato end-to-end
14. **Privacy Policy** ✅ NUOVO — `app/privacy/page.tsx`, linkata in footer landing
15. **Termini di Servizio** ✅ NUOVO — `app/terms/page.tsx`, stesso stile/pattern di privacy, linkata accanto al link Privacy
16. **Integrazione Capacitor base** ✅ NUOVO — vedi sezione dedicata
17. **Build Android (debug + release firmata)** ✅ NUOVO — vedi sezione dedicata
18. **Android App Links (deep link magic link)** 🟡 NUOVO, configurato ma NON ANCORA VERIFICATO end-to-end — vedi punto aperto

### sobre-batch (Node.js ESM su Railway) ✅
Invariato rispetto a sessione precedente — `generate.js` e `notify.js` entrambi deployati, funzionanti, testati end-to-end. Nessuna modifica in questa sessione (notify.js resta agnostico al canale di invio, nessun impatto dal pivot Capacitor).

## OneSignal — Stato Completo

### Web Push (browser) — ✅ Completato e testato
Vedi dettagli architetturali invariati da sessione precedente: `OneSignalInit.tsx`, Service Worker in `public/`, modalità "Custom Code", richiesta permesso risolta installando correttamente il Service Worker (causa radice del problema "prompt mai richiesto" era proprio il Service Worker irraggiungibile, non un codice mancante per la richiesta esplicita di permesso — il punto aperto della sessione precedente si è risolto naturalmente una volta sistemato il path del Service Worker).

### Mobile Push nativo (Capacitor/Android) — 🟡 IN CORSO, non ancora completato
- Plugin scelto: `onesignal-cordova-plugin` (compatibile Capacitor)
- Obiettivo: `OneSignalInit.tsx` deve diventare "channel-aware" — usa `Capacitor.isNativePlatform()` per scegliere tra plugin nativo (dentro app) e Web SDK esistente (browser), entrambi convergono sulla stessa server action `saveOneSignalPlayerId()`
- **PREREQUISITO BLOCCANTE non ancora risolto:** serve un progetto Firebase collegato all'app OneSignal (Settings → Platforms → Google Android FCM nel dashboard OneSignal), che genera il file `google-services.json` da inserire in `android/app/`. Questo file NON può essere generato da Claude Code — richiede accesso a Firebase Console da parte di Robertin.
- **Prompt per questa integrazione preparato ma NON ANCORA LANCIATO a Claude Code** — priorità alta per prossima sessione

### Campo `notifications.opened_at`
Ancora non implementato, di proposito — rimandato al blocco PostHog (invariato da sessione precedente).

## Capacitor — Architettura e Stato

### Decisione architetturale presa (confermata da analisi diretta del codice)
**Opzione scelta: `server.url` remoto** (non export statico). Motivazione confermata da Claude Code dopo analisi: l'app usa Server Components, Server Actions, cookie Supabase, webhook Stripe e route handler dinamiche (`/api/auth/callback`, `/api/stripe/webhook`, `/api/internal/content-for-user`) — un export statico richiederebbe riscrivere praticamente tutto, scartato come impraticabile.

Capacitor wrappa una WebView che carica direttamente `https://www.sobrewellness.app` — il deploy Vercel esistente serve sia browser che app nativa senza alcuna modifica architetturale.

### File e configurazione
- `capacitor.config.ts` — NUOVO: `appId: com.lepefylabs.sobre`, `server.url: https://www.sobrewellness.app`
- `package.json` — aggiunge `@capacitor/core` + `@capacitor/android` (deps), `@capacitor/cli` (devDep)
- `android/` — NUOVO, progetto Gradle Android completo generato da `cap add android`
- `android/app/src/main/AndroidManifest.xml` — permessi INTERNET, POST_NOTIFICATIONS (Android 13+), ACCESS_NETWORK_STATE; **NUOVO:** intent-filter con `android:autoVerify="true"` per Android App Links (vedi sezione dedicata)
- **Punti da verificare ancora, non confermati esplicitamente:** `server.androidScheme: 'https'` e `server.allowNavigation` in `capacitor.config.ts` — segnalati come da controllare ma non ancora verificati con certezza in questa sessione

### Build Android — Workflow GitHub Actions

**`.github/workflows/android-debug-build.yml`** ✅ funzionante
- Trigger: solo `workflow_dispatch` (manuale)
- Genera APK di **debug**, non firmato, solo per test rapido
- Output: artifact "sobre-debug-apk" (retention 14 giorni)
- **Testato con successo:** APK installato su telefono Android reale, l'app apre la landing correttamente

**`.github/workflows/android-release-build.yml`** ✅ funzionante
- Trigger: solo `workflow_dispatch` (manuale)
- Genera **Android App Bundle (.aab)** firmato con keystore di release, pronto per Play Console
- Legge il keystore da GitHub Secrets (decodificato da base64 a runtime, eliminato a fine job anche in caso di fallimento)
- `android/app/build.gradle` modificato: aggiunge `signingConfigs` che legge da variabili d'ambiente, `buildTypes.release` la usa condizionalmente (build debug non richiedono le env var del keystore, continuano a funzionare senza)
- **Build confermata riuscita senza errori** (verificato esplicitamente in questa sessione)
- Output: artifact "sobre-release-aab" (retention 14 giorni)

### Keystore Android — Generato e gestito in Codespace
- **Nomi reali confermati (sessione precedente "Generare il keystore in Codespace"):** alias `sobre-key`, file `sobre-release.keystore` — ATTENZIONE: i prompt scritti in questa sessione corrente usavano per errore `sobre-upload-key.jks`/alias `sobre-upload` come ipotesi placeholder; la build release è comunque riuscita senza errori, quindi i GitHub Secrets reali risultano correttamente allineati ai nomi effettivi usati dal workflow — ma se in futuro si scrivono nuovi comandi `keytool`/`bundletool` manuali, usare i nomi REALI confermati (`sobre-key` / `sobre-release.keystore`), non quelli ipotizzati nei prompt di questa sessione
- GitHub Secrets configurati nel repo `sobre-app` (Repository secrets, non Environment secrets): keystore in base64 + password store/key + alias
- Backup: stringa base64 del keystore salvata in password manager insieme a entrambe le password, alias, e comando di ricostruzione — **nessuna seconda copia del file binario .jks salvata** (solo base64, ricostruibile, scelta validata come strategia di backup corretta dato che base64 è encoding lossless)
- **Fingerprint SHA-256 estratto** con successo via `keytool -list -v` — usato per Android App Links (vedi sotto)

### Test su dispositivo reale — file APK vs AAB (chiarimento importante)
- **APK**: installabile direttamente su telefono, usato per i test rapidi (build debug)
- **AAB**: NON installabile direttamente — è il formato richiesto da Play Console, che genera lui stesso gli APK ottimizzati al momento della distribuzione
- Per testare un **AAB di release** su un telefono reale senza Play Console (es. mentre l'account Play Console è ancora in fase di verifica), serve **`bundletool`**: estrae un APK universale firmato dall'AAB, utilizzabile per installazione manuale diretta
- Procedura `bundletool` documentata e preparata (comando `build-apks` con `--mode=universal`, poi unzip per estrarre `universal.apk`) — **non ancora eseguita/confermata**, Robertin ha scelto di attendere la verifica account Google invece di procedere con bundletool per questo test specifico

## Android App Links — Configurato, verifica end-to-end PENDENTE

### Problema risolto a livello di causa
L'app nativa Capacitor (WebView verso `server.url` remoto) non intercettava il magic link di login inviato via email — Android apriva il link nel browser invece che nell'app, interrompendo il flusso di autenticazione. Causa: nessuna configurazione di Android App Links presente, il sistema operativo non aveva modo di sapere che l'app dovesse gestire i link verso `sobrewellness.app`.

### Soluzione implementata (caricata su GitHub, NON ancora verificata end-to-end)
- `assetlinks.json` pubblicato (path esatto scelto da Claude Code, verificare se sotto `public/.well-known/` o via Route Handler — da confermare leggendo il report di Claude Code se necessario) con `package_name: com.lepefylabs.sobre` e il fingerprint SHA-256 del keystore di release
- `middleware.ts` verificato/aggiornato per non bloccare `/.well-known/assetlinks.json`
- `AndroidManifest.xml`: intent-filter con `android:autoVerify="true"`, action VIEW, category DEFAULT + BROWSABLE, host(s) sobrewellness.app (e www, se pertinente)

### 🔴 PUNTO APERTO PRIORITARIO — verifica end-to-end non completata
**Non ancora testato se il magic link apre effettivamente l'app invece del browser.** Il test richiede:
1. Verificare che `https://www.sobrewellness.app/.well-known/assetlinks.json` sia raggiungibile e ben formato (Robertin doveva controllare manualmente, esito non confermato in questa sessione — **da verificare per primo nella prossima sessione**)
2. Opzionale: validare il file con l'API ufficiale Google Digital Asset Links
3. Generare un APK installabile dalla build **release** firmata (l'unica con fingerprint corrispondente ad `assetlinks.json` — la build *debug* usa un keystore diverso e NON supererà la verifica App Links, da tenere a mente per non confondersi in futuro)
4. Installare quell'APK sul telefono (disinstallando prima qualunque versione precedente, per garantire che Android ri-esegua la verifica App Links all'installazione)
5. Testare il flusso: login da app → ricezione email → click sul magic link → conferma che si apra l'app Sobre e non il browser

**Bloccato in attesa di:** verifica account Google Play Console (in corso, tempistica fuori controllo) — Robertin ha scelto di aspettare lo sblocco per testare tramite Play Console Internal Testing, invece di procedere subito con `bundletool` in Codespace. Questa è anche la via che servirà comunque per i beta tester della Fase 0, quindi non è tempo perso.

## Google Play Console — Stato

- Account creato, **verifica identità in corso** (avviata, tempistica non sotto controllo diretto — può richiedere da poche ore a un paio di giorni secondo le indicazioni Google)
- **Bloccante per:** Internal Testing (canale di distribuzione AAB per test su dispositivo reale e per i beta tester Fase 0)
- **Non bloccante per:** tutto il lavoro di codice/build (Capacitor, workflow GitHub Actions, App Links) — può proseguire in parallelo
- Da preparare nel frattempo (non ancora iniziato): icona 512×512px, feature graphic 1024×500px, screenshot, descrizioni IT/FR brevi e lunghe — collo di bottiglia potenziale dato che il logo Sobre è ancora "deferred" (vedi sezione Pre-Launch Checklist)

## Documenti Legali — NUOVO, completato in questa sessione

### Privacy Policy (`app/privacy/page.tsx`)
- Titolare: Robertin Boukeng, persona fisica (nessuna entità legale/P.IVA ancora registrata)
- Copre: dati di account, preferenze, check-in umore, dati notifiche push, dati abbonamento/pagamento (Stripe, nessun dato carta memorizzato da Sobre)
- Sezione dedicata alla generazione di contenuti via IA (Claude/Anthropic) per utenti Pro
- Elenco fornitori terzi: Supabase, Vercel, Railway, OneSignal, Stripe, Resend, Anthropic (+ PostHog quando integrato)
- Placeholder espliciti **[DA INSERIRE]** ancora aperti: indirizzo/sede, dettagli PostHog quando attivo
- ⚠️ Bozza tecnicamente accurata ma non sottoposta a revisione legale professionale — da fare prima che utenti reali si registrino

### Termini di Servizio (`app/terms/page.tsx`)
- Stesso titolare, stesso stile/pattern grafico di Privacy Policy
- **Diritto di recesso: 14 giorni standard UE, esplicitamente SENZA clausola di rinuncia** (decisione presa consapevolmente: la rinuncia richiederebbe un meccanismo di consenso esplicito separato in checkout Stripe, non implementato — quindi si è scelta la via più semplice e legalmente solida: includere il recesso pieno, niente rischio di clausola vessatoria non opponibile)
- Legge applicabile: italiana; foro competente: Italia (foro del consumatore per controversie con utenti, salvo diversa indicazione per altri casi)
- Copre: descrizione servizio, account, piani Free/Pro e prezzi, cancellazione abbonamento (diversa dal recesso), disclaimer su contenuti IA (non sostituiscono consulenza medica/psicologica), proprietà intellettuale, limitazione di responsabilità, minori (18+)
- Placeholder **[DA INSERIRE]** ancora aperti: indirizzo/sede, foro competente specifico per casi non-consumatore
- Linkata in footer accanto a Privacy Policy
- ⚠️ Stesso disclaimer: bozza solida ma non sostituisce revisione legale professionale

## Routing — Architettura Definitiva
(Invariato da sessione precedente — vedi sezioni i18n, Mood Check-in, Stripe, Database, Enum DB, Launch Strategy sotto, tutte confermate stabili e non toccate in questa sessione)

```
/ (root)
  → utente loggato → redirect /dashboard/home
  → utente non loggato → mostra LandingPage (da app/landing/)
       → CTA "Inizia gratis" / "Prova Pro" → /lang → /auth/login → ...

PWA installata (start_url: /dashboard/home)
  → utente loggato → dashboard diretta
  → utente non loggato → middleware redirige a /auth/login

App nativa Android (Capacitor, server.url remoto)
  → WebView carica l'URL configurato in capacitor.config.ts
  → stesso comportamento di routing del browser, dato che è lo stesso deploy Vercel
  → magic link via email: DOVREBBE riaprire l'app via App Links (verifica pendente,
    vedi sezione dedicata)
```

## i18n — Architettura Implementata
```
lib/i18n/
  types.ts      ← tipo Translations
  it.ts         ← dizionario italiano
  fr.ts         ← dizionario francese
  index.ts      ← getT(lang), getLangFromStorage(), setLangInStorage()

app/lang/page.tsx  ← selezione lingua pre-login (salva in localStorage)
```
**Nota:** `app/landing/` ha gestione i18n propria separata (componente `LangToggle.tsx`) — non collegata a `lib/i18n/`.

## Mood Check-in — Stato Attuale
5 livelli: very_low (A zero/À vide) · low (Giù/Pas top) · neutral (Così così/Bof) · good (Bene/Bien) · great (Carica/Au top). Label neutre per genere.

## Espansione Libreria Contenuti — 10 → 210 (completato)
File `supabase/seed/contents_v2.sql` — 100 IT + 100 FR, 68 thought/64 story/68 tip, vocabolario 16 tag fissato. Invariato da sessione precedente.

## Stripe — Completato ✅
Invariato. Checkout hosted, toggle mensile/annuale, webhook completi, testato end-to-end.

## Prodotto — Logica Contenuti
Invariato — regola "Ricevi, poi reagisci" resta principio permanente. Push notifications attive per entrambi gli slot via Web Push; mobile push nativo in corso di integrazione.

## Database — Tabelle Principali
Invariato — `profiles`, `contents`, `moods`, `notifications` (con `opened_at` non popolato), `subscriptions`.

## Enum DB
Invariato — content_type, mood_value (5 livelli), notification_slot, subscription_status.

## Note Tecniche Importanti

### Da sessioni precedenti (invariate)
- `pg_cron` non disponibile su Supabase free — batch e notify schedulati via Railway
- Callback auth: client inline con cookie manuali sul NextResponse, non createClient() da next/headers
- RLS upsert trap: `.update()` puro su profiles, mai `.upsert()`
- Claude Haiku wrappa JSON in backtick markdown — strip prima del parse
- `createServiceClient()` richiesto nelle webhook routes e negli endpoint interni
- `subscriptions` upsert: `onConflict: 'stripe_subscription_id'`
- Mobile-width layout (`max-w-sm mx-auto`) per test desktop
- Migrazioni enum Postgres eseguite manualmente su Supabase SQL Editor PRIMA del deploy
- Railway: env vars NON condivise automaticamente tra servizi nello stesso progetto — duplicare manualmente
- Railway: ogni deploy con Cron Schedule esegue il comando una volta subito dopo il deploy, indipendentemente dall'orario — innocuo grazie a idempotenza di notify.js, non richiede fix
- Next.js App Router: solo `public/` servita come file statico dalla root
- OneSignal "Custom Code" mode: gestione esplicita richiesta nel codice (causa radice del problema notifiche risultata essere il Service Worker irraggiungibile, non la mancanza di una chiamata esplicita — risolto)

### NUOVE da questa sessione
- **Ionic Appflow è stato dismesso** — non più disponibile per nuovi clienti, supporto esistenti solo fino al 31/12/2027. Non considerarlo come opzione in futuro.
- **AAB non è installabile direttamente su un dispositivo** — serve Play Console (Internal Testing) oppure `bundletool` per estrarre un APK installabile da un AAB
- **APK di debug e APK/AAB di release hanno fingerprint di firma diversi** — questo è critico per Android App Links: la verifica `assetlinks.json` funziona SOLO con build firmate dal keystore di release, mai con build debug (keystore di debug generato automaticamente da Gradle, sempre diverso)
- **Android richiede una build "pulita"** (disinstallazione della versione precedente prima di reinstallare) per ri-triggerare correttamente la verifica App Links — un semplice update sopra una versione precedente potrebbe non ri-verificare
- **Nomi reali keystore confermati:** alias `sobre-key`, file `sobre-release.keystore` (vedi sezione Keystore sopra per il dettaglio sulla discrepanza con i prompt di questa sessione)
- **GitHub Codespaces è l'eccezione pratica al vincolo "no CLI"** — usato per operazioni puntuali che richiedono un comando isolato e sicuro (keystore, fingerprint, bundletool), senza richiedere nulla installato sul PC di Robertin
- **OneSignal nativo Capacitor richiede un progetto Firebase/FCM collegato** (file `google-services.json`) — prerequisito non recuperabile da Claude Code, richiede azione manuale di Robertin sul dashboard Firebase/OneSignal

## Launch Strategy — Decisioni Prese
Invariato — Fase 0 (20-30 contatti, ~10 beta tester), Fase 1 (community, Product Hunt, SEO minimale), Fase 2 (canale proprio post break-even), Fase 3 (Meta Ads post-validazione). **Nota aggiornata:** il canale Play Console Internal Testing, una volta sbloccato, sarà anche il meccanismo di distribuzione per i beta tester della Fase 0 (non solo per i test interni di Robertin).

## Pre-Launch Checklist
- Verifica trademark su tmdn.org (Classi 9, 42, 44) via EUIPO — invariato, da fare
- Logo — deferred; percorso consigliato Brandmark.io o Fiverr — **ora più urgente**, collo di bottiglia per asset grafici Play Store (icona, feature graphic)
- ~~OneSignal Web Push~~ ✅ COMPLETATO e testato
- 🟡 OneSignal nativo Capacitor — in corso, bloccato su google-services.json (Firebase)
- PWA Service Worker applicativo — **probabilmente da derisignare/deprioritizzare** dato il pivot a Capacitor come canale primario (un service worker offline ha senso pieno solo se la PWA resta canale primario — da rivalutare, non eliminare a priori)
- Seed 200+ contenuti libreria Free ✅ completato
- Integrazione PostHog — invariato, non iniziato
- **NUOVO:** ~~Privacy Policy~~ ✅ completata (revisione legale consigliata prima del lancio)
- **NUOVO:** ~~Termini di Servizio~~ ✅ completati (revisione legale consigliata prima del lancio)
- **NUOVO:** Verifica identità Google Play Console — in corso, bloccante per Internal Testing
- **NUOVO:** Asset grafici Play Store (icona 512×512, feature graphic 1024×500, screenshot, descrizioni IT/FR) — non ancora iniziato
- **NUOVO:** google-services.json da Firebase Console — prerequisito per notifiche push native Android

## Prossimi Blocchi da Costruire (in ordine, aggiornato)
1. **🔴 Verifica end-to-end Android App Links** — appena l'account Play Console è verificato (o via bundletool se si decide di non aspettare): generare APK da AAB release, installare puliti, testare flusso magic link completo
2. **🔴 Integrazione plugin OneSignal nativo Capacitor** — richiede prima il file `google-services.json` da Firebase Console (azione manuale Robertin sul dashboard OneSignal/Firebase), poi il prompt a Claude Code (già abbozzato in sessione corrente, da rifinire e lanciare)
3. **Asset grafici e scheda Play Store** — in parallelo a quanto sopra, non bloccante tecnicamente ma necessario prima della pubblicazione reale
4. **Decisione su PWA Service Worker applicativo** — rivalutare priorità alla luce del pivot Capacitor (probabilmente deprioritizzato, non eliminato)
5. **PostHog** — funnel tracking + eventuale tracking apertura notifiche (opened_at)
6. **Revisione legale** Privacy Policy + Termini di Servizio prima di accettare utenti reali paganti
7. **Launch** — eseguire go-to-market, inclusa distribuzione beta tester Fase 0 via Play Console Internal Testing
