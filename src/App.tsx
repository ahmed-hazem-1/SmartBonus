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

      if (isAnimating.current) return;
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
        e.preventDefault();
        if (currentIndex.current < sections.length - 1) {
          currentIndex.current++;
          scrollToSection(sections[currentIndex.current]);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
        e.preventDefault();
        if (currentIndex.current > 0) {
          currentIndex.current--;
          scrollToSection(sections[currentIndex.current]);
        }
      }
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

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
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

