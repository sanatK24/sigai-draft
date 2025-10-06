"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { loadPDFPages, PDFPage } from '@/lib/pdfUtils';

// Dynamic import to avoid SSR issues
const FlipBook = dynamic(() => import('@/components/FlipBook'), {
  ssr: false,
});

export default function MagazinePage() {
  const [pages, setPages] = useState<PDFPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const pdfUrl = '/data/SYNARA_2025.pdf';
  
  /**
   * PDF Specifications:
   * - Page Size: 1190x1684 pixels
   * - Aspect Ratio: 595:842 (0.7066)
   * - Standard: A4 Portrait (1:√2)
   * - Ensures no distortion or letterboxing
   */

  // Remove body padding-top on mount for full-screen experience
  useEffect(() => {
    document.body.style.paddingTop = '0';
    return () => {
      document.body.style.paddingTop = ''; // Reset on unmount
    };
  }, []);

  useEffect(() => {
    const loadPDF = async () => {
      try {
        setLoading(true);
        await loadPDFPages(
          pdfUrl, 
          (prog) => {
            setProgress(Math.round(prog));
          },
          (loadedPages) => {
            // Update pages as each chunk loads
            setPages([...loadedPages]);
            
            // Show the flipbook after first chunk (4 pages) is loaded
            if (loadedPages.length >= 4 && loading) {
              setLoading(false);
              setIsLoadingMore(true);
            }
          },
          4 // Load 4 pages per chunk
        );
        
        // All pages loaded
        setIsLoadingMore(false);
      } catch (err) {
        console.error('Error loading PDF:', err);
        setError('Failed to load magazine. Please try again.');
        setLoading(false);
        setIsLoadingMore(false);
      }
    };

    loadPDF();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // PDF page dimensions: 1190x1684 pixels
  // Exact aspect ratio: 595:842 (simplified) = 0.7066
  // This matches A4 portrait ratio (1:√2 ≈ 0.7071)
  const PDF_ASPECT_RATIO = 595 / 842; // 0.7066
  
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  // Calculate available space dynamically
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;

  // Reserve space for: back button + margins + page counter (reduced for larger display)
  const reservedVertical = 100; // Reduced from 120 to give more vertical space
  const availableHeight = viewportHeight - reservedVertical;

  // Left panel width: 320px card + 24px gap on each side
  const leftPanelWidth = isMobile ? 0 : 320;
  const horizontalMargins = 40; // Reduced from 48 to give more horizontal space
  const availableWidth = viewportWidth - leftPanelWidth - horizontalMargins;

  // Calculate dimensions maintaining exact PDF aspect ratio
  let bookWidth: number;
  let bookHeight: number;

  if (isMobile) {
    // Mobile: Single page, fit to width (slightly larger)
    bookWidth = Math.min(availableWidth * 0.98, 550); // Increased from 0.95 & 500
    bookHeight = bookWidth / PDF_ASPECT_RATIO;
  } else {
    // Desktop: Double-page spread (larger percentages)
    // Try fitting to height first
    bookHeight = availableHeight * 0.95; // Increased from 0.92
    bookWidth = bookHeight * PDF_ASPECT_RATIO;

    // If width exceeds available space, fit to width instead
    if (bookWidth > availableWidth * 0.95) { // Increased from 0.9
      bookWidth = availableWidth * 0.95;
      bookHeight = bookWidth / PDF_ASPECT_RATIO;
    }
  }

  // Clamp to reasonable bounds while maintaining aspect ratio
  const minWidth = 450; // Increased from 400
  const maxWidth = 1800; // Increased from 1600
  const minHeight = minWidth / PDF_ASPECT_RATIO; // 637px (was 566px)
  const maxHeight = maxWidth / PDF_ASPECT_RATIO; // 2547px (was 2264px)

  if (bookWidth < minWidth) {
    bookWidth = minWidth;
    bookHeight = minWidth / PDF_ASPECT_RATIO;
  } else if (bookWidth > maxWidth) {
    bookWidth = maxWidth;
    bookHeight = maxWidth / PDF_ASPECT_RATIO;
  }

  // Ensure height is also within bounds
  bookHeight = Math.max(minHeight, Math.min(bookHeight, maxHeight));

  return (
  <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Subtle grid background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
      </div>

      {/* Header - Back to Home Button */}
      <div className="absolute top-4 left-4 z-50">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 group shadow-lg"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center h-screen relative z-10">
          <div className="relative">
            <Loader2 className="w-16 h-16 animate-spin text-white" />
          </div>
          <div className="text-2xl font-bold mt-8 text-white">
            Loading Magazine
          </div>
          <div className="text-gray-400 mt-2 text-lg font-medium">{progress}%</div>
          <div className="w-80 h-2 bg-white/10 rounded-full mt-6 overflow-hidden border border-white/10">
            <div 
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-gray-500 text-sm mt-4">Preparing your reading experience...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex flex-col items-center justify-center h-screen relative z-10">
          <div className="w-20 h-20 rounded-full bg-white/5 border-2 border-white/20 flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </div>
          <div className="text-white text-xl font-semibold mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all duration-300 font-medium shadow-lg"
          >
            Retry Loading
          </button>
        </div>
      )}

      {/* 1:3 Panel Layout */}
      {!loading && !error && pages.length > 0 && (
  <div className="flex flex-row w-full h-screen gap-6 px-6 py-4 relative z-10">
          {/* Left Panel: Magazine Card */}
          <div className="w-[320px] min-w-[320px] max-w-[320px] flex items-start justify-start hidden lg:flex pt-2">
            <div className="group relative w-full flex flex-col rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500 hover:border-white/20 overflow-hidden">
              {/* Cover Image with Overlay */}
              <div className="relative h-56 flex-shrink-0 overflow-hidden">
                <img
                  src="/img/SYNARA_COVER.png"
                  alt="Synara Magazine - RAIT ACM SIGAI"
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Floating Badge */}
                <div className="absolute top-3 right-3 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
                  New Issue
                </div>
                
                {/* Magazine Title Overlay */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h2 className="text-2xl font-bold text-white drop-shadow-lg">Synara Magazine</h2>
                  <p className="text-xs text-white/80 mt-1">RAIT ACM SIGAI • 2025</p>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5 flex-1 flex flex-col overflow-y-auto">
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  Our Inaugural Magazine explores the cutting-edge world of Generative AI, featuring groundbreaking research and insights from leading experts in the field.
                </p>
                
                {/* Feature List */}
                <div className="space-y-2.5 mb-4">
                  <div className="flex items-center gap-2.5 text-sm group/item">
                    <div className="w-2 h-2 rounded-full bg-white flex-shrink-0"></div>
                    <span className="text-gray-300">Issue #1 • 2025 Edition</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm group/item">
                    <div className="w-2 h-2 rounded-full bg-white flex-shrink-0"></div>
                    <span className="text-gray-300">50+ Pages of AI Insights</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm group/item">
                    <div className="w-2 h-2 rounded-full bg-white flex-shrink-0"></div>
                    <span className="text-gray-300">Expert Articles & Research</span>
                  </div>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center hover:bg-white/10 hover:border-white/20 transition-all">
                    <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Topics</div>
                    <div className="text-base font-bold text-white">Gen AI</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center hover:bg-white/10 hover:border-white/20 transition-all">
                    <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Format</div>
                    <div className="text-base font-bold text-white">Digital</div>
                  </div>
                </div>
                
                {/* Disclaimer - More Legible */}
                <div className="mb-4 p-4 bg-white/5 border border-white/10 rounded-lg">
                  <p className="text-xs text-gray-300 leading-relaxed text-left">
                    <span className="font-bold text-white block mb-1">Disclaimer:</span>
                    The articles published in this magazine represent the personal views and research of student authors. The RAIT ACM SIGAI committee, faculty, and college are not responsible for the opinions expressed therein. Content is intended for educational and informational purposes only.
                  </p>
                </div>
                
                {/* CTA Button */}
                <Link 
                  href="/latest-issue" 
                  className="w-full py-3 px-4 bg-white text-black hover:bg-white/90 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 mt-auto shadow-lg group/btn"
                >
                  <span>Read Magazine</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-1 transition-transform">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Right Panel: FlipBook Viewer */}
          <div className="flex-1 flex items-center justify-center bg-transparent overflow-hidden">
            <div className="w-full h-full flex items-center justify-center relative">
              <FlipBook 
                  pages={pages} 
                  width={bookWidth} 
                  height={bookHeight}
                  onPageChange={handlePageChange}
                  showCover={true}
                  mobileMode={isMobile}
                />
            </div>
          </div>
        </div>
      )}

      {/* Page Counter & Keyboard Hint */}
      {!loading && !error && pages.length > 0 && (
        <>
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-8 py-3 flex items-center gap-4 shadow-2xl">
              <span className="text-sm font-semibold text-white">
                {isMobile || currentPage === 0 
                  ? `Page ${currentPage + 1} of ${pages.length}`
                  : currentPage + 1 < pages.length 
                    ? `Pages ${currentPage + 1}-${currentPage + 2} of ${pages.length}`
                    : `Page ${currentPage + 1} of ${pages.length}`
                }
              </span>
              {isLoadingMore && (
                <div className="flex items-center gap-2 pl-4 border-l border-white/10">
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span className="text-xs text-gray-400 font-medium">{progress}%</span>
                </div>
              )}
            </div>
          </div>
          <div className="fixed bottom-16 left-1/2 -translate-x-1/2 text-gray-400 text-xs z-40 bg-black/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10">
            {isLoadingMore ? 'Loading more pages in background...' : 'Click on corners or drag to flip pages'}
          </div>
        </>
      )}

      {/* Custom Styles */}
      <style jsx global>{`
        .flipbook-container {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
        }

        .stf__parent {
          perspective: 2500px;
        }

        .stf__block {
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .page-content {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }
        
        /* Smooth scrollbar for left panel */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}
