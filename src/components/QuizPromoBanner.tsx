import React from 'react';
import { Play, Sparkles } from 'lucide-react';
import { AnOnTcheText } from './BreastOIcon';

interface QuizPromoBannerProps {
  onStartQuiz: () => void;
}

export const QuizPromoBanner: React.FC<QuizPromoBannerProps> = ({ onStartQuiz }) => {
  return (
    <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-r from-[#ac2356] via-[#cd3e6e] to-[#b40b56] rounded-3xl p-6 sm:p-10 text-white shadow-xl shadow-[#ac2356]/20 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-[11px] font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DÉFI EN 5 NIVEAUX · DU PLUS FACILE AU PLUS DIFFICILE</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug flex items-center flex-wrap gap-2">
            <span>Prête pour le Défi</span>
            <span className="inline-flex items-center text-white">
              <AnOnTcheText iconClassName="w-[0.9em] h-[0.9em] text-white" />
            </span>
            <span>en 5 Niveaux ?</span>
          </h2>

          <p className="text-xs sm:text-sm text-pink-100 leading-relaxed">
            Grimpez les 5 échelons selon vos points cumulés : des notions fondamentales jusqu'au rang d'Ambassadrice d'Or, déjouez les fausses croyances et sauvez des vies au Bénin.
          </p>
        </div>

        <div className="shrink-0">
          <button
            onClick={onStartQuiz}
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-white text-[#ac2356] hover:bg-pink-50 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg transition-all transform hover:scale-105 active:scale-98 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-[#ac2356]" />
            <span>Lancer le Jeu</span>
          </button>
        </div>
      </div>
    </section>
  );
};
