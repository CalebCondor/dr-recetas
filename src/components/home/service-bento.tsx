"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
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
  const [isMobile, setIsMobile] = useState(false);
  const displayed = services.slice(0, 6);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setActiveIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => { api.off("select", onSelect); };
  }, [api]);

  const cardContent = (service: Service, index: number) => {
    const isHovered = hoveredIndex === index;
    const isActive = isMobile && activeIndex === index;
    return (
      <Link href={service.href} className="block h-full">
        <div
          className="h-full p-6 md:p-7 flex flex-col gap-3 transition-all duration-300"
          style={{
            borderRadius: "24px",
            background: isHovered
              ? "linear-gradient(180deg, rgba(212,255,130,0.82) 0%, rgba(160,196,93,0.82) 100%)"
              : "radial-gradient(50% 50% at 50% 50%, rgba(217, 255, 204, 0.00) 0%, rgba(217, 255, 204, 0.20) 100%), rgba(51, 69, 53, 0.50)",
            backdropFilter: isHovered ? "blur(8px)" : "blur(4px)",
            WebkitBackdropFilter: isHovered ? "blur(8px)" : "blur(4px)",
            border: isHovered
              ? "0.5px solid rgba(160,196,93,0.5)"
              : isActive
                ? "1.5px solid rgba(160,196,93,0.6)"
                : "0.5px solid #D1DAC1",
            boxShadow: isHovered
              ? "0 6px 32px rgba(164,255,130,0.22)"
              : isActive
                ? "0 10px 28px rgba(164,255,130,0.16)"
                : "0 4px 18px rgba(0,0,0,0.28)",
            transform: isHovered ? "scale(1.015)" : isActive ? "scale(1.03)" : "scale(1)",
            opacity: isActive ? 1 : 0.96,
          }}
          onMouseEnter={() => window.innerWidth >= 768 && setHoveredIndex(index)}
          onMouseLeave={() => window.innerWidth >= 768 && setHoveredIndex(null)}
        >
          <h3
            className="text-2xl md:text-3xl mb-2 font-normal leading-snug transition-colors duration-300"
            style={{ color: isHovered ? "#2B3E39" : isActive ? "#C4FF5E" : "#A1FF00" }}
          >
            {service.title}
          </h3>
          <p
            className="text-xl md:text-lg leading-6 flex-1 transition-colors duration-300 mb-2"
            style={{
              color: isHovered
                ? "rgba(43,62,57,1.85)"
                : "#F7FDEE",
            }}
          >
            {service.description}
          </p>
          <div className="mt-1">
            <span
              className="inline-flex items-center px-6 py-3 text-lg font-normal transition-all duration-300"
              style={{
                borderRadius: "32px",
                backgroundColor: isHovered
                  ? "rgba(30,60,15,0.24)"
                  : "rgba(211, 239, 160, 0.28)",
                color: isHovered ? "rgba(247,253,238,1.85)" : "rgba(247,253,238,1.85)",
                border: isHovered
                  ? "1px solid rgba(30,60,15,0.3)"
                  : isActive
                    ? "1.5px solid rgba(196,255,94,0.8)"
                    : "0.5px solid #D1DAC1",
                backdropFilter: isHovered || isActive ? "blur(10px)" : "blur(2px)",
                WebkitBackdropFilter: isHovered || isActive ? "blur(10px)" : "blur(2px)",
              }}
            >
              {seeServicesLabel}
            </span>
          </div>
        </div>
      </Link>
    );
  };

  const sectionRef = useRef<HTMLElement | null>(null);
  const overlayY = useMotionValue(0);
  const smoothY = useSpring(overlayY, { stiffness: 40, damping: 22 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    let mounted = true;

    const onScroll = () => {
      if (!mounted || !sectionRef.current) return;
      if (window.innerWidth < 1024) {
        overlayY.set(0);
        return;
      }
      const rect = sectionRef.current.getBoundingClientRect();
      const offset = rect.top * 0.12; // 12% parallax factor (inverted direction)
      overlayY.set(offset);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // init
    onScroll();

    return () => {
      mounted = false;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [overlayY]);

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="relative w-full md:max-w-400 md:mx-auto overflow-hidden py-16 md:py-20 md:px-6 rounded-[1.5rem] md:rounded-[2.5rem] -mt-7 lg:h-274"
    >
      {/* ── Background image layer (desktop only) ── */}
      <div className="hidden lg:block absolute inset-0 z-0">
        <Image
          src="/hero/bserviciosa.webp"
          alt="Fondo de servicios"
          fill
          className="object-cover object-top"
          priority
        />
         
      </div>

      {/* ── Background image layer (mobile only) ── */}
      <div className="md:hidden absolute inset-0 z-0">
        <Image
          src="/hero/fondo_mobile.png"
          alt="Fondo de servicios móvil"
          fill
          className="object-cover object-center"
          priority
        />
      
      </div>

      {/* ── Overlay image (desktop only) ── */}
      <motion.div
        className="hidden lg:block absolute inset-0 z-1 pointer-events-none"
        style={{ y: smoothY }}
        aria-hidden
      >
        <Image
          src="/hero/aservicios2.png"
          alt="Fondo de servicios parallax"
          fill
          className="object-cover object-top"
          priority
        />
      </motion.div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full h-full max-w-400 mx-auto px-0 md:px-12 lg:px-[8%] flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center mb-8 md:mb-10 lg:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-3 md:mb-4">
            {t("title")}
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl leading-6 md:leading-7 text-white">
            {t("subtitle_prefix")} {" "}
            <span style={{ color: "#8FD44A" }}>{t("subtitle_highlight")}</span>
          </p>
        </motion.div>

        {/* ── Mobile: Embla Carousel ── */}
        <div className="mt-auto lg:hidden">
          <Carousel setApi={setApi} opts={{ align: "center", loop: false }}>
            <CarouselContent className="">
              {displayed.map((service, index) => (
                <CarouselItem key={`${service.href}-${index}`} className="basis-[72vw] sm:basis-[50vw]">
                  {cardContent(service, index)}
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Dot indicators */}
          <div className="flex justify-center items-center gap-2 mt-12 pb-2">
            {displayed.map((_, i) => (
              <button
                key={i}
                aria-label={`Ir a tarjeta ${i + 1}`}
                onClick={() => api?.scrollTo(i)}
                style={{
                  width: activeIndex === i ? 26 : 10,
                  height: 10,
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
              key={`${service.href}-${index}`}
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
