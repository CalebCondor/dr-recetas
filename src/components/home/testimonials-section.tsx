"use client";

import { motion } from "framer-motion";
import NextImage from "next/image";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
  image: string;
}


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

  return (
    <section className="relative py-12 lg:py-20 w-full px-8 md:px-16 lg:px-[10%]">
      {/* Dynamic Background Effect */}
      <div
        className="absolute inset-x-0 pointer-events-none z-0"
        style={{
          top: "-500px",
          bottom: "-500px",
          background:
            "linear-gradient(148deg, rgba(240, 244, 253, 0.00) 19.34%, rgba(29, 125, 126, 0.21) 47.29%, rgba(240, 244, 253, 0.54) 79.28%)",
          filter: "blur(60px)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 60%, transparent 150%)",
          maskImage:
            "radial-gradient(ellipse at center, black 60%, transparent 150%)",
          transform: "scale(1.1)",
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-10 md:mb-12 text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#0D4B4D] mb-6 tracking-tight leading-snug">
            Clientes satisfechos confían con Dr.Recetas
          </h2>
        </div>

        {/* Tabs Layout */}
        <div className="w-full max-w-4xl mx-auto">
          <Tabs defaultValue="maria" className="w-full">
            <TabsList variant="line" className="w-full justify-center gap-4 md:gap-8 mb-8 md:mb-12 border-b border-gray-200">
              <TabsTrigger
                value="maria"
                className="text-gray-500 data-[state=active]:text-[#0D4B4D] font-semibold text-sm md:text-base px-4 md:px-6 pb-3 hover:text-[#0D4B4D]/70"
              >
                María Rodríguez
              </TabsTrigger>
              <TabsTrigger
                value="carlos"
                className="text-gray-500 data-[state=active]:text-[#0D4B4D] font-semibold text-sm md:text-base px-4 md:px-6 pb-3 hover:text-[#0D4B4D]/70"
              >
                Carlos Ortiz
              </TabsTrigger>
              <TabsTrigger
                value="elena"
                className="text-gray-500 data-[state=active]:text-[#0D4B4D] font-semibold text-sm md:text-base px-4 md:px-6 pb-3 hover:text-[#0D4B4D]/70"
              >
                Elena Rivera
              </TabsTrigger>
            </TabsList>

            <TabsContent value="maria" className="mt-0 focus-visible:outline-none">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-2xl mx-auto"
              >
                <TestimonialCard testimonial={testimonials[0]} />
              </motion.div>
            </TabsContent>

            <TabsContent value="carlos" className="mt-0 focus-visible:outline-none">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-2xl mx-auto"
              >
                <TestimonialCard testimonial={testimonials[1]} />
              </motion.div>
            </TabsContent>

            <TabsContent value="elena" className="mt-0 focus-visible:outline-none">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-2xl mx-auto"
              >
                <TestimonialCard testimonial={testimonials[2]} />
              </motion.div>
            </TabsContent>
          </Tabs>
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
