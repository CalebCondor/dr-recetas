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
import { z } from "zod";
import { toast } from "sonner";

const registerSchema = z.object({
  us_nombres: z.string().min(1, "El nombre es obligatorio"),
  us_email: z.string().email("Correo electrónico inválido"),
  us_telefono: z.string().optional(),
  us_direccion: z.string().optional(),
  us_usuario: z.string().min(1, "El usuario es obligatorio"),
  us_clave: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormContentProps {
  setView: (view: "login" | "register" | "recovery") => void;
}

export function RegisterFormContent({ setView }: RegisterFormContentProps) {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedMunicipio, setSelectedMunicipio] = useState<string>("");

  const [formData, setFormData] = useState<RegisterFormData>({
    us_nombres: "",
    us_email: "",
    us_telefono: "",
    us_direccion: "",
    us_usuario: "",
    us_clave: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterFormData, string>>
  >({});
  const [isLoading, setIsLoading] = useState(false);

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

  const handleInputChange = (field: keyof RegisterFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep1 = () => {
    const step1Schema = registerSchema.pick({
      us_nombres: true,
      us_email: true,
      us_telefono: true,
    });

    const result = step1Schema.safeParse(formData);

    if (!result.success) {
      const newErrors: Partial<Record<keyof RegisterFormData, string>> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as keyof RegisterFormData] = err.message;
        }
      });
      setErrors(newErrors);
      return false;
    }

    return true;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async () => {
    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: Partial<Record<keyof RegisterFormData, string>> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as keyof RegisterFormData] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://doctorrecetas.com/api/registro.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (data.success || data.message === "Usuario registrado exitosamente") {
        toast.success("Cuenta creada exitosamente");
        setView("login");
      } else {
        toast.error(data.message || "Error al crear la cuenta");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Ocurrió un error al intentar registrarse");
    } finally {
      setIsLoading(false);
    }
  };

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
                  value={formData.us_nombres}
                  onChange={(e) =>
                    handleInputChange("us_nombres", e.target.value)
                  }
                  placeholder="Ej. Juan Pérez"
                  className={cn(
                    "pl-12 h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-[#0D4B4D] focus-visible:ring-offset-0 transition-all",
                    errors.us_nombres &&
                      "border-red-500 focus-visible:ring-red-500",
                  )}
                />
              </div>
              {errors.us_nombres && (
                <p className="text-red-500 text-xs ml-1">{errors.us_nombres}</p>
              )}
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
                  value={formData.us_email}
                  onChange={(e) =>
                    handleInputChange("us_email", e.target.value)
                  }
                  placeholder="tu@ejemplo.com"
                  className={cn(
                    "pl-12 h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-[#0D4B4D] focus-visible:ring-offset-0 transition-all",
                    errors.us_email &&
                      "border-red-500 focus-visible:ring-red-500",
                  )}
                />
              </div>
              {errors.us_email && (
                <p className="text-red-500 text-xs ml-1">{errors.us_email}</p>
              )}
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
                  value={formData.us_telefono}
                  onChange={(e) =>
                    handleInputChange("us_telefono", e.target.value)
                  }
                  placeholder="(000) 000-0000"
                  className="pl-12 h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-[#0D4B4D] focus-visible:ring-offset-0 transition-all"
                />
              </div>
            </div>
          </div>

          <Button
            onClick={handleNextStep}
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
                  value={formData.us_direccion}
                  onChange={(e) =>
                    handleInputChange("us_direccion", e.target.value)
                  }
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
                  value={formData.us_usuario}
                  onChange={(e) =>
                    handleInputChange("us_usuario", e.target.value)
                  }
                  placeholder="Nombre de usuario"
                  className={cn(
                    "pl-12 h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-[#0D4B4D] focus-visible:ring-offset-0 transition-all",
                    errors.us_usuario &&
                      "border-red-500 focus-visible:ring-red-500",
                  )}
                />
              </div>
              {errors.us_usuario && (
                <p className="text-red-500 text-xs ml-1">{errors.us_usuario}</p>
              )}
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
                  value={formData.us_clave}
                  onChange={(e) =>
                    handleInputChange("us_clave", e.target.value)
                  }
                  placeholder="••••••••"
                  className={cn(
                    "pl-12 pr-10 h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-[#0D4B4D] focus-visible:ring-offset-0 transition-all",
                    errors.us_clave &&
                      "border-red-500 focus-visible:ring-red-500",
                  )}
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
              {errors.us_clave && (
                <p className="text-red-500 text-xs ml-1">{errors.us_clave}</p>
              )}
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
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 h-12 rounded-xl bg-[#0D4B4D] hover:bg-[#093638] text-white font-bold shadow-lg hover:shadow-xl transition-all text-base"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando cuenta...
                </>
              ) : (
                "Crear Cuenta"
              )}
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
