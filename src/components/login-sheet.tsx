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
import { Lock, ArrowRight, Eye, EyeOff, User } from "lucide-react";
import Image from "next/image";
import { RegisterFormContent } from "./register-form-content";

interface LoginSheetProps {
  children: React.ReactNode;
}

export function LoginSheet({ children }: LoginSheetProps) {
  const [view, setView] = React.useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState({
    usuario: "",
    clave: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://doctorrecetas.com/api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Guardar sesión
        localStorage.setItem("dr_token", data.data.token);
        localStorage.setItem("dr_user", JSON.stringify(data.data));

        // Recargar para aplicar cambios de sesión
        window.location.reload();
      } else {
        setError(data.message || "Error al iniciar sesión");
      }
    } catch (err) {
      setError("Ocurrió un error inesperado al intentar iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet onOpenChange={(open) => !open && setView("login")}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="right"
        className="w-full md:w-[30%] lg:w-[35%] sm:max-w-none p-0 border-l border-slate-100 overflow-y-auto"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex h-full w-full">
          <div className="flex-1 flex flex-col justify-center items-center p-4 sm:p-12 lg:p-16 bg-white relative min-h-full">
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

                <form onSubmit={handleLogin} className="space-y-6">
                  {error && (
                    <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg text-center font-medium">
                      {error}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 ml-1">
                        Usuario
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#0D4B4D] transition-colors" />
                        <Input
                          type="text"
                          required
                          value={formData.usuario}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              usuario: e.target.value,
                            })
                          }
                          placeholder="Ingresa tu usuario"
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
                          type={showPassword ? "text" : "password"}
                          value={formData.clave}
                          onChange={(e) =>
                            setFormData({ ...formData, clave: e.target.value })
                          }
                          placeholder="••••••••"
                          className="pl-12 pr-10 h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-[#0D4B4D] focus-visible:ring-offset-0 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 rounded-xl bg-[#0D4B4D] hover:bg-[#093638] text-white font-bold shadow-lg hover:shadow-xl transition-all group"
                  >
                    {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                    {!isLoading && (
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    )}
                  </Button>
                </form>

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
