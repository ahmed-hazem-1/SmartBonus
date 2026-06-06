import { useState, useEffect, useRef } from 'react';
import { useI18n } from '../../i18n';
import { TYPE_SPEED, ERASE_SPEED, MS_PER_CHAR, MIN_DISPLAY } from './constants';

/**
 * Drives the typewriter animation for the navbar brand/question cycle.
 * Uses the current locale's brandCycle from i18n translations.
 * Returns the currently visible partial text, the active cycle item,
 * and a blinking cursor visibility flag.
 */
export function useTypewriter() {
  const { t } = useI18n();
  const brandCycle = t.navbar.brandCycle;

  const [cycleIndex, setCycleIndex]   = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor]   = useState(true);
  const timerRef    = useRef<ReturnType<typeof setTimeout>  | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = () => {
    if (timerRef.current)    clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // Blinking cursor
  useEffect(() => {
    const cur = setInterval(() => setShowCursor(p => !p), 500);
    return () => clearInterval(cur);
  }, []);

  // Reset cycle index when language changes
  useEffect(() => {
    setCycleIndex(0);
    setDisplayText('');
  }, [t]);

  // Typewriter engine — reruns whenever cycleIndex or brandCycle changes
  useEffect(() => {
    clearTimers();
    const target = brandCycle[cycleIndex]?.text ?? '';
    let charIndex = 0;

    setDisplayText('');

    // Phase 1: type in
    intervalRef.current = setInterval(() => {
      charIndex++;
      setDisplayText(target.slice(0, charIndex));

      if (charIndex >= target.length) {
        clearInterval(intervalRef.current!);

        // Phase 2: wait (duration scales with text length)
        const displayDuration = Math.max(MIN_DISPLAY, target.length * MS_PER_CHAR);
        timerRef.current = setTimeout(() => {
          let eraseIndex = target.length;

          // Phase 3: erase
          intervalRef.current = setInterval(() => {
            eraseIndex--;
            setDisplayText(target.slice(0, eraseIndex));

            if (eraseIndex <= 0) {
              clearInterval(intervalRef.current!);
              setCycleIndex(prev => (prev + 1) % brandCycle.length);
            }
          }, ERASE_SPEED);
        }, displayDuration);
      }
    }, TYPE_SPEED);

    return clearTimers;
  }, [cycleIndex, brandCycle]);

  return {
    displayText,
    showCursor,
    currentItem: brandCycle[cycleIndex] ?? { text: '', isQuestion: false },
  };
}
