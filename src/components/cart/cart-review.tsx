import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  RiDeleteBin6Line,
  RiArrowLeftLine,
  RiArrowRightLine,
} from "react-icons/ri";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import { CartItem } from "@/context/cart-context";

interface CartReviewProps {
  cart: CartItem[];
  total: number;
  removeFromCart: (id: string) => void;
  onContinue: () => void;
}

export const CartReview = ({
  cart,
  total,
  removeFromCart,
  onContinue,
}: CartReviewProps) => (
  <motion.div
    key="review"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="space-y-10"
  >
    <div className="flex flex-col md:flex-row items-center justify-between border-b border-slate-100 pb-8">
      <div>
        <h1 className="text-3xl font-black text-[#0D4B4D]">Mi Carrito</h1>
        <p className="text-slate-400 text-sm">
          Resumen de los servicios seleccionados
        </p>
      </div>
      <Link
        href="/servicios"
        className="text-sm font-bold text-[#0D4B4D] hover:underline flex items-center gap-2 mt-4 md:mt-0"
      >
        <RiArrowLeftLine /> Seguir comprando
      </Link>
    </div>

    <div className="overflow-hidden border border-slate-100 rounded-2xl">
      <table className="w-full text-left">
        <thead className="bg-[#0D4B4D]/5 border-b border-slate-100">
          <tr>
            <th className="px-6 py-4 text-[10px] font-black uppercase text-[#0D4B4D] tracking-widest">
              Servicio
            </th>
            <th className="px-6 py-4 text-[10px] font-black uppercase text-[#0D4B4D] tracking-widest text-right">
              Precio
            </th>
            <th className="px-6 py-4 w-20"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {cart.map((item) => (
            <tr key={item.id} className="group">
              <td className="px-6 py-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl relative overflow-hidden shrink-0 border border-slate-100">
                    <Image
                      src={item.imagen}
                      alt={item.titulo}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0D4B4D]">{item.titulo}</h3>
                    <p className="text-xs text-slate-400">{item.categoria}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-6 text-right">
                <span className="font-bold text-[#0D4B4D] text-xl">
                  ${parseFloat(item.precio).toFixed(2)}
                </span>
              </td>
              <td className="px-6 py-6 text-right">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                >
                  <RiDeleteBin6Line size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-slate-50 border-t border-slate-100">
          <tr>
            <td className="px-6 py-6 font-bold text-[#0D4B4D]">Total</td>
            <td className="px-6 py-6 text-right font-black text-xl text-[#0D4B4D]">
              ${total.toFixed(2)}
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>

    <div className="flex justify-center pt-4">
      <Button
        onClick={onContinue}
        className="bg-[#0D4B4D] hover:bg-[#093638] text-white px-5 py-3 rounded-xl font-semibold shadow-md shadow-[#0D4B4D]/20 transition-all active:scale-95 disabled:opacity-70 h-auto"
      >
        Confirmar mi información
        <RiArrowRightLine />
      </Button>
    </div>
  </motion.div>
);
