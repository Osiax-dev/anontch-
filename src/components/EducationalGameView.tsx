import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Award,
  Star,
  Shield,
  CheckCircle,
  PhoneCall,
  Share2,
  Lock,
  Unlock,
  ArrowRight,
  RotateCcw,
  Check,
  X,
  BookOpen,
  MessageSquareQuote,
  GitBranch,
  Trophy,
  Zap,
  Info
} from 'lucide-react';
import {
  GAME_LEVELS,
  QUIZ_QUESTIONS,
  BENIN_MYTHS,
  PRACTICAL_CASES,
  getLevelMeta,
  getLevelForScore,
  getTitleForScore,
  getQuestionsByLevel,
  getMythsByLevel,
  getCasesByLevel
} from '../data/quizData';
import { UserGamificationState, DifficultyLevel } from '../types';
import { AudioPlayButton } from './AudioPlayButton';
import { AnOnTcheText } from './BreastOIcon';

interface EducationalGameViewProps {
  gamification: UserGamificationState;
  onUpdateGamification: (updater: (prev: UserGamificationState) => UserGamificationState) => void;
}

export const EducationalGameView: React.FC<EducationalGameViewProps> = ({
  gamification,
  onUpdateGamification,
}) => {
  // Determine highest unlocked level from total score
  const highestUnlockedLevel = getLevelForScore(gamification.score);

  // Selected level to view or play (defaults to highest unlocked level or 1)
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel>(() => {
    return (gamification.currentLevel || highestUnlockedLevel) as DifficultyLevel;
  });

  // Track sub-activity within the selected level: 'quiz' | 'mythes' | 'cas'
  const [activeSubTab, setActiveSubTab] = useState<'quiz' | 'mythes' | 'cas'>('quiz');

  // Level up celebration modal state
  const [unlockedLevelModal, setUnlockedLevelModal] = useState<DifficultyLevel | null>(null);

  // Quiz state for selected level
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState<number[]>([]);

  // Myths state for selected level
  const [mythIdx, setMythIdx] = useState(0);
  const [mythSelectedAnswer, setMythSelectedAnswer] = useState<boolean | null>(null);
  const [answeredMythIds, setAnsweredMythIds] = useState<number[]>([]);

  // Practical Cases state for selected level
  const [caseIdx, setCaseIdx] = useState(0);
  const [selectedCaseOption, setSelectedCaseOption] = useState<number | null>(null);
  const [caseSubmitted, setCaseSubmitted] = useState(false);
  const [answeredCaseIds, setAnsweredCaseIds] = useState<number[]>([]);

  // Share message copied toast
  const [shareSuccess, setShareSuccess] = useState(false);

  // Data for the currently selected level
  const currentLevelMeta = getLevelMeta(selectedLevel);
  const levelQuestions = getQuestionsByLevel(selectedLevel);
  const levelMyths = getMythsByLevel(selectedLevel);
  const levelCases = getCasesByLevel(selectedLevel);

  // Ensure indices remain valid if level changes
  useEffect(() => {
    setQuestionIdx(0);
    setSelectedAnswerIdx(null);
    setIsAnswerSubmitted(false);

    setMythIdx(0);
    setMythSelectedAnswer(null);

    setCaseIdx(0);
    setSelectedCaseOption(null);
    setCaseSubmitted(false);
  }, [selectedLevel]);

  // Check if a level is unlocked
  const isLevelUnlocked = (lvl: DifficultyLevel) => {
    const minScore = GAME_LEVELS.find((l) => l.level === lvl)?.minScoreToUnlock ?? 0;
    return gamification.score >= minScore;
  };

  // Helper to award points and check for level upgrades
  const awardPoints = (pointsEarned: number, category: 'quiz' | 'myth' | 'case') => {
    const prevScore = gamification.score;
    const newScore = prevScore + pointsEarned;
    const oldLevel = getLevelForScore(prevScore);
    const newLevel = getLevelForScore(newScore);

    // Confetti celebration
    try {
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#ac2356', '#006a61', '#ffd9e0', '#f59e0b']
      });
    } catch (e) {}

    // Check if a new level was unlocked
    if (newLevel > oldLevel) {
      setUnlockedLevelModal(newLevel);
      try {
        confetti({
          particleCount: 100,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#ac2356', '#006a61', '#f59e0b', '#3b82f6']
        });
      } catch (e) {}
    }

    onUpdateGamification((prev) => {
      const updatedScore = prev.score + pointsEarned;
      const updatedTitle = getTitleForScore(updatedScore);
      const updatedLevel = getLevelForScore(updatedScore);

      const badges = { ...prev.badges };
      if (updatedScore >= 40) badges.starVigilante = true;
      if (category === 'myth') badges.healthProtector = true;
      if (category === 'case') badges.palpationChampion = true;
      if (updatedScore >= 40) badges.level1Master = true;
      if (updatedScore >= 90) badges.level2Master = true;
      if (updatedScore >= 150) badges.level3Master = true;
      if (updatedScore >= 220) badges.level4Master = true;
      if (updatedScore >= 300) badges.level5Ambassador = true;

      return {
        ...prev,
        score: updatedScore,
        title: updatedTitle,
        currentLevel: updatedLevel,
        highestLevelUnlocked: Math.max(prev.highestLevelUnlocked || 1, updatedLevel) as DifficultyLevel,
        badges,
      };
    });
  };

  // Handler for Quiz selection
  const handleSelectQuizOption = (index: number) => {
    if (isAnswerSubmitted || levelQuestions.length === 0) return;
    setSelectedAnswerIdx(index);
    setIsAnswerSubmitted(true);

    const question = levelQuestions[questionIdx];
    const isCorrect = index === question.correctIndex;

    if (isCorrect) {
      // Award points only if not already answered in this session to prevent spamming
      if (!answeredQuestionIds.includes(question.id)) {
        setAnsweredQuestionIds((prev) => [...prev, question.id]);
        awardPoints(question.points, 'quiz');
      }
    }
  };

  const handleNextQuestion = () => {
    if (questionIdx < levelQuestions.length - 1) {
      setQuestionIdx(questionIdx + 1);
      setSelectedAnswerIdx(null);
      setIsAnswerSubmitted(false);
    }
  };

  // Handler for Myth answer
  const handleMythAnswer = (answer: boolean) => {
    if (mythSelectedAnswer !== null || levelMyths.length === 0) return;
    setMythSelectedAnswer(answer);

    const currentMyth = levelMyths[mythIdx];
    const isCorrect = answer === currentMyth.isTrue;

    if (isCorrect) {
      if (!answeredMythIds.includes(currentMyth.id)) {
        setAnsweredMythIds((prev) => [...prev, currentMyth.id]);
        awardPoints(currentMyth.points, 'myth');
      }
    }
  };

  const handleNextMyth = () => {
    if (mythIdx < levelMyths.length - 1) {
      setMythIdx(mythIdx + 1);
      setMythSelectedAnswer(null);
    }
  };

  // Handler for Practical Case option
  const handleCaseSelect = (optIndex: number) => {
    if (caseSubmitted || levelCases.length === 0) return;
    setSelectedCaseOption(optIndex);
    setCaseSubmitted(true);

    const currentCase = levelCases[caseIdx];
    const option = currentCase.options[optIndex];

    if (option.isOptimal) {
      if (!answeredCaseIds.includes(currentCase.id)) {
        setAnsweredCaseIds((prev) => [...prev, currentCase.id]);
        awardPoints(currentCase.points, 'case');
      }
    }
  };

  const handleNextCase = () => {
    if (caseIdx < levelCases.length - 1) {
      setCaseIdx(caseIdx + 1);
      setSelectedCaseOption(null);
      setCaseSubmitted(false);
    }
  };

  // Share action
  const handleShare = async () => {
    const shareText = `J'ai atteint le ${currentLevelMeta.title} (${gamification.score} pts) sur l'application citoyenne AnOnTché Bénin ! Apprenez les réflexes de dépistage précoce du cancer du sein. Numéro Vert Gratuit : 136.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AnOnTché Bénin - Défi Santé 5 Niveaux',
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(shareText);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 3000);
    }
  };

  const currentQ = levelQuestions[questionIdx];
  const currentM = levelMyths[mythIdx];
  const currentC = levelCases[caseIdx];

  // Next level progress computation
  const nextLevelMeta = GAME_LEVELS.find((l) => l.level === (highestUnlockedLevel < 5 ? highestUnlockedLevel + 1 : 5));
  const pointsNeededForNext = nextLevelMeta ? Math.max(0, nextLevelMeta.minScoreToUnlock - gamification.score) : 0;
  const currentLevelMin = currentLevelMeta.minScoreToUnlock;
  const targetNextScore = currentLevelMeta.pointsToNext;
  const levelProgressPct = Math.min(
    100,
    Math.max(0, Math.round(((gamification.score - currentLevelMin) / (targetNextScore - currentLevelMin)) * 100))
  );

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      {/* Level Up Celebration Modal */}
      {unlockedLevelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#e7eeff] shadow-2xl text-center space-y-5">
            <div className="w-16 h-16 rounded-3xl bg-[#ccfbf1] text-[#006a61] mx-auto flex items-center justify-center font-bold shadow-md">
              <Trophy className="w-8 h-8 text-[#006a61]" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#ac2356] bg-[#ffd9e0] px-3 py-1 rounded-full">
                NOUVEAU NIVEAU DÉBLOQUÉ !
              </span>
              <h2 className="text-2xl font-black text-[#111c2d] pt-2">
                {GAME_LEVELS[unlockedLevelModal - 1].title}
              </h2>
              <p className="text-xs sm:text-sm text-[#574145] leading-relaxed">
                Félicitations ! Votre score de <strong>{gamification.score} points</strong> vous permet d'accéder à ce palier de difficulté supérieure.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#f0f3ff] border border-[#dee8ff] text-left text-xs space-y-1.5">
              <div className="font-bold text-[#111c2d] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#ac2356]" />
                <span>Nouveau Titre : {getTitleForScore(gamification.score)}</span>
              </div>
              <p className="text-[#574145]">
                {GAME_LEVELS[unlockedLevelModal - 1].clinicalObjective}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedLevel(unlockedLevelModal);
                  setUnlockedLevelModal(null);
                }}
                className="flex-1 py-3 px-6 rounded-full bg-[#ac2356] hover:bg-[#8f0341] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
              >
                <span>Découvrir le Niveau {unlockedLevelModal}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setUnlockedLevelModal(null)}
                className="py-3 px-6 rounded-full bg-[#f0f3ff] hover:bg-[#dee8ff] text-[#111c2d] text-xs font-bold cursor-pointer"
              >
                Continuer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Hero Banner with Progression Status */}
      <div className="bg-gradient-to-br from-white via-[#fef7f9] to-[#f0f3ff] rounded-3xl p-6 sm:p-8 border border-[#e7eeff] shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffd9e0] text-[#8f0341] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Session Éducative en 5 Niveaux Progressifs</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#111c2d] tracking-tight flex items-center flex-wrap gap-2 pt-1">
              <span className="text-[#ac2356]">Jeu</span>
              <span className="inline-flex items-center">
                <AnOnTcheText iconClassName="w-[0.95em] h-[0.95em] mx-[1px] text-[#ac2356]" />
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#006a61] bg-[#e6fffa] px-2.5 py-0.5 rounded-full border border-[#ccfbf1]">
                5 NIVEAUX
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-[#574145] leading-relaxed">
              Montez les 5 échelons de difficulté selon votre score de points. Chaque palier renforce votre acuité médicale et culturelle pour protéger votre santé et guider votre communauté au Bénin.
            </p>
          </div>

          {/* Current Score & Title Card */}
          <div className="shrink-0 bg-white rounded-2xl p-4 sm:p-5 border border-[#dee8ff] shadow-sm flex items-center gap-4 min-w-[280px]">
            <div className="w-12 h-12 rounded-2xl bg-[#ccfbf1] text-[#006a61] flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-[#574145] uppercase tracking-wider block">
                  TITRE & NIVEAU
                </span>
                <span className="text-xs font-black text-[#ac2356] bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100">
                  Niv. {highestUnlockedLevel}/5
                </span>
              </div>
              <span className="text-base font-extrabold text-[#111c2d] block truncate">
                {gamification.title || 'Vigilante Débutante'}
              </span>
              <div className="text-xs font-bold text-[#ac2356] flex items-center gap-2 pt-0.5">
                <span>✪ {gamification.score} pts cumulés</span>
                {pointsNeededForNext > 0 ? (
                  <span className="text-[10px] font-medium text-slate-500">
                    (+{pointsNeededForNext} pts pour Niv. {highestUnlockedLevel + 1})
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-emerald-600">✓ Sommet atteint</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Global 5-Level Stepper / Roadmap */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs text-[#574145] font-semibold">
            <span>Progression globale vers l'excellence</span>
            <span>
              Palier actif : <strong>{currentLevelMeta.title}</strong>
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {GAME_LEVELS.map((lvl) => {
              const unlocked = isLevelUnlocked(lvl.level);
              const isSelected = selectedLevel === lvl.level;
              const isCurrentHighest = highestUnlockedLevel === lvl.level;

              let cardBg = 'bg-white border-[#dee8ff] text-slate-400 hover:bg-slate-50';
              if (isSelected) {
                cardBg = 'bg-[#fef7f9] border-[#ac2356] ring-2 ring-[#ac2356]/20 text-[#111c2d] shadow-sm';
              } else if (unlocked) {
                cardBg = 'bg-white border-emerald-200 text-[#111c2d] hover:bg-emerald-50/40';
              }

              return (
                <button
                  key={lvl.level}
                  onClick={() => {
                    if (unlocked) {
                      setSelectedLevel(lvl.level);
                    }
                  }}
                  disabled={!unlocked}
                  className={`relative p-2.5 sm:p-3.5 rounded-2xl border text-left transition-all ${cardBg} ${
                    unlocked ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] sm:text-xs font-extrabold uppercase">
                      Niv. {lvl.level}
                    </span>
                    {unlocked ? (
                      <span className="text-emerald-600 text-xs">
                        {gamification.score >= lvl.pointsToNext ? '✓' : '●'}
                      </span>
                    ) : (
                      <Lock className="w-3 h-3 text-slate-400" />
                    )}
                  </div>

                  <div className="text-[11px] sm:text-xs font-bold truncate">
                    {lvl.shortTitle.split(':')[1] || lvl.shortTitle}
                  </div>

                  <div className="flex items-center gap-0.5 text-[9px] sm:text-[10px] text-amber-500 pt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < lvl.stars ? 'opacity-100' : 'opacity-25'}>
                        ★
                      </span>
                    ))}
                  </div>

                  <div className="text-[9px] sm:text-[10px] text-slate-500 pt-1 font-medium">
                    {unlocked ? `${lvl.minScoreToUnlock} pts min` : `Dès ${lvl.minScoreToUnlock} pts`}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Level Header & Clinical Objective */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#e7eeff] shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-extrabold text-[#ac2356] bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-100">
              NIVEAU SÉLECTIONNÉ : {selectedLevel} SUR 5
            </span>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
              Difficulté : {currentLevelMeta.difficultyLabel} ({currentLevelMeta.stars} / 5 étoiles)
            </span>
            <span className="text-xs font-bold text-[#006a61] bg-[#e6fffa] px-2.5 py-0.5 rounded-full border border-[#ccfbf1]">
              Badge : {currentLevelMeta.badgeName}
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-[#111c2d]">
            {currentLevelMeta.title}
          </h2>

          <p className="text-xs sm:text-sm text-[#574145]">
            {currentLevelMeta.description}
          </p>

          <div className="pt-1 text-xs text-[#006a61] font-semibold flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>Objectif clinique : {currentLevelMeta.clinicalObjective}</span>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <AudioPlayButton
            id={`level-meta-${selectedLevel}`}
            textFr={`Vous êtes au ${currentLevelMeta.title}. Niveau de difficulté : ${currentLevelMeta.difficultyLabel}. ${currentLevelMeta.description}. Objectif clinique : ${currentLevelMeta.clinicalObjective}`}
            variant="compact"
            customLabel="Écouter le topo du niveau"
          />
        </div>
      </div>

      {/* Sub-Activities inside Selected Level */}
      <div className="flex flex-wrap gap-2.5">
        <button
          onClick={() => setActiveSubTab('quiz')}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'quiz'
              ? 'bg-[#ac2356] text-white shadow-md shadow-[#ac2356]/20'
              : 'bg-white text-[#574145] border border-[#dee8ff] hover:bg-[#f0f3ff]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Questions QCM du Niveau ({levelQuestions.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('mythes')}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'mythes'
              ? 'bg-[#ac2356] text-white shadow-md shadow-[#ac2356]/20'
              : 'bg-white text-[#574145] border border-[#dee8ff] hover:bg-[#f0f3ff]'
          }`}
        >
          <MessageSquareQuote className="w-4 h-4" />
          <span>Vrai ou Faux : Mythes du Niveau ({levelMyths.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('cas')}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'cas'
              ? 'bg-[#ac2356] text-white shadow-md shadow-[#ac2356]/20'
              : 'bg-white text-[#574145] border border-[#dee8ff] hover:bg-[#f0f3ff]'
          }`}
        >
          <GitBranch className="w-4 h-4" />
          <span>Cas Pratiques du Niveau ({levelCases.length})</span>
        </button>
      </div>

      {/* Main Grid: Left Side Game Stage, Right Side Badges & Support */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Active Educational Sub-Game */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. QUIZ QUESTIONS DU NIVEAU */}
          {activeSubTab === 'quiz' && (
            <div className="space-y-4">
              {levelQuestions.length > 0 && currentQ ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#111c2d]">
                      Niveau {selectedLevel} — Question {questionIdx + 1} sur {levelQuestions.length}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#ccfbf1] text-[#006a61] text-xs font-bold">
                      Gain : +{currentQ.points} pts
                    </span>
                  </div>

                  {/* Linear Progress bar */}
                  <div className="w-full h-2 rounded-full bg-[#e7eeff] overflow-hidden">
                    <div
                      className="h-full bg-[#ac2356] transition-all duration-300"
                      style={{
                        width: `${((questionIdx + 1) / levelQuestions.length) * 100}%`,
                      }}
                    ></div>
                  </div>

                  {/* Question Card */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e7eeff] shadow-sm space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <h3 className="text-base sm:text-lg font-bold text-[#111c2d] leading-snug">
                        {currentQ.question}
                      </h3>
                      <div className="shrink-0">
                        <AudioPlayButton
                          id={`quiz-q-${currentQ.id}`}
                          textFr={`Question niveau ${selectedLevel} : ${currentQ.question}. Choix numéro 1 : ${currentQ.options[0]}. Choix numéro 2 : ${currentQ.options[1]}. Choix numéro 3 : ${currentQ.options[2]}. Choix numéro 4 : ${currentQ.options[3] || ''}`}
                          variant="compact"
                          customLabel="Écouter la question & les choix"
                        />
                      </div>
                    </div>

                    {/* Options list */}
                    <div className="space-y-3">
                      {currentQ.options.map((option, index) => {
                        const isSelected = selectedAnswerIdx === index;
                        const isCorrectOption = index === currentQ.correctIndex;

                        let btnClass = 'border-[#dee8ff] bg-[#f8fafc] text-[#111c2d] hover:bg-[#f0f3ff]';
                        if (isAnswerSubmitted) {
                          if (isCorrectOption) {
                            btnClass = 'border-[#006a61] bg-[#e6fffa] text-[#006a61] font-bold ring-2 ring-[#006a61]/20';
                          } else if (isSelected && !isCorrectOption) {
                            btnClass = 'border-[#ba1a1a] bg-[#ffdad6] text-[#ba1a1a] font-bold';
                          } else {
                            btnClass = 'border-[#e7eeff] bg-gray-50 text-gray-400 opacity-60';
                          }
                        }

                        return (
                          <div
                            key={index}
                            className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${btnClass}`}
                          >
                            <button
                              disabled={isAnswerSubmitted}
                              onClick={() => handleSelectQuizOption(index)}
                              className="text-left text-xs sm:text-sm font-medium flex-1 cursor-pointer"
                            >
                              <span className="font-bold mr-2 text-[#ac2356]">{index + 1}.</span>
                              <span>{option}</span>
                            </button>
                            <div className="flex items-center gap-2 shrink-0">
                              <AudioPlayButton
                                id={`quiz-opt-${currentQ.id}-${index}`}
                                textFr={`Choix ${index + 1} : ${option}`}
                                variant="icon-only"
                                className="w-7 h-7"
                              />
                              {isAnswerSubmitted && isCorrectOption && (
                                <Check className="w-5 h-5 text-[#006a61] shrink-0" />
                              )}
                              {isAnswerSubmitted && isSelected && !isCorrectOption && (
                                <X className="w-5 h-5 text-[#ba1a1a] shrink-0" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Feedback and Clinical explanation when submitted */}
                    {isAnswerSubmitted && (
                      <div className="p-4 sm:p-5 rounded-2xl bg-[#f0fdf4] border border-[#bbf7d0] space-y-3 animate-fade-in">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-[#16a34a]" />
                            <span className="text-xs font-bold text-[#15803d]">
                              Explication Clinique & Repère Médical
                            </span>
                          </div>
                          <AudioPlayButton
                            id={`quiz-exp-${currentQ.id}`}
                            textFr={`Explication : ${currentQ.explanation}. Repère clinique : ${currentQ.clinicalFact}`}
                            variant="compact"
                          />
                        </div>
                        <p className="text-xs text-[#166534] leading-relaxed">
                          {currentQ.explanation}
                        </p>
                        <div className="pt-2 text-[11px] text-[#15803d] font-semibold border-t border-[#dcfce7]">
                          💡 Repère clinique : {currentQ.clinicalFact}
                        </div>
                      </div>
                    )}

                    {/* Next Question or Next Level Button */}
                    {isAnswerSubmitted && (
                      <div className="flex justify-between items-center pt-2">
                        <button
                          onClick={() => {
                            setSelectedAnswerIdx(null);
                            setIsAnswerSubmitted(false);
                          }}
                          className="px-4 py-2.5 rounded-full bg-[#f0f3ff] hover:bg-[#dee8ff] text-[#111c2d] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Rejouer</span>
                        </button>

                        {questionIdx < levelQuestions.length - 1 ? (
                          <button
                            onClick={handleNextQuestion}
                            className="px-6 py-3 rounded-full bg-[#ac2356] hover:bg-[#8f0341] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md shadow-[#ac2356]/20 transition-all cursor-pointer"
                          >
                            <span>Question Suivante</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => setActiveSubTab('mythes')}
                            className="px-6 py-3 rounded-full bg-[#ac2356] hover:bg-[#8f0341] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
                          >
                            <span>Passer aux Mythes du Niveau</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-3xl p-8 border border-[#e7eeff] text-center space-y-4">
                  <p className="text-xs text-slate-500">Toutes les questions de ce niveau sont consultées.</p>
                </div>
              )}
            </div>
          )}

          {/* 2. MYTHES DU NIVEAU */}
          {activeSubTab === 'mythes' && (
            <div className="space-y-4">
              {levelMyths.length > 0 && currentM ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#111c2d]">
                      Niveau {selectedLevel} — Croyance {mythIdx + 1} sur {levelMyths.length}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#ccfbf1] text-[#006a61] text-xs font-bold">
                      Gain : +{currentM.points} pts
                    </span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-[#e7eeff] overflow-hidden">
                    <div
                      className="h-full bg-[#ac2356] transition-all duration-300"
                      style={{
                        width: `${((mythIdx + 1) / levelMyths.length) * 100}%`,
                      }}
                    ></div>
                  </div>

                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e7eeff] shadow-sm space-y-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[11px] font-extrabold uppercase text-[#ac2356]">
                        CROYANCE DU BÉNIN ÉTUDIÉE
                      </span>
                      <AudioPlayButton
                        id={`myth-audio-${currentM.id}`}
                        textFr={`Affirmation à évaluer : ${currentM.statement}. Selon vous, est-ce vrai ou faux ?`}
                        variant="compact"
                      />
                    </div>

                    <div className="p-4 rounded-2xl bg-[#ffd9e0]/40 border border-[#ffd9e0] text-[#8f0341] text-xs sm:text-sm font-semibold">
                      « {currentM.statement} »
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-[#111c2d]">
                      Selon vous, cette affirmation est-elle :
                    </h4>

                    {/* Vrai ou Faux buttons */}
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        disabled={mythSelectedAnswer !== null}
                        onClick={() => handleMythAnswer(true)}
                        className={`p-4 rounded-2xl border text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          mythSelectedAnswer === true
                            ? currentM.isTrue
                              ? 'bg-[#e6fffa] border-[#006a61] text-[#006a61]'
                              : 'bg-[#ffdad6] border-[#ba1a1a] text-[#ba1a1a]'
                            : 'bg-white border-[#dee8ff] text-[#111c2d] hover:bg-[#f0f3ff]'
                        }`}
                      >
                        <Check className="w-5 h-5 text-emerald-600" />
                        <span>VRAI</span>
                      </button>

                      <button
                        disabled={mythSelectedAnswer !== null}
                        onClick={() => handleMythAnswer(false)}
                        className={`p-4 rounded-2xl border text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          mythSelectedAnswer === false
                            ? !currentM.isTrue
                              ? 'bg-[#e6fffa] border-[#006a61] text-[#006a61]'
                              : 'bg-[#ffdad6] border-[#ba1a1a] text-[#ba1a1a]'
                            : 'bg-white border-[#dee8ff] text-[#111c2d] hover:bg-[#f0f3ff]'
                        }`}
                      >
                        <X className="w-5 h-5 text-rose-600" />
                        <span>FAUX</span>
                      </button>
                    </div>

                    {mythSelectedAnswer !== null && (
                      <div className="p-5 rounded-2xl bg-[#f0f3ff] border border-[#dee8ff] space-y-2.5 animate-fade-in">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#ac2356] uppercase block">
                            La réalité médicale démontrée
                          </span>
                          <AudioPlayButton
                            id={`myth-exp-${currentM.id}`}
                            textFr={`Explication : ${currentM.explanation}. Contexte au Bénin : ${currentM.beninContext}`}
                            variant="compact"
                          />
                        </div>
                        <p className="text-xs text-[#111c2d] leading-relaxed">
                          {currentM.explanation}
                        </p>
                        <div className="pt-2 text-[11px] text-[#574145] border-t border-[#dee8ff]">
                          📍 <strong>Contexte au Bénin :</strong> {currentM.beninContext}
                        </div>
                      </div>
                    )}

                    {mythSelectedAnswer !== null && (
                      <div className="flex justify-between items-center pt-2">
                        <button
                          onClick={() => setMythSelectedAnswer(null)}
                          className="px-4 py-2.5 rounded-full bg-[#f0f3ff] hover:bg-[#dee8ff] text-[#111c2d] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Rejouer</span>
                        </button>

                        {mythIdx < levelMyths.length - 1 ? (
                          <button
                            onClick={handleNextMyth}
                            className="px-6 py-3 rounded-full bg-[#ac2356] hover:bg-[#8f0341] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
                          >
                            <span>Mythe suivant</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => setActiveSubTab('cas')}
                            className="px-6 py-3 rounded-full bg-[#ac2356] hover:bg-[#8f0341] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
                          >
                            <span>Passer aux Cas Pratiques</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-3xl p-8 border border-[#e7eeff] text-center space-y-4">
                  <p className="text-xs text-slate-500">Pas de mythe additionnel dans ce niveau.</p>
                </div>
              )}
            </div>
          )}

          {/* 3. CAS PRATIQUES DU NIVEAU */}
          {activeSubTab === 'cas' && (
            <div className="space-y-4">
              {levelCases.length > 0 && currentC ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#111c2d]">
                      Niveau {selectedLevel} — Scénario {caseIdx + 1} sur {levelCases.length}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#e6fffa] text-[#006a61] text-xs font-bold">
                      Gain : +{currentC.points} pts
                    </span>
                  </div>

                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e7eeff] shadow-sm space-y-5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="p-2.5 rounded-xl bg-[#f0f3ff] text-xs text-[#574145]">
                        <strong>Profil :</strong> {currentC.profile}
                      </div>
                      <AudioPlayButton
                        id={`case-scenario-${currentC.id}`}
                        textFr={`Mise en situation clinique du niveau ${selectedLevel}. ${currentC.title}. Profil : ${currentC.profile}. Situation : ${currentC.scenario}. Que faire ? Écoutez les différentes options.`}
                        variant="compact"
                        customLabel="Écouter le cas"
                      />
                    </div>

                    <div className="text-xs sm:text-sm text-[#111c2d] leading-relaxed bg-[#fef7f9] p-4 rounded-2xl border border-[#ffd9e0]">
                      <strong>Situation : </strong>{currentC.scenario}
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-[#111c2d] pt-2">
                      Quelle est la meilleure démarche médicale et humaine à adopter ?
                    </h4>

                    <div className="space-y-3">
                      {currentC.options.map((opt, i) => {
                        const isChosen = selectedCaseOption === i;
                        let optStyle = 'border-[#dee8ff] bg-white text-[#111c2d] hover:bg-[#f0f3ff]';
                        if (caseSubmitted) {
                          if (opt.isOptimal) {
                            optStyle = 'border-[#006a61] bg-[#e6fffa] text-[#006a61] font-bold';
                          } else if (isChosen && !opt.isOptimal) {
                            optStyle = 'border-[#ba1a1a] bg-[#ffdad6] text-[#ba1a1a] font-bold';
                          } else {
                            optStyle = 'border-gray-100 bg-gray-50 text-gray-400 opacity-60';
                          }
                        }

                        return (
                          <div
                            key={i}
                            className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${optStyle}`}
                          >
                            <button
                              disabled={caseSubmitted}
                              onClick={() => handleCaseSelect(i)}
                              className="w-full text-left text-xs leading-relaxed cursor-pointer"
                            >
                              <span className="font-bold mr-2 text-[#ac2356]">{i + 1}.</span>
                              <span>{opt.text}</span>
                            </button>
                            <AudioPlayButton
                              id={`case-opt-${currentC.id}-${i}`}
                              textFr={`Option ${i + 1} : ${opt.text}`}
                              variant="icon-only"
                              className="w-7 h-7 shrink-0"
                            />
                          </div>
                        );
                      })}
                    </div>

                    {caseSubmitted && selectedCaseOption !== null && (
                      <div className="p-4 rounded-2xl bg-[#f0fdf4] border border-[#bbf7d0] text-xs text-[#166534] leading-relaxed animate-fade-in space-y-2">
                        <div className="flex items-center justify-between">
                          <strong className="text-emerald-800">Analyse médicale & réflexe santé :</strong>
                          <AudioPlayButton
                            id={`case-fb-${currentC.id}`}
                            textFr={`Analyse médicale : ${currentC.options[selectedCaseOption].feedback}`}
                            variant="compact"
                          />
                        </div>
                        <p>{currentC.options[selectedCaseOption].feedback}</p>
                      </div>
                    )}

                    {caseSubmitted && (
                      <div className="flex justify-between items-center pt-2">
                        <button
                          onClick={() => {
                            setSelectedCaseOption(null);
                            setCaseSubmitted(false);
                          }}
                          className="px-4 py-2.5 rounded-full bg-[#f0f3ff] hover:bg-[#dee8ff] text-[#111c2d] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Rejouer</span>
                        </button>

                        {caseIdx < levelCases.length - 1 ? (
                          <button
                            onClick={handleNextCase}
                            className="px-6 py-3 rounded-full bg-[#ac2356] hover:bg-[#8f0341] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
                          >
                            <span>Scénario suivant</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        ) : selectedLevel < 5 && isLevelUnlocked((selectedLevel + 1) as DifficultyLevel) ? (
                          <button
                            onClick={() => {
                              setSelectedLevel((selectedLevel + 1) as DifficultyLevel);
                              setActiveSubTab('quiz');
                            }}
                            className="px-6 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
                          >
                            <span>Passer au Niveau {selectedLevel + 1} !</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => setActiveSubTab('quiz')}
                            className="px-6 py-3 rounded-full bg-[#ac2356] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md cursor-pointer"
                          >
                            <span>Revoir les questions</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-3xl p-8 border border-[#e7eeff] text-center space-y-4">
                  <p className="text-xs text-slate-500">Pas de cas pratique additionnel dans ce niveau.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column (4 cols): Badges, Progression, Medical Support 136, Sharing */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Paliers & Badges des 5 Niveaux */}
          <div className="bg-white rounded-3xl p-6 border border-[#e7eeff] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-[#111c2d]">
                Paliers des 5 Niveaux
              </h3>
              <span className="text-[11px] font-bold text-[#ac2356]">
                Score : {gamification.score} pts
              </span>
            </div>

            <div className="space-y-2.5">
              {GAME_LEVELS.map((lvl) => {
                const unlocked = isLevelUnlocked(lvl.level);
                const isSelected = selectedLevel === lvl.level;

                return (
                  <div
                    key={lvl.level}
                    onClick={() => {
                      if (unlocked) setSelectedLevel(lvl.level);
                    }}
                    className={`p-3 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
                      isSelected
                        ? 'bg-[#fef7f9] border-[#ac2356] ring-1 ring-[#ac2356]'
                        : unlocked
                        ? 'bg-[#f0fdf4] border-[#bbf7d0] cursor-pointer hover:bg-emerald-100/50'
                        : 'bg-slate-50 border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                          unlocked ? 'bg-[#006a61] text-white' : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {unlocked ? lvl.level : <Lock className="w-3.5 h-3.5" />}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-[#111c2d] truncate">
                          {lvl.shortTitle}
                        </h4>
                        <p className="text-[10px] text-[#574145]">
                          {unlocked ? `Badge : ${lvl.badgeName}` : `Débloqué à ${lvl.minScoreToUnlock} pts`}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-bold text-amber-500">
                        {'★'.repeat(lvl.stars)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 2: Support Médical Numéro Vert 136 */}
          <div className="bg-[#ccfbf1]/40 rounded-3xl p-6 border border-[#99f6e4] space-y-4">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-[#006a61]" />
              <h4 className="text-xs font-extrabold text-[#006a61]">
                Écoute & Orientation Médicale Gratuite
              </h4>
            </div>

            <p className="text-xs text-[#574145] leading-relaxed">
              Le Ministère de la Santé du Bénin vous assiste gratuitement pour trouver le centre de sénologie le plus proche.
            </p>

            <div className="pt-2 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold text-[#574145] block">
                  Numéro Vert Gratuit
                </span>
                <span className="text-2xl font-black text-[#111c2d]">
                  136
                </span>
              </div>

              <a
                href="tel:136"
                className="px-5 py-2.5 rounded-full bg-[#006a61] hover:bg-[#005049] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Appeler</span>
              </a>
            </div>
          </div>

          {/* Card 3: Partage Communautaire */}
          <div className="bg-white rounded-3xl p-6 border border-[#e7eeff] shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#ffd9e0] text-[#ac2356] flex items-center justify-center shrink-0">
                <Share2 className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-extrabold text-[#111c2d]">
                Sensibiliser vos proches
              </h4>
            </div>

            <p className="text-xs text-[#574145] leading-relaxed">
              Partagez votre progression et invitez vos mères, sœurs et amies à tester leurs connaissances.
            </p>

            <button
              onClick={handleShare}
              className="w-full py-2.5 px-4 rounded-full bg-[#f0f3ff] hover:bg-[#dee8ff] text-[#ac2356] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{shareSuccess ? '✓ Message copié !' : 'Partager mon score'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Community public health note */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#dee8ff] text-xs text-[#574145] leading-relaxed flex items-start gap-3">
        <Shield className="w-4 h-4 text-[#ac2356] shrink-0 mt-0.5" />
        <p>
          <strong className="text-[#111c2d]">Note de santé publique communautaire : </strong>
          Ce jeu éducatif en 5 paliers progressifs est une initiative d'apprentissage civique.
          Il ne remplace jamais un examen clinique annuel par un médecin, une sage-femme qualifiée ou une mammographie de dépistage dans les centres hospitaliers (CNHU, CHD).
        </p>
      </div>
    </div>
  );
};
