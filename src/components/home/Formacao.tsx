import { getTranslations } from 'next-intl/server';

export default async function Formacao() {
  const t = await getTranslations('formacao');
  const items = t.raw('items') as Array<{ ano: string; titulo: string; instituicao: string }>;
  const assoc = t.raw('associacoes') as Array<{ sigla: string; nome: string; cargo: string }>;

  return (
    <section id="formacao" aria-label="Formação acadêmica e associações" className="py-14 lg:py-24 max-w-7xl mx-auto px-6 lg:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <p className="section-label reveal">{t('sectionLabel')}</p>
          <h2 className="font-display text-3xl text-ivory mb-14 leading-tight reveal">{t('title')}</h2>
          <div className="relative" role="list" aria-label={t('sectionLabel')}>
            <div className="absolute left-[9px] top-0 bottom-0 w-px bg-gold/15" aria-hidden="true" />
            <div className="flex flex-col gap-10">
              {items.map((f, i) => (
                <div key={i} role="listitem" className="reveal relative pl-10" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="absolute left-0 top-1 w-[18px] h-[18px] bg-primary border border-gold/60 rotate-45 flex-shrink-0" aria-hidden="true" />
                  <span className="text-[11px] text-gold tracking-[2px] uppercase mb-1 block">{f.ano}</span>
                  <p className="font-display text-ivory text-[17px] leading-snug mb-1">{f.titulo}</p>
                  <p className="text-muted text-[13px]">{f.instituicao}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p className="section-label reveal">{t('assocLabel')}</p>
          <h2 className="font-display text-3xl text-ivory mb-14 leading-tight reveal">{t('assocTitle')}</h2>
          <div className="flex flex-col gap-px bg-gold/10 rounded overflow-hidden" role="list" aria-label={t('assocLabel')}>
            {assoc.map((a, i) => (
              <div key={i} role="listitem" className="reveal bg-surface px-6 py-6 flex items-center gap-5 group hover:bg-primary/70 transition-colors duration-200" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="w-12 h-12 border border-gold/30 rounded-sm flex items-center justify-center flex-shrink-0 group-hover:border-gold/60 transition-colors" aria-hidden="true">
                  <span className="font-display text-gold text-[11px] tracking-widest font-bold">{a.sigla}</span>
                </div>
                <div>
                  <p className="text-ivory text-[14px] font-medium mb-0.5">{a.nome}</p>
                  <p className="text-muted text-[12px]">{a.cargo}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="reveal mt-8 border border-gold/15 rounded p-6 bg-gold/[0.03]">
            <p className="text-[10px] text-gold tracking-[2px] uppercase mb-3">{t('credentialLabel')}</p>
            <p className="font-display text-ivory text-lg mb-2">{t('credentialTitle')}</p>
            <p className="text-muted text-[13px] leading-relaxed">{t('credentialText')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
