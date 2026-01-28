"use client";

import { PageWrapper } from "@/components/page-wrapper";
import { motion } from "motion/react";
import {
  RiShoppingBag4Line,
  RiCheckLine,
  RiHome5Line,
  RiStethoscopeLine,
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
      <div className="min-h-auto bg-[#FDFDFD] pt-40 pb-32 relative overflow-visible">
        {/* Navigation */}
        <div className="container mx-auto px-6 mb-12 relative z-60">
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

        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-stretch">
            {/* Left Column: Visuals */}
            <div className="relative space-y-8 lg:sticky lg:top-40">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative aspect-square rounded-[3rem] overflow-hidden bg-[#F5F8F7] shadow-sm border border-slate-100"
              >
                <Image
                  src={product.imagen || "/placeholder.svg"}
                  alt={product.titulo}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Floating Discount Badge */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute top-8 right-8 bg-[#CCFFD9] text-[#0A5D44] px-4 py-2 rounded-full font-black text-xs tracking-wider shadow-sm border border-emerald-100"
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

                <div className="space-y-6">
                  <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed">
                    {product.resumen}
                  </p>

                  <div className="pt-6">
                    <Button className="w-full sm:w-auto h-auto py-5 px-12 rounded-[2rem] bg-[#0D4B4D] hover:bg-[#126467] text-white font-black text-lg transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] group flex items-center gap-3">
                      Comenzar mi consulta
                      <RiShoppingBag4Line className="w-6 h-6 group-hover:rotate-12 transition-transform" />
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
                </div>

                <hr className="border-slate-100" />

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

                {/* Detalle Completo */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-black text-[#0D4B4D] mb-4 tracking-tight">
                      Detalles del Servicio
                    </h3>
                    <p className="text-slate-600 font-medium leading-relaxed text-justify">
                      {product.detalle}
                    </p>
                  </div>

                  {/* Tags */}
                  {product.tags && product.tags.length > 0 && (
                    <div>
                      <h4 className="text-sm font-black text-[#0D4B4D]/60 uppercase tracking-widest mb-3">
                        Categorías
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag: string, i: number) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.6 + i * 0.05 }}
                            className="inline-flex items-center px-4 py-2 rounded-full bg-teal-50/80 text-[#0D4B4D] font-bold text-xs border border-teal-100/50 hover:bg-teal-100/80 transition-colors cursor-default"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
