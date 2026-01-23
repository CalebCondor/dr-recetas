"use client";

import { useState } from "react";
import { servicesData } from "@/lib/services-data";
import { useParams } from "next/navigation";
import { PageWrapper } from "@/components/page-wrapper";
import { motion, AnimatePresence } from "motion/react";
import { RiArrowDownSLine } from "react-icons/ri";
import { ServicesCarousel } from "@/components/home/services-carousel";

// Helper component for the collapsible card
function ServiceOptionCard({
  title,
  content,
  defaultOpen = false,
}: {
  title: string;
  content: string;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-[1.5rem] shadow-lg border border-teal-50 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left bg-white z-10 relative"
      >
        <span className="font-bold text-[#0D4B4D] text-lg pr-4">{title}</span>
        <div
          className={`shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <RiArrowDownSLine className="w-7 h-7 text-teal-600" />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-8 pt-2">
              <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">
                {content}
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="flex-1 bg-teal-600 text-white py-3 px-4 rounded-xl text-sm font-bold shadow-md hover:bg-teal-700 transition active:scale-95">
                  Ordenar ahora
                </button>
                <button className="flex-1 bg-white text-teal-700 border border-teal-100 py-3 px-4 rounded-xl text-sm font-bold shadow-sm hover:bg-teal-50 transition active:scale-95">
                  Hablar con alguien
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ServicePage() {
  const params = useParams();
  const slug = params?.slug as string;

  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    // In a real app we might redirect or show 404
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

  return (
    <PageWrapper>
      {/* Background Gradient */}
      <div className="min-h-screen bg-linear-to-b from-[#E0F7FA]/40 via-white to-white pt-32 pb-20 overflow-hidden relative">
        {/* Decorative Blur blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-teal-200/20 rounded-full blur-[100px] pointer-events-none" />

        {/* Header */}
        <div className="container mx-auto px-6 text-center mb-20 relative z-10 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-7xl font-black text-[#0D4B4D] mb-6 tracking-tight"
          >
            {service.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-teal-900/60 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto"
          >
            {service.longDescription || service.description}
          </motion.p>
        </div>

        {/* Collapsible Options Grid */}
        <div className="container mx-auto px-4 md:px-6 mb-32 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {service.accordionItems.length > 0 ? (
              service.accordionItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}
                >
                  <ServiceOptionCard
                    {...item}
                    defaultOpen={idx === 0 || idx === 1 || idx === 2}
                  />
                  {/* Default open some for demo effect like image */}
                </motion.div>
              ))
            ) : (
              // Fallback placeholders if no data
              <>
                {[1, 2, 3].map((_, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * idx }}
                  >
                    <ServiceOptionCard
                      title={`${service.title} - Opción ${idx + 1}`}
                      content="Esta opción incluye todos los beneficios estándares para su cuidado."
                      defaultOpen={true}
                    />
                  </motion.div>
                ))}
              </>
            )}
          </div>
        </div>

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
