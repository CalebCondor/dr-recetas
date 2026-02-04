"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Force scroll to top and clear hash on load
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Disable browser scroll restoration to ensure we always start at top
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }

      const resetScroll = () => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        // Forcefully remove hash from URL without triggering a scroll
        if (window.location.hash) {
          window.history.replaceState(
            null,
            "",
            window.location.pathname + window.location.search,
          );
        }
      };

      // Immediate reset
      resetScroll();

      // Multiple deferred attempts to beat browser's native behaviors and other scripts
      const timers = [
        setTimeout(resetScroll, 10),
        setTimeout(resetScroll, 50),
        setTimeout(resetScroll, 100),
      ];

      return () => timers.forEach(clearTimeout);
    }
  }, [pathname]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex flex-col gap-0 overflow-x-hidden"
    >
      {children}
    </motion.main>
  );
}
