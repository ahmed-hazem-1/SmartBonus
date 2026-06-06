import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import screen1 from '../images/1.png';
import screen2 from '../images/2.png';
import screen3 from '../images/3.png';
import screen4 from '../images/4.png';

const screens = [screen1, screen2, screen3, screen4];

/* ── Live clock ── */
function useTime() {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );
  useEffect(() => {
    const t = setInterval(() =>
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })), 1000
    );
    return () => clearInterval(t);
  }, []);
  return time;
}

/* ── Phone Mockup ── */
export function PhoneMockup() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const time = useTime();

  useEffect(() => {
    if (screens.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % screens.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">

      {/* ── Outer device wrapper (holds side buttons) ── */}
      <div className="relative" style={{ width: '240px' }}>

        {/* Left side buttons */}
        <div className="absolute left-0 top-[88px] z-50 flex flex-col gap-2" style={{ transform: 'translateX(-100%)' }}>
          {/* Silent switch */}
          <div
            className="rounded-l-sm"
            style={{
              width: '3px', height: '20px',
              background: 'linear-gradient(180deg, #b45309 0%, #f59e0b 50%, #92400e 100%)',
              boxShadow: '-1px 0 3px rgba(0,0,0,0.5)',
              marginLeft: '-1px',
            }}
          />
          {/* Volume up */}
          <div
            className="rounded-l-sm"
            style={{
              width: '3px', height: '32px',
              background: 'linear-gradient(180deg, #b45309 0%, #f59e0b 50%, #92400e 100%)',
              boxShadow: '-1px 0 3px rgba(0,0,0,0.5)',
              marginLeft: '-1px',
            }}
          />
          {/* Volume down */}
          <div
            className="rounded-l-sm"
            style={{
              width: '3px', height: '32px',
              background: 'linear-gradient(180deg, #b45309 0%, #f59e0b 50%, #92400e 100%)',
              boxShadow: '-1px 0 3px rgba(0,0,0,0.5)',
              marginLeft: '-1px',
            }}
          />
        </div>

        {/* Right side button (power) */}
        <div className="absolute right-0 top-[120px] z-50" style={{ transform: 'translateX(100%)' }}>
          <div
            className="rounded-r-sm"
            style={{
              width: '3px', height: '52px',
              background: 'linear-gradient(180deg, #b45309 0%, #f59e0b 50%, #92400e 100%)',
              boxShadow: '1px 0 3px rgba(0,0,0,0.5)',
              marginRight: '-1px',
            }}
          />
        </div>

        {/* ── Main phone body ── */}
        <div
          className="relative overflow-hidden"
          style={{
            width: '240px',
            height: '540px',
            borderRadius: '42px',
            /* Brand amber/yellow frame */
            background: 'linear-gradient(145deg, #fbbf24 0%, #d97706 25%, #f59e0b 50%, #b45309 75%, #d97706 100%)',
            padding: '3px',
            boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.3)',
          }}
        >
          {/* Inner black bezel */}
          <div
            style={{
              borderRadius: '40px',
              background: '#0a0a0a',
              overflow: 'hidden',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* ── Status bar ── */}
            <div className="flex items-center justify-between px-5 pt-3 pb-1 relative z-30" style={{ background: 'rgba(0,0,0,0.0)' }}>
              <span className="text-[10px] font-semibold text-white">{time}</span>
              {/* Dynamic island space */}
              <div className="w-20" />
              <div className="flex items-center gap-1.5">
                {/* Signal bars */}
                <div className="flex items-end gap-[2px]">
                  {[3, 5, 7, 9].map((h, i) => (
                    <div key={i} className="w-[3px] rounded-[1px] bg-white" style={{ height: `${h}px` }} />
                  ))}
                </div>
                {/* WiFi */}
                <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                  <path d="M6 7.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="white" />
                  <path d="M3.5 5.5C4.2 4.8 5 4.5 6 4.5s1.8.3 2.5 1" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                  <path d="M1.5 3.5C2.8 2.2 4.3 1.5 6 1.5s3.2.7 4.5 2" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                </svg>
                {/* Battery */}
                <div className="flex items-center gap-[1px]">
                  <div className="w-5 h-2.5 rounded-[3px] border border-white/70 relative p-[2px]">
                    <div className="h-full w-[70%] bg-white rounded-[1px]" />
                  </div>
                  <div className="w-[2px] h-1.5 bg-white/50 rounded-r-[1px]" />
                </div>
              </div>
            </div>

            {/* ── Dynamic Island ── */}
            <div
              className="absolute z-40 flex items-center justify-center gap-1.5"
              style={{
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '88px',
                height: '26px',
                background: '#000',
                borderRadius: '20px',
              }}
            >
              {/* Camera lens */}
              <div
                style={{
                  width: '10px', height: '10px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #1a3a5c, #0a1a2e)',
                  border: '1.5px solid #1a2a3a',
                  boxShadow: 'inset 0 0 3px rgba(0,120,255,0.3)',
                }}
              />
              {/* Camera glint */}
              <div
                style={{
                  width: '4px', height: '4px',
                  borderRadius: '50%',
                  background: 'rgba(100,180,255,0.6)',
                }}
              />
            </div>

            {/* ── Screen content ── */}
            <div style={{ position: 'relative', overflow: 'hidden', flex: 1 }}>
              <AnimatePresence>
                <motion.img
                  key={currentIndex}
                  src={screens[currentIndex]}
                  alt={`App screen ${currentIndex + 1}`}
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top',
                    display: 'block',
                  }}
                />
              </AnimatePresence>
              {/* Spacer to hold height */}
              <img
                src={screens[0]}
                alt=""
                aria-hidden
                style={{ width: '100%', height: '100%', visibility: 'hidden', display: 'block' }}
              />
            </div>

            {/* ── Home indicator ── */}
            <div
              className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 rounded-full"
              style={{ width: '80px', height: '4px', background: 'rgba(255,255,255,0.4)' }}
            />

            {/* Screen glare overlay */}
            <div
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                borderRadius: '40px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Dot indicators ── */}
      {screens.length > 1 && (
        <div className="hidden lg:flex gap-2">
          {screens.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`transition-all duration-300 rounded-full ${i === currentIndex
                  ? 'w-6 h-2 bg-amber-400'
                  : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
