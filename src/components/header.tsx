"use client";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full absolute top-0 left-0 z-50">
      <div className="w-full px-6 md:px-12 lg:px-[8%] py-4 lg:py-10 flex items-center justify-between">
        <img src="/logo.png" alt="Dr. Recetas" className="h-8 lg:h-10" />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          {["Servicios", "Descuentos", "Nosotros", "Membresías"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-slate-500 hover:text-slate-800 font-medium transition-colors text-sm"
            >
              {item}
            </a>
          ))}
          <Button className="px-8 py-3 rounded-full bg-white text-slate-500 font-semibold border-none shadow-sm hover:bg-slate-50 hover:shadow-md transition-all text-sm h-auto">
            Iniciar sesión
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <button className="bg-white p-2 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center justify-center w-11 h-11">
            <Image
              src="/store.svg"
              alt="Store"
              width={28}
              height={28}
              className="w-7 h-7 object-contain"
            />
          </button>
          <button
            className="bg-white p-2 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center justify-center w-11 h-11"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X size={24} className="text-[#0D4B4D]" />
            ) : (
              <Image
                src="/hamburguer.svg"
                alt="Menu"
                width={20}
                height={14}
                className="w-5 h-auto object-contain"
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-xl md:hidden flex flex-col items-center py-8 gap-6 z-50 border-t border-slate-100 animate-in fade-in slide-in-from-top-4 duration-300">
          {["Servicios", "Descuentos", "Nosotros", "Membresías"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-slate-600 text-lg font-medium hover:text-teal-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <Button className="mt-4 px-10 py-4 rounded-full bg-teal-600 text-white font-semibold shadow-lg active:scale-95 transition-all">
            Iniciar sesión
          </Button>
        </div>
      )}
    </header>
  );
}
