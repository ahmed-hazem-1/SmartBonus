import React, { useState } from 'react';
import { Button } from './ui/Button';

export function Waitlist() {
  const [formData, setFormData] = useState({
    businessName: '',
    phone: '',
    city: '',
    activity: 'Pharmacy'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setIsSubmitted(true);
  };

  return (
    <section id="waitlist" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 rounded-[2rem] border border-gray-100 p-10 md:p-16 flex flex-col items-center text-center">
          
          {isSubmitted ? (
            <div className="py-12">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
                 <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                 </svg>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-2">You're on the list!</h3>
              <p className="text-brand-gray max-w-md mx-auto">Thank you for your interest. We will contact you soon with early access details.</p>
            </div>
          ) : (
            <>
              <div className="mb-10 max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                  Be One of the First Onboarded
                </h2>
                <div className="w-24 h-1 bg-brand-yellow/30 mx-auto rounded-full mb-6"></div>
                <p className="text-brand-gray text-lg">
                  Register your interest now to secure early access and priority setup for your business.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input 
                    required
                    type="text" 
                    placeholder="Pharmacy / Business Name"
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all bg-white text-brand-navy"
                    value={formData.businessName}
                    onChange={e => setFormData({...formData, businessName: e.target.value})}
                  />
                  <input 
                    required
                    type="tel" 
                    placeholder="Phone Number"
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all bg-white text-brand-navy"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div className="grid md:grid-cols-[1fr_1fr_auto] gap-4 items-center">
                  <input 
                    required
                    type="text" 
                    placeholder="City / location"
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all bg-white text-brand-navy"
                    value={formData.city}
                    onChange={e => setFormData({...formData, city: e.target.value})}
                  />
                  
                  <select 
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all bg-white text-brand-navy appearance-none"
                    value={formData.activity}
                    onChange={e => setFormData({...formData, activity: e.target.value})}
                  >
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Clinic">Clinic</option>
                    <option value="Supplier">Supplier</option>
                  </select>

                  <Button type="submit" size="lg" className="w-full md:w-auto h-full min-h-[56px] rounded-xl px-10">
                    Join Waitlist
                  </Button>
                </div>
              </form>
            </>
          )}

        </div>
      </div>
    </section>
  );
}
