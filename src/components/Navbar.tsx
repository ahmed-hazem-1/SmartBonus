import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/Button';

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass-navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold tracking-tight text-brand-navy">
              Smart Bonus
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-brand-gray hover:text-brand-navy transition-colors text-sm font-medium">Features</a>
            <a href="#how-it-works" className="text-brand-gray hover:text-brand-navy transition-colors text-sm font-medium">How it works</a>
            <Button size="sm" onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}>
              Join the Waitlist
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
