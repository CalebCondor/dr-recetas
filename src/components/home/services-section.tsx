"use client";

import React from "react";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface Service {
  title: string;
  description: string;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
}

interface ServicesSectionProps {
  services: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const t = useTranslations("HomePage.Services");
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    const onInit = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
    };

    onInit();

    api.on("select", onSelect);
    api.on("reInit", onInit);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onInit);
    };
  }, [api]);

  const colors = [
    { bg: "bg-[#DEF7E7]", text: "text-[#3F6146]" },
    { bg: "bg-[#EBF5D5]", text: "text-[#7B8E4B]" },
    { bg: "bg-[#FDF0DD]", text: "text-[#B08953]" },
    { bg: "bg-[#E1EDFB]", text: "text-[#4B7EB0]" },
    { bg: "bg-[#F1E9FF]", text: "text-[#7B61B0]" },
    { bg: "bg-[#DEF7E7]", text: "text-[#3F6146]" },
  ];

  const renderCard = (
    service: Service,
    index: number,
    forceDescription = false,
  ) => {
    const color = colors[index % colors.length];

    // In desktop, logic: index < 3 ? tall : short
    // In mobile carousel, user wants all to have description -> forceDescription = true
    const isTall = index < 3 || forceDescription;

    return (
      <Link
        href={service.href}
        className={cn(
          color.bg,
          "rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden group transition-all hover:scale-[1.02] hover:shadow-2xl flex flex-col h-full",
          isTall
            ? "min-h-[380px] md:min-h-[320px] justify-start"
            : "min-h-[120px] md:min-h-[160px] justify-center",
        )}
      >
        <div className={cn("relative z-10", isTall ? "w-[65%]" : "w-[60%]")}>
          <h3
            className={cn(
              color.text,
              "font-bold leading-tight",
              isTall
                ? "text-2xl md:text-3xl lg:text-[2.2rem] mb-4"
                : "text-xl md:text-2xl lg:text-[1.8rem] mb-0",
            )}
          >
            {service.title}
          </h3>
          {isTall && (
            <p
              className={cn(
                color.text,
                "opacity-90 text-sm md:text-base lg:text-lg leading-snug line-clamp-5 font-medium",
              )}
            >
              {service.description || t("default_description")}
            </p>
          )}
        </div>
        <div
          className={cn(
            "absolute right-[-10px] bottom-[-5px] pointer-events-none select-none",
            isTall ? "w-[50%] h-[80%] md:h-[90%]" : "w-[40%] h-[90%] md:h-full",
          )}
        >
          <Image
            src="/image_Cort.png"
            alt={service.imageAlt || t("image_alt")}
            width={400}
            height={400}
            className="w-full h-full object-contain object-bottom-right transform transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
    );
  };

  return (
    <section
      id="servicios"
      className="w-full py-12 md:py-24 relative bg-transparent z-10 scroll-mt-20 md:scroll-mt-32"
    >
      <div className="w-full px-6 md:px-12 lg:px-[8%]">
        <div className="mb-12 text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            {t("title")}
          </h2>
          <p className="text-slate-600 text-lg">{t("subtitle")}</p>
        </div>

        {/* Mobile Carousel */}
        <div className="block md:hidden">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {services.map((service, index) => (
                <CarouselItem key={index} className="pl-4 basis-[85%]">
                  {renderCard(service, index, true)}
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  current === i
                    ? "bg-slate-800 w-8"
                    : "bg-slate-300 w-2.5 hover:bg-slate-400",
                )}
                aria-label={`Ir al slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <React.Fragment key={index}>
              {renderCard(service, index)}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
