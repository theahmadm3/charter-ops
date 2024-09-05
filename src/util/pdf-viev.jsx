import { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";

// Manually set the worker source to a URL that Vite can resolve
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfViewer = ({ pdfData }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({ data: pdfData });
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 1 });
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        page.render(renderContext);
      } catch (error) {
        console.error("Error rendering PDF:", error);
      }
    };

    loadPdf();
  }, [pdfData]);

  return <canvas ref={canvasRef}></canvas>;
};

export default PdfViewer;
