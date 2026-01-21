"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { TypingAnimation } from "@/components/ui/typing-animation";
const consultations = [
  {
    id: 1,
    name: '1 Receta de medicamentoss o "refill"',
  },
  {
    id: 2,
    name: '2 Receta de medicsaaamentos o "refill"',
  },
  {
    id: 3,
    name: '3 Receta de medasaicamentos o "refill"',
  },
  {
    id: 4,
    name: '4 Receta de medicamasasentos o "refill"',
  },
  {
    id: 5,
    name: '5 Receta de medicamasaentos o "refill"',
  },
  {
    id: 6,
    name: '6 Receta de medasicamentos o "refill"',
  },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(0);
  const COOLDOWN = 150; // Reduced for better responsiveness

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      const isScrollDown = e.deltaY > 0;
      const isScrollUp = e.deltaY < 0;

      // Use absolute delta to allow fast users to skip items more naturally
      if (Math.abs(e.deltaY) < 10) return;

      const isAtEnd = activeIndex >= consultations.length - 1;
      const isAtStart = activeIndex === 0;

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

  const WINDOW_SIZE = 4;
  const windowStartIndex = Math.max(
    0,
    Math.min(activeIndex, consultations.length - WINDOW_SIZE),
  );

  return (
    <main className="relative w-full min-h-[850px] lg:min-h-[750px] flex items-center justify-center">
      {/* Content Layer */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-[8%] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-32 xl:gap-40 text-center lg:text-left py-12 lg:py-16">
        {/* Left Content */}
        <div className="flex-1 w-full max-w-4xl">
          <h1 className="text-[2.2rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-[2.5rem] xl:text-[3rem] 2xl:text-[3.5rem] font-bold text-white mb-8 lg:mb-12 tracking-tight text-balance">
            ¿Necesitas una
            <br className="block lg:hidden" />{" "}
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
            <br className="block lg:hidden" /> lo antes posible?
          </h1>
        </div>

        {/* Right Content - Animated List */}
        <div className="flex-1 w-full max-w-md lg:max-w-lg">
          <div
            ref={containerRef}
            className="relative w-full"
            style={{
              minHeight: "280px",
              height: "280px",
            }}
          >
            <AnimatePresence initial={false}>
              {consultations
                .slice(windowStartIndex, windowStartIndex + WINDOW_SIZE)
                .map((item, localIndex) => {
                  const globalIndex = windowStartIndex + localIndex;
                  const isActive = globalIndex === activeIndex;
                  const distance = Math.abs(globalIndex - activeIndex);

                  return (
                    <motion.div
                      key={item.id}
                      initial={false}
                      animate={{
                        opacity: isActive
                          ? 1
                          : Math.max(0.2, 1 - distance * 0.3),
                        y: localIndex * 65,
                        zIndex: isActive ? 100 : 100 - distance,
                        scale: isActive ? 1 : 0.98,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                      className="absolute top-0 left-0 w-full cursor-pointer"
                      onClick={() => setActiveIndex(globalIndex)}
                    >
                      <div
                        className={`
                        group relative overflow-hidden rounded-[1.8rem] p-5 lg:p-6 
                        border transition-all duration-500 bg-white border-white 
                        ${
                          isActive
                            ? "shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                            : "opacity-60"
                        }
                      `}
                      >
                        {/* Card Glow Effect */}
                        {isActive && (
                          <div className="absolute inset-0 bg-linear-to-br from-teal-500/5 to-transparent pointer-events-none" />
                        )}

                        <div className="flex items-center justify-between gap-4 relative z-10">
                          <div className="flex items-center gap-4">
                            <div className="w-1.5 h-10 rounded-full transition-all duration-500" />
                            <p
                              className={`
                              text-[1rem] sm:text-lg lg:text-xl font-bold text-left tracking-tight
                              ${isActive ? "text-slate-800" : "text-slate-600"}
                            `}
                            >
                              {item.name}
                            </p>
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
