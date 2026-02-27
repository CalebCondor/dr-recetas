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
    href: "/servicios/lab/cbc-diff-lab-45",
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
  const containerRef = useRef<HTMLDivElement>(null);
  // Default true = mobile-first: cards visible on SSR/hydration, no animation flash
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full overflow-hidden m"
      style={{ backgroundColor: "#F2FAEC", minHeight: 460, paddingTop: "80px" }}
    >
      <div className="relative z-10 w-full max-w-400 mx-auto pt-0 md:pt-10 px-6 md:px-12 lg:px-[8%] py-0 flex flex-col md:items-center md:justify-center lg:flex-row lg:items-stretch lg:justify-between gap-8 lg:gap-4">
        {/* ── LEFT: Heading ────────────────────────────────── */}
        <div className="flex-[1.1] text-left md:text-center lg:text-left flex items-center py-6 lg:py-12">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[42px] sm:text-5xl lg:text-[2.8rem] xl:text-[3.9rem] font-bold leading-[1.1] tracking-tight"
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
          className="relative shrink-0 items-center justify-center self-stretch hidden lg:flex z-[-10]"
          style={{ width: 260 }}
        >
          <Image
            src="/hero.png"
            alt="Dr. Recetas"
            width={300}
            height={460}
            className="relative z-[-10] object-contain object-bottom w-full h-full drop-shadow-md"
            style={{ maxHeight: 480 }}
            priority
          />

          {/* Pulsing dot on the phone screen */}
          <motion.div
            className="absolute z-10"
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
        <div className="flex-1 flex flex-col items-start md:items-center lg:items-center justify-center md:justify-center lg:justify-center gap-4 lg:pl-2 pb-10 lg:py-16">

          {consultations.map((item, index) => {
            // Fan out from the phone dot — all start at same origin, spread to final positions
            const yOrigin = (1.5 - index) * 72;

            return (
              <motion.div
                key={`${item.id}-${isMobile}`}
                className="w-full flex justify-center"
                initial={
                  isMobile
                    ? { opacity: 0, y: 20 }
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
                    ? { opacity: 1, y: 0 }
                    : { x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }
                }
                transition={
                  isMobile
                    ? {
                        duration: 0.4,
                        ease: "easeOut",
                        delay: 0.1 + index * 0.15,
                      }
                    : {
                        type: "spring",
                        stiffness: index < 2 ? 55 : 52,
                        damping: 14,
                        delay: 0.3 + index * 0.38,
                      }
                }
              >
                <Link href={item.href} className="block w-[min(90vw,360px)] lg:w-[260px]">
                  <div
                    className="flex items-center justify-center w-full h-11 rounded-full cursor-pointer font-semibold tracking-tight px-6"
                    style={{
                      backgroundColor: "#D9EFB5",
                      color: "#3C5901",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                    }}
                  >
                    {tc(item.nameKey)}
                  </div>
                </Link>
              </motion.div>
            );
          })}

          {/* Explore Services */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.5 }}
            className="mt-4 w-full flex justify-center"
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
              className="flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70 mb-4"
              style={{ color: "#8BAF4A" }}
            >
              {t("explore_services")}
              <motion.svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <path
                  d="M7.5 2v11M2.5 8l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}