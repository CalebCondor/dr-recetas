"use client";

import { RiShoppingBag4Fill } from "react-icons/ri";
import { motion } from "motion/react";
import Image from "next/image";
import { useState, useEffect } from "react";

export interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  isActive?: boolean;
}

export function ServiceCard({
  title,
  description,
  imageSrc,
  imageAlt,
  isActive = false,
}: ServiceCardProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Usamos 1024 para consistencia con lg en Tailwind
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Determine if we should show content ("hover" state)
  // Show if: Hovered OR Active (Center) OR Mobile View (always visible)
  const shouldShowContent = isActive;

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      animate={isActive ? "hover" : "initial"}
      className="group relative overflow-hidden rounded-[2.5rem] bg-slate-900 h-[500px] lg:h-[580px] cursor-pointer shadow-xl"
    >
      {/* Background Image Container */}
      <motion.div
        variants={{
          initial: { scale: 1 },
          hover: { scale: 1.05 },
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        {/* Gradient Overlay matching the image feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90" />
      </motion.div>

      {/* Bottom Content Area */}
      <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10 z-30">
        <div className="flex flex-col gap-4">
          <div className="space-y-3">
            <h3 className="font-black text-white text-3xl lg:text-4xl leading-tight tracking-tight drop-shadow-sm">
              {title}
            </h3>
            <motion.div
              layout="size"
              initial={false}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{
                opacity: {
                  duration: 0.4,
                  delay: isActive ? 0.1 : 0,
                },
                layout: {
                  duration: 0.6,
                  ease: [0.32, 0.72, 0, 1],
                },
              }}
              className="overflow-hidden"
            >
              <div className="pt-3 pb-1">
                <p className="text-sm lg:text-base font-medium leading-relaxed text-white/90">
                  {description}
                </p>
              </div>
            </motion.div>
          </div>

          <div className="pt-2">
            <button className="group/btn relative w-full flex items-center justify-between px-6 py-4 rounded-3xl font-bold text-sm transition-colors duration-300 shadow-lg bg-white/20 backdrop-blur-xl text-white border border-white/20 hover:bg-white/30">
              <span className="relative z-10">Reservar ahora</span>
              <div className="w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-white/20">
                <RiShoppingBag4Fill className="w-4 h-4 text-white" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Subtle border for active card like image highlight */}
      {isActive && (
        <div className="absolute inset-0 rounded-[2.5rem] border-2 border-white/5 pointer-events-none z-40" />
      )}
    </motion.div>
  );
}
