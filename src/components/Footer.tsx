import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useI18n } from '../i18n';
import { ADDRESS, PHONE_DISPLAY, PHONE_TEL, SUPPORT_EMAIL } from '../config/contact';

const sectionLinks = [
  { id: 'features', key: 'features' as const },
  { id: 'how-it-works', key: 'howItWorks' as const },
  { id: 'waitlist', key: 'waitlist' as const },
];

const pageLinks = [
  { href: '/privacy/', key: 'privacy' as const },
  { href: '/terms/', key: 'terms' as const },
  { href: '/delete-account/', key: 'deleteAccount' as const },
  { href: '/contact/', key: 'contact' as const },
];

export function Footer() {
  const { t, locale } = useI18n();
  const address = locale === 'en' ? ADDRESS.en : ADDRESS.ar;

  return (
    <footer id="footer" className="border-t border-gray-100 py-16 gradient-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center w-full">

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-brand-navy mb-1">{t.footer.brand}</h2>
          <p className="text-base font-semibold text-brand-accent mb-2">{t.footer.tagline}</p>
          <p className="text-sm text-brand-gray">
            {t.footer.poweredBy}{' '}
            <span className="font-semibold text-brand-navy">{t.footer.partner}</span>
          </p>
        </div>

        <div className="w-24 h-px bg-gray-200 mb-8" />

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 md:gap-12 mb-10">
          {sectionLinks.map(item => (
            <a
              key={item.id}
              href={`/#${item.id}`}
              className="text-brand-gray hover:text-brand-navy transition-colors text-sm font-medium"
              onClick={e => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('scrollToSection', { detail: { id: item.id } }));
              }}
            >
              {t.footer.links[item.key]}
            </a>
          ))}
        </nav>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-x-6 gap-y-3 text-sm text-brand-gray mb-10">
          {SUPPORT_EMAIL && (
            <a href={`mailto:${SUPPORT_EMAIL}`} className="flex items-center gap-2 hover:text-brand-navy transition-colors break-all">
              <Mail className="w-4 h-4 text-brand-accent shrink-0" aria-hidden />
              <span dir="ltr">{SUPPORT_EMAIL}</span>
            </a>
          )}
          {PHONE_DISPLAY && (
            <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2 hover:text-brand-navy transition-colors">
              <Phone className="w-4 h-4 text-brand-accent shrink-0" aria-hidden />
              <span dir="ltr">{PHONE_DISPLAY}</span>
            </a>
          )}
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-accent shrink-0" aria-hidden />
            <span>{address}</span>
          </span>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-gray-500 mb-4">
          {pageLinks.map(item => (
            <a key={item.href} href={item.href} className="hover:text-brand-navy transition-colors">
              {t.footer.links[item.key]}
            </a>
          ))}
        </nav>

        <p className="text-sm text-gray-400">{t.footer.copyright}</p>

      </div>
    </footer>
  );
}
