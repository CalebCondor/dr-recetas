"use client";
import { Button } from "@/components/ui/button";
import {
  Stethoscope,
  Tag,
  Users,
  CreditCard,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
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
          <button className="transition-all active:scale-95 flex items-center justify-center">
            <Image
              src="/store.svg"
              alt="Store"
              width={44}
              height={44}
              className="w-11 h-11 object-contain"
            />
          </button>
          <Sheet>
            <SheetTrigger asChild>
              <button className="bg-white p-2 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center justify-center w-11 h-11">
                <Image
                  src="/hamburguer.svg"
                  alt="Menu"
                  width={20}
                  height={14}
                  className="w-5 h-auto object-contain"
                />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85%] sm:w-[400px] bg-white border-l border-slate-100 p-0 flex flex-col overflow-hidden"
            >
              <div className="flex flex-col h-full p-6 sm:p-8">
                {/* Top Section: Header + Links */}
                <div className="flex-1">
                  <SheetHeader className="mt-2 mb-6 text-left p-0 space-y-1">
                    <SheetTitle className="text-xl font-bold text-[#0D4B4D]">
                      Explorar
                    </SheetTitle>
                    <p className="text-slate-400 text-xs">
                      Todo lo que necesitas en un solo lugar
                    </p>
                  </SheetHeader>

                  <div className="flex flex-col gap-1">
                    {[
                      {
                        name: "Servicios",
                        icon: Stethoscope,
                        href: "#servicios",
                      },
                      { name: "Descuentos", icon: Tag, href: "#descuentos" },
                      { name: "Nosotros", icon: Users, href: "#nosotros" },
                      {
                        name: "Membresías",
                        icon: CreditCard,
                        href: "#membresías",
                      },
                    ].map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 py-3 px-3 rounded-xl text-slate-700 hover:bg-slate-50 transition-all group"
                      >
                        <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-[#0D4B4D]/10 transition-colors">
                          <item.icon size={18} className="text-[#0D4B4D]" />
                        </div>
                        <span className="text-base font-semibold">
                          {item.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Bottom Section: Socials + Auth */}
                <div className="pt-4 space-y-6">
                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                      Síguenos
                    </p>
                    <div className="flex gap-4">
                      {[Instagram, Facebook, Twitter].map((Icon, i) => (
                        <a
                          key={i}
                          href="#"
                          className="p-2.5 rounded-full bg-slate-50 text-slate-600 hover:bg-[#0D4B4D] hover:text-white transition-all"
                        >
                          <Icon size={18} />
                        </a>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full py-5 rounded-xl border-2 border-slate-100 text-[#0D4B4D] font-bold active:scale-95 transition-all text-base bg-white"
                  >
                    Iniciar sesión
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
