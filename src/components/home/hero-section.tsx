"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { useTranslations } from "next-intl";

const consultations = [
  {
    id: 1,
    nameKey: "prescription_refill",
    href: "/servicios/lab/receta-de-medicamentos-o-refill-25",
  },
  {
    id: 2,
    nameKey: "immediate_evaluation",
    href: "/servicios/citas-medicas/evaluacin-mdica-inmediata-38",
  },
  {
    id: 3,
    nameKey: "cbc_diff",
    href: "/servicios/lab/cbc-diff-lab",
  },
  {
    id: 4,
    nameKey: "follow_up",
    href: "/servicios/citas-medicas/cita-de-seguimiento-31",
  },
];

export default function Hero() {
  const t = useTranslations("HomePage.Hero");
  const tc = useTranslations("HomePage.Consultations");
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  // Default true = mobile-first: cards visible on SSR/hydration, no animation flash
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Auto-cycle active card
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % consultations.length);
    }, 2200);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full overflow-hidden m"
      style={{ backgroundColor: "#F2FAEC", minHeight: 460, paddingTop: "80px" }}
    >
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-[8%] py-0 flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-12">
        {/* ── LEFT: Heading ────────────────────────────────── */}
        <div className="flex-[1.1] text-left flex items-center py-6 lg:py-16">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[40px]  sm:text-5xl lg:text-[2.8rem] xl:text-[3.9rem] font-bold leading-[1.1] tracking-tight"
            style={{ color: "#142925" }}
          >
            {t("title")}
            <br />
            <span style={{ color: "#8BAF4A" }}>
              <TypingAnimation
                words={[
                  t("typing.medical_excuse"),
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
          </motion.h1>
        </div>

        {/* ── CENTER: Woman with phone ──────────────────────── */}
        <div
          className="relative shrink-0 items-end justify-center self-stretch hidden lg:flex"
          style={{ width: 300 }}
        >
          <Image
            src="/hero.png"
            alt="Dr. Recetas"
            width={300}
            height={460}
            className="relative z-10 object-contain object-bottom w-full h-full drop-shadow-md"
            style={{ maxHeight: 480 }}
            priority
          />

          {/* Pulsing dot on the phone screen */}
          <motion.div
            className="absolute z-20"
            style={{ bottom: "36%", right: "22%" }}
            animate={{ scale: [1, 2.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className="w-5 h-5 rounded-full"
              style={{
                backgroundColor: "#8BAF4A",
                boxShadow: "0 0 24px 10px rgba(139,175,74,0.8)",
              }}
            />
          </motion.div>
        </div>

        {/* ── RIGHT: Cards flying out from the phone ────────── */}
        <div className="flex-1 flex flex-col items-center lg:items-start justify-start lg:justify-center gap-4 lg:pl-10 pb-10 lg:py-16">
          {consultations.map((item, index) => {
            const isActive = index === activeIndex;
            // Fan out from the phone dot — all start at same origin, spread to final positions
            const yOrigin = (1.5 - index) * 72;

            return (
              <motion.div
                key={item.id}
                className="w-full"
                initial={
                  isMobile
                    ? false
                    : {
                        x: -520,
                        y: yOrigin,
                        opacity: 0,
                        scale: 0.05,
                        rotate: -18,
                      }
                }
                animate={
                  isMobile
                    ? {}
                    : { x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }
                }
                transition={
                  isMobile
                    ? {}
                    : {
                        type: "spring",
                        stiffness: index < 2 ? 55 : 52,
                        damping: 14,
                        delay: 0.3 + index * 0.38,
                      }
                }
              >
                <Link
                  href={item.href}
                  className="block w-full"
                  onClick={() => setActiveIndex(index)}
                >
                  <motion.div
                    animate={{
                      scale: isActive ? 1.03 : 1,
                      boxShadow: isActive
                        ? "0 4px 18px rgba(139,175,74,0.35)"
                        : "0 1px 4px rgba(0,0,0,0.06)",
                    }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="flex items-center justify-center w-full lg:w-65 h-11 rounded-full cursor-pointer text-sm font-semibold tracking-tight"
                    style={{
                      backgroundColor: isActive ? "#8BAF4A" : "#D9EFB5",
                      color: isActive ? "#ffffff" : "#3C5901",
                    }}
                  >
                    {tc(item.nameKey)}
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}

          {/* Explore Services */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.5 }}
            className="mt-1"
          >
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("servicios");
                if (el) {
                  const headerOffset = window.innerWidth < 768 ? 90 : 120;
                  window.scrollTo({
                    top:
                      el.getBoundingClientRect().top +
                      window.pageYOffset -
                      headerOffset,
                    behavior: "smooth",
                  });
                }
              }}
              className="flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ color: "#8BAF4A" }}
            >
              {t("explore_services")}
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 2v11M2.5 8l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
