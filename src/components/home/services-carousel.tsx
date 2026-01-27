"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { motion } from "motion/react";
import { ServiceCard } from "@/components/home/service-card";

interface Service {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href?: string;
}

export function ServicesCarousel({ services }: { services: Service[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const scrollbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkMobile, 150);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
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

  const handleScrollbarDrag = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
      if (!api || !scrollbarRef.current) return;

      const rect = scrollbarRef.current.getBoundingClientRect();
      const clickX = "clientX" in e ? e.clientX - rect.left : 0;
      const percentage = Math.max(0, Math.min(1, clickX / rect.width));
      const targetIndex = Math.round(percentage * (count - 1));

      api.scrollTo(targetIndex);
    },
    [api, count],
  );

  useEffect(() => {
    if (!isDragging) return;

    let throttleTimer: ReturnType<typeof setTimeout> | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (throttleTimer) return;

      throttleTimer = setTimeout(() => {
        handleScrollbarDrag(e);
        throttleTimer = null;
      }, 16);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      if (throttleTimer) clearTimeout(throttleTimer);
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, [isDragging, handleScrollbarDrag]);

  return (
    <div className="-mx-6 lg:mx-0">
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          containScroll: false,
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
        <CarouselContent className="-ml-2 lg:-ml-6">
          {services.map((service, index) => {
            const isActiveOnMobile = index === current;

            return (
              <CarouselItem
                key={index}
                className="pl-2 lg:pl-6 basis-[80%] sm:basis-[70%] lg:basis-1/3"
              >
                <motion.div
                  initial={false}
                  animate={{
                    scale: isMobile ? (isActiveOnMobile ? 1 : 0.9) : 1,
                    opacity: isMobile ? (isActiveOnMobile ? 1 : 0.4) : 1,
                  }}
                  transition={{
                    duration: isMobile ? 0.15 : 0.3,
                    ease: "easeInOut",
                  }}
                  className="h-full will-change-transform"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <ServiceCard
                    {...service}
                    isActive={isMobile ? isActiveOnMobile : false}
                  />
                </motion.div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Navigation Dots */}
        {count > 1 && (
          <div className="flex justify-center gap-3 mt-10">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={`h-2 rounded-full ${
                  i === current
                    ? "bg-teal-600 w-8 transition-all duration-200"
                    : "bg-teal-600/20 w-2 transition-all duration-200 hover:bg-teal-600/40"
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
