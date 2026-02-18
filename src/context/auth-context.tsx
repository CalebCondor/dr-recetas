"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { UserData } from "@/services/types/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LogOut } from "lucide-react";

interface AuthContextType {
  user: UserData | null;
  token: string | null;
  isLoading: boolean;
  login: (userData: UserData, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [showExpireModal, setShowExpireModal] = useState(false);
  const [user, setUser] = useState<UserData | null>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("dr_user");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return null;
        }
      }
    }
    return null;
  });

  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("dr_token");
      if (storedToken) return storedToken;

      const storedUser = localStorage.getItem("dr_user");
      if (storedUser) {
        try {
          return JSON.parse(storedUser).token || null;
        } catch {
          return null;
        }
      }
    }
    return null;
  });

  const [isLoading] = useState(false);

  const login = useCallback((userData: UserData, userToken: string) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem("dr_token", userToken);
    localStorage.setItem(
      "dr_user",
      JSON.stringify({ ...userData, token: userToken }),
    );
  }, []);

  const logout = useCallback(async () => {
    const currentToken = localStorage.getItem("dr_token") || token;

    if (currentToken) {
      try {
        await fetch("https://doctorrecetas.com/api/logout.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentToken}`,
          },
        });
      } catch (err) {
        console.error("Error al invalidar token en servidor:", err);
      }
    }

    setShowExpireModal(false);
    setUser(null);
    setToken(null);
    localStorage.removeItem("dr_token");
    localStorage.removeItem("dr_user");

    window.location.href = "/";
  }, [token]);

  // Función para verificar si la sesión sigue siendo válida (Cierre Frío con aviso)
  const checkSession = useCallback(async () => {
    const currentToken = localStorage.getItem("dr_token") || token;
    if (!currentToken || showExpireModal) return;

    // 1. Verificación local rápida (si es JWT)
    try {
      const parts = currentToken.split(".");
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        if (payload.exp && Date.now() >= payload.exp * 1000) {
          console.warn("⚠️ Sesión expirada localmente.");
          setShowExpireModal(true);
          return;
        }
      }
    } catch (e) { }

    // 2. Verificación con el servidor
    try {
      const response = await fetch("https://doctorrecetas.com/api/perfil.php", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });

      if (response.status === 401) {
        console.warn("⚠️ Token ya no es válido en el servidor.");
        setShowExpireModal(true);
      }
    } catch (err) {
      console.error("Error de red al validar sesión:", err);
    }
  }, [token, showExpireModal]);

  // Validación inicial y periódica
  useEffect(() => {
    if (token) {
      checkSession();
      const interval = setInterval(checkSession, 1000 * 60 * 5);
      return () => clearInterval(interval);
    }
  }, [token, checkSession]);

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, login, logout }}
    >
      {children}

      <AlertDialog open={showExpireModal} onOpenChange={setShowExpireModal}>
        <AlertDialogContent className="max-w-[400px] rounded-3xl border-none p-8 text-center bg-white shadow-2xl">
          <AlertDialogHeader className="flex flex-col items-center gap-6">

            <div className="space-y-2">
              <AlertDialogTitle className="text-2xl font-black text-slate-900 text-center w-full">
                Sesión Finalizada
              </AlertDialogTitle>
              <AlertDialogDescription className="text-slate-400 font-bold leading-relaxed text-center">
                Tu sesión ha expirado por motivos de seguridad. Por favor, inicia sesión nuevamente para continuar disfrutando de nuestros servicios.
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-8 flex justify-center sm:justify-center">
            <AlertDialogAction
              onClick={logout}
              className="bg-[#0D4B4D] hover:bg-[#0D4B4D]/90 text-white font-black px-12 py-4 rounded-2xl h-auto shadow-xl shadow-[#0D4B4D]/20 active:scale-95 transition-all w-full sm:w-auto"
            >
              ENTENDIDO
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
