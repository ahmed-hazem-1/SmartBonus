import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useI18n } from '../i18n';

export function Trust() {
  const { t } = useI18n();

  return (
    <section id="partner" className="py-16 border-y border-gray-100 min-h-screen flex items-center gradient-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        <div className="inline-flex items-center justify-center p-3 bg-white rounded-full border border-gray-100 mb-6 shadow-sm">
           <ShieldCheck className="w-6 h-6 text-brand-navy" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-4">
          {t.trust.title}
        </h2>
        <p className="text-brand-gray max-w-2xl mx-auto text-lg">
          {t.trust.description}
        </p>
      </div>
    </section>
  );
}
