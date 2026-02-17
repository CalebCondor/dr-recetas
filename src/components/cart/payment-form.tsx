import {
  RiArrowLeftLine,
  RiBankCardLine,
  RiShieldCheckLine,
  RiErrorWarningLine,
  RiLoader4Line,
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
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useTranslations, useMessages } from "next-intl";

interface PaymentFormProps {
  cart: CartItem[];
  formData: CartFormData;
  setFormData: (data: CartFormData) => void;
  purchaseId: string;
  total: number;
  onBack: () => void;
  onComplete?: () => void;
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
  const t = useTranslations("Cart.Payment");
  const tServices = useTranslations("ServicesPage");
  const tDynamic = useTranslations("DynamicServices");
  const messages = useMessages();
  const itemsMessages = (messages as any)?.ServicesPage?.Items || {};

  const getTranslatedItem = (item: CartItem) => {
    let title = item.titulo;

    // Helper to find slug from messages if missing in item
    const lookupSlug = item.slug || Object.keys(itemsMessages).find(key => key.endsWith(`-${item.id}`));

    // Translate Title
    if (lookupSlug && tServices.has(`Items.${lookupSlug}.title`)) {
      title = tServices(`Items.${lookupSlug}.title`);
    } else if (tDynamic.has(`service_${item.id}.title`)) {
      title = tDynamic(`service_${item.id}.title`);
    } else if (tDynamic.has(`${item.id}.title`)) {
      title = tDynamic(`${item.id}.title`);
    }

    return { title };
  };
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

  const isAthSelected = formData.payment_method === "ath";
  const isTarjetaSelected = formData.payment_method === "tarjeta";

  // Helper function to convert server errors to friendly messages
  const getFriendlyErrorMessage = (error: string): string => {
    const lowerError = error.toLowerCase();

    if (lowerError.includes("declined") || lowerError.includes("rechazada")) {
      return t("errors.declined");
    }
    if (
      lowerError.includes("insufficient funds") ||
      lowerError.includes("fondos insuficientes")
    ) {
      return t("errors.insufficient");
    }
    if (
      lowerError.includes("expired") ||
      lowerError.includes("expirada") ||
      lowerError.includes("vencida")
    ) {
      return t("errors.expired");
    }
    if (
      lowerError.includes("invalid card") ||
      lowerError.includes("tarjeta inválida")
    ) {
      return t("errors.invalid");
    }
    if (
      lowerError.includes("cvc") ||
      lowerError.includes("cvv") ||
      lowerError.includes("security code")
    ) {
      return t("errors.cvc");
    }
    if (
      lowerError.includes("network") ||
      lowerError.includes("connection") ||
      lowerError.includes("timeout")
    ) {
      return t("errors.network");
    }
    if (lowerError.includes("servidor") || lowerError.includes("server")) {
      return t("errors.server");
    }

    // Default friendly message
    return t("errors.default");
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleATHSuccess = useCallback(
    async (athResponse: {
      status: string;
      data?: { cp_code?: string;[key: string]: unknown };
      referenceNumber?: string;
      [key: string]: unknown;
    }) => {
      setIsProcessing(true);

      const storedUser = localStorage.getItem("dr_user");
      if (!storedUser) {
        toast.error(t("errors.sessionExpired"));
        setIsProcessing(false);
        return;
      }

      const { token } = JSON.parse(storedUser);

      const payload = {
        pq_id: cart.map((item: CartItem) => parseInt(item.id)),
        anombre_de: cart.map(
          (item: CartItem) =>
            formData.order_names[item.id] || formData.nombre_completo,
        ),
        pq_precio: total,
        metodo_pago: "ath",
        ath_data: athResponse,
      };

      try {
        const response = await fetch(
          "https://doctorrecetas.com/api/pagar.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          },
        );

        const text = await response.text();

        if (!response.ok) {
          setErrorMessage("Error procesando pago con ATH Móvil: " + text);
          setShowErrorModal(true);
          setIsProcessing(false);
          return;
        }

        const data = JSON.parse(text);
        if (data.success) {
          const cpCode = data.data?.cp_code || data.cp_code;
          sessionStorage.setItem(
            "dr_order_data",
            JSON.stringify({
              cp_code: cpCode,
              token: token,
            }),
          );
          if (onComplete) onComplete();
          router.push("/procesar-pago");
        } else {
          setErrorMessage(
            data.message || "Error al procesar pago con ATH Móvil",
          );
          setShowErrorModal(true);
        }
      } catch (error) {
        console.error("ATH Success Backend error:", error);
        setErrorMessage(t("errors.network"));
        setShowErrorModal(true);
      } finally {
        setIsProcessing(false);
      }
    },
    [cart, formData, total, router, onComplete, t],
  );

  // Configure ATHM Globals
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Tipos específicos para evitar errores de lint y mejorar la seguridad
      const win = window as unknown as Window & {
        ATHM_Checkout: Record<string, unknown>;
        authorizationATHM: (response: unknown) => Promise<void>;
        cancelATHM: () => Promise<void>;
        expiredATHM: () => Promise<void>;
        authorization?: () => Promise<unknown>;
      };

      // NOTA: Para el Modal JS se debe usar env: "production" incluso en pruebas,
      // y controlar el modo con el flag 'sandbox: true' y el token correspondiente.
      const isSandboxMode = true;

      win.ATHM_Checkout = {
        env: "production",
        publicToken: "54227b700bb036f91a3a7bca06479230f0d92524",
        sandboxToken: "sandboxtoken01875617264",
        orderType: "payment",
        sandbox: isSandboxMode,
        sandboxMode: isSandboxMode, // Mantener ambos por compatibilidad
        timeout: 600,
        theme: "btn",
        lang: "es",
        total: total.toFixed(2),
        subtotal: total.toFixed(2),
        tax: "0.00",
        metadata1: purchaseId,
        metadata2: formData.nombre_completo,
        items: cart.map((item: CartItem) => ({
          name: getTranslatedItem(item).title,
          description: getTranslatedItem(item).title,
          quantity: "1",
          price: parseFloat(item.precio).toFixed(2),
          tax: "0.00",
          metadata: item.id,
        })),
        phoneNumber: "",
      };

      // Callback de éxito para ATH Móvil
      win.authorizationATHM = async (responseJSON: unknown) => {
        try {
          // El script de ATH Móvil usualmente pasa la respuesta como argumento.
          if (responseJSON) {
            handleATHSuccess(
              responseJSON as {
                status: string;
                data?: { cp_code?: string };
                referenceNumber?: string;
              },
            );
          } else {
            // Backup por si se usa una versión que no pasa el argumento directamente
            const authFunc = win.authorization;
            if (typeof authFunc === "function") {
              const responseAuth = await authFunc();
              handleATHSuccess(
                responseAuth as {
                  status: string;
                  data?: { cp_code?: string };
                  referenceNumber?: string;
                },
              );
            } else {
              console.error("ATH authorization response not found");
            }
          }
        } catch (error) {
          console.error("Error in authorizationATHM:", error);
        }
      };

      win.cancelATHM = async () => {
        toast.error(t("errors.athCancel"));
      };

      win.expiredATHM = async () => {
        toast.error(t("errors.athExpired"));
      };
    }
  }, [total, cart, purchaseId, formData.nombre_completo, handleATHSuccess, t]);

  // Inject Script when selected
  useEffect(() => {
    if (typeof window !== "undefined" && isAthSelected) {
      const id = "ath-script";
      const existingScript = document.getElementById(id);

      if (existingScript) {
        // Si ya existe, no lo volvemos a inyectar para evitar el error:
        // "Uncaught SyntaxError: Identifier '_0x1f5570' has already been declared"
        return;
      }

      const script = document.createElement("script");
      script.id = id;

      // NOTA: ATH Móvil no tiene un script de sandbox separado para el Modal JS.
      // Se debe usar siempre el de producción y controlar el modo con el token y el flag 'sandbox'.
      const baseUrl =
        "https://payments.athmovil.com/api/modal/js/athmovil_base.js";

      // Eliminamos el t=Date.now() para evitar re-ejecuciones innecesarias en cada render
      script.src = baseUrl;
      script.async = true;
      document.body.appendChild(script);
    }
  }, [isAthSelected]);

  const handlePayment = () => {
    if (formData.payment_method === "tarjeta") {
      setShowCardModal(true);
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
      toast.error(t("errors.sessionExpired"));
      return;
    }

    const { token } = JSON.parse(storedUser);

    // Split expiry MM/YY
    const [month, yearShort] = cardData.expiry.split("/").map((s) => s.trim());
    if (!month || !yearShort) {
      toast.error(t("errors.invalidDate"));
      return;
    }
    const year = yearShort.length === 2 ? `20${yearShort}` : yearShort;

    const payload = {
      pq_id: cart.map((item: CartItem) => parseInt(item.id)),
      anombre_de: cart.map(
        (item: CartItem) =>
          formData.order_names[item.id] || formData.nombre_completo,
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
        setErrorMessage(t("errors.default"));
        setShowErrorModal(true);
        setIsProcessing(false);
        return;
      }

      try {
        const data = JSON.parse(text);
        if (data.success) {
          console.log("PAYMENT API RESPONSE:", data);

          // Extract cp_code from nested data object or root
          const cpCode = data.data?.cp_code || data.cp_code;

          if (!cpCode) {
            toast.error(t("errors.invalidOrderCode", { id: purchaseId }));
            console.error("Missing cp_code in response:", data);

            setIsProcessing(false);
            return;
          }

          // Success! Redirect to processing page to send order
          sessionStorage.setItem(
            "dr_order_data",
            JSON.stringify({
              cp_code: cpCode,
              token: token,
            }),
          );

          if (onComplete) onComplete();
          setIsProcessing(false);
          setShowCardModal(false);
          router.push("/procesar-pago");
        } else {
          const friendlyMessage = getFriendlyErrorMessage(data.message || "");
          setErrorMessage(friendlyMessage);
          setShowErrorModal(true);
          setIsProcessing(false);
        }
      } catch {
        console.error("Payment JSON parse error");
        setErrorMessage(t("errors.default"));
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
          {t("title")}
        </h2>
        <Stepper current={3} />
      </div>

      <div className="mx-auto space-y-10">
        <div className="border border-slate-100 rounded-3xl overflow-hidden bg-white shadow-sm">
          <div className="bg-[#0D4B4D] p-6 text-center text-white">
            <span className="text-[10px] uppercase font-bold tracking-widest opacity-60 block mb-1">
              {t("orderSummary")}
            </span>
            <p className="text-2xl font-black">{purchaseId}</p>
          </div>
          <div className="p-8 space-y-6">
            <div className="divide-y divide-slate-50">
              {cart.map((item: CartItem) => (
                <div
                  key={item.id}
                  className="py-4 flex justify-between items-center text-sm"
                >
                  <div>
                    <p className="font-bold text-[#0D4B4D]">{getTranslatedItem(item).title}</p>
                    <span className="text-[10px] text-slate-400">
                      {t("patientLabel", {
                        name:
                          formData.order_names[item.id] ||
                          formData.nombre_completo,
                      })}
                    </span>
                  </div>
                  <span className="font-black text-[#0D4B4D] text-xl">
                    ${parseFloat(item.precio).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
              <span className="text-xl font-black text-[#0D4B4D]">{t("totalLabel")}</span>
              <span className="text-xl font-black text-[#0D4B4D]">
                ${total.toFixed(2)} USD
              </span>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 space-y-8">
          <h4 className="text-center font-bold text-[#0D4B4D] text-lg">
            {t("methodTitle")}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label
              onClick={() =>
                setFormData({ ...formData, payment_method: "ath" })
              }
              className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all active:scale-95 ${formData.payment_method === "ath"
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
                {t("athLabel")}
              </span>
            </label>

            <label
              onClick={() =>
                setFormData({ ...formData, payment_method: "tarjeta" })
              }
              className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all active:scale-95 ${formData.payment_method === "tarjeta"
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
              <span className="font-bold text-base text-teal-600">{t("cardLabel")}</span>
            </label>
          </div>

          <div className="min-h-[80px] flex items-center justify-center">
            {/* Div siempre presente para que el script lo encuentre más fácilmente */}
            <div
              id="ATHMovil_Checkout_Button_payment"
              className={`w-full flex flex-col items-center gap-3 ${isAthSelected ? "block" : "hidden"}`}
            >
              {/* El script de ATH Móvil reemplazará este contenido */}
              <div className="flex flex-col items-center gap-2 py-4">
                <RiLoader4Line
                  className="text-orange-500 animate-spin"
                  size={24}
                />
                <p className="text-xs text-slate-400 font-medium">
                  {t("athLoading")}
                </p>
              </div>
            </div>

            {isTarjetaSelected && (
              <Button
                onClick={handlePayment}
                className="w-full h-14 bg-[#0D4B4D] hover:bg-[#093638] text-white rounded-xl font-bold text-lg shadow-lg shadow-[#0D4B4D]/20 active:scale-98 transition-all"
              >
                {t("cardButton")}
              </Button>
            )}

            {!isAthSelected && !isTarjetaSelected && (
              <Button
                disabled
                className="w-full h-14 bg-slate-200 text-slate-400 rounded-xl font-bold text-lg cursor-not-allowed"
              >
                {t("noMethodSelected")}
              </Button>
            )}
          </div>

          <Dialog open={showCardModal} onOpenChange={setShowCardModal}>
            <DialogContent
              aria-describedby={undefined}
              className="max-w-md w-[92vw] sm:w-full rounded-[2rem] p-0 overflow-hidden border-none shadow-2xl bg-white"
            >
              <DialogHeader className="bg-[#0D4B4D] p-6 sm:p-8 text-white relative">
                <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-10 pointer-events-none">
                  <RiBankCardLine size={isMobile ? 80 : 120} />
                </div>
                <DialogTitle className="text-xl sm:text-2xl font-black text-white mb-1">
                  {t("cardModal.title")}
                </DialogTitle>
                <p className="text-emerald-100/60 text-[10px] sm:text-xs font-medium uppercase tracking-widest">
                  {t("cardModal.subtitle")}
                </p>
              </DialogHeader>

              <form
                onSubmit={handleCardSubmit}
                className="p-6 sm:p-8 space-y-5 sm:y-6 bg-white"
              >
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">
                      {t("cardModal.number")}
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
                        {t("cardModal.expiry")}
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
                        {t("cardModal.cvc")}
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
                      {t("cardModal.name")}
                    </label>
                    <Input
                      required
                      placeholder={t("cardModal.namePlaceholder")}
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
                    {t("cardModal.shieldHint")}
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full h-14 bg-[#0D4B4D] hover:bg-[#093638] text-white rounded-xl font-bold text-lg shadow-lg active:scale-[0.98] transition-transform"
                >
                  {isProcessing
                    ? t("cardModal.processing")
                    : t("cardModal.submit", { total: total.toFixed(2) })}
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          {/* Error Modal */}
          <Dialog open={showErrorModal} onOpenChange={setShowErrorModal}>
            <DialogContent
              aria-describedby={undefined}
              className="max-w-sm w-[90vw] sm:w-full rounded-[2rem] p-0 overflow-hidden border-none shadow-2xl bg-white"
            >
              <div className="p-8 text-center space-y-6">
                <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                  <RiErrorWarningLine className="text-red-500" size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-800">
                    {t("errorModal.title")}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {errorMessage}
                  </p>
                </div>
                <Button
                  onClick={() => setShowErrorModal(false)}
                  className="w-full h-12 bg-[#0D4B4D] hover:bg-[#093638] text-white rounded-xl font-bold shadow-md"
                >
                  {t("errorModal.button")}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <button
            onClick={onBack}
            className="w-full text-slate-400 text-sm font-bold hover:text-[#0D4B4D] transition-colors flex items-center justify-center gap-2"
          >
            <RiArrowLeftLine /> {t("back")}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
