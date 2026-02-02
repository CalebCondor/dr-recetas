"use client";
// Force recompile

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Lock,
  Mail,
  ArrowRight,
  Github,
  User,
  Phone,
  MapPin,
  Building,
  Home,
} from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LoginSheetProps {
  children: React.ReactNode;
}

export function LoginSheet({ children }: LoginSheetProps) {
  const [view, setView] = React.useState<"login" | "register">("login");

  return (
    <Sheet onOpenChange={(open) => !open && setView("login")}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-none sm:w-[65%] p-0 border-l border-slate-100 overflow-y-auto"
      >
        <div className="flex h-full w-full">
          <div className="flex-1 flex flex-col justify-center items-center p-4 sm:p-12 lg:p-24 bg-white relative min-h-full">
            {/* VIEW: LOGIN */}
            {view === "login" && (
              <div className="w-full max-w-md space-y-8 fade-in-0 animate-in zoom-in-95 duration-300">
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0D4B4D]/10 text-[#0D4B4D] mb-4">
                    <Lock className="w-6 h-6" />
                  </div>
                  <SheetHeader>
                    <SheetTitle className="text-3xl font-bold tracking-tight text-slate-900 text-center">
                      Bienvenido de nuevo
                    </SheetTitle>
                  </SheetHeader>
                  <p className="text-slate-500 text-sm">
                    Ingresa tus datos para acceder a tu cuenta
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 ml-1">
                        Correo electrónico
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#0D4B4D] transition-colors" />
                        <Input
                          type="email"
                          placeholder="tu@ejemplo.com"
                          className="pl-12 h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-[#0D4B4D] focus-visible:ring-offset-0 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between ml-1">
                        <label className="text-sm font-medium text-slate-700">
                          Contraseña
                        </label>
                        <a
                          href="#"
                          className="text-xs font-medium text-[#0D4B4D] hover:underline"
                        >
                          ¿Olvidaste tu contraseña?
                        </a>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#0D4B4D] transition-colors" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="pl-12 h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-[#0D4B4D] focus-visible:ring-offset-0 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <Button className="w-full h-12 rounded-xl bg-[#0D4B4D] hover:bg-[#093638] text-white font-bold shadow-lg hover:shadow-xl transition-all group">
                    Iniciar Sesión
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-slate-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-slate-500 font-medium">
                        O continúa con
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="h-11 rounded-xl border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all"
                    >
                      <svg
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="google"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 488 512"
                      >
                        <path
                          fill="currentColor"
                          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                        ></path>
                      </svg>
                      Google
                    </Button>
                    <Button
                      variant="outline"
                      className="h-11 rounded-xl border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Github
                    </Button>
                  </div>
                </div>

                <div className="text-center text-sm text-slate-500">
                  ¿No tienes una cuenta?{" "}
                  <button
                    onClick={() => setView("register")}
                    className="font-bold text-[#0D4B4D] hover:underline"
                  >
                    Regístrate gratis
                  </button>
                </div>
              </div>
            )}

            {/* VIEW: REGISTER */}
            {view === "register" && (
              <div className="w-full max-w-2xl space-y-6 md:space-y-8 fade-in-0 animate-in zoom-in-95 duration-300 py-4 sm:py-0">
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0D4B4D]/10 text-[#0D4B4D] mb-4">
                    <User className="w-6 h-6" />
                  </div>
                  <SheetHeader>
                    <SheetTitle className="text-3xl font-bold tracking-tight text-slate-900 text-center">
                      Crea tu cuenta gratis
                    </SheetTitle>
                  </SheetHeader>
                  <p className="text-slate-500 text-sm">
                    Completa el formulario para comenzar a usar nuestros
                    servicios
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-4">
                  {/* Nombre y Apellido */}
                  <div className="space-y-2 col-span-2 md:col-span-1">
                    <label className="text-sm font-medium text-slate-700 ml-1">
                      Nombre y Apellido
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#0D4B4D] transition-colors" />
                      <Input
                        placeholder="Ej. Juan Pérez"
                        className="pl-12 h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-[#0D4B4D] focus-visible:ring-offset-0 transition-all"
                      />
                    </div>
                  </div>

                  {/* Correo */}
                  <div className="space-y-2 col-span-2 md:col-span-1">
                    <label className="text-sm font-medium text-slate-700 ml-1">
                      Correo Electrónico
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#0D4B4D] transition-colors" />
                      <Input
                        type="email"
                        placeholder="tu@ejemplo.com"
                        className="pl-12 h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-[#0D4B4D] focus-visible:ring-offset-0 transition-all"
                      />
                    </div>
                  </div>

                  {/* Teléfono */}
                  <div className="space-y-2 col-span-2 md:col-span-1">
                    <label className="text-sm font-medium text-slate-700 ml-1">
                      Teléfono
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#0D4B4D] transition-colors" />
                      <Input
                        type="tel"
                        placeholder="(000) 000-0000"
                        className="pl-12 h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-[#0D4B4D] focus-visible:ring-offset-0 transition-all"
                      />
                    </div>
                  </div>

                  {/* Region (Combobox) */}
                  <div className="space-y-2 col-span-1">
                    <label className="text-sm font-medium text-slate-700 ml-1">
                      Región
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 z-10 pointer-events-none" />
                      <Select>
                        <SelectTrigger className="w-full pl-12 h-12 rounded-xl bg-slate-50 border border-slate-200 text-left text-sm hover:bg-slate-100/50 transition-colors">
                          <SelectValue placeholder="Seleccionar región" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pr">Puerto Rico</SelectItem>
                          <SelectItem value="usa">USA</SelectItem>
                          <SelectItem value="rd">
                            República Dominicana
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Municipio (Combobox) */}
                  <div className="space-y-2 col-span-1">
                    <label className="text-sm font-medium text-slate-700 ml-1">
                      Municipio
                    </label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 z-10 pointer-events-none" />
                      <Select>
                        <SelectTrigger className="w-full pl-12 h-12 rounded-xl bg-slate-50 border border-slate-200 text-left text-sm hover:bg-slate-100/50 transition-colors">
                          <SelectValue placeholder="Seleccionar municipio" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="carolina">Carolina</SelectItem>
                          <SelectItem value="sanjuan">San Juan</SelectItem>
                          <SelectItem value="bayamon">Bayamón</SelectItem>
                          <SelectItem value="caguas">Caguas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Dirección */}
                  <div className="space-y-2 col-span-2 md:col-span-1">
                    <label className="text-sm font-medium text-slate-700 ml-1">
                      Dirección
                    </label>
                    <div className="relative">
                      <Home className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#0D4B4D] transition-colors" />
                      <Input
                        placeholder="Calle, Número, Urbanización"
                        className="pl-12 h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-[#0D4B4D] focus-visible:ring-offset-0 transition-all"
                      />
                    </div>
                  </div>

                  {/* Usuario */}
                  <div className="space-y-2 col-span-2 md:col-span-1">
                    <label className="text-sm font-medium text-slate-700 ml-1">
                      Usuario
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#0D4B4D] transition-colors" />
                      <Input
                        placeholder="Nombre de usuario"
                        className="pl-12 h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-[#0D4B4D] focus-visible:ring-offset-0 transition-all"
                      />
                    </div>
                  </div>

                  {/* Contraseña */}
                  <div className="space-y-2 col-span-2 md:col-span-1">
                    <label className="text-sm font-medium text-slate-700 ml-1">
                      Contraseña
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#0D4B4D] transition-colors" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="pl-12 h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-[#0D4B4D] focus-visible:ring-offset-0 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-center space-x-2 ml-1">
                  <div className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-[#0D4B4D] focus:ring-[#0D4B4D]"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="terms"
                        className="font-medium text-slate-700 select-none"
                      >
                        Acepto los{" "}
                        <a
                          href="#"
                          className="text-[#0D4B4D] underline font-bold"
                        >
                          Términos y Condiciones
                        </a>
                      </label>
                    </div>
                  </div>
                </div>

                <Button className="w-full h-12 rounded-xl bg-[#0D4B4D] hover:bg-[#093638] text-white font-bold shadow-lg hover:shadow-xl transition-all text-base">
                  Crear Cuenta
                </Button>

                <div className="text-center text-sm text-slate-500">
                  ¿Ya tienes una cuenta?{" "}
                  <button
                    onClick={() => setView("login")}
                    className="font-bold text-[#0D4B4D] cursor-pointer hover:underline"
                  >
                    Inicia sesión aquí
                  </button>
                </div>
              </div>
            )}

            {/* Background elements */}
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Image
                src="/logo.png"
                width={256}
                height={100}
                className="w-64 h-auto grayscale"
                alt="Background deco"
              />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
