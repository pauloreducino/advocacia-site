import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { getLatestArticles } from '@/lib/wordpress';
import { formatDate } from '@/lib/utils';

export default async function BlogPreview() {
  const t = await getTranslations('blogPreview');
  const articles = await getLatestArticles(3);

  return (
    <section id="blog" aria-label="Artigos jurídicos recentes" className="py-14 lg:py-24 max-w-7xl mx-auto px-6 lg:px-10">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
        <div>
          <p className="section-label reveal">{t('sectionLabel')}</p>
          <h2 className="font-display font-semibold text-3xl lg:text-4xl text-ivory leading-tight reveal">{t('title')}</h2>
        </div>
        <Link href="/blog" className="reveal text-[11px] text-gold border border-gold/40 px-5 py-2.5 rounded-sm hover:bg-gold/10 transition-colors uppercase tracking-widest self-start lg:self-auto">
          {t('viewAll')}
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8" role="list" aria-label="Artigos recentes">
        {articles.map((a, i) => (
          <article key={a.slug} role="listitem" className="reveal border-b border-gold/12 pb-8 group" style={{ transitionDelay: `${i * 100}ms` }}>
            <Link href={`/blog/${a.slug}`} className="block">
              <p className="text-[11px] text-gold tracking-[2px] uppercase mb-3">{a.categoryLabel}</p>
              <h3 className="font-display text-ivory text-[18px] leading-snug mb-3 group-hover:text-gold-light transition-colors duration-200">{a.title}</h3>
              <p className="text-muted text-[13px] leading-relaxed mb-5 line-clamp-3">{a.excerpt}</p>
              <div className="flex items-center gap-4 text-[11px] text-muted mb-5">
                <span>{formatDate(a.date)}</span>
                <span aria-hidden="true">·</span>
                <span>{a.readTime} {t('readTime')}</span>
              </div>
              <span className="inline-block text-[11px] text-gold border border-gold/35 px-4 py-2 rounded-sm group-hover:bg-gold/10 transition-colors uppercase tracking-widest">
                {t('readArticle')}
              </span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
