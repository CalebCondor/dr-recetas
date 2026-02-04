"use client";

import React, { useState, useEffect } from "react";
import { PageWrapper } from "@/components/page-wrapper";
import { useCart } from "@/context/cart-context";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Componentes extraídos
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
                    description: "Su orden médica ha sido procesada.",
                  });
                  clearCart();
                  router.push("/perfil?tab=orders");
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageWrapper>
  );
}
