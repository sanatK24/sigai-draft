"use client";

import { useState } from 'react';
import { Mail, MapPin, Phone, Send, ArrowUpRight, CheckCircle, Sparkles } from 'lucide-react';
import { SparklesCore } from '@/components/ui/sparkles';

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
    <main className="min-h-screen bg-black text-white relative overflow-hidden select-none">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] pointer-events-none" />
      
      {/* Spotlight Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] -z-10 pointer-events-none" />

      {/* Hero Section with Spotlight */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-medium text-white/80 select-none">
              <Sparkles className="w-3 h-3" />
              Get in Touch
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 select-none py-4">
          
            Let's Create
            <br />
            Something Amazing
          </h1>
          <p className="text-xl text-white/60 max-w-2xl leading-relaxed select-none">
            Have questions or want to collaborate? We'd love to hear from you.
            <br />
            Reach out and we'll respond as soon as possible.
          </p>
 
          {/* Sparkles Effect Below Hero Text */}
          <div className="relative w-full h-40 mt-12 pointer-events-none">
             <SparklesCore
          background="transparent"
          minSize={0.3}
          maxSize={1.4}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
        
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Main Content - Bento Grid Style */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Contact Info Cards - Left Side */}
            <div className="lg:col-span-2 space-y-6">
              {/* Email Card with Glow Effect */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500 pointer-events-none" />
                <div className="relative bg-black border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4 select-none">
                    <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20">
                      <Mail className="h-5 w-5 text-blue-400" />
                    </div>
                    <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Email</span>
                  </div>
                  <a 
                    href="mailto:raitacmsigai@gmail.com"
                    className="text-xl font-semibold text-white hover:text-blue-400 transition-colors inline-flex items-center gap-2 select-text break-all"
                  >
                    raitacmsigai@gmail.com
                    <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0" />
                  </a>
                </div>
              </div>

              {/* Phone Card with Glow Effect */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500 pointer-events-none" />
                <div className="relative bg-black border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4 select-none">
                    <div className="p-2.5 bg-purple-500/10 rounded-xl border border-purple-500/20">
                      <Phone className="h-5 w-5 text-purple-400" />
                    </div>
                    <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Phone</span>
                  </div>
                  <div className="space-y-2">
                    <a 
                      href="tel:+918369824033"
                      className="text-xl font-semibold text-white hover:text-purple-400 transition-colors inline-flex items-center gap-2 select-text"
                    >
                      +91 83698 24033
                      <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all" />
                    </a>
                    <br />
                    <a 
                      href="tel:+918591806560"
                      className="text-xl font-semibold text-white hover:text-purple-400 transition-colors inline-flex items-center gap-2 select-text"
                    >
                      +91 85918 06560
                      <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500 pointer-events-none" />
                <div className="relative bg-black border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4 select-none">
                    <div className="p-2.5 bg-pink-500/10 rounded-xl border border-pink-500/20">
                      <MapPin className="h-5 w-5 text-pink-400" />
                    </div>
                    <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Location</span>
                  </div>
                  <p className="text-base text-white/70 leading-relaxed select-text">
                    Ramrao Adik Institute Of Technology<br />
                    Nerul, Navi Mumbai
                  </p>
                </div>
              </div>

              {/* Social Links Card */}
              <div className="relative bg-black border border-white/10 rounded-2xl p-6">
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-6 select-none">Connect With Us</p>
                <div className="flex gap-3">
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 flex items-center justify-center group"
                  >
                    <svg className="h-6 w-6 text-white/60 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 flex items-center justify-center group"
                  >
                    <svg className="h-6 w-6 text-white/60 group-hover:text-pink-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 flex items-center justify-center group"
                  >
                    <svg className="h-6 w-6 text-white/60 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form - Right Side with Aceternity Style */}
            <div className="lg:col-span-3">
              {submitStatus === 'success' ? (
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl opacity-75 blur" />
                  <div className="relative bg-black border border-green-500/20 rounded-3xl p-12 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/10 rounded-full mb-6 border border-green-500/20">
                      <CheckCircle className="h-10 w-10 text-green-400" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-white/60 mb-8 text-lg">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitStatus('idle')}
                      className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white font-medium transition-all duration-300"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-75 blur transition-all duration-500" />
                  <div className="relative bg-black border border-white/10 rounded-3xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-3">
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/30 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                            placeholder="John Doe"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-3">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/30 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-white/70 mb-3">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/30 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                          placeholder="How can we help you?"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-3">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/30 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 resize-none"
                          placeholder="Tell us more about your project or inquiry..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative w-full px-8 py-4 rounded-xl font-semibold overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative flex items-center justify-center gap-2 text-white">
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </span>
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Office Hours with Grid Background */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 select-none">
              Office Hours
            </h2>
            <p className="text-white/60 text-lg select-none">When you can find us</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500" />
              <div className="relative bg-black border border-white/10 rounded-2xl p-8 text-center hover:border-white/20 transition-all duration-300">
                <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Monday - Friday</h3>
                <p className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">9:00 AM - 5:00 PM</p>
                <p className="text-white/60">Full support available</p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500" />
              <div className="relative bg-black border border-white/10 rounded-2xl p-8 text-center hover:border-white/20 transition-all duration-300">
                <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Saturday</h3>
                <p className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">10:00 AM - 2:00 PM</p>
                <p className="text-white/60">Limited hours</p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500" />
              <div className="relative bg-black border border-white/10 rounded-2xl p-8 text-center hover:border-white/20 transition-all duration-300">
                <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Sunday</h3>
                <p className="text-3xl font-bold mb-2 text-white/40">Closed</p>
                <p className="text-white/60">We'll be back Monday</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Aceternity Style */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 select-none">
              Visit Our Campus
            </h2>
            <p className="text-white/60 text-lg select-none">Come say hello in person</p>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-50 group-hover:opacity-75 blur-xl transition-all duration-500" />
            <div className="relative bg-black border border-white/10 rounded-3xl p-4 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.4399542017673!2d73.02312567520453!3d19.04438468215365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c3db00160053%3A0x95e9ca007676b993!2sRamrao%20Adik%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1759851389836!5m2!1sen!2sin"
                width="100%"
                height="500"
                style={{ border: 0, borderRadius: '1.5rem' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
                title="RAIT Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
