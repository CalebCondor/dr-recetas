"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Component that prefetches important pages in the background
 * to make navigation instant for users
 */
export function PagePrefetcher() {
  const router = useRouter();

  useEffect(() => {
    // Prefetch important pages after initial load
    const prefetchPages = () => {
      // Wait a bit to avoid blocking initial page load
      setTimeout(() => {
        // Prefetch most visited pages
        router.prefetch("/politicas-privacidad");
        router.prefetch("/terminos-condiciones");

        // Prefetch service pages
        router.prefetch("/servicios");
      }, 2000);
    };

    // Only prefetch on client side and when idle
    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(prefetchPages);
      } else {
        prefetchPages();
      }
    }
  }, [router]);

  return null; // This component doesn't render anything
}
