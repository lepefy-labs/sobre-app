-- ============================================================
-- SOBRE - Seed contenuti iniziali (10 items)
-- 3 pensieri (thought), 4 storie (story), 3 consigli (tip)
-- Lingue: IT e FR
-- ============================================================

insert into public.contents (type, lang, title, body, source, mood_target, slot, tags) values

-- ============================================================
-- PENSIERI (thought) — brevi, per la mattina
-- ============================================================

(
  'thought',
  'it',
  null,
  'Oggi non devi essere perfetta. Devi solo essere presente.',
  'manual',
  null,       -- universale
  'morning',
  array['mindfulness', 'autocura', 'presenza']
),

(
  'thought',
  'it',
  null,
  'L''energia non si trova quando si è a zero. Si crea, a piccoli passi, prima che arrivi il vuoto.',
  'manual',
  'low',      -- per chi si sente giù
  'morning',
  array['energia', 'resilienza', 'piccoli-passi']
),

(
  'thought',
  'fr',
  null,
  'Tu n''as pas à tout maîtriser aujourd''hui. Juste avancer d''un pas.',
  'manual',
  'neutral',
  'morning',
  array['mindfulness', 'progression', 'calme']
),

-- ============================================================
-- STORIE (story) — più lunghe, per la sera
-- ============================================================

(
  'story',
  'it',
  'Il mercoledì di Marta',
  'Marta ha 38 anni e ogni mercoledì mattina si sveglia già stanca del lunedì.

Non è stanchezza fisica. È quella sottile, quella che senti nello spazio tra "dovrei" e "voglio". Quella mattina, invece di aprire il telefono, ha fatto una cosa sola: ha preparato il caffè senza fretta.

Dieci minuti in silenzio. Solo il rumore della Moka.

Non ha risolto niente. Non ha scritto nella sua agenda i task della settimana. Ha solo respirato il profumo del caffè e guardato dalla finestra il cielo ancora grigio.

A volte il coraggio non è fare di più. È resistere all''impulso di fare qualcosa — e stare ferma.',
  'manual',
  'neutral',
  'evening',
  array['silenzio', 'rituali', 'presenza', 'routine']
),

(
  'story',
  'it',
  'La regola dei tre respiri',
  'Elena lavora in un open space con 40 persone. Ogni volta che una riunione finisce male — e succede spesso — applica la sua regola personale: tre respiri profondi prima di rispondere a qualsiasi messaggio.

Non lo fa per sembrare zen. Lo fa perché ha scoperto, a 41 anni, che le parole scritte nello spazio di due secondi dopo una frustrazione costano settimane di energia riparatoria.

Tre respiri. Non meditazione. Non yoga. Solo l''intervallo tra il riflesso e la scelta.

Questa è l''unica distanza che le appartiene davvero.',
  'manual',
  'low',
  'evening',
  array['lavoro', 'relazioni', 'confini', 'emozioni']
),

(
  'story',
  'fr',
  'Le jardin de Claire',
  'Claire a 42 ans et un petit balcon à Lyon. Pendant des années, elle a dit qu''elle n''avait pas le pouce vert.

Un dimanche de novembre, elle a acheté une plante grasse pour 3 euros. Sans raison particulière. Juste parce que ça lui plaisait.

Deux ans plus tard, son balcon est plein de vert. Pas parce qu''elle a appris la botanique. Parce qu''elle a appris à faire attention — à regarder, à toucher, à remarquer.

Prendre soin de quelque chose de vivant, même d''une toute petite plante, lui a rappelé qu''elle aussi avait besoin d''attention.',
  'manual',
  'good',
  'evening',
  array['nature', 'attention', 'rituels', 'soin']
),

(
  'story',
  'it',
  'Cosa si porta via il venerdì',
  'Giulia ha un''abitudine strana, che non ha mai raccontato a nessuna: ogni venerdì sera, prima di iniziare il weekend, scrive su un foglio tre cose che vuole lasciare alla settimana che finisce.

Non sono obiettivi. Sono pesi.

"Il rimpianto per quella riunione andata male."
"La tensione con mia sorella."
"La sensazione di non aver fatto abbastanza."

Poi piega il foglio e lo butta. Non lo rilegge mai.

Non è una tecnica terapeutica. È solo il suo modo di attraversare la soglia — di non portare il lavoro dentro il weekend come si porta un trolley pesante.

Comincia così, ogni volta, da capo.',
  'manual',
  null,
  'evening',
  array['rituali', 'weekend', 'confini', 'leggerezza']
),

-- ============================================================
-- CONSIGLI (tip) — pratici, tono adulto e diretto
-- ============================================================

(
  'tip',
  'it',
  null,
  'Quando ti senti sopraffatta, non cercare di fare meno cose. Identifica l''unica che, se fatta, darebbe sollievo reale. Solo quella. Il resto può aspettare.',
  'manual',
  'low',
  'morning',
  array['produttività', 'priorità', 'energia', 'chiarezza']
),

(
  'tip',
  'it',
  null,
  'L''idratazione influenza l''umore più di quanto si pensi. Prima di cercare la causa di un''irritazione mattutina, bevi un bicchiere d''acqua e aspetta cinque minuti.',
  'manual',
  null,
  'morning',
  array['corpo', 'energia', 'abitudini', 'salute']
),

(
  'tip',
  'fr',
  null,
  'Quand l''anxiété monte, nommez-la à voix haute : "Je suis anxieuse." Ce simple geste active le cortex préfrontal et diminue l''intensité émotionnelle. Ce n''est pas de la magie — c''est de la neurologie.',
  'manual',
  'low',
  'morning',
  array['anxiété', 'émotions', 'neuroscience', 'outils']
);

-- Verifica seed
select type, lang, slot, mood_target, substring(body, 1, 60) as preview
from public.contents
order by type, lang;
