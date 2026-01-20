"use client";

import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface TimelineStep {
  number: number;
  description: string;
  imageSrc: string;
  position: "left" | "right";
}

const steps: TimelineStep[] = [
  {
    number: 1,
    description:
      "Complete el registro, escoja el servicio médico o laboratorio deseado.",
    imageSrc: "/pasos/layer_1.svg",
    position: "left",
  },
  {
    number: 2,
    description: "Pague con Tarjeta de Crédito o ATH MOVIL.",
    imageSrc: "/pasos/layer_4.svg",
    position: "right",
  },
  {
    number: 3,
    description:
      "Si es un laboratorio escogido le llega inmediatamente a su email.",
    imageSrc: "/pasos/layer_2.svg",
    position: "left",
  },
  {
    number: 4,
    description:
      "Si es una cita médica un doctor se comunicará con usted durante el día. Si necesita una cita más rápida por favor llamarnos a nuestro número (787) 710-7426.",
    imageSrc: "/pasos/layer_3.svg",
    position: "right",
  },
];

export function HowItWorks() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedSnap());
    };

    onSelect();
    api.on("select", onSelect);
    // @ts-expect-error - Embla reInit event might not be in all versions
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      // @ts-expect-error - Embla reInit event might not be in all versions
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="w-full px-6 md:px-12 lg:px-[8%]">
        {/* Header */}
        <div className="mb-16 md:mb-20 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0D4B4D] mb-6 tracking-tight">
            ¿Cómo funciona?
          </h2>
          <p className="text-xl md:text-2xl text-[#0D4B4D]/70 font-medium max-w-2xl mx-auto">
            Sigue estos pasos para obtener la receta deseada
          </p>
        </div>

        {/* Timeline Container - Desktop */}
        <div className="relative hidden md:block">
          {/* Vertical Dashed Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2">
            <div className="h-full w-full border-l-2 border-dashed border-teal-500/40" />
          </div>

          <div className="space-y-12 md:space-y-0">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`relative flex items-center justify-between md:mb-24 last:mb-0 ${
                  step.position === "right"
                    ? "md:flex-row-reverse"
                    : "md:flex-row"
                } flex-col`}
              >
                {/* Content Card */}
                <div className="w-full md:w-[42%] flex justify-center">
                  <div className="w-full rounded-[2.5rem] bg-[#75BBA7] p-6 md:p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      {/* Illustration */}
                      <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0 brightness-110">
                        <Image
                          src={step.imageSrc}
                          alt={`Paso ${step.number}`}
                          fill
                          className="object-contain transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      {/* Text content */}
                      <div className="flex-1 text-center sm:text-left">
                        <p className="text-lg md:text-xl font-bold leading-tight">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Number Circle (Desktop) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#75BBA7] text-white text-xl font-extrabold shadow-lg">
                    {step.number}
                  </div>
                </div>

                {/* Spacer for desktop layout */}
                <div className="w-[42%]" />
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Container - Mobile */}
        <div className="md:hidden">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {steps.map((step, index) => (
                <CarouselItem
                  key={step.number}
                  className="basis-[88%] pl-4 transition-opacity duration-300"
                >
                  <div
                    className={`flex flex-col items-center transition-all duration-500 ${index === current ? "scale-100 opacity-100" : "scale-95 opacity-50"}`}
                  >
                    <div className="w-full rounded-[2.5rem] bg-[#75BBA7] p-8 text-white shadow-lg flex flex-col items-center text-center h-[320px] justify-center">
                      <div className="relative w-32 h-32 mb-6 brightness-110">
                        <Image
                          src={step.imageSrc}
                          alt={`Paso ${step.number}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <p className="text-lg font-bold leading-tight">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Pagination Step Numbers (Bottom Navigation) */}
            <div className="flex justify-center gap-4 mt-8">
              {steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() =>
                    // @ts-expect-error - scrollTo might be missing in some CarouselApi types
                    api?.scrollTo(index)
                  }
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold transition-all duration-300 shadow-sm ${
                    index === current
                      ? "bg-[#75BBA7] text-white scale-110 shadow-md"
                      : "bg-[#75BBA7]/10 text-[#75BBA7] border border-[#75BBA7]/20 hover:bg-[#75BBA7]/20"
                  }`}
                >
                  {step.number}
                </button>
              ))}
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
