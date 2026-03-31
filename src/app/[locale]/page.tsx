import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import ClientWidgets from '@/components/ui/ClientWidgets';
import {
  Hero,
  Especialidades,
  Sobre,
  Resultados,
  Formacao,
  Depoimentos,
  BlogPreview,
  FAQ,
  CTABanner,
  Contato,
} from '@/components/home/Sections';

interface Props {
  params: { locale: string };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale as Locale;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  const titles: Record<Locale, string> = {
    'pt-br': 'Dr. Henrique Cavalcante — Advogado Criminal & Empresarial em São Paulo',
    en: 'Dr. Henrique Cavalcante — Criminal & Business Lawyer in São Paulo',
  };
  const descriptions: Record<Locale, string> = {
    'pt-br': 'Advocacia criminal e empresarial de alto padrão em São Paulo. 15 anos de experiência, 94% de taxa de êxito. OAB/SP 123.456. Agende sua consulta.',
    en: 'High-standard criminal and business law practice in São Paulo. 15 years of experience, 94% success rate. OAB/SP 123.456. Schedule your consultation.',
  };

  return {
    title: titles[locale] ?? titles['pt-br'],
    description: descriptions[locale] ?? descriptions['pt-br'],
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'pt-BR': `${baseUrl}/pt-br`,
        en: `${baseUrl}/en`,
        'x-default': `${baseUrl}/pt-br`,
      },
    },
    openGraph: {
      url: `${baseUrl}/${locale}`,
      title: titles[locale] ?? titles['pt-br'],
      description: descriptions[locale] ?? descriptions['pt-br'],
      locale: locale === 'pt-br' ? 'pt_BR' : 'en_US',
    },
  };
}

const legalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: 'Dr. Henrique Cavalcante — Advocacia',
  description: 'Escritório de advocacia criminal e empresarial de alto padrão em São Paulo.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  telephone: '+5511999999999',
  email: 'contato@escritorio.adv.br',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Paulista, 1811, Sala 210',
    addressLocality: 'São Paulo',
    addressRegion: 'SP',
    postalCode: '01310-200',
    addressCountry: 'BR',
  },
  openingHours: ['Mo-Fr 08:00-19:00', 'Sa 09:00-12:00'],
  priceRange: '$$$$',
  areaServed: 'Brasil',
};

export default function Home({ params }: Props) {
  setRequestLocale(params.locale);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }}
      />
      <ClientWidgets />
      <Header />
      <main>
        <Hero />
        <Especialidades />
        <Sobre />
        <Resultados />
        <Formacao />
        <Depoimentos />
        <BlogPreview />
        <FAQ />
        <CTABanner />
        <Contato />
      </main>
      <Footer />
    </>
  );
}
