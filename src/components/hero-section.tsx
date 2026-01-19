"use client";

import { Plus, ArrowUpRight } from "lucide-react";
import { AnimatedList } from "@/components/ui/animated-list";
import { TypingAnimation } from "@/components/ui/typing-animation";
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
    <main className="relative w-full h-auto min-h-[600px] lg:min-h-[800px] overflow-hidden flex items-center justify-center">
      {/* Content Layer */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-[8%] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-48 text-center lg:text-left py-12 lg:py-20">
        {/* Left Content */}
        <div className="flex-1 max-w-4xl">
          <h1 className="text-[2.4rem] leading-tight sm:text-6xl md:text-6xl lg:text-7xl font-bold text-white mb-8 lg:mb-12 tracking-tight font-semibold">
            ¿Necesitas una <br className="hidden sm:block" /> {/* desktop */}
            <br className="block sm:hidden" /> {/* mobile */}
            <span className="text-[#6CE4AE]">
              <TypingAnimation
                words={[
                  "consulta médica",
                  "receta urgente",
                  "atención inmediata",
                  "diagnóstico online",
                ]}
                className="inline"
                loop={true}
                typeSpeed={100}
                deleteSpeed={50}
                pauseDelay={2000}
              />
            </span>
            <br />
            lo antes posible?
          </h1>
        </div>

        {/* Right Content - Animated List */}
        <div className="flex-1 w-full max-w-md lg:max-w-xl">
          <div className="h-auto w-full flex flex-col gap-4">
            <AnimatedList>
              {consultations.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="mb-4 rounded-[2rem] bg-white p-4 lg:p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-slate-700 ml-2 text-[0.95rem] sm:text-lg lg:text-xl font-semibold text-left">
                      {item.name}
                    </p>
                    <div className="w-10 h-10 lg:hidden rounded-full border border-teal-500/30 flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all flex-shrink-0">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              ))}
            </AnimatedList>
          </div>

          {/* Button Below (Only Desktop or visible if needed) */}
          <div className="mt-8 flex items-center justify-center lg:justify-start gap-4">
            <span className="text-[#1e3434] font-semibold text-lg lg:text-xl">
              Otras consultas
            </span>
            <button className="flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white text-teal-600 transition-all shadow-lg hover:scale-105 active:scale-95 group">
              <Plus className="w-6 h-6 lg:w-8 lg:h-8 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
