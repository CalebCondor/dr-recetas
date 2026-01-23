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
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full absolute top-0 left-0 z-50">
      <div className="w-full px-6 md:px-12 lg:px-[8%] py-4 lg:py-10 flex items-center justify-between">
        <Link href="/">
          <img src="/logo.png" alt="Dr. Recetas" className="h-8 lg:h-10" />
        </Link>

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

        <div className="flex md:hidden items-center gap-1.5">
          <button className="transition-all active:scale-95 flex items-center justify-center">
            <Image src="/store.svg" alt="Store" width={62} height={62} />
          </button>
          <Sheet>
            <SheetTrigger asChild>
              <button className="bg-white rounded-md shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center justify-center w-8 h-8 border border-slate-50">
                <Image
                  src="/hamburguer.svg"
                  alt="Menu"
                  width={20}
                  height={20}
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
                  <SheetHeader className="mt-2 mb-8 text-left p-0 space-y-1">
                    <SheetTitle className="text-xl font-extrabold text-[#0D4B4D] tracking-tight">
                      Explorar
                    </SheetTitle>
                    <p className="text-slate-400 text-xs font-medium">
                      Todo lo que necesitas en un solo lugar
                    </p>
                  </SheetHeader>

                  <div className="flex flex-col gap-1.5">
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
                        className="flex items-center gap-4 py-3.5 px-4 rounded-xl text-slate-700 hover:bg-slate-50 transition-all group"
                      >
                        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-50 group-hover:bg-[#0D4B4D]/10 transition-colors shrink-0">
                          <item.icon size={20} className="text-[#0D4B4D]" />
                        </div>
                        <span className="text-base font-bold tracking-tight">
                          {item.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Bottom Section: Socials + Auth */}
                <div className="pt-6 space-y-6">
                  <div className="pt-6 border-t border-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 ml-1">
                      Síguenos
                    </p>
                    <div className="flex gap-4">
                      {[Instagram, Facebook, Twitter].map((Icon, i) => (
                        <a
                          key={i}
                          href="#"
                          className="flex items-center justify-center w-11 h-11 rounded-full bg-slate-50 text-slate-600 hover:bg-[#0D4B4D] hover:text-white transition-all shadow-sm"
                        >
                          <Icon size={20} />
                        </a>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full py-6 rounded-2xl border-2 border-slate-100 text-[#0D4B4D] font-extrabold active:scale-95 transition-all text-base bg-white hover:bg-slate-50 hover:border-slate-200"
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
