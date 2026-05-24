import React from 'react';
import { Building2, Search, ArrowRightLeft, Zap } from 'lucide-react';

const features = [
  {
    icon: <Search className="w-5 h-5 text-brand-yellow" />,
    title: "Automatic Supplier Comparison",
    description: "Our smart engine compares prices and availability across multiple trusted suppliers instantly."
  },
  {
    icon: <Zap className="w-5 h-5 text-brand-yellow" />,
    title: "Better Price Discovery",
    description: "Remove the guesswork from procurement. Spot market trends and secure the best deals faster."
  },
  {
    icon: <ArrowRightLeft className="w-5 h-5 text-brand-yellow" />,
    title: "Alternative Suggestions",
    description: "When items overlap or face shortages, the platform suggests viable alternatives."
  },
  {
    icon: <Building2 className="w-5 h-5 text-brand-yellow" />,
    title: "Faster Decisions",
    description: "Centralized dashboards help you analyze shortages and finalize purchase orders in minutes."
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="bg-gray-50 rounded-[2rem] border border-gray-100 aspect-square flex items-center justify-center p-8 relative overflow-hidden order-2 lg:order-1">
            <div className="w-full h-full rounded-2xl border border-gray-200 bg-white shadow-sm flex flex-col items-center justify-center p-8 relative z-10">
              <Search className="w-24 h-24 text-gray-200 mb-6" />
              <div className="w-48 h-4 bg-gray-100 rounded-full mb-3" />
              <div className="w-32 h-4 bg-gray-100 rounded-full" />
            </div>
            {/* Soft background glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-yellow/5 to-transparent z-0" />
          </div>

          <div className="space-y-12 order-1 lg:order-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                Smart Comparison Engine
              </h2>
              <p className="text-lg text-brand-gray">
                A comprehensive set of smart tools for smarter sourcing. We streamline business procurement so you can focus on running your pharmacy or clinic.
              </p>
            </div>

            <div className="space-y-8">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-5 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shadow-sm group-hover:border-brand-yellow/50 transition-colors">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-navy mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-brand-gray leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
