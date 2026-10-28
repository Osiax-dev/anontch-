import React, { useState } from 'react';
import {
  X,
  Lock,
  Unlock,
  ShieldCheck,
  KeyRound,
  Sparkles,
  Heart,
  Eye,
  EyeOff,
  HelpCircle,
  AlertCircle,
  Delete,
  ArrowRight,
  ShieldAlert,
  UserCheck
} from 'lucide-react';
import { UserProfile } from '../types';
import { AudioPlayButton } from './AudioPlayButton';
import { AnOnTcheText } from './BreastOIcon';

interface AuthOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticate: (profile: UserProfile) => void;
  existingProfile: UserProfile | null;
}

const PRESET_ALIASES = ['Fleur', 'Étoile', 'Amina', 'Soleil', 'Victoire', 'Reine'];

const DEFAULT_QUESTIONS = [
  'Quel est mon plat béninois préféré ? (ex: Amiwo, Dakouin...)',
  'Le prénom de mon amie ou sœur la plus fidèle',
  'Le village ou la ville de mes racines au Bénin',
  'Le prénom de ma grand-mère bien-aimée',
  'Mon souvenir d’enfance le plus précieux'
];

export const AuthOnboardingModal: React.FC<AuthOnboardingModalProps> = ({
  isOpen,
  onClose,
  onAuthenticate,
  existingProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'register' | 'login' | 'recovery'>('register');
  
  // Registration fields
  const [name, setName] = useState(existingProfile?.name || '');
  const [pin, setPin] = useState('');
  const [pinConfirm, setPinConfirm] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState(DEFAULT_QUESTIONS[0]);
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [ageRange, setAgeRange] = useState('25-39 ans');
  const [showPin, setShowPin] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Recovery fields
  const [recoveryAnswerInput, setRecoveryAnswerInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');

  if (!isOpen) return null;

  // Keypad press handler
  const handleKeypadPress = (digit: string) => {
    setErrorMsg('');
    if (activeTab === 'login') {
      if (pin.length < 4) setPin((prev) => prev + digit);
    } else if (activeTab === 'register') {
      if (pin.length < 4) {
        setPin((prev) => prev + digit);
      } else if (pinConfirm.length < 4) {
        setPinConfirm((prev) => prev + digit);
      }
    }
  };

  const handleKeypadBackspace = () => {
    setErrorMsg('');
    if (activeTab === 'login') {
      setPin((prev) => prev.slice(0, -1));
    } else if (activeTab === 'register') {
      if (pinConfirm.length > 0) {
        setPinConfirm((prev) => prev.slice(0, -1));
      } else {
        setPin((prev) => prev.slice(0, -1));
      }
    }
  };

  const handleClearPin = () => {
    setPin('');
    setPinConfirm('');
    setErrorMsg('');
  };

  // Submit Registration or Login
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (activeTab === 'login') {
      if (pin.length !== 4) {
        setErrorMsg('Veuillez composer vos 4 chiffres secrets.');
        return;
      }
      if (existingProfile && existingProfile.pin && existingProfile.pin !== pin) {
        setErrorMsg('Code secret incorrect. Utilisez la question secrète si vous l’avez oublié.');
        return;
      }

      onAuthenticate({
        id: existingProfile?.id || Date.now().toString(),
        name: existingProfile?.name || 'Chère Utilisatrice',
        pin: existingProfile?.pin || pin,
        securityQuestion: existingProfile?.securityQuestion,
        securityAnswer: existingProfile?.securityAnswer,
        phoneOrEmail: existingProfile?.phoneOrEmail || '',
        ageRange: existingProfile?.ageRange || '25-39 ans',
        isAuthenticated: true,
        isLocked: false,
        discreetMode: existingProfile?.discreetMode || false,
        registeredAt: existingProfile?.registeredAt || new Date().toISOString(),
      });
      onClose();
      return;
    }

    if (activeTab === 'recovery') {
      if (!existingProfile?.securityAnswer) {
        setErrorMsg('Aucune question secrète enregistrée sur cet appareil.');
        return;
      }
      if (
        recoveryAnswerInput.trim().toLowerCase() !==
        existingProfile.securityAnswer.trim().toLowerCase()
      ) {
        setErrorMsg('La réponse secrète ne correspond pas. Essayez encore.');
        return;
      }
      if (newPinInput.length !== 4) {
        setErrorMsg('Le nouveau code doit comporter exactement 4 chiffres.');
        return;
      }

      const updatedProfile: UserProfile = {
        ...existingProfile,
        pin: newPinInput,
        isAuthenticated: true,
        isLocked: false,
      };

      onAuthenticate(updatedProfile);
      setSuccessMsg('Code PIN réinitialisé avec succès !');
      setTimeout(() => onClose(), 800);
      return;
    }

    // Tab 'register'
    if (!name.trim()) {
      setErrorMsg('Veuillez choisir un prénom ou pseudonyme discret.');
      return;
    }
    if (pin.length !== 4) {
      setErrorMsg('Veuillez composer les 4 chiffres de votre code secret.');
      return;
    }
    if (pinConfirm.length !== 4) {
      setErrorMsg('Veuillez confirmer vos 4 chiffres secrets.');
      return;
    }
    if (pin !== pinConfirm) {
      setErrorMsg('Les deux codes PIN ne sont pas identiques. Veuillez recommencer.');
      return;
    }
    if (!securityAnswer.trim()) {
      setErrorMsg('Veuillez répondre à la question secrète pour pouvoir récupérer votre accès en toute intimité.');
      return;
    }

    const newProfile: UserProfile = {
      id: Date.now().toString(),
      name: name.trim(),
      pin,
      securityQuestion,
      securityAnswer: securityAnswer.trim().toLowerCase(),
      ageRange,
      isAuthenticated: true,
      isLocked: false,
      discreetMode: false,
      registeredAt: new Date().toISOString(),
    };

    onAuthenticate(newProfile);
    onClose();
  };

  const handleContinueAsGuest = () => {
    localStorage.setItem('anontche_guest_dismissed', 'true');
    onClose();
  };

  const vocalExplanation =
    "Pour garantir votre intimité absolue sur ce téléphone, l'application AnOnTché ne transmet aucune de vos données sur Internet. Tout reste strictement sur votre appareil, protégé par un code secret à quatre chiffres de votre choix. Vous pouvez utiliser un pseudonyme sans donner votre nom ni votre numéro de téléphone. Personne d'autre ne pourra voir vos dates de règles ni vos notes de santé.";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[92vh] overflow-y-auto p-5 sm:p-7 shadow-2xl border border-[#dee8ff] space-y-4">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f0fdf4] text-[#166534] text-[10px] font-extrabold uppercase tracking-wider border border-[#bbf7d0]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#16a34a]" />
              <span>Intimité Totale & Données 100% Locales</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#111c2d] flex items-center gap-1 pt-1">
              <span>Espace Privé</span>
              <span className="inline-flex items-center"><AnOnTcheText iconClassName="w-[0.9em] h-[0.9em] text-[#ac2356]" /></span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f0f3ff] text-[#574145] hover:text-[#111c2d] flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Audio explainer note for non-readers */}
        <div className="p-3 rounded-2xl bg-[#f0fdf4] border border-[#bbf7d0] flex items-center justify-between gap-3 shadow-xs">
          <div className="text-[11px] text-[#166534] font-medium leading-tight">
            <span className="font-bold block">Sécurité & Discrétion :</span>
            Écoutez comment votre intimité est protégée à 100%.
          </div>
          <AudioPlayButton
            id="auth-privacy-voice"
            textFr={vocalExplanation}
            variant="compact"
            customLabel="Écouter l'explication"
          />
        </div>

        {/* Guarantee Banner */}
        <div className="p-2.5 rounded-xl bg-[#fef2f2] border border-[#fee2e2] flex items-start gap-2 text-[11px] text-[#991b1b] leading-tight">
          <Lock className="w-4 h-4 text-[#dc2626] shrink-0 mt-0.5" />
          <p>
            <strong>Zéro fuite, zéro publicité :</strong> Vos observations de palpation et dates intimes restent verrouillées sur ce smartphone uniquement.
          </p>
        </div>

        {/* Tabs switcher */}
        <div className="flex rounded-xl bg-[#f0f3ff] p-1 border border-[#dee8ff]">
          <button
            type="button"
            onClick={() => {
              setActiveTab('register');
              setErrorMsg('');
              handleClearPin();
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'register' ? 'bg-white text-[#ac2356] shadow-sm' : 'text-[#574145]'
            }`}
          >
            Nouveau profil discret
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
              setErrorMsg('');
              handleClearPin();
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'login' ? 'bg-white text-[#ac2356] shadow-sm' : 'text-[#574145]'
            }`}
          >
            Déverrouiller
          </button>
          {existingProfile?.securityQuestion && (
            <button
              type="button"
              onClick={() => {
                setActiveTab('recovery');
                setErrorMsg('');
                handleClearPin();
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'recovery' ? 'bg-white text-[#ac2356] shadow-sm' : 'text-[#574145]'
              }`}
            >
              PIN oublié ?
            </button>
          )}
        </div>

        {/* Messages */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-[#ffdad6] text-[#ba1a1a] text-xs font-semibold flex items-center gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="p-3 rounded-xl bg-[#dcfce7] text-[#166534] text-xs font-semibold flex items-center gap-2 animate-fade-in">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* TAB 1: NOUVEAU PROFIL */}
        {activeTab === 'register' && (
          <div className="space-y-4">
            {/* Alias / Name with suggestions */}
            <div>
              <label className="block text-xs font-bold text-[#111c2d] mb-1">
                Pseudonyme ou Prénom secret (pas besoin de votre vrai nom) *
              </label>
              <input
                type="text"
                placeholder="Ex: Amina, Fleur, Sœur courage..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl bg-[#f8fafc] border border-[#cbd5e1] text-xs text-[#111c2d] focus:outline-none focus:border-[#ac2356]"
              />
              <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                <span className="text-[10px] text-[#574145] font-semibold">Idées discrètes :</span>
                {PRESET_ALIASES.map((alias) => (
                  <button
                    key={alias}
                    type="button"
                    onClick={() => setName(alias)}
                    className="px-2 py-0.5 rounded-md bg-[#f0f3ff] hover:bg-[#dee8ff] text-[10px] font-bold text-[#ac2356] transition-colors cursor-pointer"
                  >
                    {alias}
                  </button>
                ))}
              </div>
            </div>

            {/* Age Range */}
            <div>
              <label className="block text-xs font-bold text-[#111c2d] mb-1">
                Tranche d'âge (pour adapter les alertes de santé)
              </label>
              <select
                value={ageRange}
                onChange={(e) => setAgeRange(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-[#f8fafc] border border-[#cbd5e1] text-xs text-[#111c2d] focus:outline-none focus:border-[#ac2356]"
              >
                <option value="18-24 ans">18 à 24 ans (Sensibilisation & repères)</option>
                <option value="25-39 ans">25 à 39 ans (Autopalpation mensuelle active)</option>
                <option value="40-49 ans">40 à 49 ans (Dépistage clinique annuel recommandé)</option>
                <option value="50 ans et plus">50 ans et plus (Mammographie de contrôle recommandée)</option>
              </select>
            </div>

            {/* Visual PIN Setup Display */}
            <div className="bg-[#f8fafc] p-3.5 rounded-2xl border border-[#dee8ff] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#111c2d]">
                  1. Code secret (4 chiffres)
                </span>
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="text-[11px] text-[#ac2356] font-bold flex items-center gap-1 cursor-pointer"
                >
                  {showPin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showPin ? 'Masquer' : 'Afficher'}</span>
                </button>
              </div>

              {/* Step 1 dots */}
              <div className="flex items-center justify-center gap-3 py-1">
                {[0, 1, 2, 3].map((idx) => {
                  const filled = pin.length > idx;
                  return (
                    <div
                      key={idx}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg transition-all ${
                        filled
                          ? 'bg-[#ac2356] text-white shadow-sm ring-2 ring-[#ffd9e0]'
                          : 'bg-white border-2 border-dashed border-[#cbd5e1] text-[#94a3b8]'
                      }`}
                    >
                      {filled ? (showPin ? pin[idx] : '•') : ''}
                    </div>
                  );
                })}
              </div>

              {pin.length === 4 && (
                <div className="pt-2 border-t border-[#dee8ff] space-y-2">
                  <span className="text-xs font-extrabold text-[#111c2d] block text-center">
                    2. Confirmez les 4 chiffres :
                  </span>
                  <div className="flex items-center justify-center gap-3">
                    {[0, 1, 2, 3].map((idx) => {
                      const filled = pinConfirm.length > idx;
                      return (
                        <div
                          key={idx}
                          className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg transition-all ${
                            filled
                              ? 'bg-[#006a61] text-white shadow-sm ring-2 ring-[#ccfbf1]'
                              : 'bg-white border-2 border-dashed border-[#cbd5e1] text-[#94a3b8]'
                          }`}
                        >
                          {filled ? (showPin ? pinConfirm[idx] : '•') : ''}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Secret Recovery Question */}
            <div className="p-3.5 rounded-2xl bg-[#f0f3ff] border border-[#dee8ff] space-y-2.5">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#ac2356]" />
                <span className="text-xs font-extrabold text-[#111c2d]">
                  Question secrète (Récupération sans e-mail ni SMS)
                </span>
              </div>
              <p className="text-[11px] text-[#574145] leading-relaxed">
                Si vous oubliez votre PIN, vous pourrez le réinitialiser seule sans laisser de trace.
              </p>
              <select
                value={securityQuestion}
                onChange={(e) => setSecurityQuestion(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-white border border-[#cbd5e1] text-xs text-[#111c2d] focus:outline-none focus:border-[#ac2356]"
              >
                {DEFAULT_QUESTIONS.map((q, i) => (
                  <option key={i} value={q}>
                    {q}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Votre réponse secrète (ex: Amiwo au poulet)..."
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl bg-white border border-[#cbd5e1] text-xs text-[#111c2d] focus:outline-none focus:border-[#ac2356]"
              />
            </div>

            {/* Virtual Touch Keypad for Anti-Spy entry */}
            <div className="pt-1">
              <span className="text-[11px] font-bold text-[#574145] block text-center mb-2">
                Tapez les 4 chiffres sur le pavé sécurisé :
              </span>
              <div className="grid grid-cols-3 gap-2 max-w-[280px] mx-auto">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                  <button
                    key={digit}
                    type="button"
                    onClick={() => handleKeypadPress(digit)}
                    className="h-12 rounded-2xl bg-white hover:bg-[#ffd9e0] active:scale-95 border border-[#dee8ff] text-[#111c2d] text-base font-extrabold transition-all cursor-pointer shadow-xs"
                  >
                    {digit}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handleClearPin}
                  className="h-12 rounded-2xl bg-[#fee2e2] text-[#991b1b] text-xs font-bold transition-all cursor-pointer"
                >
                  Effacer
                </button>
                <button
                  type="button"
                  onClick={() => handleKeypadPress('0')}
                  className="h-12 rounded-2xl bg-white hover:bg-[#ffd9e0] active:scale-95 border border-[#dee8ff] text-[#111c2d] text-base font-extrabold transition-all cursor-pointer shadow-xs"
                >
                  0
                </button>
                <button
                  type="button"
                  onClick={handleKeypadBackspace}
                  className="h-12 rounded-2xl bg-[#f0f3ff] text-[#574145] flex items-center justify-center text-xs font-bold transition-all cursor-pointer"
                >
                  <Delete className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Validate Button */}
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="w-full py-3.5 rounded-full bg-[#ac2356] hover:bg-[#8f0341] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-[#ac2356]/20 transition-all cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Créer mon profil intime sécurisé</span>
            </button>
          </div>
        )}

        {/* TAB 2: DÉVERROUILLER (LOGIN) */}
        {activeTab === 'login' && (
          <div className="space-y-5">
            <div className="text-center space-y-1">
              <span className="text-xs text-[#574145]">Profil enregistré :</span>
              <h4 className="text-base font-extrabold text-[#111c2d]">
                {existingProfile?.name || 'Utilisatrice AnOnTché'}
              </h4>
            </div>

            {/* 4 dots display */}
            <div className="flex items-center justify-center gap-4 py-2">
              {[0, 1, 2, 3].map((idx) => {
                const filled = pin.length > idx;
                return (
                  <div
                    key={idx}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl transition-all ${
                      filled
                        ? 'bg-[#ac2356] text-white shadow-md ring-4 ring-[#ffd9e0] scale-105'
                        : 'bg-[#f8fafc] border-2 border-dashed border-[#cbd5e1] text-[#94a3b8]'
                    }`}
                  >
                    {filled ? (showPin ? pin[idx] : '•') : ''}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="text-xs text-[#ac2356] font-bold flex items-center gap-1.5 cursor-pointer py-1 px-3 rounded-full hover:bg-[#ffd9e0]/40 transition-colors"
              >
                {showPin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showPin ? 'Masquer les chiffres' : 'Voir les chiffres'}</span>
              </button>
            </div>

            {/* Virtual Keypad */}
            <div className="grid grid-cols-3 gap-2.5 max-w-[280px] mx-auto">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                <button
                  key={digit}
                  type="button"
                  onClick={() => handleKeypadPress(digit)}
                  className="h-13 rounded-2xl bg-white hover:bg-[#ffd9e0] active:scale-95 border border-[#dee8ff] text-[#111c2d] text-lg font-extrabold transition-all cursor-pointer shadow-xs"
                >
                  {digit}
                </button>
              ))}
              <button
                type="button"
                onClick={handleClearPin}
                className="h-13 rounded-2xl bg-[#fee2e2] text-[#991b1b] text-xs font-bold transition-all cursor-pointer"
              >
                Effacer
              </button>
              <button
                type="button"
                onClick={() => handleKeypadPress('0')}
                className="h-13 rounded-2xl bg-white hover:bg-[#ffd9e0] active:scale-95 border border-[#dee8ff] text-[#111c2d] text-lg font-extrabold transition-all cursor-pointer shadow-xs"
              >
                0
              </button>
              <button
                type="button"
                onClick={handleKeypadBackspace}
                className="h-13 rounded-2xl bg-[#f0f3ff] text-[#574145] flex items-center justify-center text-xs font-bold transition-all cursor-pointer"
              >
                <Delete className="w-5 h-5" />
              </button>
            </div>

            {/* Submit */}
            <button
              type="button"
              disabled={pin.length !== 4}
              onClick={() => handleSubmit()}
              className={`w-full py-3.5 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                pin.length === 4
                  ? 'bg-[#006a61] hover:bg-[#005049] text-white shadow-md'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Unlock className="w-4 h-4" />
              <span>Déverrouiller mon espace</span>
            </button>
          </div>
        )}

        {/* TAB 3: RÉCUPÉRATION DU CODE PAR QUESTION SECRÈTE */}
        {activeTab === 'recovery' && existingProfile && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-[#f0fdf4] border border-[#bbf7d0] space-y-1">
              <span className="text-[11px] font-bold text-[#166534] block">
                Votre question secrète enregistrée :
              </span>
              <p className="text-xs font-extrabold text-[#111c2d]">
                « {existingProfile.securityQuestion || DEFAULT_QUESTIONS[0]} »
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#111c2d] mb-1">
                Entrez votre réponse secrète :
              </label>
              <input
                type="text"
                placeholder="Votre réponse secrète..."
                value={recoveryAnswerInput}
                onChange={(e) => setRecoveryAnswerInput(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl bg-[#f8fafc] border border-[#cbd5e1] text-xs text-[#111c2d] focus:outline-none focus:border-[#ac2356]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#111c2d] mb-1">
                Nouveau code PIN (4 chiffres) :
              </label>
              <input
                type="password"
                maxLength={4}
                inputMode="numeric"
                placeholder="••••"
                value={newPinInput}
                onChange={(e) => setNewPinInput(e.target.value.replace(/\D/g, ''))}
                className="w-full h-11 px-3.5 rounded-xl bg-[#f8fafc] border border-[#cbd5e1] text-center text-lg tracking-widest text-[#111c2d] focus:outline-none focus:border-[#ac2356]"
              />
            </div>

            <button
              type="button"
              onClick={() => handleSubmit()}
              className="w-full py-3.5 rounded-full bg-[#ac2356] hover:bg-[#8f0341] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <KeyRound className="w-4 h-4" />
              <span>Valider le nouveau code secret</span>
            </button>
          </div>
        )}

        {/* Guest Mode fallback */}
        <div className="pt-3 border-t border-[#dee8ff] text-center space-y-2">
          <button
            type="button"
            onClick={handleContinueAsGuest}
            className="text-xs font-bold text-[#574145] hover:text-[#111c2d] hover:underline cursor-pointer"
          >
            Continuer en mode invité anonyme (sans compte)
          </button>
          <p className="text-[10px] text-[#94a3b8]">
            En mode invité, vos données ne seront pas protégées par un code secret en cas de prêt de téléphone.
          </p>
        </div>
      </div>
    </div>
  );
};
