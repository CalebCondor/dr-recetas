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

      window.scrollTo({ top: 0, behavior: "instant" });

      if (window.location.hash) {
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search,
        );
      }
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
