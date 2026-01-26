"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { servicesData } from "@/lib/services-data";
import { useParams } from "next/navigation";
import { PageWrapper } from "@/components/page-wrapper";
import { motion, AnimatePresence } from "motion/react";
import { RiArrowRightUpLine, RiLoader4Line } from "react-icons/ri";
import { ServicesCarousel } from "@/components/home/services-carousel";

interface ApiServiceItem {
  id: number;
  slug: string;
  titulo: string;
  resumen: string;
  detalle: string;
  precio: string;
  imagen: string;
  tags: string[];
  pq_tag: string | null;
  url: string;
  category?: string; // Internal helper to track which key it came from
}

interface ApiResponse {
  [key: string]: ApiServiceItem[];
}

// Helper component for the Bento card
function ServiceBentoCard({
  title,
  content,
  price,
  image,
  category,
  index = 0,
}: {
  title: string;
  content: string;
  price?: string;
  image?: string;
  category?: string;
  index?: number;
}) {
  const defaultImages = [
    "/citas-medicas/1.png",
    "/citas-medicas/2.png",
    "/citas-medicas/3.png",
    "/citas-medicas/1.png",
  ];
  const bgImage = image || defaultImages[index % defaultImages.length];

  return (
    <div className="group relative rounded-[2.5rem] overflow-hidden bg-[#0D4B4D] h-full flex flex-col text-white transition-all duration-700 shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_60px_rgba(13,75,77,0.4)] border border-white/10">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center brightness-[0.7] group-hover:brightness-[0.8] transition-all duration-1000"
        style={{ backgroundImage: `url(${bgImage})` }}
        whileHover={{ scale: 1.08 }}
      />

      {/* Modern Gradient Overlays */}
      <div className="absolute inset-x-0 bottom-0 h-[70%] bg-linear-to-t from-[#011C1C] via-[#011C1C]/80 to-transparent opacity-100" />
      <div className="absolute inset-0 bg-[#011C1C]/20 group-hover:bg-transparent transition-colors duration-500" />

      {/* Header Info: Category & Price side by side */}
      <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-start gap-4">
        {category && (
          <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-[10px] font-black uppercase tracking-wider text-[#4BDCB1]">
            {category}
          </span>
        )}
        {price && (
          <div className="px-4 py-1 rounded-2xl bg-[#4BDCB1] text-[#0D4B4D] font-black text-lg shadow-lg">
            ${price}
          </div>
        )}
      </div>

      {/* Central Content */}
      <div className="relative mt-auto z-10 p-8 md:p-10 space-y-4">
        <h3 className="text-xl md:text-2xl font-bold leading-tight tracking-tight group-hover:text-[#4BDCB1] transition-colors duration-300 line-clamp-3">
          {title}
        </h3>
        <p className="text-white/60 text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-3 group-hover:text-white/90 group-hover:line-clamp-none transition-all duration-500 font-medium">
          {content}
        </p>

        <div className="pt-2 flex items-center justify-between">
          <div className="px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white text-xs font-bold hover:bg-white hover:text-[#0D4B4D] transition-all duration-300 flex items-center gap-2 group/btn">
            <span>Ver detalles</span>
            <RiArrowRightUpLine className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </div>

          <div className="w-10 h-10 rounded-full bg-[#4BDCB1]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <RiArrowRightUpLine className="w-5 h-5 text-[#4BDCB1]" />
          </div>
        </div>
      </div>
    </div>
  );
}

const ITEMS_PER_PAGE = 6;

export default function ServicePage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [apiItems, setApiItems] = useState<ApiServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Sync with local fallback data if needed, but primary is the slug
  const serviceInfo = servicesData.find((s) => s.slug === slug);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get<ApiResponse>(
        "https://doctorrecetas.com/v3/api.php?action=getServices",
      );

      const allData = response.data;
      let relevantItems: ApiServiceItem[] = [];

      if (serviceInfo) {
        // Flatten all items and tag them with their category name
        const flattenedItems: ApiServiceItem[] = [];
        Object.entries(allData).forEach(([categoryName, items]) => {
          items.forEach((item) => {
            flattenedItems.push({ ...item, category: categoryName });
          });
        });

        // Current service tag to look for
        // Assuming serviceInfo has an 'apiTag' property for filtering
        const targetTag = (serviceInfo as any).apiTag;

        if (targetTag) {
          relevantItems = flattenedItems.filter((item) => {
            if (!item.pq_tag) return false;
            // Split by comma and check if targetTag exists (case insensitive or exact)
            const tags = item.pq_tag.split(",").map((t) => t.trim());
            return tags.includes(targetTag);
          });
        }

        // Fallback: If no items found by tag, try filtering by title/slug as before
        if (relevantItems.length === 0) {
          relevantItems = flattenedItems.filter((item) => {
            const titleMatch = item.titulo
              .toLowerCase()
              .includes(serviceInfo.title.toLowerCase());
            const slugMatch = item.slug.includes(slug);
            return titleMatch || slugMatch;
          });
        }
      }

      // Final Fallback: if STILL nothing, just take the first category
      if (relevantItems.length === 0) {
        const firstCategoryKey = Object.keys(allData)[0];
        relevantItems = (allData[firstCategoryKey] || []).map((item) => ({
          ...item,
          category: firstCategoryKey,
        }));
      }

      setApiItems(relevantItems);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  }, [slug, serviceInfo]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  if (!serviceInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-400">
          Servicio no encontrado
        </h1>
      </div>
    );
  }

  const otherServices = servicesData
    .filter((s) => s.slug !== slug)
    .map((s) => ({
      ...s,
      href: `/servicios/${s.slug}`,
    }));

  const visibleItems = apiItems.slice(0, visibleCount);
  const hasMore = visibleCount < apiItems.length;

  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#F5F7F6] pt-32 pb-24 overflow-hidden relative">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#E0F3F1]/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#EEF5F4]/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        {/* Header Section */}
        <div className="container mx-auto px-6 text-center mb-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100/50 text-teal-700 text-sm font-bold tracking-wide uppercase"
          >
            Nuestros Servicios
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-8xl font-black text-[#0D4B4D] mb-8 tracking-tighter leading-[0.9]"
          >
            {serviceInfo.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-teal-900/60 text-lg md:text-2xl font-medium leading-relaxed max-w-3xl mx-auto"
          >
            {serviceInfo.longDescription || serviceInfo.description}
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="container mx-auto px-4 md:px-6 mb-16 relative z-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <RiLoader4Line className="w-12 h-12 text-teal-600 animate-spin" />
              <p className="text-teal-900/40 font-medium">
                Cargando opciones...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[340px]">
              <AnimatePresence mode="popLayout">
                {visibleItems.map((item, idx) => {
                  // Bento layout pattern logic (matches the visual requirement)
                  const classNames = [
                    "md:col-span-2 md:row-span-1", // 1: Wide
                    "md:col-span-1 md:row-span-2", // 2: Tall
                    "md:col-span-1 md:row-span-1", // 3: Small
                    "md:col-span-1 md:row-span-1", // 4: Small
                  ];

                  // Adjust pattern for subsequent blocks of 4 if needed,
                  // or just tile the pattern
                  const gridClass = classNames[idx % 4];

                  return (
                    <motion.div
                      key={`${item.id}-${idx}`}
                      layout
                      className={gridClass}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{
                        duration: 0.5,
                        delay: (idx % ITEMS_PER_PAGE) * 0.05,
                      }}
                    >
                      <ServiceBentoCard
                        title={item.titulo}
                        content={item.resumen}
                        price={item.precio}
                        image={item.imagen}
                        category={item.category}
                        index={idx}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Show More Button */}
        {!loading && hasMore && (
          <div className="container mx-auto px-4 text-center mb-32 relative z-10">
            <button
              onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
              className="px-10 py-4 bg-[#0D4B4D] text-white rounded-full font-bold text-lg shadow-xl hover:bg-[#0E6063] hover:scale-105 transition-all duration-300"
            >
              Ver más opciones
            </button>
          </div>
        )}

        {/* More Services Section */}
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
