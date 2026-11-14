import React from 'react';
import { PageLayout } from '../../components/PageLayout';
import { LegalDocument, ContactDetails, DeleteCallout } from '../../components/legal/LegalBlocks';
import { useI18n } from '../../i18n';

export function PrivacyPage() {
  const { t } = useI18n();
  return (
    <PageLayout title={t.privacy.title} subtitle={t.privacy.subtitle} updated={t.legal.privacy.updated}>
      <LegalDocument doc={t.legal.privacy} />
      <DeleteCallout />
      <ContactDetails title={t.privacy.contactTitle} />
    </PageLayout>
  );
}
