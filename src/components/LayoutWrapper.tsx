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
  
  // Hide header and footer on latest-issue page for full-screen magazine view
  const isLatestIssuePage = pathname === "/latest-issue";
  const hideFooter = isLatestIssuePage;

  return (
    <div className={`min-h-screen flex flex-col ${isHomePage ? 'relative' : 'relative'}`}>
      {!isLatestIssuePage && <Header />}
      <main className={`flex-1 ${isLatestIssuePage ? 'p-0' : 'pb-16 md:pb-0'}`}>
        {children}
      </main>
      {!hideFooter && <MobileFooter />}
      <ScrollToTop />
    </div>
  );
};

export default LayoutWrapper;
