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
      <h2 className="text-3xl font-black text-[#0D4B4D] mb-2">
        Detalle de la Orden
      </h2>
      <Stepper current={2} />
    </div>

    <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-[#0D4B4D]/5 border-b border-slate-100">
          <tr>
            <th className="px-8 py-4 text-[10px] font-black uppercase text-[#0D4B4D] tracking-widest text-left">
              Producto / Paciente
            </th>
            <th className="px-8 py-4 text-[10px] font-black uppercase text-[#0D4B4D] tracking-widest text-right">
              Precio
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {cart.map((item) => (
            <tr key={item.id}>
              <td className="px-8 py-8 space-y-4">
                <div>
                  <h3 className="font-bold text-[#0D4B4D]">{item.titulo}</h3>
                  <p className="text-xs text-slate-400">
                    {item.detalle || "Consulta médica inmediata"}
                  </p>
                </div>
                <div className="space-y-1.5 max-w-sm">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">
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
                    className="h-10 rounded-lg bg-slate-50/50 border-slate-100 font-bold"
                  />
                </div>
              </td>
              <td className="px-8 py-8 text-right font-black text-[#0D4B4D] text-xl">
                ${parseFloat(item.precio).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="bg-slate-50 p-8 flex justify-between items-center border-t border-slate-100">
        <h4 className="font-bold text-[#0D4B4D]">Total a pagar:</h4>
        <span className="text-xl font-black text-[#0D4B4D]">
          ${total.toFixed(2)}{" "}
          <span className="text-sm font-bold opacity-30">USD</span>
        </span>
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
