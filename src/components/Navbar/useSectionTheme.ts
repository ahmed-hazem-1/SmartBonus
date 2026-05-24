import { useState, useEffect } from 'react';
import { darkSections, allSections } from './constants';

/**
 * Detects which section is currently visible in the viewport and
 * returns whether it has a dark background, so text colours can adapt.
 */
export function useSectionTheme() {
  const [isDark, setIsDark] = useState(true); // hero is the first section — dark

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsDark(darkSections.has(entry.target.id));
          }
        });
      },
      { rootMargin: '-30% 0px -30% 0px', threshold: 0 }
    );

    allSections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return { isDark };
}
