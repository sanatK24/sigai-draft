"use client";

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Header from './header';
import MobileFooter from './mobile-footer';
import ScrollToTop from './ScrollToTop';

type LayoutWrapperProps = {
  children: ReactNode;
};

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  
  // Hide footer on specific routes if needed
  const hideFooter = false; // Set to true for routes where you want to hide the footer

  return (
    <div className={`min-h-screen flex flex-col ${isHomePage ? 'relative' : 'relative'}`}>
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        {children}
      </main>
      {!hideFooter && <MobileFooter />}
      <ScrollToTop />
    </div>
  );
};

export default LayoutWrapper;
