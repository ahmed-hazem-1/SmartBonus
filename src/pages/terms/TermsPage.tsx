import React from 'react';
import { PageLayout } from '../../components/PageLayout';
import { LegalDocument, ContactDetails } from '../../components/legal/LegalBlocks';
import { useI18n } from '../../i18n';

export function TermsPage() {
  const { t } = useI18n();
  return (
    <PageLayout title={t.terms.title} subtitle={t.terms.subtitle} updated={t.legal.terms.updated}>
      <LegalDocument doc={t.legal.terms} />
      <ContactDetails title={t.contact.title} />
    </PageLayout>
  );
}
