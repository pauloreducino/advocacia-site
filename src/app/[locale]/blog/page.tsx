import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import ClientWidgets from '@/components/ui/ClientWidgets';
import FeaturedCarousel from '@/components/blog/FeaturedCarousel';
import ArticlesGrid from '@/components/blog/ArticlesGrid';
import BlogSidebar from '@/components/blog/BlogSidebar';
import {
  getAllArticles,
  getFeaturedArticles,
  buildDynamicCategories,
  getLatestArticles,
} from '@/lib/wordpress';

export const revalidate = 3600;

interface Props {
  params: { locale: string };
  searchParams: { categoria?: string };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale as Locale;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  const titles: Record<Locale, string> = {
    'pt-br': 'Blog Jurídico — Insights e Artigos de Direito',
    en: 'Legal Blog — Legal Insights and Articles',
  };
  const descriptions: Record<Locale, string> = {
    'pt-br': 'Artigos sobre direito criminal, empresarial, trabalhista e mais. Conteúdo jurídico de qualidade para proteger seus direitos.',
    en: 'Articles on criminal law, business law, labor law and more. Quality legal content to protect your rights.',
  };

  return {
    title: titles[locale] ?? titles['pt-br'],
    description: descriptions[locale] ?? descriptions['pt-br'],
    alternates: {
      canonical: `${baseUrl}/${locale}/blog`,
      languages: {
        'pt-BR': `${baseUrl}/pt-br/blog`,
        en: `${baseUrl}/en/blog`,
        'x-default': `${baseUrl}/pt-br/blog`,
      },
    },
    openGraph: {
      title: titles[locale] ?? titles['pt-br'],
      description: descriptions[locale] ?? descriptions['pt-br'],
      url: `${baseUrl}/${locale}/blog`,
    },
  };
}

export default async function BlogPage({ params, searchParams }: Props) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations('blog');

  const [articles, featured, categories, recent] = await Promise.all([
    getAllArticles(),
    getFeaturedArticles(),
    buildDynamicCategories(),
    getLatestArticles(5),
  ]);

  const homeHref = locale === 'pt-br' ? '/pt-br' : '/en';
  const blogHref = locale === 'pt-br' ? '/pt-br/blog' : '/en/blog';

  return (
    <>
      <ClientWidgets />
      <Header />
      <main className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-[12px] text-muted">
              <li>
                <a href={homeHref} className="hover:text-gold transition-colors">
                  {t('breadcrumbHome')}
                </a>
              </li>
              <li aria-hidden="true" className="text-gold/40">/</li>
              <li aria-current="page" className="text-ivory">Blog</li>
            </ol>
          </nav>

          <p className="section-label mb-3">{t('sectionLabel')}</p>
          <h1 className="font-display text-3xl lg:text-5xl text-ivory mb-12 leading-tight">
            {t('title')}
          </h1>

          <Suspense fallback={<div className="h-96 bg-surface rounded animate-pulse mb-14" />}>
            <FeaturedCarousel articles={featured} />
          </Suspense>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16">
            <div>
              <ArticlesGrid
                articles={articles}
                categories={categories}
                initialCategory={searchParams.categoria}
                locale={locale}
              />
            </div>
            <div>
              <BlogSidebar
                categories={categories}
                recentArticles={recent}
                locale={locale}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
