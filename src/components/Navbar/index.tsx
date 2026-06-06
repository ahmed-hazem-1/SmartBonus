import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { Button } from '../ui/Button';
import { menuItems } from './constants';
import { useTypewriter } from './useTypewriter';
import { useSectionTheme } from './useSectionTheme';
import { useI18n } from '../../i18n';
import type { Locale } from '../../i18n';

const LANG_OPTIONS: { value: Locale; label: string; native: string }[] = [
  { value: 'en',    label: 'EN',   native: 'English' },
  { value: 'ar-sa', label: 'ع-SA', native: 'العربية (السعودية)' },
  { value: 'ar-eg', label: 'ع-EG', native: 'العربية (مصر)' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const { displayText, showCursor, currentItem } = useTypewriter();
  const { isDark } = useSectionTheme();
  const { locale, setLocale, t, isRTL } = useI18n();
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const mobileLangDropdownRef = useRef<HTMLDivElement>(null);

  const questionClass = isDark
    ? 'text-brand-yellow font-bold'
    : 'text-brand-navy font-bold';

  const cursorColor = currentItem.isQuestion
    ? (isDark ? 'bg-brand-yellow' : 'bg-brand-navy')
    : 'bg-white';

  // Close lang dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
      if (mobileLangDropdownRef.current && !mobileLangDropdownRef.current.contains(e.target as Node)) {
        setMobileLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = LANG_OPTIONS.find(l => l.value === locale)!;

  const triggerScroll = (targetId: string) => {
    const id = targetId.startsWith('#') ? targetId.substring(1) : targetId;
    window.dispatchEvent(new CustomEvent('scrollToSection', { detail: { id } }));
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-7xl mx-auto glass-navbar rounded-[2rem] shadow-lg overflow-visible"
      >
        <div className="px-6 sm:px-8">
          <div className="flex justify-between items-center h-14">

            {/* Typewriter Brand / Question */}
            <div
              className="cursor-pointer min-w-[130px] sm:min-w-[180px] flex items-center"
              onClick={() => triggerScroll('hero')}
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
                className={`${isRTL ? 'mr-[1px]' : 'ml-[1px]'} inline-block w-[2px] h-[1em] align-middle ${cursorColor} ${
                  showCursor ? 'opacity-100' : 'opacity-0'
                } transition-opacity duration-75`}
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              {menuItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-white/80 hover:text-brand-yellow transition-colors text-sm font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    triggerScroll(item.href);
                  }}
                >
                  {t.navbar.menu[item.key]}
                </a>
              ))}

              {/* Language Switcher — Desktop */}
              <div ref={langDropdownRef} className="relative">
                <button
                  onClick={() => setLangOpen(o => !o)}
                  className="flex items-center gap-1.5 text-white/80 hover:text-brand-yellow transition-colors text-sm font-medium focus:outline-none"
                >
                  <Globe className="w-4 h-4" />
                  <span>{currentLang.label}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className={`absolute top-full mt-2 ${isRTL ? 'left-0' : 'right-0'} min-w-[180px] rounded-2xl overflow-hidden z-[100]`}
                      style={{
                        background: 'rgba(11,25,44,0.97)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
                      }}
                    >
                      {LANG_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => { setLocale(opt.value); setLangOpen(false); }}
                          className={`w-full px-4 py-3 text-sm font-medium flex items-center justify-center text-center transition-all duration-150 ${
                            locale === opt.value
                              ? 'bg-brand-yellow text-brand-navy'
                              : 'text-white/80 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <span>{opt.native}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Button
                size="sm"
                className="!bg-brand-yellow !text-white hover:!bg-yellow-600 border-none"
                onClick={() => triggerScroll('waitlist')}
              >
                {t.navbar.cta}
              </Button>
            </div>

            {/* Mobile Actions: Language Dropdown + Menu Button */}
            <div className="flex md:hidden items-center gap-3">
              {/* Language Switcher — Mobile Outer */}
              <div ref={mobileLangDropdownRef} className="relative">
                <button
                  onClick={() => setMobileLangOpen(o => !o)}
                  className="flex items-center gap-1 text-white/85 hover:text-brand-yellow transition-colors text-xs font-bold focus:outline-none py-1.5 px-2.5 rounded-full bg-white/5 border border-white/10"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{currentLang.label}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${mobileLangOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className={`absolute top-full mt-2 ${isRTL ? 'left-0' : 'right-0'} min-w-[160px] rounded-2xl overflow-hidden z-[100]`}
                      style={{
                        background: 'rgba(11,25,44,0.97)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
                      }}
                    >
                      {LANG_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => { setLocale(opt.value); setMobileLangOpen(false); }}
                          className={`w-full px-4 py-3 text-xs font-bold flex items-center justify-center text-center transition-all duration-150 ${
                            locale === opt.value
                              ? 'bg-brand-yellow text-brand-navy'
                              : 'text-white/80 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <span>{opt.native}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

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
              className="md:hidden border-t border-white/10 bg-brand-navy/95 backdrop-blur-md rounded-b-[2rem] overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-4">
                {menuItems.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    className="text-white/80 hover:text-brand-yellow transition-colors text-base font-medium py-1"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                      setTimeout(() => {
                        triggerScroll(item.href);
                      }, 50);
                    }}
                  >
                    {t.navbar.menu[item.key]}
                  </a>
                ))}

                <Button
                  size="sm"
                  className="!bg-brand-yellow !text-white hover:!bg-yellow-600 border-none w-full mt-2"
                  onClick={() => {
                    setIsOpen(false);
                    setTimeout(() => {
                      triggerScroll('waitlist');
                    }, 50);
                  }}
                >
                  {t.navbar.cta}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
