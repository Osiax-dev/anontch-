import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Calendar,
  Users,
  Clock,
  Wine,
  Activity,
  Flame,
  Scale,
  Baby,
  Stethoscope,
  Apple,
  Heart,
  Sparkles,
  Info
} from 'lucide-react';
import { EIGHT_RISK_FACTORS, PROTECTIVE_SHIELDS, RiskFactorItem, ProtectiveShieldItem } from '../data/riskFactors';
import { AudioPlayButton } from './AudioPlayButton';

export const RiskFactorsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'non-modifiable' | 'modifiable'>('all');

  const filteredFactors = EIGHT_RISK_FACTORS.filter((factor) => {
    if (selectedCategory === 'all') return true;
    return factor.category === selectedCategory;
  });

  const getRiskIcon = (type: RiskFactorItem['iconType']) => {
    switch (type) {
      case 'calendar': return <Calendar className="w-5 h-5 text-[#ac2356]" />;
      case 'users': return <Users className="w-5 h-5 text-[#ac2356]" />;
      case 'clock': return <Clock className="w-5 h-5 text-[#ac2356]" />;
      case 'activity': return <Activity className="w-5 h-5 text-[#ac2356]" />;
      case 'wine': return <Wine className="w-5 h-5 text-[#ac2356]" />;
      case 'scale': return <Scale className="w-5 h-5 text-[#ac2356]" />;
      case 'flame': return <Flame className="w-5 h-5 text-[#ac2356]" />;
      default: return <ShieldAlert className="w-5 h-5 text-[#ac2356]" />;
    }
  };

  const getShieldIcon = (type: ProtectiveShieldItem['iconType']) => {
    switch (type) {
      case 'baby': return <Baby className="w-6 h-6 text-[#006a61]" />;
      case 'stethoscope': return <Stethoscope className="w-6 h-6 text-[#006a61]" />;
      case 'apple': return <Apple className="w-6 h-6 text-[#006a61]" />;
      default: return <ShieldCheck className="w-6 h-6 text-[#006a61]" />;
    }
  };

  const introFactorsAudio = "Comprendre les huit facteurs de risque du cancer du sein. Cette maladie n'est pas une fatalité ni un sortilège. Quatre facteurs viennent de l'âge et de l'hérédité, et quatre autres dépendent de nos habitudes quotidiennes comme l'alcool, le surpoids ou le manque de marche. Écoutez chaque explication pour savoir comment protéger vos seins.";
  const introShieldsAudio = "Les grands boucliers protecteurs. Attention : l'allaitement au sein et l'autopalpation ne sont pas des risques, ce sont de véritables boucliers protecteurs naturels pour chaque femme. Écoutez les explications pour renforcer votre santé.";

  return (
    <section id="facteurs-risques" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-fade-in">
      {/* 1. LES 8 FACTEURS DE RISQUE */}
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-br from-white via-[#fef7f9] to-[#f0f3ff] rounded-3xl p-6 sm:p-8 border border-[#dee8ff] shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffd9e0] text-[#8f0341] text-xs font-bold uppercase tracking-wider">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>PRÉVENTION SÉNOLOGIQUE • VIGILANCE SANTÉ</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111c2d]">
                Les 8 Facteurs de Risque du Cancer du Sein
              </h2>
              <p className="text-xs sm:text-sm text-[#574145] leading-relaxed">
                Le cancer du sein n'est ni une malédiction ni une fatalité. Connaître ces 8 facteurs permet d'agir sur ce qui dépend de vous
                et de renforcer votre surveillance médicale au bon moment.
              </p>
            </div>

            <div className="shrink-0">
              <AudioPlayButton
                id="intro-8-risques"
                textFr={introFactorsAudio}
                variant="pill"
                customLabel="Écouter l'introduction aux 8 facteurs"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#dee8ff]">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#ac2356] text-white shadow-sm'
                  : 'bg-white text-[#574145] border border-[#dee8ff] hover:bg-[#f0f3ff]'
              }`}
            >
              Tous les 8 facteurs
            </button>
            <button
              onClick={() => setSelectedCategory('non-modifiable')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === 'non-modifiable'
                  ? 'bg-[#ac2356] text-white shadow-sm'
                  : 'bg-white text-[#574145] border border-[#dee8ff] hover:bg-[#f0f3ff]'
              }`}
            >
              Facteurs 1 à 4 : Non Modifiables (Âge, Famille, Anatomie)
            </button>
            <button
              onClick={() => setSelectedCategory('modifiable')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === 'modifiable'
                  ? 'bg-[#ac2356] text-white shadow-sm'
                  : 'bg-white text-[#574145] border border-[#dee8ff] hover:bg-[#f0f3ff]'
              }`}
            >
              Facteurs 5 à 8 : Comportements Évitables (Alcool, Poids, Tabac)
            </button>
          </div>
        </div>

        {/* 8 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredFactors.map((factor) => {
            const isNonModifiable = factor.category === 'non-modifiable';
            return (
              <div
                key={factor.id}
                className="bg-white rounded-3xl p-5 border border-[#e7eeff] shadow-sm flex flex-col justify-between hover:shadow-md hover:border-[#ac2356]/30 transition-all group"
              >
                <div className="space-y-3">
                  {/* Top row with icon and category badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-[#ffd9e0]/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getRiskIcon(factor.iconType)}
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        isNonModifiable
                          ? 'bg-[#ffdad6] text-[#ba1a1a] border border-[#ffb4ab]'
                          : 'bg-[#ffd9e0] text-[#ac2356] border border-[#ffb1c2]'
                      }`}
                    >
                      {factor.categoryLabel}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-extrabold text-[#111c2d] group-hover:text-[#ac2356] transition-colors leading-snug">
                      {factor.title}
                    </h3>
                    <p className="text-[11px] font-semibold text-[#ac2356] mt-0.5 leading-tight">
                      {factor.shortSummary}
                    </p>
                  </div>

                  <p className="text-xs text-[#574145] leading-relaxed">
                    {factor.description}
                  </p>
                </div>

                {/* Vocal Audio Note Button */}
                <div className="pt-3.5 mt-3 border-t border-[#f0f3ff]">
                  <AudioPlayButton
                    id={`risk-${factor.id}`}
                    textFr={factor.audioTextFr}
                    variant="card-banner"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. SECTION DÉDIÉE : LES BOUCLIERS PROTECTEURS (VENANT APRÈS LES 8 FACTEURS) */}
      <div className="bg-gradient-to-br from-[#ccfbf1]/40 via-[#f0fdf4] to-white rounded-3xl p-6 sm:p-9 border-2 border-[#99f6e4] shadow-md space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#99f6e4]/60 pb-5">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006a61] text-white text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DÉFENSES NATURELLES & PRÉVENTION ACTIVE</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#006a61]">
              Les Boucliers Protecteurs : Ce qui vous protège au quotidien
            </h3>
            <p className="text-xs sm:text-sm text-[#111c2d] leading-relaxed">
              <strong>Précision essentielle :</strong> L'allaitement maternel et l'autopalpation ne sont <em>en aucun cas des facteurs de risque</em>.
              Ce sont de puissants <strong>boucliers biologiques et cliniques</strong> qui réduisent considérablement la dangerosité du cancer du sein.
            </p>
          </div>

          <div className="shrink-0">
            <AudioPlayButton
              id="intro-shields"
              textFr={introShieldsAudio}
              variant="pill"
              customLabel="Écouter l'explication des boucliers"
              className="bg-[#006a61] text-white hover:bg-[#005049]"
            />
          </div>
        </div>

        {/* 3 Protective Shields Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROTECTIVE_SHIELDS.map((shield) => (
            <div
              key={shield.id}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-[#bbf7d0] shadow-sm flex flex-col justify-between hover:shadow-md hover:border-[#006a61]/40 transition-all space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#ccfbf1] flex items-center justify-center">
                    {getShieldIcon(shield.iconType)}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#e6fffa] text-[#006a61] border border-[#86f2e4]">
                    {shield.badgeLabel}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-extrabold text-[#111c2d]">
                    {shield.title}
                  </h4>
                  <p className="text-xs font-bold text-[#006a61] mt-0.5">
                    {shield.shortSummary}
                  </p>
                </div>

                <p className="text-xs text-[#574145] leading-relaxed">
                  {shield.description}
                </p>
              </div>

              {/* Vocal audio note */}
              <div className="pt-3 border-t border-[#f0f3ff]">
                <AudioPlayButton
                  id={`shield-${shield.id}`}
                  textFr={shield.audioTextFr}
                  variant="card-banner"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Comfort Message */}
        <div className="p-4 rounded-2xl bg-white border border-[#99f6e4] flex items-center gap-3 text-xs text-[#111c2d]">
          <Heart className="w-5 h-5 text-[#ac2356] shrink-0 fill-[#ac2356]/20" />
          <p>
            <strong>Le message clé à retenir :</strong> Avoir un ou plusieurs facteurs de risque ne signifie pas que vous serez malade.
            Pratiquez votre autopalpation chaque mois et faites-vous examiner annuellement : <strong>la détection précoce guérit 9 cas sur 10</strong>.
          </p>
        </div>
      </div>
    </section>
  );
};
