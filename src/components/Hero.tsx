import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/Button';
import { ArrowRight, Play, LayoutDashboard } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-8"
          >
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-gray-50 text-brand-gray text-sm font-medium border border-gray-100">
                Powered by Al Farouk Group
              </span>
              <h1 className="text-5xl lg:text-6xl font-bold text-brand-navy leading-tight">
                Smart Procurement for <span className="text-brand-yellow">Pharmacies & Clinics</span>
              </h1>
              <p className="text-lg text-brand-gray max-w-xl leading-relaxed">
                Discover better prices, analyze shortages, and make faster purchasing decisions with an AI-assisted B2B sourcing platform built for healthcare businesses.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group" onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}>
                Reserve Early Access
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            <div className="pt-8 border-t border-gray-100 flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-brand-navy">100+</span>
                <span className="text-sm text-brand-gray">Pharmacies Ready</span>
              </div>
              <div className="w-px h-10 bg-gray-100"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-brand-navy">Fast</span>
                <span className="text-sm text-brand-gray">Supplier Discovery</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative lg:h-[600px] w-full aspect-square md:aspect-video lg:aspect-auto flex items-center justify-center rounded-[2rem] bg-gray-50 border border-gray-200 p-8 overflow-hidden group shadow-sm"
          >
            {/* Soft background glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-yellow/5 to-transparent z-0" />
            
            {/* Mock Visual Content */}
            <div className="w-full max-w-sm text-center relative z-10 flex flex-col items-center">
               <div className="w-32 h-32 bg-white rounded-[2rem] shadow-sm border border-gray-200 mx-auto mb-8 flex items-center justify-center">
                  <LayoutDashboard className="w-12 h-12 text-brand-navy/20" />
               </div>
               <h3 className="text-2xl font-bold text-brand-navy mb-3">Smart App Demo</h3>
               <p className="text-brand-gray mb-8">Platform Preview Visual</p>
               
               <div className="w-64 h-3 bg-gray-200 rounded-full mx-auto mb-4" />
               <div className="w-48 h-3 bg-gray-200 rounded-full mx-auto" />
            </div>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 cursor-pointer">
               <button className="w-24 h-24 bg-brand-navy text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                 <Play className="w-10 h-10 ml-2" fill="currentColor" />
               </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
