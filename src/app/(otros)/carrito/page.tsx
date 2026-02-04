"use client";

import React, { useState, useEffect } from "react";
import { PageWrapper } from "@/components/page-wrapper";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import {
  RiShoppingBag4Line,
  RiDeleteBin6Line,
  RiArrowRightLine,
  RiArrowLeftLine,
  RiUpload2Line,
} from "react-icons/ri";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Step = "review" | "personal" | "details" | "payment";

const Stepper = ({ current }: { current: number }) => (
  <div className="flex items-center justify-center gap-4 sm:gap-8 mb-12">
    {[1, 2, 3].map((s, idx) => {
      const labels = ["Información Personal", "Detalle de la orden", "Pagar"];
      const isActive = current >= s;
      return (
        <React.Fragment key={s}>
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                isActive
                  ? "bg-[#0D4B4D] text-white"
                  : "bg-white border border-slate-200 text-slate-300"
              }`}
            >
              {s}
            </div>
            <span
              className={`text-[10px] font-bold uppercase tracking-wider hidden sm:block ${
                isActive ? "text-[#0D4B4D]" : "text-slate-300"
              }`}
            >
              {labels[idx]}
            </span>
          </div>
          {idx < 2 && (
            <div
              className={`w-8 h-px ${current > s ? "bg-[#0D4B4D]" : "bg-slate-200"}`}
            />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

export default function CarritoPage() {
  const { cart, removeFromCart, total, clearCart } = useCart();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<Step>("review");
  const [purchaseId, setPurchaseId] = useState("");

  // Form State
  const [advisorCode, setAdvisorCode] = useState("");
  const [formData, setFormData] = useState({
    nombre_completo: "",
    fecha_nacimiento: "",
    pais: "Puerto Rico",
    municipio: "",
    direccion: "",
    apartamento: "",
    codigo_postal: "",
    telefono: "",
    tipo_documento: "Licencia de Conducir",
    numero_documento: "",
    order_names: {} as Record<string, string>,
    payment_method: "tarjeta" as "ath" | "tarjeta",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("dr_user");
    if (!storedUser) {
      toast.error("Sesión requerida", {
        description: "Debes iniciar sesión para ver tu carrito.",
      });
      router.push("/");
      return;
    }

    queueMicrotask(() => {
      setPurchaseId(
        `#DR${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      );
      try {
        const parsed = JSON.parse(storedUser);
        // Pre-fill
        setFormData((prev) => ({
          ...prev,
          nombre_completo: parsed.us_nombres || "",
          telefono: parsed.us_telefono || "",
          municipio: parsed.us_municipio || "",
          direccion: parsed.us_direccion || "",
        }));
      } catch (e) {
        console.error("Error loading user for checkout", e);
      }
    });
  }, [router]);

  const cartCount = cart.length;

  if (cartCount === 0 && currentStep === "review") {
    return (
      <PageWrapper>
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center pt-32">
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
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="min-h-screen bg-white pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatePresence mode="wait">
            {currentStep === "review" && (
              /* TAB 0: CART REVIEW (Minimalist) */
              <motion.div
                key="review"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-10"
              >
                <div className="flex flex-col md:flex-row items-center justify-between border-b border-slate-100 pb-8">
                  <div>
                    <h1 className="text-3xl font-black text-[#0D4B4D]">
                      Mi Carrito
                    </h1>
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
                                <h3 className="font-bold text-[#0D4B4D]">
                                  {item.titulo}
                                </h3>
                                <p className="text-xs text-slate-400">
                                  {item.categoria}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-6 text-right">
                            <span className="font-bold text-[#0D4B4D]">
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
                        <td className="px-6 py-6 font-bold text-[#0D4B4D]">
                          Total
                        </td>
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
                    onClick={() => setCurrentStep("personal")}
                    className="h-14 px-12 bg-[#0D4B4D] hover:bg-[#093638] text-white rounded-2xl font-black text-lg shadow-lg shadow-[#0D4B4D]/10 gap-3"
                  >
                    Confirmar mi información
                    <RiArrowRightLine />
                  </Button>
                </div>
              </motion.div>
            )}

            {currentStep === "personal" && (
              /* TAB 1: INFORMACIÓN PERSONAL (Minimalist) */
              <motion.div
                key="personal"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-black text-[#0D4B4D] mb-2">
                    Información Personal
                  </h2>
                  <Stepper current={1} />
                </div>

                <div className="bg-slate-50/50 rounded-3xl p-8 border border-slate-100 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-2 lg:col-span-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
                        Paciente
                      </label>
                      <Input
                        value={formData.nombre_completo}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            nombre_completo: e.target.value,
                          })
                        }
                        className="h-12 rounded-xl bg-white border-slate-200"
                        placeholder="Nombre completo"
                      />
                    </div>
                    <div className="space-y-2 lg:col-span-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
                        Fecha Nacimiento
                      </label>
                      <Input
                        type="date"
                        value={formData.fecha_nacimiento}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            fecha_nacimiento: e.target.value,
                          })
                        }
                        className="h-12 rounded-xl bg-white border-slate-200"
                      />
                    </div>
                    <div className="space-y-2 lg:col-span-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
                        País
                      </label>
                      <Select
                        value={formData.pais}
                        onValueChange={(v) =>
                          setFormData({ ...formData, pais: v })
                        }
                      >
                        <SelectTrigger className="h-12 rounded-xl bg-white border-slate-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Puerto Rico">
                            Puerto Rico
                          </SelectItem>
                          <SelectItem value="USA">USA</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 lg:col-span-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
                        Municipio
                      </label>
                      <Input
                        value={formData.municipio}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            municipio: e.target.value,
                          })
                        }
                        className="h-12 rounded-xl bg-white border-slate-200"
                        placeholder="San Juan..."
                      />
                    </div>
                    <div className="space-y-2 lg:col-span-2">
                      <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
                        Dirección Física
                      </label>
                      <Input
                        value={formData.direccion}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            direccion: e.target.value,
                          })
                        }
                        className="h-12 rounded-xl bg-white border-slate-200"
                        placeholder="Calle, Número, Urbanización"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
                        Código Postal
                      </label>
                      <Input
                        value={formData.codigo_postal}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            codigo_postal: e.target.value,
                          })
                        }
                        className="h-12 rounded-xl bg-white border-slate-200"
                        placeholder="00XXX"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
                        Teléfono
                      </label>
                      <Input
                        value={formData.telefono}
                        onChange={(e) =>
                          setFormData({ ...formData, telefono: e.target.value })
                        }
                        className="h-12 rounded-xl bg-white border-slate-200"
                        placeholder="787..."
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
                        Tipo de Identificación
                      </label>
                      <Select
                        value={formData.tipo_documento}
                        onValueChange={(v) =>
                          setFormData({ ...formData, tipo_documento: v })
                        }
                      >
                        <SelectTrigger className="h-12 rounded-xl bg-white border-slate-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Licencia de Conducir">
                            Licencia de Conducir
                          </SelectItem>
                          <SelectItem value="Pasaporte">Pasaporte</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">
                        Número de Documento
                      </label>
                      <Input
                        value={formData.numero_documento}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            numero_documento: e.target.value,
                          })
                        }
                        className="h-12 rounded-xl bg-white border-slate-200"
                        placeholder="XXX-XXX-XXX"
                      />
                    </div>
                  </div>

                  <div className="p-6 bg-white rounded-2xl border border-slate-100 flex items-center justify-between gap-6">
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#0D4B4D] text-sm">
                        Foto de Identificación
                      </h4>
                      <p className="text-[10px] text-slate-400">
                        Escanee o suba una foto de su ID vigente.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="rounded-xl font-bold h-10 border-slate-200 hover:bg-slate-50"
                    >
                      <RiUpload2Line className="mr-2" /> Seleccionar
                    </Button>
                  </div>

                  <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100 italic">
                    <p className="text-[11px] text-orange-600 leading-relaxed">
                      *Si usted está adquiriendo la orden &quot;Back to
                      School&quot;, se requiere que suba una imagen o PDF del
                      Certificado Médico.
                    </p>
                  </div>

                  <div className="flex justify-center gap-4 pt-4">
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentStep("review")}
                      className="font-bold text-slate-400"
                    >
                      Volver
                    </Button>
                    <Button
                      onClick={() => setCurrentStep("details")}
                      className="bg-[#0D4B4D] hover:bg-[#093638] text-white px-10 h-12 rounded-xl font-bold"
                    >
                      Continuar
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === "details" && (
              /* TAB 2: ORDER DETAILS (Minimalist) */
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
                              <h3 className="font-bold text-[#0D4B4D]">
                                {item.titulo}
                              </h3>
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
                                  formData.order_names[item.id] ||
                                  formData.nombre_completo
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
                          <td className="px-8 py-8 text-right font-black text-[#0D4B4D] text-lg">
                            ${parseFloat(item.precio).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="bg-slate-50 p-8 flex justify-between items-center border-t border-slate-100">
                    <h4 className="font-bold text-[#0D4B4D]">Total a pagar:</h4>
                    <span className="text-3xl font-black text-[#0D4B4D]">
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
                  <div className="flex justify-end gap-3">
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentStep("personal")}
                      className="font-bold text-slate-400"
                    >
                      Volver
                    </Button>
                    <Button
                      onClick={() => setCurrentStep("payment")}
                      className="bg-[#0D4B4D] hover:bg-[#093638] text-white px-10 h-12 rounded-xl font-bold"
                    >
                      Continuar
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === "payment" && (
              /* TAB 3: PAYMENT (Minimalist) */
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
                              <p className="font-bold text-[#0D4B4D]">
                                {item.titulo}
                              </p>
                              <span className="text-[10px] text-slate-400">
                                Paciente:{" "}
                                {formData.order_names[item.id] ||
                                  formData.nombre_completo}
                              </span>
                            </div>
                            <span className="font-black text-[#0D4B4D]">
                              ${parseFloat(item.precio).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-xl font-black text-[#0D4B4D]">
                          Total
                        </span>
                        <span className="text-2xl font-black text-[#0D4B4D]">
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
                        className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all active:scale-95 ${
                          formData.payment_method === "ath"
                            ? "bg-orange-50 border-orange-500 text-orange-700 shadow-md"
                            : "bg-white border-slate-100 text-slate-400 hover:border-slate-300"
                        }`}
                      >
                        <input
                          type="radio"
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
                        <span className="font-black text-xl">Ath Movil</span>
                      </label>

                      <label
                        className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all active:scale-95 ${
                          formData.payment_method === "tarjeta"
                            ? "bg-teal-50 border-teal-500 text-teal-700 shadow-md"
                            : "bg-white border-slate-100 text-slate-400 hover:border-slate-300"
                        }`}
                      >
                        <input
                          type="radio"
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
                        <span className="font-black text-xl">Tarjeta</span>
                      </label>
                    </div>

                    <Button
                      onClick={() => {
                        toast.success("Pago exitoso", {
                          description: "Su orden médica ha sido procesada.",
                        });
                        clearCart();
                        router.push("/perfil?tab=orders");
                      }}
                      className="w-full h-16 bg-[#0D4B4D] hover:bg-[#093638] text-white rounded-2xl font-black text-xl shadow-xl shadow-[#0D4B4D]/20 active:scale-98"
                    >
                      PAGAR AHORA
                    </Button>

                    <button
                      onClick={() => setCurrentStep("details")}
                      className="w-full text-slate-400 text-sm font-bold hover:text-[#0D4B4D] transition-colors flex items-center justify-center gap-2"
                    >
                      <RiArrowLeftLine /> Volver a detalles
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageWrapper>
  );
}
