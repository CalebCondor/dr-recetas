"use client";

import { useState, useEffect } from "react";
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
}

export function ServicesCarousel({ services }: { services: Service[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isMobile, setIsMobile] = useState(true);

  // Detect layout for specific mobile behaviors
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!api) return;

    // Set initial values only after api is available
    const handleReInit = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
    };

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    // Initialize state
    handleReInit();

    api.on("select", handleSelect);
    api.on("reInit", handleReInit);

    // Cleanup listeners on unmount or api change
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
          align: "center", // Center for mobile visuals
          loop: false, // Prevents the 'weird return' at the end
          breakpoints: {
            "(min-width: 1024px)": {
              align: "start", // Grid start for desktop
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
        <CarouselContent className="-ml-2 px-4 md:px-0 lg:-ml-6">
          {services.map((service, index) => {
            // Logic for focus:
            // Mobile: The 'current' snap index matches the item index.
            const isActiveOnMobile = index === current;

            return (
              <CarouselItem
                key={index}
                className="pl-2 lg:pl-6 basis-[82%] sm:basis-[70%] lg:basis-1/3"
              >
                <motion.div
                  initial={false}
                  animate={{
                    scale: isMobile ? (isActiveOnMobile ? 1 : 0.9) : 1,
                    opacity: isMobile ? (isActiveOnMobile ? 1 : 0.4) : 1,
                  }}
                  transition={{
                    duration: isMobile ? 0.6 : 0.8,
                    ease: isMobile ? [0.32, 0.72, 0, 1] : "easeInOut",
                  }}
                  className="h-full"
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
                className={`transition-all duration-500 h-2 rounded-full ${
                  i === current
                    ? "bg-teal-600 w-8"
                    : "bg-teal-600/20 w-2 hover:bg-teal-600/40"
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
