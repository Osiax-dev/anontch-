import React, { useState } from 'react';
import {
  X,
  User,
  ShieldCheck,
  Lock,
  Unlock,
  LogOut,
  CheckCircle,
  Calendar,
  Eye,
  EyeOff,
  Trash2,
  KeyRound,
  ShieldAlert,
  AlertTriangle
} from 'lucide-react';
import { UserProfile } from '../types';
import { AnOnTcheText } from './BreastOIcon';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile | null;
  logsCount: number;
  onLogout: () => void;
  onLockNow: () => void;
  onToggleDiscreetMode: () => void;
  onResetAllData: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  logsCount,
  onLogout,
  onLockNow,
  onToggleDiscreetMode,
  onResetAllData,
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  if (!isOpen || !profile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[92vh] overflow-y-auto p-5 sm:p-7 shadow-2xl border border-[#dee8ff] space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#ac2356] to-[#cd3e6e] text-white flex items-center justify-center font-extrabold text-xl shadow-md">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-lg font-extrabold text-[#111c2d]">
                  {profile.name}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0]">
                  Privé
                </span>
              </div>
              <span className="text-xs text-[#006a61] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Espace Intime Protégé (PIN)</span>
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f0f3ff] text-[#574145] hover:text-[#111c2d] flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Info stats */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-[#f0f3ff] border border-[#dee8ff] space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#574145] block">
              Tranche d'âge
            </span>
            <span className="font-extrabold text-[#111c2d]">{profile.ageRange || '25-39 ans'}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#f0f3ff] border border-[#dee8ff] space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#574145] block">
              Examens notés
            </span>
            <span className="font-extrabold text-[#ac2356]">{logsCount} enregistrement(s)</span>
          </div>
        </div>

        {/* Discreet Mode Camouflage Switch */}
        <div className="p-4 rounded-2xl bg-[#f8fafc] border border-[#dee8ff] flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#111c2d]">
              {profile.discreetMode ? <EyeOff className="w-4 h-4 text-[#ac2356]" /> : <Eye className="w-4 h-4 text-[#574145]" />}
              <span>Mode Discrétion / Camouflage</span>
            </div>
            <p className="text-[11px] text-[#574145] leading-tight">
              Remplace les intitulés intimes par des termes neutres à l'écran.
            </p>
          </div>
          <button
            type="button"
            onClick={onToggleDiscreetMode}
            className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
              profile.discreetMode ? 'bg-[#ac2356]' : 'bg-[#cbd5e1]'
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                profile.discreetMode ? 'right-0.5' : 'left-0.5'
              }`}
            />
          </button>
        </div>

        {/* Confidentiality Notice */}
        <div className="p-4 rounded-2xl bg-[#f0fdf4] border border-[#bbf7d0] text-xs text-[#166534] space-y-1.5 leading-relaxed">
          <div className="flex items-center gap-2 font-bold">
            <Lock className="w-4 h-4 text-[#16a34a]" />
            <span>Sécurité 100% Locale & Hors-Ligne</span>
          </div>
          <p className="text-[11px]">
            Vos dates de règles et observations mammaires sont confinées dans ce navigateur. Aucun serveur ou tiers n'y a accès. Si vous prêtez votre téléphone, utilisez le bouton ci-dessous pour verrouiller l'écran.
          </p>
        </div>

        {/* Quick Lock & Lockout */}
        <div className="space-y-2 pt-2 border-t border-[#dee8ff]">
          <button
            onClick={() => {
              onLockNow();
              onClose();
            }}
            className="w-full py-3.5 px-4 rounded-full bg-[#111c2d] hover:bg-[#1f2937] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <Lock className="w-4 h-4 text-[#86f2e4]" />
            <span>Verrouillage Express (Masquer immédiatement)</span>
          </button>

          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="w-full py-2.5 px-4 rounded-full bg-[#f0f3ff] hover:bg-[#dee8ff] text-[#574145] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnexion complète du profil</span>
          </button>
        </div>

        {/* Privacy Right to be Forgotten / Reset */}
        <div className="pt-2 border-t border-[#fee2e2]">
          {!showConfirmReset ? (
            <button
              onClick={() => setShowConfirmReset(true)}
              className="w-full text-center text-xs text-[#ba1a1a] hover:underline font-semibold cursor-pointer py-1"
            >
              Effacer définitivement toutes mes données privées de cet appareil
            </button>
          ) : (
            <div className="p-3 rounded-2xl bg-[#fee2e2] border border-[#fca5a5] space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 text-xs font-bold text-[#991b1b]">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Supprimer le profil et l'historique ?</span>
              </div>
              <p className="text-[11px] text-[#7f1d1d] leading-tight">
                Cette action supprimera instantanément votre code PIN, votre calendrier et vos observations.
              </p>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowConfirmReset(false)}
                  className="flex-1 py-1.5 rounded-lg bg-white text-xs font-bold text-[#574145] border border-[#fca5a5] cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onResetAllData();
                    setShowConfirmReset(false);
                    onClose();
                  }}
                  className="flex-1 py-1.5 rounded-lg bg-[#b91c1c] text-xs font-bold text-white cursor-pointer"
                >
                  Confirmer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
