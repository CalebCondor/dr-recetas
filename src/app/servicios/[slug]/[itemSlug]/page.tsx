"use client";

import { useParams, useRouter } from "next/navigation";
import { PageWrapper } from "@/components/page-wrapper";
import { useProductDetail } from "@/hooks/use-product-detail";
import { motion } from "motion/react";
import {
  RiLoader4Line,
  RiArrowLeftLine,
  RiShoppingBag4Line,
  RiCheckLine,
  RiStarFill,
} from "react-icons/ri";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const itemSlug = params?.itemSlug as string;

  const { product, loading } = useProductDetail(slug, itemSlug);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD]">
        <RiLoader4Line className="w-12 h-12 text-[#0D4B4D] animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFDFD] gap-4">
        <h1 className="text-2xl font-bold text-slate-400 text-balance text-center">
          No encontramos lo que buscabas
        </h1>
        <Button variant="outline" onClick={() => router.back()}>
          Volver
        </Button>
      </div>
    );
  }

  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#FDFDFD] pt-24 pb-32 relative overflow-hidden">
        {/* Navigation */}
        <div className="container mx-auto px-6 mb-12">
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-[#0D4B4D]/60 hover:text-[#0D4B4D] transition-colors font-bold uppercase tracking-widest text-xs"
          >
            <RiArrowLeftLine className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Vover a {slug.replace(/-/g, " ")}
          </button>
        </div>

        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
            {/* Left Column: Visuals */}
            <div className="relative space-y-8">
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

              {/* Floating Testimonial Card */}
              {/* <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="absolute -bottom-12 -left-8 md:bottom-24 md:-left-16 bg-white p-6 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-50 max-w-[280px] z-20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-teal-100 overflow-hidden shrink-0">
                    <Image
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=James"
                      alt="Avatar"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-[#0D4B4D]">
                      James Wilson
                    </h4>
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <RiStarFill key={s} size={10} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Increíble servicio. No esperaba que fuera tan rápido y
                  efectivo. Los resultados se notaron de inmediato.
                </p>
              </motion.div> */}
            </div>

            {/* Right Column: Info */}
            <div className="py-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-10"
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
                    {product.resumen || product.detalle}
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
              </motion.div>
            </div>
          </div>
        </div>

        {/* Floating Credit Card Card (Visual Detail) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1 }}
          className="hidden xl:block absolute -right-20 top-1/2 p-10 bg-white rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.1)] border border-slate-50 z-20"
        >
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-black text-xl text-[#0D4B4D] tracking-tight">
                ¡Pago Exitoso!
              </h4>
              <p className="text-sm text-slate-400 font-medium tracking-tight">
                Gracias por confiar en nosotros.
              </p>
            </div>
            <Button
              size="lg"
              className="w-full rounded-2xl bg-[#0D4B4D] font-bold"
            >
              Continuar
            </Button>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
