"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

interface TimelineStep {
  number: number;
  description: string;
  imageSrc: string;
  position: "left" | "right";
}

const stepColors = ["#89A856", "#78944A", "#718E40", "#66813A"];

export function HowItWorks() {
  const t = useTranslations("HomePage.HowItWorks");
  const translatedSteps: TimelineStep[] = [
    {
      number: 1,
      description: t("step1"),
      imageSrc: "/pasos/imagenpas1.png",
      position: "left",
    },
    {
      number: 2,
      description: t("step2"),
      imageSrc: "/pasos/imagenpaso2.png",
      position: "right",
    },
    {
      number: 3,
      description: t("step3"),
      imageSrc: "/pasos/imagenpaso3.png",
      position: "left",
    },
    {
      number: 4,
      description: t("step4"),
      imageSrc: "/pasos/imagenpaso4.png",
      position: "right",
    },
  ];

  const [visibleSteps, setVisibleSteps] = React.useState<number[]>([]);
  const stepRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });

  // Stroke drawn on scroll
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Circles fade in as scroll reaches each one
  const circle1Opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const circle2Opacity = useTransform(scrollYProgress, [0.3, 0.38], [0, 1]);
  const circle3Opacity = useTransform(scrollYProgress, [0.62, 0.70], [0, 1]);
  const circle4Opacity = useTransform(scrollYProgress, [0.9, 0.98], [0, 1]);

  React.useEffect(() => {
    const observers = stepRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSteps((prev) => {
                if (!prev.includes(index)) {
                  return [...prev, index].sort((a, b) => a - b);
                }
                return prev;
              });
            }
          });
        },
        { threshold: 0.3 },
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <section className="relative py-16 lg:py-28 overflow-hidden">
      {/* Background Decorator */}
      <div className="absolute top-0 h-full pointer-events-none -z-10 left-0 right-0 md:left-12 md:right-12 lg:left-[8%] lg:right-[8%]">
        <Image
          src="/how-it-works.png"
          alt=""
          fill
          className="object-cover object-top rounded-[2.5rem] md:rounded-[5rem]"
          priority
        />
      </div>

      <div className="w-full px-8 md:px-16 lg:px-[10%]">
        {/* Header */}
        <div className="mb-16 md:mb-20 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#C1E97C] mb-6 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-lg md:text-xl text-white font-medium max-w-2xl mx-auto">
            {t("subtitle_prefix")}
            <span className="text-[#C1E97C]">{t("subtitle_highlight")}</span>
          </p>
        </div>

        {/* Timeline Container - All sizes */}
        <div ref={timelineRef} className="relative px-0 md:px-4">
          {/* SVG Curved line overlay – desktop only */}
          <div className="hidden md:block absolute inset-0 pointer-events-none">
          </div>

          <div className="space-y-12 md:space-y-0">
            {translatedSteps.map((step, index) => (
              <motion.div
                key={step.number}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={
                  visibleSteps.includes(index)
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 40 }
                }
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`relative flex items-center justify-between last:mb-0 ${
                  index === 1
                    ? "mb-10 md:mb-72 lg:mb-[28rem]"
                    : "mb-10 md:mb-40 lg:mb-52"
                } flex-col md:flex-row ${
                  step.position === "right"
                    ? "md:flex-row-reverse"
                    : "md:flex-row"
                }`}
              >
                {/* Content Card */}
                <div className="w-full md:w-1/2 h-full flex justify-center relative">
                  <div
                    className="w-full md:max-w-sm h-full rounded-2xl md:rounded-[2rem] pt-5 px-6 md:px-8 pb-0 text-white shadow-xl transition-all duration-300 group overflow-visible relative flex flex-col"
                    style={{ backgroundColor: stepColors[index] }}
                  >
                    {/* Step label */}
                    <p className="text-sm md:text-3xl text-[#C1E97C] font-black uppercase tracking-widest opacity-70 mb-1 md:mb-2">
                      Paso {step.number}
                    </p>
                    {/* Description */}
                    <p className="text-base md:text-2xl font-bold leading-tight mb-3 md:mb-4">
                      {step.description}
                    </p>
                    {/* Illustration overflowing below card */}
                    <div className="relative -mx-6 md:-mx-8 flex-1 min-h-44 md:min-h-36 lg:min-h-44">
                      <Image
                        src={step.imageSrc}
                        alt={`Paso ${step.number}`}
                        fill
                        className="object-cover object-top drop-shadow-lg transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>

                {/* Spacer – desktop only */}
                <div className="hidden md:block w-2/5" />

                {/* Spacer – desktop only */}
                <div className="hidden md:block w-2/5" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
