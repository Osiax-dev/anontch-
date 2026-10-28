import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertCircle, Heart, XCircle, Stethoscope, PhoneCall, Radio, Eye, Droplets, Sparkles, MoveDiagonal } from 'lucide-react';
import { AudioPlayButton } from './AudioPlayButton';

interface WarningSign {
  id: number;
  title: string;
  iconType: string;
  content: string;
  audioTextFr: string;
  audioTextFon: string;
}

const WARNING_SIGNS: WarningSign[] = [
  {
    id: 1,
    title: "1. Boule, masse ou nodule dur et indolore",
    iconType: "circle-dot",
    content: "Une boule ressentie dans le sein ou sous l'aisselle, souvent ferme et fixée aux tissus avoisinants, même si elle ne fait aucunement mal. La douleur n'est généralement pas un critère de gravité : une grosseur non douloureuse mérite un contrôle médical rapide.",
    audioTextFr: "Premier signe : une boule ou une masse dure dans le sein ou sous l'aisselle. Très important : ce n'est pas parce que ça ne fait pas mal que ce n'est rien. Au début, la maladie ne fait pas mal. Ne massez pas avec des potions de rue, allez voir un agent de santé.",
    audioTextFon: "Gesí nukɔntɔn ɔ : kpo alǒ nǔ syɛn ɖé mɔ ɖo an mɛ alǒ axɔmɛ. E ma ka nɔ wuvɛ ǎ. Ma lin ɖɔ e ma vɛ ǎ ɔ nǔ ɖebǔ kún nyí o. Kansɛɛ an tɔn sín bǐbɛ́mɛ nɔ vɛ ǎ. Ma sɔ amasin vɛvɛ do an wu o, yi dotoxwe."
  },
  {
    id: 2,
    title: "2. Rétraction ou modification du mamelon",
    iconType: "eye",
    content: "Un mamelon qui commence à s'invaginer (se tourner vers l'intérieur), qui change d'orientation sans explication, ou présente une lésion eczématiforme croûteuse persistante qui ne guérit pas avec une crème ordinaire.",
    audioTextFr: "Deuxième signe : le mamelon qui rentre vers l'intérieur ou change de côté tout seul, ou qui présente des plaies ou croûtes qui ne guérissent pas.",
    audioTextFon: "Gesí wegɔ ɔ : an-nukún e hɔn do xomɛ alǒ e ɖyɔ ali éɖesunɔ, alǒ e ɖo akpà e ma nɔ jɛ ganjí ǎ lɛ é."
  },
  {
    id: 3,
    title: "3. Écoulement spontané par le mamelon",
    iconType: "droplets",
    content: "Un écoulement fluide qui survient spontanément (sans presser le mamelon), d'un seul côté, particulièrement s'il est limpide, séreux ou teinté de sang, chez une femme en dehors de la période normale d'allaitement.",
    audioTextFr: "Troisième signe : un liquide transparent ou du sang qui sort tout seul d'un mamelon sans appuyer, alors que vous n'allaitez pas.",
    audioTextFon: "Gesí atɔngɔ́ ɔ : sìn alǒ hun e nɔ tɔ́n sín an-nukún mɛ éɖesunɔ bɔ a ma tlɛ fin ǎ é, hwenu e a ma ɖo an na vǐ wɛ ǎ é."
  },
  {
    id: 4,
    title: "4. Peau d'orange, rougeur ou méplat",
    iconType: "grid",
    content: "Un aspect de la peau ressemblant à une écorce d'agrume avec des pores dilatés et creusés, une zone cutanée qui tire ou s'aplatit lors des mouvements, ou une rougeur chaude étendue ne cédant pas aux antibiotiques usuels.",
    audioTextFr: "Quatrième signe : la peau du sein devient épaisse avec des petits trous comme la peau d'une orange, ou devient très rouge et chaude.",
    audioTextFon: "Gesí ɛnɛgɔ́ ɔ : an sín agbaza nɔ syɛn bo nɔ ɖi akpàkpa kle sín wutu, alǒ e nɔ vɛ sinsinyɛn bo nɔ myɔ kpo zǒ kpo."
  },
  {
    id: 5,
    title: "5. Changement brusque de volume ou de forme",
    iconType: "resize",
    content: "Une asymétrie nette et récente apparue entre les deux seins sans variation de poids corporel, ou une déformation inhabituelle du contour galbé d'un des seins.",
    audioTextFr: "Cinquième signe : un des deux seins grossit brusquement d'un coup ou change de forme de façon anormale par rapport à l'autre.",
    audioTextFon: "Gesí atɔ́ɔ́ngɔ́ ɔ : an ɖokpo ɖo we lɛ mɛ nɔ kló dín kpóɖo kpo alǒ nɔ ɖyɔ fɛkɛn nǔ e é nɔ nyí ɖ'ayi é."
  }
];

export const WarningSignsSection: React.FC = () => {
  const [openSignId, setOpenSignId] = useState<number>(1);

  const toggleSign = (id: number) => {
    setOpenSignId(openSignId === id ? 0 : id);
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Warning Signs Accordion */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#e7eeff] shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#ac2356] uppercase tracking-wider block">
              SIGNAUX CORPORELS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111c2d]">
              Signes d'Alerte : Ce qui doit vous alerter
            </h2>
            <p className="text-xs sm:text-sm text-[#574145] leading-relaxed pt-1">
              Cliquez sur chaque signe pour comprendre ce qu'il signifie et comment l'identifier au toucher ou au regard.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {WARNING_SIGNS.map((sign) => {
              const isOpen = openSignId === sign.id;
              return (
                <div
                  key={sign.id}
                  className={`rounded-2xl border transition-all ${
                    isOpen
                      ? 'border-[#ac2356]/40 bg-[#fef7f9] shadow-sm'
                      : 'border-[#dee8ff] bg-white hover:border-[#cbd5e1]'
                  }`}
                >
                  <div className="w-full p-4 sm:p-4.5 flex items-center justify-between text-left gap-3">
                    <button
                      onClick={() => toggleSign(sign.id)}
                      className="flex items-center gap-3 flex-1 cursor-pointer text-left"
                    >
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                          isOpen ? 'bg-[#ffd9e0] text-[#ac2356]' : 'bg-[#f0f3ff] text-[#574145]'
                        }`}
                      >
                        <Radio className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-[#111c2d]">
                        {sign.title}
                      </span>
                    </button>

                    <div className="flex items-center gap-2 shrink-0">
                      <AudioPlayButton
                        id={`sign-audio-${sign.id}`}
                        textFr={sign.audioTextFr}
                        textFon={sign.audioTextFon}
                        variant="icon-only"
                        className="w-7 h-7"
                      />
                      <button
                        onClick={() => toggleSign(sign.id)}
                        className="text-[#574145] p-1 cursor-pointer"
                      >
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#ac2356]" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-4.5 sm:pb-4.5 text-xs text-[#574145] leading-relaxed pl-14 animate-fade-in border-t border-[#fce7f3] pt-3">
                      {sign.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Protocol of conduct */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#fff1f2] via-[#fef7f9] to-[#ffffff] rounded-3xl p-6 sm:p-8 border border-[#ffd9e0] shadow-sm space-y-6">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#ac2356] uppercase tracking-wider block">
                PROTOCOLE DE CONDUITE
              </span>
              <h3 className="text-2xl font-extrabold text-[#111c2d]">
                Que faire si vous remarquez une anomalie ?
              </h3>
            </div>
            <div className="shrink-0">
              <AudioPlayButton
                id="protocol-audio"
                textFr="Que faire si vous sentez une boule ou une anomalie ? Premièrement : gardez votre calme. Huit boules sur dix sont totalement sans danger. Deuxièmement : n'achetez pas de potions de rue et ne faites pas de scarifications. Troisièmement : allez voir un soignant ou appelez le cent trente-six gratuitement pour qu'on vous oriente."
                textFon="Enyí a mɔ nǔ kpɛví ɖé ɖo an towe mɛ ɔ, etɛ a na bló ? Nukɔntɔn : Ma ɖó xɛsi o. An-kpo tɛnnɛ ɖo wǒ mɛ nɔ nyí kansɛɛ ǎ. Wegɔ : Ma xɔ amasin e nɔ sa ɖo ali to lɛ o, ma lɛ sɔ gbigba do an towe wu o. Atɔngɔ́ : Yi dotoxwe alǒ ylɔ nɔnba ko atɔ́ɔ́n nukun ɖokpo afɔtɔn nukun ɖokpo (136) vɔnu bo na d'alɔ we."
                variant="compact"
              />
            </div>
          </div>

          <div className="space-y-4 pt-1">
            {/* Step 1 */}
            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-xl bg-[#ffd9e0] text-[#ac2356] flex items-center justify-center shrink-0 mt-0.5">
                <Heart className="w-4 h-4 fill-[#ac2356]" />
              </div>
              <div className="text-xs leading-relaxed text-[#111c2d]">
                <strong className="text-[#ac2356] font-extrabold">1. Restez sereine : </strong>
                8 anomalies palpées sur 10 s'avèrent totalement bénignes (kystes liquidiens ou adénofibromes).
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0 mt-0.5">
                <XCircle className="w-4 h-4" />
              </div>
              <div className="text-xs leading-relaxed text-[#111c2d]">
                <strong className="text-[#ba1a1a] font-extrabold">2. Pas de potions miraculeuses ni d'attente : </strong>
                Évitez les remèdes de rue, scarifications ou poudres inconnues qui retardent une prise en charge efficace.
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-xl bg-[#ccfbf1] text-[#006a61] flex items-center justify-center shrink-0 mt-0.5">
                <Stethoscope className="w-4 h-4" />
              </div>
              <div className="text-xs leading-relaxed text-[#111c2d]">
                <strong className="text-[#006a61] font-extrabold">3. Consultez un agent de santé : </strong>
                Présentez-vous dans l'un des centres répertoriés ci-dessous pour une échographie ou une mammographie certifiée.
              </div>
            </div>
          </div>

          {/* Hotline Action Box */}
          <div className="pt-4 border-t border-[#ffd9e0]/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#574145]">
                Assistance Gratuite au Bénin
              </span>
              <PhoneCall className="w-3.5 h-3.5 text-[#ac2356]" />
            </div>
            <p className="text-xs text-[#574145] mb-3 leading-relaxed">
              Besoin d'un conseil immédiat ou d'une orientation vers une sage-femme ?
            </p>
            <a
              href="tel:136"
              className="w-full py-3.5 px-4 rounded-full bg-[#ac2356] hover:bg-[#8f0341] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-[#ac2356]/20 transition-all cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Appeler le 136 (Numéro Vert Santé)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
