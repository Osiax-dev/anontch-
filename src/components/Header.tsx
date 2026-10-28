import React from 'react';
import { Heart, Lock, RotateCcw } from 'lucide-react';
import { NavigationTab, UserProfile } from '../types';
import { AnOnTcheText } from './BreastOIcon';

interface HeaderProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  /** Non utilisé pour l'instant : conservé pour ne pas casser les appels existants. */
  brandVariant?: 'anontche' | 'rubanrose';
  userProfile: UserProfile | null;
  onOpenAuthModal: () => void;
  onOpenProfileModal: () => void;
  onLockNow?: () => void;
}

/* ---------- Données ---------- */

const NAV_ITEMS: { tab: NavigationTab; label: string }[] = [
  { tab: 'accueil', label: 'Accueil' },
  { tab: 'guide', label: 'Guide Palpation' },
  { tab: 'risques', label: 'Facteurs de Risque' },
  { tab: 'jeu', label: 'Jeu' },
  { tab: 'centres', label: 'Centres Bénin' },
  { tab: 'suivi', label: 'Mon Suivi' },
];

/* ---------- Actions ---------- */

/** Vide les caches et les service workers, puis recharge la page. */
async function hardRefresh(): Promise<void> {
  try {
    if ('caches' in window) {
      const names = await caches.keys();
      await Promise.all(names.map((name) => caches.delete(name)));
    }
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((r) => r.unregister()));
    }
  } catch {
    /* on recharge quand même */
  }
  window.location.reload();
}

/* ---------- Sous-composants ---------- */

const RefreshBar: React.FC = () => (
  <div className="hdr__refresh-bar">
    <button
      type="button"
      className="hdr__refresh"
      onClick={hardRefresh}
      title="Actualiser pour charger immédiatement la toute dernière version sur votre téléphone"
    >
      <RotateCcw />
      <span>Actualiser</span>
    </button>
  </div>
);

const Brand: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button type="button" className="hdr__brand" onClick={onClick}>
    <span className="hdr__logo" aria-hidden="true">
      <Heart />
    </span>
    <span>
      <span className="hdr__name">
        <AnOnTcheText iconClassName="hdr__name-icon" />
        <span className="hdr__country">BÉNIN</span>
      </span>
      <span className="hdr__tagline">Santé du sein &amp; Prévention active</span>
    </span>
  </button>
);

interface NavItemsProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  variant: 'desktop' | 'mobile';
}

const NavItems: React.FC<NavItemsProps> = ({ currentTab, onSelectTab, variant }) => (
  <>
    {NAV_ITEMS.map(({ tab, label }) => {
      const active = currentTab === tab;
      return (
        <button
          key={tab}
          type="button"
          className={`hdr__tab hdr__tab--${variant}${active ? ' is-active' : ''}`}
          aria-current={active ? 'page' : undefined}
          onClick={() => onSelectTab(tab)}
        >
          {label}
        </button>
      );
    })}
  </>
);

interface UserAreaProps {
  userProfile: UserProfile | null;
  onOpenAuthModal: () => void;
  onOpenProfileModal: () => void;
  onLockNow?: () => void;
}

const UserArea: React.FC<UserAreaProps> = ({ userProfile, onOpenAuthModal, onOpenProfileModal, onLockNow }) => {
  if (!userProfile?.isAuthenticated) {
    return (
      <button type="button" className="hdr__pill hdr__pill--private" onClick={onOpenAuthModal}>
        <Lock />
        <span>Mon Espace Privé</span>
      </button>
    );
  }

  if (userProfile.isLocked) {
    return (
      <button
        type="button"
        className="hdr__pill hdr__pill--locked"
        onClick={onOpenAuthModal}
        title="Espace intime verrouillé - Cliquez pour saisir votre code PIN"
      >
        <Lock />
        <span>Verrouillé (PIN)</span>
      </button>
    );
  }

  return (
    <div className="hdr__user">
      {onLockNow && (
        <button
          type="button"
          className="hdr__pill hdr__pill--discreet"
          onClick={onLockNow}
          title="Verrouillage Express : Masquer immédiatement mes données intimes en 1 clic"
        >
          <Lock />
          <span className="hdr__hide-sm">Discrétion</span>
        </button>
      )}
      <button
        type="button"
        className="hdr__profile"
        onClick={onOpenProfileModal}
        title="Gérer mon espace personnel"
      >
        <span className="hdr__avatar">{userProfile.name.charAt(0).toUpperCase()}</span>
        <span className="hdr__username hdr__hide-sm">{userProfile.name}</span>
      </button>
    </div>
  );
};

/* ---------- Styles ---------- */

const HEADER_CSS = `
/* Header : styles du composant. Les couleurs sont regroupées ici, en variables. */
.hdr {
  --hdr-ink: #111c2d;
  --hdr-muted: #574145;
  --hdr-primary: #cd3e6e;
  --hdr-primary-dark: #ac2356;
  --hdr-surface: #f0f3ff;
  --hdr-line: #e7eeff;
  --hdr-line-strong: #dee8ff;
  --hdr-teal: #006a61;
  --hdr-teal-bg: #e6fffa;
  --hdr-pink-bg: #ffd9e0;
  --hdr-pink-bg-hover: #ffb1c2;
  --hdr-pink-ink: #8f0341;
  --hdr-danger: #dc2626;
  --hdr-danger-ink: #991b1b;
  --hdr-danger-bg: #fee2e2;
  --hdr-danger-bg-hover: #fecaca;
  --hdr-danger-line: #fca5a5;
  --hdr-ok-bg: #f0fdf4;
  --hdr-ok-line: #dcfce7;
  --hdr-ok-ink: #166534;
  --hdr-refresh-ink: #065f46;
  --hdr-refresh-line: #6ee7b7;
  --hdr-refresh-hover: #d1fae5;

  position: sticky;
  top: 0;
  z-index: 40;
  background: rgb(255 255 255 / 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--hdr-line);
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
}

.hdr button { font: inherit; cursor: pointer; }
.hdr button:focus-visible { outline: 2px solid var(--hdr-primary); outline-offset: 2px; }
.hdr svg { flex-shrink: 0; }

/* --- Bandeau « Actualiser » --- */
.hdr__refresh-bar {
  display: flex;
  align-items: center;
  max-width: 80rem;
  margin: 0 auto;
  padding: 0.25rem 1rem;
  background: var(--hdr-ok-bg);
  border-bottom: 1px solid var(--hdr-ok-line);
  color: var(--hdr-ok-ink);
}
.hdr__refresh {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.125rem 0.625rem;
  background: #fff;
  color: var(--hdr-refresh-ink);
  border: 1px solid var(--hdr-refresh-line);
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 700;
  transition: background 0.2s;
}
.hdr__refresh:hover { background: var(--hdr-refresh-hover); }
.hdr__refresh svg { width: 0.875rem; height: 0.875rem; }

/* --- Zone principale --- */
.hdr__main { max-width: 80rem; margin: 0 auto; padding: 0 1rem; }
.hdr__row { display: flex; align-items: center; justify-content: space-between; gap: 1rem; height: 4.5rem; }

/* --- Marque --- */
.hdr__brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0;
  background: none;
  border: 0;
  text-align: left;
}
.hdr__logo {
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  color: #fff;
  background: linear-gradient(to top right, var(--hdr-primary-dark), var(--hdr-primary));
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgb(172 35 86 / 0.2);
  transition: transform 0.2s;
}
.hdr__brand:hover .hdr__logo { transform: scale(1.05); }
.hdr__logo svg { width: 1.25rem; height: 1.25rem; fill: rgb(255 255 255 / 0.8); }
.hdr__name {
  display: flex;
  align-items: center;
  color: var(--hdr-ink);
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.025em;
}
.hdr__name-icon { width: 0.95em; height: 0.95em; margin: 0 0.5px; color: var(--hdr-primary-dark); }
.hdr__country {
  margin-left: 0.375rem;
  padding: 0.125rem 0.375rem;
  color: var(--hdr-teal);
  background: var(--hdr-teal-bg);
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0;
}
.hdr__tagline { display: none; color: var(--hdr-muted); font-size: 0.875rem; font-weight: 500; }

/* --- Navigation --- */
.hdr__nav { align-items: center; gap: 0.25rem; }
.hdr__nav--desktop { display: none; }
.hdr__nav--mobile { display: flex; overflow-x: auto; padding: 0.25rem 0 0.5rem; scrollbar-width: none; }
.hdr__nav--mobile::-webkit-scrollbar { display: none; }

.hdr__tab {
  border: 0;
  border-radius: 999px;
  font-weight: 600;
  white-space: nowrap;
  transition: background 0.2s, color 0.2s;
}
.hdr__tab--desktop { padding: 0.5rem 1rem; background: transparent; color: var(--hdr-muted); font-size: 0.95rem; }
.hdr__tab--desktop:hover { background: var(--hdr-surface); color: var(--hdr-ink); }
.hdr__tab--mobile { padding: 0.375rem 0.75rem; background: var(--hdr-surface); color: var(--hdr-muted); font-size: 0.875rem; }
.hdr__tab.is-active { background: var(--hdr-primary); color: #fff; }
.hdr__tab--desktop.is-active { box-shadow: 0 1px 2px rgb(0 0 0 / 0.1); }

/* --- Espace utilisateur --- */
.hdr__user { display: flex; align-items: center; gap: 0.375rem; }
.hdr__pill {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.875rem;
  border: 1px solid transparent;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 700;
  transition: background 0.2s, color 0.2s;
}
.hdr__pill svg { width: 0.875rem; height: 0.875rem; }
.hdr__pill--private { background: var(--hdr-pink-bg); color: var(--hdr-pink-ink); }
.hdr__pill--private:hover { background: var(--hdr-pink-bg-hover); }
.hdr__pill--locked {
  background: var(--hdr-danger-bg);
  color: var(--hdr-danger-ink);
  border-color: var(--hdr-danger-line);
  animation: hdr-pulse 2s ease-in-out infinite;
}
.hdr__pill--locked:hover { background: var(--hdr-danger-bg-hover); }
.hdr__pill--locked svg { color: var(--hdr-danger); }
.hdr__pill--discreet { background: var(--hdr-surface); color: var(--hdr-primary-dark); border-color: var(--hdr-line-strong); }
.hdr__pill--discreet:hover { background: var(--hdr-danger-bg); color: var(--hdr-danger-ink); }

.hdr__profile {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  background: var(--hdr-surface);
  color: var(--hdr-ink);
  border: 1px solid var(--hdr-line-strong);
  border-radius: 999px;
  transition: background 0.2s;
}
.hdr__profile:hover { background: var(--hdr-pink-bg); }
.hdr__avatar {
  display: grid;
  place-items: center;
  width: 1.5rem;
  height: 1.5rem;
  background: var(--hdr-primary-dark);
  color: #fff;
  border-radius: 50%;
  font-size: 0.875rem;
  font-weight: 700;
}
.hdr__username { max-width: 90px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.875rem; font-weight: 700; }

.hdr__hide-sm { display: none; }

@keyframes hdr-pulse { 50% { opacity: 0.5; } }
@media (prefers-reduced-motion: reduce) { .hdr__pill--locked { animation: none; } }

/* --- ≥ 640px --- */
@media (min-width: 640px) {
  .hdr__refresh-bar, .hdr__main { padding-inline: 1.5rem; }
  .hdr__tagline { display: block; }
  .hdr__hide-sm { display: inline; }
}
/* --- ≥ 768px --- */
@media (min-width: 768px) {
  .hdr__nav--desktop { display: flex; }
  .hdr__nav--mobile { display: none; }
}
/* --- ≥ 1024px --- */
@media (min-width: 1024px) {
  .hdr__refresh-bar, .hdr__main { padding-inline: 2rem; }
}
`;

/* ---------- Composant principal ---------- */

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  userProfile,
  onOpenAuthModal,
  onOpenProfileModal,
  onLockNow,
}) => (
  <header className="hdr">
    <style>{HEADER_CSS}</style>
    <RefreshBar />

    <div className="hdr__main">
      <div className="hdr__row">
        <Brand onClick={() => onSelectTab('accueil')} />

        <nav className="hdr__nav hdr__nav--desktop" aria-label="Navigation principale">
          <NavItems currentTab={currentTab} onSelectTab={onSelectTab} variant="desktop" />
        </nav>

        <UserArea
          userProfile={userProfile}
          onOpenAuthModal={onOpenAuthModal}
          onOpenProfileModal={onOpenProfileModal}
          onLockNow={onLockNow}
        />
      </div>

      <nav className="hdr__nav hdr__nav--mobile" aria-label="Navigation mobile">
        <NavItems currentTab={currentTab} onSelectTab={onSelectTab} variant="mobile" />
      </nav>
    </div>
  </header>
);