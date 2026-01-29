"use client";

import { useRef } from "react";
import { PageWrapper } from "@/components/page-wrapper";
import { motion, useInView } from "motion/react";
import Image from "next/image";
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
} from "react-icons/ri";

import { FaUserDoctor } from "react-icons/fa6";

import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ApiServiceItem } from "@/lib/api";
import { useChat } from "@/context/chat-context";
import { useEffect } from "react";

interface ProductDetailClientProps {
  product: ApiServiceItem;
  categorySlug: string;
}

export function ProductDetailClient({
  product,
  categorySlug,
}: ProductDetailClientProps) {
  const { setIsBottomBarVisible } = useChat();
  const mainButtonRef = useRef(null);
  const isMainButtonVisible = useInView(mainButtonRef, {
    margin: "0px 0px -100px 0px", // Adds a bit of buffer
    once: false,
  });

  // Update global chatbot visibility offset
  useEffect(() => {
    // The bar is visible when the main button is NOT visible
    setIsBottomBarVisible(!isMainButtonVisible);

    // Cleanup on unmount
    return () => setIsBottomBarVisible(false);
  }, [isMainButtonVisible, setIsBottomBarVisible]);

  return (
    <PageWrapper>
      <div className="min-h-auto bg-[#F0F9F5] pt-30 pb-40 md:pb-20 relative overflow-visible">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Visuals */}
            <div className="lg:col-span-7 w-full order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative aspect-square md:aspect-video lg:aspect-4/5 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl border-8 border-white group bg-white"
              >
                <Image
                  src={product.imagen || "/placeholder-service.jpg"}
                  alt={product.titulo}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/40 to-transparent pointer-events-none" />
                <div className="absolute top-8 left-8">
                  <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 shadow-lg flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#0D4B4D]">
                      Disponible Ahora
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Quick Highlight Cards (Desktop Only) */}
              <div className="hidden lg:grid grid-cols-3 gap-6 mt-10">
                {[
                  {
                    icon: RiStethoscopeLine,
                    label: "Validado Médicamente",
                    color: "bg-teal-50 text-teal-600",
                  },
                  {
                    icon: RiPriceTag3Line,
                    label: "Mejor Precio",
                    color: "bg-emerald-50 text-emerald-600",
                  },
                  {
                    icon: RiShareLine,
                    label: "Fácil de Compartir",
                    color: "bg-blue-50 text-blue-600",
                  },
                ].map((badge, idx) => (
                  <div
                    key={idx}
                    className="bg-white/40 border border-white/60 p-5 rounded-[2rem] flex flex-col items-center text-center gap-3 shadow-sm"
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl ${badge.color} flex items-center justify-center`}
                    >
                      <badge.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black text-[#0D4B4D]/60 uppercase tracking-widest leading-tight">
                      {badge.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Info (Sticky on Desktop) */}
            <div className="lg:col-span-5 w-full order-1 lg:order-2 lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <header className="space-y-6 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0D4B4D]/5 text-[#0D4B4D]/60 font-black text-[10px] tracking-[0.2em] uppercase border border-[#0D4B4D]/10">
                    <span>{product.category || "Servicio Digital"}</span>
                    <span className="w-1 h-1 rounded-full bg-emerald-500/30" />
                    <span>Dr. Recetas</span>
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-[#0D4B4D] leading-[0.9] tracking-tighter">
                    {product.titulo}
                  </h1>

                  <div className="flex flex-col gap-2 items-center lg:items-start">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl lg:text-6xl font-black text-[#0D4B4D] tracking-tighter">
                        ${product.precio || "0.00"}
                      </span>
                      <span className="text-[#0D4B4D]/30 font-bold text-sm uppercase tracking-widest">
                        USD
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-lg">
                      <RiListCheck className="w-4 h-4" />
                      Gestión administrativa incluida
                    </div>
                  </div>
                </header>

                <div className="space-y-8">
                  <p className="text-slate-600 text-lg font-medium leading-relaxed text-center lg:text-left">
                    {product.resumen}
                  </p>

                  <div ref={mainButtonRef} className="space-y-6">
                    <Button className="w-full h-16 rounded-[1.5rem] bg-[#0D4B4D] hover:bg-[#126467] text-white font-black text-lg transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] group flex items-center justify-center gap-4">
                      <span>Comprar Ahora</span>
                      <RiShoppingBag4Line className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    </Button>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#0D4B4D]/5 shadow-sm">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                          <RiListCheck className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-tight">
                          Entrega
                          <br />
                          Inmediata
                        </span>
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#0D4B4D]/5 shadow-sm">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                          <RiInformationLine className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-tight">
                          Soporte
                          <br />
                          24/7
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Share signals */}
                  <div className="flex items-center justify-center lg:justify-start gap-4 pt-4 border-t border-[#0D4B4D]/5">
                    <span className="text-[10px] font-black text-[#0D4B4D]/30 uppercase tracking-[0.2em]">
                      Compartir:
                    </span>
                    <div className="flex gap-2">
                      {[
                        RiFacebookFill,
                        RiTwitterXFill,
                        RiPinterestLine,
                        RiShareLine,
                      ].map((Icon, i) => (
                        <button
                          key={i}
                          className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#0D4B4D] hover:border-[#0D4B4D] transition-all"
                        >
                          <Icon className="w-4 h-4" />
                        </button>
                      ))}
                    </div>
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
                <TabsList className="bg-[#0D4B4D]/5 p-1 rounded-[2rem] h-auto gap-1 mb-12 flex flex-wrap justify-start w-fit border border-[#0D4B4D]/10">
                  <TabsTrigger
                    value="description"
                    className="px-8 py-3.5 rounded-full text-[#0D4B4D]/60 font-bold text-sm data-[state=active]:bg-white data-[state=active]:text-[#0D4B4D] data-[state=active]:shadow-sm transition-all duration-300 flex items-center gap-2"
                  >
                    <RiInformationLine className="w-4 h-4" />
                    Descripción
                  </TabsTrigger>
                  <TabsTrigger
                    value="details"
                    className="px-8 py-3.5 rounded-full text-[#0D4B4D]/60 font-bold text-sm data-[state=active]:bg-white data-[state=active]:text-[#0D4B4D] data-[state=active]:shadow-sm transition-all duration-300 flex items-center gap-2"
                  >
                    <RiListCheck className="w-4 h-4" />
                    Ficha Técnica
                  </TabsTrigger>
                </TabsList>

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
                type="single"
                collapsible
                defaultValue="description"
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
                          Horarios de Atención
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                          ¿Cuáles son los horarios de atención?
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
            <Button className="flex-1 max-w-[200px] h-auto py-2.5 md:py-3 rounded-xl bg-[#0D4B4D] hover:bg-[#126467] text-white font-bold text-sm md:text-base transition-all shadow-md hover:shadow-lg active:scale-[0.98] group flex items-center justify-center gap-2">
              <span>Comprar</span>
              <RiShoppingBag4Line className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
