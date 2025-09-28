"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, X } from 'lucide-react';

const FooterSection = () => {
  return (
    <footer className="relative bg-black pt-20 pb-10 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[1200px] h-[400px] bg-primary/20 rounded-full blur-3xl opacity-60"
        />
        <div 
          className="absolute bottom-[-150px] left-1/4 -translate-x-1/2 w-[1000px] h-[350px] bg-accent/10 rounded-full blur-3xl opacity-50"
        />
      </div>
      
      <div className="container relative z-10 mx-auto px-6">
        {/* Wordmark with gradient glow */}
        <div className="flex flex-col items-center mb-12">
          <div className="relative">
            <div className="pointer-events-none absolute -inset-6 rounded-full blur-3xl opacity-40" style={{ backgroundImage: 'linear-gradient(90deg, #3b4fde, #8b5cf6)' }} />
            <Image
              src="/img/sigai-logo.png"
              alt="RAIT ACM SIGAI wordmark"
              width={260}
              height={50}
              className="relative w-[200px] sm:w-[240px] h-auto"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div className="flex flex-col gap-4">
            <p className="text-sm text-text-secondary font-medium">Social</p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-text-secondary hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-text-secondary hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-text-secondary hover:text-white transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="text-text-secondary hover:text-white transition-colors">
                <X className="h-6 w-6" />
              </a>
            </div>
          </div>

          <nav className="flex flex-wrap gap-3">
            <Link href="#home" className="bg-white/10 text-white text-sm font-medium py-2 px-4 rounded-full hover:bg-white/20 transition-colors">
              Home
            </Link>
            <Link href="#about" className="bg-white/10 text-white text-sm font-medium py-2 px-4 rounded-full hover:bg-white/20 transition-colors">
              About
            </Link>
            <Link href="#domains" className="bg-white/10 text-white text-sm font-medium py-2 px-4 rounded-full hover:bg-white/20 transition-colors">
              Domains
            </Link>
            <Link href="#team" className="bg-white/10 text-white text-sm font-medium py-2 px-4 rounded-full hover:bg-white/20 transition-colors">
              Team
            </Link>
            <Link href="#contact" className="bg-white/10 text-white text-sm font-medium py-2 px-4 rounded-full hover:bg-white/20 transition-colors">
              Contact
            </Link>
          </nav>
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
            <p>All Rights Reserved @RAIT ACM SIGAI</p>
            <a href="https://framer.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              {/* Terms and Conditions */}
            </a>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-y-2 gap-x-6 text-sm text-text-secondary"></div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;