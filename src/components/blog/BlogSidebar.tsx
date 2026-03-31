"use client";
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import type { Category, Article } from "@/types";
import { formatDate } from "@/lib/utils";

interface Props {
  categories: Category[];
  recentArticles: Article[];
  currentSlug?: string;
  locale?: string;
}

export default function BlogSidebar({ categories, recentArticles, currentSlug }: Props) {
  const t = useTranslations('blog');

  return (
    <aside aria-label="Barra lateral do blog" className="flex flex-col gap-8">
      <div className="border border-gold/15 rounded p-6 bg-surface/50">
        <p className="text-[10px] text-gold tracking-[2px] uppercase mb-3">{t('newsletter')}</p>
        <p className="font-display text-ivory text-[17px] mb-2 leading-snug">{t('newsTitle')}</p>
        <p className="text-muted text-[13px] mb-5 leading-relaxed">{t('newsDescription')}</p>
        <div className="flex flex-col gap-3">
          <input type="email" placeholder={t('emailPlaceholder')} aria-label={t('emailLabel')} className="w-full bg-primary border border-gold/20 text-ivory text-[13px] px-4 py-3 rounded-sm placeholder-muted/50 focus:outline-none focus:border-gold/50 transition-colors" />
          <button type="button" className="w-full bg-gold text-primary font-medium text-[11px] tracking-[1.5px] uppercase py-3 rounded-sm hover:bg-gold-light transition-colors">{t('subscribe')}</button>
        </div>
      </div>

      <div className="border border-gold/15 rounded p-6 bg-surface/50">
        <p className="text-[10px] text-gold tracking-[2px] uppercase mb-5">{t('categories')}</p>
        <ul className="flex flex-col gap-1" role="list">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link href={`/blog?categoria=${cat.slug}` as any} scroll={false} className="flex items-center justify-between py-2 text-muted text-[13px] hover:text-gold transition-colors duration-200 border-b border-gold/5 last:border-0">
                <span>{cat.label}</span>
                <span className="text-muted/50 text-[11px]">{cat.count ?? 0}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="border border-gold/15 rounded p-6 bg-surface/50">
        <p className="text-[10px] text-gold tracking-[2px] uppercase mb-5">{t('recentArticles')}</p>
        <ul className="flex flex-col gap-4" role="list">
          {recentArticles.filter((a) => a.slug !== currentSlug).slice(0, 4).map((a) => (
            <li key={a.slug}>
              <Link href={`/blog/${a.slug}` as any} className="group block">
                <p className="text-[10px] text-gold tracking-[1px] uppercase mb-1">{a.categoryLabel}</p>
                <p className="text-ivory text-[13px] leading-snug group-hover:text-gold transition-colors duration-200 line-clamp-2">{a.title}</p>
                <p className="text-muted/60 text-[11px] mt-1">{formatDate(a.date)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="border border-gold/15 rounded p-6 bg-surface/50">
        <p className="text-[10px] text-gold tracking-[2px] uppercase mb-5">{t('socialLinks')}</p>
        <div className="flex flex-col gap-3">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted text-[13px] hover:text-gold transition-colors duration-200" aria-label={t('linkedinAriaLabel')}>
            <span className="w-8 h-8 border border-gold/20 rounded-sm flex items-center justify-center text-gold hover:bg-gold/10 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
            </span>
            LinkedIn
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted text-[13px] hover:text-gold transition-colors duration-200" aria-label={t('instagramAriaLabel')}>
            <span className="w-8 h-8 border border-gold/20 rounded-sm flex items-center justify-center text-gold hover:bg-gold/10 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><circle cx="17.5" cy="6.5" r="1.5" /></svg>
            </span>
            Instagram
          </a>
        </div>
      </div>
    </aside>
  );
}
