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

  const layout = heroLayout();

  const copy = (align: 'center' | 'start') => {
    const c = align === 'center';
    const jc = c ? 'justify-center' : 'justify-center lg:justify-start';
    const tc = c ? 'text-center' : 'text-center lg:text-start';
    return (
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
          <div className={`${tc} max-w-2xl ${c ? 'mx-auto' : 'mx-auto lg:mx-0'}`}>
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
  };

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
        className={`relative min-h-screen flex flex-col justify-start overflow-hidden fluid-bg-container pt-24 lg:pt-32 pb-12 ${layout === 'b' ? 'lg:justify-center lg:pb-16' : 'lg:pb-20'}`}
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

        {/* ── A: Centered copy, big showcase video below, hand-drawn arrow ── */}
        {layout === 'a' && (
          <div className="flex flex-col items-center gap-6 lg:gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="order-2 lg:order-1 w-full max-w-3xl">
              {copy('center')}
            </motion.div>
            <div className="order-1 lg:order-2 w-full flex flex-col items-center">
              <ArrowNote label={t.hero.arrowLabel} variant="down" isRTL={isRTL} className="hidden lg:flex mb-2" />
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="w-full">
                <HeroVideo className="max-w-5xl mx-auto" />
              </motion.div>
              <ArrowNote label={t.hero.arrowLabel} variant="up" isRTL={isRTL} className="flex lg:hidden mt-3" />
            </div>
          </div>
        )}

        {/* ── B: Split, larger tilted video, floating chips, arrow from copy to video ── */}
        {layout === 'b' && (
          <div className="grid lg:grid-cols-[5fr_7fr] gap-8 lg:gap-14 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative order-2 lg:order-1">
              {copy('start')}
              <ArrowNote label={t.hero.arrowLabel} variant="side" isRTL={isRTL} className="hidden lg:flex absolute -bottom-20 end-[-3rem]" />
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
        )}

        {/* ── C: Centered copy + browser-window video with side chips ── */}
        {layout === 'c' && (
          <div className="flex flex-col items-center gap-8 lg:gap-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="order-2 lg:order-1 w-full max-w-3xl">
              {copy('center')}
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="order-1 lg:order-2 relative w-full max-w-5xl">
              {/* Spotlight beam */}
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[80%] h-48 bg-brand-accent/40 blur-[90px] rounded-full pointer-events-none" aria-hidden />
              <HeroVideo frame="browser" className="max-w-5xl mx-auto" />
              <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -start-10 flex-col gap-3">{chipEls[0]}{chipEls[1]}</div>
              <div className="hidden lg:flex absolute bottom-10 -end-10">{chipEls[2]}</div>
              <div className="flex lg:hidden flex-wrap justify-center gap-2 mt-4">{chips}</div>
            </motion.div>
          </div>
        )}

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


/** TEMP: compare hero layouts with ?hero=a|b|c (default b). Remove once one is chosen. */
function heroLayout(): 'a' | 'b' | 'c' {
  try {
    const v = new URLSearchParams(window.location.search).get('hero');
    if (v === 'a' || v === 'b' || v === 'c') return v;
  } catch {}
  return 'b';
}

/** Hand-drawn style arrow with a short label, pointing at the video. */
function ArrowNote({ label, variant, isRTL, className = '' }: { label: string; variant: 'down' | 'up' | 'side'; isRTL: boolean; className?: string }) {
  const path =
    variant === 'side'
      ? 'M10 20 C 60 70, 120 70, 150 30 C 160 15, 150 5, 140 15 C 130 25, 150 40, 175 35'
      : 'M30 8 C 10 30, 60 45, 40 70 C 32 80, 30 88, 34 96';
  const head = variant === 'side' ? 'M165 26 L177 35 L164 44' : 'M24 86 L34 98 L44 86';
  const flip = variant === 'side' ? (isRTL ? '-scale-x-100' : '') : variant === 'up' ? '-scale-y-100' : '';
  const svg = (
    <motion.svg
      viewBox={variant === 'side' ? '0 0 185 80' : '0 0 70 104'}
      className={`${variant === 'side' ? 'w-40 h-16' : 'w-10 h-14'} text-brand-accent-soft ${flip}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <motion.path d={path} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, delay: 0.6, ease: 'easeInOut' }} />
      <motion.path d={head} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} />
    </motion.svg>
  );
  const text = <span className="text-brand-accent-soft font-bold text-sm lg:text-base -rotate-3 whitespace-nowrap">{label}</span>;
  if (variant === 'side') {
    return <div className={`items-end gap-1 pointer-events-none ${className}`}>{text}{svg}</div>;
  }
  return (
    <div className={`flex-col items-center gap-1 pointer-events-none ${className}`}>
      {variant === 'up' ? <>{svg}{text}</> : <>{text}{svg}</>}
    </div>
  );
}
