import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../../index.css';
import { I18nProvider } from '../../i18n';
import { TermsPage } from './TermsPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <TermsPage />
    </I18nProvider>
  </StrictMode>,
);
