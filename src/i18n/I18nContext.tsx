import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { en } from './translations/en';
import { arSa } from './translations/ar-sa';
import { arEg } from './translations/ar-eg';
import type { Translations } from './translations/en';

export type Locale = 'en' | 'ar-sa' | 'ar-eg';

const TRANSLATIONS: Record<Locale, Translations> = { en, 'ar-sa': arSa, 'ar-eg': arEg };

const STORAGE_KEY = 'sb-locale';

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Translations;
  dir: 'ltr' | 'rtl';
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'ar-sa' || stored === 'ar-eg') return stored;
    return 'en';
  });

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem(STORAGE_KEY, l);
  };

  const t = TRANSLATIONS[locale];
  const dir = t.dir;
  const isRTL = dir === 'rtl';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = t.lang;
  }, [dir, t.lang]);

  const value = useMemo(() => ({ locale, setLocale, t, dir, isRTL }), [locale, t, dir, isRTL]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}
