"use client";

import { Plus } from "lucide-react";
import Image from "next/image";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { motion } from "motion/react";

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
  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className="group relative overflow-hidden rounded-[2.5rem] bg-white h-[600px] border border-slate-100/10 cursor-pointer"
    >
      {/* Background Image Container */}
      <motion.div
        variants={{
          initial: { scale: 1, opacity: 0 },
          hover: { scale: 1.05, opacity: 1 },
        }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={imageAlt}
          fill
          className="object-cover"
        />
        {/* Dark overlay for text legibility on hover */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
      </motion.div>

      {/* Initial Translucent Overlay */}
      <motion.div
        variants={{
          initial: { opacity: 0.95 },
          hover: { opacity: 0 },
        }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 z-10 bg-white/60 backdrop-blur-md"
      />

      {/* Top Badge */}
      <div className="absolute top-6 right-6 z-20">
        <motion.div
          variants={{
            initial: { opacity: 0, scale: 0.9, y: -10 },
            hover: { opacity: 1, scale: 1, y: 0 },
          }}
          transition={{ delay: 0.1 }}
          className="px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/20 text-white text-[0.65rem] font-extrabold uppercase tracking-[0.15em] shadow-2xl flex items-center gap-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
          Citas médicas
        </motion.div>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-30">
        <div className="flex items-end justify-between gap-6">
          <div className="flex-1 space-y-3">
            <motion.h3
              variants={{
                initial: { y: 0, textShadow: "none", color: "#0D4B4D" },
                hover: {
                  y: -10,
                  textShadow: "0px 4px 10px rgba(0,0,0,0.5)",
                  color: "#ffffff",
                },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="font-bold text-xl leading-tight tracking-tight"
            >
              {title}
            </motion.h3>

            <motion.p
              variants={{
                initial: { opacity: 0, y: 20 },
                hover: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs text-white/80 font-medium line-clamp-3 leading-relaxed"
            >
              {description}
            </motion.p>
          </div>

          {/* Add Button */}
          <motion.button
            variants={{
              initial: { scale: 0.9, opacity: 0.8 },
              hover: { scale: 1, opacity: 1 },
            }}
            className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-teal-800 font-extrabold text-[0.8rem] shadow-xl hover:shadow-2xl transition-all active:scale-95 shrink-0 mb-1"
          >
            <div className="w-5 h-5 rounded-md bg-teal-50 flex items-center justify-center">
              <RiShoppingBag4Fill className="w-3.5 h-3.5 text-teal-600" />
            </div>
            <span>Add</span>
          </motion.button>
        </div>
      </div>

      {/* Selection Glow */}
      <motion.div
        variants={{
          initial: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        className="absolute inset-0 border-[3px] border-white/20 rounded-[2.5rem] pointer-events-none z-40"
      />
    </motion.div>
  );
}
