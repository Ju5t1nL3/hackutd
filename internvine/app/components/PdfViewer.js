// components/PdfViewer.js
"use client";

import { useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/web/pdf_viewer.css';

// Set the workerSrc to load the PDF worker script
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfViewer = ({ fileUrl }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadPdf = async () => {
      if (!fileUrl) {
        console.error("No PDF file URL provided");
        return;
      }

      try {
        const loadingTask = pdfjsLib.getDocument(fileUrl);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });

        const canvas = canvasRef.current;
        if (!canvas) {
          console.error("Canvas element not found");
          return;
        }

        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport,
        };

        // Render the page onto the canvas
        await page.render(renderContext).promise;
      } catch (error) {
        console.error("Error loading or rendering PDF:", error);
      }
    };

    loadPdf();
  }, [fileUrl]);

  return (
    <div style={{ overflow: 'auto', textAlign: 'center' }}>
      <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
  );
};

console.log("PDF file URL:", fileUrl);

export default PdfViewer;
