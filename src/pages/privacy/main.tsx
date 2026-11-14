import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../../index.css';
import { I18nProvider } from '../../i18n';
import { PrivacyPage } from './PrivacyPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <PrivacyPage />
    </I18nProvider>
  </StrictMode>,
);
