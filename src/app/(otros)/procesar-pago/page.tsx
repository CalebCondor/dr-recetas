"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import {
  RiLoader4Line,
  RiCheckboxCircleLine,
  RiErrorWarningLine,
  RiArrowLeftLine,
} from "react-icons/ri";
import { Button } from "@/components/ui/button";

export default function ProcesarPagoPage() {
  const router = useRouter();
  const { clearCart } = useCart();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("Finalizando tu orden...");
  const [orderInfo, setOrderInfo] = useState<{
    cp_code: string;
    email: string;
    ordenes_enviadas: number;
  } | null>(null);

  useEffect(() => {
    const processOrder = async () => {
      // Small delay for UX
      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        const storedData = sessionStorage.getItem("dr_order_data");
        console.log("PROCESAR PAGO - Stored Data:", storedData);

        if (!storedData) {
          setStatus("error");
          setMessage(
            "No se encontraron datos de la orden. Por favor intenta realizar la compra nuevamente.",
          );
          return;
        }

        const { cp_code, token } = JSON.parse(storedData);

        if (!cp_code || !token) {
          throw new Error("Datos de orden incompletos.");
        }

        setMessage("Confirmando orden con el sistema...");

        // Call enviar_orden.php with token in URL and cp_code in body
        const response = await fetch(
          `https://doctorrecetas.com/api/enviar_orden.php?token=${token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Also sending Bearer just in case, standard practice
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              cp_code: cp_code,
            }),
          },
        );

        const text = await response.text();
        let data;

        try {
          data = JSON.parse(text);
        } catch (e) {
          throw new Error(
            "Respuesta inválida del servidor: " + text.substring(0, 50),
          );
        }

        if (response.ok && data.success) {
          setStatus("success");
          setMessage("Tu orden ha sido enviada exitosamente.");
          setOrderInfo({
            cp_code: data.cp_code,
            email: data.email,
            ordenes_enviadas: data.ordenes_enviadas,
          });

          // Clear session data and cart
          sessionStorage.removeItem("dr_order_data");
          clearCart();
        } else {
          throw new Error(data.message || "Error al enviar la orden");
        }
      } catch (error) {
        console.error("Order Error:", error);
        setStatus("error");
        setMessage(
          error instanceof Error
            ? error.message
            : "Ocurrió un error inesperado al finalizar la orden.",
        );
      }
    };

    processOrder();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 text-center space-y-8 animate-in fade-in zoom-in duration-500">
        {status === "loading" && (
          <>
            <div className="relative mx-auto w-24 h-24">
              <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-[#0D4B4D] border-r-[#0D4B4D] border-b-transparent border-l-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <RiLoader4Line
                  className="text-[#0D4B4D] animate-pulse"
                  size={32}
                />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-black text-[#0D4B4D]">
                Procesando Pedido
              </h1>
              <p className="text-slate-500 font-medium">{message}</p>
            </div>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mx-auto w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4 animate-[bounce_1s_ease-in-out_1]">
              <RiCheckboxCircleLine size={56} />
            </div>
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-black text-[#0D4B4D]">
                  ¡Orden Completada!
                </h1>
                <p className="text-slate-500 mt-2 font-medium">
                  Hemos enviado la confirmación a: <br />
                  <span className="font-bold text-slate-700">
                    {orderInfo?.email}
                  </span>
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <p className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">
                  Código de Orden
                </p>
                <p className="font-mono text-xl text-[#0D4B4D] font-black tracking-wider">
                  {orderInfo?.cp_code}
                </p>
              </div>
            </div>

            <Button
              onClick={() => router.push("/perfil?tab=orders")}
              className="w-full h-14 bg-[#0D4B4D] hover:bg-[#093638] text-white rounded-xl font-bold text-lg shadow-lg shadow-[#0D4B4D]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Ver Mis Órdenes
            </Button>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mx-auto w-24 h-24 rounded-full bg-red-100 flex items-center justify-center text-red-500 mb-4">
              <RiErrorWarningLine size={56} />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-black text-slate-800">
                Error en la Orden
              </h1>
              <p className="text-red-500 font-medium bg-red-50 p-4 rounded-xl border border-red-100 text-sm">
                {message}
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <p className="text-xs text-slate-400">
                Si el problema persiste, contacta a soporte con tu ID de pago.
              </p>
              <Button
                onClick={() => router.push("/perfil")}
                variant="outline"
                className="w-full h-14 bg-white border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl font-bold text-lg transition-all"
              >
                <RiArrowLeftLine className="mr-2" />
                Ir a mi Perfil
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
