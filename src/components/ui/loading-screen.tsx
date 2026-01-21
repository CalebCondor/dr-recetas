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
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-linear-to-br from-[#B0E5CC] via-[#DFF6EC] to-[#B0E5CC]"
        >
          {/* Decorative Blur Background Blobs */}
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#167D7F]/15 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#2DD4BF]/15 blur-[120px] rounded-full animate-pulse [animation-delay:1s]" />

          <div className="relative flex flex-col items-center gap-8 w-full max-w-xs md:max-w-sm z-10">
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
                className="h-12 md:h-16 w-auto drop-shadow-[0_10px_30px_rgba(13,75,77,0.2)]"
                priority
              />
            </motion.div>

            {/* Progress Container */}
            <div className="w-full h-2 bg-white/40 backdrop-blur-md rounded-full overflow-hidden relative shadow-inner border border-white/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="absolute inset-y-0 left-0 bg-[#0D4B4D] rounded-full shadow-[0_0_15px_rgba(13,75,77,0.3)]"
              />
            </div>

            {/* Percentage Label */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-[#0D4B4D]/40">
                Página cargando
              </span>
              <span className="text-sm font-black text-[#0D4B4D] tabular-nums">
                {progress}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
