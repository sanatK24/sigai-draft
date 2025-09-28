"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Domains", href: "#domains" },
  { name: "Team", href: "#team" },
  { name: "Contact", href: "#contact" },
];

const Header: React.FC = () => {
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
              alt="RAIT ACM SIGAI Logo"
              width={40}
              height={40}
              className={`w-auto transition-all duration-300 ${
                isScrolledDown ? "h-8" : "h-10"
              }`}
              priority
            />
            <span className="text-white font-semibold text-lg md:text-xl">RAIT ACM SIGAI</span>
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
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white text-base font-normal rounded-full px-4 py-2 hover:bg-white/20 transition-colors"
                style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="#tickets"
            className="flex items-center gap-2.5 bg-white text-black font-medium rounded-full pl-5 pr-1.5 py-1.5 md:pl-6 md:pr-2 md:py-2 text-base transition-all duration-300 flex-shrink-0 hover:bg-gray-100"
          >
            Events
            <span className="bg-gradient-to-br from-blue-600 to-indigo-500 rounded-full p-1 flex items-center justify-center">
              <ArrowUpRight size={16} strokeWidth={2.5} className="text-white" />
            </span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;