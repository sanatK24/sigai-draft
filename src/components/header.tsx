"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { usePathname } from 'next/navigation';

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Domains", href: "/#domains" },
  { name: "Team", href: "/#team" },
  { name: "Contact", href: "/#contact" },
];

const Header: React.FC = () => {
  const pathname = usePathname();
  const isEventsPage = pathname === '/events';
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Simple scroll threshold handler
  useEffect(() => {
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
  }, []);

  // Set CSS variable for header height
  useEffect(() => {
    if (headerRef.current) {
      const updateHeight = () => {
        document.documentElement.style.setProperty(
          "--header-height",
          `${headerRef.current?.offsetHeight || 80}px`
        );
      };
      
      // Initial set
      updateHeight();
      
      // Update on window resize
      window.addEventListener('resize', updateHeight);
      return () => window.removeEventListener('resize', updateHeight);
    }
  }, [isScrolledDown]);

  return (
    <div className="relative">
      <header
        ref={headerRef}
        id="site-header"
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-in-out ${
          isScrolledDown ? "py-2" : "py-4"
        } px-6 md:px-10 ${isScrolledDown ? 'bg-transparent' : 'bg-black/20'}`}
        style={{
          transform: isScrolledDown ? 'translateY(0)' : 'none',
          transitionProperty: 'transform, padding, background-color',
        }}
      >
        <div
          className={`flex items-center justify-between w-full transition-all duration-300 ${
            isScrolledDown 
              ? "max-w-[1200px] mx-auto rounded-full bg-black/40 px-6 py-2"
              : "max-w-[1200px] mx-auto"
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
            <span className="text-white font-semibold text-lg md:text-xl">RAIT ACM SIGAI Student Chapter</span>
          </div>
        </Link>

        {/* Right side container */}
        <div className="flex items-center gap-4">
          {/* Nav Links (hidden in compact) */}
          <nav
            className={`hidden md:flex items-center gap-4 transition-opacity duration-200 ${
              isScrolledDown ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href || 
                             (pathname === '/' && item.href === '/') ||
                             (pathname.startsWith('/events') && item.href === '/events');
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-white/90 text-base font-medium rounded-full px-5 py-2 transition-all duration-300 backdrop-blur-xl border shadow-lg ${
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

          {/* CTA - Hidden on events page */}
          {!isEventsPage && (
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
      </header>
    </div>
  );
};

export default Header;