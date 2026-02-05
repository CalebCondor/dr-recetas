"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, AlertCircle } from "lucide-react";

interface PdfViewerProps {
  url: string;
  downloadUrl?: string;
}

export function PdfViewer({ url, downloadUrl: propDownloadUrl }: PdfViewerProps) {
  const [loadError, setLoadError] = useState(false);

  // Extraer la URL real si viene envuelta en /pdf/index.php?url=
  const extractRealUrl = (fullUrl: string) => {
    try {
      if (fullUrl.includes("/pdf/index.php?url=")) {
        const urlObj = new URL(fullUrl);
        const realUrl = urlObj.searchParams.get("url");
        if (realUrl) {
          return realUrl;
        }
      }
    } catch (error) {
      console.warn("Error al parsear URL:", error);
    }
    return fullUrl;
  };

  // URL procesada para el iframe
  const pdfUrl = extractRealUrl(url);
  // URL original para descargar - usar la que se pasa como prop, o la URL original si no se proporciona
  const downloadUrl = propDownloadUrl || url;

  const handleDownload = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Descargar usando la URL original sin procesar
    const downloadLink = document.createElement("a");
    downloadLink.href = downloadUrl;
    downloadLink.download = "orden-medica.pdf";
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">
          Vista Previa PDF
        </h3>
        <Button
          onClick={handleDownload}
          className="bg-[#0D4B4D] hover:bg-[#093638] text-white rounded-lg gap-2"
          size="sm"
        >
          <Download className="w-4 h-4" />
          Descargar
        </Button>
      </div>

      {/* PDF Container */}
      <div className="flex-1 overflow-auto bg-slate-100 flex flex-col items-center justify-start p-4">
        {loadError ? (
          <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center h-full">
            <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-amber-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900">
                No se puede mostrar la vista previa
              </h3>
              <p className="text-sm text-slate-500 max-w-sm">
                El documento no se puede visualizar en el navegador. Por favor,
                descárgalo para verlo.
              </p>
            </div>
            <Button
              onClick={handleDownload}
              className="bg-[#0D4B4D] hover:bg-[#093638] text-white px-6 py-2 rounded-lg font-bold"
            >
              <Download className="w-4 h-4 mr-2 inline" />
              Descargar PDF
            </Button>
          </div>
        ) : (
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=fit`}
            className="w-full h-full border-0 rounded-lg"
            title="Orden Médica PDF"
            onError={() => setLoadError(true)}
          />
        )}
      </div>
    </div>
  );
}
