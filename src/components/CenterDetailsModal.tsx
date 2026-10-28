import React from 'react';
import { X, MapPin, Phone, Clock, ShieldCheck, CheckCircle2, Navigation, AlertTriangle } from 'lucide-react';
import { HealthCenter } from '../types';

interface CenterDetailsModalProps {
  center: HealthCenter | null;
  onClose: () => void;
}

export const CenterDetailsModal: React.FC<CenterDetailsModalProps> = ({ center, onClose }) => {
  if (!center) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-7 shadow-2xl border border-[#dee8ff] space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <span className="px-2.5 py-0.5 rounded-md bg-[#e6fffa] text-[#006a61] text-[11px] font-bold">
              {center.type}
            </span>
            <h3 className="text-xl font-extrabold text-[#111c2d]">
              {center.name}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-[#574145]">
              <MapPin className="w-3.5 h-3.5 text-[#ac2356]" />
              <span>{center.city} • Département du {center.department}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f0f3ff] text-[#574145] hover:text-[#111c2d] flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Address & Hours */}
        <div className="p-4 rounded-2xl bg-[#f0f3ff] border border-[#dee8ff] space-y-2.5 text-xs">
          <div className="flex items-start gap-2.5 text-[#111c2d]">
            <MapPin className="w-4 h-4 text-[#ac2356] shrink-0 mt-0.5" />
            <div>
              <strong className="block">Adresse précise :</strong>
              <span>{center.address}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 text-[#111c2d] pt-1 border-t border-[#dee8ff]">
            <Clock className="w-4 h-4 text-[#006a61] shrink-0 mt-0.5" />
            <div>
              <strong className="block">Horaires d'accueil sénologique :</strong>
              <span>{center.hours}</span>
            </div>
          </div>
        </div>

        {/* Services & Equipments */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-extrabold text-[#111c2d] uppercase tracking-wide">
            Équipements & Prestations Disponibles
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${center.hasMammography ? 'bg-[#e6fffa] border-[#006a61]/30 text-[#006a61] font-bold' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Mammographie {center.hasMammography ? '✓' : 'Non dispo'}</span>
            </div>
            <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${center.hasUltrasound ? 'bg-[#e6fffa] border-[#006a61]/30 text-[#006a61] font-bold' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Échographie mammaire ✓</span>
            </div>
            <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${center.hasFreePalpation ? 'bg-[#e6fffa] border-[#006a61]/30 text-[#006a61] font-bold' : 'bg-[#f0f3ff] border-[#dee8ff] text-[#574145]'}`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Palpation clinique {center.hasFreePalpation ? 'Gratuite' : 'Tarif conventionné'}</span>
            </div>
            <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${center.hasBiopsy ? 'bg-[#e6fffa] border-[#006a61]/30 text-[#006a61] font-bold' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Biopsie & Cytologie {center.hasBiopsy ? '✓' : 'Sur référence'}</span>
            </div>
          </div>
        </div>

        {/* Advice for visit */}
        <div className="p-3.5 rounded-2xl bg-[#fef7f9] border border-[#ffd9e0] text-xs text-[#8f0341] space-y-1">
          <strong className="block flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" /> Conseil pour votre rendez-vous :
          </strong>
          <p className="leading-relaxed text-[11px]">
            Le jour de l'examen, évitez d'appliquer du déodorant, du talc ou de la pommade sur les aisselles et la poitrine (ces produits peuvent créer de fausses ombres sur les clichés radiographiques).
          </p>
        </div>

        {/* Bottom Actions */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <a
            href={`tel:${center.phone.replace(/\s+/g, '')}`}
            className="py-3 px-4 rounded-full bg-[#ac2356] hover:bg-[#8f0341] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>Appeler le centre</span>
          </a>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${center.coordinates.lat},${center.coordinates.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-4 rounded-full bg-white hover:bg-[#f0f3ff] border border-[#dee8ff] text-[#111c2d] text-xs font-bold flex items-center justify-center gap-2 transition-all"
          >
            <Navigation className="w-4 h-4 text-[#006a61]" />
            <span>Ouvrir Google Maps</span>
          </a>
        </div>
      </div>
    </div>
  );
};
