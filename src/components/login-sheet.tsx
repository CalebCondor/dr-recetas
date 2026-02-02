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
import { Lock, Mail, ArrowRight, Github, User } from "lucide-react";
import Image from "next/image";
import { RegisterFormContent } from "./register-form-content";

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
            {view === "register" && <RegisterFormContent setView={setView} />}

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
