"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Loader2,
} from "lucide-react";
import Link from "next/link";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("t");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // New States for Validation
  const [isValidating, setIsValidating] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValidating(false);
        setIsTokenValid(false);
        setValidationMessage("Token no proporcionado");
        return;
      }

      try {
        const response = await fetch(
          `https://doctorrecetas.com/api/validar_token_recuperacion.php?token=${encodeURIComponent(token)}`,
          {
            method: "POST",
          },
        );

        const data = await response.json();

        if (data.success && data.valid) {
          setIsTokenValid(true);
        } else {
          setIsTokenValid(false);
        }
        setValidationMessage(data.message);
      } catch (error) {
        console.error("Error validating token:", error);
        setIsTokenValid(false);
        setValidationMessage("Error de conexión al validar el token");
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Double check just in case
    if (!token || !isTokenValid) {
      setError("Token inválido. No se puede restablecer la contraseña.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setIsLoading(true);

    try {
      // Use query params for reset as well, matching validation pattern
      const response = await fetch(
        `https://doctorrecetas.com/api/restablecer_contrasena.php?token=${encodeURIComponent(token!)}&nueva_clave=${encodeURIComponent(password)}`,
        {
          method: "POST",
        },
      );

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.message || "Error al restablecer la contraseña.");
      }
    } catch (err) {
      console.error("Error resetting password:", err);
      setError(
        "Ocurrió un error inesperado al intentar restablecer la contraseña.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isValidating) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Loader2 className="w-12 h-12 text-[#0D4B4D] animate-spin" />
        <p className="text-slate-500 font-medium">
          Validando enlace de seguridad...
        </p>
      </div>
    );
  }

  if (!isTokenValid) {
    return (
      <div className="text-center space-y-4 animate-in fade-in zoom-in duration-500">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-2">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">
          Enlace inválido o expirado
        </h1>
        <p className="text-slate-500 max-w-xs mx-auto">
          {validationMessage ||
            "El enlace de recuperación no es válido. Por favor, solicita uno nuevo."}
        </p>
        <Link href="/">
          <Button className="mt-4 bg-[#0D4B4D] hover:bg-[#093638] text-white">
            Volver al Inicio
          </Button>
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-2">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">
            ¡Contraseña Actualizada!
          </h1>
          <p className="text-slate-500 max-w-sm mx-auto">
            Tu contraseña ha sido restablecida exitosamente. Ahora puedes
            iniciar sesión con tu nueva clave.
          </p>
        </div>

        <Link href="/" className="block pt-2">
          <Button className="w-full h-12 rounded-xl bg-[#0D4B4D] hover:bg-[#093638] text-white font-bold shadow-lg hover:shadow-xl transition-all group">
            Ir a Iniciar Sesión
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0D4B4D]/10 text-[#0D4B4D] mb-4">
          <Lock className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Nueva Contraseña
        </h1>
        <p className="text-slate-500 text-sm">
          Ingresa tu nueva contraseña para recuperar el acceso a tu cuenta
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 animate-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-600 font-medium">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 ml-1">
              Nueva Contraseña
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#0D4B4D] transition-colors" />
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="pl-12 pr-10 h-12 rounded-xl bg-white border-slate-200 focus-visible:ring-[#0D4B4D] focus-visible:ring-offset-0 transition-all shadow-sm"
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

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 ml-1">
              Confirmar Contraseña
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#0D4B4D] transition-colors" />
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="pl-12 pr-10 h-12 rounded-xl bg-white border-slate-200 focus-visible:ring-[#0D4B4D] focus-visible:ring-offset-0 transition-all shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showConfirmPassword ? (
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
          {isLoading ? "Actualizando..." : "Restablecer Contraseña"}
          {!isLoading && (
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          )}
        </Button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden p-4">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#0D4B4D]/5 blur-[100px]" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-[#48Ccb5]/10 blur-[100px]" />
      </div>

      <div className="w-full max-w-lg bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-100 p-8 sm:p-12 relative z-10">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-[#0D4B4D] border-t-transparent rounded-full animate-spin"></div>
            </div>
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </div>

      <div className="mt-8 text-center text-slate-500 text-sm z-10">
        &copy; {new Date().getFullYear()} Doctor Recetas. Todos los derechos
        reservados.
      </div>
    </div>
  );
}
