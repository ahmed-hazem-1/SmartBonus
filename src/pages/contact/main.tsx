import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../../index.css';
import { I18nProvider } from '../../i18n';
import { ContactPage } from './ContactPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <ContactPage />
    </I18nProvider>
  </StrictMode>,
);
