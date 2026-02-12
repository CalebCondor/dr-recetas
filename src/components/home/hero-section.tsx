"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Pill,
  Stethoscope,
  Calendar,
  Microscope,
  TestTube2,
  ArrowDown,
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

  // Auto-scroll effect at the beginning to show it's a carousel
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setActiveIndex((prev) => {
          if (prev < 3) return prev + 1; // Show first 4 items
          clearInterval(interval);
          return prev;
        });
      }, 1500);
      return () => clearInterval(interval);
    }, 1000);
    return () => clearTimeout(timer);
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
        if (e.cancelable && e.type === "touchmove") {
          e.preventDefault();
        }

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
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-screen md:min-h-[800px] lg:min-h-[850px] flex items-center justify-center overflow-hidden bg-slate-900"
    >
      {/* Video Background Container */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-900">
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          poster="/image.png"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full h-full object-cover scale-105"
          style={{ filter: "brightness(0.80) contrast(1.15)" }}
        >
          <source
            src="https://zdnqljsxqtptpauvowbq.supabase.co/storage/v1/object/public/Video/AZxSN_GS07Kk6cguiugclw-AZxSN_GSUb4LaTUPhiWP_g.mp4"
            type="video/mp4"
          />
        </motion.video>

        {/* Green Tint Overlay Layer */}
        <div className="absolute inset-0 bg-[#0D4B4D]/35 mix-blend-multiply" />

        {/* Gradient Overlay for depth and text legibility */}
        <div className="absolute inset-0 bg-linear-to-tr from-[#0D4B4D]/40 via-transparent to-black/20" />
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-white/5" />
      </div>

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-[8%] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-32 xl:gap-40 text-center lg:text-left pt-12 lg:py-16">
        <div className="flex-1 w-full max-w-4xl sm:mt-10">
          <h1 className="text-[2.6rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4.2rem] 2xl:text-[4.8rem] font-bold text-white mb-4 lg:mb-10 tracking-tight text-balance drop-shadow-sm">
            Consigue una
            <br />
            <span className="text-[#95D5B2]">
              <TypingAnimation
                words={[
                  "Excusa Médica",
                  "Prueba de Covid",
                  "Cita Médica",
                  "Receta Médica",
                ]}
                className="inline"
                loop={false}
                typeSpeed={75}
                deleteSpeed={60}
                pauseDelay={1000}
              />
            </span>
            <br />
            lo antes posible
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
                      }}
                      animate={{
                        opacity: isActive ? 1 : 0.75,
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
                          transition-all duration-500 flex flex-col justify-center min-h-[70px]
                          ${
                            isActive
                              ? "bg-white/30 shadow-[0_25px_50px_rgba(0,0,0,0.5)] ring-0 ring-white/60 border-t border-l border-white/70"
                              : "bg-white/20 backdrop-blur-lg shadow-md border border-white/20 hover:bg-white/25"
                          }
                        `}
                        style={{
                          backdropFilter: isActive
                            ? "blur(24px) saturate(180%) contrast(120%) hue-rotate(5deg)"
                            : undefined,
                        }}
                      >
                        {/* Shimmer effect for active card */}
                        {isActive && (
                          <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "200%" }}
                            transition={{
                              repeat: Infinity,
                              duration: 4, // Slower shimmer
                              ease: "linear",
                            }}
                            className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none"
                          />
                        )}
                        <div className="relative z-10 flex items-center gap-4">
                          <div
                            className={`
                              shrink-0 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl transition-all duration-500
                              ${
                                isActive
                                  ? "bg-white/40 text-white shadow-xl scale-125 rotate-3"
                                  : "bg-white/10 text-white/90"
                              }
                            `}
                          >
                            <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                          </div>
                          <p
                            className={`
                              text-[0.89rem] md:text-base lg:text-lg font-bold text-left tracking-tight transition-all duration-500 line-clamp-2
                              ${
                                isActive
                                  ? "text-white scale-[1.02] translate-x-1"
                                  : "text-white"
                              }
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
          <div className="mt-8 flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("servicios");
                if (el) {
                  const headerOffset = window.innerWidth < 768 ? 90 : 120;
                  const elementPosition =
                    el.getBoundingClientRect().top + window.pageYOffset;
                  window.scrollTo({
                    top: elementPosition - headerOffset,
                    behavior: "smooth",
                  });
                }
              }}
              className="group flex flex-col items-center gap-3"
            >
              <span className="text-white/90 font-bold text-sm lg:text-base tracking-[0.2em] uppercase drop-shadow-md group-hover:text-white transition-colors">
                Explorar Servicios
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-white/20 backdrop-blur-xl text-white shadow-lg border border-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all active:scale-95"
              >
                <ArrowDown className="w-6 h-6 lg:w-7 lg:h-7 group-hover:brightness-125 transition-all" />
              </motion.div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
