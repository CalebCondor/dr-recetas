"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  User,
  Mail,
  Phone,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Building,
  Home,
  Lock,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface RegisterFormContentProps {
  setView: (view: "login" | "register") => void;
}

export function RegisterFormContent({ setView }: RegisterFormContentProps) {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedMunicipio, setSelectedMunicipio] = useState<string>("");
  const [locations, setLocations] = useState<{ id: string; name: string }[]>(
    [],
  );
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      if (!selectedRegion) {
        setLocations([]);
        return;
      }

      setIsLoadingLocations(true);
      try {
        const endpoint =
          selectedRegion === "pr"
            ? "https://doctorrecetas.com/api/pueblos.php"
            : "https://doctorrecetas.com/api/estados.php";

        const response = await fetch(endpoint);
        const result = await response.json();

        if (result.success) {
          const data = result.data;
          if (selectedRegion === "pr") {
            interface APIPueblo {
              id: number;
              nombre: string;
            }
            setLocations(
              data.pueblos.map((p: APIPueblo) => ({
                id: p.id.toString(),
                name: p.nombre,
              })),
            );
          } else {
            interface APIEstado {
              id: number;
              abreviatura: string;
              nombre: string;
            }
            setLocations(
              data.estados.map((e: APIEstado) => ({
                id: e.id.toString(),
                name: `${e.nombre}`,
              })),
            );
          }
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setIsLoadingLocations(false);
      }
    };

    fetchLocations();
    setSelectedMunicipio(""); // Reset municipio when region changes
  }, [selectedRegion]);

  return (
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
          {step === 1
            ? "Paso 1: Datos Personales"
            : "Paso 2: Detalles de la Cuenta"}
        </p>
      </div>

      <div className="space-y-6">
        {/* STEP 1: Personal Info */}
        <div className={cn("space-y-4", step === 1 ? "block" : "hidden")}>
          <div className="grid grid-cols-1 gap-4">
            {/* Nombre y Apellido */}
            <div className="space-y-2">
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
            <div className="space-y-2">
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
            <div className="space-y-2">
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
          </div>

          <Button
            onClick={() => setStep(2)}
            className="w-full h-12 rounded-xl bg-[#0D4B4D] hover:bg-[#093638] text-white font-bold shadow-lg hover:shadow-xl transition-all text-base mt-2"
          >
            Continuar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* STEP 2: Account Details */}
        <div className={cn("space-y-4", step === 2 ? "block" : "hidden")}>
          <div className="grid grid-cols-2 gap-4 pb-2">
            {/* Region (Combobox) */}
            <div className="space-y-2 col-span-1">
              <label className="text-sm font-medium text-slate-700 ml-1">
                Región
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 z-10 pointer-events-none" />
                <Select
                  onValueChange={setSelectedRegion}
                  value={selectedRegion}
                >
                  <SelectTrigger className="w-full pl-12 h-12 rounded-xl bg-slate-50 border border-slate-200 text-left text-sm hover:bg-slate-100/50 transition-colors">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    className="max-h-[300px] w-[var(--radix-select-trigger-width)]"
                  >
                    <SelectItem value="pr">Puerto Rico</SelectItem>
                    <SelectItem value="usa">USA</SelectItem>
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
                <Select
                  onValueChange={setSelectedMunicipio}
                  value={selectedMunicipio}
                  disabled={!selectedRegion || isLoadingLocations}
                >
                  <SelectTrigger className="w-full pl-12 h-12 rounded-xl bg-slate-50 border border-slate-200 text-left text-sm hover:bg-slate-100/50 transition-colors">
                    {isLoadingLocations ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Cargando...</span>
                      </div>
                    ) : (
                      <SelectValue
                        placeholder={
                          selectedRegion
                            ? "Seleccionar"
                            : "Primero elija región"
                        }
                      />
                    )}
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    className="max-h-[400px] w-[var(--radix-select-trigger-width)]"
                  >
                    {locations.map((loc) => (
                      <SelectItem key={loc.id} value={loc.id}>
                        {loc.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Dirección */}
            <div className="space-y-2 col-span-2">
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
            <div className="space-y-2 col-span-2">
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
            <div className="space-y-2 col-span-2">
              <label className="text-sm font-medium text-slate-700 ml-1">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#0D4B4D] transition-colors" />
                <Input
                  type={showPassword ? "text" : "password"}
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
                  <a href="#" className="text-[#0D4B4D] underline font-bold">
                    Términos y Condiciones
                  </a>
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setStep(1)}
              className="h-12 w-12 rounded-xl border-slate-200 hover:bg-slate-50 flex items-center justify-center p-0 shrink-0"
            >
              <ArrowLeft className="h-5 w-5 text-slate-500" />
            </Button>
            <Button className="flex-1 h-12 rounded-xl bg-[#0D4B4D] hover:bg-[#093638] text-white font-bold shadow-lg hover:shadow-xl transition-all text-base">
              Crear Cuenta
            </Button>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-slate-500">
        ¿Ya tienes una cuenta?{" "}
        <button
          onClick={() => setView("login")}
          className="font-bold text-[#0D4B4D] cursor-pointer hover:underline"
        >
          Inicia sesión aquí
        </button>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        <div
          className={cn(
            "h-1.5 rounded-full transition-all duration-300",
            step === 1 ? "w-8 bg-[#0D4B4D]" : "w-2 bg-slate-200",
          )}
        />
        <div
          className={cn(
            "h-1.5 rounded-full transition-all duration-300",
            step === 2 ? "w-8 bg-[#0D4B4D]" : "w-2 bg-slate-200",
          )}
        />
      </div>
    </div>
  );
}
