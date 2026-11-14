import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useSectionNavigation } from '../hooks/useSectionNavigation';
import { useI18n } from '../i18n';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  meta?: React.ReactNode;
  updated?: string;
  children: React.ReactNode;
}

export function PageLayout({ title, subtitle, meta, updated, children }: PageLayoutProps) {
  useSectionNavigation();
  const { t, locale, setLocale } = useI18n();
  const isEnglish = locale === 'en';

  const langBtn = (active: boolean) =>
    `px-1 transition-colors ${active ? 'text-brand-yellow font-bold' : 'text-white/70 hover:text-white'}`;

  return (
    <div className="min-h-screen bg-white selection:bg-brand-yellow/30 selection:text-brand-navy">
      <Navbar />
      <main>
        <header className="gradient-navy text-white pt-32 pb-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-start">
            <div className="flex items-center justify-between gap-4 mb-8 text-sm">
              <a href="/" className="text-white/70 hover:text-brand-yellow transition-colors">
                {t.pages.backHome}
              </a>
              <div className="flex items-center gap-1" role="group" aria-label="Language">
                <button type="button" onClick={() => setLocale('en')} aria-pressed={isEnglish} className={langBtn(isEnglish)}>
                  English
                </button>
                <span aria-hidden className="text-white/30">/</span>
                <button type="button" onClick={() => setLocale('ar-sa')} aria-pressed={!isEnglish} className={langBtn(!isEnglish)}>
                  العربية
                </button>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">{title}</h1>
            {subtitle && <p className="text-white/80 text-lg max-w-2xl leading-relaxed">{subtitle}</p>}
            {meta && <div className="text-white/70 text-sm mt-4">{meta}</div>}
            {updated && (
              <p className="text-sm text-brand-yellow mt-4">
                {t.pages.lastUpdated}: {updated}
              </p>
            )}
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 pb-24 relative z-10 space-y-6">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
