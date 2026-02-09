"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  FileText,
  Pill,
  Stethoscope,
  Calendar,
  Microscope,
  TestTube2,
} from "lucide-react";
import { TypingAnimation } from "@/components/ui/typing-animation";

const consultations = [
  {
    id: 1,
    name: "Certificado Médico",
    icon: FileText,
  },
  {
    id: 2,
    name: 'Receta de medicamentos o "Refill"',
    icon: Pill,
  },
  {
    id: 3,
    name: "Evaluación médica inmediata",
    icon: Stethoscope,
  },
  {
    id: 4,
    name: "Cita de Seguimiento",
    icon: Calendar,
  },
  {
    id: 5,
    name: "Prueba de Influenza A y B",
    icon: Microscope,
  },
  {
    id: 6,
    name: "CBC + DIFF Lab",
    icon: TestTube2,
  },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(0);
  const COOLDOWN = 80;

  const [isHeroVisible, setIsHeroVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.6 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const activeIndexRef = useRef(activeIndex);
  const touchStartRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    if (!isHeroVisible) return;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      const currentActiveIndex = activeIndexRef.current;
      const isScrollDown = e.deltaY > 0;
      const isScrollUp = e.deltaY < 0;

      const isAtEnd = currentActiveIndex >= consultations.length - 1;
      const isAtStart = currentActiveIndex === 0;

      if ((isScrollDown && !isAtEnd) || (isScrollUp && !isAtStart)) {
        if (e.cancelable) e.preventDefault();

        if (
          now - lastScrollTime.current > COOLDOWN &&
          Math.abs(e.deltaY) > 15
        ) {
          if (isScrollDown && !isAtEnd) {
            setActiveIndex((prev) => prev + 1);
          } else if (isScrollUp && !isAtStart) {
            setActiveIndex((prev) => prev - 1);
          }
          lastScrollTime.current = now;
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const now = Date.now();
      const touchEnd = e.touches[0].clientY;
      const delta = touchStartRef.current - touchEnd;
      const absDelta = Math.abs(delta);
      const currentActiveIndex = activeIndexRef.current;

      const isAtEnd = currentActiveIndex >= consultations.length - 1;
      const isAtStart = currentActiveIndex === 0;

      const isMovingDown = delta > 0;
      const isMovingUp = delta < 0;

      // Only block if we are actually navigating the list
      if ((isMovingDown && !isAtEnd) || (isMovingUp && !isAtStart)) {
        const THRESHOLD = 30;
        const MOBILE_COOLDOWN = 100;

        if (
          now - lastScrollTime.current > MOBILE_COOLDOWN &&
          absDelta > THRESHOLD
        ) {
          if (isMovingDown && !isAtEnd) {
            setActiveIndex((prev) => prev + 1);
          } else if (isMovingUp && !isAtStart) {
            setActiveIndex((prev) => prev - 1);
          }

          touchStartRef.current = touchEnd;
          lastScrollTime.current = now;
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isHeroVisible]);

  const WINDOW_SIZE = 3;
  const windowStartIndex = Math.max(
    0,
    Math.min(activeIndex, consultations.length - WINDOW_SIZE),
  );

  const ITEM_HEIGHT = 90;
  const CONTAINER_HEIGHT = ITEM_HEIGHT * WINDOW_SIZE;
  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen md:min-h-[750px] lg:min-h-[750px] flex items-center justify-center"
    >
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-[8%] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-32 xl:gap-40 text-center lg:text-left pt-12 lg:py-16">
        <div className="flex-1 w-full max-w-4xl sm:mt-10">
          <h1 className="text-[2.6rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4.2rem] 2xl:text-[4.8rem] font-bold text-slate-900 mb-8 lg:mb-10 tracking-tight text-balance">
            Consigue una
            <br />
            <span className="text-[#3F6146]">
              <TypingAnimation
                words={["Excusa Medica", "Prueba Covid"]}
                className="inline"
                loop={false}
                typeSpeed={80}
                deleteSpeed={40}
                pauseDelay={2000}
              />
            </span>
            <br />
            lo antes posible
          </h1>
        </div>

        <div className="flex-1 w-full max-w-md lg:max-w-lg">
          <div
            className="relative w-full px-2 touch-action-none"
            style={{
              minHeight: `${CONTAINER_HEIGHT}px`,
              height: `${CONTAINER_HEIGHT}px`,
              touchAction: "none",
            }}
          >
            <AnimatePresence initial={false} mode="popLayout">
              {consultations
                .slice(windowStartIndex, windowStartIndex + WINDOW_SIZE)
                .map((item, localIndex) => {
                  const globalIndex = windowStartIndex + localIndex;
                  const isActive = globalIndex === activeIndex;
                  const distance = Math.abs(globalIndex - activeIndex);

                  return (
                    <motion.div
                      key={item.id}
                      initial={{
                        opacity: 0,
                        y: localIndex * ITEM_HEIGHT + 20,
                      }}
                      animate={{
                        opacity: isActive ? 1 : 0.8,
                        y: localIndex * ITEM_HEIGHT,
                        scale: isActive ? 1.02 : 1,
                        zIndex: 100 - distance,
                      }}
                      exit={{
                        opacity: 0,
                        y: localIndex * ITEM_HEIGHT - 20,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: [0.32, 0.72, 0, 1],
                        opacity: { duration: 0.2 },
                      }}
                      className="absolute top-0 left-0 w-full cursor-pointer will-change-[transform,opacity]"
                      onClick={() => setActiveIndex(globalIndex)}
                    >
                      <div
                        className={`
                          relative overflow-hidden rounded-2xl p-4 lg:p-5 px-5 lg:px-10
                          transition-all duration-500 bg-white flex flex-col justify-center min-h-[70px]
                          ${isActive ? "shadow-2xl ring-1 ring-black/5" : "shadow-sm"}
                        `}
                      >
                        <div className="relative z-10 flex items-center gap-3 md:gap-4">
                          <div
                            className={`
                              shrink-0 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl transition-colors duration-500
                              ${isActive ? "bg-teal-50 text-teal-600" : "bg-slate-50 text-slate-400"}
                            `}
                          >
                            <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                          </div>
                          <p
                            className={`
                              text-sm md:text-base lg:text-lg font-bold text-left tracking-tight transition-colors duration-500 line-clamp-2
                              ${isActive ? "text-[#0D4B4D]" : "text-slate-600"}
                            `}
                          >
                            {item.name}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center lg:justify-start gap-4">
            <span className="text-[#1e3434] font-semibold text-lg lg:text-xl">
              Otras consultas
            </span>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("servicios");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white text-teal-600 transition-all shadow-lg hover:scale-105 active:scale-95 group"
            >
              <Plus className="w-6 h-6 lg:w-8 lg:h-8 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
