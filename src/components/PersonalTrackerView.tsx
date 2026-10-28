import React, { useState } from 'react';
import { PalpationLog, UserProfile } from '../types';
import {
  Calendar,
  Plus,
  CheckCircle2,
  ShieldCheck,
  Download,
  Trash2,
  Heart,
  AlertCircle,
  FileText,
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff
} from 'lucide-react';

interface PersonalTrackerViewProps {
  logs: PalpationLog[];
  onOpenLogModal: () => void;
  onDeleteLog: (id: string) => void;
  userProfile?: UserProfile | null;
  onUnlock?: () => void;
  onLockNow?: () => void;
}

export const PersonalTrackerView: React.FC<PersonalTrackerViewProps> = ({
  logs,
  onOpenLogModal,
  onDeleteLog,
  userProfile,
  onUnlock,
  onLockNow,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [revealedLogs, setRevealedLogs] = useState<Record<string, boolean>>({});

  const toggleReveal = (id: string) => {
    setRevealedLogs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // If user profile is locked, protect intimate logs behind privacy curtain
  if (userProfile?.isAuthenticated && userProfile.isLocked) {
    return (
      <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#fca5a5] shadow-xl text-center space-y-6 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-[#fee2e2] text-[#dc2626] flex items-center justify-center mx-auto shadow-sm ring-4 ring-[#fee2e2]/60">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fef2f2] text-[#991b1b] text-xs font-bold border border-[#fecaca]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Intimité Totale Garantie</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#111c2d]">
              Journal Intime Verrouillé
            </h2>
            <p className="text-xs sm:text-sm text-[#574145] leading-relaxed">
              Pour empêcher les regards indiscrets sur votre téléphone partagé, votre historique d'auto-examen et vos notes sont masqués.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={onUnlock}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#ac2356] hover:bg-[#8f0341] text-white text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 shadow-lg shadow-[#ac2356]/25 transition-all cursor-pointer"
            >
              <KeyRound className="w-4 h-4" />
              <span>Saisir mon code PIN à 4 chiffres</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Generate printable/exportable summary for a doctor or midwife consultation
  const handleExportReport = () => {
    const reportText = `RÉSUMÉ CLINIQUE D'AUTO-SURVEILLANCE MAMMAIRE (AnOnTché Bénin)
Généré le : ${new Date().toLocaleDateString('fr-FR')}

HISTORIQUE DES AUTO-EXAMENS ENREGISTRÉS :
${logs
  .map(
    (l, idx) =>
      `#${idx + 1} - Date : ${l.date}
  Statut : ${l.label}
  Observation : ${l.notes}
  Côté examiné : ${l.side}
`
  )
  .join('\n')}

Note : Ce relevé est strictement personnel et destiné à faciliter l'échange lors de votre consultation de routine avec votre gynécologue, sage-femme ou médecin traitant au Bénin.
Assistance Ministère de la Santé Bénin : Numéro Vert 136`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `anontche_releve_mammaire_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white rounded-3xl p-6 sm:p-8 border border-[#e7eeff] shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0fdf4] text-[#15803d] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Espace Privé & Sécurisé Localement</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111c2d]">
            Mon Journal d'Auto-Surveillance
          </h1>
          <p className="text-xs sm:text-sm text-[#574145] leading-relaxed max-w-xl">
            Suivez la régularité de vos auto-examens d'un mois sur l'autre. Zéro transmission en ligne, vos données restent strictement dans ce navigateur.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {userProfile?.isAuthenticated && onLockNow && (
            <button
              onClick={onLockNow}
              title="Masquer et verrouiller immédiatement cet écran"
              className="px-3.5 py-2.5 rounded-full bg-[#fee2e2] hover:bg-[#fecaca] text-[#991b1b] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Verrouillage Express</span>
            </button>
          )}

          <button
            onClick={handleExportReport}
            className="px-4 py-2.5 rounded-full bg-white hover:bg-[#f0f3ff] border border-[#dee8ff] text-[#111c2d] text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#006a61]" />
            <span>{downloadSuccess ? '✓ Fiche téléchargée' : 'Exporter pour ma consultation'}</span>
          </button>

          <button
            onClick={onOpenLogModal}
            className="px-5 py-2.5 rounded-full bg-[#ac2356] hover:bg-[#8f0341] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter une observation</span>
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-[#e7eeff] shadow-sm space-y-1">
          <span className="text-xs font-bold text-[#574145]">Total examens notés</span>
          <div className="text-2xl font-black text-[#111c2d]">
            {logs.length}
          </div>
          <span className="text-[11px] text-[#006a61] font-semibold">
            Régularité recommandée : 1 / mois
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#e7eeff] shadow-sm space-y-1">
          <span className="text-xs font-bold text-[#574145]">Dernier examen</span>
          <div className="text-2xl font-black text-[#ac2356]">
            {logs.length > 0 ? `Il y a ${logs[0].daysAgo} jours` : 'Aucun'}
          </div>
          <span className="text-[11px] text-[#574145]">
            {logs.length > 0 ? logs[0].date : 'En attente de notation'}
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#e7eeff] shadow-sm space-y-1">
          <span className="text-xs font-bold text-[#574145]">Statut global</span>
          <div className="text-2xl font-black text-[#006a61]">
            Vigilance Active
          </div>
          <span className="text-[11px] text-[#574145]">
            Protection et santé intime
          </span>
        </div>
      </div>

      {/* Log list table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e7eeff] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-[#111c2d]">
            Historique détaillé des examens
          </h3>
          <span className="text-xs text-[#574145]">
            {logs.length} entrée(s) mémorisée(s)
          </span>
        </div>

        {logs.length === 0 ? (
          <div className="text-center py-12 text-[#574145] text-xs">
            Aucun examen enregistré pour le moment. Cliquez sur « Ajouter une observation » ci-dessus.
          </div>
        ) : (
          <div className="divide-y divide-[#f0f3ff]">
            {logs.map((log) => {
              const isMasked = userProfile?.discreetMode && !revealedLogs[log.id];

              return (
                <div key={log.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#ccfbf1] text-[#006a61] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#111c2d]">{log.label}</span>
                        <span className="text-[10px] font-semibold text-[#574145] bg-[#f0f3ff] px-2 py-0.5 rounded">
                          {log.date}
                        </span>
                      </div>

                      {/* Notes with discreet mode mask */}
                      {isMasked ? (
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-slate-400 font-mono tracking-widest bg-slate-100 px-2 py-0.5 rounded">
                            •••••••••••• (Mode discret)
                          </span>
                          <button
                            onClick={() => toggleReveal(log.id)}
                            className="text-[10px] font-bold text-[#ac2356] hover:underline cursor-pointer"
                          >
                            Révéler
                          </button>
                        </div>
                      ) : (
                        <p className="text-xs text-[#574145] mt-1">{log.notes}</p>
                      )}

                      <div className="text-[10px] text-[#8b7075] mt-1">
                        Côté : {log.side === 'both' ? 'Deux seins' : log.side === 'left' ? 'Sein gauche' : 'Sein droit'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className="text-[11px] font-medium text-[#574145] bg-[#f0f3ff] px-2.5 py-1 rounded-md">
                      Il y a {log.daysAgo} jours
                    </span>
                    <button
                      onClick={() => onDeleteLog(log.id)}
                      className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                      title="Supprimer cette note"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
