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
  refreshToken: () => Promise<boolean>;
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

  // Ya no necesitamos el useEffect inicial para cargar los datos
  // porque se cargan en la inicialización del state.
  // Solo marcamos isLoading como false (que ya es false por defecto ahora)

  const login = useCallback((userData: UserData, userToken: string) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem("dr_token", userToken);
    localStorage.setItem(
      "dr_user",
      JSON.stringify({ ...userData, token: userToken }),
    );
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("dr_token");
    localStorage.removeItem("dr_user");
    window.location.href = "/";
  }, []);

  const refreshToken = useCallback(async (): Promise<boolean> => {
    const currentToken = localStorage.getItem("dr_token") || token;
    if (!currentToken) return false;

    try {
      const response = await fetch("https://doctorrecetas.com/api/token.php", {
        method: "POST", // Generalmente POST para seguridad
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
        // Si el backend requiere el token en el body:
        body: JSON.stringify({ token: currentToken }),
      });

      const data = await response.json();

      if (data.success && data.data?.token) {
        const newToken = data.data.token;
        setToken(newToken);
        localStorage.setItem("dr_token", newToken);

        // Actualizar el token dentro del objeto user también
        if (user) {
          const updatedUser = { ...user, token: newToken };
          setUser(updatedUser);
          localStorage.setItem("dr_user", JSON.stringify(updatedUser));
        }

        console.log("✅ Token refrescado exitosamente");
        return true;
      } else {
        console.error("❌ Falló el refresco de token:", data.message);
        // Si el refresh falla porque el token expiró del todo, desloguear
        if (data.status === 401) {
          // logout(); // Opcional: desloguear si el refresh falla
        }
        return false;
      }
    } catch (err) {
      console.error("❌ Error de red al refrescar token:", err);
      return false;
    }
  }, [token, user]);

  // Lógica de autorefresco cada 45 minutos (si hay sesión)
  useEffect(() => {
    if (!token) return;

    const interval = setInterval(
      () => {
        console.log("🔄 Iniciando refresco automático de token...");
        refreshToken();
      },
      1000 * 60 * 45,
    ); // 45 minutos

    return () => clearInterval(interval);
  }, [token, refreshToken]);

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, login, logout, refreshToken }}
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
