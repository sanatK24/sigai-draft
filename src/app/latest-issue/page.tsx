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

  // Responsive dimensions: smaller single page for mobile, larger double-page for desktop
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const bookWidth = isMobile ? 350 : 800;
  const bookHeight = isMobile ? 500 : 1100;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Header - Back to Home Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 hover:border-white/30 transition-all duration-300 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center h-full">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mb-4" />
          <div className="text-xl font-medium mb-2">Loading Magazine...</div>
          <div className="text-gray-400">{progress}%</div>
          <div className="w-64 h-2 bg-white/10 rounded-full mt-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-all"
          >
            Retry
          </button>
        </div>
      )}

      {/* FlipBook */}
      {!loading && !error && pages.length > 0 && (
        <>
          <div className="flex items-center justify-center h-full w-full pt-20 pb-24 relative">
            {/* Left Navigation Button - Desktop Only */}
            <button
              onClick={() => {
                const book = (window as any).flipBookRef;
                if (book && currentPage > 0) {
                  book.pageFlip().flipPrev();
                }
              }}
              disabled={currentPage === 0}
              className="hidden lg:flex absolute left-8 z-50 items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full hover:bg-white/20 hover:border-white/30 hover:scale-110 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 group shadow-2xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 group-hover:-translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <FlipBook 
              pages={pages} 
              width={bookWidth} 
              height={bookHeight}
              onPageChange={handlePageChange}
              showCover={true}
              mobileMode={isMobile}
            />

            {/* Right Navigation Button - Desktop Only */}
            <button
              onClick={() => {
                const book = (window as any).flipBookRef;
                if (book && currentPage < pages.length - 1) {
                  book.pageFlip().flipNext();
                }
              }}
              disabled={currentPage >= pages.length - 1}
              className="hidden lg:flex absolute right-8 z-50 items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full hover:bg-white/20 hover:border-white/30 hover:scale-110 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 group shadow-2xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>

          {/* Page Counter */}
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 flex items-center gap-3">
              <span className="text-sm font-medium">
                Page {currentPage + 1} of {pages.length}
              </span>
              {isLoadingMore && (
                <div className="flex items-center gap-2 pl-3 border-l border-white/20">
                  <Loader2 className="w-3 h-3 animate-spin text-blue-400" />
                  <span className="text-xs text-gray-400">{progress}%</span>
                </div>
              )}
            </div>
          </div>

          {/* Keyboard Hint */}
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 text-gray-500 text-xs z-40">
            {isLoadingMore ? 'Loading more pages in background...' : 'Click on page corners or drag to flip'}
          </div>
        </>
      )}

      {/* Custom Styles */}
      <style jsx global>{`
        .flipbook-container {
          box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
        }

        .stf__parent {
          perspective: 2000px;
        }

        .stf__block {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .page-content {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }
      `}</style>
    </div>
  );
}
