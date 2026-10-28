import React, { useState, useEffect } from 'react';
import { Calendar, RotateCw, CheckCircle2, Bell, Sparkles, Plus, Info } from 'lucide-react';
import { PalpationLog } from '../types';
import { AudioPlayButton } from './AudioPlayButton';

interface CycleCalculatorSectionProps {
  onOpenLogModal: () => void;
  logs: PalpationLog[];
}

export const CycleCalculatorSection: React.FC<CycleCalculatorSectionProps> = ({
  onOpenLogModal,
  logs,
}) => {
  // Default to 6 days ago for demonstration matching the screenshot (Jour 6, in window)
  const getInitialPeriodDate = () => {
    const d = new Date();
    d.setDate(d.getDate() - 6);
    return d.toISOString().split('T')[0];
  };

  const [periodDate, setPeriodDate] = useState<string>(() => {
    const saved = localStorage.getItem('anontche_period_date');
    return saved || getInitialPeriodDate();
  });

  const [cycleLength, setCycleLength] = useState<number>(() => {
    const saved = localStorage.getItem('anontche_cycle_length');
    return saved ? parseInt(saved, 10) : 28;
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('anontche_notifications');
    return saved === 'true';
  });

  const [isSavedMessage, setIsSavedMessage] = useState(false);

  // Compute cycle day and optimal window
  const computeWindow = () => {
    const period = new Date(periodDate);
    if (isNaN(period.getTime())) return { startDay: 18, endDay: 20, cycleDay: 6, isPropitious: true };

    const today = new Date();
    const diffTime = today.getTime() - period.getTime();
    const cycleDay = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

    // J+5 to J+7 window
    const windowStart = new Date(period);
    windowStart.setDate(period.getDate() + 4); // day 5

    const windowEnd = new Date(period);
    windowEnd.setDate(period.getDate() + 6); // day 7

    const isPropitious = cycleDay >= 5 && cycleDay <= 7;

    const startFormatted = windowStart.getDate();
    const endFormatted = windowEnd.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });

    return {
      startDay: startFormatted,
      endDay: endFormatted,
      cycleDay: Math.max(1, cycleDay),
      isPropitious,
    };
  };

  const { startDay, endDay, cycleDay, isPropitious } = computeWindow();

  const handleSave = () => {
    localStorage.setItem('anontche_period_date', periodDate);
    localStorage.setItem('anontche_cycle_length', cycleLength.toString());
    localStorage.setItem('anontche_notifications', notificationsEnabled.toString());
    setIsSavedMessage(true);
    setTimeout(() => setIsSavedMessage(false), 3000);
  };

  // Circular gauge calculation (day in cycle of cycleLength)
  const clampedDay = Math.min(cycleDay, cycleLength);
  const percentage = Math.min(100, Math.round((clampedDay / cycleLength) * 100));
  const strokeDashoffset = 283 - (283 * percentage) / 100;

  return (
    <section id="calculateur-cycle" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Calculator Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#e7eeff] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#ac2356] uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" />
                <span>CALENDRIER DE PRÉVOYANCE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111c2d]">
                Calculateur de Fenêtre d'Autopalpation
              </h2>
            </div>
            <div className="shrink-0">
              <AudioPlayButton
                id="calc-window"
                textFr="Calcul de votre date d'autopalpation. Ne touchez pas vos seins n'importe quand. Le meilleur moment est entre le cinquième et le septième jour après le premier jour de vos règles. Vos seins sont mous et détendus, vous sentirez tout de suite s'il y a une grosseur suspecte."
                textFon="Hwenu e nyɔ hugan na kpɔ́n an towe : Ma kplɔ́n an towe ɖo gbè ɖebǔ mɛ o. Hwenu e nyɔ hugan wɛ nyí azǎn atɔ́ɔ́ngɔ́ kpo azǎn tɛnwengɔ́ kpo gudo e a mɔ hun gbé ɔ. Hwenɛnu ɔ, an towe nɔ fɛ́ bo ma nɔ syɛn ǎ, a na mɔ nǔ e ɖo mɛ lɛ bǐ tlolo."
                variant="compact"
              />
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[#574145] leading-relaxed">
            Le moment idéal se situe entre le <strong>5ᵉ et le 7ᵉ jour</strong> après le premier jour de vos règles,
            lorsque les tissus mammaires sont souples et non engorgés.
          </p>

          <div className="space-y-5 pt-2">
            {/* Input: Date of last period */}
            <div>
              <label className="block text-xs font-bold text-[#111c2d] mb-1.5">
                Date des dernières règles *
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={periodDate}
                  onChange={(e) => setPeriodDate(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl bg-[#f8fafc] border border-[#cbd5e1] text-[#111c2d] text-sm focus:outline-none focus:border-[#ac2356] focus:ring-2 focus:ring-[#ffd9e0] transition-all"
                />
              </div>
              <span className="text-[11px] text-[#574145] mt-1 inline-block">
                Le 1ᵉʳ jour du saignement
              </span>
            </div>

            {/* Slider: Cycle Length */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[#111c2d]">
                  Durée moyenne du cycle
                </label>
                <span className="text-xs font-extrabold text-[#ac2356] bg-[#ffd9e0] px-2.5 py-0.5 rounded-full">
                  {cycleLength} jours
                </span>
              </div>
              <input
                type="range"
                min="21"
                max="35"
                value={cycleLength}
                onChange={(e) => setCycleLength(parseInt(e.target.value, 10))}
                className="w-full accent-[#ac2356] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#574145] font-medium pt-1">
                <span>21j (court)</span>
                <span>28j (moyen)</span>
                <span>35j (long)</span>
              </div>
            </div>

            {/* Notification Toggle */}
            <div className="p-4 rounded-2xl bg-[#f0f3ff] border border-[#dee8ff] flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#006a61]" />
                  <span className="text-xs font-bold text-[#111c2d]">
                    Rappels discrets sur mon appareil
                  </span>
                </div>
                <p className="text-[11px] text-[#574145] leading-relaxed">
                  Aucun serveur externe n'a accès à vos dates. Les alertes sont stockées exclusivement dans le navigateur de votre smartphone.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer mt-1">
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006a61]"></div>
              </label>
            </div>

            {/* Calculate Button */}
            <div className="space-y-2">
              <button
                onClick={handleSave}
                className="w-full h-12 rounded-full bg-[#ac2356] hover:bg-[#8f0341] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#ac2356]/20 transition-all cursor-pointer"
              >
                <RotateCw className="w-4 h-4" />
                <span>Calculer & Mémoriser sur ce téléphone</span>
              </button>
              {isSavedMessage && (
                <p className="text-center text-xs font-semibold text-[#006a61] animate-fade-in">
                  ✓ Dates et préférences enregistrées avec succès en mémoire locale !
                </p>
              )}
            </div>

            {/* Optimal Period Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#ccfbf1]/60 to-[#e6fffa] border border-[#99f6e4] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#006a61] tracking-wide uppercase">
                  PÉRIODE OPTIMALE RECOMMANDÉE
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#006a61] text-white text-[11px] font-bold">
                  • Idéal J+5 à J+7
                </span>
              </div>
              <h4 className="text-lg sm:text-xl font-extrabold text-[#111c2d]">
                Du {startDay} au {endDay}{' '}
                <span className="text-xs font-medium text-[#006a61] block sm:inline">
                  (seins détendus, examen sans gêne)
                </span>
              </h4>
              <p className="text-xs text-[#574145] leading-relaxed">
                Pendant vos règles ou la veille, les seins sont souvent sensibles et plus denses sous l'effet des hormones.
                Cette fenêtre J+5 à J+7 vous garantit une palpation précise et indolore.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Circular Progress Gauge & History */}
        <div className="lg:col-span-5 space-y-6">
          {/* Circular Gauge Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#e7eeff] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#111c2d]">
                Jauge d'état mensuel
              </span>
              <span className="text-[11px] font-bold text-[#006a61] bg-[#e6fffa] px-2 py-0.5 rounded-full">
                Cycle en cours
              </span>
            </div>

            {/* Circular Gauge Graphic */}
            <div className="flex flex-col items-center justify-center py-2">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background track circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#e7eeff"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#ac2356"
                    strokeWidth="8"
                    strokeDasharray="283"
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
                  <div className="w-6 h-6 rounded-full bg-[#ffd9e0] text-[#ac2356] flex items-center justify-center mb-1">
                    <Sparkles className="w-3.5 h-3.5 fill-[#ac2356]" />
                  </div>
                  <span className="text-lg font-black text-[#111c2d]">
                    Jour {cycleDay}
                  </span>
                  <span className={`text-[10px] font-bold uppercase ${isPropitious ? 'text-[#006a61]' : 'text-[#574145]'}`}>
                    {isPropitious ? 'Palpation propice' : 'Cycle régulier'}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#574145] text-center max-w-xs mt-3 leading-relaxed">
                {isPropitious
                  ? 'Vous êtes actuellement dans votre intervalle conseillé pour pratiquer votre auto-examen.'
                  : `Prochaine fenêtre propice dans quelques jours. Vos tissus se préparent.`}
              </p>
            </div>
          </div>

          {/* History of Past Examinations */}
          <div className="bg-white rounded-3xl p-6 border border-[#e7eeff] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#111c2d]">
                Historique de vos auto-examens
              </span>
              <button
                onClick={onOpenLogModal}
                className="text-xs font-bold text-[#ac2356] hover:text-[#8f0341] flex items-center gap-1 hover:underline cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Noter aujourd'hui</span>
              </button>
            </div>

            <div className="space-y-3">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="p-3.5 rounded-2xl bg-[#f0f3ff] border border-[#dee8ff] flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#ccfbf1] text-[#006a61] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-[#111c2d]">
                        {log.label}
                      </h5>
                      <p className="text-[11px] text-[#574145]">
                        {log.notes}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-[#574145] whitespace-nowrap bg-white px-2 py-0.5 rounded-md border border-[#dee8ff]">
                    Il y a {log.daysAgo} jours
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
