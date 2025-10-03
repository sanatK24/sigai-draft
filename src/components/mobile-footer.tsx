"use client";

import React from 'react';
import Link from 'next/link';
import { Home, Image as ImageIcon, Users, Mail, Info } from 'lucide-react';
import { usePathname } from 'next/navigation';

const MobileFooter = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-t border-white/10 md:hidden">
      <div className="flex justify-around items-center py-2 px-2">
        <NavLink href="/" icon={Home} label="Home" isActive={isActive('/')} />
        <NavLink href="/#about" icon={Info} label="About" isActive={pathname === '/#about'} />
        <NavLink href="/#gallery" icon={ImageIcon} label="Gallery" isActive={pathname === '/#gallery'} />
        <NavLink href="/#team" icon={Users} label="Team" isActive={pathname === '/#team'} />
        <NavLink href="/#contact" icon={Mail} label="Contact" isActive={pathname === '/#contact'} />
      </div>
    </footer>
  );
};

const NavLink = ({ href, icon: Icon, label, isActive }: { href: string; icon: any; label: string; isActive: boolean }) => (
  <Link 
    href={href}
    className={`flex flex-col items-center p-2 rounded-lg transition-colors ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
  >
    <Icon className="h-5 w-5" aria-hidden="true" />
    <span className="text-xs mt-1">{label}</span>
  </Link>
);

export default MobileFooter;
