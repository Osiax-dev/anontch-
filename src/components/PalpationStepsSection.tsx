import React from 'react';
import { Clock, CheckCircle2, PlayCircle, Eye, Hand, BedDouble } from 'lucide-react';
import { AudioPlayButton } from './AudioPlayButton';

interface PalpationStepsSectionProps {
  onStartGuidedWalkthrough: () => void;
}

export const PalpationStepsSection: React.FC<PalpationStepsSectionProps> = ({
  onStartGuidedWalkthrough,
}) => {
  return (
    <section id="guide-palpation" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div className="space-y-1">
          <span className="text-xs font-bold text-[#ac2356] uppercase tracking-wider block">
            MÉTHODE CLINIQUE VULGARISÉE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111c2d]">
            L'Auto-Examen en 3 Étapes Simples
          </h2>
          <p className="text-xs sm:text-sm text-[#574145] leading-relaxed max-w-2xl">
            Ces gestes prennent moins de 5 minutes une fois par mois. Faites-les calmement, dans l'intimité de votre chambre ou sous la douche.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <AudioPlayButton
            id="palpation-general-audio"
            textFr="Les trois étapes de l'autopalpation. Cinq minutes par mois suffisent. Étape 1 : Regardez devant le miroir. Étape 2 : Palpez debout ou sous la douche avec trois doigts. Étape 3 : Palpez allongée sur le dos. Écoutez chaque étape ci-dessous."
            textFon="Afɔtɛntin atɔn e a na ɖe do an towe kplɔ́n na e. Cɛju atɔ́ɔ́n kɛɖɛ wɛ ɖo sun ɖokpo mɛ. Afɔtɛntin nukɔntɔn : Kpɔ́n do nukúnkpɔ́nnú mɛ. Afɔtɛntin wegɔ : Kplɔ́n kpo alɔvi atɔn kpo ɖo te. Afɔtɛntin atɔngɔ́ : Kplɔ́n bo mlǐmlí. Mi sè ɖokpo ɖokpo ɖo do."
            variant="compact"
          />
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#dee8ff] text-[#111c2d] text-xs font-bold">
            <Clock className="w-3.5 h-3.5 text-[#ac2356]" />
            <span>Durée : 4 à 5 minutes</span>
          </div>
          <button
            onClick={onStartGuidedWalkthrough}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ac2356] hover:bg-[#8f0341] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
          >
            <PlayCircle className="w-4 h-4" />
            <span>Guidage chronométré</span>
          </button>
        </div>
      </div>

      {/* 3 Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {/* Step 1 */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#e7eeff] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="space-y-4">
            {/* Top row with step circle and type */}
            <div className="flex items-center justify-between">
              <span className="w-9 h-9 rounded-2xl bg-[#86f2e4] text-[#006a61] font-black text-base flex items-center justify-center">
                1
              </span>
              <span className="text-[11px] font-extrabold tracking-wider text-[#ac2356] uppercase">
                OBSERVATION VISUELLE
              </span>
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-[#111c2d]">
                Devant votre miroir
              </h3>
              <p className="text-xs text-[#574145] leading-relaxed mt-1">
                Regardez attentivement vos deux seins, d'abord les bras le long du corps, puis les bras levés au-dessus de la tête.
              </p>
            </div>

            {/* Illustration */}
            <div className="rounded-2xl overflow-hidden border border-[#dee8ff] aspect-[4/3] bg-[#f8fafc]">
              <img
                src="/assets/aistudio/Image_3_c15e228c.jpeg"
                alt="Étape 1 : Observation visuelle devant un miroir"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Checklist Box */}
          <div className="mt-5 p-4 rounded-2xl bg-[#f0f3ff] border border-[#dee8ff] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#006a61] block">
                Ce qu'il faut scruter :
              </span>
              <AudioPlayButton
                id="step-1-audio"
                textFr="Première étape : devant votre miroir. Regardez bien vos deux seins, torse nu. D'abord les bras le long du corps, puis les deux bras levés vers le ciel. Vérifiez que la peau est lisse, sans trou, sans pli bizarre, et que les mamelons ne rentrent pas vers l'intérieur."
                textFon="Afɔtɛntin nukɔntɔn ɔ : ɖo nukúnkpɔ́nnú towe nukɔn. Kpɔ́n an towe we lɛ ganji. Sɔ alɔ towe do agbaza towe ji, enɛ gudo ɔ sɔ alɔ we lɛ do jǐ. Kpɔ́n ɖɔ agbaza ɔ ɖo tɛnmɛ ǎ ji, mɔ̌ jɛjí ɖɔ an-nukún lɛ ma hɔn do xomɛ o."
                variant="compact"
              />
            </div>
            <ul className="text-xs text-[#574145] space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-[#006a61] font-bold">•</span>
                <span>Symétrie et contour régulier</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#006a61] font-bold">•</span>
                <span>Absence de plissement ou capiton</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#006a61] font-bold">•</span>
                <span>Mamelon non rentré ni dévié</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#e7eeff] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="space-y-4">
            {/* Top row with step circle and type */}
            <div className="flex items-center justify-between">
              <span className="w-9 h-9 rounded-2xl bg-[#86f2e4] text-[#006a61] font-black text-base flex items-center justify-center">
                2
              </span>
              <span className="text-[11px] font-extrabold tracking-wider text-[#ac2356] uppercase">
                PALPATION DEBOUT
              </span>
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-[#111c2d]">
                Sous la douche ou debout
              </h3>
              <p className="text-xs text-[#574145] leading-relaxed mt-1">
                Levez le bras gauche. Avec la main droite, massez fermement le sein gauche en petits cercles concentriques.
              </p>
            </div>

            {/* Illustration */}
            <div className="rounded-2xl overflow-hidden border border-[#dee8ff] aspect-[4/3] bg-[#f8fafc]">
              <img
                src="/assets/aistudio/Image_5_e64b267a.jpeg"
                alt="Étape 2 : Palpation sous la douche ou debout"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Checklist Box */}
          <div className="mt-5 p-4 rounded-2xl bg-[#f0f3ff] border border-[#dee8ff] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#006a61] block">
                Mouvements clés :
              </span>
              <AudioPlayButton
                id="step-2-audio"
                textFr="Deuxième étape : sous la douche ou debout. Levez un bras derrière la tête. Avec l'autre main, utilisez la pulpe douce des trois doigts du milieu pour faire de petits cercles réguliers sur tout le sein, en partant de l'extérieur vers le mamelon. Palpez aussi sous l'aisselle. Pincez doucement le mamelon pour vérifier qu'aucun liquide ne sort."
                textFon="Afɔtɛntin wegɔ ɔ : ɖo zungbo mɛ alo zinzɔn te. Sɔ alɔ ɖokpo do ta towe gudo. Sɔ alɔ wegɔ ɔ sín alɔvi atɔn do kplɔ́n an towe kpo lili kpɛɖé kpɛɖé kpo, káká yi an-nukún ɔ kɔn. Ma wɔn axɔmɛ lɔ o. Fin an-nukún kpɛɖé bo kpɔ́n ɖɔ sìn ma nɔ tɔ́n a."
                variant="compact"
              />
            </div>
            <ul className="text-xs text-[#574145] space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-[#006a61] font-bold">•</span>
                <span>De l'extérieur vers le mamelon</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#006a61] font-bold">•</span>
                <span>Sans oublier la zone sous le bras (aisselle)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#006a61] font-bold">•</span>
                <span>Pincer très doucement le mamelon (écoulement)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#e7eeff] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="space-y-4">
            {/* Top row with step circle and type */}
            <div className="flex items-center justify-between">
              <span className="w-9 h-9 rounded-2xl bg-[#86f2e4] text-[#006a61] font-black text-base flex items-center justify-center">
                3
              </span>
              <span className="text-[11px] font-extrabold tracking-wider text-[#ac2356] uppercase">
                PALPATION ALLONGÉE
              </span>
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-[#111c2d]">
                Allongée sur le dos
              </h3>
              <p className="text-xs text-[#574145] leading-relaxed mt-1">
                Glissez un oreiller fin sous l'épaule du côté à examiner. Cette posture aplatit la glande et facilite la détection des petites boules.
              </p>
            </div>

            {/* Illustration */}
            <div className="rounded-2xl overflow-hidden border border-[#dee8ff] aspect-[4/3] bg-[#f8fafc]">
              <img
                src="/assets/aistudio/Image_4_f5e840c9.jpeg"
                alt="Étape 3 : Examen allongé sur le dos avec la pulpe des doigts"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Checklist Box */}
          <div className="mt-5 p-4 rounded-2xl bg-[#f0f3ff] border border-[#dee8ff] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#006a61] block">
                Conseils pratiques :
              </span>
              <AudioPlayButton
                id="step-3-audio"
                textFr="Troisième étape : allongée sur le lit ou la natte. Mettez un petit coussin sous votre épaule. Cette position étale bien le sein et permet de sentir les petites boules cachées en profondeur. Palpez avec douceur, puis appuyez un peu plus fermement. Faites la même chose pour le deuxième sein."
                textFon="Afɔtɛntin atɔngɔ́ ɔ : mlǐmlí ɖo zan ji alo kplɔ́ ji. Sɔ takpɔ́n kpɛví ɖé do abɔ towe glɔ́. Enɛ nɔ bló bɔ an ɔ nɔ jɛ tɛnmɛ ganji bɔ a na mɔ nǔ kpɛví kpɛví e hwla lɛ bǐ. Kplɔ́n kpo yɛhwɛ kpo enɛ gudo kpo hlɔnhlɔn kpo. Bló mɔ̌ nú an wegɔ́ ɔ lɔmɔ̌."
                variant="compact"
              />
            </div>
            <ul className="text-xs text-[#574145] space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-[#006a61] font-bold">•</span>
                <span>Palper avec la pulpe à plat, pas les ongles</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#006a61] font-bold">•</span>
                <span>Répéter le même geste pour l'autre sein</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#006a61] font-bold">•</span>
                <span>Noter vos impressions dans l'historique</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
