import React, { useState, useEffect } from 'react';
import { NavigationTab, HealthCenter, PalpationLog, UserGamificationState, UserProfile } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { CycleCalculatorSection } from './components/CycleCalculatorSection';
import { PwaOfflineSection } from './components/PwaOfflineSection';
import { PalpationStepsSection } from './components/PalpationStepsSection';
import { WarningSignsSection } from './components/WarningSignsSection';
import { CentersSection } from './components/CentersSection';
import { QuizPromoBanner } from './components/QuizPromoBanner';
import { EducationalGameView } from './components/EducationalGameView';
import { CenterDetailsModal } from './components/CenterDetailsModal';
import { LogExamModal } from './components/LogExamModal';
import { PalpationGuideModal } from './components/PalpationGuideModal';
import { PersonalTrackerView } from './components/PersonalTrackerView';
import { RiskFactorsSection } from './components/RiskFactorsSection';
import { FloatingAudioBar } from './components/FloatingAudioBar';
import { AuthOnboardingModal } from './components/AuthOnboardingModal';
import { UserProfileModal } from './components/UserProfileModal';

const DEFAULT_LOGS: PalpationLog[] = [
  {
    id: 'log-1',
    date: '25/09/2026',
    daysAgo: 28,
    label: 'Examen réalisé - Mois dernier',
    notes: 'Aucune anomalie détectée',
    findingType: 'normal',
    findingDescription: 'Seins souples et symétriques',
    side: 'both',
  },
  {
    id: 'log-2',
    date: '28/08/2026',
    daysAgo: 56,
    label: 'Examen réalisé - Précédent',
    notes: 'Seins souples et symétriques',
    findingType: 'normal',
    findingDescription: 'Régulier, pas de tension anormale',
    side: 'both',
  },
];

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('accueil');
  const [selectedCenter, setSelectedCenter] = useState<HealthCenter | null>(null);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  // User Profile & Authentication State (local offline storage)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('anontche_user_profile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Prompt authentication on first connection unless already logged in or dismissed as guest
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(() => {
    try {
      const savedProfile = localStorage.getItem('anontche_user_profile');
      const guestDismissed = localStorage.getItem('anontche_guest_dismissed');
      // If no profile exists and user hasn't explicitly dismissed, open onboarding prompt
      return !savedProfile && guestDismissed !== 'true';
    } catch {
      return false;
    }
  });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  const handleAuthenticate = (profile: UserProfile) => {
    setUserProfile(profile);
    try {
      localStorage.setItem('anontche_user_profile', JSON.stringify(profile));
    } catch {}
    setIsAuthModalOpen(false);
  };

  const handleQuickLock = () => {
    if (!userProfile) return;
    const updated: UserProfile = { ...userProfile, isLocked: true };
    setUserProfile(updated);
    try {
      localStorage.setItem('anontche_user_profile', JSON.stringify(updated));
    } catch {}
  };

  const handleToggleDiscreetMode = () => {
    if (!userProfile) return;
    const updated: UserProfile = { ...userProfile, discreetMode: !userProfile.discreetMode };
    setUserProfile(updated);
    try {
      localStorage.setItem('anontche_user_profile', JSON.stringify(updated));
    } catch {}
  };

  const handleResetAllData = () => {
    setUserProfile(null);
    setLogs([]);
    try {
      localStorage.removeItem('anontche_user_profile');
      localStorage.removeItem('anontche_palpation_logs');
      localStorage.removeItem('anontche_gamification');
      localStorage.removeItem('anontche_guest_dismissed');
    } catch {}
  };

  const handleLogout = () => {
    setUserProfile(null);
    try {
      localStorage.removeItem('anontche_user_profile');
    } catch {}
    setIsProfileModalOpen(false);
  };

  // Palpation logs state in localStorage
  const [logs, setLogs] = useState<PalpationLog[]>(() => {
    try {
      const saved = localStorage.getItem('anontche_palpation_logs');
      return saved ? JSON.parse(saved) : DEFAULT_LOGS;
    } catch {
      return DEFAULT_LOGS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('anontche_palpation_logs', JSON.stringify(logs));
    } catch (e) {
      // storage quota or private browsing fallback
    }
  }, [logs]);

  // Gamification state in localStorage
  const [gamification, setGamification] = useState<UserGamificationState>(() => {
    try {
      const saved = localStorage.getItem('anontche_gamification');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      score: 0,
      title: 'Vigilante Débutante',
      currentLevel: 1,
      highestLevelUnlocked: 1,
      quizScore: 0,
      quizCompleted: false,
      mythsCompleted: false,
      casesCompleted: false,
      badges: {
        starVigilante: false,
        healthProtector: false,
        palpationChampion: false,
      },
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('anontche_gamification', JSON.stringify(gamification));
    } catch (e) {}
  }, [gamification]);

  // Save new log
  const handleSaveLog = (newLog: PalpationLog) => {
    setLogs((prev) => [newLog, ...prev]);
  };

  // Delete log
  const handleDeleteLog = (id: string) => {
    setLogs((prev) => prev.filter((l) => l.id !== id));
  };

  // Navigation handlers
  const handleScrollToCalculator = () => {
    if (currentTab !== 'accueil') {
      setCurrentTab('accueil');
      setTimeout(() => {
        document.getElementById('calculateur-cycle')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('calculateur-cycle')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLearnGestures = () => {
    setIsGuideModalOpen(true);
  };

  // Scroll to top on tab switch
  const handleSelectTab = (tab: NavigationTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#111c2d] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        brandVariant="anontche"
        userProfile={userProfile}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onLockNow={userProfile?.isAuthenticated && !userProfile.isLocked ? handleQuickLock : undefined}
      />

      {/* Main Content Views */}
      <main className="flex-1">
        {/* VIEW 1: ACCUEIL */}
        {currentTab === 'accueil' && (
          <div className="animate-fade-in space-y-4">
            <HeroSection
              onCalculateClick={handleScrollToCalculator}
              onLearnGesturesClick={handleLearnGestures}
            />

            <CycleCalculatorSection
              onOpenLogModal={() => setIsLogModalOpen(true)}
              logs={logs}
            />

            <PwaOfflineSection />

            <PalpationStepsSection
              onStartGuidedWalkthrough={() => setIsGuideModalOpen(true)}
            />

            <RiskFactorsSection />

            <WarningSignsSection />

            <CentersSection
              onOpenCenterDetails={(center) => setSelectedCenter(center)}
            />

            <QuizPromoBanner
              onStartQuiz={() => handleSelectTab('jeu')}
            />
          </div>
        )}

        {/* VIEW 2: GUIDE PALPATION */}
        {currentTab === 'guide' && (
          <div className="animate-fade-in pt-4">
            <PalpationStepsSection
              onStartGuidedWalkthrough={() => setIsGuideModalOpen(true)}
            />
            <WarningSignsSection />
          </div>
        )}

        {/* VIEW: FACTEURS DE RISQUE */}
        {currentTab === 'risques' && (
          <div className="animate-fade-in pt-4">
            <RiskFactorsSection />
          </div>
        )}

        {/* VIEW 3: JEU ÉDUCATIF (Image 7) */}
        {currentTab === 'jeu' && (
          <EducationalGameView
            gamification={gamification}
            onUpdateGamification={setGamification}
          />
        )}

        {/* VIEW 4: CENTRES BÉNIN */}
        {currentTab === 'centres' && (
          <div className="animate-fade-in pt-4">
            <CentersSection
              onOpenCenterDetails={(center) => setSelectedCenter(center)}
            />
          </div>
        )}

        {/* VIEW 5: MON SUIVI */}
        {currentTab === 'suivi' && (
          <div className="animate-fade-in space-y-6">
            <PersonalTrackerView
              logs={logs}
              onOpenLogModal={() => setIsLogModalOpen(true)}
              onDeleteLog={handleDeleteLog}
              userProfile={userProfile}
              onUnlock={() => setIsAuthModalOpen(true)}
              onLockNow={handleQuickLock}
            />
            <CycleCalculatorSection
              onOpenLogModal={() => setIsLogModalOpen(true)}
              logs={logs}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <CenterDetailsModal
        center={selectedCenter}
        onClose={() => setSelectedCenter(null)}
      />

      <LogExamModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        onSaveLog={handleSaveLog}
      />

      <PalpationGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        onFinish={() => {
          setIsGuideModalOpen(false);
          setIsLogModalOpen(true);
        }}
      />

      {/* Authentication & Profile Modals */}
      <AuthOnboardingModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthenticate={handleAuthenticate}
        existingProfile={userProfile}
      />

      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={userProfile}
        logsCount={logs.length}
        onLogout={handleLogout}
        onLockNow={handleQuickLock}
        onToggleDiscreetMode={handleToggleDiscreetMode}
        onResetAllData={handleResetAllData}
      />

      {/* Floating Audio Bar for non-readers and voice guidance */}
      <FloatingAudioBar />
    </div>
  );
}
