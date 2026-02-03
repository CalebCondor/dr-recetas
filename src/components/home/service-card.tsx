"use client";

import { RiShoppingBag4Fill } from "react-icons/ri";
import { motion, type Variants } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  isActive?: boolean;
  href?: string;
}

export function ServiceCard({
  title,
  description,
  imageSrc,
  imageAlt,
  isActive = false,
  href = "#",
}: ServiceCardProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const shouldShowContent = isMobile ? isActive : isHovered;

  const cardVariants: Variants = {
    initial: { y: 0, scale: 1 },
    hover: {
      y: -15,
      scale: 1.02,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
  };

  const overlayVariants: Variants = {
    initial: { opacity: 0.3, backgroundColor: "rgba(0,0,0,0)" },
    hover: {
      opacity: 1,
      backgroundColor: "rgba(0,0,0,0.35)",
      transition: { duration: 0.5 },
    },
  };

  const imageVariants: Variants = {
    initial: { scale: 1, filter: "brightness(1) contrast(1)" },
    hover: {
      scale: 1.15,
      filter: "brightness(0.85) contrast(1.05)",
      transition: { duration: 0.8 },
    },
  };

  const contentVariants: Variants = {
    initial: { opacity: 0, y: 30 },
    hover: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const childVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    hover: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      animate={shouldShowContent ? "hover" : "initial"}
      className="group relative overflow-hidden rounded-[2.5rem] h-[520px] lg:h-[620px] cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={href} className="block h-full">
        {/* Background Image Container */}
        <motion.div variants={imageVariants} className="absolute inset-0 z-0">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>

        {/* Dynamic Dark Overlay with Blur */}
        <motion.div
          variants={overlayVariants}
          className="absolute inset-0 z-10"
        />

        {/* Aqua Glass Shine Effect (iPhone Style) */}
        <div
          className="absolute inset-0 z-15 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2.5rem]"
          style={{
            boxShadow:
              "inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -1px 20px rgba(0,0,0,0.1)",
          }}
        />

        {/* Initial View - Disappears on hover/focus */}
        <motion.div
          animate={{
            opacity: shouldShowContent ? 0 : 1,
            y: shouldShowContent ? -20 : 0,
          }}
          transition={{ duration: 0.4 }}
          className="absolute inset-x-0 bottom-0 p-8 lg:p-12 z-20 pointer-events-none"
        >
          <h3 className="font-black text-white text-3xl lg:text-4xl leading-tight tracking-tight drop-shadow-2xl">
            {title}
          </h3>
        </motion.div>

        {/* Hover/Focus Content - Emerges from bottom */}
        <motion.div
          variants={contentVariants}
          initial="initial"
          animate={shouldShowContent ? "hover" : "initial"}
          className="absolute inset-0 z-30 flex flex-col justify-end p-8 lg:p-12 gap-6 rounded-[2.5rem]"
        >
          <div className="space-y-6">
            <motion.h3
              variants={childVariants}
              className="font-black text-white text-4xl lg:text-5xl leading-[0.95] tracking-tighter"
            >
              {title}
            </motion.h3>

            <motion.p
              variants={childVariants}
              className="text-base lg:text-lg font-medium leading-relaxed text-white/90 max-w-[95%] line-clamp-4"
            >
              {description}
            </motion.p>

            <motion.div variants={childVariants}>
              <div className="pt-2">
                <div className="group/btn relative w-full flex items-center justify-between px-6 py-4 rounded-3xl font-bold text-sm transition-colors duration-300 shadow-lg bg-white/10 text-white border border-white/10">
                  <span className="relative z-10">Reservar ahora</span>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-white/20">
                    <RiShoppingBag4Fill className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Active state highlight - Refined premium version */}
        {isActive && (
          <div className="absolute inset-0 rounded-[2.5rem] ring-1.5 ring-white/25 pointer-events-none z-40 transition-all duration-500 shadow-[0_0_40px_rgba(45,212,191,0.15),inset_0_0_20px_rgba(255,255,255,0.05)]" />
        )}
      </Link>
    </motion.div>
  );
}
