"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Optimized scroll reset on navigation
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }

      const performReset = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        if (window.location.hash) {
          const url = new URL(window.location.href);
          url.hash = "";
          window.history.replaceState(null, "", url.toString());
        }
      };

      performReset();
      // Only two follow-ups to catch delayed renders, avoiding jank
      const timers = [
        setTimeout(performReset, 100),
        setTimeout(performReset, 300),
      ];

      return () => timers.forEach(clearTimeout);
    }
  }, [pathname]);

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.05,
        ease: [0.33, 1, 0.68, 1], // Very smooth out transition
      }}
      style={{ willChange: "transform, opacity" }}
      className="flex flex-col gap-0 overflow-x-hidden"
    >
      {children}
    </motion.main>
  );
}
