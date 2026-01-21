"use client";

import Hero from "@/components/hero-section";
import { ChatbotSection } from "@/components/home/chatbot-section";
import { ServiceCard } from "@/components/home/service-card";
import { HowItWorks } from "@/components/home/how-it-works";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import { FAQSection } from "@/components/home/faq-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { BenefitsSection } from "@/components/home/benefits-section";
import { motion } from "motion/react";

const services = [
  {
    title: "Receta de medicamentos o “refill”",
    description: "Receta de medicamentos o “refill”.",
    imageSrc: "/citas-medicas/3.png",
    imageAlt: "Revisión ultrasónica",
  },
  {
    title: "ECBC + DIFF Lab",
    description:
      "Electrocardiograma completo con análisis digital avanzado y monitoreo cardíaco en tiempo real.",
    imageSrc: "/citas-medicas/2.png",
    imageAlt: "ECG Scan",
  },
  {
    title: "Análisis de orina y cultivo de orina",
    description:
      "Medición precisa de composición corporal, porcentaje de grasa y masa muscular mediante bioimpedancia.",
    imageSrc: "/citas-medicas/1.png",
    imageAlt: "Análisis corporal",
  },
];

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
      className="flex flex-col gap-0 overflow-x-hidden"
    >
      <Hero />

      {/* Services Section */}
      <section id="servicios" className="w-full sm:py-12 relative group">
        <div className="w-full px-6 md:px-12 lg:px-[8%]">
          <div className="flex justify-center mb-16 px-2">
            <div className="space-y-4 text-center">
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-[#0D4B4D] tracking-tighter leading-none">
                Nuestros Servicios
              </h2>
              <p className="text-teal-900/60 font-medium text-lg">
                Explora nuestras soluciones médicas digitales
              </p>
            </div>
          </div>

          {/* Desktop Grid / Mobile Carousel */}
          <div className="relative">
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both hover:-translate-y-2 transition-transform"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <ServiceCard {...service} />
                </div>
              ))}
            </div>

            <div className="md:hidden">
              <ServicesCarousel services={services} />
            </div>
          </div>
        </div>
      </section>

      <ChatbotSection />
      <WhyChooseUs />
      <HowItWorks />
      <FAQSection />
      <TestimonialsSection />
      <BenefitsSection />
    </motion.main>
  );
}

interface Service {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

function ServicesCarousel({ services }: { services: Service[] }) {
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
