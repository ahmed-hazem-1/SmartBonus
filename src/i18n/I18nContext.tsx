import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { en } from './translations/en';
import { arSa } from './translations/ar-sa';
import { arEg } from './translations/ar-eg';
import type { Translations } from './translations/en';

export type Locale = 'en' | 'ar-sa' | 'ar-eg';

const TRANSLATIONS: Record<Locale, Translations> = { en, 'ar-sa': arSa, 'ar-eg': arEg };

const STORAGE_KEY = 'sb-locale';
const DEFAULT_LOCALE: Locale = 'ar-sa';

const isLocale = (v: unknown): v is Locale => v === 'en' || v === 'ar-sa' || v === 'ar-eg';

// Reads ?lang=en|ar-sa|ar-eg (overrides and stores), otherwise the stored value, otherwise Arabic.
function resolveInitialLocale(): Locale {
  try {
    const fromQuery = new URLSearchParams(window.location.search).get('lang');
    if (isLocale(fromQuery)) {
      try { localStorage.setItem(STORAGE_KEY, fromQuery); } catch { /* storage unavailable */ }
      return fromQuery;
    }
  } catch { /* no window/location */ }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch { /* storage unavailable (private mode, blocked) */ }
  return DEFAULT_LOCALE;
}

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Translations;
  dir: 'ltr' | 'rtl';
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(resolveInitialLocale);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch { /* storage unavailable */ }
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
