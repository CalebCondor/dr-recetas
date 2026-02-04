import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartItem } from "@/context/cart-context";
import { CartFormData } from "./types";
import { Stepper } from "./stepper";

interface OrderDetailsProps {
  cart: CartItem[];
  formData: CartFormData;
  setFormData: (data: CartFormData) => void;
  advisorCode: string;
  setAdvisorCode: (code: string) => void;
  total: number;
  onBack: () => void;
  onContinue: () => void;
}

export const OrderDetails = ({
  cart,
  formData,
  setFormData,
  advisorCode,
  setAdvisorCode,
  total,
  onBack,
  onContinue,
}: OrderDetailsProps) => (
  <motion.div
    key="details"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-10"
  >
    <div className="text-center">
      <h2 className="text-3xl font-black text-[#0D4B4D] mb-6">
        Detalle de la Orden
      </h2>
      <Stepper current={2} />
    </div>

    <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
      {/* Desktop Header */}
      <div className="hidden md:grid grid-cols-12 bg-[#0D4B4D]/5 border-b border-slate-100 px-8 py-4">
        <div className="col-span-8 text-[10px] font-black uppercase text-[#0D4B4D] tracking-widest">
          Producto / Paciente
        </div>
        <div className="col-span-4 text-[10px] font-black uppercase text-[#0D4B4D] tracking-widest text-right">
          Precio
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {cart.map((item) => (
          <div
            key={item.id}
            className="p-6 md:p-8 flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-4 items-start"
          >
            <div className="md:col-span-8 space-y-4 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 md:block">
                <div>
                  <h3 className="font-bold text-[#0D4B4D] text-lg md:text-base">
                    {item.titulo}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {item.detalle || "Consulta médica inmediata"}
                  </p>
                </div>
                {/* Mobile Price */}
                <div className="md:hidden mt-1">
                  <span className="text-xl font-black text-[#0D4B4D]">
                    ${parseFloat(item.precio).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-2 max-w-sm">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                  Nombre para esta orden:
                </label>
                <Input
                  value={
                    formData.order_names[item.id] || formData.nombre_completo
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order_names: {
                        ...formData.order_names,
                        [item.id]: e.target.value,
                      },
                    })
                  }
                  className="h-11 rounded-xl bg-slate-50/50 border-slate-100 font-bold focus:bg-white transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Desktop Price */}
            <div className="hidden md:flex md:col-span-4 justify-end items-start pt-1">
              <span className="font-black text-[#0D4B4D] text-xl">
                ${parseFloat(item.precio).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 p-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-100">
        <h4 className="font-bold text-[#0D4B4D] text-lg">Total a pagar:</h4>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl md:text-2xl font-black text-[#0D4B4D]">
            ${total.toFixed(2)}
          </span>
          <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            USD
          </span>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
          Código de Asesor (Opcional)
        </label>
        <Input
          value={advisorCode}
          onChange={(e) => setAdvisorCode(e.target.value)}
          className="h-12 rounded-xl bg-white border-slate-200"
          placeholder="Ej: DR-9900"
        />
      </div>
      <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 md:border-t-0 md:pt-0">
        <Button
          variant="outline"
          onClick={onBack}
          className="font-bold text-slate-500 bg-white border-slate-200 hover:bg-slate-50 rounded-xl px-8 h-12"
        >
          Volver
        </Button>
        <Button
          onClick={onContinue}
          className="bg-[#0D4B4D] hover:bg-[#093638] text-white px-10 h-12 rounded-xl font-bold shadow-md shadow-[#0D4B4D]/10"
        >
          Continuar
        </Button>
      </div>
    </div>
  </motion.div>
);
