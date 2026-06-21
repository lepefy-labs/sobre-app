export const metadata = {
  title: 'Termini di Servizio — Sobre',
  description: 'Termini e condizioni di utilizzo di Sobre.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-stone-50 px-6 py-16">
      <div className="max-w-2xl mx-auto space-y-8 text-stone-700 leading-relaxed">
        <div className="space-y-2">
          <h1 className="text-2xl font-light text-stone-800">Termini di Servizio</h1>
          <p className="text-xs text-stone-400">Ultimo aggiornamento: 21 giugno 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-stone-800">1. Fornitore del servizio</h2>
          <p>
            Sobre è un servizio fornito da Robertin Boukeng, persona fisica, contattabile
            all&apos;indirizzo email{' '}
            <a href="mailto:ciao@robertinboukeng.com" className="underline">
              ciao@robertinboukeng.com
            </a>.
          </p>
          <p>
            [DA INSERIRE: indirizzo/sede, eventuale Partita IVA se nel frattempo viene aperta]
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-stone-800">2. Descrizione del servizio</h2>
          <p>
            Sobre è un&apos;applicazione di benessere quotidiano che fornisce due contenuti
            al giorno: un pensiero mattutino con check-in dell&apos;umore e una storia o
            consiglio serale.
          </p>
          <p>Il servizio è disponibile in due piani:</p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong>Piano Free:</strong> accesso gratuito a una libreria di contenuti curati.</li>
            <li><strong>Piano Pro:</strong> contenuti generati tramite intelligenza artificiale sulla base del mood riportato dall&apos;utente.</li>
          </ul>
          <p>
            Sobre è disponibile come applicazione web (PWA) e applicazione Android.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-stone-800">3. Account utente</h2>
          <p>
            La registrazione avviene tramite indirizzo email, con accesso mediante link
            di accesso senza password (magic link). L&apos;utente è responsabile della
            riservatezza del proprio accesso email e di qualsiasi attività effettuata
            tramite il proprio account.
          </p>
          <p>
            Sobre è rivolto a un pubblico adulto. L&apos;utilizzo del servizio è consentito
            esclusivamente a persone di età pari o superiore a 18 anni.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-stone-800">4. Piano Free e piano Pro — prezzi e pagamenti</h2>
          <p>
            Il <strong>piano Free</strong> è gratuito e consente l&apos;accesso alla libreria
            di contenuti curati.
          </p>
          <p>
            Il <strong>piano Pro</strong> è disponibile al costo indicativo di <strong>€&nbsp;3,99/mese</strong>{' '}
            oppure <strong>€&nbsp;29,99/anno</strong>. I prezzi correnti sono sempre indicati
            nella pagina di sottoscrizione dell&apos;app e possono essere soggetti a modifica
            con preavviso.
          </p>
          <p>
            I pagamenti sono gestiti tramite Stripe, con fatturazione ricorrente automatica
            fino a disdetta. Sobre non memorizza né ha accesso ai dati della carta di pagamento.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-stone-800">5. Diritto di recesso</h2>
          <p>
            L&apos;utente consumatore residente nell&apos;Unione Europea ha diritto di
            recedere dal contratto di abbonamento entro 14 giorni dalla sottoscrizione,
            senza necessità di fornire alcuna motivazione, ai sensi del Codice del
            Consumo (D.Lgs. 206/2005) e della Direttiva 2011/83/UE.
          </p>
          <p>
            Per esercitare il diritto di recesso, è sufficiente scrivere a{' '}
            <a href="mailto:ciao@robertinboukeng.com" className="underline">
              ciao@robertinboukeng.com
            </a>{' '}
            entro il termine indicato. In caso di recesso valido, l&apos;importo pagato
            verrà rimborsato.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-stone-800">6. Cancellazione dell&apos;abbonamento</h2>
          <p>
            L&apos;utente può cancellare l&apos;abbonamento Pro in qualsiasi momento dalle
            impostazioni dell&apos;app. La cancellazione ha effetto dalla fine del periodo
            di fatturazione in corso; non è previsto alcun rimborso per il periodo già
            pagato, fatto salvo il diritto di recesso di cui alla sezione 5.
          </p>
          <p>
            Dopo la cancellazione, l&apos;account torna automaticamente al piano Free.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-stone-800">7. Contenuti generati da intelligenza artificiale</h2>
          <p>
            I contenuti Pro generati tramite intelligenza artificiale sono forniti a scopo
            di benessere generale e ispirazione quotidiana. Non costituiscono consulenza
            medica, psicologica o terapeutica di alcun tipo.
          </p>
          <p>
            In caso di difficoltà emotive significative, l&apos;utente è invitato a
            rivolgersi a un professionista qualificato o ai servizi di emergenza competenti.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-stone-800">8. Proprietà intellettuale</h2>
          <p>
            Tutti i contenuti, il marchio Sobre, il design e il codice dell&apos;applicazione
            sono di proprietà del fornitore o concessi in licenza. L&apos;utente non può
            copiare, ridistribuire o sfruttare commercialmente i contenuti dell&apos;app
            senza autorizzazione esplicita.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-stone-800">9. Limitazione di responsabilità</h2>
          <p>
            Il servizio è fornito &quot;così com&apos;è&quot;. Il fornitore non garantisce la
            disponibilità ininterrotta del servizio né l&apos;assenza di errori. Nei limiti
            consentiti dalla legge applicabile, il fornitore non è responsabile per danni
            indiretti derivanti dall&apos;uso dell&apos;app.
          </p>
          <p>
            Nulla nella presente clausola limita i diritti inderogabili del consumatore
            previsti dalla legge italiana.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-stone-800">10. Modifiche ai Termini</h2>
          <p>
            I presenti Termini possono essere aggiornati periodicamente. Modifiche
            sostanziali saranno comunicate via email o tramite notifica in app. La data
            di ultimo aggiornamento è indicata in cima alla pagina.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-stone-800">11. Legge applicabile e foro competente</h2>
          <p>
            I presenti Termini sono regolati dalla legge italiana. Per le controversie
            con utenti consumatori si applica il foro competente secondo le norme
            inderogabili del Codice del Consumo (D.Lgs. 206/2005). Per ogni altra
            controversia, il foro competente è quello di{' '}
            [DA INSERIRE: città di residenza del titolare].
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium text-stone-800">12. Contatti</h2>
          <p>
            Per qualsiasi domanda relativa ai presenti Termini, scrivi a{' '}
            <a href="mailto:ciao@robertinboukeng.com" className="underline">
              ciao@robertinboukeng.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  )
}
