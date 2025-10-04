"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Team", href: "/team" },
  { name: "Contact", href: "/contact" },
  { 
    name: "Other ACM Chapters", 
    href: "#",
    subItems: [
      { name: "RAIT ACM Student Chapter", href: "https://rait.acm.org/" },
      { name: "RAIT ACM - W Student Chapter", href: "https://rait-w.acm.org/" }
    ]
  },
];

interface HeaderProps {
  disableCompact?: boolean;
}

const Header: React.FC<HeaderProps> = ({ disableCompact = false }) => {
  const pathname = usePathname();
  const isEventPage = pathname.startsWith('/event');
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCapsuleHovered, setIsCapsuleHovered] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Simple scroll threshold handler
  useEffect(() => {
    // If compact mode is disabled, don't set up scroll listener
    if (disableCompact) {
      setIsScrolledDown(false);
      return;
    }

    let ticking = false;
    let lastScrollY = window.scrollY;
    
    const updateScrollState = () => {
      const currentScrollY = window.scrollY;
      // Only update state if scroll position has changed significantly
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        const shouldBeCompact = currentScrollY > 80;
        setIsScrolledDown(shouldBeCompact);
        lastScrollY = currentScrollY;
      }
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
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={closeMobileMenu}
        navItems={navItems}
      />
      <header
        ref={headerRef}
        id="site-header"
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-in-out ${
          !disableCompact && isScrolledDown ? "py-2" : "py-3"
        } px-4 sm:px-6 md:px-8 ${
          !disableCompact && isScrolledDown ? 'bg-transparent' : 'bg-black/20 backdrop-blur-md'
        }`}
        style={{
          transform: !disableCompact && isScrolledDown ? 'translateY(0)' : 'none',
          transitionProperty: 'transform, padding, background-color',
        }}
      >
        <div
          className={`flex items-center transition-all duration-300 ease-in-out ${
            isScrolledDown 
              ? `mx-auto rounded-full bg-black border border-white/10 shadow-lg ${
                  isCapsuleHovered 
                    ? "max-w-5xl justify-between py-2 px-6" 
                    : "max-w-fit gap-4 py-2 px-4"
                }`
              : "w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24"
          }`}
          onMouseEnter={() => {
            if (isScrolledDown) {
              setIsCapsuleHovered(true);
            }
          }}
          onMouseLeave={(e) => {
            // Only collapse if mouse leaves the entire header area
            if (isScrolledDown && !e.currentTarget.contains(e.relatedTarget as Node)) {
              setIsCapsuleHovered(false);
            }
          }}
        >
          <div className="flex items-center justify-between w-full max-w-[1400px] mx-auto">
          <div className="flex items-center flex-1">
              {/* Mobile Menu Button - Only visible on mobile */}
              <div className="md:hidden">
                <button
                  type="button"
                  className="p-2 rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
              
              {/* Logo */}
              <div className="flex items-center gap-3 ml-4 md:ml-6">
                <Link
                  href="/"
                  aria-label="Company Logo"
                  className="flex-shrink-0"
                >
                  <div className={`flex items-center gap-3 ${
                    isScrolledDown ? "h-12" : "h-16"
                  } transition-all duration-300`}>
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
                    <span className="hidden md:block text-white font-semibold text-sm md:text-base lg:text-lg transition-all duration-300 whitespace-nowrap">
                      RAIT ACM SIGAI Student Chapter
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          {/* Desktop Navigation and CTA - Hidden on mobile */}
          <div 
            className={`hidden md:flex items-center flex-shrink-0 transition-all duration-300 ml-4 md:ml-6 ${
              !disableCompact && isScrolledDown && !isCapsuleHovered ? 'gap-0' : 'gap-4'
            }`}
            onMouseEnter={() => isScrolledDown && setIsCapsuleHovered(true)}
          >
            {/* Desktop Navigation - Hidden in capsule mode unless hovered */}
            <nav
              className={`flex items-center transition-all duration-300 ${
                !disableCompact && isScrolledDown
                  ? isCapsuleHovered
                    ? "opacity-100 max-w-2xl gap-2"
                    : "opacity-0 max-w-0 w-0 pointer-events-none overflow-hidden"
                  : "opacity-100 gap-4"
              }`}
            >
              {navItems.map((item) => {
                const isActive = pathname === item.href || 
                               (pathname === '/' && item.href === '/') ||
                               (pathname.startsWith('/event') && item.href === '/events') ||
                               (pathname === '/events' && item.href === '/events');
                
                if (item.subItems) {
                  return (
                    <div key={item.name} className="relative group">
                      <button
                        className={`text-white/90 font-medium rounded-full transition-all duration-200 whitespace-nowrap flex items-center gap-1 ${
                          isScrolledDown
                            ? 'text-xs px-2 py-1 hover:bg-white/10'
                            : `text-sm px-3 py-1.5 backdrop-blur-xl border shadow-lg ${
                                isActive 
                                  ? 'bg-white/20 border-white/30 shadow-black/20' 
                                  : 'hover:bg-white/10 border-white/20 shadow-black/10'
                              }`
                        }`}
                      >
                        {item.name}
                        <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div className="absolute right-0 pt-2 z-50">
                        <div className="bg-white/90 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden min-w-[220px] transform origin-top transition-all duration-200 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100">
                          <div className="py-1">
                            {item.subItems.map((subItem) => (
                              <a
                                key={subItem.name}
                                href={subItem.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                              >
                                {subItem.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-white/90 font-medium rounded-full transition-all duration-500 whitespace-nowrap ${
                      isScrolledDown
                        ? 'text-sm px-2.5 py-1.25 hover:bg-white/10'
                        : `text-base px-3.5 py-1.75 mx-0.5 backdrop-blur-xl border shadow-lg ${
                            isActive 
                              ? 'bg-white/20 border-white/30 shadow-black/20' 
                              : 'hover:bg-white/10 border-white/20 shadow-black/10'
                          }`
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


        </div>

        {/* Full-screen mobile menu overlay with slide-in animation */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 z-[9999] h-screen w-screen overflow-y-auto bg-transparent"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {/* Semi-transparent overlay with blur */}
            <div 
              className="fixed inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-300 z-[10000]"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu panel */}
            <div 
              ref={mobileMenuRef}
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
                  onClick={() => setIsMobileMenuOpen(false)}
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
                        onClick={() => setIsMobileMenuOpen(false)}
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
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-white font-medium">View All Events</span>
                  <ArrowUpRight className="h-5 w-5 text-white" />
                </Link>
              </div>
              
              {/* Social links */}
              <div className="mt-8 flex justify-center space-x-6">
                <a href="https://www.instagram.com/rait_sigai/" target="_blank" rel="noopener noreferrer" className="group">
                  <span className="sr-only">Instagram</span>
                  <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-black/60 group-hover:scale-110 group-hover:border-white/20 shadow-lg">
                    <svg className="h-5 w-5 transition-all duration-300" viewBox="0 0 24 24" fill="url(#instagram-gradient)">
                      <defs>
                        <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
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
                {/* GitHub link commented out for now
                <a href="https://github.com/RAIT-SIGAI" target="_blank" rel="noopener noreferrer" className="group">
                  <span className="sr-only">GitHub</span>
                  <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-black/60 group-hover:scale-110 group-hover:border-white/20 shadow-lg">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#fff">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                </a>
                */}
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;