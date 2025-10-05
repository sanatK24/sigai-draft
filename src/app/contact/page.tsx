"use client";

import { useState } from 'react';
import { Mail, MapPin, Phone, Send, Instagram, Linkedin, Facebook } from 'lucide-react';
import { GlassIcon } from '@/components/ui/glass-icon';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-black">
      {/* Map Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40"></div>
        {/* Map Pin */}
        <div className="absolute top-1/3 left-1/3 text-white/20">
          <MapPin size={32} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 md:pt-32 pb-8 md:pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 text-white">
            Contact us
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 py-6 md:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-6 md:gap-8">
            {/* Contact Form - Takes full width on mobile, 3 columns on large screens */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 text-black">
                <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">FEEDBACK </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="sr-only">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-300 focus:border-gray-800 focus:outline-none text-gray-800 placeholder-gray-500 transition-all text-sm sm:text-base"
                      placeholder="Name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="sr-only">
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-300 focus:border-gray-800 focus:outline-none text-gray-800 placeholder-gray-500 transition-all text-sm sm:text-base"
                      placeholder="E-mail"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="sr-only">
                      Phone
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-300 focus:border-gray-800 focus:outline-none text-gray-800 placeholder-gray-500 transition-all text-sm sm:text-base"
                      placeholder="Phone"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="sr-only">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-300 focus:border-gray-800 focus:outline-none text-gray-800 placeholder-gray-500 transition-all resize-none text-sm sm:text-base"
                      placeholder="Message"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 sm:px-6 py-2 sm:py-3 rounded-md bg-black text-white hover:bg-gray-800 transition-all duration-300 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          SEND MESSAGE <Send className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                        </>
                      )}
                    </button>
                  </div>
                  {submitStatus === 'success' && (
                    <div className="p-3 sm:p-4 bg-green-50 border border-green-200 text-green-700 text-center text-sm sm:text-base">
                      Message sent successfully! We'll get back to you soon.
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Contact Information - Takes full width on mobile, 2 columns on large screens */}
            <div className="lg:col-span-2 text-white mt-8 lg:mt-0">
              {/* Contact Details */}
              <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-white">OUR ADDRESS</h2>
                
                <div className="space-y-2 md:space-y-4">
                  <p className="text-white/70 leading-relaxed text-sm md:text-base">
                  Ramrao Adik Institute Of Technology<br />
                  Nerul, Navi Mumbai
                </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-white">OUR CONTACTS</h2>
                
                <div className="space-y-1 md:space-y-2">
                  <p className="text-white/70 text-sm md:text-base">
                    raitacmsigai@gmail.com
                  </p>
                  <p className="text-white/70 text-sm md:text-base">
                    +91 83698 24033
                  </p>
                  <p className="text-white/70 text-sm md:text-base">
                    +91 85918 06560
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-white">— follow us</h2>
                
                <div className="flex gap-3 md:gap-4">
                  <a href="#" className="text-white/50 hover:text-white transition-colors">
                    <Facebook className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                  <a href="#" className="text-white/50 hover:text-white transition-colors">
                    <Instagram className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                  <a href="#" className="text-white/50 hover:text-white transition-colors">
                    <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                  <a href="#" className="text-white/50 hover:text-white transition-colors">
                    <Mail className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Removed the decorative elements */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                  <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800">Business Hours</h2>
                  
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-xs sm:text-sm">Monday - Friday</span>
                      <span className="font-medium text-gray-800 text-xs sm:text-sm">9:00 AM - 6:00 PM</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-xs sm:text-sm">Saturday</span>
                      <span className="font-medium text-gray-800 text-xs sm:text-sm">10:00 AM - 4:00 PM</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-xs sm:text-sm">Sunday</span>
                      <span className="font-medium text-gray-800 text-xs sm:text-sm">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-4 sm:p-6 h-full flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">Contact Us</h3>
                    <p className="text-white/70 mb-4 sm:mb-6 text-sm sm:text-base">
                      Have questions or need assistance? Our team is here to help you with any inquiries you may have.
                    </p>
                    <button className="bg-white text-black px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-gray-100 transition-all duration-300 font-medium text-sm sm:text-base">
                      Get in Touch
                    </button>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative z-10 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 mb-12 sm:mb-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-white">Find Us</h2>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden p-2 sm:p-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.3737851164996!2d37.61763531593084!3d55.75582600000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a5a738fa419%3A0x7c347d506f527155!2sRed%20Square!5e0!3m2!1sen!2sru!4v1641234567890!5m2!1sen!2sru"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
