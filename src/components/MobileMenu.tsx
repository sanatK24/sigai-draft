"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ArrowUpRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: {
    name: string;
    href: string;
    subItems?: { name: string; href: string }[];
  }[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navItems }) => {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] h-screen w-screen overflow-y-auto bg-transparent"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-300 z-[10000]"
        onClick={onClose}
      />
      
      {/* Menu panel */}
      <div 
        ref={menuRef}
        className="fixed inset-0 w-full h-full bg-gradient-to-b from-black to-gray-900 shadow-2xl overflow-y-auto z-[10001]"
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center">
            <Image
              src="/img/sigai-logo.png"
              alt="RAIT ACM SIGAI Student Chapter Logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
              priority
            />
            <span className="ml-3 text-white font-semibold text-lg">
              RAIT ACM SIGAI
            </span>
          </div>
          <button
            type="button"
            className="p-2 rounded-full text-white hover:bg-white/20 focus:outline-none transition-colors duration-200"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        {/* Navigation items */}
        <nav className="p-6 space-y-2">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href || 
                           (pathname === '/' && item.href === '/') ||
                           (pathname.startsWith('/event') && item.href === '/events') ||
                           (pathname === '/events' && item.href === '/events');
            
            return (
              <div key={item.name} className="mb-2">
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-5 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-white/10 text-white' 
                      : 'text-white/90 hover:bg-white/5 hover:text-white'
                  }`}
                  onClick={onClose}
                  scroll={!item.href.startsWith('/#')}
                >
                  <span className="text-lg font-medium">{item.name}</span>
                  {isActive && (
                    <span className="ml-2 w-2 h-2 bg-white rounded-full" />
                  )}
                </Link>
                {index < navItems.length - 1 && (
                  <div className="h-px bg-white/10 my-2" />
                )}
              </div>
            );
          })}
        </nav>
        
        {/* Bottom CTA */}
        <div className="sticky bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
          <Link
            href="/events"
            className="w-full flex items-center justify-between px-6 py-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition-colors duration-200"
            onClick={onClose}
          >
            <span className="text-white font-medium">View All Events</span>
            <ArrowUpRight className="h-5 w-5 text-white" />
          </Link>
        </div>
        
        {/* Social links */}
        <div className="mt-8 pb-8 flex justify-center space-x-6">
          <a href="https://www.instagram.com/rait_sigai/" target="_blank" rel="noopener noreferrer" className="group">
            <span className="sr-only">Instagram</span>
            <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-black/60 group-hover:scale-110 group-hover:border-white/20 shadow-lg">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="url(#mobile-instagram-gradient)">
                <defs>
                  <linearGradient id="mobile-instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#FD5949' }} />
                    <stop offset="50%" style={{ stopColor: '#D6249F' }} />
                    <stop offset="100%" style={{ stopColor: '#285AEB' }} />
                  </linearGradient>
                </defs>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </div>
          </a>
          <a href="https://www.linkedin.com/company/rait-sigai/" target="_blank" rel="noopener noreferrer" className="group">
            <span className="sr-only">LinkedIn</span>
            <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-black/60 group-hover:scale-110 group-hover:border-white/20 shadow-lg">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#0A66C2">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
