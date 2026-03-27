import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['300', '400', '500'],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['300', '500', '600'],
  style: ['italic'],
});

export const metadata: Metadata = {
  title: {
    default: 'Dr. Henrique Cavalcante — Advogado Criminal & Empresarial',
    template: '%s | Dr. Henrique Cavalcante',
  },
  description:
    'Advocacia criminal e empresarial de alto padrão em São Paulo. Estratégia, sigilo e resultados. OAB/SP 123.456.',
  keywords: ['advogado', 'advocacia criminal', 'direito empresarial', 'OAB SP', 'São Paulo'],
  authors: [{ name: 'Dr. Henrique Cavalcante' }],
  creator: 'Dr. Henrique Cavalcante',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Dr. Henrique Cavalcante — Advocacia',
    title: 'Dr. Henrique Cavalcante — Advogado Criminal & Empresarial',
    description:
      'Advocacia criminal e empresarial de alto padrão em São Paulo. Estratégia, sigilo e resultados.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Henrique Cavalcante — Advogado',
    description: 'Advocacia criminal e empresarial de alto padrão em São Paulo.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${dmSans.variable} ${cormorant.variable}`}>
      <body className="bg-primary text-ivory font-body antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
