"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, AlertCircle } from "lucide-react";

interface PdfViewerProps {
  url: string;
}

export function PdfViewer({ url }: PdfViewerProps) {
  const [useGoogleViewer, setUseGoogleViewer] = useState(false);
  const [loadError, setLoadError] = useState(false);


  // Extraer la URL real si viene envuelta en /pdf/index.php?url=
  const extractRealUrl = (fullUrl: string) => {
    try {
      // Si contiene /pdf/index.php?url=, extraer el parámetro url
      if (fullUrl.includes("/pdf/index.php?url=")) {
        const urlObj = new URL(fullUrl);
        const realUrl = urlObj.searchParams.get("url");
        if (realUrl) {
          console.log("URL original:", fullUrl);
          console.log("URL extraída:", realUrl);
          return realUrl;
        }
      }
    } catch (error) {
      console.warn("Error al parsear URL:", error);
    }
    return fullUrl;
  };

  const pdfUrl = extractRealUrl(url);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "orden-medica.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Google Docs Viewer URL (fallback)
  const googleViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`;

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
      <div className="flex-1 overflow-hidden bg-slate-100 flex items-center justify-center">
        {loadError ? (
          <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
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
            src={
              useGoogleViewer
                ? googleViewerUrl
                : `${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`
            }
            className="w-full h-full border-0"
            title="Orden Médica PDF"
            onLoad={() => {
              // El iframe cargó. No mostrar error automáticamente
              // Solo mostrar error si hay un evento onError explícito
            }}
            onError={() => {
              if (useGoogleViewer) {
                // Si Google Viewer también falla, mostrar error
                setLoadError(true);
              } else {
                // Intentar con Google Viewer como fallback
                setUseGoogleViewer(true);
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
