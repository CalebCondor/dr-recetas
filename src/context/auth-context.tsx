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
