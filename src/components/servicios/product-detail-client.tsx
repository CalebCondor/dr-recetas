"use client";

import { useRef } from "react";
import { PageWrapper } from "@/components/page-wrapper";
import { motion, useInView } from "motion/react";
import {
  RiShoppingBag4Line,
  RiHome5Line,
  RiStethoscopeLine,
  RiInformationLine,
  RiListCheck,
  RiZoomInLine,
  RiPriceTag3Line,
  RiShareLine,
  RiFacebookFill,
  RiTwitterXFill,
  RiPinterestLine,
  RiLinkedinFill,
} from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ApiServiceItem } from "@/lib/api";
import { useChat } from "@/context/chat-context";
import { useCart } from "@/context/cart-context";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProductDetailClientProps {
  product: ApiServiceItem;
  categorySlug: string;
}

export function ProductDetailClient({
  product,
  categorySlug,
}: ProductDetailClientProps) {
  const router = useRouter();
  const { setIsBottomBarVisible } = useChat();
  const { addToCart } = useCart();
  const mainButtonRef = useRef(null);
  const isMainButtonVisible = useInView(mainButtonRef, {
    margin: "0px 0px -100px 0px", // Adds a bit of buffer
    once: false,
  });
  const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(false);

  const handleAddToCart = () => {
    // Check if user is logged in
    const isUserLoggedIn =
      typeof window !== "undefined" && localStorage.getItem("dr_user");

    if (!isUserLoggedIn) {
      setIsLoginAlertOpen(true);
      return;
    }

    addToCart({
      id: product.id.toString(),
      titulo: product.titulo,
      precio: product.precio,
      imagen: product.imagen || "/logo.png",
      categoria: product.category || "Servicio",
      detalle: product.resumen,
    });
    router.push("/carrito");
  };

  // Update global chatbot visibility offset
  useEffect(() => {
    // The bar is visible when the main button is NOT visible
    setIsBottomBarVisible(!isMainButtonVisible);

    // Cleanup on unmount
    return () => setIsBottomBarVisible(false);
  }, [isMainButtonVisible, setIsBottomBarVisible]);

  return (
    <PageWrapper>
      <div className="min-h-auto pt-30 pb-40 md:pb-20 relative overflow-visible">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:gap-12 items-start">
            {/* Right Column: Info */}
            <div className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6 max-h-none overflow-visible"
              >
                <header className="space-y-4">
                  <div className="flex items-center gap-2 text-[#0D4B4D]/40 font-black text-xs tracking-[0.2em] uppercase">
                    <span>{product.category || "Servicio Digital"}</span>
                    <span className="w-1 h-1 rounded-full bg-teal-500/30" />
                    <span>Dr. Recetas</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0D4B4D] leading-[0.95] tracking-tighter">
                    {product.titulo.split(" ").map((word, i) => (
                      <span
                        key={i}
                        className={i % 3 === 2 ? "text-teal-600/30" : ""}
                      >
                        {word}{" "}
                      </span>
                    ))}
                  </h1>
                </header>

                <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed">
                  {product.resumen}
                </p>

                <div
                  ref={mainButtonRef}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-8 lg:pt-12 border-t border-[#0D4B4D]/10"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-8 lg:gap-12">
                    {/* Price info - Visible on all screens */}
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none">
                        Precio
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0D4B4D] tracking-tighter">
                          ${product.precio || "0.00"}
                        </span>
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                          USD
                        </span>
                      </div>
                    </div>

                    {/* Action Button: controlled size on desktop */}
                    <Button
                      onClick={handleAddToCart}
                      className="w-full md:w-[200px] lg:w-[240px] h-auto py-4 px-8 md:py-3 md:px-6 rounded-2xl lg:rounded-[1.5rem] bg-[#0D4B4D] hover:bg-[#126467] text-white font-black text-base transition-all shadow-xl hover:shadow-[0_20px_50px_rgba(13,75,77,0.25)] hover:-translate-y-1 active:scale-[0.98] group flex items-center justify-center gap-3"
                    >
                      <span>comprar</span>
                      <RiShoppingBag4Line className="w-5 h-5 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Tabs Section (Desktop) & Accordion (Mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="mt-6 lg:mt-16 border-t border-[#0D4B4D]/10 pt-8"
          >
            {/* Desktop Tabs */}
            <div className="hidden md:block">
              <Tabs defaultValue="description" className="w-full">
                <div className="flex justify-center md:justify-start mb-10">
                  <TabsList className="bg-slate-100/80 backdrop-blur-sm p-1.5 rounded-2xl border border-slate-200/50 h-auto gap-1">
                    <TabsTrigger
                      value="description"
                      className="rounded-xl px-5 py-2.5 text-sm font-bold text-slate-500 data-[state=active]:bg-white data-[state=active]:text-[#0D4B4D] data-[state=active]:shadow-sm transition-all gap-2"
                    >
                      <RiInformationLine className="w-4 h-4" />
                      Descripción
                    </TabsTrigger>
                    <TabsTrigger
                      value="details"
                      className="rounded-xl px-5 py-2.5 text-sm font-bold text-slate-500 data-[state=active]:bg-white data-[state=active]:text-[#0D4B4D] data-[state=active]:shadow-sm transition-all gap-2"
                    >
                      <RiListCheck className="w-4 h-4" />
                      Ficha Técnica
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="bg-white/60 backdrop-blur-md rounded-[2.5rem] p-12 border border-[#0D4B4D]/10 shadow-[0_20px_50px_rgba(13,75,77,0.05)]">
                  <TabsContent
                    value="description"
                    className="mt-0 outline-none"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="prose prose-slate max-w-none"
                    >
                      <h3 className="text-2xl font-black text-[#0D4B4D] mb-6 tracking-tight">
                        Descripción Detallada
                      </h3>
                      <p className="text-slate-600 text-lg font-medium leading-relaxed whitespace-pre-line text-left">
                        {product.detalle || product.resumen}
                      </p>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="details" className="mt-0 outline-none">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-12"
                    >
                      <div>
                        <h3 className="text-2xl font-black text-[#0D4B4D] mb-8 tracking-tight">
                          Especificaciones del Servicio
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                          {[
                            {
                              label: "Servicio",
                              value: product.titulo,
                              icon: RiStethoscopeLine,
                            },
                            {
                              label: "Categoría",
                              value: product.category || "General",
                              icon: FaUserDoctor,
                            },
                            {
                              label: "Disponibilidad",
                              value: "24/7 Online",
                              icon: RiHome5Line,
                            },
                            {
                              label: "Tiempo de respuesta",
                              value: "Inmediato",
                              icon: RiInformationLine,
                            },
                            {
                              label: "Código",
                              value: (product.pq_codigo || "N/A").toUpperCase(),
                              icon: RiListCheck,
                            },
                            {
                              label: "Gestión",
                              value: "Soporte Prioritario",
                              icon: RiListCheck,
                            },
                          ].map((item, i) => (
                            <div
                              key={i}
                              className="group flex flex-col py-5 border-b border-[#0D4B4D]/10 hover:border-teal-200 transition-colors"
                            >
                              <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#0D4B4D]/40 group-hover:bg-teal-50 group-hover:text-teal-600 transition-all shrink-0 mt-0.5">
                                  {item.icon && (
                                    <item.icon className="w-5 h-5" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col gap-1">
                                  <span className="text-slate-400 font-bold uppercase text-[9px] tracking-widest block">
                                    {item.label}
                                  </span>
                                  <span className="text-[#0D4B4D] font-black text-sm leading-snug wrap-break-word">
                                    {item.value}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            {/* Mobile Accordion */}
            <div className="md:hidden space-y-4">
              <Accordion
                type="multiple"
                defaultValue={["description"]}
                className="w-full space-y-3"
              >
                <AccordionItem
                  value="description"
                  className="group border border-[#0D4B4D]/10 rounded-3xl bg-white/60 backdrop-blur-sm overflow-hidden transition-all duration-300 data-[state=open]:shadow-lg data-[state=open]:border-teal-500/20"
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline">
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 transition-all duration-300 group-data-[state=open]:bg-teal-500 group-data-[state=open]:text-white group-data-[state=open]:rotate-[360deg] group-data-[state=open]:rounded-full shadow-sm">
                        <RiInformationLine className="w-6 h-6" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[#0D4B4D] font-black text-lg tracking-tight transition-colors group-data-[state=open]:text-teal-600">
                          Detalle Ampliado
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                          ¿De qué trata este servicio?
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 pt-0">
                    <p className="text-slate-600 font-medium leading-relaxed text-base">
                      {product.detalle || product.resumen}
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="details"
                  className="group border border-[#0D4B4D]/10 rounded-3xl bg-white/60 backdrop-blur-sm overflow-hidden transition-all duration-300 data-[state=open]:shadow-lg data-[state=open]:border-blue-500/20"
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline">
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 transition-all duration-300 group-data-[state=open]:bg-blue-600 group-data-[state=open]:text-white group-data-[state=open]:rotate-[360deg] group-data-[state=open]:rounded-full shadow-sm">
                        <RiListCheck className="w-6 h-6" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[#0D4B4D] font-black text-lg tracking-tight transition-colors group-data-[state=open]:text-blue-600">
                          Ficha Técnica
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                          Detalles y especificaciones
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 pt-0">
                    <div className="space-y-4">
                      {[
                        { label: "Servicio", value: product.titulo },
                        {
                          label: "Categoría",
                          value: product.category || "General",
                        },
                        { label: "Disponibilidad", value: "24/7 Online" },
                        { label: "Respuesta", value: "Inmediato" },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex flex-col gap-0.5 py-2 border-b border-slate-50 last:border-0"
                        >
                          <span className="text-slate-400 font-bold uppercase text-[9px] tracking-widest">
                            {item.label}
                          </span>
                          <span className="text-[#0D4B4D] font-black text-sm">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </motion.div>
        </div>

        {/* Fixed Bottom Action Bar */}
        <motion.div
          initial={{ y: 200, opacity: 0 }}
          animate={{
            y: isMainButtonVisible ? 200 : 0,
            opacity: isMainButtonVisible ? 0 : 1,
          }}
          transition={{ duration: 0.5, type: "spring", damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-slate-200/60 shadow-[0_-20px_60px_rgba(0,0,0,0.08)] px-4 py-4 md:hidden"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 md:gap-12">
            {/* Price Info (Hidden on very small screens, visible on mobile+) */}
            <div className="flex flex-col items-start min-w-fit">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">
                Total a pagar
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl md:text-3xl font-black text-[#0D4B4D] tracking-tight">
                  ${product.precio || "0.00"}
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold text-slate-400">
                  USD
                </span>
              </div>
            </div>

            {/* Main Action Button */}
            <Button
              onClick={handleAddToCart}
              className="flex-1 max-w-[200px] h-auto py-2.5 md:py-3 rounded-xl bg-[#0D4B4D] hover:bg-[#126467] text-white font-bold text-sm md:text-base transition-all shadow-md hover:shadow-lg active:scale-[0.98] group flex items-center justify-center gap-2"
            >
              <span>Comprar</span>
              <RiShoppingBag4Line className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
            </Button>
          </div>
        </motion.div>

        {/* Login Required Notification Dialog */}
        <Dialog open={isLoginAlertOpen} onOpenChange={setIsLoginAlertOpen}>
          <DialogContent
            showCloseButton={false}
            className="rounded-[3rem] p-12 md:p-16 border-none shadow-[0_30px_100px_rgba(0,0,0,0.15)] w-[92vw] max-w-lg bg-white cursor-pointer"
            onClick={() => setIsLoginAlertOpen(false)}
          >
            <div className="flex flex-col items-center text-center gap-8 pointer-events-none">
              <div className="w-24 h-24 rounded-full bg-amber-50/50 flex items-center justify-center text-amber-500 shadow-inner">
                <RiInformationLine size={48} />
              </div>
              <div className="space-y-4">
                <DialogTitle className="text-4xl font-black text-[#0D4B4D] tracking-tight">
                  Acceso Restringido
                </DialogTitle>
                <DialogDescription className="text-slate-500 font-medium text-xl leading-relaxed max-w-xs mx-auto">
                  Para añadir servicios al carrito, primero debes{" "}
                  <span className="font-bold text-[#0D4B4D]">
                    iniciar sesión
                  </span>
                  .
                </DialogDescription>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </PageWrapper>
  );
}
