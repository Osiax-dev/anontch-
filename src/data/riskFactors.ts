export interface RiskFactorItem {
  id: string;
  orderNumber: number;
  category: 'non-modifiable' | 'modifiable';
  categoryLabel: string;
  title: string;
  shortSummary: string;
  description: string;
  impactLevel: 'Élevé' | 'Modéré';
  audioTextFr: string;
  iconType: 'calendar' | 'users' | 'clock' | 'activity' | 'wine' | 'scale' | 'flame' | 'shield';
}

export interface ProtectiveShieldItem {
  id: string;
  orderNumber: number;
  title: string;
  badgeLabel: string;
  shortSummary: string;
  description: string;
  audioTextFr: string;
  iconType: 'baby' | 'stethoscope' | 'apple';
}

export const EIGHT_RISK_FACTORS: RiskFactorItem[] = [
  // 1 à 4 : Facteurs Non Modifiables (Incontrôlables)
  {
    id: 'age',
    orderNumber: 1,
    category: 'non-modifiable',
    categoryLabel: 'Non Modifiable (Incontrôlable)',
    title: "1. L'Âge : À partir de 40 ans",
    shortSummary: "Le risque augmente naturellement au fil des années.",
    description: "Le risque de cancer du sein croît avec l'avancée en âge. Au Bénin, la surveillance régulière par une sage-femme ou un médecin et l'autopalpation doivent devenir un réflexe annuel dès 40 ans, même sans aucune douleur.",
    impactLevel: 'Élevé',
    iconType: 'calendar',
    audioTextFr: "Premier facteur de risque : l'âge. Plus une femme avance en âge, particulièrement à partir de quarante ans, plus le risque augmente naturellement. Même si vous n'avez mal nulle part, faites examiner vos seins chaque année par un soignant."
  },
  {
    id: 'antecedents-familiaux',
    orderNumber: 2,
    category: 'non-modifiable',
    categoryLabel: 'Non Modifiable (Génétique)',
    title: "2. Antécédents Familiaux Directs",
    shortSummary: "Mère, sœur, fille ou tante ayant eu un cancer du sein ou de l'ovaire.",
    description: "Avoir une parente proche ayant développé un cancer du sein indique une possible prédisposition héréditaire. En prévenant votre sage-femme ou médecin, vous bénéficiez d'une surveillance précoce dès 30 ans.",
    impactLevel: 'Élevé',
    iconType: 'users',
    audioTextFr: "Deuxième facteur de risque : l'histoire de votre famille. Si votre maman, votre propre sœur, votre fille ou votre tante a déjà eu un cancer du sein, dites-le immédiatement au médecin. Vous devrez commencer vos contrôles plus jeune pour être protégée."
  },
  {
    id: 'histoire-hormonale',
    orderNumber: 3,
    category: 'non-modifiable',
    categoryLabel: 'Non Modifiable (Hormones)',
    title: "3. Exposition Hormonale Prolongée",
    shortSummary: "Premières règles très précoces (< 12 ans) ou ménopause tardive (> 55 ans).",
    description: "Les hormones féminines (œstrogènes) stimulent la glande mammaire au fil des cycles. Une vie féconde plus longue avec des règles très précoces ou une ménopause tardive expose le tissu plus longtemps à ces stimulations.",
    impactLevel: 'Modéré',
    iconType: 'clock',
    audioTextFr: "Troisième facteur de risque : la durée des règles dans votre vie. Avoir eu ses premières règles très jeune avant douze ans, ou voir ses règles s'arrêter très tard après cinquante-cinq ans, augmente l'exposition de vos seins aux hormones."
  },
  {
    id: 'densite-mammaire',
    orderNumber: 4,
    category: 'non-modifiable',
    categoryLabel: 'Non Modifiable (Anatomique)',
    title: "4. Densité Mammaire Élevée",
    shortSummary: "Seins très fermes et denses au toucher et à la radiographie.",
    description: "Une poitrine à forte composante glandulaire et fibreuse (seins denses) rend plus difficile la détection tactile des petites anomalies et masque parfois les images à la mammographie, justifiant une échographie complémentaire.",
    impactLevel: 'Modéré',
    iconType: 'activity',
    audioTextFr: "Quatrième facteur de risque : des seins très denses et fermes. Les seins très denses contiennent plus de glandes que de graisse. Cela rend les petits nodules plus difficiles à repérer, ce qui nécessite une échographie en plus de la palpation."
  },

  // 5 à 8 : Facteurs Modifiables (Comportements évitables)
  {
    id: 'alcool',
    orderNumber: 5,
    category: 'modifiable',
    categoryLabel: 'Comportement Évitable',
    title: "5. Consommation d'Alcool (Sodabi, bière, liqueurs)",
    shortSummary: "Même modérée, la consommation régulière d'alcool augmente le risque de 10 à 30%.",
    description: "L'alcool altère le foie, qui ne peut plus éliminer correctement les hormones, et libère des molécules toxiques cancérigènes. Limiter ou supprimer les boissons alcoolisées diminue directement ce danger.",
    impactLevel: 'Élevé',
    iconType: 'wine',
    audioTextFr: "Cinquième facteur de risque : les boissons alcoolisées. Boire régulièrement de l'alcool, comme le sodabi, la bière ou les liqueurs, fatigue le foie et augmente le risque de cancer du sein. Évitez ou diminuez fortement ces boissons."
  },
  {
    id: 'surpoids-obesite',
    orderNumber: 6,
    category: 'modifiable',
    categoryLabel: 'Comportement Évitable',
    title: "6. Surpoids & Obésité (notamment après la ménopause)",
    shortSummary: "Le tissu graisseux en excès fabrique des œstrogènes stimulants.",
    description: "Après l'arrêt des règles, la graisse corporelle devient le principal lieu de fabrication des œstrogènes. Garder un poids équilibré protège directement la glande mammaire contre les proliférations cellulaires anormales.",
    impactLevel: 'Modéré',
    iconType: 'scale',
    audioTextFr: "Sixième facteur de risque : le surpoids important et l'obésité. Après la ménopause, la graisse du corps fabrique des hormones qui peuvent nourrir de mauvaises cellules. Manger équilibré protège vos seins."
  },
  {
    id: 'sedentarite',
    orderNumber: 7,
    category: 'modifiable',
    categoryLabel: 'Comportement Évitable',
    title: "7. Sédentarité & Absence d'Activité Physique",
    shortSummary: "Le manque de mouvement affaiblit les défenses immunitaires.",
    description: "Rester assise de longues heures sans marcher ni faire d'effort physique favorise l'inflammation chronique. Marcher d'un bon pas au moins 30 minutes par jour réduit le risque de cancer du sein de près de 20%.",
    impactLevel: 'Modéré',
    iconType: 'activity',
    audioTextFr: "Septième facteur de risque : le manque de marche et d'exercice. Rester assise toute la journée sans bouger affaiblit le corps. Marcher au moins trente minutes par jour stimule votre immunité et réduit le risque de vingt pour cent."
  },
  {
    id: 'tabac-depigmentants',
    orderNumber: 8,
    category: 'modifiable',
    categoryLabel: 'Comportement Évitable',
    title: "8. Tabac & Produits Dépigmentants Cutanés",
    shortSummary: "Toxines cancérigènes et corticoïdes altérant la barrière cutanée.",
    description: "Le tabagisme (actif ou passif) injecte des dizaines de substances mutagènes dans le sang. De plus, l'application sur la poitrine de crèmes éclaircissantes (tchatcho) contenant de l'hydroquinone ou des corticoïdes fragilise les tissus.",
    impactLevel: 'Modéré',
    iconType: 'flame',
    audioTextFr: "Huitième facteur de risque : le tabac et les crèmes pour s'éclaircir la peau. Fumer et appliquer des pommades décapantes sur la poitrine abîment profondément vos tissus et affaiblissent vos défenses. Gardez la peau de vos seins naturelle."
  }
];

export const PROTECTIVE_SHIELDS: ProtectiveShieldItem[] = [
  {
    id: 'bouclier-allaitement',
    orderNumber: 1,
    title: "L'Allaitement Maternel Exclusif & Prolongé",
    badgeLabel: "Bouclier Biologique Naturel",
    shortSummary: "Un effet protecteur majeur et scientifiquement prouvé.",
    description: "Allaiter son bébé au sein pendant plusieurs mois (au moins 6 mois à 1 an) permet aux cellules de la glande mammaire d'achever leur maturation complète et réduit l'exposition cumulative aux œstrogènes. Plus une femme allaite longtemps, plus la protection est forte.",
    audioTextFr: "Premier grand bouclier protecteur : l'allaitement maternel au sein. Ce n'est pas un facteur de risque, c'est une protection formidable ! Donner votre lait à votre bébé pendant plusieurs mois protège naturellement la santé de vos seins pour toute votre vie.",
    iconType: 'baby'
  },
  {
    id: 'bouclier-depistage',
    orderNumber: 2,
    title: "L'Autopalpation Mensuelle & Dépistage Clinique",
    badgeLabel: "Bouclier Détection Précoce",
    shortSummary: "Détecté tôt, 9 cancers du sein sur 10 guérissent définitivement.",
    description: "Examiner vos seins une fois par mois entre J+5 et J+7 vous familiarise avec votre anatomie. Combinée à un examen annuel par une sage-femme ou un médecin, cette vigilance permet d'agir immédiatement avant l'apparition de toute douleur.",
    audioTextFr: "Deuxième grand bouclier : l'autopalpation chaque mois et la visite annuelle chez la sage-femme. Toucher vos seins chaque mois permet de repérer le moindre changement tout de suite. Détecté au tout début, neuf cancers sur dix guérissent sans danger.",
    iconType: 'stethoscope'
  },
  {
    id: 'bouclier-hygiene',
    orderNumber: 3,
    title: "Alimentation Locale Équilibrée & Marche Active",
    badgeLabel: "Bouclier Métabolique",
    shortSummary: "Légumes feuilles béninois, fruits frais et activité corporelle.",
    description: "Les légumes feuilles traditionnels du Bénin (Gboma, Amanvivè, Tchayo, Crincrin) sont riches en antioxydants protecteurs. Associés à 30 minutes de marche quotidienne et une hydratation abondante, ils protègent votre capital santé.",
    audioTextFr: "Troisième grand bouclier : manger sainement nos sauces de légumes locaux et marcher chaque jour. Nos légumes béninois comme le Gboma ou le Crincrin sont remplis de vitamines protectrices pour vos cellules.",
    iconType: 'apple'
  }
];
