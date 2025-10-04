'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="relative flex flex-col items-center">
        {/* Top Text */}
        <div className="text-white text-[10px] font-medium tracking-wider mb-2">
          SCROLL UP
        </div>
        
        {/* Scroll Button */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
        >
          <ChevronUp className="w-6 h-6 text-black" />
        </button>
        
        {/* Bottom Text */}
        <div className="text-white text-[10px] font-medium tracking-wider mt-2">
          SCROLL UP
        </div>
      </div>
    </div>
  );
}
