import { getTranslations } from 'next-intl/server';
import { getWhatsAppUrl } from '@/lib/utils';

export default async function Contato() {
  const t = await getTranslations('contato');

  const CONTATOS = [
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.374 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.824L0 24l6.336-1.49A11.944 11.944 0 0012 24c6.626 0 12-5.373 12-12S18.626 0 12 0zm0 22c-1.893 0-3.668-.523-5.185-1.433l-.372-.22-3.753.883.917-3.66-.241-.38A9.98 9.98 0 012 12C2 6.478 6.478 2 12 2s10 4.478 10 10-4.478 10-10 10z"/></svg>,
      label: t('whatsapp'), valor: '(11) 99999-9999', href: getWhatsAppUrl(), externo: true,
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
      label: t('email'), valor: 'contato@escritorio.adv.br', href: 'mailto:contato@escritorio.adv.br', externo: false,
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
      label: t('address'), valor: t('addressValue'), href: 'https://maps.google.com', externo: true,
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
      label: t('hours'), valor: t('hoursValue'), href: null, externo: false,
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
      label: t('modalities'), valor: t('modalitiesValue'), href: null, externo: false,
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
      label: t('linkedin'), valor: 'linkedin.com/in/henriquecavalcante', href: 'https://linkedin.com', externo: true,
    },
  ];

  const cls = 'reveal group border border-gold/10 rounded p-6 hover:border-gold/35 transition-colors duration-300 bg-surface/50 hover:bg-surface';

  return (
    <section id="contato" aria-label="Informações de contato" className="py-24 max-w-7xl mx-auto px-6 lg:px-10">
      <p className="section-label reveal">{t('sectionLabel')}</p>
      <h2 className="font-display text-3xl lg:text-4xl text-ivory mb-16 leading-tight reveal">{t('title')}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="group" aria-label="Canais de contato">
        {CONTATOS.map((c, i) => {
          const inner = (
            <>
              <div className="text-gold mb-4">{c.icon}</div>
              <p className="text-[10px] text-gold tracking-[2px] uppercase mb-1">{c.label}</p>
              <p className="text-ivory text-[14px] leading-snug">{c.valor}</p>
            </>
          );
          return c.href ? (
            <a key={c.label} href={c.href} target={c.externo ? '_blank' : undefined} rel={c.externo ? 'noopener noreferrer' : undefined} aria-label={`${c.label}: ${c.valor}`} className={cls + ' block'} style={{ transitionDelay: `${i * 60}ms` }}>{inner}</a>
          ) : (
            <div key={c.label} className={cls} style={{ transitionDelay: `${i * 60}ms` }}>{inner}</div>
          );
        })}
      </div>

      <div className="reveal mt-10 rounded overflow-hidden border border-gold/10" style={{ height: '320px' }} aria-label="Mapa de localização">
        <iframe
          title={t('mapAddress')}
          src={`https://maps.google.com/maps?q=${encodeURIComponent(t('mapQuery'))}&output=embed&z=16`}
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ border: 0, filter: 'grayscale(30%) invert(5%) contrast(95%)' }}
        />
      </div>
    </section>
  );
}
