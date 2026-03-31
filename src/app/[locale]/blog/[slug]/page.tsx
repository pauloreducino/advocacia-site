import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import ClientWidgets from '@/components/ui/ClientWidgets';
import BlogSidebar from '@/components/blog/BlogSidebar';
import ArticleShareButtons from '@/components/blog/ArticleShareButtons';
import AnchorScroll from '@/components/blog/AnchorScroll';
import {
  getArticleBySlug,
  getAllSlugs,
  getAllArticles,
  buildDynamicCategories,
  getLatestArticles,
} from '@/lib/wordpress';
import { formatDate, SITE_URL } from '@/lib/utils';
import { getWhatsAppUrl } from '@/lib/utils';

export const revalidate = 3600;

interface Props {
  params: { locale: string; slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.flatMap((slug) =>
    locales.map((locale) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  const locale = params.locale as Locale;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  if (!article) return { title: locale === 'pt-br' ? 'Artigo não encontrado' : 'Article not found' };

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `${baseUrl}/${locale}/blog/${article.slug}`,
      languages: {
        'pt-BR': `${baseUrl}/pt-br/blog/${article.slug}`,
        en: `${baseUrl}/en/blog/${article.slug}`,
        'x-default': `${baseUrl}/pt-br/blog/${article.slug}`,
      },
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `${baseUrl}/${locale}/blog/${article.slug}`,
      images: [{ url: article.imageUrl, alt: article.imageAlt }],
      type: 'article',
      authors: [article.authorName],
      publishedTime: article.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
    },
  };
}

function extractHeadings(html: string): { id: string; text: string; level: number }[] {
  const matches = [...html.matchAll(/<h([23])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h[23]>/gi)];
  return matches.map((m) => ({
    level: parseInt(m[1]),
    id: m[2],
    text: m[3].replace(/<[^>]*>/g, ''),
  }));
}

export default async function ArticlePage({ params }: Props) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations('blog');

  const [article, allArticles, categories, recent] = await Promise.all([
    getArticleBySlug(params.slug),
    getAllArticles(),
    buildDynamicCategories(),
    getLatestArticles(5),
  ]);

  if (!article) notFound();

  const related = allArticles
    .filter((a) => a.categorySlug === article.categorySlug && a.slug !== article.slug)
    .slice(0, 3);

  const headings = extractHeadings(article.content);
  const articleUrl = `${SITE_URL}/${locale}/blog/${article.slug}`;
  const homeHref = locale === 'pt-br' ? '/pt-br' : '/en';
  const blogHref = locale === 'pt-br' ? '/pt-br/blog' : '/en/blog';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    author: { '@type': 'Person', name: article.authorName },
    datePublished: article.date,
    image: article.imageUrl,
    url: articleUrl,
    inLanguage: locale === 'pt-br' ? 'pt-BR' : 'en-US',
    publisher: { '@type': 'Organization', name: 'Dr. Henrique Cavalcante — Advocacia' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <AnchorScroll />
      <ClientWidgets />
      <Header />

      <main>
        <div className="relative h-72 lg:h-[420px] overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.imageAlt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />
          <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
            <p className="text-[10px] text-gold tracking-[2px] uppercase mb-3">{article.categoryLabel}</p>
            <h1 className="font-display text-ivory text-2xl lg:text-4xl leading-tight max-w-3xl">{article.title}</h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-10 pb-24">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-[12px] text-muted flex-wrap">
              <li><Link href={homeHref} className="hover:text-gold transition-colors">{t('breadcrumbHome')}</Link></li>
              <li aria-hidden="true" className="text-gold/40">/</li>
              <li><Link href={blogHref} className="hover:text-gold transition-colors">Blog</Link></li>
              <li aria-hidden="true" className="text-gold/40">/</li>
              <li><Link href={`${blogHref}?categoria=${article.categorySlug}`} className="hover:text-gold transition-colors">{article.categoryLabel}</Link></li>
              <li aria-hidden="true" className="text-gold/40">/</li>
              <li aria-current="page" className="text-ivory/70 line-clamp-1">{article.title}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16">
            <div>
              <div className="flex items-center gap-5 text-[12px] text-muted mb-8 pb-6 border-b border-gold/15">
                <span>{article.authorName}</span>
                <span className="text-gold/30" aria-hidden="true">·</span>
                <span>{formatDate(article.date)}</span>
                <span className="text-gold/30" aria-hidden="true">·</span>
                <span>{article.readTime} {t('readTime')}</span>
              </div>

              {headings.length > 0 && (
                <nav aria-label={t('inArticle')} className="border border-gold/15 rounded p-6 bg-surface/50 mb-10">
                  <p className="text-[10px] text-gold tracking-[2px] uppercase mb-4">{t('inArticle')}</p>
                  <ol className="flex flex-col gap-2" role="list">
                    {headings.map((h) => (
                      <li key={h.id} style={{ paddingLeft: h.level === 3 ? '1rem' : '0' }}>
                        <a href={`#${h.id}`} className="text-[13px] text-muted hover:text-gold transition-colors duration-200">
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              <article className="prose-juridico mb-12" dangerouslySetInnerHTML={{ __html: article.content }} />

              {article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8" aria-label="Tags">
                  {article.tags.map((tag) => (
                    <span key={tag} className="text-[11px] text-muted border border-gold/20 px-3 py-1 rounded-sm">#{tag}</span>
                  ))}
                </div>
              )}

              <div className="pb-8 mb-8 border-b border-gold/15">
                <ArticleShareButtons title={article.title} url={articleUrl} />
              </div>

              <div className="border border-gold/15 rounded p-6 bg-surface/50 mb-12 flex flex-col sm:flex-row gap-5 items-start">
                <div className="w-14 h-14 rounded border border-gold/30 bg-slate flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-gold text-[14px] font-bold">HC</span>
                </div>
                <div className="flex-1">
                  <p className="font-display text-ivory text-lg mb-1">{article.authorName}</p>
                  <p className="text-muted text-[13px] mb-3 leading-relaxed">{t('authorBio')}</p>
                  <a
                    href={getWhatsAppUrl(t('whatsappConsultMsg', { title: article.title }))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[11px] text-gold border border-gold/35 px-4 py-2 rounded-sm hover:bg-gold/10 transition-colors uppercase tracking-widest"
                  >
                    {t('consultAuthor')}
                  </a>
                </div>
              </div>

              {related.length > 0 && (
                <section aria-label={t('relatedArticles')}>
                  <p className="section-label mb-6">{t('relatedArticles')}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {related.map((a) => (
                      <Link key={a.slug} href={`/${locale}/blog/${a.slug}`} className="group block">
                        <div className="relative h-36 rounded overflow-hidden bg-slate mb-3">
                          <Image src={a.imageUrl} alt={a.imageAlt} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <p className="text-[10px] text-gold tracking-[1px] uppercase mb-1">{a.categoryLabel}</p>
                        <p className="text-ivory text-[13px] leading-snug group-hover:text-gold transition-colors duration-200 line-clamp-2 mb-2">{a.title}</p>
                        <p className="text-muted/60 text-[11px]">{formatDate(a.date)}</p>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              <div className="mt-12 border border-gold/20 rounded p-8 bg-surface/50 text-center">
                <p className="text-[10px] text-gold tracking-[2px] uppercase mb-3">{t('needHelp')}</p>
                <p className="font-display text-ivory text-xl mb-3">{t('articleApplies')}</p>
                <p className="text-muted text-[14px] mb-6">{t('scheduleConsultation')}</p>
                <a
                  href={getWhatsAppUrl(t('whatsappConsultMsg', { title: article.title }))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gold text-primary font-medium text-[12px] tracking-[1.5px] uppercase px-8 py-3 rounded-sm hover:bg-gold-light transition-colors"
                >
                  {t('talkToDoctor')}
                </a>
              </div>
            </div>

            <div>
              <BlogSidebar categories={categories} recentArticles={recent} currentSlug={article.slug} locale={locale} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
