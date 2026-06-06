// Navigation menu structure — labels come from i18n translations
export const menuItems = [
  { key: 'home' as const, href: '#hero' },
  { key: 'partner' as const, href: '#partner' },
  { key: 'features' as const, href: '#features' },
  { key: 'howItWorks' as const, href: '#how-it-works' },
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
