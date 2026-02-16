"use client";

import React, { useState, useEffect } from "react";
import { PageWrapper } from "@/components/page-wrapper";
import { useCart } from "@/context/cart-context";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { EmptyCart } from "@/components/cart/empty-cart";
import { CartReview } from "@/components/cart/cart-review";
import { PersonalInfoForm } from "@/components/cart/personal-info-form";
import { OrderDetails } from "@/components/cart/order-details";
import { PaymentForm } from "@/components/cart/payment-form";

type Step = "review" | "personal" | "details" | "payment";

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
    email: "",
    identificacion_archivo: null as File | null,
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

        // Normalize Date Format for <input type="date" /> (expects YYYY-MM-DD)
        const normalizeDate = (dateStr: string | undefined | null) => {
          if (!dateStr || typeof dateStr !== "string") return "";
          // If already YYYY-MM-DD
          if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
          // If it's DD/MM/YYYY
          if (dateStr.includes("/")) {
            const parts = dateStr.split("/");
            if (parts.length === 3) {
              const day = parts[0].padStart(2, "0");
              const month = parts[1].padStart(2, "0");
              const year = parts[2].length === 4 ? parts[2] : `20${parts[2]}`;
              return `${year}-${month}-${day}`;
            }
          }
          // If it has time, take only date part
          if (dateStr.includes(" ")) {
            const datePart = dateStr.split(" ")[0];
            if (datePart.includes("-")) return datePart;
          }
          return dateStr;
        };

        // Pre-fill with extreme robust mapping to catch all API variations
        setFormData((prev) => ({
          ...prev,
          nombre_completo:
            parsed.us_nombres ||
            parsed.us_nombre ||
            parsed.nombres ||
            parsed.nombre ||
            prev.nombre_completo,
          telefono:
            parsed.us_telefono ||
            parsed.telefono ||
            parsed.us_tel ||
            prev.telefono,
          municipio:
            parsed.us_municipio ||
            parsed.us_ciudad ||
            parsed.municipio ||
            parsed.ciudad ||
            prev.municipio,
          direccion:
            parsed.us_direccion ||
            parsed.direccion ||
            parsed.us_dir ||
            prev.direccion,
          fecha_nacimiento: normalizeDate(
            parsed.us_fech_nac ||
              parsed.fecha_nacimiento ||
              parsed.us_fecha_nac,
          ),
          pais:
            parsed.us_pais || parsed.pais || parsed.us_country || "Puerto Rico",
          codigo_postal:
            parsed.us_code_postal ||
            parsed.us_cod_postal ||
            parsed.codigo_postal ||
            parsed.zip_code ||
            prev.codigo_postal,
          email: parsed.us_email || parsed.email || prev.email,
          tipo_documento:
            parsed.us_tipo_doc || parsed.tipo_documento || prev.tipo_documento,
          numero_documento:
            parsed.us_documento ||
            parsed.numero_documento ||
            prev.numero_documento,
        }));
      } catch (e) {
        console.error("Error loading user for checkout", e);
      }
    });
  }, [router]);

  if (cart.length === 0 && currentStep === "review") {
    return <EmptyCart />;
  }

  return (
    <PageWrapper>
      <div className="min-h-screen bg-white pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatePresence mode="wait">
            {currentStep === "review" && (
              <CartReview
                cart={cart}
                total={total}
                removeFromCart={removeFromCart}
                onContinue={() => setCurrentStep("personal")}
              />
            )}

            {currentStep === "personal" && (
              <PersonalInfoForm
                formData={formData}
                setFormData={setFormData}
                onBack={() => setCurrentStep("review")}
                onContinue={() => setCurrentStep("details")}
              />
            )}

            {currentStep === "details" && (
              <OrderDetails
                cart={cart}
                formData={formData}
                setFormData={setFormData}
                advisorCode={advisorCode}
                setAdvisorCode={setAdvisorCode}
                total={total}
                onBack={() => setCurrentStep("personal")}
                onContinue={() => setCurrentStep("payment")}
              />
            )}

            {currentStep === "payment" && (
              <PaymentForm
                cart={cart}
                formData={formData}
                setFormData={setFormData}
                purchaseId={purchaseId}
                total={total}
                onBack={() => setCurrentStep("details")}
                onComplete={() => {
                  toast.success("Pago exitoso", {
                    description: "Su orden ha sido procesada.",
                  });
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageWrapper>
  );
}
