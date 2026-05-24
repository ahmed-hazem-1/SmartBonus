import React from 'react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-brand-navy mb-2">Smart Bonus</h2>
          <p className="text-sm text-brand-gray">
            Powered by <span className="font-semibold">Al Farouk Group</span>
          </p>
        </div>

        <div className="w-24 h-px bg-gray-200 mb-8" />
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12">
          <a href="#features" className="text-brand-gray hover:text-brand-navy transition-colors text-sm font-medium">Features</a>
          <a href="#how-it-works" className="text-brand-gray hover:text-brand-navy transition-colors text-sm font-medium">How it works</a>
          <a href="#waitlist" className="text-brand-gray hover:text-brand-navy transition-colors text-sm font-medium">Waitlist</a>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-400">
          <div className="flex gap-4">
            <a href="#" className="hover:text-brand-navy transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-navy transition-colors">Terms of Service</a>
          </div>
          <span className="hidden md:inline text-gray-200">|</span>
          <p>© {new Date().getFullYear()} Smart Bonus. All rights reserved.</p>
        </div>
        
      </div>
    </footer>
  );
}
