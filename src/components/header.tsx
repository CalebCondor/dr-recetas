"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { LoginSheet } from "@/components/login-sheet";

import {
  Stethoscope,
  Tag,
  Users,
  CreditCard,
  Instagram,
  Facebook,
  Twitter,
  LogOut,
  ChevronDown,
  User,
  ClipboardList,
} from "lucide-react";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface UserData {
  us_id: string;
  us_nombres: string;
  token: string;
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check for user in localStorage only once on client-side mount
    const storedUser = localStorage.getItem("dr_user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        // Using queueMicrotask to decouple the state update from the direct effect execution,
        // which avoids the "cascading renders" warning.
        queueMicrotask(() => {
          setUser(parsed);
        });
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem("dr_token");
    localStorage.removeItem("dr_user");
    setUser(null);
    window.location.reload();
  };

  const navLinks = [
    { label: "Servicios", id: "servicios", href: "/servicios" },
    { label: "Descuentos", id: "descuentos", href: "/descuentos" },
    { label: "Nosotros", id: "nosotros", href: "/nosotros" },
    { label: "Membresías", id: "menbresias", href: "/membresias" },
  ];

  return (
    <header
      className={`w-full fixed top-0 left-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-xl shadow-sm" : "bg-transparent"
      }`}
    >
      <div
        className={`w-full px-6 md:px-12 lg:px-[8%] flex items-center justify-between transition-all duration-300 ${
          isScrolled ? "py-4 lg:py-5" : "py-4 lg:py-10"
        }`}
      >
        <Link href="/" prefetch={true}>
          <img src="/logo.png" alt="Dr. Recetas" className="h-8 lg:h-10" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-slate-500 hover:text-slate-800 font-medium transition-colors text-sm"
            >
              {label}
            </Link>
          ))}
          {user ? (
            <DropdownMenu onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all active:scale-95 outline-none">
                  <div className="w-8 h-8 rounded-full bg-[#0D4B4D] flex items-center justify-center text-white font-bold text-xs">
                    {user.us_nombres.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold text-slate-700 hidden lg:block max-w-[100px] truncate">
                    {user.us_nombres.split(" ")[0]}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-64 p-2 rounded-2xl shadow-xl border-slate-100"
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-3 px-3 py-3 text-left">
                    <Avatar className="h-10 w-10 rounded-xl border-2 border-[#0D4B4D]/10">
                      <AvatarFallback className="rounded-xl bg-[#0D4B4D] text-white font-bold">
                        {user.us_nombres.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-bold text-[#0D4B4D]">
                        {user.us_nombres}
                      </span>
                      <span className="text-slate-400 truncate text-[10px] font-bold uppercase tracking-widest">
                        ID: {user.us_id}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-50 mx-[-8px] my-2" />
                <DropdownMenuGroup>
                  <Link href="/perfil">
                    <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors text-sm font-bold cursor-pointer group">
                      <User className="w-4 h-4 text-slate-400 group-hover:text-[#0D4B4D] transition-colors" />
                      Mi Perfil
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors text-sm font-bold cursor-pointer group">
                    <ClipboardList className="w-4 h-4 text-slate-400 group-hover:text-[#0D4B4D] transition-colors" />
                    Mis Ordenes
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-slate-50 mx-[-8px] my-2" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 focus:bg-red-50 focus:text-red-600 transition-colors text-sm font-bold cursor-pointer"
                >
                  <LogOut className="text-red-500 w-4 h-4" />
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <LoginSheet>
              <Button className="px-8 py-3 rounded-full bg-white text-slate-500 font-semibold border-none shadow-sm hover:bg-slate-50 hover:shadow-md transition-all text-sm h-auto">
                Iniciar sesión
              </Button>
            </LoginSheet>
          )}
        </nav>

        <div className="flex md:hidden items-center gap-1.5">
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
                        href: "/membresias",
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

                  {user ? (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="w-12 h-12 rounded-full bg-[#0D4B4D] flex items-center justify-center text-white font-bold text-lg shadow-inner">
                          {user.us_nombres.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            Conectado como
                          </p>
                          <p className="text-base font-extrabold text-[#0D4B4D] truncate">
                            {user.us_nombres}
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="w-full py-6 rounded-2xl border-2 border-red-50 text-red-500 font-extrabold active:scale-95 transition-all text-base bg-white hover:bg-red-50 hover:border-red-100 flex items-center justify-center gap-3"
                      >
                        <LogOut size={20} />
                        Cerrar sesión
                      </Button>
                    </div>
                  ) : (
                    <LoginSheet>
                      <Button
                        variant="outline"
                        className="w-full py-6 rounded-2xl border-2 border-slate-100 text-[#0D4B4D] font-extrabold active:scale-95 transition-all text-base bg-white hover:bg-slate-50 hover:border-slate-200"
                      >
                        Iniciar sesión
                      </Button>
                    </LoginSheet>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
