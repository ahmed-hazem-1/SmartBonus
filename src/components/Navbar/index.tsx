import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { menuItems } from './constants';
import { useTypewriter } from './useTypewriter';
import { useSectionTheme } from './useSectionTheme';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { displayText, showCursor, currentItem } = useTypewriter();
  const { isDark } = useSectionTheme();

  const questionClass = isDark
    ? 'text-brand-yellow font-bold'
    : 'text-brand-navy font-bold';

  const cursorColor = currentItem.isQuestion
    ? (isDark ? 'bg-brand-yellow' : 'bg-brand-navy')
    : 'bg-white';

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-7xl mx-auto glass-navbar rounded-[2rem] shadow-lg overflow-hidden"
      >
        <div className="px-6 sm:px-8">
          <div className="flex justify-between items-center h-14">

            {/* Typewriter Brand / Question */}
            <div
              className="cursor-pointer min-w-[180px] flex items-center"
              onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span
                className={`font-bold tracking-tight whitespace-nowrap ${
                  currentItem.isQuestion ? `text-sm ${questionClass}` : 'text-base text-white'
                }`}
              >
                {displayText}
              </span>
              {/* Blinking cursor */}
              <span
                className={`ml-[1px] inline-block w-[2px] h-[1em] align-middle ${cursorColor} ${
                  showCursor ? 'opacity-100' : 'opacity-0'
                } transition-opacity duration-75`}
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-white/80 hover:text-brand-yellow transition-colors text-sm font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {item.label}
                </a>
              ))}
              <Button
                size="sm"
                className="!bg-brand-yellow !text-white hover:!bg-yellow-600 border-none"
                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Join the Waitlist
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-brand-yellow focus:outline-none transition-colors"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-white/10 bg-brand-navy/95 backdrop-blur-md"
            >
              <div className="px-6 py-6 flex flex-col gap-4">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-white/80 hover:text-brand-yellow transition-colors text-base font-medium py-1"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                      document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {item.label}
                  </a>
                ))}
                <Button
                  size="sm"
                  className="!bg-brand-yellow !text-white hover:!bg-yellow-600 border-none w-full mt-2"
                  onClick={() => {
                    setIsOpen(false);
                    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Join the Waitlist
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
