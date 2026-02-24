"use client";

import { useRef } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: 640, paddingTop: "90px", backgroundColor: "#142925" }}
    >
      {/* ── Background image layer (desktop only) ── */}
      <div className="hidden lg:block absolute inset-0 z-0">
        <Image
          src="/hero/fondo_hero.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay: left dark gradient for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(10,30,20,0.55) 0%, rgba(10,30,20,0.30) 50%, rgba(10,30,20,0.0) 100%)",
          }}
        />
      </div>

      {/* ── Overlay image (desktop only) ── */}
      <div className="hidden lg:block absolute inset-0 z-[1] pointer-events-none">
        <Image
          src="/hero/hero_fondo.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-[8%] py-0 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 min-h-[440px]">
        {/* ── LEFT: Heading ── */}
        <div className="flex-[1.2] text-left flex items-center py-10 lg:py-20">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[44px] sm:text-5xl lg:text-[2.8rem] xl:text-[3.9rem] font-bold leading-[1.12] tracking-tight"
            style={{ color: "#ffffff" }}
          >
            {t("title")}
            <br />
            <span style={{ color: "#D3EFA0" }}>
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

        {/* ── RIGHT: Service cards ── */}
        <div className="flex-1 flex flex-col items-center lg:items-end justify-center gap-3 pb-10 lg:py-20 w-full lg:max-w-xs">
          {consultations.map((item, index) => (
            <motion.div
              key={item.id}
              className="w-full"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: 0.15 + index * 0.12,
              }}
            >
              <Link href={item.href} className="block w-full">
                <div
                  className="flex items-center justify-center w-full h-11 rounded-full text-sm font-semibold tracking-tight"
                  style={{
                    backgroundColor: "rgba(217,239,181,0.92)",
                    color: "#2d4a00",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {tc(item.nameKey)}
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Explore Services */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="mt-1 w-full flex lg:justify-end justify-center"
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
              style={{ color: "#8FD44A" }}
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
