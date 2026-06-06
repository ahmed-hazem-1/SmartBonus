import React from 'react';
import { useI18n } from '../i18n';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer id="footer" className="border-t border-gray-100 min-h-screen flex flex-col items-center justify-center py-16 gradient-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center w-full">
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-brand-navy mb-1">{t.footer.brand}</h2>
          <p className="text-base font-semibold text-brand-yellow mb-2">{t.footer.tagline}</p>
          <p className="text-sm text-brand-gray">
            {t.footer.poweredBy}{' '}
            <span className="font-semibold text-brand-navy">{t.footer.partner}</span>
          </p>
        </div>

        <div className="w-24 h-px bg-gray-200 mb-8" />
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12">
          <a href="#features" className="text-brand-gray hover:text-brand-navy transition-colors text-sm font-medium"
            onClick={e => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            {t.footer.links.features}
          </a>
          <a href="#how-it-works" className="text-brand-gray hover:text-brand-navy transition-colors text-sm font-medium"
            onClick={e => { e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            {t.footer.links.howItWorks}
          </a>
          <a href="#waitlist" className="text-brand-gray hover:text-brand-navy transition-colors text-sm font-medium"
            onClick={e => { e.preventDefault(); document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            {t.footer.links.waitlist}
          </a>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-400">
          <div className="flex gap-4">
            <a href="#" className="hover:text-brand-navy transition-colors">{t.footer.links.privacy}</a>
            <a href="#" className="hover:text-brand-navy transition-colors">{t.footer.links.terms}</a>
          </div>
          <span className="hidden md:inline text-gray-200">|</span>
          <p>{t.footer.copyright}</p>
        </div>
        
      </div>
    </footer>
  );
}
