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
  const bookWidth = isMobile ? 400 : 1190;
  const bookHeight = isMobile ? 600 : 1684;

  return (
  <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white overflow-hidden" style={{ paddingTop: 'var(--header-height,80px)' }}>
      {/* Header - Back to Home Button */}
  <div className="absolute top-6 left-6 z-50 w-full p-0 m-0">
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

      {/* 1:3 Panel Layout */}
      {!loading && !error && pages.length > 0 && (
  <div className="flex flex-row w-full pt-8 pb-24 gap-0 min-h-screen items-stretch" style={{margin:0,padding:0}}>
          {/* Left Panel: Magazine Card (smaller, no scroll) */}
          <div className="w-[320px] min-w-[260px] max-w-[360px] flex items-stretch justify-center">
            <div className="group relative w-full flex flex-col overflow-auto rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 mt-0">
              <div className="relative h-40 min-h-[160px]">
                <img
                  src="/img/SYNARA_COVER.png"
                  alt="Synara Magazine - RAIT ACM SIGAI"
                  className="object-cover w-full h-full rounded-t-3xl"
                  style={{ objectFit: 'cover' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute top-2 right-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
                  New Issue
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h2 className="text-lg font-bold text-foreground mb-2">Synara Magazine</h2>
                <p className="text-muted-foreground mb-2 text-xs">
                  Our Inaugural Magazine explores the cutting-edge world of Generative AI, featuring groundbreaking research and insights from leading experts in the field.
                </p>
                <div className="space-y-2 mb-2">
                  <div className="flex items-center gap-1 text-xs">
                    <div className="w-1 h-1 rounded-full bg-primary"></div>
                    <span className="text-muted-foreground">Issue #1 • 2025 Edition</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <div className="w-1 h-1 rounded-full bg-primary"></div>
                    <span className="text-muted-foreground">50+ Pages of AI Insights</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <div className="w-1 h-1 rounded-full bg-primary"></div>
                    <span className="text-muted-foreground">Expert Articles & Research</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1 mb-2">
                  <div className="bg-primary/10 rounded-lg p-1 text-center">
                    <div className="text-[10px] text-muted-foreground mb-0.5">Topics</div>
                    <div className="text-xs font-semibold text-foreground">Gen AI</div>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-1 text-center">
                    <div className="text-[10px] text-muted-foreground mb-0.5">Format</div>
                    <div className="text-xs font-semibold text-foreground">Digital</div>
                  </div>
                </div>
                {/* Disclaimer below topics/format grid */}
                <div className="mb-2">
                  <p className="text-[10px] text-muted-foreground italic text-center">
                    <strong>Disclaimer:</strong> The articles published in this magazine represent the personal views and research of student authors. The RAIT ACM SIGAI committee, faculty, and college are not responsible for the opinions expressed therein. Content is intended for educational and informational purposes only.
                  </p>
                </div>
                <Link 
                  href="/latest-issue" 
                  className="w-full py-1.5 px-3 bg-primary hover:bg-primary/90 text-white rounded-full text-xs font-medium transition-colors flex items-center justify-center gap-1 mt-auto"
                >
                  Read Latest Issue
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          {/* Right Panel: FlipBook Viewer */}
          <div className="flex-1 flex items-center justify-center bg-transparent p-0 m-0 overflow-hidden">
            <div className="flex items-center justify-center w-full h-full bg-transparent p-0 m-0" style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100%',height:'100%',overflow:'hidden'}}>
              <div style={{position:'relative',width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
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
        </div>
      )}

      {/* Page Counter & Keyboard Hint */}
      {!loading && !error && pages.length > 0 && (
        <>
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
