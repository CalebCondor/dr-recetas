"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    // Fade out after a short delay once 100% is reached
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white"
        >
          <div className="relative flex flex-col items-center gap-8 w-full max-w-xs md:max-w-sm">
            {/* Logo or Branded Element */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <Image
                src="/logo_footer.png"
                alt="Dr. Recetas"
                width={200}
                height={60}
                className="h-12 md:h-16 w-auto"
                priority
              />
            </motion.div>

            {/* Progress Container */}
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden relative shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="absolute inset-y-0 left-0 bg-linear-to-r from-[#B0E5CC] to-[#167D7F] rounded-full shadow-[0_0_15px_rgba(22,125,127,0.3)]"
              />
            </div>

            {/* Percentage Label */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400">
                Página cargando
              </span>
              <span className="text-sm font-black text-teal-800 tabular-nums">
                {progress}%
              </span>
            </div>
          </div>

          {/* Subtle Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-50 blur-[120px] rounded-full -z-10 opacity-50" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
