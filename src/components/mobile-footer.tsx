"use client";

import React from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { usePathname } from 'next/navigation';

const MobileFooter = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-t border-white/10 md:hidden">
      <div className="flex justify-center items-center py-3 px-2">
        <Link 
          href="/" 
          className="flex flex-col items-center p-2 rounded-lg transition-colors text-gray-400 hover:text-white"
        >
          <Home className="h-6 w-6" aria-hidden="true" />
          <span className="text-xs mt-1">Home</span>
        </Link>
      </div>
    </footer>
  );
};

export default MobileFooter;
