"use client";

import { useEffect } from "react";
import { motion } from "motion/react";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  // Force scroll to top and clear hash on load
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
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
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.8,
        delay: 0.2,
        ease: [0.16, 1, 0.3, 1], // Custom premium easeOut
      }}
      className="flex flex-col gap-0 overflow-x-hidden"
    >
      {children}
    </motion.main>
  );
}
