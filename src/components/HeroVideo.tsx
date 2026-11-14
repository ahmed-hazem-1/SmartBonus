import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { useI18n } from '../i18n';

const VIDEO_SRC = '/videos/smart-bonus-intro.mp4';
const POSTER_SRC = '/videos/smart-bonus-intro-poster.jpg';

/**
 * Landscape explainer video for the hero.
 * Autoplays muted + looped while on screen (paused off screen to save battery/data),
 * with a sound toggle that restarts from the beginning the first time sound is turned on.
 * Respects prefers-reduced-motion: no autoplay, just the poster and a play button.
 */
export function HeroVideo() {
  const { t } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const userPaused = useRef(false);
  const soundStarted = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) userPaused.current = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userPaused.current) video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setMuted(nextMuted);
    if (!nextMuted && !soundStarted.current) {
      // First time sound is turned on: start the story from the beginning.
      soundStarted.current = true;
      video.currentTime = 0;
    }
    if (!nextMuted && video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    }
  };

  const btn =
    'w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-black/45 hover:bg-black/60 text-white border border-white/20 backdrop-blur-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow';

  return (
    <div className="relative w-full max-w-2xl mx-auto lg:mx-0">
      {/* Soft amber glow behind the frame */}
      <div className="absolute -inset-3 rounded-[2rem] bg-brand-yellow/20 blur-2xl pointer-events-none" aria-hidden />

      <div className="relative rounded-[1.5rem] sm:rounded-[2rem] p-1.5 sm:p-2 bg-white/10 border border-white/20 shadow-2xl backdrop-blur-sm">
        <div className="relative overflow-hidden rounded-[1.1rem] sm:rounded-[1.5rem] bg-[#0b0820] aspect-video">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover cursor-pointer"
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={t.hero.video.label}
            onClick={togglePlay}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />

          {/* Big play button while paused */}
          {!playing && (
            <button
              type="button"
              onClick={togglePlay}
              aria-label={t.hero.video.play}
              className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center bg-brand-yellow text-white shadow-xl hover:scale-105 transition-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60"
            >
              <Play className="w-7 h-7 sm:w-8 sm:h-8 translate-x-0.5" fill="currentColor" aria-hidden />
            </button>
          )}

          {/* Controls — kept on the physical left/right regardless of text direction */}
          <div dir="ltr" className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? t.hero.video.pause : t.hero.video.play}
              className={`${btn} pointer-events-auto`}
            >
              {playing ? <Pause className="w-4 h-4" fill="currentColor" aria-hidden /> : <Play className="w-4 h-4" fill="currentColor" aria-hidden />}
            </button>

            <button
              type="button"
              onClick={toggleSound}
              aria-label={muted ? t.hero.video.soundOn : t.hero.video.soundOff}
              className={`pointer-events-auto h-10 sm:h-11 rounded-full flex items-center gap-2 px-4 text-sm font-semibold transition-colors border backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow ${
                muted
                  ? 'bg-brand-yellow text-white border-yellow-400/50 hover:bg-yellow-600'
                  : 'bg-black/45 text-white border-white/20 hover:bg-black/60'
              }`}
            >
              {muted ? <VolumeX className="w-4 h-4" aria-hidden /> : <Volume2 className="w-4 h-4" aria-hidden />}
              {muted && <span>{t.hero.video.soundOn}</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
