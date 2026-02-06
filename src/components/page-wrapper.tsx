"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Ultra-aggressive scroll reset on navigation
  useEffect(() => {
    if (typeof window !== "undefined") {
      // 1. Disable restoration immediately
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }

      const performReset = () => {
        // 2. Multiple ways to set scroll to 0
        window.scrollTo(0, 0);
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        // 3. Forcefully remove hash WITHOUT triggering scroll
        if (window.location.hash) {
          const url = new URL(window.location.href);
          url.hash = "";
          window.history.replaceState(null, "", url.toString());
        }
      };

      // Stage 4: Immediate execution
      performReset();

      // Stage 5: Chain of deferred executions to beat browser/Next.js native behaviors
      const timers = [
        setTimeout(performReset, 0),
        setTimeout(performReset, 50),
        setTimeout(performReset, 150),
        setTimeout(performReset, 300),
        setTimeout(performReset, 500),
      ];

      return () => timers.forEach(clearTimeout);
    }
  }, [pathname]);

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex flex-col gap-0 overflow-x-hidden"
    >
      {children}
    </motion.main>
  );
}
