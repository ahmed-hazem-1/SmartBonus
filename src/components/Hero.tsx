import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PhoneMockup } from './PhoneMockup';
import { useI18n } from '../i18n';

export function Hero() {
  const { t } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [t.hero.painPoints]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % t.hero.painPoints.length);
    }, 4500); // Roll every 4.5 seconds
    return () => clearInterval(timer);
  }, [t.hero.painPoints]);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-end pb-16 pt-20 overflow-hidden fluid-bg-container">
      {/* Fluid marble blobs */}
      <div className="fluid-blob" style={{ width: '60%', height: '70%', top: '-10%', left: '-10%', background: 'radial-gradient(circle, #d97706 0%, #b45309 40%, transparent 70%)', animation: 'blob1 15s ease-in-out infinite' }} />
      <div className="fluid-blob" style={{ width: '50%', height: '60%', bottom: '-15%', right: '-5%', background: 'radial-gradient(circle, #fbbf24 0%, #d97706 35%, transparent 70%)', animation: 'blob2 17s ease-in-out infinite' }} />
      <div className="fluid-blob" style={{ width: '45%', height: '55%', top: '20%', right: '15%', background: 'radial-gradient(circle, #0c4a6e 0%, #0b3142 50%, transparent 70%)', animation: 'blob3 13s ease-in-out infinite' }} />
      <div className="fluid-blob" style={{ width: '55%', height: '50%', bottom: '5%', left: '20%', background: 'radial-gradient(circle, #164e63 0%, #083344 45%, transparent 70%)', animation: 'blob4 18s ease-in-out infinite' }} />
      <div className="fluid-blob" style={{ width: '35%', height: '40%', top: '40%', left: '5%', background: 'radial-gradient(circle, #f59e0b 0%, #92400e 40%, transparent 70%)', animation: 'blob2 14s ease-in-out infinite reverse' }} />
      <div className="fluid-blob" style={{ width: '40%', height: '45%', top: '5%', right: '30%', background: 'radial-gradient(circle, #0e7490 0%, #155e75 50%, transparent 70%)', animation: 'blob1 16s ease-in-out infinite reverse' }} />

      {/* Glass overlay over the fluid background */}
      <div className="absolute inset-0 glass-hero z-10 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-end">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-8 self-end"
          >
            <div className="space-y-6">
              {/* Badge */}
              <div className="flex justify-center lg:justify-start">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium border border-white/20 backdrop-blur-sm">
                  {t.hero.badge}
                </span>
              </div>

              {/* Main headline */}
              <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight text-center lg:text-start">
                {t.hero.title}
              </h1>

              {/* Pain-point questions - Large Orange Rollup Ticker */}
              <div className="relative h-28 sm:h-24 md:h-20 overflow-hidden w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute inset-0 flex items-center justify-center lg:justify-start text-brand-yellow text-xl sm:text-2xl md:text-3xl leading-relaxed font-bold text-center lg:text-start"
                  >
                    {t.hero.painPoints[currentIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Emotional divider */}
              <div className="border-t border-white/20 pt-4 space-y-2 text-center lg:text-start">
                <p className="text-white/90 text-lg md:text-xl italic leading-relaxed">{t.hero.divider}</p>
                <p className="text-brand-yellow font-extrabold text-xl md:text-2xl leading-relaxed">{t.hero.story}</p>
              </div>

              {/* CTA */}
              <div className="flex justify-center lg:justify-start">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => window.dispatchEvent(new CustomEvent('scrollToSection', { detail: { id: 'waitlist' } }))}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-yellow text-white font-bold text-base shadow-lg hover:bg-yellow-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2"
                >
                  {t.hero.cta}
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center w-full h-[260px] sm:h-[300px] lg:h-auto overflow-hidden lg:overflow-visible self-center"
          >
            {/* Mobile App Mockup Carousel */}
            <PhoneMockup />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
