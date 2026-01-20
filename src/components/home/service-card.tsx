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
}

export function ServiceCard({
  title,
  description,
  imageSrc,
  imageAlt,
}: ServiceCardProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      whileInView="view"
      viewport={{ once: false, amount: 0.3 }}
      className="group relative overflow-hidden rounded-[2.5rem] bg-slate-900 h-[600px] border border-white/10 cursor-pointer shadow-xl transition-shadow duration-500 hover:shadow-2xl"
    >
      {/* Background Image Container - Visible from start */}
      <motion.div
        variants={{
          initial: { scale: 1 },
          hover: { scale: 1.08 },
          view: { scale: 1 },
        }}
        transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={imageAlt}
          fill
          className="object-cover"
        />
        {/* Constant Dark overlay for visibility */}
        <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent opacity-85" />
      </motion.div>

      {/* Top Badge - Citas médicas */}
      <div className="absolute top-6 right-6 z-20">
        <motion.div
          variants={{
            initial: { opacity: 0.8, scale: 0.95 },
            hover: { opacity: 1, scale: 1 },
            view: { opacity: 1, scale: 1 },
          }}
          className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[0.65rem] font-extrabold uppercase tracking-[0.15em] flex items-center gap-2"
        >
          <div className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(45,212,191,0.6)]" />
          Citas médicas
        </motion.div>
      </div>

      {/* Bottom Content Area */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-30">
        <div className="flex items-end justify-between gap-6">
          <div className="flex-1 space-y-0">
            {/* Title - Always White for clarity */}
            <motion.h3
              variants={{
                initial: { y: 0 },
                hover: { y: -5 },
                view: isMobile ? { y: -5 } : { y: 0 },
              }}
              transition={{ duration: 0.4 }}
              className="font-extrabold text-white text-2xl leading-tight tracking-tight drop-shadow-lg"
            >
              {title}
            </motion.h3>

            {/* Description - Animates on Hover (Desktop) or View (Mobile) */}
            <motion.p
              variants={{
                initial: { opacity: 0, height: 0, marginTop: 0 },
                hover: { opacity: 1, height: "auto", marginTop: 12 },
                view: isMobile
                  ? {
                      opacity: 1,
                      height: "auto",
                      marginTop: 12,
                      transition: { delay: 0.2, duration: 0.5 },
                    }
                  : { opacity: 0, height: 0, marginTop: 0 },
              }}
              className="text-xs text-white/70 font-medium line-clamp-3 leading-relaxed overflow-hidden"
            >
              {description}
            </motion.p>
          </div>

          {/* Add Button */}
          <motion.button
            variants={{
              initial: { scale: 0.9, opacity: 0.9 },
              hover: { scale: 1, opacity: 1 },
              view: { scale: 1, opacity: 1 },
            }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-teal-900 font-extrabold text-[0.8rem] shadow-xl group-hover:bg-teal-50 transition-colors shrink-0 mb-1"
          >
            <div className="w-5 h-5 rounded-md bg-teal-50 flex items-center justify-center">
              <RiShoppingBag4Fill className="w-3.5 h-3.5 text-teal-600" />
            </div>
            <span>Add</span>
          </motion.button>
        </div>
      </div>

      {/* Inner Border Glow */}
      <motion.div
        variants={{
          initial: { opacity: 0 },
          hover: { opacity: 1 },
          view: isMobile ? { opacity: 0.3 } : { opacity: 0 },
        }}
        className="absolute inset-0 border-2 border-white/20 rounded-[2.5rem] pointer-events-none z-40"
      />
    </motion.div>
  );
}
