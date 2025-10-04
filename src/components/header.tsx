"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Team", href: "/#team" },
  { name: "Contact", href: "/#contact" },
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
                {/* GitHub link commented out for now
                <a href="https://github.com/RAIT-SIGAI" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
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