import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';

// Set up the worker using local file
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
}

export interface PDFPage {
  pageNumber: number;
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
}

export async function loadPDFPages(
  pdfUrl: string,
  onProgress?: (progress: number) => void,
  onChunkLoaded?: (pages: PDFPage[]) => void,
  chunkSize: number = 4 // Load 4 pages at a time
): Promise<PDFPage[]> {
  const loadingTask = pdfjsLib.getDocument(pdfUrl);
  const pdf = await loadingTask.promise;
  const pages: PDFPage[] = [];
  const totalPages = pdf.numPages;

  // Load pages in chunks
  for (let i = 1; i <= totalPages; i += chunkSize) {
    const chunkEnd = Math.min(i + chunkSize - 1, totalPages);
    const chunkPages: PDFPage[] = [];

    // Load chunk of pages in parallel
    const chunkPromises = [];
    for (let j = i; j <= chunkEnd; j++) {
      chunkPromises.push(
        (async () => {
          const page = await pdf.getPage(j);
          const viewport = page.getViewport({ scale: 2.5 });
          
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          
          if (!context) {
            throw new Error('Failed to get canvas context');
          }

          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({
            canvasContext: context,
            viewport: viewport,
          }).promise;

          return {
            pageNumber: j,
            canvas,
            width: viewport.width,
            height: viewport.height,
          };
        })()
      );
    }

    // Wait for chunk to complete
    const loadedChunk = await Promise.all(chunkPromises);
    chunkPages.push(...loadedChunk);
    pages.push(...chunkPages);

    // Notify about chunk completion
    if (onChunkLoaded) {
      onChunkLoaded([...pages]);
    }

    // Update progress
    if (onProgress) {
      onProgress((pages.length / totalPages) * 100);
    }
  }

  return pages;
}
