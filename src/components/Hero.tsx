import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/Button';
import { ArrowRight, Play, LayoutDashboard } from 'lucide-react';
import { PhoneMockup } from './PhoneMockup';

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-end pb-16 pt-20 overflow-hidden fluid-bg-container">
      {/* Fluid marble blobs */}
      <div className="fluid-blob" style={{ width: '60%', height: '70%', top: '-10%', left: '-10%', background: 'radial-gradient(circle, #d97706 0%, #b45309 40%, transparent 70%)', animation: 'blob1 15s ease-in-out infinite' }} />
      <div className="fluid-blob" style={{ width: '50%', height: '60%', bottom: '-15%', right: '-5%', background: 'radial-gradient(circle, #fbbf24 0%, #d97706 35%, transparent 70%)', animation: 'blob2 17s ease-in-out infinite' }} />
      <div className="fluid-blob" style={{ width: '45%', height: '55%', top: '20%', right: '15%', background: 'radial-gradient(circle, #0c4a6e 0%, #0b3142 50%, transparent 70%)', animation: 'blob3 13s ease-in-out infinite' }} />
      <div className="fluid-blob" style={{ width: '55%', height: '50%', bottom: '5%', left: '20%', background: 'radial-gradient(circle, #164e63 0%, #083344 45%, transparent 70%)', animation: 'blob4 18s ease-in-out infinite' }} />
      <div className="fluid-blob" style={{ width: '35%', height: '40%', top: '40%', left: '5%', background: 'radial-gradient(circle, #f59e0b 0%, #92400e 40%, transparent 70%)', animation: 'blob2 14s ease-in-out infinite reverse' }} />
      <div className="fluid-blob" style={{ width: '40%', height: '45%', top: '5%', right: '30%', background: 'radial-gradient(circle, #0e7490 0%, #155e75 50%, transparent 70%)', animation: 'blob1 16s ease-in-out infinite reverse' }} />

      {/* Glass overlay over the fluid background */}
      <div className="absolute inset-0 glass-hero z-10 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-end">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-8 self-end"
          >
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium border border-white/20 backdrop-blur-sm">
                Powered by Al Farouk Group
              </span>
              <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                Smart Procurement for <span className="text-brand-yellow drop-shadow-lg">Pharmacies & Clinics</span>
              </h1>
              <p className="text-lg text-white/90 max-w-xl leading-relaxed font-medium">
                Discover better prices, analyze shortages, and make faster purchasing decisions with an AI-assisted B2B sourcing platform built for healthcare businesses.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col space-y-6 w-full self-center"
          >
            {/* Mobile App Mockup Carousel */}
            <PhoneMockup />

            {/* Separated action and stats div */}
            <div className="flex flex-col space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* <Button size="lg" className="group bg-brand-yellow hover:bg-yellow-600 text-white border-none shadow-lg w-full sm:w-auto" onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}>
                  Reserve Early Access
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button> */}
              </div>
{/*               
              <div className="pt-6 border-t border-white/20 flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white drop-shadow-md">100+</span>
                  <span className="text-sm text-white/80">Pharmacies Ready</span>
                </div>
                <div className="w-px h-10 bg-white/20"></div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white drop-shadow-md">Fast</span>
                  <span className="text-sm text-white/80">Supplier Discovery</span>
                </div>
              </div> */}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
