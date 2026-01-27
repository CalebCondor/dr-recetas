"use client";

import { useEffect, useState } from "react";

/**
 * Hook to detect if component is mounted on client side
 * Useful for preventing hydration mismatches with components that use useId()
 */
export function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return isMounted;
}
