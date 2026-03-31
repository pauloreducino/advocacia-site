import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans, Cormorant_Garamond } from 'next/font/google';
import { getLocale } from 'next-intl/server';
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const htmlLang = locale === 'pt-br' ? 'pt-BR' : 'en';

  return (
    <html lang={htmlLang} suppressHydrationWarning className={`${playfair.variable} ${dmSans.variable} ${cormorant.variable}`}>
      <body className="bg-primary text-ivory font-body antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
