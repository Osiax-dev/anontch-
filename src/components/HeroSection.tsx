import React from 'react';
import { Lock, WifiOff, ArrowRight, Sparkles, HandMetal } from 'lucide-react';
import { AnOnTcheText } from './BreastOIcon';
import { AudioPlayButton } from './AudioPlayButton';

interface HeroSectionProps {
  onCalculateClick: () => void;
  onLearnGesturesClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onCalculateClick,
  onLearnGesturesClick,
}) => {
  return (
    <section className="pt-8 pb-12 sm:pt-12 sm:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Heading, intro, pills, and buttons */}
        <div className="lg:col-span-7 space-y-6">
          {/* Initiative Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffd9e0] text-[#8f0341] text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 fill-[#8f0341]" />
            <span className="inline-flex items-center gap-1">
              INITIATIVE <AnOnTcheText iconClassName="w-[1em] h-[1em] mx-[0.5px] text-[#8f0341]" /> • SANTÉ FÉMININE BÉNIN
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111c2d] tracking-tight leading-tight">
            Votre santé intime, <br className="hidden sm:inline" />
            <span className="text-[#ac2356] font-extrabold">en toute sérénité</span> au Bénin.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#574145] leading-relaxed max-w-xl">
            Un espace bienveillant conçu pour chaque femme et jeune fille, accessible à travers les 12 départements du Bénin,
            de Malanville à Grand-Popo. Apprenez les gestes qui sauvent, suivez votre cycle et trouvez un centre agréé en quelques secondes.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-[#dee8ff] text-xs font-semibold text-[#111c2d] shadow-sm">
              <Lock className="w-4 h-4 text-[#006a61]" />
              <span>100% Anonyme & Stocké sur votre téléphone</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-[#dee8ff] text-xs font-semibold text-[#111c2d] shadow-sm">
              <WifiOff className="w-4 h-4 text-[#ac2356]" />
              <span>Fonctionne sans connexion</span>
            </div>
          </div>

          {/* Action Buttons & Vocal Note */}
          <div className="flex flex-wrap items-center gap-3.5 pt-3">
            <button
              onClick={onCalculateClick}
              className="px-6 py-3.5 rounded-full bg-[#ac2356] hover:bg-[#8f0341] text-white font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-[#ac2356]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Calculer ma fenêtre idéale</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onLearnGesturesClick}
              className="px-6 py-3.5 rounded-full bg-[#86f2e4] hover:bg-[#6bd8cb] text-[#006a61] font-bold text-sm sm:text-base flex items-center gap-2 shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <HandMetal className="w-4 h-4" />
              <span>Apprendre les gestes</span>
            </button>

            {/* Prominent Voice Greeting Button for Non-Readers */}
            <div className="w-full sm:w-auto pt-1 sm:pt-0">
              <AudioPlayButton
                id="hero-welcome"
                textFr="Bienvenue sur AnOnTché Bénin. Cette application est faite pour vous, pour vous aider à protéger vos seins. Que vous sachiez lire ou non, vous pouvez écouter chaque explication en appuyant sur les haut-parleurs. Le dépistage précoce guérit neuf femmes sur dix. Appuyez sur les boutons pour commencer."
                textFon="Kúabɔ wá AnOnTché Bénin ji. Gbɛtɔ lɛ bǐ wɛ e bló nǔ elɔ na. Enyí a ma tlɛ kplɔ́n wema ǎ ɔ, a hɛn ɔ a na sè gbé tɔn ganji kpo jǐja haut-parleur ji kpo. Enyí e kplɔ́n an hwenu e é jɛ azɔn ji tlolo ɔ, nyɔnu tɛnnɛ ɖo wǒ mɛ nɔ jɛ ganjí. Zin bɔtɔn lɛ bo jɛ kplɔnkplɔn ji."
                variant="pill"
                customLabel="Écouter la présentation vocale"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Hero Card with Benin woman photo & statistics */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-xl shadow-[#ac2356]/5 border border-[#e7eeff] overflow-hidden group">
            {/* Woman photo */}
            <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square w-full rounded-2xl overflow-hidden bg-[#dee8ff]">
              <img
                src="/assets/aistudio/Image_6_584e7985.jpeg"
                alt="Femme béninoise souriante avec ruban rose"
                className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>

            {/* Bottom Card Content */}
            <div className="pt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold tracking-wider text-[#574145] uppercase">
                  AUJOURD'HUI AU BÉNIN
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ccfbf1] text-[#006a61] text-xs font-bold">
                  Gratuit & Ouvert
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#111c2d] leading-snug">
                Le dépistage précoce guérit <span className="text-[#ac2356]">9 cas sur 10.</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#574145] leading-relaxed">
                L'autopalpation mensuelle permet de détecter toute anomalie bien avant l'apparition de douleurs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
