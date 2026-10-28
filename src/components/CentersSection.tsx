import React, { useState } from 'react';
import { MapPin, Phone, Navigation, Search, Check, ShieldCheck } from 'lucide-react';
import { HEALTH_CENTERS, REGIONS_FILTER } from '../data/centers';
import { HealthCenter } from '../types';
import { AudioPlayButton } from './AudioPlayButton';

interface CentersSectionProps {
  onOpenCenterDetails: (center: HealthCenter) => void;
}

export const CentersSection: React.FC<CentersSectionProps> = ({
  onOpenCenterDetails,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('Tous les 12 départements');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCenters = HEALTH_CENTERS.filter((center) => {
    // Region filter
    if (selectedFilter !== 'Tous les 12 départements') {
      const simplifiedFilter = selectedFilter.split(' ')[0].toLowerCase();
      const departmentMatch = center.department.toLowerCase().includes(simplifiedFilter) ||
        selectedFilter.toLowerCase().includes(center.department.toLowerCase());
      if (!departmentMatch) return false;
    }

    // Search query filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        center.name.toLowerCase().includes(q) ||
        center.city.toLowerCase().includes(q) ||
        center.department.toLowerCase().includes(q) ||
        center.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return true;
  });

  return (
    <section id="centres-depistage" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="space-y-1">
          <span className="text-xs font-bold text-[#ac2356] uppercase tracking-wider block">
            RÉSEAU MÉDICAL CERTIFIÉ
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111c2d]">
            Centres de Dépistage & Hôpitaux au Bénin
          </h2>
          <p className="text-xs sm:text-sm text-[#574145] leading-relaxed max-w-2xl">
            Trouvez la structure la plus proche équipée pour l'examen clinique des seins, l'échographie et la mammographie,
            accessible à travers les 12 départements du Bénin, de Malanville à Grand-Popo.
          </p>
        </div>
        <div className="shrink-0">
          <AudioPlayButton
            id="centers-voice-guide"
            textFr="Trouver un hôpital ou un centre de dépistage au Bénin. Tous les départements ont des centres équipés pour palper et examiner vos seins. Vous pouvez appeler directement le centre ou composer le cent trente-six gratuitement pour être orientée."
            textFon="Dotoxwe e ɖo Bénin lɛ bǐ mɔ nǔ na kpé nukún do an wu. Enyí a ma nywɛ fí e a na yi ǎ ɔ, a hɛn ɔ a na ylɔ dotoxwe ɔ tlolo alǒ ylɔ nɔnba 136 vɔnu bo na kanbyɔ."
            variant="compact"
          />
        </div>
      </div>

      {/* Filter Row */}
      <div className="space-y-3 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-[#111c2d] mr-1">
            Filtrer par Département / Région :
          </span>
          <div className="flex flex-wrap gap-1.5">
            {REGIONS_FILTER.map((filter) => {
              const isSelected = selectedFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#ac2356] text-white shadow-sm'
                      : 'bg-[#f0f3ff] text-[#574145] hover:bg-[#dee8ff]'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search input for quick lookup */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-[#574145] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher une ville, un hôpital ou un service (ex: Mammographie)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-white border border-[#dee8ff] text-xs text-[#111c2d] focus:outline-none focus:border-[#ac2356]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#574145] hover:text-[#111c2d]"
            >
              Effacer
            </button>
          )}
        </div>
      </div>

      {/* Center Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCenters.map((center) => (
          <div
            key={center.id}
            className="bg-white rounded-3xl p-5 border border-[#e7eeff] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group"
          >
            <div className="space-y-3">
              {/* Type and location badges */}
              <div className="flex items-center justify-between text-[11px] gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#e6fffa] text-[#006a61] font-bold truncate">
                  {center.type}
                </span>
                <span className="inline-flex items-center gap-1 text-[#574145] shrink-0 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#ac2356]" />
                  <span>{center.city}</span>
                </span>
              </div>

              {/* Center Name */}
              <h3 className="text-base font-extrabold text-[#111c2d] group-hover:text-[#ac2356] transition-colors">
                {center.name}
              </h3>

              {/* Description */}
              <p className="text-xs text-[#574145] leading-relaxed line-clamp-2">
                {center.description}
              </p>

              {/* Service Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {center.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-[#f0f3ff] text-[#006a61] text-[10px] font-bold border border-[#dee8ff]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="grid grid-cols-2 gap-2.5 pt-5 mt-4 border-t border-[#f0f3ff]">
              <a
                href={`tel:${center.phone.replace(/\s+/g, '')}`}
                className="py-2.5 px-3 rounded-full bg-[#ac2356] hover:bg-[#8f0341] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Appeler</span>
              </a>
              <button
                onClick={() => onOpenCenterDetails(center)}
                className="py-2.5 px-3 rounded-full bg-white hover:bg-[#f0f3ff] border border-[#dee8ff] text-[#111c2d] text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 text-[#006a61]" />
                <span>Itinéraire</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCenters.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-[#dee8ff] p-8">
          <p className="text-sm font-bold text-[#111c2d]">
            Aucun centre ne correspond à cette recherche.
          </p>
          <button
            onClick={() => {
              setSelectedFilter('Tous les 12 départements');
              setSearchQuery('');
            }}
            className="mt-3 text-xs font-bold text-[#ac2356] hover:underline"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </section>
  );
};
