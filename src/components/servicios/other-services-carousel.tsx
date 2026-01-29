"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { motion } from "motion/react";
import Link from "next/link";
import { RiArrowRightUpLine, RiStethoscopeLine } from "react-icons/ri";

interface OtherService {
  title: string;
  description: string;
  imageSrc: string;
  href: string;
}

export function OtherServicesCarousel({
  services,
}: {
  services: OtherService[];
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!api) return;

    const handleReInit = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
    };

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    handleReInit();

    api.on("select", handleSelect);
    api.on("reInit", handleReInit);

    return () => {
      api.off("select", handleSelect);
      api.off("reInit", handleReInit);
    };
  }, [api]);

  return (
    <div className="-mx-6 lg:mx-0">
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: false,
          breakpoints: {
            "(min-width: 1024px)": {
              align: "start",
              slidesToScroll: 3,
            },
            "(min-width: 640px)": {
              align: "center",
              slidesToScroll: 1,
            },
          },
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 px-4 md:px-6 lg:-ml-6">
          {services.map((service, index) => {
            const isActive = index === current;

            return (
              <CarouselItem
                key={`${service.title}-${index}`}
                className="pl-2 lg:pl-6 basis-[82%] sm:basis-[70%] lg:basis-1/3"
              >
                <motion.div
                  initial={false}
                  animate={{
                    scale: isMobile ? (isActive ? 1 : 0.9) : 1,
                    opacity: isMobile ? (isActive ? 1 : 0.4) : 1,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  className="h-full"
                >
                  <Link
                    href={service.href}
                    className={`group block relative h-[480px] w-full rounded-[2.5rem] overflow-hidden bg-slate-900 shadow-md hover:shadow-2xl transition-all duration-500 ${
                      isMobile && isActive
                        ? "ring-2 ring-teal-500/50 shadow-2xl shadow-teal-900/20"
                        : ""
                    }`}
                  >
                    {/* Image Layer - Full Height */}
                    <div className="absolute inset-0">
                      {service.imageSrc ? (
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                          style={{
                            backgroundImage: `url(${service.imageSrc})`,
                          }}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-linear-to-b from-teal-900 to-slate-900 flex items-center justify-center">
                          <RiStethoscopeLine className="w-32 h-32 text-white/10" />
                        </div>
                      )}
                    </div>

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                    {/* Content Area - Vertical Layout */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        {/* Badge */}
                        <div className="mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold uppercase tracking-widest">
                            Ver Categoría
                          </span>
                        </div>

                        <h4 className="text-3xl font-black text-white leading-tight tracking-tight mb-3 drop-shadow-lg">
                          {service.title}
                        </h4>

                        <p className="text-white/80 text-sm font-medium line-clamp-3 leading-relaxed mb-6 group-hover:text-white transition-colors">
                          {service.description}
                        </p>

                        {/* Action Button */}
                        <div className="inline-flex items-center justify-between w-full px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white group-hover:bg-white group-hover:text-[#0D4B4D] transition-all duration-300">
                          <span className="font-bold text-xs uppercase tracking-wider">
                            Explorar
                          </span>
                          <RiArrowRightUpLine className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Navigation Dots */}
        {count > 1 && (
          <div className="flex justify-center gap-3 mt-16">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={`h-2 rounded-full ${
                  i === current
                    ? "bg-[#0D4B4D] w-8 transition-all duration-200"
                    : "bg-[#0D4B4D]/20 w-2 transition-all duration-200 hover:bg-[#0D4B4D]/40"
                }`}
                aria-label={`Ir a sección ${i + 1}`}
              />
            ))}
          </div>
        )}
      </Carousel>
    </div>
  );
}
