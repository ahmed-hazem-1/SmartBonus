import React from 'react';
import { Building2, Search, ArrowRightLeft, Zap } from 'lucide-react';

const features = [
  {
    icon: <Search className="w-6 h-6 text-brand-yellow" />,
    title: "Automatic Supplier Comparison",
    description: "Our smart engine compares prices and availability across multiple trusted suppliers instantly."
  },
  {
    icon: <Zap className="w-6 h-6 text-brand-yellow" />,
    title: "Better Price Discovery",
    description: "Remove the guesswork from procurement. Spot market trends and secure the best deals faster."
  },
  {
    icon: <ArrowRightLeft className="w-6 h-6 text-brand-yellow" />,
    title: "Alternative Suggestions",
    description: "When items overlap or face shortages, the platform suggests viable alternatives."
  },
  {
    icon: <Building2 className="w-6 h-6 text-brand-yellow" />,
    title: "Faster Decisions",
    description: "Centralized dashboards help you analyze shortages and finalize purchase orders in minutes."
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden min-h-screen flex items-center gradient-light">
      {/* Subtle background blob for glass effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-yellow/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-navy/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="glass-card rounded-[2rem] aspect-square flex items-center justify-center p-8 relative overflow-hidden order-2 lg:order-1 group">
            <div className="w-full h-full rounded-2xl border border-white/50 bg-white/40 shadow-sm flex flex-col items-center justify-center p-8 relative z-10 backdrop-blur-md transition-transform duration-500 group-hover:scale-[1.02]">
              <Search className="w-24 h-24 text-brand-navy/20 mb-6" />
              <div className="w-48 h-4 bg-white/60 rounded-full mb-3" />
              <div className="w-32 h-4 bg-white/60 rounded-full" />
            </div>
            {/* Soft background glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-yellow/10 to-transparent z-0" />
          </div>

          <div className="space-y-10 order-1 lg:order-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                Smart Comparison Engine
              </h2>
              <p className="text-lg text-brand-gray">
                A comprehensive set of smart tools for smarter sourcing. We streamline business procurement so you can focus on running your pharmacy or clinic.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <div key={idx} className="glass-card p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-xl bg-white/60 border border-white flex items-center justify-center shadow-sm mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-brand-navy mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-brand-gray text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
