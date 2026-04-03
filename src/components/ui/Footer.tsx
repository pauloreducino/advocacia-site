import { getTranslations } from 'next-intl/server';
import { Link } from '@/lib/navigation';
import { getWhatsAppUrl } from '@/lib/utils';

export default async function Footer() {
  const t = await getTranslations('footer');
  const quickLinks = t.raw('quickLinks') as Array<{ label: string; href: string }>;

  return (
    <footer className="bg-deep border-t border-gold/20 pt-14 pb-8" aria-label="Rodapé">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <p className="font-display text-[17px] text-ivory">Dr. Henrique Cavalcante</p>
            <p className="text-[10px] text-gold tracking-[2px] uppercase mt-1">{t('tagline')}</p>
            <p className="text-sm text-muted mt-4 leading-relaxed max-w-[240px]">{t('description')}</p>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('whatsappAriaLabel')}
              className="inline-flex items-center gap-2 mt-6 text-[11px] text-gold border border-gold/40 px-4 py-2 rounded-sm hover:bg-gold/10 transition-colors uppercase tracking-widest"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.374 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.824L0 24l6.336-1.49A11.944 11.944 0 0012 24c6.626 0 12-5.373 12-12S18.626 0 12 0zm0 22c-1.893 0-3.668-.523-5.185-1.433l-.372-.22-3.753.883.917-3.66-.241-.38A9.98 9.98 0 012 12C2 6.478 6.478 2 12 2s10 4.478 10 10-4.478 10-10 10z"/>
              </svg>
              {t('whatsapp')}
            </a>
          </div>

          <div>
            <p className="text-[10px] text-gold tracking-[2px] uppercase mb-5">{t('nav')}</p>
            <ul className="flex flex-col gap-3" role="list">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href as any}
                    className="text-[13px] text-muted hover:text-ivory transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] text-gold tracking-[2px] uppercase mb-5">{t('contato')}</p>
            <ul className="flex flex-col gap-3" role="list">
              {[
                { v: '(11) 99999-9999', href: getWhatsAppUrl() },
                { v: 'contato@escritorio.adv.br', href: 'mailto:contato@escritorio.adv.br' },
                { v: 'Av. Paulista, 1811 · Sala 210', href: '#contato' },
                { v: t('hours1'), href: '#contato' },
                { v: t('hours2'), href: '#contato' },
              ].map((item) => (
                <li key={item.v}>
                  <a href={item.href} className="text-[13px] text-muted hover:text-ivory transition-colors duration-200">
                    {item.v}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <p className="text-[11px] text-muted/70">
            © {new Date().getFullYear()} Dr. Henrique Cavalcante · OAB/SP 123.456 · {t('rights')}
          </p>
          <p className="text-[11px] text-muted/60 max-w-sm text-right leading-relaxed">
            {t('disclaimer')}
          </p>
        </div>

        <div className="pt-4 text-center">
          <p className="text-[11px] text-muted/50">Desenvolvido por Paulo Reducino</p>
        </div>
      </div>
    </footer>
  );
}
