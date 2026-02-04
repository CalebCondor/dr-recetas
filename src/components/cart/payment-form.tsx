import React from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/context/cart-context";
import { CartFormData } from "./types";
import { Stepper } from "./stepper";

interface PaymentFormProps {
  cart: CartItem[];
  formData: CartFormData;
  setFormData: (data: CartFormData) => void;
  purchaseId: string;
  total: number;
  onBack: () => void;
  onComplete: () => void;
}

export const PaymentForm = ({
  cart,
  formData,
  setFormData,
  purchaseId,
  total,
  onBack,
  onComplete,
}: PaymentFormProps) => (
  <motion.div
    key="payment"
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.98 }}
    className="space-y-10"
  >
    <div className="text-center">
      <h2 className="text-3xl font-black text-[#0D4B4D] mb-2">
        Finalizar Pago
      </h2>
      <Stepper current={3} />
    </div>

    <div className="max-w-3xl mx-auto space-y-10">
      <div className="border border-slate-100 rounded-3xl overflow-hidden bg-white shadow-sm">
        <div className="bg-[#0D4B4D] p-6 text-center text-white">
          <span className="text-[10px] uppercase font-bold tracking-widest opacity-60 block mb-1">
            Orden de Servicio
          </span>
          <p className="text-2xl font-black">{purchaseId}</p>
        </div>
        <div className="p-8 space-y-6">
          <div className="divide-y divide-slate-50">
            {cart.map((item) => (
              <div
                key={item.id}
                className="py-4 flex justify-between items-center text-sm"
              >
                <div>
                  <p className="font-bold text-[#0D4B4D]">{item.titulo}</p>
                  <span className="text-[10px] text-slate-400">
                    Paciente:{" "}
                    {formData.order_names[item.id] || formData.nombre_completo}
                  </span>
                </div>
                <span className="font-black text-[#0D4B4D] text-xl">
                  ${parseFloat(item.precio).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
            <span className="text-xl font-black text-[#0D4B4D]">Total</span>
            <span className="text-xl font-black text-[#0D4B4D]">
              ${total.toFixed(2)} USD
            </span>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 space-y-8">
        <h4 className="text-center font-bold text-[#0D4B4D] text-lg">
          Seleccione Método de Pago
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label
            onClick={() => setFormData({ ...formData, payment_method: "ath" })}
            className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all active:scale-95 ${
              formData.payment_method === "ath"
                ? "bg-orange-50 border-orange-500 text-orange-700 shadow-md"
                : "bg-white border-slate-100 text-slate-400 hover:border-slate-300"
            }`}
          >
            <input
              type="radio"
              name="payment_method"
              checked={formData.payment_method === "ath"}
              className="hidden"
              onChange={() =>
                setFormData({ ...formData, payment_method: "ath" })
              }
            />
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.payment_method === "ath" ? "border-orange-600 bg-orange-600" : "border-slate-300"}`}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
            <span className="font-black text-xl text-orange-600">
              Ath Movil
            </span>
          </label>

          <label
            onClick={() =>
              setFormData({ ...formData, payment_method: "tarjeta" })
            }
            className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all active:scale-95 ${
              formData.payment_method === "tarjeta"
                ? "bg-teal-50 border-teal-500 text-teal-700 shadow-md"
                : "bg-white border-slate-100 text-slate-400 hover:border-slate-300"
            }`}
          >
            <input
              type="radio"
              name="payment_method"
              checked={formData.payment_method === "tarjeta"}
              className="hidden"
              onChange={() =>
                setFormData({
                  ...formData,
                  payment_method: "tarjeta",
                })
              }
            />
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.payment_method === "tarjeta" ? "border-teal-600 bg-teal-600" : "border-slate-300"}`}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
            <span className="font-black text-xl text-teal-600">Tarjeta</span>
          </label>
        </div>

        <Button
          onClick={onComplete}
          className="w-full h-16 bg-[#0D4B4D] hover:bg-[#093638] text-white rounded-2xl font-black text-xl shadow-xl shadow-[#0D4B4D]/20 active:scale-98"
        >
          PAGAR AHORA
        </Button>

        <button
          onClick={onBack}
          className="w-full text-slate-400 text-sm font-bold hover:text-[#0D4B4D] transition-colors flex items-center justify-center gap-2"
        >
          <RiArrowLeftLine /> Volver a detalles
        </button>
      </div>
    </div>
  </motion.div>
);
