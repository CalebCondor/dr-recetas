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

  // Animation values for the SVG connector
  const maskHeight = useTransform(scrollYProgress, [0, 1], [0, 550]);
  const circle1Opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const circle2Opacity = useTransform(scrollYProgress, [0.3, 0.38], [0, 1]);
  const circle3Opacity = useTransform(scrollYProgress, [0.62, 0.7], [0, 1]);
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
        <div ref={timelineRef} className="relative px-0 md:px-10">
          {/* SVG Animated Connector (Desktop only) */}
          <div className="absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-48 hidden md:block z-0 pointer-events-none">
            <svg
              viewBox="0 0 262 460"
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <mask id="path-mask">
                  <motion.rect
                    x="-100"
                    y="-50"
                    width="500"
                    height={maskHeight}
                    fill="white"
                  />
                </mask>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Base Layer (Faded track) */}
              <g opacity="0.05">
                <path
                  d="M259.491 128.591V54.5194C259.491 36.1418 244.593 21.2437 226.215 21.2437H71.1164V20.1157H226.215C245.216 20.1157 260.619 35.5188 260.619 54.5194V128.591C260.619 147.591 245.216 162.994 226.215 162.994H34.4038C15.9026 162.994 0.95383 178.086 1.12958 196.586L1.80263 267.438C1.97603 285.692 16.8225 300.398 35.0769 300.398H227.211C246.338 300.398 261.793 315.999 261.613 335.125L260.934 407.34C260.757 426.214 245.406 441.42 226.532 441.42H124.32V440.292H226.532C244.787 440.292 259.634 425.584 259.806 407.33L260.485 335.115C260.659 316.615 245.711 301.526 227.211 301.526H35.0769C16.2037 301.526 0.853913 286.321 0.674635 267.449L0.00158578 196.597C-0.180111 177.469 15.2754 161.866 34.4038 161.866H226.215C244.593 161.866 259.491 146.968 259.491 128.591Z"
                  fill="#C1E97C"
                />
                <circle cx="126.764" cy="20.4918" r="20.4918" fill="#C1E97C" />
                <circle cx="126.764" cy="162.995" r="20.4918" fill="#C1E97C" />
                <circle cx="126.764" cy="300.985" r="20.4918" fill="#C1E97C" />
                <circle cx="126.764" cy="438.976" r="20.4918" fill="#C1E97C" />
              </g>

              {/* Painted Layer (Masked and Glowing) */}
              <g mask="url(#path-mask)" filter="url(#glow)">
                <path
                  d="M259.491 128.591V54.5194C259.491 36.1418 244.593 21.2437 226.215 21.2437H71.1164V20.1157H226.215C245.216 20.1157 260.619 35.5188 260.619 54.5194V128.591C260.619 147.591 245.216 162.994 226.215 162.994H34.4038C15.9026 162.994 0.95383 178.086 1.12958 196.586L1.80263 267.438C1.97603 285.692 16.8225 300.398 35.0769 300.398H227.211C246.338 300.398 261.793 315.999 261.613 335.125L260.934 407.34C260.757 426.214 245.406 441.42 226.532 441.42H124.32V440.292H226.532C244.787 440.292 259.634 425.584 259.806 407.33L260.485 335.115C260.659 316.615 245.711 301.526 227.211 301.526H35.0769C16.2037 301.526 0.853913 286.321 0.674635 267.449L0.00158578 196.597C-0.180111 177.469 15.2754 161.866 34.4038 161.866H226.215C244.593 161.866 259.491 146.968 259.491 128.591Z"
                  fill="#C1E97C"
                />

                {/* Step Circles with individual scroll-triggered logic if needed, but mask is fine */}
                <circle cx="126.764" cy="20.4918" r="20.4918" fill="#C1E97C" />
                <circle cx="126.764" cy="162.995" r="20.4918" fill="#C1E97C" />
                <circle cx="126.764" cy="300.985" r="20.4918" fill="#C1E97C" />
                <circle cx="126.764" cy="438.976" r="20.4918" fill="#C1E97C" />

                {/* Numbers inside circles */}
                <path d="M126.564 15.5933V14.4382H129.109V27.0717H126.51V18.8961C126.311 18.9502 126.095 18.9682 125.824 18.9682H123.712V16.8205H125.589C126.311 16.8205 126.564 16.3333 126.564 15.5933Z" fill="#2B3E39" />
                <path d="M122.085 169.575V168.293L126.994 164.034C128.167 163.023 129.142 162.049 129.142 160.677C129.142 159.089 128.059 158.186 126.38 158.186C124.756 158.186 123.673 159.269 123.673 161.002V161.236H122.157V160.912C122.157 158.529 123.836 156.833 126.38 156.833C129.106 156.833 130.694 158.331 130.694 160.605C130.694 162.5 129.467 163.691 127.969 164.972L124.179 168.185H130.784V169.575H122.085Z" fill="#2B3E39" />
                <path d="M128.889 300.58C130.044 300.797 131.253 301.717 131.253 303.648C131.253 305.796 129.448 307.258 126.705 307.258C123.962 307.258 122.193 305.76 122.193 303.251H123.691C123.709 304.911 125.009 305.904 126.795 305.904C128.438 305.904 129.701 304.984 129.701 303.54C129.701 302.222 128.618 301.374 126.651 301.374H125.568V300.057H126.561C128.438 300.057 129.376 299.118 129.376 297.837C129.376 296.555 128.221 295.761 126.705 295.761C125.117 295.761 123.962 296.718 123.944 298.162H122.446C122.464 295.942 124.197 294.408 126.687 294.408C129.286 294.408 130.928 295.761 130.928 297.746C130.928 299.335 130.098 300.255 128.889 300.58Z" fill="#2B3E39" />
                <path d="M121.923 442.054V440.701L128.366 432.507H130.062V440.665H132.102V442.054H130.062V445.14H128.546V442.054H121.923ZM128.546 434.366L123.619 440.665H128.546V434.366Z" fill="#2B3E39" />
              </g>
            </svg>
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
                className={`relative flex items-center justify-between last:mb-0 ${index === 1

                  } flex-col md:flex-row ${step.position === "right"
                    ? "md:flex-row-reverse"
                    : "md:flex-row"
                  }`}
              >
                {/* Content Card */}
                <div className="w-full md:w-1/2 h-auto flex justify-center relative -mt-6 md:-mt-10">
                  <div
                    className="w-full md:max-w-sm h-auto rounded-2xl md:rounded-[2rem] pt-5 px-6 md:px-8 pb-0 text-white shadow-xl transition-all duration-300 group overflow-visible relative flex flex-col"
                    style={{ backgroundColor: stepColors[index] }}
                  >
                    {/* Step label */}
                    <p className="text-2xl md:text-3xl text-[#C1E97C] font-black uppercase tracking-widest opacity-70 mb-1 md:mb-2">
                      Paso {step.number}
                    </p>
                    {/* Description */}
                    <p className="text-xl md:text-2xl font-bold leading-tight mb-3 md:mb-4">
                      {step.description}
                    </p>
                    {/* Illustration overflowing below card */}
                    <div className="relative -mx-6 md:-mx-8 flex-1">
                      <Image
                        src={step.imageSrc}
                        alt={`Paso ${step.number}`}
                        width={500}
                        height={500}
                        layout="intrinsic"
                        className="object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>

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
