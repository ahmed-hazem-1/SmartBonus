import React from 'react';
import { ShieldCheck } from 'lucide-react';

export function Trust() {
  return (
    <section className="py-16 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-white rounded-full border border-gray-100 mb-6 shadow-sm">
           <ShieldCheck className="w-6 h-6 text-brand-navy" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-4">
          Trusted Market Expertise
        </h2>
        <p className="text-brand-gray max-w-2xl mx-auto text-lg">
          Smart Bonus operates with the solid operational backing of 
          <span className="font-bold text-brand-navy"> Al Farouk Group</span>, 
          bringing years of market reliability, supply chain excellence, and business trust to a modern digital platform.
        </p>
      </div>
    </section>
  );
}
