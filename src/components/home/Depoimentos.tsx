import { getTranslations } from 'next-intl/server';

export default async function Depoimentos() {
  const t = await getTranslations('depoimentos');
  const items = t.raw('items') as Array<{ texto: string; nome: string; perfil: string; iniciais: string }>;

  return (
    <section id="depoimentos" aria-label="Depoimentos de clientes" className="py-24 bg-deep">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <p className="section-label reveal">{t('sectionLabel')}</p>
        <h2 className="font-display text-3xl lg:text-4xl text-ivory mb-16 leading-tight reveal">{t('title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" role="list" aria-label="Avaliações de clientes">
          {items.map((d, i) => (
            <div key={i} role="listitem" className="reveal relative bg-white/[0.03] border border-gold/10 rounded p-8 hover:border-gold/20 transition-colors duration-300" style={{ transitionDelay: `${i * 100}ms` }}>
              <span className="absolute top-4 left-5 font-number italic text-gold select-none pointer-events-none" style={{ fontSize: '5rem', opacity: 0.1, lineHeight: 1 }} aria-hidden="true">&ldquo;</span>
              <p className="relative z-10 text-ivory/85 text-[14px] leading-relaxed italic mb-7 pt-5">{d.texto}</p>
              <div className="w-8 h-px bg-gold/30 mb-5" aria-hidden="true" />
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-gold/35 bg-slate flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <span className="font-display text-gold text-[11px] font-bold">{d.iniciais}</span>
                </div>
                <div>
                  <p className="text-ivory text-[13px] font-medium">{d.nome}</p>
                  <p className="text-muted text-[11px]">{d.perfil}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
