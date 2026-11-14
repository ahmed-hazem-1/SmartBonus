import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HeroVideo } from './HeroVideo';
import { useI18n } from '../i18n';

export function Hero() {
  const { t, isRTL } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [isWaitlistVisible, setIsWaitlistVisible] = useState(false);
  const [blobsPaused, setBlobsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setCurrentIndex(0);
  }, [t.hero.painPoints]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % t.hero.painPoints.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [t.hero.painPoints]);

  // Throttled scroll handler for sticky CTA
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setShowStickyCTA(window.scrollY > 300);
          ticking = false;
        });
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pause blob animations when hero section is off-screen (saves GPU)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setBlobsPaused(!entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = document.getElementById('waitlist');
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsWaitlistVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollToWaitlist = useCallback(() => {
    window.dispatchEvent(new CustomEvent('scrollToSection', { detail: { id: 'waitlist' } }));
  }, []);

  // Blob animation style — paused when off-screen
  const blobAnimStyle = (animation: string): React.CSSProperties => ({
    animationPlayState: blobsPaused ? 'paused' : 'running',
    animation,
  });

  const jc = 'justify-center lg:justify-start';
  const tc = 'text-center lg:text-start';
  const copy = (
      <div className="space-y-4 lg:space-y-6">
        <div className={`flex ${jc}`}>
          <span className="inline-block px-3 py-1 lg:px-4 lg:py-1.5 rounded-full bg-white/10 text-white text-xs lg:text-sm font-medium border border-white/20 backdrop-blur-sm">
            {t.hero.badge}
          </span>
        </div>

        {/* Pain-point questions ticker (THE HOOK) */}
        <div className="relative h-28 sm:h-24 lg:h-32 overflow-hidden w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className={`absolute inset-0 flex items-center ${jc} ${tc} text-2xl sm:text-3xl lg:text-4xl leading-snug lg:leading-tight font-extrabold`}
            >
              <span className="text-gradient-brand pb-1">{t.hero.painPoints[currentIndex]}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Headline + story (THE ANSWER) */}
        <div className="space-y-3 lg:space-y-4">
          <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight ${tc}`}>{t.hero.title}</h1>
          <div className={`${tc} max-w-2xl mx-auto lg:mx-0`}>
            <p className="text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed inline">{t.hero.divider}{' '}</p>
            <p className="text-brand-accent-soft font-bold text-sm sm:text-base lg:text-lg leading-relaxed inline">{t.hero.story}</p>
          </div>
        </div>

        <div className={`flex ${jc} pt-2 lg:pt-4`}>
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            onClick={scrollToWaitlist}
            className="inline-flex items-center gap-2 px-6 py-3 lg:px-8 lg:py-4 rounded-full bg-gradient-to-l from-brand-accent to-[#8b5cf6] text-white font-bold text-sm lg:text-base shadow-lg shadow-brand-accent/30 hover:from-brand-accent-dark hover:to-brand-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-accent-soft focus:ring-offset-2 focus:ring-offset-transparent"
          >
            {t.hero.cta}
          </motion.button>
        </div>
      </div>
  );

  const chipEls = t.hero.chips.map((label, i) => (
        <span key={i} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-white text-xs sm:text-sm font-semibold shadow-lg whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
          {label}
        </span>
  ));
  const chips = <>{chipEls}</>;

  return (
    <>
      <section
        ref={sectionRef}
        id="hero"
        className="relative min-h-screen flex flex-col justify-start lg:justify-center overflow-hidden fluid-bg-container pt-24 lg:pt-32 pb-12 lg:pb-16"
      >
      {/* Fluid marble blobs — reduced from 6 to 4 for performance.
          Same visual coverage via slightly larger sizes. Animations pause when off-screen. */}
      <div className="fluid-blob" style={{ width: '65%', height: '70%', top: '-10%', left: '-10%', background: 'radial-gradient(circle, #6030f0 0%, #3b1aa8 40%, transparent 70%)', ...blobAnimStyle('blob1 18s ease-in-out infinite') }} />
      <div className="fluid-blob" style={{ width: '55%', height: '65%', bottom: '-15%', right: '-5%', background: 'radial-gradient(circle, #7c5cfa 0%, #4818d8 35%, transparent 70%)', ...blobAnimStyle('blob2 20s ease-in-out infinite') }} />
      <div className="fluid-blob" style={{ width: '50%', height: '55%', top: '20%', right: '10%', background: 'radial-gradient(circle, #1a0c49 0%, #12093a 50%, transparent 70%)', ...blobAnimStyle('blob3 16s ease-in-out infinite') }} />
      <div className="fluid-blob" style={{ width: '55%', height: '55%', bottom: '5%', left: '15%', background: 'radial-gradient(circle, #138f8a 0%, #0b3a4a 45%, transparent 70%)', ...blobAnimStyle('blob4 22s ease-in-out infinite') }} />

      {/* Glass overlay */}
      <div className="absolute inset-0 glass-hero z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">

        {/* Split: copy + larger tilted video with floating chips; arrow from copy to video */}
          <div className="grid lg:grid-cols-[5fr_7fr] gap-8 lg:gap-14 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative order-2 lg:order-1">
              {copy}
              <ArrowNote label={t.hero.arrowLabel} isRTL={isRTL} className="hidden lg:flex absolute -bottom-20 end-[-3rem]" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="order-1 lg:order-2 relative [perspective:1600px]">
              <div className={`transition-transform duration-700 hover:[transform:none] ${isRTL ? 'lg:[transform:rotateY(10deg)_rotateX(4deg)]' : 'lg:[transform:rotateY(-10deg)_rotateX(4deg)]'}`}>
                <HeroVideo className="max-w-none" />
              </div>
              <div className="hidden lg:block absolute -top-5 start-12 animate-[float_6s_ease-in-out_infinite]">{chipEls[0]}</div>
              <div className="hidden lg:block absolute -top-5 end-10 animate-[float_7s_ease-in-out_infinite_1s]">{chipEls[1]}</div>
              <div className="hidden lg:block absolute -bottom-5 start-1/4 animate-[float_8s_ease-in-out_infinite_0.5s]">{chipEls[2]}</div>
              <div className="flex lg:hidden flex-wrap justify-center gap-2 mt-4">{chips}</div>
            </motion.div>
          </div>

      </div>
    </section>

      {/* Sticky Mobile CTA */}
      <AnimatePresence>
        {showStickyCTA && !isWaitlistVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-4 right-4 z-[100] lg:hidden"
          >
            <button
              onClick={scrollToWaitlist}
              className="w-full py-4 rounded-2xl bg-brand-accent text-white font-bold text-lg border border-brand-accent-soft/50 flex justify-center items-center gap-2"
            >
              {t.hero.cta}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


/** Hand-drawn style arrow with a short label, pointing from the copy to the video. */
function ArrowNote({ label, isRTL, className = '' }: { label: string; isRTL: boolean; className?: string }) {
  return (
    <div className={`items-end gap-1 pointer-events-none ${className}`}>
      <span className="text-brand-accent-soft font-bold text-sm lg:text-base -rotate-3 whitespace-nowrap">{label}</span>
      <motion.svg
        viewBox="0 0 185 80"
        className={`w-40 h-16 text-brand-accent-soft ${isRTL ? '-scale-x-100' : ''}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <motion.path
          d="M10 20 C 60 70, 120 70, 150 30 C 160 15, 150 5, 140 15 C 130 25, 150 40, 175 35"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, delay: 0.6, ease: 'easeInOut' }}
        />
        <motion.path d="M165 26 L177 35 L164 44" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} />
      </motion.svg>
    </div>
  );
}
