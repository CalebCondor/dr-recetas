"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface Service {
  title: string;
  description: string;
  href: string;
}

interface ServiceBentoProps {
  services: Service[];
}

export function ServiceBento({ services }: ServiceBentoProps) {
  const t = useTranslations("HomePage.Services");
  const locale = useLocale();
  const seeServicesLabel = locale === "en" ? "See services" : "Ver servicios";
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const displayed = services.slice(0, 6);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setActiveIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => { api.off("select", onSelect); };
  }, [api]);

  const cardContent = (service: Service, index: number) => {
    const isHovered = hoveredIndex === index;
    return (
      <Link href={service.href} className="block h-full">
        <div
          className="h-full rounded-[1.75rem] p-6 md:p-7 flex flex-col gap-3 transition-all duration-200"
          style={{
            background: isHovered
              ? "linear-gradient(to left, rgba(212,255,130,0.6) 0%, rgba(160,196,93,0.6) 100%)"
              : "radial-gradient(circle, rgba(250,250,250,0) 0%, rgba(250,250,250,0.12) 100%), rgba(51,69,53,0.5)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: isHovered
              ? "1px solid rgba(160,196,93,0.5)"
              : "1px solid rgba(255,255,255,0.08)",
            boxShadow: isHovered
              ? "0 4px 24px rgba(164,255,130,0.2)"
              : "0 2px 16px rgba(0,0,0,0.25)",
            transform: isHovered ? "scale(1.015)" : "scale(1)",
          }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <h3
            className="text-base md:text-lg font-normal leading-snug"
            style={{ color: isHovered ? "#2B3E39" : "#A1FF00" }}
          >
            {service.title}
          </h3>
          <p
            className="text-sm leading-relaxed flex-1"
            style={{
              color: isHovered
                ? "rgba(30,60,15,0.85)"
                : "rgba(255,255,255,0.9)",
            }}
          >
            {service.description}
          </p>
          <div className="mt-1">
            <span
              className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
              style={{
                backgroundColor: isHovered
                  ? "rgba(30,60,15,0.2)"
                  : "rgba(139,175,74,0.18)",
                color: isHovered ? "#1a3a10" : "#a8d96a",
                border: isHovered
                  ? "1px solid rgba(30,60,15,0.3)"
                  : "1px solid rgba(139,175,74,0.3)",
              }}
            >
              {seeServicesLabel}
            </span>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <section
      id="servicios"
      className="relative w-full max-w-400 mx-auto overflow-hidden py-16 md:py-20 rounded-[1.5rem] md:rounded-[2.5rem] -mt-7 lg:h-274"
      style={{
        background: "linear-gradient(to bottom, #434D2E 0%, #677155 58%, #485042 100%)",
      }}
    >
      {/* ── Background image layer (desktop only) ── */}
      <div className="hidden lg:block absolute inset-0 z-0">
        <Image
          src="/hero/fondo_heroo.png"
          alt=""
          fill
          className="object-cover object-top"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(10,30,20,0.55) 0%, rgba(10,30,20,0.30) 50%, rgba(10,30,20,0.0) 100%)",
          }}
        />
      </div>

      {/* ── Overlay image (desktop only) ── */}
      <div className="hidden lg:block absolute inset-0 z-1 pointer-events-none">
        <Image
          src="/hero/hero_fondoo.png"
          alt=""
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full h-full max-w-6xl mx-auto px-6 md:px-12 lg:px-[8%] flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-normal text-white mb-2">
            {t("title")}
          </h2>
          <p className="text-base md:text-4xl text-white/80">
            {t("subtitle_prefix")}{" "}
            <span style={{ color: "#8FD44A" }}>{t("subtitle_highlight")}</span>
          </p>
        </motion.div>

        {/* ── Mobile: Embla Carousel ── */}
        <div className="mt-auto lg:hidden">
          <Carousel setApi={setApi} opts={{ align: "start", loop: false }}>
            <CarouselContent className="-ml-4">
              {displayed.map((service, index) => (
                <CarouselItem key={service.href} className="pl-4 basis-[80vw] sm:basis-[55vw]">
                  {cardContent(service, index)}
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Dot indicators */}
          <div className="flex justify-center items-center gap-2 mt-5 pb-2">
            {displayed.map((_, i) => (
              <button
                key={i}
                aria-label={`Ir a tarjeta ${i + 1}`}
                onClick={() => api?.scrollTo(i)}
                style={{
                  width: activeIndex === i ? 24 : 8,
                  height: 8,
                  borderRadius: 9999,
                  backgroundColor:
                    activeIndex === i ? "#8FD44A" : "rgba(255,255,255,0.25)",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  transition: "width 0.3s ease, background-color 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Desktop: Grid ── */}
        <div className="mt-auto pb-10 hidden lg:grid lg:grid-cols-3 gap-5">
          {displayed.map((service, index) => (
            <motion.div
              key={service.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.42,
                ease: "easeOut",
                delay: 0.05 + (index % 3) * 0.08 + Math.floor(index / 3) * 0.12,
              }}
            >
              {cardContent(service, index)}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
