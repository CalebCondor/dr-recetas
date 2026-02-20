"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Pill,
  Stethoscope,
  Calendar,
  ArrowDown,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { useTranslations } from "next-intl";

const consultations = [
  {
    id: 1,
    nameKey: "medical_certificate",
    icon: FileText,
    href: "/servicios/citas-medicas/certificado-mdico-26",
  },
  {
    id: 2,
    nameKey: "prescription_refill",
    icon: Pill,
    href: "/servicios/lab/receta-de-medicamentos-o-refill-25",
  },
  {
    id: 3,
    nameKey: "immediate_evaluation",
    icon: Stethoscope,
    href: "/servicios/citas-medicas/evaluacin-mdica-inmediata-38",
  },
  {
    id: 4,
    nameKey: "follow_up",
    icon: Calendar,
    href: "/servicios/citas-medicas/cita-de-seguimiento-31",
  },
];

export default function Hero() {
  const t = useTranslations("HomePage.Hero");
  const tc = useTranslations("HomePage.Consultations");

  const [activeIndex, setActiveIndex] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isHeroVisibleRef = useRef(false);

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isHeroVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 },
    );

    observer.observe(currentContainer);

    return () => {
      observer.unobserve(currentContainer);
    };
  }, []);

  // Infinite auto-scroll effect
  useEffect(() => {
    // If hero is not visible, don't run the timer to save resources
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % consultations.length);
    }, 1500); // 3 seconds per item

    return () => clearTimeout(timer);
  }, [activeIndex]); // Re-run when index changes (either auto or manual)

  const handleInteraction = (index: number) => {
    setActiveIndex(index);
  };

  const WINDOW_SIZE = 4;
  const windowStartIndex = Math.max(
    0,
    Math.min(activeIndex, consultations.length - WINDOW_SIZE),
  );

  const ITEM_HEIGHT = 76;
  const CONTAINER_HEIGHT = ITEM_HEIGHT * WINDOW_SIZE;
  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-screen md:min-h-[800px] lg:min-h-[850px] flex items-start md:items-center justify-center overflow-hidden bg-slate-900"
    >
      {/* Video Background Container */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#0D4B4D]">
        <Image
          src="/image_fondo.jpeg"
          alt=""
          fill
          priority
          className="w-full h-full object-cover scale-105"
          style={{ filter: "brightness(0.80) contrast(1.15)" }}
        />
        <video
          autoPlay
          muted
          playsInline
          preload="auto"
          onPlaying={() => setVideoReady(true)}
          className={`absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-1000 ${videoReady ? "opacity-100" : "opacity-0"
            }`}
          style={{ filter: "brightness(0.80) contrast(1.15)" }}
        >
          <source src="/video_fondo.mp4" type="video/mp4" />
        </video>
        {/* Overlays - Se mantienen igual pero ayudan a suavizar la carga */}
        <div className="absolute inset-0 bg-[#0D4B4D]/35 mix-blend-multiply" />
        <div className="absolute inset-0 bg-linear-to-tr from-[#0D4B4D]/40 via-transparent to-black/20" />
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-white/5" />
      </div>

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-[8%] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-32 xl:gap-40 text-center lg:text-left pt-14 md:pt-16 lg:py-16">
        <div className="flex-1 w-full max-w-4xl mt-6 lg:mt-10">
          <h1 className="text-[2.6rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4.2rem] 2xl:text-[4.8rem] font-bold text-white mb-4 lg:mb-10 tracking-tight text-balance drop-shadow-sm font-helvetica">
            {t("title")}
            <br />
            <span className="text-[#95D5B2]">
              <TypingAnimation
                words={[
                  t("typing.medical_excuse" ),
                  t("typing.covid_test"),
                  t("typing.medical_appointment"),
                  t("typing.medical_prescription"),
                ]}
                className="inline"
                loop={false}
                typeSpeed={75}
                deleteSpeed={60}
                pauseDelay={1000}
              />
            </span>
            <br />
            {t("subtitle")}
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
                        x: 50,
                        filter: "blur(6px)",
                      }}
                      animate={{
                        opacity: isActive ? 1 : 0.65,
                        x: 0,
                        y: localIndex * ITEM_HEIGHT,
                        scale: isActive ? 1.02 : 1,
                        filter: "blur(0px)",
                        zIndex: 100 - distance,
                      }}
                      exit={{
                        opacity: 0,
                        x: -50,
                        filter: "blur(6px)",
                      }}
                      transition={{
                        duration: 0.45,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        opacity: { duration: 0.3 },
                        filter: { duration: 0.3 },
                      }}
                      whileHover={!isActive ? { scale: 1.03, x: 6, transition: { duration: 0.2 } } : {}}
                      whileTap={{ scale: 0.98 }}
                      className="absolute top-0 left-0 w-full cursor-pointer will-change-[transform,opacity] group/card"
                      onClick={() => handleInteraction(globalIndex)}
                    >
                      <Link href={item.href} className="block w-full">
                        <div
                          className={`
                            relative overflow-hidden rounded-2xl py-4 px-5 lg:px-8
                            transition-all duration-300 flex flex-col justify-center min-h-[60px]
                            font-helvetica
                            ${isActive
                              ? "bg-white/30 shadow-[0_25px_50px_rgba(0,0,0,0.5)] ring-0 ring-white/60 border-t border-l border-white/70"
                              : "bg-white/20 backdrop-blur-lg shadow-xl border border-white/20 hover:bg-white/40 hover:border-white/50 hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)] hover:scale-[1.015]"
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
                                shrink-0 flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300
                                ${isActive
                                  ? "bg-white/40 text-white shadow-md"
                                  : "bg-white/10 text-white/90 group-hover/card:bg-white/30 group-hover/card:text-white group-hover/card:shadow-sm"
                                }
                              `}
                            >
                              <item.icon className="w-4 h-4" />
                            </div>
                            <p
                              className={`
                                text-[0.89rem] md:text-base lg:text-lg font-bold text-left tracking-tight transition-all duration-300 line-clamp-2
                                ${isActive
                                  ? "text-white scale-[1.02] translate-x-1"
                                  : "text-white/85 group-hover/card:text-white group-hover/card:translate-x-0.5"
                                }
                              `}
                            >
                              {tc(item.nameKey)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </div>
          <div className="pt-10 flex flex-col items-center gap-4">
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
              <span className="text-white/90 font-bold text-sm lg:text-base tracking-[0.2em] drop-shadow-md group-hover:text-white transition-colors">
                {t("explore_services")}
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
