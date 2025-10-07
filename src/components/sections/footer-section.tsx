"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, X } from 'lucide-react';

const Footer = () => {
  return (
    <div className="relative bg-black pt-20 pb-10 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[1200px] h-[400px] bg-primary/20 rounded-full blur-3xl opacity-60"
        />
        <div 
          className="absolute bottom-[-150px] left-1/4 -translate-x-1/2 w-[1000px] h-[350px] bg-accent/10 rounded-full blur-3xl opacity-50"
        />
      </div>
      
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Logo and About */}
          <div className="space-y-6">
            <div className="relative w-fit">
              <div className="pointer-events-none absolute -inset-6 rounded-full blur-3xl opacity-40" style={{ backgroundImage: 'linear-gradient(90deg, #3b4fde, #8b5cf6)' }} />
              <Image
                src="/img/sigai-logo.png"
                alt="RAIT ACM SIGAI Student Chapter"
                width={200}
                height={40}
                className="relative w-[160px] h-auto"
              />
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              The RAIT ACM SIGAI Student Chapter is dedicated to fostering AI education, research, and innovation among students at Ramrao Adik Institute of Technology.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="group">
                <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-black/60 group-hover:scale-110 group-hover:border-white/20 shadow-lg">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="group">
                <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-black/60 group-hover:scale-110 group-hover:border-white/20 shadow-lg">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="url(#footer-instagram-gradient)">
                    <defs>
                      <linearGradient id="footer-instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: '#FD5949' }} />
                        <stop offset="50%" style={{ stopColor: '#D6249F' }} />
                        <stop offset="100%" style={{ stopColor: '#285AEB' }} />
                      </linearGradient>
                    </defs>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </div>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="group">
                <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-black/60 group-hover:scale-110 group-hover:border-white/20 shadow-lg">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#0A66C2">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="group">
                <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-black/60 group-hover:scale-110 group-hover:border-white/20 shadow-lg">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#fff">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:pl-8">
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#about" className="text-text-secondary hover:text-white transition-colors text-sm">About Us</a></li>
              <li><a href="#domains" className="text-text-secondary hover:text-white transition-colors text-sm">Domains</a></li>
              <li><a href="#events" className="text-text-secondary hover:text-white transition-colors text-sm">Events</a></li>
              <li><a href="#team" className="text-text-secondary hover:text-white transition-colors text-sm">Our Team</a></li>
              <li><a href="#contact" className="text-text-secondary hover:text-white transition-colors text-sm">Contact</a></li>
              <li><a href="/blog" className="text-text-secondary hover:text-white transition-colors text-sm">Blog</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-0.5 flex-shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="text-text-secondary">
                  Ramrao Adik Institute Of Technology,<br />
                  Nerul, Navi Mumbai
                </span>
              </li>
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <div className="flex flex-col">
                  <a href="tel:+918369824033" className="text-text-secondary hover:text-white transition-colors">+91 83698 24033</a>
                  <a href="tel:+918591806560" className="text-text-secondary hover:text-white transition-colors">+91 85918 06560</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <a href="mailto:raitacmsigai@gmail.com" className="text-text-secondary hover:text-white transition-colors">raitacmsigai@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Other ACM Chapters Section */}
        <div className="flex flex-col items-center mt-12 mb-12">
          <div className="bg-white/10 backdrop-blur-sm text-white text-xs font-medium px-4 py-1.5 rounded-full border border-white/20 mb-3">
            Other ACM Chapters
          </div>
          <div className="flex items-center justify-center gap-6">
            <a 
              href="https://rait.acm.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-16 h-16 hover:opacity-80 transition-opacity"
              aria-label="RAIT ACM Student Chapter"
            >
              <Image
                src="/img/ACMSCWhite.png"
                alt="RAIT ACM Student Chapter"
                width={64}
                height={64}
                className="w-full h-full object-contain"
              />
            </a>
            <a 
              href="https://rait-w.acm.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-16 h-16 hover:opacity-80 transition-opacity"
              aria-label="RAIT ACM-W Student Chapter"
            >
              <Image
                src="/img/ACM-W-SCWhite.png"
                alt="RAIT ACM-W Student Chapter"
                width={64}
                height={64}
                className="w-full h-full object-contain"
              />
            </a>
          </div>
        </div>

        <div className="my-12 border-t border-border"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-y-2 gap-x-6 text-sm text-text-secondary">
            <p>All Rights Reserved @RAIT ACM SIGAI Student Chapter</p>
            <a href="https://framer.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              {/* Terms and Conditions */}
            </a>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-y-2 gap-x-6 text-sm text-text-secondary">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;