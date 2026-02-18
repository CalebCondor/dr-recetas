"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { UserData } from "@/services/types/types";

interface AuthContextType {
  user: UserData | null;
  token: string | null;
  isLoading: boolean;
  login: (userData: UserData, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
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

    setUser(null);
    setToken(null);
    localStorage.removeItem("dr_token");
    localStorage.removeItem("dr_user");

    window.location.href = "/";
  }, [token]);

  // Función para verificar si la sesión sigue siendo válida (Cierre Frío)
  const checkSession = useCallback(async () => {
    const currentToken = localStorage.getItem("dr_token") || token;
    if (!currentToken) return;

    // 1. Verificación local rápida (si es JWT)
    try {
      const parts = currentToken.split(".");
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        if (payload.exp && Date.now() >= payload.exp * 1000) {
          console.warn("⚠️ Sesión expirada localmente.");
          logout();
          return;
        }
      }
    } catch (e) {
      // No es un JWT o error al parsear, seguimos con la validación del servidor
    }

    // 2. Verificación con el servidor (sin extender la sesión, solo validar)
    try {
      const response = await fetch("https://doctorrecetas.com/api/perfil.php", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });

      if (response.status === 401) {
        console.warn("⚠️ Token ya no es válido en el servidor.");
        logout();
      }
    } catch (err) {
      console.error("Error de red al validar sesión:", err);
    }
  }, [token, logout]);

  // Validación inicial y periódica
  useEffect(() => {
    if (token) {
      // Validar inmediatamente al montar
      checkSession();

      // Validar cada 5 minutos para detectar expiración durante el uso
      const interval = setInterval(checkSession, 1000 * 60 * 5);
      return () => clearInterval(interval);
    }
  }, [token, checkSession]);

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, login, logout }}
    >
      {children}
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
