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
        <CarouselContent className="-ml-2 px-4 md:px-0">
          {services.map((service, index) => (
            <CarouselItem
              key={service.title}
              className="pl-2 basis-[82%] sm:basis-[70%] transition-opacity duration-300"
            >
              <div
                className={`transition-all duration-500 ${
                  index === current
                    ? "scale-100 opacity-100"
                    : "scale-90 opacity-40"
                }`}
              >
                <ServiceCard {...service} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-3 mt-10">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={`transition-all duration-500 h-2 rounded-full ${
                i === current
                  ? "bg-teal-600 w-8"
                  : "bg-teal-600/20 w-2 hover:bg-teal-600/40"
              }`}
              aria-label={`Ir a servicio ${i + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}
