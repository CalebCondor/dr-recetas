import React from "react";
import Link from "next/link";
import { RiShoppingBag4Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";

export const EmptyCart = () => (
  <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center pt-32">
    <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-6 border border-slate-100">
      <RiShoppingBag4Line size={32} />
    </div>
    <h1 className="text-2xl font-bold text-[#0D4B4D] mb-2">
      Tu carrito está vacío
    </h1>
    <p className="text-slate-500 text-sm mb-8">
      No has añadido ningún servicio a tu carrito todavía.
    </p>
    <Button
      asChild
      className="bg-[#0D4B4D] hover:bg-[#093638] h-12 px-8 rounded-xl font-bold"
    >
      <Link href="/servicios/otros">Ver Servicios</Link>
    </Button>
  </div>
);
