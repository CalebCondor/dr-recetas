"use client";

import { PageWrapper } from "@/components/page-wrapper";
import { motion } from "motion/react";
import {
  RiShoppingBag4Line,
  RiCheckLine,
  RiHome5Line,
  RiStethoscopeLine,
  RiInformationLine,
  RiListCheck,
  RiPriceTag3Line,
} from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiServiceItem } from "@/lib/api";

interface ProductDetailClientProps {
  product: ApiServiceItem;
  categorySlug: string;
}

export function ProductDetailClient({
  product,
  categorySlug,
}: ProductDetailClientProps) {
  return (
    <PageWrapper>
      <div className="min-h-auto bg-[#FDFDFD] pt-30 pb-32 relative overflow-visible">
        {/* Navigation */}
        <div className="w-full px-6 md:px-12 lg:px-[8%] mb-12 relative z-10">
          <Breadcrumb>
            <BreadcrumbList className="font-bold uppercase tracking-widest text-[10px] text-[#0D4B4D]/60 sm:gap-4">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href="/"
                    className="flex items-center gap-1.5 hover:text-[#0D4B4D] hover:opacity-100 transition-all cursor-pointer"
                  >
                    <RiHome5Line className="w-3.5 h-3.5" />
                    Inicio
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="opacity-20" />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href={`/servicios/${categorySlug}`}
                    className="flex items-center gap-1.5 hover:text-[#0D4B4D] hover:opacity-100 transition-all cursor-pointer"
                  >
                    <FaUserDoctor className="w-3.5 h-3.5" />
                    {categorySlug.replace(/-/g, " ")}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="opacity-20" />
              <BreadcrumbItem>
                <BreadcrumbPage className="flex items-center gap-1.5 text-[#0D4B4D] font-black cursor-default">
                  <RiStethoscopeLine className="w-3.5 h-3.5" />
                  {product.titulo}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="w-full px-6 md:px-12 lg:px-[8%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-stretch">
            {/* Left Column: Visuals */}
            <div className="relative space-y-6 lg:sticky lg:top-40 mx-auto lg:ml-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-[#F5F8F7] shadow-sm border border-slate-100"
              >
                <Image
                  src={product.imagen || "/placeholder.svg"}
                  alt={product.titulo}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />

                {/* Floating Discount Badge */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute top-6 right-6 bg-[#CCFFD9] text-[#0A5D44] px-3 py-1.5 rounded-full font-black text-[10px] tracking-wider shadow-sm border border-emerald-100"
                >
                  -15% DESCUENTO
                </motion.div>
              </motion.div>

              {/* Thumbnail/Gallery or Reviews Peek */}
              <div className="grid grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="aspect-square rounded-2xl bg-[#F5F8F7] overflow-hidden border border-slate-100/50 cursor-pointer hover:border-teal-200 transition-colors"
                  >
                    <Image
                      src={product.imagen || "/placeholder.svg"}
                      alt={product.titulo}
                      width={200}
                      height={200}
                      className={`object-cover h-full w-full opacity-40 hover:opacity-100 transition-opacity ${i === 1 ? "opacity-100" : ""}`}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column: Info */}
            <div className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-10 max-h-none overflow-visible"
              >
                <header className="space-y-4">
                  <div className="flex items-center gap-2 text-[#0D4B4D]/40 font-black text-xs tracking-[0.2em] uppercase">
                    <span>{product.category || "Servicio Digital"}</span>
                    <span className="w-1 h-1 rounded-full bg-teal-500/30" />
                    <span>Dr. Recetas</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-[#0D4B4D] leading-[0.95] tracking-tighter">
                    {product.titulo.split(" ").map((word, i) => (
                      <span
                        key={i}
                        className={i % 3 === 2 ? "text-teal-600/30" : ""}
                      >
                        {word}{" "}
                      </span>
                    ))}
                  </h1>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-[#0D4B4D]">
                      ${product.precio || "0.00"}
                    </span>
                    <span className="text-slate-400 font-bold text-sm">
                      envío + gestión
                    </span>
                  </div>
                </header>

                <div className="space-y-8">
                  <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed">
                    {product.resumen}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-50">
                    <Button className="w-full sm:flex-1 h-auto py-4 px-8 rounded-2xl bg-[#0D4B4D] hover:bg-[#126467] text-white font-black text-base transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] group flex items-center justify-center gap-3">
                      Comprar Consulta
                      <RiShoppingBag4Line className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    </Button>
                  </div>

                  {/* Social Proof */}
                  <div className="flex items-center gap-4 pt-4">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-white bg-teal-50 overflow-hidden ring-1 ring-slate-100"
                        >
                          <Image
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`}
                            alt="user"
                            width={32}
                            height={32}
                            unoptimized
                          />
                        </div>
                      ))}
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-[#0D4B4D] flex items-center justify-center text-[10px] text-white font-bold ring-1 ring-slate-100">
                        +12
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                      Personas consultaron hoy
                    </p>
                  </div>

                  <hr className="border-slate-100" />
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                  {[
                    "Consulta médica inmediata",
                    "Chat con nuestros especialistas",
                    "Recetas digitales válidas",
                    "Protección de datos 100%",
                    "Atención 24/7 online",
                    "Revisiones periódicas",
                  ].map((text, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + i * 0.1 }}
                      className="flex items-center gap-3 text-sm font-bold text-[#0D4B4D]/80"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#E8F5EE] flex items-center justify-center text-[#10A37F] shrink-0">
                        <RiCheckLine className="w-4 h-4" />
                      </div>
                      {text}
                    </motion.li>
                  ))}
                </ul>

                <hr className="border-slate-100" />
              </motion.div>
            </div>
          </div>

          {/* Bottom Tabs Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1 }}
            className=" mt-2 lg:mt-16 border-t border-slate-100 "
          >
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="bg-slate-100/50 p-1 rounded-[1.25rem] md:rounded-[2rem] h-auto gap-1 mb-8 md:mb-12 flex flex-nowrap overflow-x-auto pb-1 sm:pb-0 scrollbar-hide justify-start md:justify-start w-full md:w-fit mx-auto md:mx-0 border border-slate-200/50">
                <TabsTrigger
                  value="description"
                  className="px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-xl sm:rounded-full text-[#0D4B4D]/60 font-bold text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:text-[#0D4B4D] data-[state=active]:shadow-sm transition-all duration-300 flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <RiInformationLine className="w-4 h-4" />
                  Descripción
                </TabsTrigger>
                <TabsTrigger
                  value="details"
                  className="px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-xl sm:rounded-full text-[#0D4B4D]/60 font-bold text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:text-[#0D4B4D] data-[state=active]:shadow-sm transition-all duration-300 flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <RiListCheck className="w-4 h-4" />
                  Ficha Técnica
                </TabsTrigger>
                {product.tags && product.tags.length > 0 && (
                  <TabsTrigger
                    value="tags"
                    className="px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-xl sm:rounded-full text-[#0D4B4D]/60 font-bold text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:text-[#0D4B4D] data-[state=active]:shadow-sm transition-all duration-300 flex items-center gap-2 whitespace-nowrap shrink-0"
                  >
                    <RiPriceTag3Line className="w-4 h-4" />
                    Categorías
                  </TabsTrigger>
                )}
              </TabsList>

              <div className="bg-[#FDFDFD] rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-12 border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)]">
                <TabsContent value="description" className="mt-0 outline-none">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="prose prose-slate max-w-none"
                  >
                    <h3 className="text-2xl font-black text-[#0D4B4D] mb-6 tracking-tight">
                      Descripción Detallada
                    </h3>
                    <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed whitespace-pre-line text-left">
                      {product.detalle || product.resumen}
                    </p>
                  </motion.div>
                </TabsContent>

                <TabsContent value="details" className="mt-0 outline-none">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  >
                    <div className="space-y-4">
                      <h3 className="text-2xl font-black text-[#0D4B4D] mb-2 tracking-tight">
                        Especificaciones
                      </h3>
                      <div className="space-y-3">
                        {[
                          { label: "Servicio", value: product.titulo },
                          {
                            label: "Categoría",
                            value: product.category || "General",
                          },
                          { label: "Disponibilidad", value: "24/7 Online" },
                          { label: "Tiempo de respuesta", value: "Inmediato" },
                        ].map((item, i) => (
                          <div
                            key={i}
                            className="flex justify-between py-3 border-b border-slate-50"
                          >
                            <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                              {item.label}
                            </span>
                            <span className="text-[#0D4B4D] font-black text-sm">
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="tags" className="mt-0 outline-none">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <h3 className="text-2xl font-black text-[#0D4B4D] mb-6 tracking-tight">
                      Relacionado con
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {product.tags?.map((tag: string, i: number) => (
                        <span
                          key={i}
                          className="inline-flex items-center px-6 py-3 rounded-full bg-teal-50/80 text-[#0D4B4D] font-bold text-sm border border-teal-100/50 hover:bg-teal-100/80 transition-colors cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </TabsContent>
              </div>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}
