"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface TimelineStep {
  number: number;
  description: string;
  imageSrc: string;
  position: "left" | "right";
}

const steps: TimelineStep[] = [
  {
    number: 1,
    description:
      "Complete el registro, escoja el servicio médico o laboratorio deseado.",
    imageSrc: "/pasos/layer_1.svg",
    position: "left",
  },
  {
    number: 2,
    description: "Pague con Tarjeta de Crédito o ATH MOVIL.",
    imageSrc: "/pasos/layer_4.svg",
    position: "right",
  },
  {
    number: 3,
    description:
      "Si es un laboratorio escogido le llega inmediatamente a su email.",
    imageSrc: "/pasos/layer_2.svg",
    position: "left",
  },
  {
    number: 4,
    description:
      "Si es una cita médica un doctor se comunicará con usted durante el día. Si necesita una cita más rápida por favor llamarnos a nuestro número (787) 710-7426.",
    imageSrc: "/pasos/layer_3.svg",
    position: "right",
  },
];

const stepColors = [
  "#89CBB9", // Paso 1 (Lighter)
  "#63B1A5", // Paso 2
  "#50A49C", // Paso 3
  "#3C9792", // Paso 4 (Darker)
];

export function HowItWorks() {
  const [visibleSteps, setVisibleSteps] = React.useState<number[]>([]);
  const stepRefs = React.useRef<(HTMLDivElement | null)[]>([]);

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

  const maxVisibleStep =
    visibleSteps.length > 0 ? Math.max(...visibleSteps) : -1;

  return (
    <section className="relative py-16 lg:py-28 overflow-hidden">
      {/* Background Decorator */}
      <div className="absolute inset-x-0 top-0 h-full w-full pointer-events-none -z-10 px-6 md:px-12 lg:px-[8%]">
        <div
          className="w-full h-full rounded-[2.5rem] md:rounded-[5rem]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(137, 203, 185, 0.18) 0%, rgba(137, 203, 185, 0) 60%)",
          }}
        />
      </div>

      <div className="w-full px-8 md:px-16 lg:px-[10%]">
        {/* Header */}
        <div className="mb-16 md:mb-20 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0D4B4D] mb-6 tracking-tight">
            ¿Cómo funciona?
          </h2>
          <p className="text-lg md:text-xl text-[#0D4B4D]/70 font-medium max-w-2xl mx-auto">
            Sigue estos pasos para obtener la receta deseada
          </p>
        </div>

        {/* Timeline Container - Desktop */}
        <div className="relative hidden md:block px-4">
          {/* Animated Vertical Line with Chain Effect */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 overflow-hidden">
            {/* Background line */}
            <div className="absolute inset-0 bg-linear-to-b from-teal-200/40 to-teal-300/40 rounded-full" />

            {/* Animated progress line */}
            <motion.div
              className="absolute top-0 left-0 right-0 bg-linear-to-b from-teal-500 via-teal-600 to-teal-500 rounded-full shadow-[0_0_20px_rgba(20,184,166,0.4)]"
              initial={{ height: "0%" }}
              animate={{
                height:
                  maxVisibleStep >= 0 ? `${(maxVisibleStep + 1) * 25}%` : "0%",
              }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
            >
              {/* Chain link pattern */}
              <div className="absolute inset-0 opacity-30">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute left-1/2 -translate-x-1/2 w-3 h-3 border-2 border-white rounded-full"
                    style={{ top: `${i * 12.5}%` }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Animated arrow at the end */}
            <AnimatePresence>
              {maxVisibleStep >= 0 && (
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    top: `${(maxVisibleStep + 1) * 25}%`,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1,
                    ease: "easeOut",
                  }}
                >
                  <motion.svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    className="text-teal-500 drop-shadow-lg"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <path
                      d="M10 0L0 10L10 20L20 10L10 0Z"
                      fill="currentColor"
                    />
                  </motion.svg>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-16 lg:space-y-0 text-[#0D4B4D]">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  visibleSteps.includes(index)
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 50 }
                }
                transition={{
                  duration: 0.7,
                  ease: "easeOut",
                }}
                className={`relative flex items-center justify-between md:mb-20 lg:mb-24 last:mb-0 ${
                  step.position === "right"
                    ? "md:flex-row-reverse"
                    : "md:flex-row"
                }`}
              >
                {/* Content Card */}
                <div className="w-[42%] lg:w-[40%] flex justify-center px-2">
                  <div
                    className="w-full rounded-[2rem] p-4 lg:p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 group"
                    style={{ backgroundColor: stepColors[index] }}
                  >
                    <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-5">
                      {/* Illustration */}
                      <div className="relative w-20 h-20 lg:w-32 lg:h-32 shrink-0 brightness-110">
                        <Image
                          src={step.imageSrc}
                          alt={`Paso ${step.number}`}
                          fill
                          className="object-contain transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      {/* Text content */}
                      <div className="flex-1 text-center lg:text-left">
                        <p className="text-sm lg:text-lg font-bold leading-tight">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Number Circle (Desktop) */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={
                    visibleSteps.includes(index) ? { scale: 1 } : { scale: 0 }
                  }
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                >
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full text-white text-2xl font-extrabold shadow-lg ring-4 ring-white"
                    style={{ backgroundColor: stepColors[index] }}
                  >
                    {step.number}
                  </div>
                </motion.div>

                {/* Spacer for desktop layout */}
                <div className="w-[42%] lg:w-[40%]" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Layout - Vertical Stack */}
        <div className="md:hidden space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="flex flex-col items-center"
            >
              {/* Content Card */}
              <motion.div
                className="w-full rounded-[2.5rem] p-8 text-white shadow-lg relative overflow-hidden"
                style={{ backgroundColor: stepColors[index] }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                {/* Number Badge - Now inside the card at top-left */}
                <motion.div
                  className="absolute top-6 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md text-lg font-extrabold z-10"
                  style={{ color: stepColors[index] }}
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.08 + 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                >
                  {step.number}
                </motion.div>

                <div className="flex flex-col items-center text-center">
                  <div className="relative w-32 h-32 mb-6 brightness-110">
                    <Image
                      src={step.imageSrc}
                      alt={`Paso ${step.number}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <motion.p
                    className="text-lg font-bold leading-tight"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2,
                    }}
                  >
                    {step.description}
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
