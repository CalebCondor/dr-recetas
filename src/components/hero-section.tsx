"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowUpRight } from "lucide-react";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(0);
  const COOLDOWN = 500; // ms

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      const isScrollDown = e.deltaY > 0;
      const isScrollUp = e.deltaY < 0;

      const isAtEnd = activeIndex >= consultations.length - 1;
      const isAtStart = activeIndex === 0;

      // Handle Scroll Locking
      // We prevent default if we can still scroll in that direction within the component
      if ((isScrollDown && !isAtEnd) || (isScrollUp && !isAtStart)) {
        e.preventDefault();

        if (now - lastScrollTime.current > COOLDOWN) {
          if (isScrollDown && !isAtEnd) {
            setActiveIndex((prev) =>
              Math.min(prev + 1, consultations.length - 1),
            );
          } else if (isScrollUp && !isAtStart) {
            setActiveIndex((prev) => Math.max(prev - 1, 0));
          }
          lastScrollTime.current = now;
        }
      }
    };

    // Passive: false is required to use preventDefault
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [activeIndex]);

  const visibleItems = consultations.slice(activeIndex, activeIndex + 3);

  return (
    <main className="relative w-full min-h-[850px] lg:min-h-[750px] flex items-center justify-center">
      {/* Content Layer */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-[8%] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-48 text-center lg:text-left py-12 lg:py-16">
        {/* Left Content */}
        <div className="flex-1 max-w-4xl">
          <h1 className="text-[2.4rem] leading-10 lg:leading-tight sm:text-6xl md:text-6xl lg:text-7xl font-bold text-white mb-8 lg:mb-12 tracking-tight">
            ¿Necesitas una <br className="hidden sm:block" /> {/* desktop */}
            <br className="block sm:hidden" /> {/* mobile */}
            <span className="text-[#6CE4AE]">
              <TypingAnimation
                words={["consulta médica"]}
                className="inline"
                loop={false}
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
          <div
            ref={containerRef}
            className="relative h-[250px] w-full perspective-1000"
          >
            <AnimatePresence mode="popLayout">
              {visibleItems.map((item, index) => {
                const isFirst = index === 0;
                const isSecond = index === 1;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9, y: 50, zIndex: 0 }}
                    animate={{
                      opacity: 1,
                      scale: isFirst ? 1 : isSecond ? 0.95 : 0.9,
                      zIndex: isFirst ? 30 : isSecond ? 20 : 10,
                      y: isFirst ? 0 : isSecond ? 85 : 160,
                      rotateX: isFirst ? 0 : -5,
                    }}
                    exit={{ opacity: 0, scale: 1.05, y: -100, rotateX: 10 }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 200,
                      damping: 25,
                    }}
                    className="absolute top-0 left-0 w-full"
                  >
                    <div className="rounded-[2rem] bg-white p-4 lg:p-6 shadow-lg border border-white/20">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-slate-700 ml-2 text-[0.95rem] sm:text-lg lg:text-xl font-semibold text-left">
                          {item.name}
                        </p>
                        <div className="w-10 h-10 lg:hidden rounded-full border border-teal-500/30 flex items-center justify-center text-teal-600 shrink-0">
                          <ArrowUpRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
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
