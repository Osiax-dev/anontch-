import { QuizQuestion, MythItem, PracticalCase, GameLevelMeta, DifficultyLevel } from '../types';

export const GAME_LEVELS: GameLevelMeta[] = [
  {
    level: 1,
    title: 'Niveau 1 — Fondamentaux & Premiers Réflexes',
    shortTitle: 'Niv. 1 : Fondamentaux',
    difficulty: 'facile',
    difficultyLabel: 'Facile',
    stars: 1,
    minScoreToUnlock: 0,
    pointsToNext: 40,
    badgeName: 'Vigilante Débutante',
    themeColor: '#006a61',
    description: 'Apprenez le moment idéal du cycle menstruel, la méthode des 3 doigts à plat et le taux de guérison de 90%.',
    clinicalObjective: 'Maîtriser les bases anatomiques et le bon calendrier d’autopalpation mensuelle.'
  },
  {
    level: 2,
    title: 'Niveau 2 — Démystification & Croyances du Bénin',
    shortTitle: 'Niv. 2 : Démystification',
    difficulty: 'moyen',
    difficultyLabel: 'Moyen',
    stars: 2,
    minScoreToUnlock: 40,
    pointsToNext: 90,
    badgeName: 'Protectrice Éclairée',
    themeColor: '#ac2356',
    description: 'Déjouez les rumeurs urbaines (argent/téléphone dans le soutien-gorge, tisanes miracles, scarifications).',
    clinicalObjective: 'Identifier les pièges culturels qui retardent dangereusement la consultation médicale au Bénin.'
  },
  {
    level: 3,
    title: "Niveau 3 — Détection & Signes d'Alerte Précoces",
    shortTitle: 'Niv. 3 : Signes d’Alerte',
    difficulty: 'intermediaire',
    difficultyLabel: 'Intermédiaire',
    stars: 3,
    minScoreToUnlock: 90,
    pointsToNext: 150,
    badgeName: 'Praticienne Avertie',
    themeColor: '#d97706',
    description: 'Comprendre qu’une boule indolore doit alerter, repérer une rétraction du mamelon ou un ganglion sous l’aisselle.',
    clinicalObjective: 'Distinguer les variations physiologiques normales des véritables signaux d’alerte oncologiques.'
  },
  {
    level: 4,
    title: 'Niveau 4 — Décisions Cliniques & Examens Médicaux',
    shortTitle: 'Niv. 4 : Décisions Cliniques',
    difficulty: 'difficile',
    difficultyLabel: 'Difficile',
    stars: 4,
    minScoreToUnlock: 150,
    pointsToNext: 220,
    badgeName: 'Experte Sénologique',
    themeColor: '#7c3aed',
    description: 'Échographie chez la femme jeune vs mammographie à partir de 40 ans, rôle de la cytoponction et antécédents familiaux.',
    clinicalObjective: 'Adopter la bonne démarche diagnostique face à un nodule ou une anomalie mammaire confirmée.'
  },
  {
    level: 5,
    title: 'Niveau 5 — Maîtrise Suprême & Ambassadrice AnOnTché',
    shortTitle: 'Niv. 5 : Ambassadrice d’Or',
    difficulty: 'expert',
    difficultyLabel: 'Expert / Très Difficile',
    stars: 5,
    minScoreToUnlock: 220,
    pointsToNext: 300,
    badgeName: 'Ambassadrice d’Or AnOnTché',
    themeColor: '#b40b56',
    description: 'Formes agressives (cancer inflammatoire), prise en charge au Bénin (CNHU, CHD), gestion du stress et leadership citoyen.',
    clinicalObjective: 'Devenir une référence communautaire capable de sauver des vies et de guider les femmes sans délai.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ==========================================
  // NIVEAU 1 : FONDAMENTAUX (FACILE - 10 pts)
  // ==========================================
  {
    id: 1,
    level: 1,
    points: 10,
    question: "À quelle période du cycle menstruel est-il le plus conseillé de pratiquer l'autopalpation des seins ?",
    options: [
      "Le premier jour des règles",
      "Entre le 5ᵉ et le 7ᵉ jour après le début des règles",
      "Juste avant l'arrivée des règles",
      "N'importe quand, cela n'a aucune importance"
    ],
    correctIndex: 1,
    explanation: "Entre le 5ᵉ et le 7ᵉ jour après le début des règles, les œstrogènes et la progestérone sont au plus bas. Les seins sont souples, détendus et non congestionnés, permettant un toucher précis.",
    clinicalFact: "Avant les règles, la tension mammaire naturelle crée de fausses grosseurs liées à la rétention d'eau."
  },
  {
    id: 2,
    level: 1,
    points: 10,
    question: "Avec quelle partie de la main doit-on réaliser les mouvements d'autopalpation ?",
    options: [
      "Le bout des ongles pour bien pénétrer la peau",
      "La paume entière en pressant très fort",
      "La pulpe des trois doigts du milieu (index, majeur, annulaire) bien à plat",
      "Le pouce uniquement en pinçant la peau"
    ],
    correctIndex: 2,
    explanation: "Utilisez toujours la pulpe à plat des trois doigts du milieu avec des petits mouvements circulaires doux, puis moyens et plus profonds pour bien explorer toute la glande.",
    clinicalFact: "La pulpe des doigts possède la plus forte densité de capteurs tactiles pour déceler une anomalie."
  },
  {
    id: 3,
    level: 1,
    points: 10,
    question: "Détecté tôt à un stade précoce, quel est le taux de guérison du cancer du sein ?",
    options: [
      "Moins de 20%",
      "Environ 50%",
      "9 cas sur 10 (plus de 90%)",
      "Le cancer du sein ne se guérit jamais"
    ],
    correctIndex: 2,
    explanation: "Pris en charge au début de son développement, 9 cancers du sein sur 10 guérissent définitivement ! Le diagnostic précoce sauve des vies et évite les chirurgies lourdes.",
    clinicalFact: "Au Bénin, la majorité des retards viennent de la peur ou de l'ignorance : le dépistage précoce change tout."
  },
  {
    id: 4,
    level: 1,
    points: 10,
    question: "Quel est le numéro vert gratuit du Ministère de la Santé au Bénin pour une assistance sanitaire ?",
    options: [
      "Le 117",
      "Le 118",
      "Le 136",
      "Le 166"
    ],
    correctIndex: 2,
    explanation: "Le 136 est le Numéro Vert gratuit et confidentiel du Ministère de la Santé du Bénin. Il vous met en relation avec un professionnel de santé pour vous écouter et vous orienter.",
    clinicalFact: "L'appel est 100% gratuit depuis tous les réseaux du Bénin (MTN, Moov Africa, Celtiis)."
  },

  // ==========================================
  // NIVEAU 2 : DÉMYSTIFICATION BÉNIN (MOYEN - 10 pts)
  // ==========================================
  {
    id: 5,
    level: 2,
    points: 10,
    question: "Garder régulièrement des billets d'argent ou son téléphone dans son soutien-gorge donne-t-il le cancer du sein ?",
    options: [
      "Oui, l'argent attire des ondes cancérigènes immédiates",
      "Non, cela pose des soucis d'hygiène cutanée mais ne cause pas de cancer du sein",
      "Oui, c'est la cause numéro 1 au Bénin",
      "Oui, mais seulement avec les pièces métalliques"
    ],
    correctIndex: 1,
    explanation: "C'est une idée reçue très courante. L'argent sale peut favoriser des irritations de la peau et des infections bactériennes, mais aucune étude scientifique n'a jamais lié cette habitude au cancer du sein.",
    clinicalFact: "Le cancer provient d'une mutation de l'ADN cellulaire, non du contact avec du tissu ou des billets."
  },
  {
    id: 6,
    level: 2,
    points: 10,
    question: "Face à une grosseur suspecte découverte dans le sein, que penser des scarifications rituelles ou tisanes de rue ?",
    options: [
      "Elles peuvent dissoudre la tumeur sans intervention chirurgicale",
      "Elles sont inefficaces contre les cellules tumorales et créent des retards mortels",
      "Elles remplacent avantageusement une mammographie",
      "Il faut les essayer pendant au moins un an avant de voir un médecin"
    ],
    correctIndex: 1,
    explanation: "Les scarifications ou tisanes 'miracles' ne peuvent guérir une tumeur. Pire, les scarifications provoquent des surinfections graves et font perdre des mois vitaux aux patientes béninoises.",
    clinicalFact: "Le retard diagnostique causé par les faux remèdes est la première cause de décès évitable au Bénin."
  },
  {
    id: 7,
    level: 2,
    points: 10,
    question: "L'allaitement maternel exclusif et prolongé a-t-il un impact sur le risque de cancer du sein ?",
    options: [
      "Il augmente le risque en fatiguant le sein",
      "Il n'a absolument aucun effet",
      "Il constitue un bouclier protecteur prouvé en diminuant le risque chez la mère",
      "Il protège seulement le bébé mais nuit à la mère"
    ],
    correctIndex: 2,
    explanation: "L'allaitement maternel exclusif et prolongé réduit l'imprégnation œstrogénique et permet aux cellules glandulaires de terminer leur différenciation protectrice.",
    clinicalFact: "Pour chaque tranche de 12 mois d'allaitement cumulé au cours de la vie, le risque de cancer du sein diminue de 4 à 5%."
  },

  // ==========================================
  // NIVEAU 3 : SIGNES D'ALERTE (INTERMÉDIAIRE - 15 pts)
  // ==========================================
  {
    id: 8,
    level: 3,
    points: 15,
    question: "Si vous découvrez une petite grosseur (nodule) dans le sein mais qu'elle ne fait absolument pas mal, que devez-vous penser ?",
    options: [
      "Si ça ne fait pas mal, c'est rassurant : aucun besoin de consulter",
      "L'absence de douleur n'est pas un signe d'innocuité : un nodule cancéreux est très souvent indolore au début",
      "C'est obligatoirement un kyste d'eau qui partira tout seul",
      "Il faut masser vigoureusement avec de l'huile de palmiste chaude"
    ],
    correctIndex: 1,
    explanation: "Attention au piège de l'indolence ! Au stade précoce, les tumeurs malignes du sein ne font généralement aucun mal physique. Attendre d'avoir mal pour consulter, c'est consulter trop tard.",
    clinicalFact: "Dans plus de 80% des cas, un nodule cancéreux débutant est totalement indolore."
  },
  {
    id: 9,
    level: 3,
    points: 15,
    question: "Quelle zone souvent négligée doit impérativement être palpée lors de l'auto-examen mensuel ?",
    options: [
      "Le cou et la gorge uniquement",
      "Le creux de l'aisselle (région axillaire) jusqu'au-dessous de la clavicule",
      "Le nombril et l'abdomen",
      "Le bas du dos au niveau des côtes"
    ],
    correctIndex: 1,
    explanation: "Le tissu mammaire s'étend vers l'aisselle (le prolongement axillaire). C'est là que se trouvent les premiers ganglions de drainage lymphatique du sein.",
    clinicalFact: "Un ganglion dur ou augmenté de volume sous le bras peut être le premier indice d'une anomalie mammaire."
  },
  {
    id: 10,
    level: 3,
    points: 15,
    question: "Sur 10 anomalies palpées lors d'un examen mammaire chez la femme, combien se révèlent être totalement bénignes (non cancéreuses) ?",
    options: [
      "Environ 1 sur 10",
      "Environ 4 sur 10",
      "Environ 8 sur 10",
      "10 sur 10 sont toujours des cancers"
    ],
    correctIndex: 2,
    explanation: "Environ 8 anomalies sur 10 sont bénignes (kystes liquidiens, adénofibromes fréquents chez les jeunes femmes). Palper une boule n'est pas une condamnation : seul l'examen médical tranche !",
    clinicalFact: "La sérénité est essentielle : l'examen médical permet de rassurer et d'écarter le doute sans panique."
  },
  {
    id: 11,
    level: 3,
    points: 15,
    question: "Parmi ces signes cutanés et visuels, lequel constitue un signal d'alerte majeur ?",
    options: [
      "Une petite rougeur passagère due à la transpiration sous le sein",
      "Une invagination (mamelon qui se rétracte vers l'intérieur) ou un aspect en peau d'orange récent",
      "Une pigmentation symétrique de l'aréole pendant la grossesse",
      "Des veines bleuâtres visibles sur les deux seins par temps chaud"
    ],
    correctIndex: 1,
    explanation: "Une rétraction nouvelle du mamelon ou un épaississement capitonné de la peau (peau d'orange) traduit une traction ou un envahissement lymphatique par une lésion sous-jacente.",
    clinicalFact: "Toute asymétrie d'apparition récente entre les deux seins doit être montrée à un médecin ou une sage-femme."
  },

  // ==========================================
  // NIVEAU 4 : DÉCISIONS CLINIQUES & EXAMENS (DIFFICILE - 15 pts)
  // ==========================================
  {
    id: 12,
    level: 4,
    points: 15,
    question: "Pourquoi privilégie-t-on l'échographie mammaire plutôt que la mammographie chez une femme jeune de moins de 35 ans ?",
    options: [
      "Parce que la mammographie est strictement interdite par la loi béninoise avant 40 ans",
      "Parce que les seins des femmes jeunes sont denses en tissu glandulaire, ce qui rend la mammographie moins lisible que les ultrasons",
      "Parce que l'échographie utilise des rayons laser qui détruisent les tumeurs",
      "Parce que l'échographie est le seul examen qui permet de donner des antibiotiques"
    ],
    correctIndex: 1,
    explanation: "Chez la femme jeune, le tissu glandulaire est dense et apparaît tout blanc à la mammographie (effet de masque). L'échographie (ultrasons non irradiants) permet de distinguer parfaitement un kyste liquide d'une masse solide.",
    clinicalFact: "Après 40-45 ans, la glande s'involue au profit de la graisse : la mammographie devient alors l'examen de référence."
  },
  {
    id: 13,
    level: 4,
    points: 15,
    question: "Quel examen médical est le SEUL capable de confirmer avec certitude la nature cancéreuse ou bénigne d'un nodule mammaire ?",
    options: [
      "Une simple prise de sang de routine",
      "La palpation manuelle par un rebouteux",
      "L'analyse anatomopathologique (biopsie ou cytoponction prélevant des cellules/tissus)",
      "Une radiographie des poumons"
    ],
    correctIndex: 2,
    explanation: "Ni l'œil ni la main ni même la mammographie seule ne peuvent affirmer à 100% la nature d'un nodule : seule l'analyse microscopique des cellules prélevées par biopsie donne le diagnostic de certitude.",
    clinicalFact: "La microbiopsie au pistolet sous anesthésie locale est un geste rapide, peu douloureux et sans danger."
  },
  {
    id: 14,
    level: 4,
    points: 15,
    question: "Une femme dont la mère ou la sœur a eu un cancer du sein avant 45 ans doit-elle commencer son suivi différemment ?",
    options: [
      "Non, les antécédents familiaux ne comptent absolument pas",
      "Oui, elle présente un risque familial plus élevé et doit débuter un dépistage individualisé 5 à 10 ans plus tôt",
      "Elle doit se faire opérer des deux seins dès l'âge de 18 ans sans examen",
      "Elle doit simplement boire du thé vert chaque matin"
    ],
    correctIndex: 1,
    explanation: "Un antécédent au premier degré (mère, sœur, fille) à un âge jeune impose une consultation de conseil oncogénétique et un suivi sénologique rapproché et plus précoce.",
    clinicalFact: "Environ 5 à 10% des cancers du sein sont liés à une prédisposition génétique majeure (mutations BRCA1/2)."
  },

  // ==========================================
  // NIVEAU 5 : EXPERTISE & AMBASSADRICE (EXPERT - 20 pts)
  // ==========================================
  {
    id: 15,
    level: 5,
    points: 20,
    question: "Face à un sein rouge, chaud, douloureux, augmenté de volume hors période d'allaitement (ou ne réagissant pas aux antibiotiques après 8 jours), quel diagnostic redoutable le clinicien doit-il éliminer ?",
    options: [
      "Une simple piqûre d'insecte sans gravité",
      "Un cancer inflammatoire du sein (mastite carcinomateuse)",
      "Une montée de lait imaginaire",
      "Une déchirure musculaire du grand pectoral"
    ],
    correctIndex: 1,
    explanation: "Le cancer inflammatoire du sein mime les symptômes d'une infection (sein chaud, érythémateux, œdème). Toute mastite chez une femme non allaitante qui ne cède pas vite sous antibiotiques doit être explorée en urgence pour éliminer une forme inflammatoire.",
    clinicalFact: "En Afrique, les cancers inflammatoires sont plus fréquents et souvent pris pour des abcès, causant des retards dramatiques."
  },
  {
    id: 16,
    level: 5,
    points: 20,
    question: "Dans le réseau sanitaire du Bénin, vers quelle structure de référence doit-on orienter une patiente avec suspicion forte de tumeur nécessitant une biopsie et une prise en charge spécialisée ?",
    options: [
      "Vers la pharmacie du quartier pour acheter des pommades",
      "Vers un Centre Hospitalier Universitaire (ex: CNHU-HKM à Cotonou) ou les Centres Hospitaliers Départementaux (CHD)",
      "Uniquement vers un laboratoire d'analyses d'urine",
      "Chez un tradi-praticien pour désenvoûtement"
    ],
    correctIndex: 1,
    explanation: "Le CNHU Hubert Koutoukou Maga (Cotonou), les CHD (Ouémé, Borgou, Zou, Mono) et l'Hôpital Saint Jean de Dieu de Tanguiéta disposent des plateaux techniques (radiologie, anatomo-pathologie, oncologie) pour une prise en charge globale.",
    clinicalFact: "Le Ministère de la Santé du Bénin renforce le dépistage gratuit au mois d'Octobre Rose dans tous les CHD."
  },
  {
    id: 17,
    level: 5,
    points: 20,
    question: "En tant qu'Ambassadrice AnOnTché dans votre communauté, quelle est la meilleure posture face à une amie terrifiée par la mastectomie (ablation chirurgicale du sein) qui refuse d'aller à l'hôpital ?",
    options: [
      "Lui donner raison et lui dire que les hôpitaux coupent toujours les seins sans réfléchir",
      "Lui expliquer avec bienveillance que détecté tôt, le sein peut être conservé (tumorectomie), et que le numéro vert 136 et les médecins l'aideront à chaque étape",
      "Lui faire peur en lui disant qu'elle n'a plus que quelques jours à vivre",
      "L'abandonner car elle ne veut pas écouter"
    ],
    correctIndex: 1,
    explanation: "La peur de perdre son sein est le premier frein psychologique chez la femme béninoise. Expliquer qu'un diagnostic précoce permet un traitement conservateur (garder son sein) libère la parole et lève la terreur.",
    clinicalFact: "La préservation du sein est possible dans plus de 70% des cas si la tumeur est découverte avant 2 centimètres !"
  }
];

export const BENIN_MYTHS: MythItem[] = [
  // Niveau 1
  {
    id: 1,
    level: 1,
    points: 10,
    statement: "Le cancer du sein est une maladie contagieuse qu'on peut attraper en touchant une personne malade ou en partageant ses vêtements.",
    isTrue: false,
    explanation: "C'est FAUX. Le cancer du sein n'est absolument pas une maladie infectieuse ou contagieuse. Vous pouvez embrasser, enlacer et soigner une proche malade en toute sécurité et sans aucune crainte.",
    beninContext: "La peur infondée de contagion isole cruellement les patientes au sein de leur foyer ou de leur communauté au Bénin."
  },
  // Niveau 2
  {
    id: 2,
    level: 2,
    points: 10,
    statement: "Garder de l'argent (billets ou pièces) ou son téléphone dans son soutien-gorge provoque directement le cancer du sein.",
    isTrue: false,
    explanation: "C'est FAUX. Même si garder de l'argent dans son sous-vêtement est déconseillé pour des raisons d'hygiène bactérienne et d'allergie cutanée, aucune étude scientifique ne relie cette pratique au cancer du sein.",
    beninContext: "Très fréquente chez les revendeuses de Dantokpa ou de Ouando, cette habitude salit la peau mais ne cause pas de tumeur maligne."
  },
  // Niveau 2
  {
    id: 3,
    level: 2,
    points: 10,
    statement: "Une tisane locale (tchigan, atiké) ou une scarification rituelle sur le sein peut faire fondre une tumeur cancéreuse.",
    isTrue: false,
    explanation: "C'est TOTALEMENT FAUX et DANGEREUX. Une tumeur est une prolifération anormale de cellules qui exige un traitement oncologique validé. Les scarifications provoquent des abcès graves et accélèrent la progression.",
    beninContext: "Au CNHU de Cotonou, les médecins déplorent trop de cas de femmes arrivées trop tard à cause de fausses promesses de remèdes locaux."
  },
  // Niveau 3
  {
    id: 4,
    level: 3,
    points: 15,
    statement: "Si une boule dans le sein ne fait aucune douleur, c'est la preuve certaine qu'elle n'est pas dangereuse.",
    isTrue: false,
    explanation: "C'est FAUX et TRÈS PIÉGEUX. Dans la grande majorité des cas, un nodule malin à ses débuts est complètement indolore. Attendre que la douleur apparaisse pour consulter retarde dramatiquement le traitement.",
    beninContext: "Beaucoup de femmes attendent d'avoir mal avant d'aller au dispensaire, alors que le diagnostic doit se faire avant toute douleur."
  },
  // Niveau 4
  {
    id: 5,
    level: 4,
    points: 15,
    statement: "Un coup ou choc physique reçu sur le sein (accident de circulation en zémidjan ou dispute) peut se transformer en cancer.",
    isTrue: false,
    explanation: "C'est FAUX. Un choc peut causer un hématome ou une nécrose graisseuse bénigne (stéatonécrose), mais il ne transforme pas une cellule saine en cellule cancéreuse. Souvent, le coup amène simplement à palper le sein et à découvrir un nodule déjà présent.",
    beninContext: "Une confusion fréquente au Bénin après des incidents en deux-roues ou des chocs physiques."
  },
  // Niveau 5
  {
    id: 6,
    level: 5,
    points: 20,
    statement: "Le cancer du sein chez l'homme n'existe pas du tout : cela ne touche que les femmes.",
    isTrue: false,
    explanation: "C'est FAUX. Bien que 99% des cancers du sein touchent les femmes, environ 1% survient chez les hommes, qui possèdent aussi du tissu mammaire résiduel. Chez l'homme, toute grosseur rétro-mamelonnaire doit être explorée sans tabou.",
    beninContext: "Les hommes au Bénin ignorent souvent cette possibilité et consultent à des stades très avancés par pudeur ou méconnaissance."
  }
];

export const PRACTICAL_CASES: PracticalCase[] = [
  // Niveau 1
  {
    id: 1,
    level: 1,
    points: 15,
    title: "Cas de Fati (23 ans, Parakou)",
    profile: "Étudiante universitaire, cycles menstruels réguliers de 28 jours.",
    scenario: "Deux jours avant ses règles, Fati a les deux seins gonflés, douloureux et très sensibles au toucher. En panique, elle se palpe et sent que ses seins sont granuleux partout. Trois jours après la fin de ses règles, la sensibilité a complètement disparu.",
    options: [
      {
        text: "Comprendre qu'il s'agit d'une tension hormonale physiologique normale (mastodynie du cycle) et planifier son autopalpation mensuelle entre J+5 et J+7 après les règles.",
        isOptimal: true,
        feedback: "Parfait ! La douleur bilatérale diffuse rythmée par les règles est typiquement hormonale et bénigne. C'est pourquoi la fenêtre idéale d'autopalpation se situe juste après les règles, quand la glande est souple."
      },
      {
        text: "Penser qu'elle a un cancer fulgurant qui disparaît puis réapparaît chaque mois.",
        isOptimal: false,
        feedback: "Faux. Un cancer ne gonfle pas et ne dégonfle pas de manière bilatérale au gré du cycle menstruel."
      },
      {
        text: "Arrêter toute pratique d'autopalpation pour toujours par peur de sentir quoi que ce soit.",
        isOptimal: false,
        feedback: "Ce serait dommage : il suffit simplement d'attendre la fenêtre J+5 à J+7 après les règles pour s'examiner en toute tranquillité."
      }
    ]
  },
  // Niveau 2 & 3
  {
    id: 2,
    level: 2,
    points: 20,
    title: "Cas d'Amina (32 ans, Cotonou)",
    profile: "Mère de 2 enfants, commerçante à Missèbo, aucun antécédent familial.",
    scenario: "En prenant sa douche ce matin, Amina sent une petite boule bien délimitée de la taille d'une bille dans le quadrant supérieur externe de son sein gauche. Elle ne ressent aucune douleur. Une voisine lui conseille d'attendre 6 mois et d'appliquer une pâte chaude aux plantes.",
    options: [
      {
        text: "Écouter la voisine, appliquer la pâte chaude et attendre que la boule parte toute seule.",
        isOptimal: false,
        feedback: "Mauvaise réaction ! La pâte de plantes peut brûler la peau, et attendre 6 mois fait perdre un temps précieux si l'anomalie est évolutive."
      },
      {
        text: "Prendre rendez-vous rapidement au CNHU ou dans un centre de santé pour une palpation clinique et une échographie mammaire.",
        isOptimal: true,
        feedback: "Parfait réflexe ! Même indolore, toute boule nouvelle doit être documentée par un médecin ou une sage-femme. 8 fois sur 10 il s'agit d'un kyste bénin ou adénofibrome, mais seule l'imagerie apporte la certitude."
      },
      {
        text: "Paniquer, arrêter de manger et s'isoler en pensant que tout est fini.",
        isOptimal: false,
        feedback: "Inutile de paniquer : la majorité des boules sont tout à fait bénignes, et si c'est pris à temps, 9 cas sur 10 guérissent."
      }
    ]
  },
  // Niveau 3 & 4
  {
    id: 3,
    level: 3,
    points: 25,
    title: "Cas de Christine (48 ans, Porto-Novo)",
    profile: "Mère de 4 enfants, cycles devenus irréguliers depuis un an (périménopause).",
    scenario: "Christine remarque depuis 3 semaines que son mamelon droit s'est creusé vers l'intérieur. Hier soir en ôtant son soutien-gorge, elle constate une petite tache sanguinolente séreuse d'un seul côté.",
    options: [
      {
        text: "Consulter dès cette semaine au CHD Ouémé-Plateau pour une mammographie numérique et un examen sénologique approfondi.",
        isOptimal: true,
        feedback: "Excellente décision ! Ce double signe (rétraction unilatérale récente + écoulement sanglant spontané) est un signal d'alerte clinique majeur. Une mammographie avec échographie permettra d'identifier précisément l'origine du saignement."
      },
      {
        text: "Penser qu'il s'agit d'une simple piqûre de moustique ou d'une irritation et mettre du talc.",
        isOptimal: false,
        feedback: "Inadéquat : un écoulement sanglant unilatéral et une rétraction du mamelon sont des signes d'alerte majeurs nécessitant une mammographie immédiate."
      },
      {
        text: "Faire des scarifications sur l'aréole pour 'faire sortir le mauvais sang'.",
        isOptimal: false,
        feedback: "Dangereux ! Les scarifications risquent de propager une infection sévère dans les canaux galactophores."
      }
    ]
  },
  // Niveau 4 & 5
  {
    id: 4,
    level: 4,
    points: 25,
    title: "Cas de Grâce (41 ans, Abomey-Calavi)",
    profile: "Institutrice, sa grande sœur a été soignée d'un cancer du sein il y a 3 ans.",
    scenario: "Grâce sent un nodule fixe de 2 cm dans son sein droit. Son mari, par peur du 'qu'en dira-t-on' et de la chirurgie, lui demande d'aller plutôt dans un couvent ou chez un tradi-praticien dans le Mono. Grâce hésite entre respecter la volonté de son mari ou aller consulter au CNHU.",
    options: [
      {
        text: "Appeler le Numéro Vert gratuit 136 avec son mari, puis consulter ensemble un médecin au CNHU pour une échographie-mammographie et un dialogue rassurant.",
        isOptimal: true,
        feedback: "La meilleure décision humaine et médicale ! En associant son mari à l'écoute du 136 et au rendez-vous médical, elle déconstruit ses peurs tout en s'assurant un diagnostic scientifique rapide et salvateur sans retard funeste."
      },
      {
        text: "Suivre son mari chez le tradi-praticien pendant 1 an et cacher son état à tout le monde.",
        isOptimal: false,
        feedback: "C'est la trajectoire dramatique observée chez trop de patientes. Les mois perdus transforment une lésion opérable et guérissable en stade métastatique."
      },
      {
        text: "Attendre le mois d'octobre prochain pour le dépistage gratuit même si c'est dans 9 mois.",
        isOptimal: false,
        feedback: "Face à un nodule fixe palpé, on n'attend jamais 9 mois : le dépistage gratuit d'octobre est pour les femmes asymptomatiques ; en cas de signe d'alerte, la consultation est immédiate !"
      }
    ]
  },
  // Niveau 5
  {
    id: 5,
    level: 5,
    points: 30,
    title: "Cas de Mariette (35 ans, Natitingou)",
    profile: "Animatrice communautaire, non allaitante, consulte au centre de santé.",
    scenario: "Mariette constate que son sein gauche est devenu rouge, chaud, induré et douloureux depuis 10 jours. Le major du dispensaire lui a prescrit 5 jours d'antibiotiques simples en pensant à un abcès banal, mais l'inflammation s'étend et la peau devient cartonnée avec rétraction.",
    options: [
      {
        text: "Exiger une évacuation ou référence immédiate vers le CHD Atacora ou le CNHU pour une biopsie cutanée et échographie urgente afin d'éliminer un cancer inflammatoire.",
        isOptimal: true,
        feedback: "Réflexe salvateur d'Ambassadrice ! Une mastite qui ne guérit pas sous antibiotiques chez une femme non allaitante est une urgence sénologique majeure. Il faut impérativement exclure une mastite carcinomateuse par une biopsie sans perdre un seul jour de plus."
      },
      {
        text: "Reprendre une deuxième cure des mêmes antibiotiques pendant encore 3 semaines en attendant.",
        isOptimal: false,
        feedback: "Très dangereux ! Chaque semaine de retard face à un cancer inflammatoire réduit drastiquement les chances de rémission."
      },
      {
        text: "Inciser le sein avec une lame de rasoir pour 'vider le pus'.",
        isOptimal: false,
        feedback: "Catastrophique ! L'incision d'une tumeur inflammatoire sans diagnostic formel dissémine les cellules cancéreuses dans les tissus voisins."
      }
    ]
  }
];

// Helper functions for Level progression
export function getLevelMeta(level: DifficultyLevel): GameLevelMeta {
  return GAME_LEVELS.find((l) => l.level === level) || GAME_LEVELS[0];
}

export function getLevelForScore(score: number): DifficultyLevel {
  if (score >= 220) return 5;
  if (score >= 150) return 4;
  if (score >= 90) return 3;
  if (score >= 40) return 2;
  return 1;
}

export function getTitleForScore(score: number): string {
  if (score >= 220) return "Ambassadrice d'Or AnOnTché";
  if (score >= 150) return 'Experte Sénologique';
  if (score >= 90) return 'Praticienne Avertie';
  if (score >= 40) return 'Protectrice Éclairée';
  return 'Vigilante Débutante';
}

export function getQuestionsByLevel(level: DifficultyLevel): QuizQuestion[] {
  return QUIZ_QUESTIONS.filter((q) => q.level === level);
}

export function getMythsByLevel(level: DifficultyLevel): MythItem[] {
  return BENIN_MYTHS.filter((m) => m.level === level);
}

export function getCasesByLevel(level: DifficultyLevel): PracticalCase[] {
  return PRACTICAL_CASES.filter((c) => c.level === level);
}
