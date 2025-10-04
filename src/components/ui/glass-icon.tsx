"use client";

import React from 'react';
import Image from 'next/image';
import { GlassCard } from '@developer-hub/liquid-glass';

interface GlassIconProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  iconSrc: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  iconClass?: string;
}

export const GlassIcon = ({
  href,
  iconSrc,
  alt,
  size = 'md',
  className = '',
  iconClass = '',
  ...props
}: GlassIconProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center ${sizeClasses[size]} ${className}`}
      {...props}
    >
      <GlassCard
        displacementScale={30}
        blurAmount={0.2}
        cornerRadius={9999}
        padding="0"
        className="w-full h-full flex items-center justify-center group transition-all duration-300 hover:scale-110"
        style={{
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          background: 'rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div 
          className={`relative ${iconClass || iconSizes[size]} flex items-center justify-center`}
          style={{
            width: '60%',
            height: '60%'
          }}
        >
          <Image 
            src={iconSrc} 
            alt={alt}
            width={24}
            height={24}
            className="object-contain w-full h-full"
            style={{
              filter: 'brightness(0) invert(1)'
            }}
          />
        </div>
      </GlassCard>
    </a>
  );
};

export default GlassIcon;
