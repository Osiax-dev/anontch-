import React, { useState } from 'react';
import { X, CheckCircle2, Shield, Calendar, AlertCircle } from 'lucide-react';
import { PalpationLog } from '../types';

interface LogExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveLog: (log: PalpationLog) => void;
}

export const LogExamModal: React.FC<LogExamModalProps> = ({
  isOpen,
  onClose,
  onSaveLog,
}) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [findingType, setFindingType] = useState<PalpationLog['findingType']>('normal');
  const [side, setSide] = useState<'both' | 'left' | 'right'>('both');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let label = 'Examen réalisé';
    let defaultNotes = 'Aucune anomalie détectée';

    if (findingType === 'normal') {
      defaultNotes = 'Seins souples et symétriques, aucune anomalie';
    } else if (findingType === 'tenderness') {
      defaultNotes = 'Légère sensibilité diffuse sans nodule';
    } else if (findingType === 'nodule') {
      defaultNotes = 'Sensation de petite boule à surveiller ou vérifier';
    } else if (findingType === 'discharge') {
      defaultNotes = 'Écoulement remarqué';
    }

    const newLog: PalpationLog = {
      id: Date.now().toString(),
      date,
      daysAgo: 0,
      label,
      notes: notes.trim() !== '' ? notes : defaultNotes,
      findingType,
      findingDescription: notes,
      side,
    };

    onSaveLog(newLog);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-[#dee8ff] space-y-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-[#111c2d]">
              Enregistrer un auto-examen
            </h3>
            <p className="text-xs text-[#574145] mt-0.5">
              Données stockées confidentiellement sur votre smartphone.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f0f3ff] text-[#574145] hover:text-[#111c2d] flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date */}
          <div>
            <label className="block text-xs font-bold text-[#111c2d] mb-1">
              Date de réalisation
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-[#f8fafc] border border-[#cbd5e1] text-xs font-medium text-[#111c2d] focus:outline-none focus:border-[#ac2356]"
              required
            />
          </div>

          {/* Finding result */}
          <div>
            <label className="block text-xs font-bold text-[#111c2d] mb-1.5">
              Résultat de l'examen tactile & visuel
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFindingType('normal')}
                className={`p-3 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                  findingType === 'normal'
                    ? 'border-[#006a61] bg-[#e6fffa] text-[#006a61]'
                    : 'border-[#dee8ff] bg-white text-[#574145]'
                }`}
              >
                ✓ Tout est normal
                <span className="block text-[10px] font-normal text-gray-500 mt-0.5">
                  Souple, symétrique
                </span>
              </button>

              <button
                type="button"
                onClick={() => setFindingType('tenderness')}
                className={`p-3 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                  findingType === 'tenderness'
                    ? 'border-[#006a61] bg-[#e6fffa] text-[#006a61]'
                    : 'border-[#dee8ff] bg-white text-[#574145]'
                }`}
              >
                Sensibilité / Tension
                <span className="block text-[10px] font-normal text-gray-500 mt-0.5">
                  Non douloureuse
                </span>
              </button>

              <button
                type="button"
                onClick={() => setFindingType('nodule')}
                className={`p-3 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                  findingType === 'nodule'
                    ? 'border-[#ac2356] bg-[#ffd9e0] text-[#ac2356]'
                    : 'border-[#dee8ff] bg-white text-[#574145]'
                }`}
              >
                Petite boule / Nodule
                <span className="block text-[10px] font-normal text-gray-500 mt-0.5">
                  À vérifier médicalement
                </span>
              </button>

              <button
                type="button"
                onClick={() => setFindingType('discharge')}
                className={`p-3 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                  findingType === 'discharge'
                    ? 'border-[#ac2356] bg-[#ffd9e0] text-[#ac2356]'
                    : 'border-[#dee8ff] bg-white text-[#574145]'
                }`}
              >
                Écoulement / Anomalie
                <span className="block text-[10px] font-normal text-gray-500 mt-0.5">
                  Consultez le CHD/CNHU
                </span>
              </button>
            </div>
          </div>

          {/* Side */}
          <div>
            <label className="block text-xs font-bold text-[#111c2d] mb-1">
              Côté examiné
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['both', 'left', 'right'] as const).map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setSide(s)}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold cursor-pointer ${
                    side === s
                      ? 'bg-[#ac2356] border-[#ac2356] text-white'
                      : 'bg-white border-[#dee8ff] text-[#574145]'
                  }`}
                >
                  {s === 'both' ? 'Les deux seins' : s === 'left' ? 'Sein gauche' : 'Sein droit'}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-[#111c2d] mb-1">
              Notes personnelles (optionnel)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Examen fait sous la douche, pas de douleur ressentie..."
              className="w-full p-3 rounded-xl bg-[#f8fafc] border border-[#cbd5e1] text-xs text-[#111c2d] focus:outline-none focus:border-[#ac2356]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#ac2356] hover:bg-[#8f0341] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              Enregistrer dans mon historique
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
