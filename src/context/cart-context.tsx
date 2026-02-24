"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { RiShoppingBag4Line } from "react-icons/ri";

export interface CartItem {
  id: string;
  titulo: string;
  precio: string;
  imagen: string;
  categoria: string;
  detalle?: string;
  resumen?: string;
  slug?: string;
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
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (e) {
        console.error("Failed to parse cart storage", e);
        return [];
      }
    }
    return [];
  });
  const [isDuplicateAlertOpen, setIsDuplicateAlertOpen] = useState(false);

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
        setIsDuplicateAlertOpen(true);
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

      {/* Duplicate Item Dialog */}
      <Dialog
        open={isDuplicateAlertOpen}
        onOpenChange={setIsDuplicateAlertOpen}
      >
        <DialogContent
          showCloseButton={false}
          className="rounded-[3rem] p-12 md:p-16 border-none shadow-[0_30px_100px_rgba(0,0,0,0.15)] w-[92vw] max-w-lg bg-white cursor-pointer"
          onClick={() => setIsDuplicateAlertOpen(false)}
        >
          <div className="flex flex-col items-center text-center gap-8 pointer-events-none">
            <div className="w-24 h-24 rounded-full bg-emerald-50/50 flex items-center justify-center text-[#0D4B4D] shadow-inner">
              <RiShoppingBag4Line size={48} />
            </div>
            <div className="space-y-4">
              <DialogTitle className="text-3xl md:text-4xl font-black text-[#0D4B4D] tracking-tight">
                Producto en Carrito
              </DialogTitle>
              <DialogDescription className="text-slate-500 font-medium text-lg md:text-xl leading-relaxed max-w-xs mx-auto">
                No puedes agregar el mismo producto dos veces. Si necesitas
                otro, por favor{" "}
                <span className="font-bold text-[#0D4B4D]">
                  finaliza esta compra
                </span>{" "}
                primero.
              </DialogDescription>
            </div>
          </div>
        </DialogContent>
      </Dialog>
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
