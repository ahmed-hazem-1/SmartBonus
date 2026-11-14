import { useEffect } from 'react';

/**
 * Handles the 'scrollToSection' CustomEvent.
 * - If the section exists on the current page, smooth-scroll to it.
 * - Otherwise (e.g. on /privacy/), navigate to the homepage section: /#id.
 * Also scrolls to a '#id' hash on load (used after the fallback navigation).
 */
export function useSectionNavigation() {
  useEffect(() => {
    const handleCustomScroll = (e: Event) => {
      const id = (e as CustomEvent<{ id: string }>).detail?.id;
      if (!id) return;
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.assign('/#' + id);
      }
    };

    window.addEventListener('scrollToSection', handleCustomScroll);

    // Arriving via /#section from another page: scroll after React has rendered.
    let timer: number | undefined;
    const hash = window.location.hash.slice(1);
    if (hash) {
      timer = window.setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }

    return () => {
      window.removeEventListener('scrollToSection', handleCustomScroll);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);
}
