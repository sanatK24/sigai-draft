"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { usePathname } from 'next/navigation';

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Domains", href: "/#domains" },
  { name: "Team", href: "/#team" },
  { name: "Contact", href: "/#contact" },
];

interface HeaderProps {
  disableCompact?: boolean;
}

const Header: React.FC<HeaderProps> = ({ disableCompact = false }) => {
  const pathname = usePathname();
  const isEventPage = pathname.startsWith('/event');
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking outside or on a link
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    // Add when the mobile menu is open
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    // Clean up
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Simple scroll threshold handler
  useEffect(() => {
    // If compact mode is disabled, don't set up scroll listener
    if (disableCompact) {
      setIsScrolledDown(false);
      return;
    }

    let ticking = false;
    
    const updateScrollState = () => {
      const currentScrollY = window.scrollY;
      const shouldBeCompact = currentScrollY > 80;
      
      setIsScrolledDown(shouldBeCompact);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    // Initial check
    updateScrollState();
    
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [disableCompact]);

  // Set CSS variable for header height
  useEffect(() => {
    if (headerRef.current) {
      const updateHeight = () => {
        // Always use the expanded height when compact is disabled
        const height = disableCompact 
          ? headerRef.current?.scrollHeight || 80 
          : headerRef.current?.offsetHeight || 80;
          
        document.documentElement.style.setProperty(
          "--header-height",
          `${height}px`
        );
      };
      
      // Initial set
      updateHeight();
      
      // Update on window resize
      window.addEventListener('resize', updateHeight);
      return () => window.removeEventListener('resize', updateHeight);
    }
  }, [isScrolledDown, disableCompact]);

  return (
    <div className="relative">
      <header
        ref={headerRef}
        id="site-header"
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-in-out ${
          !disableCompact && isScrolledDown ? "py-2" : "py-3"
        } px-4 sm:px-6 md:px-8 ${
          !disableCompact && isScrolledDown ? 'bg-transparent' : 'bg-black/20'
        }`}
        style={{
          transform: !disableCompact && isScrolledDown ? 'translateY(0)' : 'none',
          transitionProperty: 'transform, padding, background-color',
        }}
      >
        <div
          className={`flex items-center justify-between w-full transition-all duration-300 ${
            isScrolledDown 
              ? "w-full px-4 sm:px-6 md:max-w-[1200px] md:mx-auto md:rounded-full bg-black/40 py-2"
              : "w-full px-4 sm:px-6 md:max-w-[1200px] md:mx-auto"
          }`}
        >
          {/* Logo - Always on the left */}
          <Link
            href="/"
            aria-label="Company Logo"
            className="flex-shrink-0"
          >
            <div className="flex items-center gap-3">
              <Image
                src="/img/sigai-logo.png"
                alt="RAIT ACM SIGAI Student Chapter Logo"
                width={40}
                height={40}
                className={`w-auto transition-all duration-300 ${
                  isScrolledDown ? "h-8" : "h-10"
                }`}
                priority
              />
              <span className="hidden sm:block text-white font-semibold text-base md:text-lg lg:text-xl">RAIT ACM SIGAI Student Chapter</span>
            </div>
          </Link>

          {/* Desktop Navigation and CTA - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-4">
            {/* Desktop Navigation */}
            <nav
              className={`items-center gap-8 transition-opacity duration-200 ${
                !disableCompact && isScrolledDown ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              {navItems.map((item) => {
                const isActive = pathname === item.href || 
                               (pathname === '/' && item.href === '/') ||
                               (pathname.startsWith('/event') && item.href === '/events') ||
                               (pathname === '/events' && item.href === '/events');
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-white/90 text-base font-medium rounded-full px-5 py-2 mx-1 transition-all duration-300 backdrop-blur-xl border shadow-lg ${
                      isActive 
                        ? 'bg-white/20 border-white/30 shadow-black/20' 
                        : 'hover:bg-white/10 border-white/20 shadow-black/10'
                    }`}
                    scroll={!item.href.startsWith('/#')}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="flex-shrink-0">
              {isEventPage ? (
                <Link
                  href="/"
                  className="flex items-center gap-2.5 bg-white/90 text-black font-medium rounded-full px-6 py-2 text-base transition-all duration-300 flex-shrink-0 hover:bg-white/100 backdrop-blur-xl border border-white/30 shadow-lg shadow-black/10 hover:shadow-black/20"
                >
                  Back to Home
                </Link>
              ) : (
                <Link
                  href="/events"
                  className="flex items-center gap-2.5 bg-white/90 text-black font-medium rounded-full pl-6 pr-2 py-2 text-base transition-all duration-300 flex-shrink-0 hover:bg-white/100 backdrop-blur-xl border border-white/30 shadow-lg shadow-black/10 hover:shadow-black/20"
                >
                  Events
                  <span className="bg-gradient-to-br from-blue-600 to-indigo-500 rounded-full p-1.5 flex items-center justify-center backdrop-blur-md">
                    <ArrowUpRight size={16} strokeWidth={2.5} className="text-white" />
                  </span>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button - only visible on small screens */}
          <div className="md:hidden">
            <button
              type="button"
              className="p-2 rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

        </div>

        {/* Full-screen mobile menu overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[9999] overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
            {/* Solid black background with transparency */}
            <div className="fixed inset-0 bg-black/95 backdrop-blur-sm" />
            
            {/* Content container */}
            <div 
              ref={mobileMenuRef}
              className="relative min-h-screen w-full flex flex-col items-center justify-between p-6 pt-20 pb-8"
            >
              {/* Close button - positioned absolutely at top right */}
              <button
                type="button"
                className="absolute top-6 right-6 p-3 rounded-full text-white hover:bg-white/20 focus:outline-none transition-all duration-300 z-50"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-8 w-8" aria-hidden="true" />
              </button>
              
              {/* Main content area with centered navigation */}
              <div className="w-full flex-1 flex flex-col items-center justify-center">
                {/* Logo */}
                <div className="mb-10 flex justify-center">
                  <Image
                    src="/img/sigai-logo.png"
                    alt="RAIT ACM SIGAI Student Chapter Logo"
                    width={90}
                    height={90}
                    className="w-24 h-24 object-contain"
                    priority
                  />
                </div>
                
                {/* Menu items */}
                <nav className="w-full max-w-xs space-y-4">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href || 
                                   (pathname === '/' && item.href === '/') ||
                                   (pathname.startsWith('/event') && item.href === '/events') ||
                                   (pathname === '/events' && item.href === '/events');
                    
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`block text-2xl font-medium w-full text-center py-5 px-6 my-1 rounded-xl transition-all duration-200 ${
                          isActive 
                            ? 'text-white bg-white/20 border border-white/20' 
                            : 'text-white/90 hover:text-white hover:bg-white/10 hover:border-white/10 border border-transparent'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        scroll={!item.href.startsWith('/#')}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
              
              {/* Bottom section with CTA and social links */}
              <div className="w-full max-w-xs space-y-6">
                {/* CTA Button */}
                <div className="w-full">
                  {isEventPage ? (
                    <Link
                      href="/"
                      className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-white text-black font-bold text-lg rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-purple-500/30"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Back to Home
                    </Link>
                  ) : (
                    <Link
                      href="/events"
                      className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-white text-black font-bold text-lg rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-purple-500/30"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      View All Events
                      <ArrowUpRight size={20} strokeWidth={2.5} />
                    </Link>
                  )}
                </div>
                
                {/* Social links */}
                <div className="flex justify-center space-x-6">
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
                  {/* <a href="https://github.com/RAIT-SIGAI" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                    <span className="sr-only">GitHub</span>
                    <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;