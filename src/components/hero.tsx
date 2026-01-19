"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { Plus, ArrowUpRight } from "lucide-react";
import { AnimatedList } from "@/components/ui/animated-list"; // Keeping if needed or removing? Removing usage below.
import { TypingAnimation } from "@/components/ui/typing-animation";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
const consultations = [
  {
    id: 1,
    name: 'Receta de medicamentos o "refill"',
  },
  {
    id: 2,
    name: 'Receta de medicamentos o "refill"',
  },
  {
    id: 3,
    name: 'Receta de medicamentos o "refill"',
  },
  {
    id: 4,
    name: 'Receta de medicamentos o "refill"',
  },
  {
    id: 5,
    name: 'Receta de medicamentos o "refill"',
  },
  {
    id: 6,
    name: 'Receta de medicamentos o "refill"',
  },
];

export default function Hero() {
  return (
    <main className="relative w-full h-auto min-h-[800px] overflow-hidden flex items-center justify-center">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <BackgroundGradientAnimation
          containerClassName="!h-full !w-full"
          size="100%"
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-[10%] flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left py-20">
        {/* Left Content */}
        <div className="flex-1 max-w-xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-[1.1]">
            ¿Necesitas una{" "}
            <TypingAnimation
              words={[
                "consulta médica",
                "receta urgente",
                "atención rápida",
                "diagnóstico online",
              ]}
              className="text-teal-600 inline-block"
              loop={true}
              typeSpeed={100}
              deleteSpeed={50}
              pauseDelay={2000}
            />{" "}
            lo antes posible?
          </h1>
        </div>

        {/* Right Content - Animated List */}
        <div className="flex-1 w-full max-w-lg">
          <ScrollableList items={consultations} />

          {/* Button Below */}
          <div className="mt-8 flex items-center justify-center lg:justify-start gap-4">
            <span className="text-slate-700 font-semibold">
              Otras consultas
            </span>
            <button className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-600 text-white hover:bg-teal-700 transition-all shadow-lg hover:scale-105 active:scale-95">
              <Plus className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

function ScrollableList({ items }: { items: typeof consultations }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="h-[280px] w-full overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-300"
    >
      <div className="flex flex-col gap-3 pb-4">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{
              root: containerRef,
              margin: "-10% 0px -10% 0px",
              once: true,
            }}
            transition={{ duration: 0.4, delay: index < 3 ? index * 0.1 : 0 }}
            className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <p className="text-slate-700 font-medium group-hover:text-teal-700 transition-colors">
                {item.name}
              </p>
              <ArrowUpRight className="w-5 h-5 text-teal-600 flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
