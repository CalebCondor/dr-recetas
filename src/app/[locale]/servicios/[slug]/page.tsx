"use client";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PageWrapper } from "@/components/page-wrapper";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import { RiArrowRightUpLine, RiLoader4Line } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { useServiceDetails } from "@/hooks/use-service-details";
import { useInView } from "motion/react";
import { ServicesCarousel } from "@/components/home/services-carousel";
import { useAuth } from "@/context/auth-context";
import { Badge } from "@/components/ui/badge";

// Helper component for the Related card
export function RelatedBentoCard({
  title,
  content,
  price,
  vipPrice,
  image,
  category,
  index = 0,
  slug,
  categorySlug,
}: {
  title: string;
  content: string;
  price?: string;
  vipPrice?: string;
  priceType?: string;
  image?: string;
  category?: string;
  index?: number;
  slug: string;
  categorySlug: string;
}) {
  const t = useTranslations("ServicesPage");
  const { user } = useAuth();
  const isVip = user?.es_vip === 1 || user?.es_vip === "1";
  const displayPrice = isVip && vipPrice ? vipPrice : price;

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
  const bgImage = image;
  // Variety of background colors based on index to match the reference image
  const cardColors = [
    "bg-white text-slate-900 border-slate-100", // White
    "bg-[#FFD54F] text-[#0D4B4D] border-[#FFECB3]", // Yellow
    "bg-[#E1F5FE] text-[#01579B] border-[#B3E5FC]", // Light Blue
    "bg-[#0D4B4D] text-white border-white/10", // Dark Teal
    "bg-[#FCE4EC] text-[#880E4F] border-[#F8BBD0]", // Light Pink
    "bg-[#E8F5E9] text-[#1B5E20] border-[#C8E6C9]", // Light Green
  ];
  const currentBg = cardColors[index % cardColors.length];
  const isDark =
    currentBg.includes("text-white") ||
    currentBg.includes("bg-[#0D4B4D]") ||
    currentBg.includes("bg-[#1E293B]");
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
        className={`group relative rounded-[3rem] overflow-hidden ${currentBg} h-full flex flex-col p-8 md:p-12 transition-all duration-700 shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_45px_90px_rgba(13,75,77,0.15)] border backdrop-blur-md block`}
      >
        {/* Shine/Glare Effect Overlay */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${isFocused ? "opacity-40" : "opacity-0"} group-hover:opacity-100`}
        >
          <div className="absolute inset-x-0 -top-full bottom-0 bg-linear-to-b from-white/20 via-transparent to-transparent rotate-45 translate-x-full group-hover:animate-[shine_1.5s_ease-in-out_infinite] transition-transform duration-1000" />
        </div>
        {/* Background Image - Full Cover */}
        <motion.div
          className="absolute inset-0 z-0"
          animate={{
            scale: shouldAnimateFocus ? 1.05 : 1,
          }}
          transition={{ duration: 0.7 }}
        >
          {/* Background Image/Overlay logic depending on the card type */}
          <motion.div
            className="absolute right-4 top-4 w-[60%] h-[70%] z-0 opacity-40 group-hover:opacity-60 transition-opacity"
            initial={false}
          >
            <div
              className="w-full h-full bg-contain bg-bottom-right bg-no-repeat"
              style={{ backgroundImage: `url("${bgImage}")` }}
            />
          </motion.div>
        </motion.div>
        {/* Central Content (Top Area) */}
        <div className="relative z-20 space-y-4 transition-transform duration-500 mb-6 w-full lg:max-w-[65%]">
          {category && (
            <div
              className={`inline-block px-3 py-1.5 rounded-full border backdrop-blur-md uppercase font-black text-[10px] tracking-widest pointer-events-none transition-all duration-500 md:hidden ${
                isDark
                  ? "bg-white/10 text-white border-white/20"
                  : "bg-black/5 text-slate-900/60 border-black/10"
              } opacity-100`}
            >
              {category}
            </div>
          )}

          <div className="space-y-3">
            <h3 className="text-xl md:text-3xl font-black leading-tight tracking-tight line-clamp-2 overflow-hidden">
              {title}
            </h3>
            {(() => {
              const isEmpty =
                !content || content.replace(/<[^>]*>?/gm, "").trim() === "";
              if (isEmpty) return null;
              return (
                <div
                  className={`text-sm md:text-base leading-relaxed line-clamp-3 md:line-clamp-4 overflow-hidden font-medium ${isDark ? "text-white/70" : "text-slate-600"}`}
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              );
            })()}
          </div>
        </div>
        {/* Bottom Section: Price Area (Pushed to bottom by mt-auto) */}
        <div className="mt-auto relative z-20">
          {displayPrice && (
            <div className="flex flex-col">
              <span
                className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-40 ${isDark ? "text-white" : "text-[#0D4B4D]"}`}
              >
                {isVip && vipPrice
                  ? t("Static.vipPrice")
                  : t("Static.basePrice")}
              </span>
              <div className="text-3xl md:text-4xl font-black leading-none tracking-tighter">
                ${displayPrice}
              </div>
            </div>
          )}
        </div>
        {/* Category Tag (Absolute - Desktop only) */}
        {category && (
          <div
            className={`absolute top-8 right-8 z-10 px-3 py-1.5 rounded-full border backdrop-blur-md uppercase font-black text-[10px] tracking-widest pointer-events-none transition-all duration-500 hidden md:block ${
              isDark
                ? "bg-white/10 text-white border-white/20"
                : "bg-black/5 text-slate-900/60 border-black/10"
            } opacity-100`}
          >
            {category}
          </div>
        )}
        {/* Action Button (Absolute) */}
        <div className="absolute bottom-10 right-10 z-20">
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
  const t = useTranslations("ServicesPage");
  const tDynamic = useTranslations("DynamicServices");
  const allLabel = t.has("Static.all") ? t("Static.all") : "Todos";

  const [activeTag, setActiveTag] = useState("all");

  const handleTagChange = (tag: string) => {
    setActiveTag(tag);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  // Helper to translate dynamic content
  const getTranslated = (
    section: "Categories" | "Items",
    key: string | undefined,
    field: string,
    fallback: string | undefined,
  ) => {
    if (!key) return fallback;
    const path = `${section}.${key}.${field}`;
    return t.has(path) ? t(path) : fallback;
  };

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const normalizeTag = (tag: string) => tag.trim().toLowerCase();

  const extractTags = (item: { pq_tag?: string | null; tags?: string[] }) => {
    const collected: string[] = [];
    if (item.pq_tag) {
      collected.push(...item.pq_tag.split(","));
    }
    if (item.tags?.length) {
      item.tags.forEach((tag) => {
        collected.push(...tag.split(","));
      });
    }
    return collected.map((tag) => tag.trim()).filter((tag) => tag.length > 0);
  };

  const tagMap = new Map<string, string>();
  apiItems.forEach((item) => {
    extractTags(item).forEach((tag) => {
      const key = normalizeTag(tag);
      if (!tagMap.has(key)) {
        tagMap.set(key, tag);
      }
    });
  });

  const filterTags = Array.from(tagMap.entries())
    .map(([key, label]) => ({ key, label }))
    .sort((a, b) => a.label.localeCompare(b.label));

  if (!serviceInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7F6]">
        {loading ? (
          <RiLoader4Line className="w-12 h-12 text-teal-600 animate-spin" />
        ) : (
          <h1 className="text-2xl font-bold text-gray-400">
            {t("Static.notFound")}
          </h1>
        )}
      </div>
    );
  }
  // ONLY use API categories (tipo: 2), NO local fallback
  const otherServices = (categories || [])
    .map((c) => {
      const categorySlug = c.tag?.toLowerCase().replace(/\s+/g, "-") || "otros";
      const serviceId = `service_${c.id}`;

      return {
        title: tDynamic.has(`${serviceId}.title`)
          ? tDynamic(`${serviceId}.title`)
          : c.nombre || "Servicio",
        description: tDynamic.has(`${serviceId}.description`)
          ? tDynamic(`${serviceId}.description`)
          : c.lead || "",
        imageSrc: c.imagen || "",
        imageAlt: c.nombre || "Servicio",
        href: `/servicios/${categorySlug}`,
        slug: categorySlug,
      };
    })
    .filter((item) => item.slug !== slug)
    .filter((v, i, a) => a.findIndex((t) => t.title === v.title) === i)
    .slice(0, 10);
  const filteredItems =
    activeTag === "all"
      ? apiItems
      : apiItems.filter((item) =>
          extractTags(item).some((tag) => normalizeTag(tag) === activeTag),
        );

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;
  return (
    <PageWrapper>
      <div className="min-h-screen  pt-16 pb-24 overflow-hidden relative">
        {/* Background Accents */}
        <div className="relative mb-12">
          <div className="container mx-auto lg:mt-12 px-6 text-center relative z-10 pt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block mb-6 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100/50 text-teal-700 text-sm font-bold tracking-wide uppercase"
            >
              {getTranslated(
                "Categories",
                serviceInfo?.slug,
                "title",
                serviceInfo?.title,
              )}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl lg:text-8xl font-black text-[#0D4B4D] mb-8 tracking-tighter leading-[0.9]"
            >
              {getTranslated(
                "Categories",
                serviceInfo?.slug,
                "title",
                serviceInfo?.title,
              )}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-teal-900/60 text-lg md:text-2xl font-medium leading-relaxed max-w-3xl mx-auto"
            >
              {getTranslated(
                "Categories",
                serviceInfo?.slug,
                "longDescription",
                serviceInfo?.longDescription || serviceInfo?.description,
              )}
            </motion.p>
          </div>
        </div>
        <div className="container mx-auto px-4 md:px-6 mb-16 relative z-10">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[90%] h-40 bg-[radial-gradient(circle_at_center,rgba(13,75,77,0.12),transparent_70%)] blur-2xl pointer-events-none" />
          <div className="absolute -bottom-28 right-0 w-72 h-72 bg-[radial-gradient(circle_at_center,rgba(13,75,77,0.10),transparent_65%)] blur-3xl pointer-events-none" />
          {filterTags.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              <Badge
                asChild
                variant="outline"
                className={`cursor-pointer h-auto rounded-full border transition-all duration-300 shadow-sm ${
                  activeTag === "all"
                    ? "bg-[#0D4B4D] text-white border-[#0D4B4D] shadow-[0_4px_14px_rgba(13,75,77,0.35)] scale-105"
                    : "bg-white/80 text-[#0D4B4D]/70 border-[#0D4B4D]/10 hover:border-[#0D4B4D]/30 hover:text-[#0D4B4D] hover:scale-105 backdrop-blur-sm"
                }`}
              >
                <button type="button" className="px-4 py-2 text-xl font-semibold tracking-wide" onClick={() => handleTagChange("all")}>
                  {allLabel}
                </button>
              </Badge>
              {filterTags.map((tag) => (
                <Badge
                  key={tag.key}
                  asChild
                  variant="outline"
                  className={`cursor-pointer h-auto rounded-full border transition-all duration-300 shadow-sm ${
                    activeTag === tag.key
                      ? "bg-[#0D4B4D] text-white border-[#0D4B4D] shadow-[0_4px_14px_rgba(13,75,77,0.35)] scale-105"
                      : "bg-white/80 text-[#0D4B4D]/70 border-[#0D4B4D]/10 hover:border-[#0D4B4D]/30 hover:text-[#0D4B4D] hover:scale-105 backdrop-blur-sm"
                  }`}
                >
                  <button
                    type="button"
                    className="px-4 py-2 text-md font-semibold tracking-wide"
                    onClick={() => handleTagChange(tag.key)}
                  >
                    {tag.label}
                  </button>
                </Badge>
              ))}
            </div>
          )}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <RiLoader4Line className="w-12 h-12 text-teal-600 animate-spin" />
              <p className="text-teal-900/40 font-medium">
                {t("Static.loading")}
              </p>
            </div>
          ) : (
            <div className="relative">
              <div className="absolute -inset-6 border border-white/40 rounded-[3rem] -z-20" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:auto-rows-[360px] lg:auto-rows-[380px] md:grid-flow-dense">
                <AnimatePresence mode="popLayout">
                {(() => {
                  // Bento for tablet: 2 columns
                  const mdClasses: string[] = [];
                  const mdSlots = Array.from({ length: 200 }, () => [false, false]);
                  visibleItems.forEach((_, i) => {
                    const isLast = i === visibleItems.length - 1;
                    const cSpan = i % 2 === 0 ? 2 : 1;
                    let rSpan = 1;
                    if (cSpan === 1 && i % 3 === 0 && i < visibleItems.length - 1) rSpan = 2;
                    let placed = false;
                    for (let r = 0; r < 200 && !placed; r++) {
                      for (let c = 0; c < 2 && !placed; c++) {
                        if (!mdSlots[r][c]) {
                          let actualCSpan = Math.min(cSpan, 2 - c);
                          if (isLast) actualCSpan = 2 - c || 1;
                          const canFit = rSpan === 1 || (r + 1 < 100 && !mdSlots[r + 1][c]);
                          const finalRSpan = canFit ? rSpan : 1;
                          for (let dr = 0; dr < finalRSpan; dr++)
                            for (let dc = 0; dc < actualCSpan; dc++)
                              mdSlots[r + dr][c + dc] = true;
                          mdClasses.push(`md:col-span-${actualCSpan} md:row-span-${finalRSpan}`);
                          placed = true;
                        }
                      }
                    }
                  });

                  // Bento for desktop: 3 columns
                  const gridClasses: string[] = [];
                  const slots = Array.from({ length: 200 }, () => [false, false, false]);
                  visibleItems.forEach((_, i) => {
                    const isLast = i === visibleItems.length - 1;
                    const cSpan = i % 3 === 0 ? 2 : 1;
                    let rSpan = 1;
                    if (cSpan === 1 && i % 4 === 0 && i < visibleItems.length - 2) rSpan = 2;
                    let placed = false;
                    for (let r = 0; r < 200 && !placed; r++) {
                      for (let c = 0; c < 3 && !placed; c++) {
                        if (!slots[r][c]) {
                          let actualCSpan = Math.min(cSpan, 3 - c);
                          if (isLast) actualCSpan = 3 - c || 1;
                          const canFit = rSpan === 1 || (r + 1 < 100 && !slots[r + 1][c]);
                          const finalRSpan = canFit ? rSpan : 1;
                          for (let dr = 0; dr < finalRSpan; dr++)
                            for (let dc = 0; dc < actualCSpan; dc++)
                              slots[r + dr][c + dc] = true;
                          gridClasses.push(`lg:col-span-${actualCSpan} lg:row-span-${finalRSpan}`);
                          placed = true;
                        }
                      }
                    }
                  });
                  return visibleItems.map((item, idx) => (
                    <motion.div
                      key={`${item.id}-${idx}`}
                      className={`${mdClasses[idx] ?? ""} ${gridClasses[idx] ?? ""}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <RelatedBentoCard
                        title={
                          getTranslated(
                            "Items",
                            item.slug,
                            "title",
                            item.titulo,
                          ) || item.titulo
                        }
                        content={
                          getTranslated(
                            "Items",
                            item.slug,
                            "description",
                            item.resumen || item.detalle || item.titulo,
                          ) ||
                          item.resumen ||
                          item.detalle ||
                          item.titulo
                        }
                        price={item.precio}
                        vipPrice={item.precio_vip}
                        image={item.imagen}
                        category={getTranslated(
                          "Categories",
                          serviceInfo.slug,
                          "title",
                          serviceInfo.title,
                        )}
                        index={idx}
                        slug={item.slug}
                        categorySlug={slug}
                      />
                    </motion.div>
                  ));
                })()}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
        {!loading && hasMore && (
          <div className="container mx-auto px-4 text-center mb-32 relative z-10 flex flex-col items-center gap-4">
            <button
              onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
              className="px-10 py-4 bg-[#0D4B4D] text-white rounded-full font-bold text-lg shadow-xl hover:bg-[#0E6063] hover:scale-105 transition-all"
            >
              {t("Static.viewMore")}
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
        {/* Improved Horizontal Carousel for Other Services */}
        <section className="relative z-10 pt-16 border-t border-slate-200/60 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12">
              <h3 className="text-4xl md:text-6xl font-black text-[#0D4B4D] tracking-tight leading-none mb-4">
                {t("Static.exploreMore")}
              </h3>
              <p className="text-[#0D4B4D]/60 text-lg font-medium">
                {t("Static.keepDiscovering")}
              </p>
            </div>
            {loading ? (
              <div className="flex items-center justify-center w-full py-12">
                <RiLoader4Line className="w-10 h-10 text-teal-600 animate-spin" />
                <span className="ml-3 text-teal-900/40 font-medium">
                  {t("Static.loadingRecommendations")}
                </span>
              </div>
            ) : otherServices.length > 0 ? (
              <ServicesCarousel services={otherServices} />
            ) : (
              <div className="flex items-center justify-center w-full py-12 text-slate-400 font-medium border-2 border-dashed border-slate-200 rounded-[2rem]">
                {t("Static.noRecommendations")}
              </div>
            )}
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
