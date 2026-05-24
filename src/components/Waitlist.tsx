import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/Button';
import { ChevronDown } from 'lucide-react';

// ⚠️ REPLACE THIS with your deployed Google Apps Script Web App URL
// Follow the setup guide in the artifacts to get this URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz2fTaQwOPTonn-gGyTMCH1rzADQPF0J5iXXUFCLb5zY3tA6qFxLLarxUVHwP4vJm0r/exec';

export function Waitlist() {
  const [formData, setFormData] = useState({
    businessName: '',
    phone: '',
    city: '',
    activity: 'Pharmacy'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const activityOptions = ['Pharmacy', 'Clinic', 'Supplier'];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // With no-cors mode, we can't read the response, but if fetch
      // didn't throw, the request was sent successfully
      setIsSubmitted(true);
    } catch (err) {
      console.error('Waitlist submission error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="waitlist" className="py-24 relative overflow-hidden min-h-screen flex items-center gradient-light">
      {/* Subtle background blob for glass effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="glass-card rounded-[2rem] p-10 md:p-16 flex flex-col items-center text-center">

          {isSubmitted ? (
            <div className="py-12">
              <div className="w-16 h-16 bg-green-50/80 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
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
                <div className="w-24 h-1 bg-brand-yellow/50 mx-auto rounded-full mb-6"></div>
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
                    className="w-full px-5 py-4 rounded-full border border-white/40 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all bg-white/60 backdrop-blur-sm text-brand-navy shadow-sm"
                    value={formData.businessName}
                    onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                  />
                  <input
                    required
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-5 py-4 rounded-full border border-white/40 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all bg-white/60 backdrop-blur-sm text-brand-navy shadow-sm"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="grid md:grid-cols-[1fr_1fr_auto] gap-4 items-center">
                  <input
                    required
                    type="text"
                    placeholder="City / location"
                    className="w-full px-5 py-4 rounded-full border border-white/40 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all bg-white/60 backdrop-blur-sm text-brand-navy shadow-sm"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                  />

                  {/* Custom dropdown */}
                  <div ref={dropdownRef} className="relative w-full">
                    {/* Trigger */}
                    <button
                      type="button"
                      onClick={() => setDropdownOpen((o) => !o)}
                      className="w-full px-5 py-4 rounded-full border border-white/40 bg-white/60 backdrop-blur-sm text-brand-navy shadow-sm flex items-center justify-between gap-2 focus:outline-none focus:ring-2 focus:ring-brand-yellow transition-all"
                    >
                      <span className="font-medium">{formData.activity}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-brand-navy/60 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* Dropdown panel */}
                    {dropdownOpen && (
                      <div
                        className="absolute z-50 mt-2 w-full rounded-2xl overflow-hidden"
                        style={{
                          background: 'rgba(11,25,44,0.96)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          boxShadow: '0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(217,119,6,0.15)',
                        }}
                      >
                        {activityOptions.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, activity: opt });
                              setDropdownOpen(false);
                            }}
                            className={`w-full text-left px-5 py-3.5 text-sm font-bold transition-all duration-150 ${formData.activity === opt
                                ? 'bg-brand-yellow text-brand-navy'
                                : 'text-white/80 hover:bg-white/5 hover:text-white'
                              }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className={`w-full md:w-auto h-full min-h-[56px] px-10 shadow-md hover:-translate-y-0.5 transition-transform ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      'Join Waitlist'
                    )}
                  </Button>
                </div>

                {error && (
                  <p className="text-red-500 text-sm text-center mt-2">{error}</p>
                )}
              </form>
            </>
          )}

        </div>
      </div>
    </section>
  );
}
