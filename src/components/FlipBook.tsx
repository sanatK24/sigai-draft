"use client";

import React, { useRef, useEffect, forwardRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { PDFPage } from '@/lib/pdfUtils';

interface FlipBookProps {
  pages: PDFPage[];
  width?: number;
  height?: number;
  onPageChange?: (page: number) => void;
  showCover?: boolean;
  mobileMode?: boolean;
}

declare global {
  interface Window {
    flipBookRef?: any;
  }
}

const Page = forwardRef<HTMLDivElement, { canvas: HTMLCanvasElement; pageNumber: number }>(
  ({ canvas, pageNumber }, ref) => {
    const [imgSrc, setImgSrc] = useState<string>('');

    useEffect(() => {
      if (canvas) {
        const dataUrl = canvas.toDataURL('image/png');
        setImgSrc(dataUrl);
      }
    }, [canvas]);

    return (
      <div ref={ref} className="page-content bg-white shadow-2xl flex items-center justify-center overflow-hidden">
        {imgSrc ? (
          <img 
            src={imgSrc} 
            alt={`Page ${pageNumber}`}
            className="w-full h-full object-contain"
            draggable={false}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-400">Loading...</div>
          </div>
        )}
      </div>
    );
  }
);

Page.displayName = 'Page';

export default function FlipBook({ 
  pages, 
  width = 1200, 
  height = 1600, 
  onPageChange,
  showCover = true,
  mobileMode = false 
}: FlipBookProps) {
  const bookRef = useRef<any>(null);

  useEffect(() => {
    // Store ref globally for navigation buttons
    if (bookRef.current) {
      (window as any).flipBookRef = bookRef.current;
    }
  }, [bookRef.current]);

  if (pages.length === 0) {
    return null;
  }

  const handleFlip = (e: any) => {
    if (onPageChange) {
      onPageChange(e.data);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <HTMLFlipBook
        ref={bookRef}
        width={width}
        height={height}
        size="stretch"
        minWidth={400}
        maxWidth={1800}
        minHeight={500}
        maxHeight={2400}
        maxShadowOpacity={0.8}
        showCover={showCover}
        mobileScrollSupport={true}
        className="flipbook-container"
        style={{ margin: '0 auto' }}
        startPage={0}
        drawShadow={true}
        flippingTime={600}
        usePortrait={mobileMode}
        startZIndex={0}
        autoSize={true}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={30}
        showPageCorners={true}
        disableFlipByClick={false}
        onFlip={handleFlip}
      >
        {pages.map((page) => (
          <Page key={page.pageNumber} canvas={page.canvas} pageNumber={page.pageNumber} />
        ))}
      </HTMLFlipBook>
    </div>
  );
}
