"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  titulo: string;
  precio: string;
  imagen: string;
  categoria: string;
  detalle?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "dr-recetas-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        queueMicrotask(() => {
          setCart(parsed);
        });
      } catch (e) {
        console.error("Failed to parse cart storage", e);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback(
    (item: CartItem) => {
      setCart((prevCart) => {
        const exists = prevCart.find((i) => i.id === item.id);
        if (exists) {
          return prevCart;
        }
        return [...prevCart, item];
      });

      // Check if item already exists before showing success toast
      const exists = cart.find((i) => i.id === item.id);
      if (exists) {
        toast.error("Producto ya en el carrito", {
          description:
            "No puedes agregar el mismo producto dos veces. Si necesitas otro, por favor finaliza primero esta compra.",
          duration: 4000,
        });
      } else {
        toast.success("Agregado al carrito", {
          description: `${item.titulo} se ha añadido correctamente.`,
        });
      }
    },
    [cart],
  );

  const removeFromCart = useCallback((id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + parseFloat(item.precio || "0"),
    0,
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
