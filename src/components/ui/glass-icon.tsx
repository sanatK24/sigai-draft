"use client";

import React from 'react';
import { GlassCard } from '@developer-hub/liquid-glass';

interface GlassIconProps {
  href: string;
  iconSrc: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const GlassIcon = ({
  href,
  iconSrc,
  alt,
  size = 'md',
  className = '',
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
      className={`inline-block ${className}`}
      {...props}
    >
      <div className={`relative ${sizeClasses[size]} group transform-gpu`}>
        <div className="absolute inset-0 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 will-change-transform" />
        <div className="w-full h-full rounded-full overflow-hidden">
          <GlassCard
            displacementScale={30}
            blurAmount={0.2}
            cornerRadius={9999}
            padding="8px"
            className="w-full h-full flex items-center justify-center relative z-10 transform-gpu will-change-transform"
          >
            <img 
              src={iconSrc} 
              alt={alt} 
              className={`${iconSizes[size]} object-contain filter grayscale contrast-200`}
              loading="lazy"
              width={size === 'sm' ? 16 : size === 'md' ? 24 : 32}
              height={size === 'sm' ? 16 : size === 'md' ? 24 : 32}
            />
          </GlassCard>
        </div>
      </div>
    </a>
  );
};

export default GlassIcon;
