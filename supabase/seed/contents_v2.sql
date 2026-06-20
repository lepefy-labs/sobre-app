-- ============================================================
-- SOBRE - Seed contenuti v2 (200 items)
-- 4 blocchi tematici: Lavoro e confini, Relazioni e spazio
-- personale, Corpo e ritmo, Identità e tempo
-- Lingue: IT e FR
-- ============================================================

-- ============================================================
-- BLOCCO 1 — Lavoro e confini (50 item)
-- ============================================================

-- THOUGHT

insert into public.contents (type, lang, title, body, source, mood_target, slot, tags) values
(
  'thought',
  'it',
  null,
  'Il lavoro finisce quando decidi che finisce. Non quando lo dice la suoneria della prossima riunione.',
  'manual',
  null,
  'morning',
  array['lavoro', 'confini']
),
(
  'thought',
  'it',
  null,
  'Oggi non serve motivazione. Serve solo aprire gli occhi e fare la prima cosa, qualunque essa sia.',
  'manual',
  'very_low',
  'morning',
  array['energia', 'resilienza']
),
(
  'thought',
  'it',
  null,
  'Stanca non significa sbagliata. Significa che hai dato qualcosa, da qualche parte, a qualcuno.',
  'manual',
  'low',
  'morning',
  array['energia', 'autocura']
),
(
  'thought',
  'it',
  null,
  'Non ogni giornata deve avere un significato. Alcune servono solo a passare.',
  'manual',
  'neutral',
  'morning',
  array['presenza', 'tempo']
),
(
  'thought',
  'it',
  null,
  'Hai energia oggi. Usala per qualcosa che conta domani, non solo per smaltire l''inbox.',
  'manual',
  'good',
  'morning',
  array['energia', 'priorità']
),
(
  'thought',
  'it',
  null,
  'Il confine tra lavoro e vita non si trova. Si costruisce, ogni giorno, con piccole scelte di no.',
  'manual',
  null,
  'morning',
  array['confini', 'lavoro']
),
(
  'thought',
  'it',
  null,
  'Non devi avere tutto chiaro stamattina. Basta sapere qual è il prossimo passo, non l''intero percorso.',
  'manual',
  'very_low',
  'morning',
  array['resilienza', 'presenza']
),
(
  'thought',
  'it',
  null,
  'La produttività non è il tuo valore. È solo una delle cose che fai.',
  'manual',
  null,
  'morning',
  array['lavoro', 'mente']
),
(
  'thought',
  'it',
  null,
  'Quando ti senti carica, è il momento per le cose difficili — non per riempire il calendario di altro.',
  'manual',
  'great',
  'morning',
  array['energia', 'priorità']
),
(
  'thought',
  'fr',
  null,
  'Le travail s''arrête quand tu décides qu''il s''arrête. Pas quand la prochaine réunion sonne.',
  'manual',
  null,
  'morning',
  array['lavoro', 'confini']
),
(
  'thought',
  'fr',
  null,
  'Fatiguée ne veut pas dire en échec. Ça veut dire que tu as donné quelque chose, quelque part.',
  'manual',
  'low',
  'morning',
  array['energia', 'autocura']
),
(
  'thought',
  'fr',
  null,
  'La limite entre travail et vie ne se trouve pas. Elle se construit, chaque jour, avec de petits non.',
  'manual',
  null,
  'morning',
  array['confini', 'lavoro']
),
(
  'thought',
  'fr',
  null,
  'Toutes les journées n''ont pas besoin de sens. Certaines servent juste à passer.',
  'manual',
  'neutral',
  'morning',
  array['presenza', 'tempo']
),
(
  'thought',
  'fr',
  null,
  'Tu n''as pas besoin de tout voir clair ce matin. Juste la prochaine étape, pas tout le chemin.',
  'manual',
  'very_low',
  'morning',
  array['resilienza', 'presenza']
),
(
  'thought',
  'fr',
  null,
  'Ta productivité n''est pas ta valeur. C''est juste une des choses que tu fais.',
  'manual',
  null,
  'morning',
  array['lavoro', 'mente']
),
(
  'thought',
  'fr',
  null,
  'Tu as de l''énergie aujourd''hui. Utilise-la pour ce qui compte demain, pas pour vider la boîte mail.',
  'manual',
  'good',
  'morning',
  array['energia', 'priorità']
),
(
  'thought',
  'fr',
  null,
  'Quand tu te sens au top, c''est le moment pour les choses difficiles — pas pour remplir l''agenda.',
  'manual',
  'great',
  'morning',
  array['energia', 'priorità']
);

-- STORY

insert into public.contents (type, lang, title, body, source, mood_target, slot, tags) values
(
  'story',
  'it',
  'L''email delle 19:43',
  'Davide ha 39 anni e una regola che si è dato da solo: dopo le 19, le email aspettano fino al giorno dopo. L''ha infranta tre volte in un mese.

Stasera l''ha vista arrivare — l''oggetto urgente, il mittente importante. Ha letto le prime due righe sul lockscreen. Poi ha spento lo schermo e ha messo il telefono in un''altra stanza.

Non sa ancora cosa dice il resto del messaggio. Lo saprà domani, alle 9, quando sarà di nuovo il suo lavoro a chiederglielo — e non il contrario.

La regola non protegge il tempo libero. Protegge la sua capacità di decidere quando essere disponibile.',
  'manual',
  'neutral',
  'evening',
  array['confini', 'lavoro', 'tempo']
),
(
  'story',
  'it',
  'Il cassetto dei progetti non finiti',
  'Sara ha un cassetto, letteralmente, dove tiene gli appunti di progetti che ha iniziato e mai chiuso. Per anni l''ha vissuto come un atto d''accusa.

Quest''anno ha cambiato prospettiva. Ogni foglio in quel cassetto è una versione di lei che ha provato qualcosa. Non tutto deve diventare un risultato per avere avuto valore.

Non li butta. Non li riprende neanche. Li lascia lì, come prove che ha continuato a tentare — anche quando il tentativo non bastava.

A volte il fallimento più gentile è quello che non chiedi mai di essere perdonato.',
  'manual',
  'low',
  'evening',
  array['resilienza', 'lavoro', 'leggerezza']
),
(
  'story',
  'it',
  'La riunione che Chiara non ha salvato',
  'Chiara dirige un team di dodici persone. Una sera, durante una call andata storta, ha sentito montare l''istinto di sistemare tutto subito, in diretta, davanti a tutti.

Ha fatto l''opposto. Ha detto: "Ne riparliamo domani con la testa fresca" — e ha chiuso la call cinque minuti prima.

Non era debolezza. Era la consapevolezza che certe cose, risolte nella tensione del momento, restano rotte più a lungo di quanto sarebbero rimaste se lasciate in pausa.

Il giorno dopo l''hanno risolta in dieci minuti.',
  'manual',
  null,
  'evening',
  array['lavoro', 'confini', 'mente']
),
(
  'story',
  'it',
  'Il bagno del terzo piano',
  'Federica ha scoperto, durante il periodo più difficile al lavoro, che il bagno del terzo piano è quasi sempre vuoto.

Ci andava tre volte al giorno. Non per il bagno. Per i due minuti in cui nessuno le chiedeva niente, nessuno aspettava una risposta, nessuno aveva bisogno di lei.

Non l''ha mai raccontato a nessuno. Sembrava una cosa troppo piccola per essere una strategia.

Ma è stata quella, per tre mesi, la cosa che l''ha tenuta in piedi: sapere che da qualche parte, anche solo per centoventi secondi, esisteva uno spazio tutto suo.',
  'manual',
  'very_low',
  'evening',
  array['autocura', 'silenzio', 'resilienza']
),
(
  'story',
  'it',
  'Il no di Marco',
  'Marco ha 44 anni e ha passato vent''anni a dire sì per primo e chiedersi dopo se poteva davvero permetterselo.

Il mese scorso un cliente importante ha chiesto una consegna impossibile in tempi impossibili. Marco ha sentito il riflesso del sì salire in gola, come sempre.

Questa volta ha aspettato un respiro. Poi ha detto: "Posso consegnarlo, ma non in quei tempi. Scegliamo insieme cosa è davvero urgente."

Il cliente ha accettato. Marco è tornato a casa con la stessa energia con cui era uscito — una sensazione che non ricordava più.',
  'manual',
  'good',
  'evening',
  array['confini', 'lavoro', 'priorità']
),
(
  'story',
  'it',
  'Le scarpe lasciate all''ingresso',
  'Nella casa di Anna c''è un rito non scritto: le scarpe da lavoro restano all''ingresso. Non solo per pulizia — per simbolo.

Toglierle è il momento in cui smette di essere la persona che ha gestito una crisi in ufficio e torna a essere semplicemente sé stessa.

Ci ha messo anni a notare quanto quel gesto, due secondi, le servisse a tracciare un confine che nessuna policy aziendale le avrebbe mai dato.

A volte i rituali più piccoli sono quelli che reggono di più.',
  'manual',
  null,
  'evening',
  array['rituali', 'confini', 'presenza']
),
(
  'story',
  'it',
  'L''ultima riga del curriculum',
  'Luca ha aggiornato il curriculum tre volte quest''anno, ma non l''ha mai inviato. Ogni volta arriva all''ultima riga e si ferma.

Non è paura del cambiamento. È che non riesce ancora a capire se vuole andarsene davvero o se vuole solo che qualcuno gli dica che può farlo.

Ha smesso di forzare la decisione. Il file resta lì, salvato, aggiornato, in attesa — non di un''offerta, ma del momento in cui lui stesso saprà rispondere.

Non tutte le incertezze vanno risolte in fretta.',
  'manual',
  'low',
  'evening',
  array['lavoro', 'tempo', 'mente']
),
(
  'story',
  'it',
  'Il progetto che Valentina ha rifiutato',
  'Valentina ha rifiutato il progetto più prestigioso che le avessero mai offerto. Non perché non potesse farlo — perché sapeva esattamente cosa le sarebbe costato.

Per la prima volta in carriera ha scelto in base a cosa voleva proteggere, non solo a cosa poteva ottenere.

Nessuno ha capito la sua scelta. Lei non ha sentito il bisogno di spiegarla.

Sapere cosa rifiutare, quando si è nel pieno delle forze, è una forma di lucidità che pochi si concedono.',
  'manual',
  'great',
  'evening',
  array['priorità', 'confini', 'energia']
),
(
  'story',
  'fr',
  'L''email de 19h43',
  'David a 41 ans et une règle qu''il s''est imposée : après 19h, les emails attendent le lendemain. Il l''a enfreinte trois fois ce mois-ci.

Ce soir, il l''a vu arriver — l''objet urgent, l''expéditeur important. Il a lu les deux premières lignes sur l''écran verrouillé. Puis il a éteint l''écran et posé le téléphone dans une autre pièce.

Il ne sait pas encore ce que dit le reste du message. Il le saura demain, à 9h, quand ce sera de nouveau son travail qui le demandera — et non l''inverse.

La règle ne protège pas le temps libre. Elle protège sa capacité à décider quand être disponible.',
  'manual',
  'neutral',
  'evening',
  array['confini', 'lavoro', 'tempo']
),
(
  'story',
  'fr',
  'La réunion que Camille n''a pas sauvée',
  'Camille dirige une équipe de douze personnes. Un soir, pendant un call qui tournait mal, elle a senti monter l''envie de tout régler immédiatement, en direct, devant tout le monde.

Elle a fait l''inverse. Elle a dit : "On en reparle demain, à tête reposée" — et a fermé l''appel cinq minutes plus tôt.

Ce n''était pas de la faiblesse. C''était la conscience que certaines choses, réglées dans la tension du moment, restent cassées plus longtemps que si on les laisse en pause.

Le lendemain, ils ont tout réglé en dix minutes.',
  'manual',
  null,
  'evening',
  array['lavoro', 'confini', 'mente']
),
(
  'story',
  'fr',
  'Les toilettes du troisième étage',
  'Léa a découvert, pendant la période la plus difficile au travail, que les toilettes du troisième étage sont presque toujours vides.

Elle y allait trois fois par jour. Pas pour les toilettes. Pour les deux minutes où personne ne lui demandait rien, où personne n''attendait de réponse.

Elle ne l''a jamais raconté à personne. Ça semblait trop petit pour être une stratégie.

Mais c''est ce qui l''a tenue debout pendant trois mois : savoir que quelque part, même pour cent vingt secondes, existait un espace à elle.',
  'manual',
  'very_low',
  'evening',
  array['autocura', 'silenzio', 'resilienza']
),
(
  'story',
  'fr',
  'Le non de Thomas',
  'Thomas a 43 ans et a passé vingt ans à dire oui en premier, et à se demander après s''il pouvait vraiment se le permettre.

Le mois dernier, un client important a demandé une livraison impossible dans des délais impossibles. Thomas a senti le réflexe du oui monter, comme toujours.

Cette fois, il a attendu un souffle. Puis il a dit : "Je peux le livrer, mais pas dans ces délais. Choisissons ensemble ce qui est vraiment urgent."

Le client a accepté. Thomas est rentré chez lui avec la même énergie qu''au départ — une sensation qu''il ne reconnaissait plus.',
  'manual',
  'good',
  'evening',
  array['confini', 'lavoro', 'priorità']
),
(
  'story',
  'fr',
  'Les chaussures laissées à l''entrée',
  'Chez Julie, il y a un rituel non écrit : les chaussures de travail restent à l''entrée. Pas seulement pour la propreté — pour le symbole.

Les enlever, c''est le moment où elle cesse d''être la personne qui a géré une crise au bureau et redevient simplement elle-même.

Il lui a fallu des années pour remarquer combien ce geste, deux secondes, lui servait à tracer une limite qu''aucune politique d''entreprise ne lui aurait jamais donnée.

Parfois, les plus petits rituels sont ceux qui tiennent le mieux.',
  'manual',
  null,
  'evening',
  array['rituali', 'confini', 'presenza']
),
(
  'story',
  'fr',
  'La dernière ligne du CV',
  'Hugo a mis à jour son CV trois fois cette année, mais ne l''a jamais envoyé. Chaque fois, il arrive à la dernière ligne et s''arrête.

Ce n''est pas la peur du changement. C''est qu''il n''arrive pas encore à savoir s''il veut vraiment partir, ou s''il veut juste que quelqu''un lui dise qu''il en a le droit.

Il a arrêté de forcer la décision. Le fichier reste là, sauvegardé, à jour, en attente — pas d''une offre, mais du moment où lui-même saura répondre.

Toutes les incertitudes n''ont pas besoin d''être résolues vite.',
  'manual',
  'low',
  'evening',
  array['lavoro', 'tempo', 'mente']
),
(
  'story',
  'fr',
  'Le projet que Manon a refusé',
  'Manon a refusé le projet le plus prestigieux qu''on lui ait jamais proposé. Pas parce qu''elle n''en était pas capable — parce qu''elle savait exactement ce que ça lui coûterait.

Pour la première fois de sa carrière, elle a choisi selon ce qu''elle voulait protéger, pas seulement selon ce qu''elle pouvait obtenir.

Personne n''a compris son choix. Elle n''a pas ressenti le besoin de l''expliquer.

Savoir quoi refuser, quand on est au sommet de ses forces, est une forme de lucidité que peu s''accordent.',
  'manual',
  'great',
  'evening',
  array['priorità', 'confini', 'energia']
),
(
  'story',
  'fr',
  'Le silence du lundi matin',
  'Inès a remarqué quelque chose il y a deux ans : les vingt premières minutes du lundi matin déterminent souvent le ton de toute sa semaine.

Alors elle a changé une seule chose. Plus de notifications avant 9h. Pas de café devant l''écran. Juste elle, la fenêtre, et le temps de se préparer mentalement avant que tout commence.

Ce n''est pas une méthode miracle. C''est juste vingt minutes qu''elle a décidé de garder pour elle, avant que la semaine ne les lui prenne.

Certains lundis, ça change tout. D''autres, presque rien. Mais elle continue, parce que c''est elle qui décide comment commence sa semaine — pas son agenda.',
  'manual',
  null,
  'evening',
  array['rituali', 'presenza', 'tempo']
);

-- TIP

insert into public.contents (type, lang, title, body, source, mood_target, slot, tags) values
(
  'tip',
  'it',
  null,
  'Prima di rispondere a un messaggio di lavoro che ti irrita, chiediti: questa risposta serve a risolvere o solo a scaricare la tensione? Se è la seconda, aspetta un''ora.',
  'manual',
  null,
  'morning',
  array['lavoro', 'confini', 'emozioni']
),
(
  'tip',
  'it',
  null,
  'Quando il carico sembra ingestibile, scrivi tre liste separate: ''oggi'', ''questa settimana'', ''non ora''. Il sollievo non viene dal fare di più, ma dal vedere cosa puoi legittimamente rimandare.',
  'manual',
  'low',
  'morning',
  array['priorità', 'lavoro', 'mente']
),
(
  'tip',
  'it',
  null,
  'Stabilisci un segnale fisico di fine giornata lavorativa — chiudere il laptop, cambiarti le scarpe, una breve camminata. Il cervello impara i confini attraverso i gesti, non solo le decisioni.',
  'manual',
  null,
  'evening',
  array['rituali', 'confini', 'lavoro']
),
(
  'tip',
  'it',
  null,
  'Se stamattina l''energia è a zero, non puntare alla giornata produttiva. Punta a una sola cosa fatta bene. Il resto può aspettare senza che il mondo crolli.',
  'manual',
  'very_low',
  'morning',
  array['energia', 'priorità', 'resilienza']
),
(
  'tip',
  'it',
  null,
  'Il multitasking nel lavoro al computer non esiste davvero — è solo cambio rapido di attenzione, con un costo cognitivo ogni volta. Una cosa alla volta è più veloce di quanto sembri.',
  'manual',
  null,
  'morning',
  array['lavoro', 'mente', 'priorità']
),
(
  'tip',
  'it',
  null,
  'Quando hai avuto una buona giornata di lavoro, prenditi trenta secondi per notarlo prima di passare ad altro. Il cervello registra meglio i successi se ci si sofferma, anche brevemente.',
  'manual',
  'good',
  'evening',
  array['energia', 'presenza', 'autocura']
),
(
  'tip',
  'it',
  null,
  'Le riunioni che finiscono in tensione raramente migliorano se proseguite a oltranza. Proporre di riprendere il giorno dopo non è evitare il problema — è dargli le condizioni giuste per risolversi.',
  'manual',
  null,
  'evening',
  array['lavoro', 'confini', 'mente']
),
(
  'tip',
  'it',
  null,
  'Non tutte le email urgenti sono urgenti per te. Prima di aprire la casella la mattina, decidi quali due cose vuoi davvero fare oggi. Poi apri la posta — non il contrario.',
  'manual',
  'neutral',
  'morning',
  array['lavoro', 'priorità', 'confini']
),
(
  'tip',
  'it',
  null,
  'Se la giornata è stata pesante, evita di processarla subito con qualcun altro a caldo. Scrivi prima tre righe per te — chiarisce cosa provi davvero, prima di doverlo spiegare.',
  'manual',
  'low',
  'evening',
  array['emozioni', 'mente', 'autocura']
),
(
  'tip',
  'fr',
  null,
  'Avant de répondre à un message de travail qui t''irrite, demande-toi : cette réponse sert-elle à résoudre ou juste à évacuer la tension ? Si c''est la seconde option, attends une heure.',
  'manual',
  null,
  'morning',
  array['lavoro', 'confini', 'emozioni']
),
(
  'tip',
  'fr',
  null,
  'Quand la charge semble ingérable, écris trois listes séparées : ''aujourd''hui'', ''cette semaine'', ''pas maintenant''. Le soulagement ne vient pas d''en faire plus, mais de voir ce que tu peux légitimement reporter.',
  'manual',
  'low',
  'morning',
  array['priorità', 'lavoro', 'mente']
),
(
  'tip',
  'fr',
  null,
  'Établis un signal physique de fin de journée de travail — fermer l''ordinateur, changer de chaussures, une courte marche. Le cerveau apprend les limites par les gestes, pas seulement par les décisions.',
  'manual',
  null,
  'evening',
  array['rituali', 'confini', 'lavoro']
),
(
  'tip',
  'fr',
  null,
  'Si l''énergie est à zéro ce matin, ne vise pas la journée productive. Vise une seule chose bien faite. Le reste peut attendre sans que le monde s''effondre.',
  'manual',
  'very_low',
  'morning',
  array['energia', 'priorità', 'resilienza']
),
(
  'tip',
  'fr',
  null,
  'Le multitâche sur ordinateur n''existe pas vraiment — ce n''est qu''un changement rapide d''attention, avec un coût cognitif à chaque fois. Une chose à la fois est plus rapide qu''il n''y paraît.',
  'manual',
  null,
  'morning',
  array['lavoro', 'mente', 'priorità']
),
(
  'tip',
  'fr',
  null,
  'Quand tu as eu une bonne journée de travail, prends trente secondes pour le remarquer avant de passer à autre chose. Le cerveau retient mieux les réussites quand on s''y arrête, même brièvement.',
  'manual',
  'good',
  'evening',
  array['energia', 'presenza', 'autocura']
),
(
  'tip',
  'fr',
  null,
  'Tous les emails urgents ne sont pas urgents pour toi. Avant d''ouvrir ta boîte le matin, décide des deux choses que tu veux vraiment faire aujourd''hui. Puis ouvre les emails — pas l''inverse.',
  'manual',
  'neutral',
  'morning',
  array['lavoro', 'priorità', 'confini']
),
(
  'tip',
  'fr',
  null,
  'Si la journée a été lourde, évite de la traiter immédiatement avec quelqu''un, à chaud. Écris d''abord trois lignes pour toi — ça clarifie ce que tu ressens vraiment, avant de devoir l''expliquer.',
  'manual',
  'low',
  'evening',
  array['emozioni', 'mente', 'autocura']
);

-- ============================================================
-- BLOCCO 2 — Relazioni e spazio personale (50 item)
-- ============================================================

-- THOUGHT

insert into public.contents (type, lang, title, body, source, mood_target, slot, tags) values
(
  'thought',
  'it',
  null,
  'Non tutte le relazioni vanno salvate. Alcune vanno solo lasciate andare, con rispetto.',
  'manual',
  null,
  'morning',
  array['relazioni', 'confini']
),
(
  'thought',
  'it',
  null,
  'Sentirsi sole in mezzo a tante persone non è un fallimento. È un segnale che dice dove guardare diverso.',
  'manual',
  'low',
  'morning',
  array['relazioni', 'emozioni']
),
(
  'thought',
  'it',
  null,
  'Lo spazio che chiedi per te non toglie nulla a chi ami. Lo protegge, nel tempo.',
  'manual',
  null,
  'morning',
  array['confini', 'relazioni']
),
(
  'thought',
  'it',
  null,
  'Oggi non devi sistemare quella conversazione rimasta in sospeso. Può aspettare il momento giusto.',
  'manual',
  'neutral',
  'morning',
  array['relazioni', 'tempo']
),
(
  'thought',
  'it',
  null,
  'Le persone che ti fanno stare bene meritano la tua energia migliore, non solo quella avanzata.',
  'manual',
  'good',
  'morning',
  array['relazioni', 'energia']
),
(
  'thought',
  'it',
  null,
  'Dire la verità a chi ami, anche quando è scomoda, è una forma di rispetto più profonda del silenzio gentile.',
  'manual',
  null,
  'morning',
  array['relazioni', 'emozioni']
),
(
  'thought',
  'it',
  null,
  'Non devi essere presente per tutti oggi. Scegli chi merita la versione di te che hai disponibile adesso.',
  'manual',
  'very_low',
  'morning',
  array['confini', 'energia']
),
(
  'thought',
  'it',
  null,
  'L''amicizia adulta non si misura in frequenza, ma in qualità di ritorno. Chi torna, conta.',
  'manual',
  null,
  'morning',
  array['relazioni', 'tempo']
),
(
  'thought',
  'it',
  null,
  'Quando ti senti piena, è il momento di dare — non perché devi, ma perché puoi farlo senza svuotarti.',
  'manual',
  'great',
  'morning',
  array['relazioni', 'energia']
),
(
  'thought',
  'fr',
  null,
  'Toutes les relations ne sont pas à sauver. Certaines sont juste à laisser partir, avec respect.',
  'manual',
  null,
  'morning',
  array['relazioni', 'confini']
),
(
  'thought',
  'fr',
  null,
  'Se sentir seule au milieu de beaucoup de monde n''est pas un échec. C''est un signal qui indique où regarder différemment.',
  'manual',
  'low',
  'morning',
  array['relazioni', 'emozioni']
),
(
  'thought',
  'fr',
  null,
  'L''espace que tu demandes pour toi n''enlève rien à ceux que tu aimes. Il les protège, avec le temps.',
  'manual',
  null,
  'morning',
  array['confini', 'relazioni']
),
(
  'thought',
  'fr',
  null,
  'Aujourd''hui, tu n''as pas à régler cette conversation en suspens. Elle peut attendre le bon moment.',
  'manual',
  'neutral',
  'morning',
  array['relazioni', 'tempo']
),
(
  'thought',
  'fr',
  null,
  'Les personnes qui te font du bien méritent ta meilleure énergie, pas seulement celle qu''il te reste.',
  'manual',
  'good',
  'morning',
  array['relazioni', 'energia']
),
(
  'thought',
  'fr',
  null,
  'Dire la vérité à ceux qu''on aime, même inconfortable, est une forme de respect plus profonde que le silence gentil.',
  'manual',
  null,
  'morning',
  array['relazioni', 'emozioni']
),
(
  'thought',
  'fr',
  null,
  'Tu n''as pas à être présente pour tout le monde aujourd''hui. Choisis qui mérite la version de toi disponible maintenant.',
  'manual',
  'very_low',
  'morning',
  array['confini', 'energia']
),
(
  'thought',
  'fr',
  null,
  'Quand tu te sens pleine, c''est le moment de donner — pas par obligation, mais parce que tu peux le faire sans t''épuiser.',
  'manual',
  'great',
  'morning',
  array['relazioni', 'energia']
);

-- STORY

insert into public.contents (type, lang, title, body, source, mood_target, slot, tags) values
(
  'story',
  'it',
  'La telefonata del giovedì',
  'Ogni giovedì sera, alle 20, Paola chiama sua madre. Non perché ci sia sempre qualcosa da dirsi — spesso le conversazioni durano sette minuti e parlano del tempo.

Per anni ha pensato che la telefonata "buona" fosse quella lunga, profonda, importante. Poi ha capito che la costanza vale più dell''intensità.

Sua madre non ricorda i contenuti delle telefonate. Ricorda che il giovedì, alle 20, qualcuno pensa a lei.

A volte amare qualcuno è semplicemente non saltare l''appuntamento.',
  'manual',
  'neutral',
  'evening',
  array['relazioni', 'rituali', 'tempo']
),
(
  'story',
  'it',
  'L''amica che non ha risposto',
  'Greta ha scritto a Beatrice tre settimane fa. Nessuna risposta. Le prime due settimane ha controllato il telefono ogni giorno, rileggendo il messaggio per capire se aveva detto qualcosa di sbagliato.

Poi ha smesso. Non per rabbia — per stanchezza di interpretare un silenzio che forse non riguardava lei.

Le persone hanno stagioni che non sempre coincidono con le nostre. Beatrice tornerà, oppure no. Greta ha deciso di non restare in attesa indefinita di qualcuno che non ha ancora scelto di tornare.

Lasciare andare non significa smettere di voler bene. Significa smettere di aspettare con il fiato sospeso.',
  'manual',
  'low',
  'evening',
  array['relazioni', 'emozioni', 'leggerezza']
),
(
  'story',
  'it',
  'Il tavolo per uno',
  'Martina ha cenato da sola al ristorante per la prima volta a 36 anni. Aveva sempre evitato, temendo gli sguardi, il giudizio immaginato dei tavoli vicini.

Quella sera, senza un motivo preciso, ha prenotato per una persona. Si è seduta, ha ordinato con calma, ha guardato fuori dalla finestra senza il bisogno di riempire il silenzio con un telefono.

Nessuno l''ha guardata. Nessuno ci ha fatto caso. Solo lei, per un''ora, completamente a suo agio nella propria compagnia.

È stata una delle cene più tranquille che ricordi.',
  'manual',
  null,
  'evening',
  array['autocura', 'presenza', 'leggerezza']
),
(
  'story',
  'it',
  'Il messaggio non inviato',
  'Camilla ha scritto e cancellato lo stesso messaggio quattro volte: "Non ce la faccio più, ho bisogno di parlare con qualcuno."

Ogni volta lo cancellava prima di inviarlo. Sembrava un peso troppo grande da scaricare su un''altra persona.

La quinta volta non l''ha cancellato. L''ha inviato a sua sorella, tremando leggermente mentre premeva il tasto.

La risposta è arrivata in due minuti: "Vengo da te stasera." Non aveva bisogno di una soluzione. Aveva bisogno di non essere sola con quel peso.',
  'manual',
  'very_low',
  'evening',
  array['relazioni', 'emozioni', 'resilienza']
),
(
  'story',
  'it',
  'Il compleanno organizzato da altri',
  'Per la prima volta in dieci anni, Irene non ha organizzato il proprio compleanno. Le sue amiche, stanche di vederla sempre dall''altra parte dell''organizzazione, hanno preso in mano la situazione.

Irene si è presentata senza sapere cosa l''aspettasse. Ha pianto un po'', ridendo, quando ha visto quante persone si erano coordinate senza che lei lo sapesse.

Ha capito una cosa quella sera: si era così abituata a prendersi cura degli altri che si era dimenticata come ci si sente a essere quella di cui ci si prende cura.

Lasciarsi sorprendere, a volte, è un atto di fiducia verso chi ci vuole bene.',
  'manual',
  'good',
  'evening',
  array['relazioni', 'presenza', 'autocura']
),
(
  'story',
  'it',
  'Le sedie vuote del weekend',
  'Da quando i figli di Roberto si sono trasferiti per l''università, la casa il sabato è troppo silenziosa. Per mesi ha evitato di sedersi nella sala da pranzo, dove le sedie vuote sembravano accusarlo di qualcosa.

Un sabato ha deciso di farne un rituale diverso: ha apparecchiato comunque, anche per uno, e ha mangiato lì, guardando le sedie vuote senza più temerle.

Non sono diventate meno vuote. Ma sono diventate parte della casa, non un''assenza da evitare.

Le fasi della vita cambiano la forma delle case. Bisogna solo imparare ad abitarle di nuovo.',
  'manual',
  null,
  'evening',
  array['relazioni', 'tempo', 'presenza']
),
(
  'story',
  'it',
  'Il gruppo WhatsApp silenziato',
  'Veronica ha silenziato il gruppo delle ex compagne di liceo sei mesi fa. Si sentiva in colpa ogni volta che vedeva i messaggi non letti accumularsi.

Poi ha capito che quel gruppo, ormai, le costava più energia di quanta gliene desse. Le conversazioni erano diventate un obbligo sociale, non un piacere.

Non l''ha lasciato. L''ha solo messo in un angolo della sua attenzione, senza sensi di colpa.

Non tutte le connessioni vanno mantenute attive. Alcune possono semplicemente esistere, in pausa, senza che questo sia un tradimento.',
  'manual',
  'low',
  'evening',
  array['relazioni', 'confini', 'leggerezza']
),
(
  'story',
  'it',
  'La cena del mercoledì con sé stessa',
  'Da un anno, ogni mercoledì, Alice si prenota un tavolo al suo ristorante preferito. Da sola. Nessuna occasione speciale, nessun motivo da spiegare a chi chiede.

All''inizio si sentiva strana a dirlo ad alta voce: "Ho un impegno mercoledì." Un impegno con sé stessa sembrava meno legittimo di un impegno con qualcun altro.

Ora non si giustifica più. È semplicemente parte della sua settimana, protetta come qualsiasi altro appuntamento importante.

A volte il rispetto più grande che ci si può dare è trattare il tempo con sé stessi come innegoziabile.',
  'manual',
  'neutral',
  'evening',
  array['autocura', 'rituali', 'confini']
),
(
  'story',
  'fr',
  'L''appel du jeudi',
  'Chaque jeudi soir, à 20h, Pauline appelle sa mère. Pas parce qu''il y a toujours quelque chose à se dire — souvent les conversations durent sept minutes et parlent du temps qu''il fait.

Pendant des années, elle a pensé que le "bon" appel était celui qui durait, profond, important. Puis elle a compris que la constance vaut plus que l''intensité.

Sa mère ne se souvient pas du contenu des appels. Elle se souvient que le jeudi, à 20h, quelqu''un pense à elle.

Parfois, aimer quelqu''un, c''est simplement ne pas manquer le rendez-vous.',
  'manual',
  'neutral',
  'evening',
  array['relazioni', 'rituali', 'tempo']
),
(
  'story',
  'fr',
  'L''amie qui n''a pas répondu',
  'Margaux a écrit à Élodie il y a trois semaines. Aucune réponse. Les deux premières semaines, elle a vérifié son téléphone chaque jour, relisant le message pour comprendre si elle avait dit quelque chose de mal.

Puis elle a arrêté. Pas par colère — par fatigue d''interpréter un silence qui ne la concernait peut-être pas.

Les gens ont des saisons qui ne coïncident pas toujours avec les nôtres. Élodie reviendra, ou pas. Margaux a décidé de ne plus attendre indéfiniment quelqu''un qui n''a pas encore choisi de revenir.

Laisser partir ne veut pas dire arrêter d''aimer. Ça veut dire arrêter d''attendre le souffle coupé.',
  'manual',
  'low',
  'evening',
  array['relazioni', 'emozioni', 'leggerezza']
),
(
  'story',
  'fr',
  'La table pour une',
  'Charlotte a dîné seule au restaurant pour la première fois à 37 ans. Elle avait toujours évité, craignant les regards, le jugement imaginé des tables voisines.

Ce soir-là, sans raison précise, elle a réservé pour une personne. Elle s''est assise, a commandé calmement, a regardé par la fenêtre sans avoir besoin de remplir le silence avec un téléphone.

Personne ne l''a regardée. Personne n''y a fait attention. Juste elle, pendant une heure, complètement à l''aise dans sa propre compagnie.

Ça a été l''un des dîners les plus tranquilles dont elle se souvienne.',
  'manual',
  null,
  'evening',
  array['autocura', 'presenza', 'leggerezza']
),
(
  'story',
  'fr',
  'Le message non envoyé',
  'Léa a écrit et effacé le même message quatre fois : "Je n''y arrive plus, j''ai besoin de parler à quelqu''un."

Chaque fois, elle l''effaçait avant de l''envoyer. Ça semblait un poids trop lourd à transmettre à quelqu''un d''autre.

La cinquième fois, elle ne l''a pas effacé. Elle l''a envoyé à sa sœur, tremblant légèrement en appuyant sur la touche.

La réponse est arrivée en deux minutes : "Je viens chez toi ce soir." Elle n''avait pas besoin d''une solution. Elle avait besoin de ne pas être seule avec ce poids.',
  'manual',
  'very_low',
  'evening',
  array['relazioni', 'emozioni', 'resilienza']
),
(
  'story',
  'fr',
  'L''anniversaire organisé par les autres',
  'Pour la première fois en dix ans, Émilie n''a pas organisé son propre anniversaire. Ses amies, lasses de la voir toujours de l''autre côté de l''organisation, ont pris les choses en main.

Émilie est arrivée sans savoir ce qui l''attendait. Elle a un peu pleuré, en riant, en voyant combien de personnes s''étaient coordonnées sans qu''elle le sache.

Elle a compris une chose ce soir-là : elle s''était tellement habituée à prendre soin des autres qu''elle avait oublié ce que ça fait d''être celle dont on prend soin.

Se laisser surprendre, parfois, est un acte de confiance envers ceux qui nous aiment.',
  'manual',
  'good',
  'evening',
  array['relazioni', 'presenza', 'autocura']
),
(
  'story',
  'fr',
  'Les chaises vides du week-end',
  'Depuis que les enfants de Nicolas sont partis pour l''université, la maison le samedi est trop silencieuse. Pendant des mois, il a évité de s''asseoir dans la salle à manger, où les chaises vides semblaient lui reprocher quelque chose.

Un samedi, il a décidé d''en faire un rituel différent : il a mis la table quand même, même pour une personne, et a mangé là, regardant les chaises vides sans plus les craindre.

Elles ne sont pas devenues moins vides. Mais elles sont devenues une partie de la maison, pas une absence à éviter.

Les phases de la vie changent la forme des maisons. Il faut juste apprendre à les habiter à nouveau.',
  'manual',
  null,
  'evening',
  array['relazioni', 'tempo', 'presenza']
),
(
  'story',
  'fr',
  'Le groupe WhatsApp en sourdine',
  'Anaïs a mis en sourdine le groupe des anciennes camarades de lycée il y a six mois. Elle se sentait coupable à chaque fois qu''elle voyait les messages non lus s''accumuler.

Puis elle a compris que ce groupe, désormais, lui coûtait plus d''énergie qu''il ne lui en donnait. Les conversations étaient devenues une obligation sociale, pas un plaisir.

Elle ne l''a pas quitté. Elle l''a juste mis dans un coin de son attention, sans culpabilité.

Toutes les connexions n''ont pas besoin de rester actives. Certaines peuvent simplement exister, en pause, sans que ce soit une trahison.',
  'manual',
  'low',
  'evening',
  array['relazioni', 'confini', 'leggerezza']
),
(
  'story',
  'fr',
  'Le dîner du mercredi avec elle-même',
  'Depuis un an, chaque mercredi, Sophie réserve une table dans son restaurant préféré. Seule. Pas d''occasion spéciale, pas de raison à expliquer à qui demande.

Au début, elle se sentait étrange de le dire à voix haute : "J''ai un engagement mercredi." Un engagement envers elle-même semblait moins légitime qu''un engagement envers quelqu''un d''autre.

Maintenant, elle ne se justifie plus. C''est simplement une partie de sa semaine, protégée comme n''importe quel autre rendez-vous important.

Parfois, le plus grand respect qu''on puisse se donner est de traiter le temps avec soi-même comme non négociable.',
  'manual',
  'neutral',
  'evening',
  array['autocura', 'rituali', 'confini']
);

-- TIP

insert into public.contents (type, lang, title, body, source, mood_target, slot, tags) values
(
  'tip',
  'it',
  null,
  'Prima di una conversazione difficile con qualcuno che ami, chiediti cosa vuoi davvero ottenere: essere capita o avere ragione. Sono obiettivi diversi, e solo uno costruisce qualcosa.',
  'manual',
  null,
  'evening',
  array['relazioni', 'emozioni', 'mente']
),
(
  'tip',
  'it',
  null,
  'Se ti senti sola dopo una giornata piena di persone, non è una contraddizione. È il segnale che la quantità di interazioni non sostituisce la qualità della connessione.',
  'manual',
  'low',
  'evening',
  array['relazioni', 'emozioni']
),
(
  'tip',
  'it',
  null,
  'Manda oggi un messaggio a qualcuno a cui pensi spesso ma scrivi raramente. Non serve un motivo. ''Stavo pensando a te'' è già abbastanza.',
  'manual',
  null,
  'morning',
  array['relazioni', 'presenza']
),
(
  'tip',
  'it',
  null,
  'Una telefonata di sette minuti, fatta con costanza, costruisce più legame di una conversazione profonda fatta una volta all''anno. La regolarità conta più dell''intensità.',
  'manual',
  'neutral',
  'evening',
  array['relazioni', 'rituali', 'tempo']
),
(
  'tip',
  'it',
  null,
  'Quando qualcuno ti chiede ''come stai'' e rispondi automaticamente ''bene'', prova oggi a fermarti un secondo in più. Anche solo per te stessa.',
  'manual',
  null,
  'morning',
  array['emozioni', 'presenza', 'autocura']
),
(
  'tip',
  'it',
  null,
  'Se non hai la forza di parlare con nessuno stasera, va bene. Manda anche solo un''emoji a chi ti vuole bene. Far sapere che esisti è già un contatto.',
  'manual',
  'very_low',
  'evening',
  array['relazioni', 'resilienza', 'leggerezza']
),
(
  'tip',
  'it',
  null,
  'Quando una relazione ti dà energia, dillo a voce alta a quella persona. Le persone raramente sanno quanto bene fanno, se non gliel''lo dici.',
  'manual',
  'good',
  'evening',
  array['relazioni', 'energia']
),
(
  'tip',
  'it',
  null,
  'Lasciare un messaggio senza risposta non è maleducazione — a volte è la cosa più onesta da fare, quando non hai ancora le parole giuste.',
  'manual',
  null,
  'evening',
  array['relazioni', 'confini', 'tempo']
),
(
  'tip',
  'it',
  null,
  'Se hai paura di disturbare chiedendo aiuto, ricorda: le persone che ti vogliono bene preferiscono essere disturbate piuttosto che escluse.',
  'manual',
  'low',
  'morning',
  array['relazioni', 'resilienza', 'confini']
),
(
  'tip',
  'fr',
  null,
  'Avant une conversation difficile avec quelqu''un que tu aimes, demande-toi ce que tu veux vraiment obtenir : être comprise ou avoir raison. Ce sont des objectifs différents, et un seul construit quelque chose.',
  'manual',
  null,
  'evening',
  array['relazioni', 'emozioni', 'mente']
),
(
  'tip',
  'fr',
  null,
  'Si tu te sens seule après une journée pleine de monde, ce n''est pas une contradiction. C''est le signal que la quantité d''interactions ne remplace pas la qualité de la connexion.',
  'manual',
  'low',
  'evening',
  array['relazioni', 'emozioni']
),
(
  'tip',
  'fr',
  null,
  'Envoie aujourd''hui un message à quelqu''un à qui tu penses souvent mais à qui tu écris rarement. Pas besoin de raison. ''Je pensais à toi'' suffit déjà.',
  'manual',
  null,
  'morning',
  array['relazioni', 'presenza']
),
(
  'tip',
  'fr',
  null,
  'Un appel de sept minutes, fait avec constance, construit plus de lien qu''une conversation profonde une fois par an. La régularité compte plus que l''intensité.',
  'manual',
  'neutral',
  'evening',
  array['relazioni', 'rituali', 'tempo']
),
(
  'tip',
  'fr',
  null,
  'Quand quelqu''un te demande ''comment vas-tu'' et que tu réponds automatiquement ''bien'', essaie aujourd''hui de t''arrêter une seconde de plus. Ne serait-ce que pour toi.',
  'manual',
  null,
  'morning',
  array['emozioni', 'presenza', 'autocura']
),
(
  'tip',
  'fr',
  null,
  'Si tu n''as pas la force de parler à quelqu''un ce soir, ça va. Envoie juste un emoji à qui t''aime. Faire savoir que tu existes est déjà un contact.',
  'manual',
  'very_low',
  'evening',
  array['relazioni', 'resilienza', 'leggerezza']
),
(
  'tip',
  'fr',
  null,
  'Quand une relation te donne de l''énergie, dis-le à voix haute à cette personne. Les gens savent rarement à quel point ils font du bien, si on ne le leur dit pas.',
  'manual',
  'good',
  'evening',
  array['relazioni', 'energia']
),
(
  'tip',
  'fr',
  null,
  'Laisser un message sans réponse n''est pas un manque de politesse — parfois c''est la chose la plus honnête à faire, quand tu n''as pas encore les bons mots.',
  'manual',
  null,
  'evening',
  array['relazioni', 'confini', 'tempo']
);

-- ============================================================
-- BLOCCO 3 — Corpo e ritmo (50 item)
-- ============================================================

-- THOUGHT

insert into public.contents (type, lang, title, body, source, mood_target, slot, tags) values
(
  'thought',
  'it',
  null,
  'Il corpo dice di no molto prima della mente. Imparare ad ascoltarlo prima del collasso è una competenza, non una debolezza.',
  'manual',
  null,
  'morning',
  array['corpo', 'resilienza']
),
(
  'thought',
  'it',
  null,
  'Se hai dormito male, oggi non è il giorno per chiederti di più di quanto puoi dare. Il riposo recuperato viene prima della produttività.',
  'manual',
  'low',
  'morning',
  array['corpo', 'energia']
),
(
  'thought',
  'it',
  null,
  'Le stagioni cambiano anche dentro di te. Non è un difetto sentirsi diversa a novembre rispetto a giugno.',
  'manual',
  null,
  'morning',
  array['corpo', 'tempo']
),
(
  'thought',
  'it',
  null,
  'Mangiare con calma, anche solo un pasto al giorno, è un atto di rispetto verso te stessa che nessuno vede ma il corpo ricorda.',
  'manual',
  'neutral',
  'morning',
  array['corpo', 'autocura']
),
(
  'thought',
  'it',
  null,
  'Quando il corpo si sente forte, è il momento di muoverlo — non per dovere, ma per la gioia pura del movimento.',
  'manual',
  'good',
  'morning',
  array['corpo', 'energia']
),
(
  'thought',
  'it',
  null,
  'Il sonno non è tempo perso. È la base silenziosa di ogni energia che userai domani.',
  'manual',
  null,
  'morning',
  array['corpo', 'energia']
),
(
  'thought',
  'it',
  null,
  'Se oggi il corpo chiede solo di restare fermo, ascoltalo. Non tutte le giornate richiedono movimento per avere valore.',
  'manual',
  'very_low',
  'morning',
  array['corpo', 'resilienza']
),
(
  'thought',
  'it',
  null,
  'Bere un bicchiere d''acqua prima del caffè non cambierà la tua vita. Ma è un piccolo gesto che dice al corpo: ti ascolto.',
  'manual',
  null,
  'morning',
  array['corpo', 'autocura']
),
(
  'thought',
  'it',
  null,
  'Quando senti il corpo carico di energia, è il segnale giusto per qualcosa di nuovo — una camminata diversa, uno sport mai provato.',
  'manual',
  'great',
  'morning',
  array['corpo', 'energia']
),
(
  'thought',
  'fr',
  null,
  'Le corps dit non bien avant l''esprit. Apprendre à l''écouter avant l''effondrement est une compétence, pas une faiblesse.',
  'manual',
  null,
  'morning',
  array['corpo', 'resilienza']
),
(
  'thought',
  'fr',
  null,
  'Si tu as mal dormi, aujourd''hui n''est pas le jour pour te demander plus que ce que tu peux donner. Le repos récupéré passe avant la productivité.',
  'manual',
  'low',
  'morning',
  array['corpo', 'energia']
),
(
  'thought',
  'fr',
  null,
  'Les saisons changent aussi en toi. Ce n''est pas un défaut de se sentir différente en novembre qu''en juin.',
  'manual',
  null,
  'morning',
  array['corpo', 'tempo']
),
(
  'thought',
  'fr',
  null,
  'Manger calmement, même un seul repas par jour, est un acte de respect envers toi-même que personne ne voit mais que le corps retient.',
  'manual',
  'neutral',
  'morning',
  array['corpo', 'autocura']
),
(
  'thought',
  'fr',
  null,
  'Quand le corps se sent fort, c''est le moment de le bouger — pas par obligation, mais pour la pure joie du mouvement.',
  'manual',
  'good',
  'morning',
  array['corpo', 'energia']
),
(
  'thought',
  'fr',
  null,
  'Le sommeil n''est pas du temps perdu. C''est la base silencieuse de toute l''énergie que tu utiliseras demain.',
  'manual',
  null,
  'morning',
  array['corpo', 'energia']
),
(
  'thought',
  'fr',
  null,
  'Si aujourd''hui le corps demande juste à rester immobile, écoute-le. Toutes les journées n''ont pas besoin de mouvement pour avoir de la valeur.',
  'manual',
  'very_low',
  'morning',
  array['corpo', 'resilienza']
),
(
  'thought',
  'fr',
  null,
  'Quand tu sens le corps plein d''énergie, c''est le bon signal pour quelque chose de nouveau — une marche différente, un sport jamais essayé.',
  'manual',
  'great',
  'morning',
  array['corpo', 'energia']
);

-- STORY

insert into public.contents (type, lang, title, body, source, mood_target, slot, tags) values
(
  'story',
  'it',
  'I diciotto minuti di Francesca',
  'Francesca ha calcolato una volta quanto tempo impiega a camminare fino al parco vicino casa e tornare: diciotto minuti. Da allora, quando la giornata sembra incomprensibile, fa esattamente quel giro.

Non è una passeggiata contemplativa con musica o podcast. È solo camminare, guardare gli alberi, sentire l''aria.

Diciotto minuti non risolvono niente di concreto. Ma quasi sempre, tornando, qualcosa nella sua testa si è riordinato — non perché abbia pensato meglio, ma perché ha smesso di pensare per un po''.

Il corpo in movimento, a volte, fa il lavoro che la mente da sola non riesce a fare.',
  'manual',
  'neutral',
  'evening',
  array['corpo', 'rituali', 'mente']
),
(
  'story',
  'it',
  'Il letto rifatto alle nove di sera',
  'Quando Elisa attraversa periodi difficili, fa una cosa che a molti sembra strana: rifà il letto alle nove di sera, prima ancora di pensare a dormire.

Non per ordine. Per il gesto in sé — tendere le lenzuola, sistemare i cuscini, creare uno spazio che sembri accogliente prima ancora di entrarci.

Ha notato che il modo in cui tratta il proprio letto, nei periodi più bui, dice molto su come sta trattando sé stessa.

Un piccolo atto di cura verso uno spazio fisico, a volte, è l''unico atto di cura che si riesce a fare in quel momento — ed è comunque sufficiente.',
  'manual',
  'low',
  'evening',
  array['corpo', 'rituali', 'autocura']
),
(
  'story',
  'it',
  'La doccia che separa i mondi',
  'Andrea ha lavorato da casa per tre anni senza notare quanto i confini tra lavoro e vita personale si fossero sciolti, fino a quando un''amica le ha chiesto: "Ma tu quando smetti di essere in ufficio?"

Da quel giorno ha introdotto un rito: alle 18:30, doccia. Non per igiene — il corpo non era sporco. Per segnare fisicamente un passaggio che il calendario non segnava più.

Esce dalla doccia ed è un''altra persona, anche se nessuno fuori lo vede.

A volte servono segnali fisici per confini che la mente da sola non riesce a tracciare.',
  'manual',
  null,
  'evening',
  array['corpo', 'confini', 'rituali']
),
(
  'story',
  'it',
  'Le tre ore di buio di Sofia',
  'Durante il periodo più duro dell''anno, Sofia ha scoperto che le tre ore prima di dormire erano le più difficili — la mente vagava verso pensieri che il giorno teneva a bada.

Ha provato di tutto: serie tv, libri, telefono. Niente funzionava davvero. Poi ha iniziato semplicemente a spegnere le luci un''ora prima e stare al buio, senza fare niente.

Non era meditazione. Era solo permettersi di essere nel buio senza riempirlo di distrazioni.

Stranamente, è stato l''unico rimedio che ha funzionato — non eliminare il disagio, ma smettere di combatterlo con rumore.',
  'manual',
  'very_low',
  'evening',
  array['corpo', 'resilienza', 'silenzio']
),
(
  'story',
  'it',
  'La corsa del sabato di Beatrice',
  'Beatrice corre ogni sabato mattina da quattro anni, indipendentemente dal meteo, dal sonno, dagli impegni. Non per dimagrire, non per una gara — semplicemente perché quei quaranta minuti sono gli unici della settimana in cui il suo corpo le appartiene completamente.

Non ascolta musica. Non guarda i tempi. Corre e basta, sentendo i polmoni lavorare, le gambe rispondere.

Ha notato che nei sabati in cui corre, anche la domenica è migliore. Come se il corpo, ringraziato, restituisse qualcosa.',
  'manual',
  'good',
  'evening',
  array['corpo', 'energia', 'rituali']
),
(
  'story',
  'it',
  'Il caffè che Marco beve da seduto',
  'Marco ha lavorato per anni bevendo il caffè in piedi, davanti al lavandino, mentre già pensava alla prossima cosa da fare. Un giorno ha deciso, senza un motivo particolare, di sedersi.

Cinque minuti, seduto, senza telefono, guardando il vapore salire dalla tazza.

Non ha cambiato la sua giornata in modo evidente. Ma ha notato che quei cinque minuti seduti gli davano una sensazione di aver iniziato la giornata da una posizione di calma, non di corsa.

A volte il corpo seduto manda al cervello un messaggio diverso da quello in piedi: non c''è fretta.',
  'manual',
  null,
  'evening',
  array['corpo', 'rituali', 'presenza']
),
(
  'story',
  'it',
  'Il pigiama indossato tutto il giorno',
  'Giorgia ha passato una domenica intera in pigiama, senza uscire, senza vestirsi, senza un obiettivo preciso. Per anni si sarebbe sentita in colpa — una giornata "sprecata".

Quella domenica ha deciso che non lo era. Il corpo aveva bisogno di non essere presentabile per nessuno, nemmeno per sé stessa.

Ha letto, ha dormito un''ora nel pomeriggio, ha mangiato quello che voleva senza pensare se fosse "giusto".

Il lunedì è tornata al lavoro più riposata di quanto non fosse da settimane. Il riposo vero, a volte, sembra pigrizia solo a chi non ne ha bisogno.',
  'manual',
  'low',
  'evening',
  array['corpo', 'autocura', 'leggerezza']
),
(
  'story',
  'it',
  'Le scarpe da ginnastica lasciate in macchina',
  'Da un anno, Chiara tiene un paio di scarpe da ginnastica nel bagagliaio dell''auto. Non per un piano specifico di allenamento — per non avere scuse quando capita un momento libero.

Tre volte su dieci le usa davvero. Le altre sette restano lì, inutilizzate, e va bene così.

Quello che conta non è la frequenza con cui cammina o corre, ma il fatto che la possibilità sia sempre lì, pronta, senza bisogno di organizzazione.

A volte ridurre l''attrito è più efficace di qualsiasi motivazione.',
  'manual',
  'neutral',
  'evening',
  array['corpo', 'energia', 'priorità']
),
(
  'story',
  'fr',
  'Les dix-huit minutes de Camille',
  'Camille a calculé un jour combien de temps il fallait pour marcher jusqu''au parc près de chez elle et revenir : dix-huit minutes. Depuis, quand la journée semble incompréhensible, elle fait exactement ce tour.

Ce n''est pas une promenade contemplative avec musique ou podcast. C''est juste marcher, regarder les arbres, sentir l''air.

Dix-huit minutes ne résolvent rien de concret. Mais presque toujours, en revenant, quelque chose dans sa tête s''est remis en ordre — pas parce qu''elle a mieux réfléchi, mais parce qu''elle a arrêté de réfléchir un moment.

Le corps en mouvement, parfois, fait le travail que l''esprit seul n''arrive pas à faire.',
  'manual',
  'neutral',
  'evening',
  array['corpo', 'rituali', 'mente']
),
(
  'story',
  'fr',
  'Le lit refait à neuf heures du soir',
  'Quand Élise traverse des périodes difficiles, elle fait une chose qui semble étrange à beaucoup : elle refait son lit à neuf heures du soir, avant même de penser à dormir.

Pas par ordre. Pour le geste en soi — tendre les draps, arranger les coussins, créer un espace accueillant avant même d''y entrer.

Elle a remarqué que la façon dont elle traite son lit, dans les périodes les plus sombres, en dit long sur comment elle se traite elle-même.

Un petit acte de soin envers un espace physique, parfois, est le seul acte de soin qu''on arrive à faire à ce moment-là — et c''est suffisant quand même.',
  'manual',
  'low',
  'evening',
  array['corpo', 'rituali', 'autocura']
),
(
  'story',
  'fr',
  'La douche qui sépare les mondes',
  'Antoine a travaillé de chez lui pendant trois ans sans remarquer combien les limites entre travail et vie personnelle s''étaient dissoutes, jusqu''à ce qu''une amie lui demande : "Mais toi, quand est-ce que tu arrêtes d''être au bureau ?"

Depuis ce jour, il a introduit un rituel : à 18h30, douche. Pas pour l''hygiène — le corps n''était pas sale. Pour marquer physiquement un passage que le calendrier ne marquait plus.

Il sort de la douche et c''est une autre personne, même si personne dehors ne le voit.

Parfois, il faut des signaux physiques pour des limites que l''esprit seul n''arrive pas à tracer.',
  'manual',
  null,
  'evening',
  array['corpo', 'confini', 'rituali']
),
(
  'story',
  'fr',
  'Les trois heures d''obscurité de Lola',
  'Pendant la période la plus dure de l''année, Lola a découvert que les trois heures avant de dormir étaient les plus difficiles — l''esprit vagabondait vers des pensées que le jour tenait à distance.

Elle a tout essayé : séries, livres, téléphone. Rien ne fonctionnait vraiment. Puis elle a commencé simplement à éteindre les lumières une heure avant et rester dans le noir, sans rien faire.

Ce n''était pas de la méditation. C''était juste se permettre d''être dans l''obscurité sans la remplir de distractions.

Étrangement, c''est le seul remède qui a fonctionné — pas éliminer le malaise, mais arrêter de le combattre avec du bruit.',
  'manual',
  'very_low',
  'evening',
  array['corpo', 'resilienza', 'silenzio']
),
(
  'story',
  'fr',
  'La course du samedi de Clara',
  'Clara court tous les samedis matin depuis quatre ans, peu importe la météo, le sommeil, les engagements. Pas pour maigrir, pas pour une course — simplement parce que ces quarante minutes sont les seules de la semaine où son corps lui appartient complètement.

Elle n''écoute pas de musique. Elle ne regarde pas les temps. Elle court, c''est tout, sentant ses poumons travailler, ses jambes répondre.

Elle a remarqué que les samedis où elle court, même le dimanche est meilleur. Comme si le corps, remercié, rendait quelque chose.',
  'manual',
  'good',
  'evening',
  array['corpo', 'energia', 'rituali']
),
(
  'story',
  'fr',
  'Le café que Paul boit assis',
  'Paul a travaillé pendant des années en buvant son café debout, devant l''évier, pensant déjà à la prochaine chose à faire. Un jour, sans raison particulière, il a décidé de s''asseoir.

Cinq minutes, assis, sans téléphone, regardant la vapeur monter de la tasse.

Ça n''a pas changé sa journée de façon visible. Mais il a remarqué que ces cinq minutes assises lui donnaient l''impression d''avoir commencé la journée depuis une position de calme, pas de course.

Parfois le corps assis envoie au cerveau un message différent que debout : il n''y a pas d''urgence.',
  'manual',
  null,
  'evening',
  array['corpo', 'rituali', 'presenza']
),
(
  'story',
  'fr',
  'Le pyjama porté toute la journée',
  'Manon a passé un dimanche entier en pyjama, sans sortir, sans s''habiller, sans objectif précis. Pendant des années, elle se serait sentie coupable — une journée "gâchée".

Ce dimanche-là, elle a décidé que non. Le corps avait besoin de ne pas être présentable pour personne, pas même pour elle-même.

Elle a lu, dormi une heure l''après-midi, mangé ce qu''elle voulait sans se demander si c''était "correct".

Le lundi, elle est retournée au travail plus reposée qu''elle ne l''avait été depuis des semaines. Le vrai repos, parfois, ressemble à de la paresse seulement pour ceux qui n''en ont pas besoin.',
  'manual',
  'low',
  'evening',
  array['corpo', 'autocura', 'leggerezza']
),
(
  'story',
  'fr',
  'Les baskets laissées dans la voiture',
  'Depuis un an, Inès garde une paire de baskets dans le coffre de la voiture. Pas pour un plan d''entraînement précis — pour ne pas avoir d''excuse quand un moment libre se présente.

Trois fois sur dix, elle les utilise vraiment. Les sept autres fois, elles restent là, inutilisées, et c''est très bien ainsi.

Ce qui compte n''est pas la fréquence à laquelle elle marche ou court, mais le fait que la possibilité soit toujours là, prête, sans besoin d''organisation.

Parfois réduire la friction est plus efficace que n''importe quelle motivation.',
  'manual',
  'neutral',
  'evening',
  array['corpo', 'energia', 'priorità']
);

-- TIP

insert into public.contents (type, lang, title, body, source, mood_target, slot, tags) values
(
  'tip',
  'it',
  null,
  'Prima di controllare il telefono al risveglio, fai tre respiri profondi a occhi chiusi. Il corpo entra nella giornata in modo diverso se non parte già da uno schermo.',
  'manual',
  null,
  'morning',
  array['corpo', 'rituali', 'presenza']
),
(
  'tip',
  'it',
  null,
  'Se la sera ti senti irrequieta senza motivo apparente, prova a chiederti: ho bevuto abbastanza acqua oggi? Ho mangiato qualcosa di sostanzioso? Spesso il disagio è più fisico di quanto sembri.',
  'manual',
  'low',
  'evening',
  array['corpo', 'emozioni']
),
(
  'tip',
  'it',
  null,
  'La luce blu degli schermi prima di dormire confonde il corpo sul fatto che sia ora di riposare. Anche solo trenta minuti senza schermo migliorano la qualità del sonno.',
  'manual',
  null,
  'evening',
  array['corpo', 'rituali']
),
(
  'tip',
  'it',
  null,
  'Se il corpo è esausto, non serve forzarlo con caffeina extra. A volte la cosa più produttiva è un pisolino di venti minuti, non una tazza in più.',
  'manual',
  'very_low',
  'morning',
  array['corpo', 'energia', 'resilienza']
),
(
  'tip',
  'it',
  null,
  'Stirare il corpo per due minuti appena svegli — braccia, schiena, collo — manda un segnale di attivazione più gentile di quanto faccia un allarme che suona di colpo.',
  'manual',
  null,
  'morning',
  array['corpo', 'rituali']
),
(
  'tip',
  'it',
  null,
  'Quando il corpo si sente in forma, prova un movimento nuovo invece del solito. La varietà mantiene alta la motivazione più della ripetizione.',
  'manual',
  'good',
  'morning',
  array['corpo', 'energia']
),
(
  'tip',
  'it',
  null,
  'Mangiare l''ultimo pasto almeno due ore prima di dormire migliora visibilmente la qualità del sonno. Un piccolo aggiustamento, un effetto consistente.',
  'manual',
  null,
  'evening',
  array['corpo', 'rituali']
),
(
  'tip',
  'it',
  null,
  'Il freddo improvviso sul viso — una finestra aperta, acqua fresca — è uno dei modi più rapidi per resettare l''attenzione quando la mente è confusa.',
  'manual',
  'neutral',
  'morning',
  array['corpo', 'mente']
),
(
  'tip',
  'it',
  null,
  'Se ti senti a corto di energia da giorni, prima di cercare soluzioni complesse, controlla le basi: sonno, idratazione, pasti regolari. Spesso la risposta è semplice, non facile.',
  'manual',
  'low',
  'morning',
  array['corpo', 'energia', 'resilienza']
),
(
  'tip',
  'fr',
  null,
  'Avant de vérifier ton téléphone au réveil, fais trois respirations profondes les yeux fermés. Le corps entre dans la journée différemment s''il ne part pas déjà d''un écran.',
  'manual',
  null,
  'morning',
  array['corpo', 'rituali', 'presenza']
),
(
  'tip',
  'fr',
  null,
  'Si le soir tu te sens agitée sans raison apparente, demande-toi : ai-je bu assez d''eau aujourd''hui ? Ai-je mangé quelque chose de consistant ? Souvent le malaise est plus physique qu''il n''y paraît.',
  'manual',
  'low',
  'evening',
  array['corpo', 'emozioni']
),
(
  'tip',
  'fr',
  null,
  'La lumière bleue des écrans avant de dormir confond le corps sur le fait qu''il est temps de se reposer. Même seulement trente minutes sans écran améliorent la qualité du sommeil.',
  'manual',
  null,
  'evening',
  array['corpo', 'rituali']
),
(
  'tip',
  'fr',
  null,
  'Si le corps est épuisé, inutile de le forcer avec de la caféine en plus. Parfois la chose la plus productive est une sieste de vingt minutes, pas une tasse de plus.',
  'manual',
  'very_low',
  'morning',
  array['corpo', 'energia', 'resilienza']
),
(
  'tip',
  'fr',
  null,
  'Étirer le corps deux minutes au réveil — bras, dos, cou — envoie un signal d''activation plus doux qu''une alarme qui sonne d''un coup.',
  'manual',
  null,
  'morning',
  array['corpo', 'rituali']
),
(
  'tip',
  'fr',
  null,
  'Quand le corps se sent en forme, essaie un mouvement nouveau au lieu de l''habituel. La variété maintient la motivation mieux que la répétition.',
  'manual',
  'good',
  'morning',
  array['corpo', 'energia']
),
(
  'tip',
  'fr',
  null,
  'Manger le dernier repas au moins deux heures avant de dormir améliore visiblement la qualité du sommeil. Un petit ajustement, un effet constant.',
  'manual',
  null,
  'evening',
  array['corpo', 'rituali']
),
(
  'tip',
  'fr',
  null,
  'Le froid soudain sur le visage — une fenêtre ouverte, de l''eau fraîche — est l''une des façons les plus rapides de réinitialiser l''attention quand l''esprit est confus.',
  'manual',
  'neutral',
  'morning',
  array['corpo', 'mente']
);

-- ============================================================
-- BLOCCO 4 — Identità e tempo (50 item)
-- ============================================================

-- THOUGHT

insert into public.contents (type, lang, title, body, source, mood_target, slot, tags) values
(
  'thought',
  'it',
  null,
  'Non sei in ritardo sulla tua vita. Stai semplicemente vivendo l''unica versione possibile di essa.',
  'manual',
  null,
  'morning',
  array['tempo', 'mente']
),
(
  'thought',
  'it',
  null,
  'Il rimpianto pesa di più quando lo porti in giro tutto il giorno. Lascialo dove serve — nella riflessione, non nell''azione quotidiana.',
  'manual',
  'low',
  'morning',
  array['emozioni', 'tempo']
),
(
  'thought',
  'it',
  null,
  'Cambiare idea a quarant''anni non è incoerenza. È il segno che hai continuato a guardare, invece di fermarti alla prima risposta.',
  'manual',
  null,
  'morning',
  array['mente', 'tempo']
),
(
  'thought',
  'it',
  null,
  'Non devi avere ancora capito cosa vuoi diventare. Puoi semplicemente essere quella che sei oggi.',
  'manual',
  'neutral',
  'morning',
  array['presenza', 'mente']
),
(
  'thought',
  'it',
  null,
  'L''ambizione che senti oggi non deve somigliare a quella di dieci anni fa. È normale che cambi forma insieme a te.',
  'manual',
  'good',
  'morning',
  array['priorità', 'energia']
),
(
  'thought',
  'it',
  null,
  'Il tempo che passa non ti toglie valore. Ti aggiunge versioni di te che prima non esistevano.',
  'manual',
  null,
  'morning',
  array['tempo', 'mente']
),
(
  'thought',
  'it',
  null,
  'Va bene non sapere dove stai andando. A volte il percorso si chiarisce solo camminando, non prima.',
  'manual',
  'very_low',
  'morning',
  array['resilienza', 'tempo']
),
(
  'thought',
  'it',
  null,
  'Non tutte le scelte fatte a vent''anni vanno difese a quaranta. Sei autorizzata a cambiare strada senza spiegazioni.',
  'manual',
  null,
  'morning',
  array['tempo', 'confini']
),
(
  'thought',
  'it',
  null,
  'Quando ti senti piena di energia, è il momento per chiederti cosa vuoi davvero costruire ora — non cosa avresti dovuto costruire prima.',
  'manual',
  'great',
  'morning',
  array['priorità', 'energia']
),
(
  'thought',
  'fr',
  null,
  'Tu n''es pas en retard sur ta vie. Tu vis simplement l''unique version possible de celle-ci.',
  'manual',
  null,
  'morning',
  array['tempo', 'mente']
),
(
  'thought',
  'fr',
  null,
  'Le regret pèse plus lourd quand tu le portes toute la journée. Laisse-le là où il sert — dans la réflexion, pas dans l''action quotidienne.',
  'manual',
  'low',
  'morning',
  array['emozioni', 'tempo']
),
(
  'thought',
  'fr',
  null,
  'Changer d''avis à quarante ans n''est pas de l''incohérence. C''est le signe que tu as continué à regarder, au lieu de t''arrêter à la première réponse.',
  'manual',
  null,
  'morning',
  array['mente', 'tempo']
),
(
  'thought',
  'fr',
  null,
  'Tu n''as pas encore besoin de savoir ce que tu veux devenir. Tu peux simplement être celle que tu es aujourd''hui.',
  'manual',
  'neutral',
  'morning',
  array['presenza', 'mente']
),
(
  'thought',
  'fr',
  null,
  'L''ambition que tu ressens aujourd''hui n''a pas à ressembler à celle d''il y a dix ans. C''est normal qu''elle change de forme avec toi.',
  'manual',
  'good',
  'morning',
  array['priorità', 'energia']
),
(
  'thought',
  'fr',
  null,
  'Le temps qui passe ne t''enlève pas de valeur. Il ajoute des versions de toi qui n''existaient pas avant.',
  'manual',
  null,
  'morning',
  array['tempo', 'mente']
),
(
  'thought',
  'fr',
  null,
  'C''est normal de ne pas savoir où tu vas. Parfois le chemin ne s''éclaire qu''en marchant, pas avant.',
  'manual',
  'very_low',
  'morning',
  array['resilienza', 'tempo']
),
(
  'thought',
  'fr',
  null,
  'Quand tu te sens pleine d''énergie, c''est le moment de te demander ce que tu veux vraiment construire maintenant — pas ce que tu aurais dû construire avant.',
  'manual',
  'great',
  'morning',
  array['priorità', 'energia']
);

-- STORY

insert into public.contents (type, lang, title, body, source, mood_target, slot, tags) values
(
  'story',
  'it',
  'Il quaderno di Silvia',
  'Silvia ha tenuto un diario per due anni, scrivendo ogni sera tre righe su come si sentiva. Non per terapia — per curiosità.

Rileggendolo dopo ventiquattro mesi, ha trovato una donna diversa da quella che pensava di essere stata. Più resistente nei momenti che ricordava come catastrofici, più fragile in quelli che credeva di aver attraversato senza difficoltà.

La memoria mente. Le tre righe scritte a caldo, invece, raccontavano una storia più onesta di quella che si era raccontata dopo.

A volte serve un documento esterno per vedere chi siamo state davvero, non chi crediamo di essere state.',
  'manual',
  'neutral',
  'evening',
  array['tempo', 'mente', 'rituali']
),
(
  'story',
  'it',
  'I quarant''anni di Federica',
  'Federica ha compiuto quarant''anni con una sensazione che non si aspettava: non tristezza per quello che non aveva fatto, ma stanchezza per quanto aveva passato a confrontarsi con un calendario immaginario.

"A trent''anni dovrei aver fatto questo. A trentacinque quest''altro." Una lista che non aveva mai scritto nessuno, eppure la seguiva come fosse legge.

Quel compleanno ha deciso di stracciarla, simbolicamente. Non aveva un piano alternativo. Aveva solo smesso di misurarsi con un''aspettativa che non era mai stata davvero sua.

Liberarsi da un calendario immaginario è più difficile che raggiungere qualsiasi scadenza reale.',
  'manual',
  'low',
  'evening',
  array['tempo', 'confini', 'resilienza']
),
(
  'story',
  'it',
  'La foto che Laura non ha mai stampato',
  'Laura ha una foto sul telefono, scattata sei anni fa, che continua a non stampare. È lei più giovane, più magra, prima di scelte che ora rifarebbe diversamente.

Per anni l''ha guardata con un misto di nostalgia e fastidio — come se quella versione di sé avesse qualcosa che lei ora ha perso.

Un giorno l''ha guardata senza quel filtro. Ha visto solo una donna in un momento della sua vita, non migliore né peggiore di quella attuale. Solo diversa.

Non ha ancora stampato la foto. Ma ora la guarda senza paragonarsi.',
  'manual',
  null,
  'evening',
  array['tempo', 'mente', 'emozioni']
),
(
  'story',
  'it',
  'Il momento in cui Greta ha smesso di chiedersi ''e se''',
  'Greta ha passato anni a costruire scenari alternativi: e se avesse accettato quel trasferimento, e se avesse detto sì a quella persona, e se avesse scelto un altro lavoro.

Durante un periodo particolarmente buio, ha capito che quei "e se" non la stavano aiutando a capire il presente — la stavano solo allontanando da esso.

Non ha smesso di colpo. Ha iniziato a notare quando il pensiero arrivava, e a dirsi semplicemente: "Questo non è successo. Cosa succede invece adesso?"

Non ha risolto i suoi rimpianti. Ha solo smesso di vivere in un tempo che non esisteva.',
  'manual',
  'very_low',
  'evening',
  array['mente', 'tempo', 'resilienza']
),
(
  'story',
  'it',
  'Il nuovo inizio di Cristina a 43 anni',
  'Cristina ha lasciato un lavoro sicuro a 43 anni per aprire qualcosa di suo. Molti le hanno chiesto se non fosse "tardi" per ricominciare.

Lei ha risposto sempre la stessa cosa: "Tardi rispetto a cosa?" Non aveva un orologio biologico professionale da rispettare, solo una vita da vivere nel modo che sentiva giusto adesso.

Il primo anno è stato difficile. Il secondo, meno. Al terzo, quando qualcuno le ha chiesto se rifarebbe la stessa scelta, ha risposto senza esitare: "Avrei voluto farlo prima — ma sono arrivata quando ero pronta."',
  'manual',
  'good',
  'evening',
  array['priorità', 'energia', 'tempo']
),
(
  'story',
  'it',
  'L''agenda vuota di agosto',
  'Per la prima volta in dieci anni, Bianca ha lasciato due settimane di agosto completamente vuote in agenda. Nessun piano, nessun viaggio organizzato, nessun obiettivo da raggiungere.

Le prime ore l''ansia di "dover fare qualcosa" è stata fortissima. Si è sorpresa a cercare cose da pianificare anche in quel vuoto volontario.

Poi, lentamente, ha smesso di riempire lo spazio. Ha lasciato che le giornate si formassero da sole — un libro qui, una passeggiata lì, niente di programmato.

Ha scoperto che il vuoto, quando è scelto e non subito, non fa paura. Fa spazio.',
  'manual',
  null,
  'evening',
  array['tempo', 'leggerezza', 'priorità']
),
(
  'story',
  'it',
  'Le lettere che Valeria scrive a sé stessa',
  'Ogni capodanno, Valeria scrive una lettera alla sé stessa di un anno dopo. La sigilla, la mette in un cassetto, e la apre esattamente dodici mesi più tardi.

Ha iniziato dopo un anno particolarmente difficile, come modo per parlare a una versione futura di sé che, sperava, sarebbe stata in un posto migliore.

Leggendo le lettere passate, ha notato un pattern: la Valeria di un anno prima era sempre più preoccupata di quanto la situazione meritasse. Le cose, quasi sempre, erano andate meglio di come temeva.

Non è una garanzia per il futuro. Ma è un promemoria utile: il presente difficile raramente è permanente quanto sembra.',
  'manual',
  'low',
  'evening',
  array['tempo', 'resilienza', 'rituali']
),
(
  'story',
  'it',
  'Il compleanno che Nadia non ha festeggiato',
  'Nadia ha lasciato passare il suo quarantaduesimo compleanno senza dirlo a nessuno. Non per tristezza — per il bisogno di un giorno qualunque, senza l''obbligo sociale di essere felice secondo un copione.

Ha lavorato la mattina, ha fatto la spesa nel pomeriggio, ha cenato da sola guardando una serie. Niente di speciale, esattamente come voleva.

Il giorno dopo si è sentita stranamente leggera. Aveva tolto al compleanno il peso dell''aspettativa, e gli aveva restituito la sua natura più semplice: un altro giorno, vissuto a modo suo.',
  'manual',
  'neutral',
  'evening',
  array['tempo', 'leggerezza', 'confini']
),
(
  'story',
  'fr',
  'Le carnet de Justine',
  'Justine a tenu un journal pendant deux ans, écrivant chaque soir trois lignes sur comment elle se sentait. Pas pour la thérapie — par curiosité.

En le relisant après vingt-quatre mois, elle a trouvé une femme différente de celle qu''elle pensait avoir été. Plus résistante dans les moments dont elle se souvenait comme catastrophiques, plus fragile dans ceux qu''elle croyait avoir traversés sans difficulté.

La mémoire ment. Les trois lignes écrites à chaud, elles, racontaient une histoire plus honnête que celle qu''elle s''était racontée après.

Parfois il faut un document extérieur pour voir qui nous avons vraiment été, pas qui nous croyons avoir été.',
  'manual',
  'neutral',
  'evening',
  array['tempo', 'mente', 'rituali']
),
(
  'story',
  'fr',
  'Les quarante ans de Florence',
  'Florence a eu quarante ans avec une sensation qu''elle n''attendait pas : pas de tristesse pour ce qu''elle n''avait pas fait, mais de la fatigue d''avoir tant comparé sa vie à un calendrier imaginaire.

"À trente ans je devrais avoir fait ça. À trente-cinq cette autre chose." Une liste que personne n''avait jamais écrite, et pourtant elle la suivait comme une loi.

Cet anniversaire-là, elle a décidé de la déchirer, symboliquement. Elle n''avait pas de plan alternatif. Elle avait juste arrêté de se mesurer à une attente qui n''avait jamais vraiment été la sienne.

Se libérer d''un calendrier imaginaire est plus difficile qu''atteindre n''importe quelle échéance réelle.',
  'manual',
  'low',
  'evening',
  array['tempo', 'confini', 'resilienza']
),
(
  'story',
  'fr',
  'La photo que Laure n''a jamais imprimée',
  'Laure a une photo sur son téléphone, prise il y a six ans, qu''elle continue à ne pas imprimer. C''est elle plus jeune, plus mince, avant des choix qu''elle referait aujourd''hui différemment.

Pendant des années, elle l''a regardée avec un mélange de nostalgie et d''agacement — comme si cette version d''elle-même avait quelque chose qu''elle a maintenant perdu.

Un jour, elle l''a regardée sans ce filtre. Elle n''a vu qu''une femme à un moment de sa vie, ni meilleure ni pire que celle d''aujourd''hui. Juste différente.

Elle n''a toujours pas imprimé la photo. Mais maintenant elle la regarde sans se comparer.',
  'manual',
  null,
  'evening',
  array['tempo', 'mente', 'emozioni']
),
(
  'story',
  'fr',
  'Le moment où Margot a arrêté de se demander ''et si''',
  'Margot a passé des années à construire des scénarios alternatifs : et si elle avait accepté cette mutation, et si elle avait dit oui à cette personne, et si elle avait choisi un autre métier.

Pendant une période particulièrement sombre, elle a compris que ces "et si" ne l''aidaient pas à comprendre le présent — ils l''en éloignaient seulement.

Elle n''a pas arrêté d''un coup. Elle a commencé à remarquer quand la pensée arrivait, et à se dire simplement : "Ça n''est pas arrivé. Que se passe-t-il maintenant à la place ?"

Elle n''a pas résolu ses regrets. Elle a juste arrêté de vivre dans un temps qui n''existait pas.',
  'manual',
  'very_low',
  'evening',
  array['mente', 'tempo', 'resilienza']
),
(
  'story',
  'fr',
  'Le nouveau départ de Christine à 43 ans',
  'Christine a quitté un emploi sûr à 43 ans pour ouvrir quelque chose à elle. Beaucoup lui ont demandé si ce n''était pas "tard" pour recommencer.

Elle a toujours répondu la même chose : "Tard par rapport à quoi ?" Elle n''avait pas d''horloge biologique professionnelle à respecter, juste une vie à vivre comme elle le sentait juste maintenant.

La première année a été difficile. La deuxième, moins. À la troisième, quand on lui a demandé si elle referait le même choix, elle a répondu sans hésiter : "J''aurais voulu le faire plus tôt — mais je suis arrivée quand j''étais prête."',
  'manual',
  'good',
  'evening',
  array['priorità', 'energia', 'tempo']
),
(
  'story',
  'fr',
  'L''agenda vide d''août',
  'Pour la première fois en dix ans, Blanche a laissé deux semaines d''août complètement vides dans son agenda. Aucun plan, aucun voyage organisé, aucun objectif à atteindre.

Les premières heures, l''anxiété de "devoir faire quelque chose" a été très forte. Elle s''est surprise à chercher des choses à planifier même dans ce vide volontaire.

Puis, lentement, elle a arrêté de remplir l''espace. Elle a laissé les journées se former d''elles-mêmes — un livre ici, une promenade là, rien de programmé.

Elle a découvert que le vide, quand il est choisi et non subi, ne fait pas peur. Il fait de la place.',
  'manual',
  null,
  'evening',
  array['tempo', 'leggerezza', 'priorità']
),
(
  'story',
  'fr',
  'Les lettres que Valentine s''écrit',
  'Chaque nouvel an, Valentine écrit une lettre à elle-même d''un an plus tard. Elle la scelle, la met dans un tiroir, et l''ouvre exactement douze mois après.

Elle a commencé après une année particulièrement difficile, comme façon de parler à une version future d''elle-même qui, espérait-elle, serait dans un meilleur endroit.

En relisant les lettres passées, elle a remarqué un schéma : la Valentine d''un an avant était toujours plus inquiète que la situation ne le méritait. Les choses, presque toujours, s''étaient mieux passées qu''elle ne le craignait.

Ce n''est pas une garantie pour l''avenir. Mais c''est un rappel utile : le présent difficile est rarement aussi permanent qu''il n''y paraît.',
  'manual',
  'low',
  'evening',
  array['tempo', 'resilienza', 'rituali']
),
(
  'story',
  'fr',
  'L''anniversaire que Nadia n''a pas fêté',
  'Nadia a laissé passer son quarante-deuxième anniversaire sans le dire à personne. Pas par tristesse — par besoin d''un jour ordinaire, sans l''obligation sociale d''être heureuse selon un scénario.

Elle a travaillé le matin, fait les courses l''après-midi, dîné seule en regardant une série. Rien de spécial, exactement comme elle le voulait.

Le lendemain, elle s''est sentie étrangement légère. Elle avait retiré à l''anniversaire le poids de l''attente, et lui avait rendu sa nature la plus simple : un autre jour, vécu à sa façon.',
  'manual',
  'neutral',
  'evening',
  array['tempo', 'leggerezza', 'confini']
);

-- TIP

insert into public.contents (type, lang, title, body, source, mood_target, slot, tags) values
(
  'tip',
  'it',
  null,
  'Confronta la te di oggi solo con la te di un anno fa, mai con chi pensavi di dover diventare. È l''unico confronto che restituisce informazioni utili.',
  'manual',
  null,
  'morning',
  array['tempo', 'mente']
),
(
  'tip',
  'it',
  null,
  'Se un rimpianto torna spesso la sera, scrivilo una volta, per intero, su carta. Vederlo fuori dalla testa spesso ne riduce il peso ricorrente.',
  'manual',
  'low',
  'evening',
  array['emozioni', 'tempo', 'mente']
),
(
  'tip',
  'it',
  null,
  'Chiediti oggi: questa ambizione è mia, o è qualcosa che ho ereditato senza esaminarla? Non tutti gli obiettivi vanno tenuti solo perché li hai sempre avuti.',
  'manual',
  null,
  'morning',
  array['priorità', 'mente']
),
(
  'tip',
  'it',
  null,
  'Tieni un quaderno con tre righe al giorno, anche solo per un mese. Rileggerlo dopo tempo racconta una storia più onesta di quella che ricordi a memoria.',
  'manual',
  'neutral',
  'evening',
  array['tempo', 'rituali', 'mente']
),
(
  'tip',
  'it',
  null,
  'Le decisioni prese a vent''anni con le informazioni di allora non vanno giudicate con gli occhi di oggi. Eri la persona giusta per quel momento, con ciò che sapevi.',
  'manual',
  null,
  'morning',
  array['tempo', 'resilienza']
),
(
  'tip',
  'it',
  null,
  'Se ti senti persa rispetto a dove dovresti essere, ricorda: la maggior parte delle vite non procede in linea retta. Le svolte non sono fallimenti.',
  'manual',
  'very_low',
  'morning',
  array['resilienza', 'tempo']
),
(
  'tip',
  'it',
  null,
  'Quando ti senti motivata a cambiare qualcosa di importante, scrivi perché lo vuoi fare ora — non perché ''era ora''. La motivazione autentica regge meglio nel tempo.',
  'manual',
  'good',
  'morning',
  array['priorità', 'energia']
),
(
  'tip',
  'it',
  null,
  'Lascia almeno un weekend al mese completamente non pianificato. Il vuoto scelto rigenera in modo diverso da quello subito.',
  'manual',
  null,
  'evening',
  array['tempo', 'leggerezza']
),
(
  'tip',
  'it',
  null,
  'Se ti senti indietro rispetto a coetanee o colleghe, ricorda che vedi solo i loro risultati, mai il loro percorso completo. Il confronto è sempre con un''immagine parziale.',
  'manual',
  'low',
  'morning',
  array['mente', 'emozioni', 'tempo']
),
(
  'tip',
  'fr',
  null,
  'Compare la toi d''aujourd''hui seulement à la toi d''il y a un an, jamais à celle que tu pensais devoir devenir. C''est la seule comparaison qui donne des informations utiles.',
  'manual',
  null,
  'morning',
  array['tempo', 'mente']
),
(
  'tip',
  'fr',
  null,
  'Si un regret revient souvent le soir, écris-le une fois, en entier, sur papier. Le voir sorti de ta tête réduit souvent son poids récurrent.',
  'manual',
  'low',
  'evening',
  array['emozioni', 'tempo', 'mente']
),
(
  'tip',
  'fr',
  null,
  'Demande-toi aujourd''hui : cette ambition est-elle la mienne, ou quelque chose que j''ai hérité sans l''examiner ? Tous les objectifs ne doivent pas être gardés juste parce que tu les as toujours eus.',
  'manual',
  null,
  'morning',
  array['priorità', 'mente']
),
(
  'tip',
  'fr',
  null,
  'Tiens un carnet avec trois lignes par jour, ne serait-ce que pendant un mois. Le relire plus tard raconte une histoire plus honnête que celle dont tu te souviens.',
  'manual',
  'neutral',
  'evening',
  array['tempo', 'rituali', 'mente']
),
(
  'tip',
  'fr',
  null,
  'Les décisions prises à vingt ans avec les informations de l''époque ne doivent pas être jugées avec les yeux d''aujourd''hui. Tu étais la bonne personne pour ce moment-là, avec ce que tu savais.',
  'manual',
  null,
  'morning',
  array['tempo', 'resilienza']
),
(
  'tip',
  'fr',
  null,
  'Si tu te sens perdue par rapport à où tu devrais être, souviens-toi : la plupart des vies n''avancent pas en ligne droite. Les détours ne sont pas des échecs.',
  'manual',
  'very_low',
  'morning',
  array['resilienza', 'tempo']
),
(
  'tip',
  'fr',
  null,
  'Quand tu te sens motivée à changer quelque chose d''important, écris pourquoi tu veux le faire maintenant — pas parce que ''c''était l''heure''. La motivation authentique tient mieux dans le temps.',
  'manual',
  'good',
  'morning',
  array['priorità', 'energia']
),
(
  'tip',
  'fr',
  null,
  'Laisse au moins un week-end par mois complètement non planifié. Le vide choisi régénère différemment du vide subi.',
  'manual',
  null,
  'evening',
  array['tempo', 'leggerezza']
);

-- ============================================================
-- Verifica finale
-- ============================================================
select type, lang, slot, mood_target, substring(body, 1, 60) as preview
from public.contents
where source = 'manual'
order by type, lang;
