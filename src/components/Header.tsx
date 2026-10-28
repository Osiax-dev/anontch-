import React from 'react';
import { NavigationTab, UserProfile } from '../types';
import { ShieldCheck, Heart, User, CheckCircle2, Lock, RotateCcw } from 'lucide-react';
import { AnOnTcheText } from './BreastOIcon';

interface HeaderProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  brandVariant?: 'anontche' | 'rubanrose';
  userProfile: UserProfile | null;
  onOpenAuthModal: () => void;
  onOpenProfileModal: () => void;
  onLockNow?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  brandVariant = 'anontche',
  userProfile,
  onOpenAuthModal,
  onOpenProfileModal,
  onLockNow,
}) => {
  const handleHardRefresh = () => {
    try {
      if ('caches' in window) {
        caches.keys().then((names) => {
          names.forEach((name) => caches.delete(name));
        });
      }
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((r) => r.unregister());
        });
      }
    } catch (e) {}
    // Force reload bypassing cache
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e7eeff] shadow-sm">
      {/* Top micro banner for version status & instant cache bypass */}
      <div className="bg-[#f0fdf4] border-b border-[#dcfce7] py-1 px-4 text-xs text-[#166534] flex items-center justify-between gap-2 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#16a34a] animate-pulse"></span>
          <span className="font-semibold text-[11px] sm:text-xs">Version 5 Niveaux active • Données sécurisées</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleHardRefresh}
            title="Actualiser pour charger immédiatement la toute dernière version sur votre téléphone"
            className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] font-bold cursor-pointer transition-all shadow-2xs"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Actualiser</span>
          </button>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo & Name */}
          <button
            onClick={() => onSelectTab('accueil')}
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ac2356] to-[#cd3e6e] flex items-center justify-center text-white shadow-md shadow-[#ac2356]/20 group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 fill-white/80" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-[#111c2d] flex items-center">
                  <AnOnTcheText iconClassName="w-[0.95em] h-[0.95em] mx-[0.5px] text-[#ac2356]" />
                  <span className="text-[#006a61] bg-[#e6fffa] px-1.5 py-0.5 rounded text-xs font-bold ml-1.5">BÉNIN</span>
                </span>
              </div>
              <p className="text-xs text-[#574145] font-medium hidden sm:block">
                Santé du sein & Prévention active
              </p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => onSelectTab('accueil')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                currentTab === 'accueil'
                  ? 'bg-[#cd3e6e] text-white shadow-sm'
                  : 'text-[#574145] hover:text-[#111c2d] hover:bg-[#f0f3ff]'
              }`}
            >
              Accueil
            </button>
            <button
              onClick={() => onSelectTab('guide')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                currentTab === 'guide'
                  ? 'bg-[#cd3e6e] text-white shadow-sm'
                  : 'text-[#574145] hover:text-[#111c2d] hover:bg-[#f0f3ff]'
              }`}
            >
              Guide Palpation
            </button>
            <button
              onClick={() => onSelectTab('risques')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                currentTab === 'risques'
                  ? 'bg-[#cd3e6e] text-white shadow-sm'
                  : 'text-[#574145] hover:text-[#111c2d] hover:bg-[#f0f3ff]'
              }`}
            >
              Facteurs de Risque
            </button>
            <button
              onClick={() => onSelectTab('jeu')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                currentTab === 'jeu'
                  ? 'bg-[#cd3e6e] text-white shadow-sm'
                  : 'text-[#574145] hover:text-[#111c2d] hover:bg-[#f0f3ff]'
              }`}
            >
              Jeu
            </button>
            <button
              onClick={() => onSelectTab('centres')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                currentTab === 'centres'
                  ? 'bg-[#cd3e6e] text-white shadow-sm'
                  : 'text-[#574145] hover:text-[#111c2d] hover:bg-[#f0f3ff]'
              }`}
            >
              Centres Bénin
            </button>
            <button
              onClick={() => onSelectTab('suivi')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                currentTab === 'suivi'
                  ? 'bg-[#cd3e6e] text-white shadow-sm'
                  : 'text-[#574145] hover:text-[#111c2d] hover:bg-[#f0f3ff]'
              }`}
            >
              Mon Suivi
            </button>
          </nav>

          {/* Right Status & Profile */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f0fdf4] text-[#15803d] text-xs font-semibold border border-[#dcfce7]">
              <span className="w-2 h-2 rounded-full bg-[#16a34a]"></span>
              <span>PWA • Prêt hors-ligne</span>
            </div>

            {userProfile?.isAuthenticated ? (
              userProfile.isLocked ? (
                <button
                  onClick={onOpenAuthModal}
                  title="Espace intime verrouillé - Cliquez pour saisir votre code PIN"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fee2e2] hover:bg-[#fecaca] text-[#991b1b] border border-[#fca5a5] text-xs font-bold transition-all cursor-pointer animate-pulse"
                >
                  <Lock className="w-3.5 h-3.5 text-[#dc2626]" />
                  <span>Verrouillé (PIN)</span>
                </button>
              ) : (
                <div className="flex items-center gap-1.5">
                  {onLockNow && (
                    <button
                      onClick={onLockNow}
                      title="Verrouillage Express : Masquer immédiatement mes données intimes en 1 clic"
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#f0f3ff] hover:bg-[#fee2e2] text-[#ac2356] hover:text-[#991b1b] border border-[#dee8ff] text-xs font-bold transition-all cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Discrétion</span>
                    </button>
                  )}
                  <button
                    onClick={onOpenProfileModal}
                    title="Gérer mon espace personnel"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f0f3ff] hover:bg-[#ffd9e0] text-[#111c2d] border border-[#dee8ff] transition-all cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#ac2356] text-white flex items-center justify-center text-xs font-bold">
                      {userProfile.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs font-bold max-w-[90px] truncate hidden sm:inline">
                      {userProfile.name}
                    </span>
                  </button>
                </div>
              )
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ffd9e0] hover:bg-[#ffb1c2] text-[#8f0341] text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Mon Espace Privé</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile secondary navigation scroller */}
        <div className="md:hidden flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none pt-1">
          <button
            onClick={() => onSelectTab('accueil')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer ${
              currentTab === 'accueil' ? 'bg-[#cd3e6e] text-white' : 'bg-[#f0f3ff] text-[#574145]'
            }`}
          >
            Accueil
          </button>
          <button
            onClick={() => onSelectTab('guide')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer ${
              currentTab === 'guide' ? 'bg-[#cd3e6e] text-white' : 'bg-[#f0f3ff] text-[#574145]'
            }`}
          >
            Guide Palpation
          </button>
          <button
            onClick={() => onSelectTab('risques')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer ${
              currentTab === 'risques' ? 'bg-[#cd3e6e] text-white' : 'bg-[#f0f3ff] text-[#574145]'
            }`}
          >
            Facteurs de Risque
          </button>
          <button
            onClick={() => onSelectTab('jeu')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer ${
              currentTab === 'jeu' ? 'bg-[#cd3e6e] text-white' : 'bg-[#f0f3ff] text-[#574145]'
            }`}
          >
            Jeu
          </button>
          <button
            onClick={() => onSelectTab('centres')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer ${
              currentTab === 'centres' ? 'bg-[#cd3e6e] text-white' : 'bg-[#f0f3ff] text-[#574145]'
            }`}
          >
            Centres Bénin
          </button>
          <button
            onClick={() => onSelectTab('suivi')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer ${
              currentTab === 'suivi' ? 'bg-[#cd3e6e] text-white' : 'bg-[#f0f3ff] text-[#574145]'
            }`}
          >
            Mon Suivi
          </button>
        </div>
      </div>
    </header>
  );
};
