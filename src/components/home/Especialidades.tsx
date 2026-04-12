import { getTranslations } from 'next-intl/server';

const ICONS = [
  <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg>,
  <svg key="3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
  <svg key="4" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  <svg key="5" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
  <svg key="6" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
];

const NUMS = ['01', '02', '03', '04', '05', '06'];

export default async function Especialidades() {
  const t = await getTranslations('especialidades');
  const items = t.raw('items') as Array<{ titulo: string; descricao: string }>;

  return (
    <>
      <style>{`
        .esp-item { display: grid; grid-template-columns: 60px 1fr auto; align-items: center; gap: 20px; padding: 22px 0 22px 0; border-bottom: 1px solid rgba(201,168,76,0.12); border-left: 3px solid transparent; transition: padding-left 0.3s ease, background 0.3s ease, border-left-color 0.3s ease; cursor: default; }
        .esp-item:hover { background: rgba(201,168,76,0.03); border-left-color: #C9A84C; padding-left: 12px; }
        .esp-icon { opacity: 0.5; transition: opacity 0.3s ease; }
        .esp-item:hover .esp-icon { opacity: 0.8; }
      `}</style>
      <section id="especialidades" aria-label="Áreas de atuação" className="py-14 lg:py-24 max-w-7xl mx-auto px-6 lg:px-10">
        <p className="section-label reveal">{t('sectionLabel')}</p>
        <h2 className="font-display font-semibold text-3xl lg:text-4xl text-ivory mb-14 leading-tight reveal">
          {t('title1')}<br className="hidden lg:block" /> {t('title2')}
        </h2>
        <div className="border-t border-gold/12" role="list" aria-label="Lista de especialidades">
          {items.map((esp, i) => (
            <div key={i} role="listitem" className="esp-item reveal">
              <span className="font-number italic text-gold leading-none select-none" style={{ fontSize: '2.2rem', opacity: 0.3 }} aria-hidden="true">{NUMS[i]}</span>
              <div>
                <p className="font-display text-ivory text-lg mb-1">{esp.titulo}</p>
                <p className="text-muted text-[13px] leading-relaxed">{esp.descricao}</p>
              </div>
              <div className="esp-icon text-gold pr-2 flex-shrink-0">{ICONS[i]}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
