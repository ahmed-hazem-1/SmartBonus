// Data and configuration for the Navbar brand typewriter

export const brandCycle = [
  { text: 'Smart Bonus', isQuestion: false },
  { text: 'Tired of stock shortages?', isQuestion: true },
  { text: 'Smart Bonus', isQuestion: false },
  { text: 'Paying too much per item?', isQuestion: true },
  { text: 'Smart Bonus', isQuestion: false },
  { text: 'Find better suppliers?', isQuestion: true },
];

export const menuItems = [
  { label: 'Home', href: '#hero' },
  { label: 'Partner', href: '#partner' },
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
];

// Sections with a dark background (used to invert question text color)
export const darkSections = new Set(['hero', 'how-it-works']);

// All page section IDs in scroll order
export const allSections = ['hero', 'partner', 'features', 'how-it-works', 'waitlist', 'footer'];

// Typewriter timing
export const TYPE_SPEED  = 55;   // ms per character typed
export const ERASE_SPEED = 30;   // ms per character erased
export const MS_PER_CHAR = 100;  // reading time per character
export const MIN_DISPLAY = 1500; // minimum display duration (ms)
