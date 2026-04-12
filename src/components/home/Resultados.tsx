import { getTranslations } from 'next-intl/server';

const NUMS = [
  { num: 94, suffix: '%' },
  { num: 1200, suffix: '+' },
  { num: 48, suffix: 'h' },
  { num: 15, suffix: '+' },
];

export default async function Resultados() {
  const t = await getTranslations('resultados');
  const items = t.raw('items') as Array<{ titulo: string; descricao: string }>;

  return (
    <section id="resultados" aria-label="Resultados profissionais" className="py-14 lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <div>
            <p className="section-label reveal">{t('sectionLabel')}</p>
            <h2 className="font-display font-semibold text-3xl lg:text-4xl text-ivory leading-tight reveal">
              {t('title1')}<br /><span className="text-gold">{t('title2')}</span>
            </h2>
          </div>
          <p className="text-muted text-sm max-w-xs leading-relaxed reveal lg:text-right">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" role="group" aria-label="Dados de resultados">
          {items.map((r, i) => (
            <div key={i} className="reveal group border border-gold/10 rounded p-8 hover:border-gold/30 transition-colors duration-300 bg-primary/50" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="mb-4 pb-4 border-b border-gold/10">
                <span className="font-number italic text-gold block" style={{ fontSize: 'clamp(2.8rem, 5vw, 3.8rem)', lineHeight: 1 }} data-count-up data-target={NUMS[i].num} data-suffix={NUMS[i].suffix} aria-label={`${NUMS[i].num}${NUMS[i].suffix}`}>
                  0{NUMS[i].suffix}
                </span>
              </div>
              <p className="font-display text-ivory text-[17px] mb-2">{r.titulo}</p>
              <p className="text-muted text-[13px] leading-relaxed">{r.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
