export type NavigationTab = 'accueil' | 'guide' | 'risques' | 'jeu' | 'centres' | 'suivi';

export type AudioLanguage = 'fr';

export interface UserProfile {
  id: string;
  name: string; // Prénom ou pseudonyme intime (ex: "Fleur", "Amina", "Soleil")
  pin: string; // Code secret à 4 chiffres
  securityQuestion?: string; // Question secrète locale pour réinitialiser le PIN sans SMS/email
  securityAnswer?: string; // Réponse secrète
  phoneOrEmail?: string; // Totalement facultatif
  ageRange?: string; // Pour recommandations médicales adaptées
  isAuthenticated: boolean;
  isLocked: boolean; // Verrouillage d'intimité active
  discreetMode: boolean; // Mode camouflage (masque les termes explicites à l'écran)
  registeredAt: string;
}


export interface HealthCenter {
  id: string;
  name: string;
  type: string;
  department: string;
  city: string;
  address: string;
  phone: string;
  tags: string[];
  description: string;
  hasMammography: boolean;
  hasUltrasound: boolean;
  hasFreePalpation: boolean;
  hasBiopsy: boolean;
  hours: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface PalpationLog {
  id: string;
  date: string;
  daysAgo: number;
  label: string;
  notes: string;
  findingType: 'normal' | 'tenderness' | 'nodule' | 'discharge' | 'other';
  findingDescription: string;
  side: 'both' | 'left' | 'right';
}

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;
export type DifficultyTier = 'facile' | 'moyen' | 'intermediaire' | 'difficile' | 'expert';

export interface GameLevelMeta {
  level: DifficultyLevel;
  title: string;
  shortTitle: string;
  difficulty: DifficultyTier;
  difficultyLabel: string;
  stars: number;
  minScoreToUnlock: number;
  pointsToNext: number;
  badgeName: string;
  themeColor: string;
  description: string;
  clinicalObjective: string;
}

export interface QuizQuestion {
  id: number;
  level: DifficultyLevel;
  points: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  clinicalFact: string;
}

export interface MythItem {
  id: number;
  level: DifficultyLevel;
  points: number;
  statement: string;
  isTrue: boolean;
  explanation: string;
  beninContext: string;
}

export interface PracticalCase {
  id: number;
  level: DifficultyLevel;
  points: number;
  title: string;
  profile: string;
  scenario: string;
  options: {
    text: string;
    isOptimal: boolean;
    feedback: string;
  }[];
}

export interface UserGamificationState {
  score: number;
  title: string;
  currentLevel?: DifficultyLevel;
  highestLevelUnlocked?: DifficultyLevel;
  completedLevels?: number[];
  quizScore: number;
  quizCompleted: boolean;
  mythsCompleted: boolean;
  casesCompleted: boolean;
  badges: {
    starVigilante: boolean; // Vigilante Étoilée (Obtenez 40 points au Quiz)
    healthProtector: boolean; // Protectrice de Santé (Déjouez les mythes)
    palpationChampion: boolean; // Championne Palpation (Réussissez les cas pratiques)
    level1Master?: boolean; // Niveau 1 Maîtrisé
    level2Master?: boolean; // Niveau 2 Maîtrisé
    level3Master?: boolean; // Niveau 3 Maîtrisé
    level4Master?: boolean; // Niveau 4 Maîtrisé
    level5Ambassador?: boolean; // Grande Ambassadrice AnOnTché
  };
}
