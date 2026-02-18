import type { Metadata } from "next";

import "../globals.css";
import Header from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://drreceta.com"),
  title: {
    default: "Dr. Recetas - Servicios Médicos en linea en Puerto Rico",
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
    url: "https://drreceta.com",
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
    creator: "@drreceta",
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
    google: "googlef639e9c60eac2963",
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
import { StructuredData } from "@/components/structured-data";
import { AuthProvider } from "@/context/auth-context";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!["en", "es"].includes(locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <head>
        <StructuredData />
      </head>
      <body
        className="font-helvetica antialiased relative min-h-screen"
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <AuthProvider>
            <ChatProvider>
              <CartProvider>
                <Header />
                {children}
                <ChatbotFloating />
                <Footer />
                <Toaster position="top-right" theme="light" />
              </CartProvider>
            </ChatProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
