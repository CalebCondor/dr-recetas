"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function GlobalPreloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Marcamos como montado para permitir la hidratación del cliente sin renders en cascada síncronos
    const mountTimeout = setTimeout(() => setIsMounted(true), 0);

    // Al montar (en cada F5), bloqueamos el scroll y activamos la lógica de carga
    document.documentElement.classList.add("loading-locked");

    const handleLoad = () => {
      // Reducimos un poco el tiempo artificial para que se sienta más rápido pero aún elegante
      setTimeout(() => {
        setIsLoading(false);
        document.documentElement.classList.remove("loading-locked");
      }, 700);
    };

    let fallbackTimeout: ReturnType<typeof setTimeout> | undefined;

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      fallbackTimeout = setTimeout(handleLoad, 4000);
    }

    return () => {
      clearTimeout(mountTimeout);
      window.removeEventListener("load", handleLoad);
      if (fallbackTimeout) clearTimeout(fallbackTimeout);
    };
  }, []);

  // No usamos el return null para evitar el pantallazo blanco (SSR)
  return (
    <div
      id="global-preloader"
      className={cn(
        "fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0D1117] transition-opacity duration-700",
        !isLoading && "opacity-0 pointer-events-none",
      )}
    >
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] },
            }}
            className="relative flex flex-col items-center"
          >
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={
                isMounted
                  ? {
                      scale: [0.8, 1.05, 1],
                      opacity: 1,
                    }
                  : {}
              }
              transition={{
                duration: 1,
                times: [0, 0.6, 1],
                ease: "easeOut",
              }}
              className="mb-10 text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
                Dr.<span className="text-[#95D5B2]">Recetas</span>
              </h2>
              <p className="text-[#95D5B2]/60 text-[10px] uppercase tracking-[0.4em] mt-2 font-medium">
                Cuidando tu salud digital
              </p>
            </motion.div>

            {/* Premium Loader Bar */}
            <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden relative border border-white/5">
              <motion.div
                initial={{ x: "-100%" }}
                animate={isMounted ? { x: "100%" } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-linear-to-r from-transparent via-[#95D5B2] to-transparent"
              />
            </div>

            {/* Subtle Loading Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isMounted ? { opacity: [0, 1, 0] } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                times: [0, 0.5, 1],
              }}
              className="mt-6 text-white/30 text-[9px] uppercase tracking-[0.2em] font-light"
            >
              Cargando Servicios Médicos
            </motion.div>

            {/* Glassmorphic Background Circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#0D4B4D]/10 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#95D5B2]/5 blur-[100px] rounded-full -z-10" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
