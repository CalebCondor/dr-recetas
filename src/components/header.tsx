"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { LoginSheet } from "@/components/login-sheet";

import {
  Stethoscope,
  Tag,
  Users,
  CreditCard,
  LogOut,
  ChevronDown,
  User,
  ClipboardList,
  Receipt,
} from "lucide-react";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useCart } from "@/context/cart-context";
import { ShoppingCart } from "lucide-react";

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

const Shimmer = () => (
  <motion.div
    initial={{ x: "-100%" }}
    animate={{ x: "200%" }}
    transition={{
      repeat: Infinity,
      duration: 2,
      ease: "linear",
    }}
    className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none"
  />
);

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { cart, clearCart } = useCart();

  // Nueva lógica para detectar si el fondo es claro u oscuro
  const [isHeaderDark, setIsHeaderDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > 10);

      // Si estamos en el home a menos de 100px, mantenemos el tema "white" para el hero
      // En cualquier otra página o si bajamos mucho, usamos el tema oscuro (text-slate-700)
      const isHomePage = pathname === "/";
      if (!isHomePage) {
        setIsHeaderDark(true);
      } else {
        setIsHeaderDark(scrollPos > 500); // Cambia después de pasar el Hero en Home
      }
    };

    handleScroll(); // Check inicial
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    const storedUser = localStorage.getItem("dr_user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
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
    clearCart();
    setUser(null);
    setIsSheetOpen(false);
    window.location.reload();
  };

  const navLinks = [
    { label: "Servicios", id: "servicios", href: "/servicios" },
    { label: "Descuentos", id: "descuentos", href: "/descuentos" },
    { label: "Nosotros", id: "nosotros", href: "/nosotros" },
    { label: "Membresías", id: "menbresias", href: "/membresias" },
  ];

  // Definimos los colores basados en los estados
  const textColor =
    isScrolled || isHeaderDark
      ? "text-slate-600 hover:text-[#0D4B4D]"
      : "text-white/80 hover:text-white";
  const logoSrc = isScrolled || isHeaderDark ? "/logo.png" : "/logo_white.png";
  const buttonBg =
    isScrolled || isHeaderDark
      ? "bg-white border border-slate-100 shadow-sm hover:shadow-md"
      : "bg-white/20 border border-white/30 shadow-lg hover:bg-white/30";
  const iconColor =
    isScrolled || isHeaderDark ? "text-[#0D4B4D]" : "text-white";

  return (
    <header
      className={`w-full fixed top-0 left-0 z-40 transition-all duration-300 ${
        isScrolled || isHeaderDark
          ? "bg-white/90 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div
        className={`w-full px-6 md:px-12 lg:px-[8%] flex items-center justify-between transition-all duration-300 ${
          isScrolled ? "py-4 lg:py-5" : "py-4 lg:py-10"
        }`}
      >
        <Link href="/" prefetch={true}>
          <Image
            src={logoSrc}
            alt="Dr. Recetas"
            width={120}
            height={40}
            className="h-8 lg:h-10 w-auto transition-all duration-300"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`font-semibold transition-colors text-sm ${textColor}`}
            >
              {label}
            </Link>
          ))}
          <div className="flex items-center gap-3">
            {/* Cart Button Desktop */}
            <Link href="/carrito">
              <button
                className={`relative flex items-center justify-center w-10 h-10 rounded-xl backdrop-blur-md transition-all active:scale-95 group ${buttonBg}`}
              >
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  <Shimmer />
                </div>
                <div className="relative z-10">
                  <ShoppingCart
                    size={20}
                    className={`${iconColor} group-hover:scale-110 transition-transform`}
                  />
                  {cart.length > 0 && (
                    <span
                      className={`absolute -top-2.5 -right-2.5 w-4.5 h-4.5 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 animate-in zoom-in-50 duration-300 ${
                        isScrolled || isHeaderDark
                          ? "bg-[#0D4B4D] border-white"
                          : "bg-[#0D4B4D] border-white/40"
                      }`}
                    >
                      {cart.length}
                    </span>
                  )}
                </div>
              </button>
            </Link>
            {user ? (
              <DropdownMenu onOpenChange={setIsMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <button
                    className={`relative overflow-hidden flex items-center gap-2 px-2.5 h-10 rounded-xl backdrop-blur-md transition-all active:scale-95 outline-none ${buttonBg}`}
                  >
                    <Shimmer />
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-[10px] shadow-inner relative z-10 ${
                        isScrolled || isHeaderDark
                          ? "bg-[#0D4B4D]"
                          : "bg-white/20"
                      }`}
                    >
                      {user.us_nombres.charAt(0).toUpperCase()}
                    </div>
                    <span
                      className={`text-xs font-bold hidden lg:block max-w-[100px] truncate relative z-10 ${
                        isScrolled || isHeaderDark
                          ? "text-slate-700"
                          : "text-white"
                      }`}
                    >
                      {user.us_nombres.split(" ")[0]}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 relative z-10 ${
                        isMenuOpen ? "rotate-180" : ""
                      } ${isScrolled || isHeaderDark ? "text-slate-400" : "text-white/70"}`}
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
                    <Link href="/perfil?tab=info">
                      <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors text-sm font-bold cursor-pointer group">
                        <User className="w-4 h-4 text-slate-400 group-hover:text-[#0D4B4D] transition-colors" />
                        Mi Perfil
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/perfil?tab=orders">
                      <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors text-sm font-bold cursor-pointer group">
                        <ClipboardList className="w-4 h-4 text-slate-400 group-hover:text-[#0D4B4D] transition-colors" />
                        Mis Ordenes
                      </DropdownMenuItem>
                    </Link>

                    <Link href="/perfil?tab=history">
                      <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors text-sm font-bold cursor-pointer group">
                        <Receipt className="w-4 h-4 text-slate-400 group-hover:text-[#0D4B4D] transition-colors" />
                        Mis Transacciones
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="bg-slate-50 mx-[-8px] my-2" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 focus:bg-red-50 focus:text-red-600 transition-colors text-sm font-bold cursor-pointer"
                  >
                    <LogOut className="text-red-500 focus:text-red-600 w-4 h-4" />
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <LoginSheet>
                <button
                  className={`relative overflow-hidden px-6 h-10 rounded-xl font-bold transition-all active:scale-95 text-xs backdrop-blur-md flex items-center justify-center ${
                    isScrolled || isHeaderDark
                      ? "bg-[#0D4B4D] text-white shadow-md hover:bg-[#0D4B4D]/90"
                      : "bg-white/20 border border-white/30 text-white shadow-lg hover:bg-white/30"
                  }`}
                >
                  <Shimmer />
                  <span className="relative z-10">Iniciar sesión</span>
                </button>
              </LoginSheet>
            )}
          </div>
        </nav>

        <div className="flex md:hidden items-center gap-2">
          {/* Cart Button Mobile */}
          <Link href="/carrito">
            <button
              className={`relative w-10 h-10 flex items-center justify-center rounded-xl backdrop-blur-md transition-all active:scale-95 ${buttonBg}`}
            >
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <Shimmer />
              </div>
              <div className="relative z-10">
                <ShoppingCart size={18} className={iconColor} />
                {cart.length > 0 && (
                  <span
                    className={`absolute -top-1 -right-1 w-4 h-4 text-white text-[8px] font-bold rounded-full flex items-center justify-center border ${
                      isScrolled || isHeaderDark
                        ? "bg-[#0D4B4D] border-white"
                        : "bg-[#0D4B4D] border-white/40"
                    }`}
                  >
                    {cart.length}
                  </span>
                )}
              </div>
            </button>
          </Link>

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <button
                className={`relative overflow-hidden flex items-center justify-center w-10 h-10 rounded-xl backdrop-blur-md transition-all active:scale-95 border ${buttonBg}`}
              >
                <Shimmer />
                <Image
                  src="/hamburguer.svg"
                  alt="Menu"
                  width={20}
                  height={20}
                  className={`relative z-10 transition-all duration-300 ${
                    isScrolled || isHeaderDark
                      ? ""
                      : "brightness-0 invert opacity-90"
                  }`}
                />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85%] sm:w-[400px] bg-white border-l border-slate-100 p-0 flex flex-col overflow-hidden"
            >
              <div className="flex flex-col h-full p-6 sm:p-8">
                {/* Top Section: Header + User + Links */}
                <div className="flex-1 overflow-y-auto">
                  <SheetHeader className="mt-2 mb-6 text-left p-0 space-y-1">
                    <SheetTitle className="text-xl font-extrabold text-[#0D4B4D] tracking-tight">
                      Explorar
                    </SheetTitle>
                    <p className="text-slate-400 text-xs font-medium">
                      Todo lo que necesitas en un solo lugar
                    </p>
                  </SheetHeader>

                  {/* Move Auth/User Section here for better visibility */}
                  <div className="mb-8">
                    {user ? (
                      <div className="flex flex-col gap-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm active:scale-95 outline-none text-left w-full group hover:border-[#0D4B4D]/20 transition-all">
                              <div className="w-12 h-12 rounded-xl bg-[#0D4B4D] flex items-center justify-center text-white font-bold text-lg shadow-inner group-hover:scale-105 transition-transform shrink-0">
                                {user.us_nombres.charAt(0).toUpperCase()}
                              </div>
                              <div className="flex-1 overflow-hidden">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
                                  Mi Cuenta
                                </p>
                                <div className="flex items-center justify-between gap-2">
                                  <p className="text-base font-extrabold text-[#0D4B4D] truncate">
                                    {user.us_nombres}
                                  </p>
                                  <ChevronDown className="w-4 h-4 text-[#0D4B4D]/50 group-hover:text-[#0D4B4D] transition-colors" />
                                </div>
                              </div>
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="center"
                            className="w-[300px] p-2 rounded-2xl shadow-xl border-slate-100 z-100 bg-slate-50"
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
                              <Link
                                href="/perfil?tab=info"
                                onClick={() => setIsSheetOpen(false)}
                              >
                                <DropdownMenuItem className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-600 hover:bg-white hover:text-[#0D4B4D] transition-colors text-sm font-bold cursor-pointer group">
                                  <User className="w-4 h-4 text-slate-400 group-hover:text-[#0D4B4D] transition-colors" />
                                  Mi Perfil
                                </DropdownMenuItem>
                              </Link>
                              <Link
                                href="/perfil?tab=orders"
                                onClick={() => setIsSheetOpen(false)}
                              >
                                <DropdownMenuItem className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-600 hover:bg-white hover:text-[#0D4B4D] transition-colors text-sm font-bold cursor-pointer group">
                                  <ClipboardList className="w-4 h-4 text-slate-400 group-hover:text-[#0D4B4D] transition-colors" />
                                  Mis Ordenes
                                </DropdownMenuItem>
                              </Link>
                              <Link
                                href="/perfil?tab=history"
                                onClick={() => setIsSheetOpen(false)}
                              >
                                <DropdownMenuItem className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-600 hover:bg-white hover:text-[#0D4B4D] transition-colors text-sm font-bold cursor-pointer group">
                                  <Receipt className="w-4 h-4 text-slate-400 group-hover:text-[#0D4B4D] transition-colors" />
                                  Mis Transacciones
                                </DropdownMenuItem>
                              </Link>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator className="bg-slate-50 mx-[-8px] my-2" />
                            <DropdownMenuItem
                              onClick={handleLogout}
                              className="flex items-center gap-3 px-3 py-3 rounded-xl text-red-500 hover:bg-red-50 focus:bg-red-50 focus:text-red-600 transition-colors text-sm font-bold cursor-pointer"
                            >
                              <LogOut className="text-red-500 focus:text-red-600 w-4 h-4" />
                              Cerrar sesión
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ) : (
                      <LoginSheet>
                        <button className="w-full relative overflow-hidden py-4 rounded-2xl font-extrabold active:scale-95 transition-all text-base bg-[#0D4B4D] text-white shadow-xl shadow-[#0D4B4D]/20 flex items-center justify-center">
                          <Shimmer />
                          <span className="relative z-10">Iniciar sesión</span>
                        </button>
                      </LoginSheet>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">
                      Menú Principal
                    </p>
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
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsSheetOpen(false)}
                        className="flex items-center gap-4 py-3.5 px-4 rounded-xl text-slate-700 hover:bg-slate-50 transition-all group"
                      >
                        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-50 group-hover:bg-[#0D4B4D]/10 transition-colors shrink-0">
                          <item.icon size={20} className="text-[#0D4B4D]" />
                        </div>
                        <span className="text-base font-bold tracking-tight">
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
