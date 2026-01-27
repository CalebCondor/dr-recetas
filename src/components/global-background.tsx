"use client";

import { usePathname } from "next/navigation";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export function GlobalBackground() {
  const pathname = usePathname();

  // Hide on service category pages and product detail pages
  // Path examples: /servicios/slug or /servicios/slug/itemSlug
  const isServicePage = pathname?.startsWith("/servicios/");
  const isLegalPage =
    pathname?.startsWith("/politicas-privacidad") ||
    pathname?.startsWith("/terminos-condiciones");

  if (isServicePage || isLegalPage) {
    return null;
  }

  return (
    <div className="absolute top-0 left-0 w-full h-[1400px] -z-10 overflow-hidden pointer-events-none hidden lg:block">
      <div className="relative w-full h-full">
        <BackgroundGradientAnimation containerClassName="h-full w-full blur-[100px]" />
        {/* Extended Bottom Fade to integrate with sections below */}
        <div className="absolute inset-x-0 bottom-0 h-[30%] bg-linear-to-t from-white via-white/50 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
