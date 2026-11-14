/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useSectionNavigation } from './hooks/useSectionNavigation';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Trust } from './components/Trust';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { Download } from './components/Download';
import { Waitlist } from './components/Waitlist';
import { Footer } from './components/Footer';

export default function App() {
  useSectionNavigation();

  return (
    <div className="min-h-screen bg-white selection:bg-brand-accent/30 selection:text-brand-navy">
      <Navbar />
      <main>
        <Hero />
        <Trust />
        <Features />
        <HowItWorks />
        <Download />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}

