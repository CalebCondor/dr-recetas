"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
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

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <div className="-mx-6 lg:mx-0">
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 px-4 md:px-0 lg:-ml-6">
          {services.map((service, index) => {
            // Calculate circular distance and relative index for direction
            const len = services.length;
            let relativeIndex = index - current;
            if (relativeIndex > len / 2) relativeIndex -= len;
            else if (relativeIndex < -len / 2) relativeIndex += len;

            // distance handles the absolute proximity (0 = center, 1 = neighbor)
            const distance = Math.abs(relativeIndex);

            // User request: "Blur only on the right side"
            // We define "right side blur" as items strictly to the right (> 1)
            // Items on the left (< 0) or immedate neighbors (<= 1) are clear
            const shouldBlur = relativeIndex > 1;

            return (
              <CarouselItem
                key={index}
                className="pl-2 lg:pl-6 basis-[85%] sm:basis-[50%] lg:basis-[28%] transition-all duration-500"
              >
                <div
                  className={`transition-all duration-700 h-full ${
                    // Mobile: Solo el centro al 100%
                    distance === 0
                      ? "scale-100 opacity-100"
                      : "scale-90 opacity-40"
                  } ${
                    // Desktop: Solo difuminar el lado derecho lejano (>1)
                    // El lado izquierdo y los vecinos inmediatos se mantienen claros
                    shouldBlur
                      ? "lg:scale-90 lg:opacity-40 lg:blur-md"
                      : "lg:scale-100 lg:opacity-100 lg:blur-0"
                  }`}
                >
                  <ServiceCard {...service} isActive={distance === 0} />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="flex justify-center gap-3 mt-10">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={`transition-all duration-500 h-2 rounded-full ${
                i === current ? "bg-teal-600 w-8" : "bg-teal-600/20 w-2"
              }`}
              aria-label={`Ir a servicio ${i + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}
