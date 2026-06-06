import React from 'react';
import { motion } from 'motion/react';
import { useI18n } from '../i18n';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function HowItWorks() {
  const { t } = useI18n();

  return (
    <section id="how-it-works" className="py-24 text-white min-h-screen flex items-center gradient-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t.howItWorks.title}
          </h2>
          <p className="text-lg text-gray-400">
            {t.howItWorks.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-12 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-white/10" />
          
          {t.howItWorks.steps.map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-brand-navy border-2 border-brand-yellow flex items-center justify-center text-xl font-bold text-brand-yellow z-10 shadow-[0_0_0_8px_var(--navy)]">
                {item.step}
              </div>
              <h3 className="text-xl font-bold mt-8 mb-4">
                {item.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
