import { defineRouting } from 'next-intl/routing';

export const locales = ['pt-br', 'en'] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = 'pt-br';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
});
