"use client";

import { useState, useEffect, useRef } from "react";
import { servicesData } from "@/lib/services-data";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PageWrapper } from "@/components/page-wrapper";
import { motion, AnimatePresence } from "motion/react";
import { RiArrowRightUpLine, RiLoader4Line } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { ServicesCarousel } from "@/components/home/services-carousel";

import { useServiceDetails } from "@/hooks/use-service-details";
import { useInView } from "motion/react";

// Helper component for the Bento card
function ServiceBentoCard({
  title,
  content,
  price,
  image,
  category,
  index = 0,
  slug,
  categorySlug,
}: {
  title: string;
  content: string;
  price?: string;
  image?: string;
  category?: string;
  index?: number;
  slug: string;
  categorySlug: string;
}) {
  const cardRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isFocused = useInView(cardRef, {
    amount: 0.6,
    margin: "-10% 0px -10% 0px",
  });

  const shouldAnimateFocus = isMobile && isFocused;

  const defaultImages = [
    "/citas-medicas/1.png",
    "/citas-medicas/2.png",
    "/citas-medicas/3.png",
    "/citas-medicas/1.png",
  ];
  const bgImage = image || defaultImages[index % defaultImages.length];

  const cardColors = [
    "bg-white text-slate-900 border-slate-100",
    "bg-[#FFD54F] text-[#0D4B4D] border-[#FFECB3]",
    "bg-[#E1F5FE] text-[#01579B] border-[#B3E5FC]",
    "bg-[#0D4B4D] text-white border-white/10",
    "bg-[#FCE4EC] text-[#880E4F] border-[#F8BBD0]",
    "bg-[#E8F5E9] text-[#1B5E20] border-[#C8E6C9]",
  ];
  const currentBg = cardColors[index % cardColors.length];
  const isDark =
    currentBg.includes("text-white") || currentBg.includes("bg-[#0D4B4D]");

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0.85, y: 10, scale: 0.97 }}
      animate={{
        opacity: isMobile ? (shouldAnimateFocus ? 1 : 0.85) : 1,
        y: shouldAnimateFocus ? -8 : 0,
        scale: isMobile ? (shouldAnimateFocus ? 1.03 : 0.97) : 1,
      }}
      whileHover={{
        y: -15,
        scale: 1.05,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="h-full"
    >
      <Link
        href={`/servicios/${categorySlug}/${slug}`}
        className={`group relative rounded-[3rem] overflow-hidden ${currentBg} h-full flex flex-col p-8 md:p-12 transition-all duration-700 shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_45px_90px_rgba(13,75,77,0.15)] border block`}
      >
        {/* Shine/Glare Effect Overlay */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${isFocused ? "opacity-40" : "opacity-0"} group-hover:opacity-100`}
        >
          <div className="absolute inset-x-0 -top-full bottom-0 bg-linear-to-b from-white/20 via-transparent to-transparent rotate-45 translate-x-full group-hover:animate-[shine_1.5s_ease-in-out_infinite] transition-transform duration-1000" />
        </div>

        {/* Background Image */}
        <motion.div
          className="absolute right-0 top-4 w-[65%] h-[75%] z-0"
          animate={{
            opacity: shouldAnimateFocus ? 0.7 : isMobile ? 0.4 : 0.7,
            scale: shouldAnimateFocus ? 1.1 : 1,
            x: shouldAnimateFocus ? 5 : 0,
            y: shouldAnimateFocus ? -5 : 0,
          }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div
            className="w-full h-full bg-contain bg-bottom-right bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-115"
            style={{ backgroundImage: `url("${bgImage}")` }}
          />
        </motion.div>

        {/* Central Content (Top Area) */}
        <div className="relative z-20 space-y-3 max-w-[65%] transition-transform duration-500 mb-6">
          <h3 className="text-2xl md:text-3xl font-black leading-tight tracking-tight line-clamp-2 overflow-hidden">
            {title}
          </h3>
          <p
            className={`text-sm md:text-base leading-relaxed line-clamp-3 overflow-hidden font-medium ${isDark ? "text-white/70" : "text-slate-600"}`}
          >
            {content}
          </p>
        </div>

        {/* Bottom Section: Price Area (Pushed to bottom by mt-auto) */}
        <div className="mt-auto relative z-20">
          {price && (
            <div className="flex flex-col">
              <span
                className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-40 ${isDark ? "text-white" : "text-[#0D4B4D]"}`}
              >
                Precio base
              </span>
              <div className="text-3xl md:text-4xl font-black leading-none tracking-tighter">
                ${price}
              </div>
            </div>
          )}
        </div>

        {/* Category Tag (Absolute) */}
        {category && (
          <div
            className={`absolute top-8 right-8 z-10 px-3 py-1.5 rounded-full border backdrop-blur-md uppercase font-black text-[10px] tracking-widest pointer-events-none transition-all duration-500 ${
              isDark
                ? "bg-white/10 text-white/90 border-white/10"
                : "bg-black/5 text-slate-900/60 border-black/10"
            } ${isMobile ? (shouldAnimateFocus ? "opacity-100" : "opacity-40") : "opacity-40 group-hover:opacity-100"}`}
          >
            {category}
          </div>
        )}

        {/* Action Button (Absolute) */}
        <div className="absolute bottom-8 right-8 z-20">
          <div
            className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg ${isDark ? "bg-white text-[#0D4B4D]" : "bg-[#0D4B4D] text-white"} ${isFocused ? "scale-110 rotate-6" : "scale-100"}`}
          >
            <RiArrowRightUpLine className="w-6 h-6 md:w-8 md:h-8 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

const ITEMS_PER_PAGE = 4;

export default function ServicePage() {
  const params = useParams();
  const slug = params?.slug as string;

  const { categories, apiItems, loading, serviceInfo } =
    useServiceDetails(slug);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  if (!serviceInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7F6]">
        {loading ? (
          <RiLoader4Line className="w-12 h-12 text-teal-600 animate-spin" />
        ) : (
          <h1 className="text-2xl font-bold text-gray-400">
            Servicio no encontrado
          </h1>
        )}
      </div>
    );
  }

  const otherServices = (
    categories.length > 0
      ? categories
          .filter(
            (c) =>
              (c.tag?.toLowerCase().replace(/\s+/g, "-") || "otros") !== slug,
          )
          .map((c) => ({
            title: c.nombre,
            description: c.lead,
            imageSrc: c.imagen,
            imageAlt: c.nombre,
            href: `/servicios/${
              c.tag?.toLowerCase().replace(/\s+/g, "-") || "otros"
            }`,
          }))
      : servicesData
          .filter((s) => s.slug !== slug)
          .map((s) => ({
            ...s,
            href: `/servicios/${s.slug}`,
          }))
  ).slice(0, 6);

  const visibleItems = apiItems.slice(0, visibleCount);
  const hasMore = visibleCount < apiItems.length;

  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#F5F7F6] pt-16 pb-24 overflow-hidden relative">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#E0F3F1]/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#EEF5F4]/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="relative mb-12">
          <div className="container mx-auto px-6 text-center relative z-10 pt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block mb-6 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100/50 text-teal-700 text-sm font-bold tracking-wide uppercase"
            >
              Nuestros Servicios
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl lg:text-8xl font-black text-[#0D4B4D] mb-8 tracking-tighter leading-[0.9]"
            >
              {serviceInfo?.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-teal-900/60 text-lg md:text-2xl font-medium leading-relaxed max-w-3xl mx-auto"
            >
              {serviceInfo?.longDescription || serviceInfo?.description}
            </motion.p>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 mb-16 relative z-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <RiLoader4Line className="w-12 h-12 text-teal-600 animate-spin" />
              <p className="text-teal-900/40 font-medium">Cargando...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[340px] grid-flow-dense">
              <AnimatePresence mode="popLayout">
                {(() => {
                  const gridClasses: string[] = [];
                  const slots = Array.from({ length: 200 }, () => [
                    false,
                    false,
                    false,
                  ]);

                  visibleItems.forEach((_, i) => {
                    const isLast = i === visibleItems.length - 1;
                    // Simple logic: vary colSpan between 1 and 2, but last fills.
                    const cSpan = i % 3 === 0 ? 2 : 1;
                    let rSpan = 1;

                    // Randomly make some small ones tall
                    if (
                      cSpan === 1 &&
                      i % 4 === 0 &&
                      i < visibleItems.length - 2
                    ) {
                      rSpan = 2;
                    }

                    // Find first fit
                    let placed = false;
                    for (let r = 0; r < 200 && !placed; r++) {
                      for (let c = 0; c < 3 && !placed; c++) {
                        if (!slots[r][c]) {
                          // Try to fit
                          let actualCSpan = Math.min(cSpan, 3 - c);
                          if (isLast) actualCSpan = 3 - c;

                          // Check vertical fit for rSpan 2
                          const canFitVertical =
                            rSpan === 1 || (r + 1 < 40 && !slots[r + 1][c]);
                          const finalRSpan = canFitVertical ? rSpan : 1;

                          // Mark slots
                          for (let dr = 0; dr < finalRSpan; dr++) {
                            for (let dc = 0; dc < actualCSpan; dc++) {
                              slots[r + dr][c + dc] = true;
                            }
                          }
                          const colSpanClass =
                            actualCSpan === 1
                              ? "md:col-span-1"
                              : actualCSpan === 2
                                ? "md:col-span-2"
                                : "md:col-span-3";
                          const rowSpanClass =
                            finalRSpan === 1
                              ? "md:row-span-1"
                              : "md:row-span-2";

                          gridClasses.push(`${colSpanClass} ${rowSpanClass}`);
                          placed = true;
                        }
                      }
                    }
                  });

                  return visibleItems.map((item, idx) => (
                    <motion.div
                      key={`${item.id}-${idx}`}
                      className={gridClasses[idx]}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <ServiceBentoCard
                        title={item.titulo}
                        content={item.resumen || item.detalle || item.titulo}
                        price={item.precio}
                        image={item.imagen}
                        category={item.category}
                        index={idx}
                        slug={item.slug}
                        categorySlug={slug}
                      />
                    </motion.div>
                  ));
                })()}
              </AnimatePresence>
            </div>
          )}
        </div>

        {!loading && hasMore && (
          <div className="container mx-auto px-4 text-center mb-32 relative z-10 flex flex-col items-center gap-4">
            <button
              onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
              className="px-10 py-4 bg-[#0D4B4D] text-white rounded-full font-bold text-lg shadow-xl hover:bg-[#0E6063] hover:scale-105 transition-all"
            >
              Ver más opciones
            </button>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-[#0D4B4D]/30"
            >
              <IoIosArrowDown className="w-20 h-20" />
            </motion.div>
          </div>
        )}

        <section className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0D4B4D] tracking-tight">
              Explora mas de nuestros servicios
            </h2>
          </div>
          <div className="relative">
            <ServicesCarousel services={otherServices} />
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
