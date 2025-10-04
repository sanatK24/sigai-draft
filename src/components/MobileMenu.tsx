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
          <a href="https://www.instagram.com/rait_sigai/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
            <span className="sr-only">Instagram</span>
            <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.415-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.248-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.248 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/company/rait-sigai/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
            <span className="sr-only">LinkedIn</span>
            <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
