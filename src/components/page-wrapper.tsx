"use client";

import { useEffect } from "react";
import { motion } from "motion/react";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  // Force scroll to top and clear hash on load
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Disable browser scroll restoration to ensure we always start at top
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }

      // Use setTimeout to ensure this runs after browser's native scroll restoration
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);

        if (window.location.hash) {
          window.history.replaceState(
            null,
            "",
            window.location.pathname + window.location.search,
          );
        }
      }, 10);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.2, // Slightly faster for better perceived performance
        delay: 0.1,
        ease: [0.16, 1, 0.3, 1], // Custom premium easeOut
      }}
      className="flex flex-col gap-0 overflow-x-hidden"
    >
      {children}
    </motion.main>
  );
}
