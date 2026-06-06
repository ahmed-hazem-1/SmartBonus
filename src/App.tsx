/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Trust } from './components/Trust';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { Waitlist } from './components/Waitlist';
import { Footer } from './components/Footer';

function useSectionScroll() {
  const isAnimating = useRef(false);
  const currentIndex = useRef(0);
  const sections = ['hero', 'partner', 'features', 'how-it-works', 'waitlist', 'footer'];

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Don't intercept if ctrlKey is pressed (zooming)
      if (e.ctrlKey) return;
      
      const currentSectionId = sections[currentIndex.current];
      const currentElement = document.getElementById(currentSectionId);

      if (currentElement) {
        const rect = currentElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // If the section is taller than the screen, allow native scrolling until edges
        if (rect.height > viewportHeight) {
          const isAtTop = rect.top >= -2;
          const isAtBottom = rect.bottom <= viewportHeight + 2;

          if (e.deltaY > 0 && !isAtBottom) {
            return;
          } else if (e.deltaY < 0 && !isAtTop) {
            return;
          }
        }
      }
      
      e.preventDefault();
      if (isAnimating.current) return;

      if (e.deltaY > 0) {
        // Scroll down
        if (currentIndex.current < sections.length - 1) {
          currentIndex.current++;
          scrollToSection(sections[currentIndex.current]);
        }
      } else if (e.deltaY < 0) {
        // Scroll up
        if (currentIndex.current > 0) {
          currentIndex.current--;
          scrollToSection(sections[currentIndex.current]);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in form inputs/select dropdown
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'SELECT' || activeEl.tagName === 'TEXTAREA')) {
        return;
      }

      const isDown = e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey);
      const isUp = e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey);

      if (!isDown && !isUp) return;

      const currentSectionId = sections[currentIndex.current];
      const currentElement = document.getElementById(currentSectionId);

      if (currentElement) {
        const rect = currentElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // If the section is taller than the screen, allow native scrolling until edges
        if (rect.height > viewportHeight) {
          const isAtTop = rect.top >= -2;
          const isAtBottom = rect.bottom <= viewportHeight + 2;

          if (isDown && !isAtBottom) {
            return;
          } else if (isUp && !isAtTop) {
            return;
          }
        }
      }

      e.preventDefault();
      if (isAnimating.current) return;
      
      if (isDown) {
        if (currentIndex.current < sections.length - 1) {
          currentIndex.current++;
          scrollToSection(sections[currentIndex.current]);
        }
      } else if (isUp) {
        if (currentIndex.current > 0) {
          currentIndex.current--;
          scrollToSection(sections[currentIndex.current]);
        }
      }
    };

    let touchStartY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      
      // Ignore small movements to prevent accidental snaps
      if (Math.abs(deltaY) < 10) return;

      const currentSectionId = sections[currentIndex.current];
      const currentElement = document.getElementById(currentSectionId);

      if (currentElement) {
        const rect = currentElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (rect.height > viewportHeight) {
          const isAtTop = rect.top >= -2;
          const isAtBottom = rect.bottom <= viewportHeight + 2;

          if (deltaY > 0 && !isAtBottom) {
            return; // Allow native scroll
          } else if (deltaY < 0 && !isAtTop) {
            return; // Allow native scroll
          }
        }
      }

      if (e.cancelable) {
        e.preventDefault();
      }
      
      if (isAnimating.current) return;

      if (deltaY > 0) {
        if (currentIndex.current < sections.length - 1) {
          currentIndex.current++;
          scrollToSection(sections[currentIndex.current]);
        }
      } else {
        if (currentIndex.current > 0) {
          currentIndex.current--;
          scrollToSection(sections[currentIndex.current]);
        }
      }
      
      touchStartY = touchY;
    };

    const scrollToSection = (id: string) => {
      const element = document.getElementById(id);
      if (element) {
        isAnimating.current = true;
        element.scrollIntoView({ behavior: 'smooth' });

        // Cooldown period for scrolling animation to complete
        setTimeout(() => {
          isAnimating.current = false;
        }, 800);
      }
    };

    // Track which section is currently on screen to sync manual scrolls (like nav clicks or scrollbar dragging)
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sections.indexOf(entry.target.id);
          if (index !== -1 && !isAnimating.current) {
            currentIndex.current = index;
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '-20% 0px -20% 0px', // check visibility in the middle of the viewport
      threshold: 0.3,
    });

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleCustomScroll = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string }>;
      const id = customEvent.detail.id;
      const index = sections.indexOf(id);
      if (index !== -1) {
        currentIndex.current = index;
        scrollToSection(id);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('scrollToSection' as any, handleCustomScroll);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scrollToSection' as any, handleCustomScroll);
      observer.disconnect();
    };
  }, []);
}

export default function App() {
  useSectionScroll();

  return (
    <div className="min-h-screen bg-white selection:bg-brand-yellow/30 selection:text-brand-navy">
      <Navbar />
      <main>
        <Hero />
        <Trust />
        <Features />
        <HowItWorks />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}

