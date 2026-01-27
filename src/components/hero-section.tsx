"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

const consultations = [
  {
    id: 1,
    name: 'Receta de medicamentos o "Refill"',
  },
  {
    id: 2,
    name: "Consultas Médicas Generales",
  },
  {
    id: 3,
    name: "Consulta por Covid",
  },
  {
    id: 4,
    name: "Prueba de sangre ETH",
  },
  {
    id: 5,
    name: "Evaluacion Medica del sueño",
  },
  {
    id: 6,
    name: "Receta de medicamentos o 'refill'",
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

      if ((isMovingDown && !isAtEnd) || (isMovingUp && !isAtStart)) {
        if (e.cancelable) e.preventDefault();

        const THRESHOLD = 25;
        const MOBILE_COOLDOWN = 80;

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
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

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
    <main
      ref={containerRef}
      className="relative w-full min-h-screen md:min-h-[750px] lg:min-h-[750px] flex items-center justify-center"
    >
      <div className="absolute top-0 left-0 w-full h-full lg:h-[180%] pointer-events-none z-0 lg:hidden">
        <BackgroundGradientAnimation
          containerClassName="!h-full !w-full blur-[40px] will-change-transform"
          firstColor="16, 185, 129"
          secondColor="20, 184, 166"
          thirdColor="34, 197, 94"
          fourthColor="6, 182, 212"
          fifthColor="37, 99, 235"
          pointerColor="52, 211, 153"
          size="120%"
          blendingValue="screen"
          interactive={false}
        />
      </div>

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-[8%] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-32 xl:gap-40 text-center lg:text-left pt-12 lg:py-16">
        <div className="flex-1 w-full max-w-4xl">
          <h1 className="text-[2.4rem] leading-[1.1] sm:text-3xl md:text-6xl lg:text-[2.5rem] xl:text-[2rem] 2xl:text-[3rem] font-bold text-white mb-8 lg:mb-12 tracking-tight text-balance">
            ¿Necesitas una
            <br className="block lg:hidden" />{" "}
            <span className="text-[#3499EA] md:text-[#00FF8C]">
              <TypingAnimation
                words={["consulta médica", "Excusa Medica", "Prueba Covid"]}
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

        <div className="flex-1 w-full max-w-md lg:max-w-lg">
          <div
            className="relative w-full px-2"
            style={{
              minHeight: `${CONTAINER_HEIGHT}px`,
              height: `${CONTAINER_HEIGHT}px`,
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
                        scale: 0.9,
                      }}
                      animate={{
                        opacity: isActive ? 1 : 0.9,
                        y: localIndex * ITEM_HEIGHT,
                        scale: isActive ? 1.025 : 1,
                        zIndex: 100 - distance,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.9,
                        y: localIndex * ITEM_HEIGHT - 20,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                        mass: 1,
                        opacity: { duration: 0.3 },
                      }}
                      className="absolute top-0 left-0 w-full cursor-pointer will-change-transform"
                      onClick={() => setActiveIndex(globalIndex)}
                    >
                      <div
                        className={`
                          relative overflow-hidden rounded-2xl p-4 lg:p-5 px-5 lg:px-10
                          transition-all duration-500 bg-white flex flex-col justify-center min-h-[70px]
                          ${isActive ? "shadow-2xl ring-1 ring-black/5" : "shadow-sm"}
                        `}
                      >
                        <div className="relative z-10">
                          <p
                            className={`
                              text-base lg:text-lg font-bold text-left tracking-tight transition-colors duration-500
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
                const el = document.getElementById("chatbot");
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
    </main>
  );
}
