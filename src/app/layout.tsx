import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { GlobalBackground } from "@/components/global-background";
import { PagePrefetcher } from "@/components/page-prefetcher";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://drreceta.com"),
  title: {
    default: "Dr. Recetas - Servicios Médicos Digitales en Puerto Rico",
    template: "%s | Dr. Recetas",
  },
  description:
    "Accede a consultas médicas en línea, recetas digitales, certificados médicos y más. Atención médica profesional 24/7 desde la comodidad de tu hogar en Puerto Rico.",
  keywords: [
    "consultas médicas online",
    "recetas médicas digitales",
    "certificados médicos",
    "telemedicina Puerto Rico",
    "doctor online",
    "consulta médica virtual",
    "recetas digitales",
    "certificado de incapacidad",
    "servicios médicos digitales",
    "atención médica remota",
  ],
  authors: [{ name: "Dr. Recetas" }],
  creator: "Dr. Recetas",
  publisher: "Dr. Recetas",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_PR",
    url: "https://doctorrecetas.com",
    siteName: "Dr. Recetas",
    title: "Dr. Recetas - Servicios Médicos Digitales en Puerto Rico",
    description:
      "Consultas médicas en línea, recetas digitales y certificados médicos. Atención profesional 24/7.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dr. Recetas - Servicios Médicos Digitales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Recetas - Servicios Médicos Digitales",
    description:
      "Consultas médicas en línea, recetas digitales y certificados médicos 24/7",
    images: ["/og-image.png"],
    creator: "@doctorrecetas",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    // Agregar cuando tengas las verificaciones
    // google: 'tu-codigo-de-verificacion',
    // yandex: 'tu-codigo-de-verificacion',
  },
  alternates: {
    canonical: "https://doctorrecetas.com",
  },
  category: "healthcare",
};

import { ChatbotFloating } from "@/components/shell/chatbot-floating";
import { ChatProvider } from "@/context/chat-context";
import { CartProvider } from "@/context/cart-context";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              if (window.location.hash) {
                history.replaceState(null, '', window.location.pathname + window.location.search);
              }
              window.scrollTo(0, 0);
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased relative min-h-screen`}
      >
        <ChatProvider>
          <CartProvider>
            <Header />
            {children}
            <ChatbotFloating />
            <Footer />
            <Toaster position="top-right" theme="light" />
          </CartProvider>
        </ChatProvider>
      </body>
    </html>
  );
}
