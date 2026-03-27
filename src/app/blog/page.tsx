import type { Metadata } from 'next';
import { Suspense } from 'react';
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

export const metadata: Metadata = {
  title: 'Blog Jurídico — Insights e Artigos de Direito',
  description:
    'Artigos sobre direito criminal, empresarial, trabalhista e mais. Conteúdo jurídico de qualidade para proteger seus direitos.',
  openGraph: {
    title: 'Blog Jurídico — Dr. Henrique Cavalcante',
    description: 'Insights jurídicos sobre direito criminal, empresarial e trabalhista.',
    url: '/blog',
  },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { categoria?: string };
}) {
  const [articles, featured, categories, recent] = await Promise.all([
    getAllArticles(),
    getFeaturedArticles(),
    buildDynamicCategories(),
    getLatestArticles(5),
  ]);

  return (
    <>
      <ClientWidgets />
      <Header />
      <main className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-[12px] text-muted">
              <li>
                <a href="/" className="hover:text-gold transition-colors">Início</a>
              </li>
              <li aria-hidden="true" className="text-gold/40">/</li>
              <li aria-current="page" className="text-ivory">Blog</li>
            </ol>
          </nav>

          <p className="section-label mb-3">Blog</p>
          <h1 className="font-display text-3xl lg:text-5xl text-ivory mb-12 leading-tight">
            Insights Jurídicos
          </h1>

          {/* Featured editorial layout */}
          <Suspense fallback={<div className="h-96 bg-surface rounded animate-pulse mb-14" />}>
            <FeaturedCarousel articles={featured} />
          </Suspense>

          {/* Main content + sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16">
            <div>
              <ArticlesGrid
                articles={articles}
                categories={categories}
                initialCategory={searchParams.categoria}
              />
            </div>
            <div>
              <BlogSidebar categories={categories} recentArticles={recent} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
