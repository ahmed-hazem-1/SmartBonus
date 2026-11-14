import React from 'react';
import { Mail, Phone, MapPin, Trash2 } from 'lucide-react';
import { PageLayout } from '../../components/PageLayout';
import { useI18n } from '../../i18n';
import { ADDRESS, PHONE_DISPLAY, PHONE_TEL, SUPPORT_EMAIL } from '../../config/contact';

export function ContactPage() {
  const { t, locale } = useI18n();
  const address = locale === 'en' ? ADDRESS.en : ADDRESS.ar;

  const cardClass = 'glass-card-dark rounded-[1.5rem] p-6 md:p-8 text-white text-start flex flex-col gap-4';
  const iconClass = 'w-12 h-12 rounded-full bg-brand-accent/25 border border-brand-accent-soft/40 flex items-center justify-center';

  return (
    <PageLayout title={t.contact.title} subtitle={t.contact.subtitle}>
      <div className="gradient-navy rounded-[2rem] p-4 sm:p-6 md:p-8 shadow-xl">
        <div className="grid md:grid-flow-col md:auto-cols-fr gap-4 md:gap-6">
          {SUPPORT_EMAIL && <div className={cardClass}>
            <div className={iconClass}><Mail className="w-5 h-5 text-brand-accent-soft" aria-hidden /></div>
            <h2 className="text-lg font-bold">{t.contact.emailTitle}</h2>
            <a href={`mailto:${SUPPORT_EMAIL}`} dir="ltr" className="text-white/90 hover:text-brand-accent-soft break-all text-start">
              {SUPPORT_EMAIL}
            </a>
          </div>}

          {PHONE_DISPLAY && <div className={cardClass}>
            <div className={iconClass}><Phone className="w-5 h-5 text-brand-accent-soft" aria-hidden /></div>
            <h2 className="text-lg font-bold">{t.contact.phoneTitle}</h2>
            <a href={`tel:${PHONE_TEL}`} dir="ltr" className="text-white/90 hover:text-brand-accent-soft text-start">
              {PHONE_DISPLAY}
            </a>
          </div>}

          <div className={cardClass}>
            <div className={iconClass}><MapPin className="w-5 h-5 text-brand-accent-soft" aria-hidden /></div>
            <h2 className="text-lg font-bold">{t.contact.addressTitle}</h2>
            <p className="text-white/90">{address}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-violet-200 shadow-sm p-6 md:p-8 text-start flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div className="flex items-start gap-3">
          <Trash2 className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" aria-hidden />
          <div>
            <h2 className="font-bold text-brand-navy mb-1">{t.contact.deleteTitle}</h2>
            <p className="text-brand-gray text-sm">{t.contact.deleteBody}</p>
          </div>
        </div>
        <a
          href="/delete-account/"
          className="inline-flex items-center justify-center shrink-0 rounded-full bg-brand-navy text-white px-6 py-3 text-sm font-semibold hover:bg-brand-accent hover:text-white transition-colors"
        >
          {t.contact.deleteCta}
        </a>
      </div>
    </PageLayout>
  );
}
