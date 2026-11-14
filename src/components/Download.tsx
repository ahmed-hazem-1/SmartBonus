import React from 'react';
import { motion } from 'motion/react';
import { useI18n } from '../i18n';
import { PLAY_STORE_URL } from '../config/contact';

const BADGE_EN = 'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png';
const BADGE_AR = 'https://play.google.com/intl/en_us/badges/static/images/badges/ar_badge_web_generic.png';

export function Download() {
  const { t, locale } = useI18n();
  const isEn = locale === 'en';

  return (
    <section id="download" className="py-24 gradient-light">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="gradient-navy rounded-[2rem] p-6 sm:p-10 md:p-16 text-white text-center flex flex-col items-center shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{t.download.title}</h2>
          <div className="w-24 h-1 bg-brand-yellow/60 mx-auto rounded-full mb-6" />
          <p className="text-gray-300 text-lg max-w-xl mb-10">{t.download.subtitle}</p>

          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-xl transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
            >
              <img
                src={isEn ? BADGE_EN : BADGE_AR}
                alt={t.download.googleAlt}
                height={64}
                className="h-16 w-auto"
                loading="lazy"
              />
            </a>

            <span
              aria-disabled="true"
              className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/60 cursor-not-allowed"
            >
              {t.download.appStoreSoon}
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
