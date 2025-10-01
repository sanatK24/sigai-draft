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
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-text-secondary hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-text-secondary hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-text-secondary hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="text-text-secondary hover:text-white transition-colors">
                <X className="h-5 w-5" />
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

        {/* Our Sister Chapters Section */}
        <div className="flex flex-col items-center mt-12 mb-12">
          <div className="bg-white/10 backdrop-blur-sm text-white text-xs font-medium px-4 py-1.5 rounded-full border border-white/20 mb-3">
            Our Sister Chapters
          </div>
          <div className="flex items-center justify-center gap-6">
            <a 
              href="https://rait.acm.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-10 h-10 hover:opacity-80 transition-opacity"
              aria-label="RAIT ACM Student Chapter"
            >
              <Image
                src="/img/ACMSCWhite.png"
                alt="RAIT ACM Student Chapter"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </a>
            <a 
              href="https://rait-w.acm.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-10 h-10 hover:opacity-80 transition-opacity"
              aria-label="RAIT ACM-W Student Chapter"
            >
              <Image
                src="/img/ACM-W-SCWhite.png"
                alt="RAIT ACM-W Student Chapter"
                width={40}
                height={40}
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