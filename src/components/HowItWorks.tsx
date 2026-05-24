import React from 'react';

const steps = [
  {
    step: "01",
    title: "Request Access",
    description: "Join our waitlist to be among the first verified businesses admitted to the platform."
  },
  {
    step: "02",
    title: "Smart Search",
    description: "Enter your required items. The engine instantly groups, compares, and highlights the best offers."
  },
  {
    step: "03",
    title: "Optimize & Order",
    description: "Review shortages, accept smart alternative suggestions, and route orders to suppliers with one click."
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 text-white min-h-screen flex items-center gradient-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            How It Works
          </h2>
          <p className="text-lg text-gray-400">
            A seamless bridge between healthcare providers and suppliers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-px bg-white/10" />
          
          {steps.map((item, idx) => (
            <div key={idx} className="relative flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-brand-navy border-2 border-brand-yellow flex items-center justify-center text-xl font-bold text-brand-yellow z-10 shadow-[0_0_0_8px_var(--navy)]">
                {item.step}
              </div>
              <h3 className="text-xl font-bold mt-8 mb-4">
                {item.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
