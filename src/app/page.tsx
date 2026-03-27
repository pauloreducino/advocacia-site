import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Dr. Henrique Cavalcante — Advogado Criminal & Empresarial em São Paulo',
  description:
    'Advocacia criminal e empresarial de alto padrão em São Paulo. 15 anos de experiência, 94% de taxa de êxito. OAB/SP 123.456. Agende sua consulta.',
  alternates: { canonical: '/' },
  openGraph: {
    url: '/',
    title: 'Dr. Henrique Cavalcante — Advogado Criminal & Empresarial',
    description: 'Advocacia criminal e empresarial de alto padrão em São Paulo. 94% de taxa de êxito.',
  },
};

const legalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: 'Dr. Henrique Cavalcante — Advocacia',
  description: 'Escritório de advocacia criminal e empresarial de alto padrão em São Paulo.',
  url: process.env.NEXT_PUBLIC_SITE_URL,
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

export default function Home() {
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
