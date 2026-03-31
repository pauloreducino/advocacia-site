"use client";
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/lib/navigation';
import { locales, type Locale } from '@/lib/i18n';

const FLAGS: Record<Locale, string> = {
  'pt-br': '🇧🇷',
  en: '🇺🇸',
};

const LABELS: Record<Locale, string> = {
  'pt-br': 'PT',
  en: 'EN',
};

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const otherLocale = locale === 'pt-br' ? 'en' : 'pt-br';

  const handleSwitch = () => {
    router.replace(pathname, { locale: otherLocale });
  };

  return (
    <button
      onClick={handleSwitch}
      aria-label={`Switch to ${otherLocale === 'en' ? 'English' : 'Português'}`}
      className="flex items-center gap-1.5 text-[11px] text-muted hover:text-gold transition-colors duration-200 tracking-[1px] uppercase"
    >
      <span>{FLAGS[locale]}</span>
      <span>{LABELS[locale]}</span>
    </button>
  );
}
