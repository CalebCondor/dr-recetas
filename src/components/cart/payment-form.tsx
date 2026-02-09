import {
  RiArrowLeftLine,
  RiBankCardLine,
  RiShieldCheckLine,
  RiErrorWarningLine,
} from "react-icons/ri";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CartItem } from "@/context/cart-context";
import { CartFormData } from "./types";
import { Stepper } from "./stepper";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
}: PaymentFormProps) => {
  const router = useRouter();
  const [showCardModal, setShowCardModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  // Helper function to convert server errors to friendly messages
  const getFriendlyErrorMessage = (error: string): string => {
    const lowerError = error.toLowerCase();

    if (lowerError.includes("declined") || lowerError.includes("rechazada")) {
      return "Tu tarjeta ha sido rechazada. Por favor verifica los datos o intenta con otra tarjeta.";
    }
    if (
      lowerError.includes("insufficient funds") ||
      lowerError.includes("fondos insuficientes")
    ) {
      return "Fondos insuficientes en la tarjeta. Por favor intenta con otro método de pago.";
    }
    if (
      lowerError.includes("expired") ||
      lowerError.includes("expirada") ||
      lowerError.includes("vencida")
    ) {
      return "Tu tarjeta ha expirado. Por favor utiliza una tarjeta vigente.";
    }
    if (
      lowerError.includes("invalid card") ||
      lowerError.includes("tarjeta inválida")
    ) {
      return "Número de tarjeta inválido. Por favor verifica los datos ingresados.";
    }
    if (
      lowerError.includes("cvc") ||
      lowerError.includes("cvv") ||
      lowerError.includes("security code")
    ) {
      return "El código de seguridad (CVC) es incorrecto. Por favor verifica e intenta de nuevo.";
    }
    if (
      lowerError.includes("network") ||
      lowerError.includes("connection") ||
      lowerError.includes("timeout")
    ) {
      return "Error de conexión. Por favor verifica tu internet e intenta de nuevo.";
    }
    if (lowerError.includes("servidor") || lowerError.includes("server")) {
      return "Hubo un problema al procesar tu pago. Por favor intenta de nuevo en unos minutos.";
    }

    // Default friendly message
    return "No se pudo procesar el pago. Por favor verifica los datos de tu tarjeta e intenta de nuevo.";
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlePayment = () => {
    if (formData.payment_method === "tarjeta") {
      setShowCardModal(true);
    } else {
      // Si es ATH u otro método, por ahora simulamos completar
      onComplete();
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessing) return;

    const storedUser = localStorage.getItem("dr_user");
    if (!storedUser) {
      toast.error("Sesión expirada", {
        description: "Por favor inicie sesión nuevamente.",
      });
      return;
    }

    const { token } = JSON.parse(storedUser);

    // Split expiry MM/YY
    const [month, yearShort] = cardData.expiry.split("/").map((s) => s.trim());
    if (!month || !yearShort) {
      toast.error("Fecha inválida", {
        description: "Use el formato MM/YY",
      });
      return;
    }
    const year = yearShort.length === 2 ? `20${yearShort}` : yearShort;

    const payload = {
      pq_id: cart.map((item) => parseInt(item.id)),
      anombre_de: cart.map(
        (item) => formData.order_names[item.id] || formData.nombre_completo,
      ),
      pq_precio: total,
      card_number: cardData.number.replace(/\s/g, ""),
      card_exp_month: month,
      card_exp_year: year,
      card_cvc: cardData.cvc,
      card_name: cardData.name,
    };

    setIsProcessing(true);

    try {
      const response = await fetch("https://doctorrecetas.com/api/pagar.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const text = await response.text();

      if (!response.ok) {
        const friendlyMessage = getFriendlyErrorMessage(text);
        setErrorMessage(friendlyMessage);
        setShowErrorModal(true);
        setIsProcessing(false);
        return;
      }

      if (!text || text.trim() === "") {
        setErrorMessage(
          "Hubo un problema al procesar tu pago. Por favor intenta de nuevo.",
        );
        setShowErrorModal(true);
        setIsProcessing(false);
        return;
      }

      try {
        const data = JSON.parse(text);

        // Log completo de la respuesta ANTES de procesar
        console.log(
          "🔵 PAYMENT API RESPONSE (RAW):",
          JSON.stringify(data, null, 2),
        );
        console.log("🔵 PAYMENT API RESPONSE (OBJECT):", data);

        if (data.success) {
          // Intentar múltiples formas de extraer cp_code
          const cpCode =
            data.data?.cp_code ||
            data.cp_code ||
            data.data?.cpCode ||
            data.cpCode ||
            null;

          console.log("🔵 Extracted cp_code:", cpCode);
          console.log("🔵 Data structure check:", {
            "data.data?.cp_code": data.data?.cp_code,
            "data.cp_code": data.cp_code,
            "data.data exists": !!data.data,
            "data.data type": typeof data.data,
          });

          // Validar que cp_code existe y no está vacío
          if (!cpCode || (typeof cpCode === "string" && cpCode.trim() === "")) {
            console.error("❌ ERROR: cp_code no encontrado o vacío");
            console.error("❌ Full response structure:", data);
            toast.error("Error API: No se recibió código de orden (cp_code)", {
              description: "Por favor contacta a soporte. ID: " + purchaseId,
            });
            setIsProcessing(false);
            return;
          }

          // Preparar datos para guardar (solo cp_code, token se lee desde localStorage)
          const orderData = {
            cp_code: String(cpCode).trim(),
          };

          console.log("🔵 Guardando en sessionStorage:", orderData);

          // Guardar en sessionStorage con verificación
          try {
            sessionStorage.setItem("dr_order_data", JSON.stringify(orderData));

            // Verificar que se guardó correctamente
            const verifyStored = sessionStorage.getItem("dr_order_data");
            const verifyParsed = verifyStored ? JSON.parse(verifyStored) : null;

            console.log(
              "✅ Verificación sessionStorage guardado:",
              verifyParsed,
            );

            if (!verifyParsed || verifyParsed.cp_code !== orderData.cp_code) {
              throw new Error("Error al guardar datos en sessionStorage");
            }

            console.log(
              "✅ cp_code guardado correctamente:",
              verifyParsed.cp_code,
            );
          } catch (storageError) {
            console.error(
              "❌ ERROR al guardar en sessionStorage:",
              storageError,
            );
            toast.error("Error al guardar datos de la orden", {
              description: "Por favor intenta de nuevo o contacta a soporte.",
            });
            setIsProcessing(false);
            return;
          }

          // Success! Redirect to processing page to send order
          setIsProcessing(false);
          setShowCardModal(false);
          router.push("/procesar-pago");
        } else {
          const friendlyMessage = getFriendlyErrorMessage(data.message || "");
          setErrorMessage(friendlyMessage);
          setShowErrorModal(true);
          setIsProcessing(false);
        }
      } catch (parseErr) {
        console.error("❌ Payment JSON parse error:", parseErr);
        console.error("❌ Response text:", text);
        setErrorMessage(
          "Hubo un problema al procesar tu pago. Por favor intenta de nuevo.",
        );
        setShowErrorModal(true);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Payment fatal error:", error);
      const errorMsg =
        error instanceof Error ? error.message : "Error desconocido";
      const friendlyMessage = getFriendlyErrorMessage(errorMsg);
      setErrorMessage(friendlyMessage);
      setShowErrorModal(true);
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      key="payment"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="space-y-10"
    >
      <div className="text-center">
        <h2 className="text-3xl font-black text-[#0D4B4D] mb-6">
          Finalizar Pago
        </h2>
        <Stepper current={3} />
      </div>

      <div className="mx-auto space-y-10">
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
                      {formData.order_names[item.id] ||
                        formData.nombre_completo}
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
              onClick={() =>
                setFormData({ ...formData, payment_method: "ath" })
              }
              className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all active:scale-95 ${
                formData.payment_method === "ath"
                  ? "bg-orange-50 border-orange-500 text-orange-700 shadow-sm"
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
              <span className="font-bold text-base text-orange-600">
                Ath Movil
              </span>
            </label>

            <label
              onClick={() =>
                setFormData({ ...formData, payment_method: "tarjeta" })
              }
              className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all active:scale-95 ${
                formData.payment_method === "tarjeta"
                  ? "bg-teal-50 border-teal-500 text-teal-700 shadow-sm"
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
              <span className="font-bold text-base text-teal-600">Tarjeta</span>
            </label>
          </div>

          <Button
            onClick={handlePayment}
            className="w-full h-14 bg-[#0D4B4D] hover:bg-[#093638] text-white rounded-xl font-bold text-lg shadow-lg shadow-[#0D4B4D]/20 active:scale-98"
          >
            {formData.payment_method === "tarjeta"
              ? "CONTINUAR CON TARJETA"
              : "PAGAR AHORA"}
          </Button>

          <Dialog open={showCardModal} onOpenChange={setShowCardModal}>
            <DialogContent className="max-w-md w-[92vw] sm:w-full rounded-[2rem] p-0 overflow-hidden border-none shadow-2xl bg-white">
              <DialogHeader className="bg-[#0D4B4D] p-6 sm:p-8 text-white relative">
                <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-10 pointer-events-none">
                  <RiBankCardLine size={isMobile ? 80 : 120} />
                </div>
                <DialogTitle className="text-xl sm:text-2xl font-black text-white mb-1">
                  Datos de Tarjeta
                </DialogTitle>
                <p className="text-emerald-100/60 text-[10px] sm:text-xs font-medium uppercase tracking-widest">
                  Pago Seguro Encriptado
                </p>
              </DialogHeader>

              <form
                onSubmit={handleCardSubmit}
                className="p-6 sm:p-8 space-y-5 sm:y-6 bg-white"
              >
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">
                      Número de Tarjeta
                    </label>
                    <div className="relative">
                      <Input
                        required
                        placeholder="0000 0000 0000 0000"
                        value={cardData.number}
                        onChange={(e) =>
                          setCardData({
                            ...cardData,
                            number: formatCardNumber(e.target.value),
                          })
                        }
                        maxLength={19}
                        className="h-12 rounded-xl bg-slate-50 border-slate-100 font-medium text-sm sm:text-base"
                      />
                      <RiBankCardLine className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">
                        Expiración
                      </label>
                      <Input
                        required
                        placeholder="MM/YY"
                        value={cardData.expiry}
                        onChange={(e) =>
                          setCardData({
                            ...cardData,
                            expiry: formatExpiry(e.target.value),
                          })
                        }
                        maxLength={5}
                        className="h-12 rounded-xl bg-slate-50 border-slate-100 font-medium text-sm sm:text-base"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">
                        CVC
                      </label>
                      <Input
                        required
                        placeholder="***"
                        value={cardData.cvc}
                        onChange={(e) =>
                          setCardData({ ...cardData, cvc: e.target.value })
                        }
                        maxLength={4}
                        className="h-12 rounded-xl bg-slate-50 border-slate-100 font-medium text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">
                      Nombre en Tarjeta
                    </label>
                    <Input
                      required
                      placeholder="TITULAR DE LA TARJETA"
                      value={cardData.name}
                      onChange={(e) =>
                        setCardData({
                          ...cardData,
                          name: e.target.value.toUpperCase(),
                        })
                      }
                      className="h-12 rounded-xl bg-slate-50 border-slate-100 font-medium uppercase text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="bg-emerald-50/50 p-4 rounded-xl flex items-center gap-3 border border-emerald-100/50">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <RiShieldCheckLine size={18} />
                  </div>
                  <p className="text-[10px] text-emerald-700 font-bold leading-tight">
                    Su información está protegida por encriptación de grado
                    bancario.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full h-14 bg-[#0D4B4D] hover:bg-[#093638] text-white rounded-xl font-bold text-lg shadow-lg active:scale-[0.98] transition-transform"
                >
                  {isProcessing
                    ? "Procesando..."
                    : `PAGAR $${total.toFixed(2)}`}
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          {/* Error Modal */}
          <Dialog open={showErrorModal} onOpenChange={setShowErrorModal}>
            <DialogContent className="max-w-sm w-[90vw] sm:w-full rounded-[2rem] p-0 overflow-hidden border-none shadow-2xl bg-white">
              <div className="p-8 text-center space-y-6">
                <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                  <RiErrorWarningLine className="text-red-500" size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-800">
                    Error en el Pago
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {errorMessage}
                  </p>
                </div>
                <Button
                  onClick={() => setShowErrorModal(false)}
                  className="w-full h-12 bg-[#0D4B4D] hover:bg-[#093638] text-white rounded-xl font-bold shadow-md"
                >
                  Entendido
                </Button>
              </div>
            </DialogContent>
          </Dialog>

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
};
