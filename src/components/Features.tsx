import React from 'react';
import { motion } from 'motion/react';
import { Search, Zap, ArrowRightLeft, Building2, Eye, TrendingUp } from 'lucide-react';
import { useI18n } from '../i18n';

const FEATURE_ICONS = [
  <Search className="w-6 h-6 text-brand-yellow" />,
  <Zap className="w-6 h-6 text-brand-yellow" />,
  <ArrowRightLeft className="w-6 h-6 text-brand-yellow" />,
  <Building2 className="w-6 h-6 text-brand-yellow" />,
  <Eye className="w-6 h-6 text-brand-yellow" />,
  <TrendingUp className="w-6 h-6 text-brand-yellow" />,
];

// Shared animation variant — defined once, avoids creating inline objects per render
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export function Features() {
  const { t } = useI18n();

  return (
    <section id="features" className="py-24 relative overflow-hidden gradient-light">
      {/* Subtle background blobs — static, no animation needed here */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-yellow/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-navy/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
            {t.features.title}
          </h2>
          <p className="text-lg text-brand-gray leading-relaxed">
            {t.features.subtitle}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {t.features.items.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              className="glass-card p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-white/60 border border-white flex items-center justify-center shadow-sm mb-4">
                {FEATURE_ICONS[idx]}
              </div>
              <h3 className="text-lg font-bold text-brand-navy mb-2">
                {feature.title}
              </h3>
              <p className="text-brand-gray text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* "Imagine" visual section */}
        <div className="glass-card rounded-[2rem] p-10 md:p-14 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-brand-navy mb-10">
            {t.features.imagineTitle}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6">
            {t.features.imagineItems.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeScale}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-3xl">{item.emoji}</span>
                <span className="text-xs font-semibold text-brand-navy text-center leading-tight">{item.label}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-brand-gray text-sm mt-8 font-medium">
            {t.features.allInOne}
          </p>
        </div>

      </div>
    </section>
  );
}
