export const metadata = {
  title: 'Privacy Policy — Sobre',
  description: 'Informativa sulla privacy di Sobre.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-stone-50 px-6 py-16">
      <div className="max-w-2xl mx-auto space-y-8 text-stone-700 leading-relaxed">
        <div className="space-y-2">
          <h1 className="text-2xl font-light text-stone-800">Informativa sulla Privacy</h1>
          <p className="text-xs text-stone-400">Ultimo aggiornamento: 21 giugno 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-stone-800">1. Titolare del trattamento</h2>
          <p>
            Il titolare del trattamento dei dati personali raccolti tramite l&apos;app
            e il sito Sobre è Robertin Boukeng, persona fisica, contattabile
            all&apos;indirizzo email{' '}
            <a href="mailto:ciao@robertinboukeng.com" className="underline">
              ciao@robertinboukeng.com
            </a>.
          </p>
          <p>
            [DA INSERIRE quando disponibile: indirizzo/sede, eventuale Partita IVA
            se nel frattempo viene aperta]
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-stone-800">2. Dati raccolti</h2>
          <p>Nell&apos;ambito dell&apos;utilizzo di Sobre raccogliamo le seguenti categorie di dati:</p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong>Dati di account:</strong> indirizzo email (per l&apos;accesso tramite link magico, senza password), nome (opzionale, inserito in fase di onboarding).</li>
            <li><strong>Preferenze utente:</strong> lingua (italiano o francese), fuso orario, orari preferiti per le notifiche.</li>
            <li><strong>Dati di check-in dell&apos;umore:</strong> il livello di umore selezionato quotidianamente (su una scala di 5 valori) ed eventuali note testuali opzionali che l&apos;utente decide di aggiungere. Questi dati possono essere utilizzati, per gli utenti abbonati al piano Pro, per generare contenuti personalizzati tramite intelligenza artificiale (vedi sezione 4).</li>
            <li><strong>Dati di notifica push:</strong> un identificativo tecnico anonimo (player ID) generato dal servizio OneSignal per l&apos;invio delle notifiche, associato al profilo utente.</li>
            <li><strong>Dati di abbonamento e pagamento:</strong> stato dell&apos;abbonamento (gratuito o Pro) e identificativi di transazione gestiti interamente da Stripe. Sobre non memorizza né ha accesso ai dati della carta di pagamento.</li>
            <li><strong>Dati tecnici e di utilizzo:</strong> [DA CONFERMARE quando PostHog sarà integrato — dati di navigazione/interazione con l&apos;app a fini di analisi del prodotto].</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-stone-800">3. Finalità del trattamento</h2>
          <p>I dati raccolti sono utilizzati esclusivamente per:</p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Fornire il servizio richiesto (contenuti quotidiani di benessere, notifiche, check-in dell&apos;umore).</li>
            <li>Personalizzare i contenuti per gli utenti abbonati al piano Pro, sulla base del mood riportato e del profilo utente.</li>
            <li>Gestire l&apos;abbonamento e i pagamenti tramite il fornitore terzo Stripe.</li>
            <li>Inviare notifiche push relative ai contenuti quotidiani, se l&apos;utente ha fornito il consenso esplicito.</li>
            <li>Migliorare il prodotto attraverso analisi statistiche aggregate e anonimizzate, ove applicabile.</li>
          </ul>
          <p>
            Sobre non vende né cede a terzi i dati personali degli utenti per finalità
            di marketing di terze parti.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-stone-800">4. Generazione di contenuti tramite intelligenza artificiale</h2>
          <p>
            Per gli utenti abbonati al piano Pro, alcuni contenuti (pensieri, storie,
            consigli) vengono generati automaticamente da un modello di intelligenza
            artificiale (Claude, sviluppato da Anthropic), sulla base del mood riportato
            dall&apos;utente e di informazioni di profilo non identificative. Questo
            processo avviene tramite un&apos;elaborazione automatizzata notturna; i dati
            inviati al fornitore AI non includono l&apos;indirizzo email né altri
            identificativi diretti dell&apos;utente.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-stone-800">5. Fornitori terzi (sub-responsabili del trattamento)</h2>
          <p>Per erogare il servizio, Sobre si avvale dei seguenti fornitori terzi, ciascuno operante secondo la propria informativa privacy:</p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong>Supabase</strong> — hosting del database e gestione dell&apos;autenticazione.</li>
            <li><strong>Vercel</strong> — hosting dell&apos;applicazione web.</li>
            <li><strong>Railway</strong> — esecuzione dei processi automatizzati (generazione contenuti e invio notifiche).</li>
            <li><strong>OneSignal</strong> — invio delle notifiche push.</li>
            <li><strong>Stripe</strong> — gestione dei pagamenti e degli abbonamenti.</li>
            <li><strong>Resend</strong> — invio di email transazionali (es. link di accesso).</li>
            <li><strong>Anthropic</strong> — generazione di contenuti personalizzati tramite intelligenza artificiale (solo utenti Pro).</li>
            <li>[DA AGGIUNGERE quando integrato: <strong>PostHog</strong> — analisi statistiche di utilizzo del prodotto.]</li>
          </ul>
          <p>
            Alcuni di questi fornitori possono trattare dati al di fuori dello Spazio
            Economico Europeo; in tali casi il trasferimento avviene sulla base di
            garanzie adeguate previste dal Regolamento (UE) 2016/679 (es. clausole
            contrattuali standard).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-stone-800">6. Base giuridica del trattamento</h2>
          <p>
            Il trattamento dei dati si fonda sull&apos;esecuzione del contratto (fornitura
            del servizio richiesto dall&apos;utente), sul consenso esplicito (per le
            notifiche push e l&apos;eventuale generazione di contenuti AI personalizzati)
            e, ove applicabile, sul legittimo interesse a migliorare il servizio.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-stone-800">7. Conservazione dei dati</h2>
          <p>
            I dati personali sono conservati per tutta la durata dell&apos;account
            dell&apos;utente. In caso di cancellazione dell&apos;account, i dati personali
            identificativi vengono eliminati entro un termine ragionevole, salvo
            obblighi di legge che richiedano una conservazione più estesa (es. dati
            fiscali relativi ai pagamenti).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-stone-800">8. Diritti dell&apos;utente</h2>
          <p>
            In qualità di interessato, hai diritto di accedere ai tuoi dati personali,
            richiederne la rettifica o la cancellazione, opporti al trattamento o
            richiederne la limitazione, e di richiedere la portabilità dei dati, nei
            limiti previsti dal Regolamento (UE) 2016/679 (GDPR). Per esercitare
            questi diritti, puoi scrivere a{' '}
            <a href="mailto:ciao@robertinboukeng.com" className="underline">
              ciao@robertinboukeng.com
            </a>.
          </p>
          <p>
            Hai inoltre diritto di proporre reclamo all&apos;Autorità Garante per la
            Protezione dei Dati Personali (per l&apos;Italia) o alla CNIL (per la Francia),
            qualora ritenga che il trattamento violi la normativa applicabile.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-stone-800">9. Notifiche push</h2>
          <p>
            Le notifiche push sono inviate solo previo consenso esplicito dell&apos;utente,
            richiesto al primo accesso. È possibile revocare il consenso in qualsiasi
            momento dalle impostazioni del dispositivo o dell&apos;applicazione.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-stone-800">10. Minori</h2>
          <p>
            Sobre è rivolto a un pubblico adulto e non è destinato a utenti minori di
            18 anni. Non raccogliamo consapevolmente dati di minori.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-stone-800">11. Modifiche alla presente informativa</h2>
          <p>
            La presente informativa può essere aggiornata periodicamente. La data di
            ultimo aggiornamento è indicata in cima alla pagina. In caso di modifiche
            sostanziali, gli utenti registrati verranno informati tramite email o
            notifica in app.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-stone-800">12. Contatti</h2>
          <p>
            Per qualsiasi domanda relativa alla presente informativa o al trattamento
            dei tuoi dati personali, scrivi a{' '}
            <a href="mailto:ciao@robertinboukeng.com" className="underline">
              ciao@robertinboukeng.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  )
}
