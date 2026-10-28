import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Volume2, VolumeX, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

interface PalpationGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFinish?: () => void;
}

const STEPS = [
  {
    stepNumber: 1,
    title: "Étape 1 : Devant votre miroir (Observation visuelle)",
    category: "OBSERVATION VISUELLE",
    durationSec: 60,
    image: "/assets/aistudio/Image_3_c15e228c.jpeg",
    description: "Tenez-vous debout face à votre miroir, torse nu, dans un endroit bien éclairé.",
    instructions: [
      "1. Placez vos bras le long du corps. Observez la forme, la taille et le galbe de vos deux seins.",
      "2. Levez les deux bras au-dessus de la tête : regardez si les deux seins montent de façon harmonieuse.",
      "3. Posez vos mains sur vos hanches et contractez doucement les pectoraux : vérifiez qu'aucun pli, méplat ou creux n'apparaît sur la peau.",
      "4. Vérifiez que les mamelons ne pointent pas vers l'intérieur (invagination récente)."
    ],
    vocalScript: "Étape 1 : Observez vos seins face au miroir. D'abord les bras le long du corps, puis levés au-dessus de la tête. Regardez la symétrie, la texture de la peau et la direction des mamelons."
  },
  {
    stepNumber: 2,
    title: "Étape 2 : Sous la douche ou debout (Palpation debout)",
    category: "PALPATION DEBOUT",
    durationSec: 120,
    image: "/assets/aistudio/Image_5_e64b267a.jpeg",
    description: "La peau savonnée facilite grandement le glissement des doigts pour détecter toute résistance.",
    instructions: [
      "1. Levez le bras gauche derrière la tête.",
      "2. Avec la pulpe à plat des 3 doigts du milieu de la main droite, massez fermement le sein gauche.",
      "3. Décrivez de petits cercles concentriques de l'extérieur vers le mamelon (quadrant par quadrant).",
      "4. Glissez vos doigts sous l'aisselle gauche : palpez les ganglions axillaires.",
      "5. Pincez délicatement le mamelon entre le pouce et l'index pour vérifier l'absence d'écoulement.",
      "6. Changez de côté : levez le bras droit et répétez l'examen sur le sein droit."
    ],
    vocalScript: "Étape 2 : Palpez debout ou sous la douche. Avec la pulpe de vos trois doigts à plat, faites de petits cercles de l'extérieur vers le mamelon, sans oublier l'aisselle. Répétez pour les deux côtés."
  },
  {
    stepNumber: 3,
    title: "Étape 3 : Allongée sur le dos (Palpation allongée)",
    category: "PALPATION ALLONGÉE",
    durationSec: 120,
    image: "/assets/aistudio/Image_4_f5e840c9.jpeg",
    description: "La position allongée étale naturellement la glande mammaire contre la cage thoracique, idéal pour les petites boules profondes.",
    instructions: [
      "1. Allongez-vous confortablement sur le dos.",
      "2. Glissez un petit coussin ou une serviette pliée sous votre omoplate gauche.",
      "3. Placez votre bras gauche sous votre tête.",
      "4. Utilisez la pulpe des doigts de la main droite en appliquant trois niveaux de pression : légère en surface, moyenne à mi-profondeur, puis ferme près des côtes.",
      "5. Parcourez méthodiquement chaque cadran du sein.",
      "6. Déplacez le coussin sous l'épaule droite et examinez le sein droit avec la main gauche."
    ],
    vocalScript: "Étape 3 : Allongez-vous avec un oreiller sous l'épaule. Appliquez une pression douce, moyenne puis ferme avec la pulpe de vos doigts. Vérifiez chaque zone en profondeur."
  }
];

export const PalpationGuideModal: React.FC<PalpationGuideModalProps> = ({
  isOpen,
  onClose,
  onFinish,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(STEPS[0].durationSec);
  const [isRunning, setIsRunning] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const step = STEPS[currentStepIndex];

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  // Voice Speech Synthesis
  const speakVoice = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      window.speechSynthesis.speak(utterance);
      setIsVoiceActive(true);
      utterance.onend = () => setIsVoiceActive(false);
    }
  };

  const stopVoice = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsVoiceActive(false);
    }
  };

  const handleStepChange = (index: number) => {
    stopVoice();
    setCurrentStepIndex(index);
    setSecondsLeft(STEPS[index].durationSec);
    setIsRunning(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-7 shadow-2xl border border-[#dee8ff] flex flex-col justify-between space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#dee8ff] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-[#86f2e4] text-[#006a61] font-black text-sm flex items-center justify-center">
              {step.stepNumber}
            </span>
            <div>
              <span className="text-[10px] font-extrabold text-[#ac2356] tracking-wider uppercase block">
                {step.category}
              </span>
              <h3 className="text-sm sm:text-base font-extrabold text-[#111c2d]">
                {step.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              stopVoice();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#f0f3ff] text-[#574145] hover:text-[#111c2d] flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Visual & Timer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div className="rounded-2xl overflow-hidden border border-[#dee8ff] aspect-[4/3] bg-slate-100 shadow-inner">
            <img
              src={step.image}
              alt={step.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Timer and Audio controls */}
          <div className="bg-[#f0f3ff] rounded-2xl p-4 border border-[#dee8ff] space-y-3 text-center">
            <span className="text-[11px] font-bold text-[#574145] uppercase tracking-wider block">
              Chronomètre Recommandé
            </span>

            <div className="text-3xl sm:text-4xl font-black text-[#111c2d]">
              {Math.floor(secondsLeft / 60)}:{(secondsLeft % 60).toString().padStart(2, '0')}
            </div>

            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="px-4 py-2 rounded-full bg-[#ac2356] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isRunning ? 'Pause' : 'Démarrer'}</span>
              </button>

              <button
                onClick={() => {
                  setSecondsLeft(step.durationSec);
                  setIsRunning(false);
                }}
                className="w-8 h-8 rounded-full bg-white text-[#574145] border border-[#dee8ff] flex items-center justify-center cursor-pointer hover:bg-slate-50"
                title="Réinitialiser"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => (isVoiceActive ? stopVoice() : speakVoice(step.vocalScript))}
                className={`px-3 py-2 rounded-full text-xs font-bold flex items-center gap-1 border transition-colors cursor-pointer ${
                  isVoiceActive
                    ? 'bg-[#ccfbf1] border-[#006a61] text-[#006a61]'
                    : 'bg-white border-[#dee8ff] text-[#574145]'
                }`}
                title="Lecture vocale des consignes"
              >
                {isVoiceActive ? <VolumeX className="w-3.5 h-3.5 text-[#006a61]" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isVoiceActive ? 'Arrêter la voix' : 'Voix guide'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Step Instructions list */}
        <div className="space-y-2 bg-[#fef7f9] p-4 rounded-2xl border border-[#ffd9e0]/60">
          <span className="text-xs font-bold text-[#ac2356] block">
            Instructions cliniques étape par étape :
          </span>
          <ul className="text-xs text-[#111c2d] space-y-1.5">
            {step.instructions.map((inst, i) => (
              <li key={i} className="leading-relaxed">
                {inst}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Navigation between steps */}
        <div className="flex items-center justify-between pt-2 border-t border-[#dee8ff]">
          <button
            disabled={currentStepIndex === 0}
            onClick={() => handleStepChange(currentStepIndex - 1)}
            className="px-4 py-2 rounded-full border border-[#dee8ff] text-xs font-bold text-[#574145] disabled:opacity-40 flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Étape précédente</span>
          </button>

          <span className="text-xs font-bold text-[#ac2356]">
            {currentStepIndex + 1} / {STEPS.length}
          </span>

          {currentStepIndex < STEPS.length - 1 ? (
            <button
              onClick={() => handleStepChange(currentStepIndex + 1)}
              className="px-4 py-2 rounded-full bg-[#ac2356] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-[#8f0341]"
            >
              <span>Étape suivante</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => {
                stopVoice();
                onClose();
                if (onFinish) onFinish();
              }}
              className="px-4 py-2 rounded-full bg-[#006a61] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-[#005049]"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Terminer le guidage</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
