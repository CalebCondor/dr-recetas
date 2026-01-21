import React from "react";
import { motion, Variants } from "framer-motion";
import NextImage from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
  image: string;
}

const testimonialContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const testimonialItem: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 80 },
  },
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Excelente servicio, la receta me llegó a mi email en menos de 10 minutos. Muy recomendado.",
    author: "María Rodríguez",
    role: "Paciente",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    text: "La atención del Dr. fue excepcional. Pude resolver mi refill de medicamentos sin salir de casa.",
    author: "Carlos Ortiz",
    role: "Paciente",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    text: "Muy fácil de usar. El proceso de pago con ATH Móvil fue súper rápido. ¡Gracias!",
    author: "Elena Rivera",
    role: "Paciente",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
  },
];

export function TestimonialsSection() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const autoplayInterval = React.useRef<NodeJS.Timeout | null>(null);
  const resumeTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = React.useCallback(() => {
    if (autoplayInterval.current) return;
    autoplayInterval.current = setInterval(() => {
      api?.scrollNext();
    }, 2000);
  }, [api]);

  const stopAutoplay = React.useCallback(() => {
    if (autoplayInterval.current) {
      clearInterval(autoplayInterval.current);
      autoplayInterval.current = null;
    }
  }, []);

  React.useEffect(() => {
    if (!api) return;

    startAutoplay();

    const handlePointerDown = () => {
      stopAutoplay();
      if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    };

    const handlePointerUp = () => {
      if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
      resumeTimeout.current = setTimeout(() => {
        startAutoplay();
      }, 3000); // Resume after 3 seconds of inactivity
    };

    api.on("pointerDown", handlePointerDown);
    api.on("pointerUp", handlePointerUp);

    return () => {
      stopAutoplay();
      if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
      api.off("pointerDown", handlePointerDown);
      api.off("pointerUp", handlePointerUp);
    };
  }, [api, startAutoplay, stopAutoplay]);

  return (
    <section className="relative py-20 lg:py-32 w-full px-8 md:px-16 lg:px-[10%]">
      {/* Dynamic Background Effect */}
      <div
        className="absolute inset-x-0 -top-40 -bottom-40 pointer-events-none z-0"
        style={{
          background:
            "linear-gradient(148deg, rgba(240, 244, 253, 0.00) 19.34%, rgba(29, 125, 126, 0.21) 47.29%, rgba(240, 244, 253, 0.54) 79.28%)",
          filter: "blur(60px)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          transform: "scale(1.1)",
        }}
      />

      <div className="relative z-10">
        {/* Header - Matching HowItWorks style */}
        <div className="mb-16 md:mb-20 text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#0D4B4D] mb-6 tracking-tight leading-snug">
            Clientes satisfechos confían con Dr.Recetas
          </h2>
        </div>

        {/* Desktop Grid Layout */}
        <motion.div
          variants={testimonialContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              variants={testimonialItem}
              key={testimonial.id}
              className="flex flex-col"
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Carousel Layout */}
        <div className="md:hidden -mx-4">
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="ml-0">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={testimonial.id}
                  className="pl-4 basis-[85%] transition-opacity duration-300"
                >
                  <div
                    className={`transition-all duration-500 h-full py-4 ${
                      index === current
                        ? "scale-100 opacity-100"
                        : "scale-90 opacity-40"
                    }`}
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Carousel Pagination */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => api?.scrollTo(i)}
                  className={`transition-all duration-500 h-2 rounded-full ${
                    i === current
                      ? "bg-[#0D4B4D] w-8"
                      : "bg-[#0D4B4D]/20 w-2 hover:bg-[#0D4B4D]/40"
                  }`}
                  aria-label={`Ir a testimonio ${i + 1}`}
                />
              ))}
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex flex-col">
      {/* Speech Bubble */}
      <motion.div
        whileHover={{
          y: -5,
          boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
        }}
        className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative mb-6"
      >
        <p className="text-gray-500 text-sm leading-relaxed">
          &quot;{testimonial.text}&quot;
        </p>
        {/* Tail arrow */}
        <div className="absolute -bottom-3 left-10 w-6 h-6 bg-white border-b border-r border-gray-100 transform rotate-45" />
      </motion.div>

      {/* User Profile */}
      <div className="flex items-center gap-4 pl-6">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
          <NextImage
            src={testimonial.image}
            alt={testimonial.author}
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-bold text-[#0D4B4D] text-base leading-tight">
            {testimonial.author}
          </h4>
          <p className="text-xs text-gray-400 font-medium">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
}
