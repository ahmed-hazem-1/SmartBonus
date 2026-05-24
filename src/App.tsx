/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Trust } from './components/Trust';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { Waitlist } from './components/Waitlist';
import { Footer } from './components/Footer';

export default function App() {
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

