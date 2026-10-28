import React, { useState } from 'react';
import { Smartphone, WifiOff, ShieldCheck, Zap, Download, Check } from 'lucide-react';

export const PwaOfflineSection: React.FC = () => {
  const [installed, setInstalled] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleInstallClick = () => {
    // If browser supports beforeinstallprompt it will trigger, otherwise show friendly guidance
    if ('standalone' in window.navigator || window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true);
    } else {
      setShowInstructions(true);
    }
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-br from-[#f0f3ff] via-[#f9f9ff] to-[#f0fdf4] rounded-3xl p-6 sm:p-10 border border-[#dee8ff] shadow-sm space-y-8">
        {/* Header row with title and action button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#006a61] uppercase tracking-wider">
              <Smartphone className="w-3.5 h-3.5" />
              <span>TECHNOLOGIE PWA BÉNIN • ACCÈS SANS CONNEXION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111c2d]">
              Installation PWA & Mode Déconnecté
            </h2>
            <p className="text-xs sm:text-sm text-[#574145] leading-relaxed">
              Conçue spécialement pour toutes les zones du Bénin, cette application web progressive fonctionne sans réseau internet
              dès la première visite. Installez-la directement comme une application native sans passer par un store.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={handleInstallClick}
              className="px-6 py-3.5 rounded-full bg-[#006a61] hover:bg-[#005049] text-white font-bold text-sm flex items-center gap-2.5 shadow-md shadow-[#006a61]/20 transition-all cursor-pointer"
            >
              {installed ? (
                <>
                  <Check className="w-4 h-4 text-[#86f2e4]" />
                  <span>Installé sur l'appareil</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Ajouter à l'écran d'accueil</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Modal instructions if needed */}
        {showInstructions && (
          <div className="p-4 rounded-2xl bg-white border border-[#006a61]/20 text-xs text-[#111c2d] space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-[#006a61]">Comment installer sur votre téléphone :</span>
              <button
                onClick={() => setShowInstructions(false)}
                className="text-[#574145] hover:text-black font-bold"
              >
                ✕
              </button>
            </div>
            <p>
              • <strong>Sur Android (Chrome) :</strong> Cliquez sur les 3 petits points verticaux en haut à droite du navigateur, puis sélectionnez <em>« Installer l'application »</em> ou <em>« Ajouter à l'écran d'accueil »</em>.
            </p>
            <p>
              • <strong>Sur iPhone (Safari) :</strong> Appuyez sur le bouton Partager (icône avec une flèche vers le haut), puis faites défiler et sélectionnez <em>« Sur l'écran d'accueil »</em>.
            </p>
          </div>
        )}

        {/* 3 Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-5 border border-[#e7eeff] shadow-sm space-y-2.5 hover:border-[#006a61]/30 transition-all">
            <div className="w-9 h-9 rounded-xl bg-[#ccfbf1] text-[#006a61] flex items-center justify-center">
              <WifiOff className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-extrabold text-[#111c2d]">
              100% Fonctionnelle Hors-Ligne
            </h4>
            <p className="text-xs text-[#574145] leading-relaxed">
              Tous les guides, calculateurs et fiches d'hôpitaux restent immédiatement consultables, même en zone rurale ou coupure réseau.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-5 border border-[#e7eeff] shadow-sm space-y-2.5 hover:border-[#ac2356]/30 transition-all">
            <div className="w-9 h-9 rounded-xl bg-[#ffd9e0] text-[#ac2356] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-extrabold text-[#111c2d]">
              Confidentialité Absolue
            </h4>
            <p className="text-xs text-[#574145] leading-relaxed">
              Aucun suivi publicitaire, zéro compte requis. Les dates de votre cycle menstruel demeurent scellées dans le stockage local de votre téléphone.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-5 border border-[#e7eeff] shadow-sm space-y-2.5 hover:border-[#006a61]/30 transition-all">
            <div className="w-9 h-9 rounded-xl bg-[#ccfbf1] text-[#006a61] flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-extrabold text-[#111c2d]">
              Légère & Instantanée
            </h4>
            <p className="text-xs text-[#574145] leading-relaxed">
              Moins de 2 Mo d'espace mémoire. Se met à jour discrètement en arrière-plan lorsque vous vous reconnectez au réseau.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
