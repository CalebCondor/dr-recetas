import { motion, Variants } from "framer-motion";
import NextImage from "next/image";

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
  return (
    <section className="relative py-20 lg:py-32 w-full px-8 md:px-16 lg:px-[10%] overflow-hidden">
      {/* Dynamic Background Effect */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "linear-gradient(148deg, rgba(240, 244, 253, 0.00) 19.34%, rgba(29, 125, 126, 0.21) 47.29%, rgba(240, 244, 253, 0.54) 79.28%)",
          filter: "blur(55.95px)",
          transform: "scale(1.1)" // Scale up slightly to cover edges due to blur
        }}
      />

      <div className="relative z-10">
        {/* Header - Matching HowItWorks style */}
        <div className="mb-16 md:mb-20 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0D4B4D] mb-6 tracking-tight">
            Clientes satisfechos confían con Dr.Recetas
          </h2>
        </div>

      <motion.div
        variants={testimonialContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {testimonials.map((testimonial) => (
          <motion.div
            variants={testimonialItem}
            key={testimonial.id}
            className="flex flex-col"
          >
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
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
