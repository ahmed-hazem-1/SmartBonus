import React from 'react';
import { Check, Mail, Phone, MapPin, Trash2 } from 'lucide-react';
import { useI18n } from '../../i18n';
import type { LegalDoc } from '../../i18n/translations/legal-en';
import { ADDRESS, PHONE_DISPLAY, PHONE_TEL, SUPPORT_EMAIL } from '../../config/contact';

export function ContentCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 text-start">
      {title && (
        <h2 className="text-xl md:text-2xl font-bold text-brand-navy mb-4 flex items-center gap-3">
          <span className="w-1 h-6 rounded-full bg-brand-accent shrink-0" aria-hidden />
          {title}
        </h2>
      )}
      <div className="space-y-4 text-brand-gray leading-relaxed">{children}</div>
    </section>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <Check className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function LegalDocument({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <ContentCard>
        {doc.intro.map((p, i) => <p key={i}>{p}</p>)}
      </ContentCard>
      {doc.sections.map((section) => (
        <React.Fragment key={section.heading}>
          <ContentCard title={section.heading}>
            {section.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
            {section.bullets && <BulletList items={section.bullets} />}
          </ContentCard>
        </React.Fragment>
      ))}
    </>
  );
}

export function ContactDetails({ title }: { title: string }) {
  const { locale } = useI18n();
  const address = locale === 'en' ? ADDRESS.en : ADDRESS.ar;
  return (
    <ContentCard title={title}>
      <ul className="space-y-3">
        {SUPPORT_EMAIL && (
          <li className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" aria-hidden />
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-brand-navy font-semibold hover:text-brand-accent break-all" dir="ltr">{SUPPORT_EMAIL}</a>
          </li>
        )}
        {PHONE_DISPLAY && (
          <li className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" aria-hidden />
            <a href={`tel:${PHONE_TEL}`} className="text-brand-navy font-semibold hover:text-brand-accent" dir="ltr">{PHONE_DISPLAY}</a>
          </li>
        )}
        <li className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" aria-hidden />
          <span className="text-brand-navy font-semibold">{address}</span>
        </li>
      </ul>
    </ContentCard>
  );
}

export function DeleteCallout() {
  const { t } = useI18n();
  return (
    <div className="bg-white rounded-2xl border border-violet-200 shadow-sm p-6 md:p-8 text-start flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
      <div className="flex items-start gap-3">
        <Trash2 className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" aria-hidden />
        <div>
          <p className="font-bold text-brand-navy mb-1">{t.pages.deleteCta}</p>
          <p className="text-brand-gray text-sm">{t.pages.deleteCardBody}</p>
        </div>
      </div>
      <a
        href="/delete-account/"
        className="inline-flex items-center justify-center shrink-0 rounded-full bg-brand-navy text-white px-6 py-3 text-sm font-semibold hover:bg-brand-accent hover:text-brand-navy transition-colors"
      >
        {t.pages.deleteCta}
      </a>
    </div>
  );
}
