import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartItem } from "@/context/cart-context";
import { useTranslations, useMessages } from "next-intl";

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
}: OrderDetailsProps) => {
  const t = useTranslations("Cart.Details");
  const tServices = useTranslations("ServicesPage");
  const tDynamic = useTranslations("DynamicServices");
  const messages = useMessages();
  const itemsMessages = (messages as any)?.ServicesPage?.Items || {};

  const getTranslatedItem = (item: CartItem) => {
    let title = item.titulo;
    let detail = item.detalle;

    // Helper to find slug from messages if missing in item
    const lookupSlug = item.slug || Object.keys(itemsMessages).find(key => key.endsWith(`-${item.id}`));

    // Translate Title and Detail
    // 1. Try by slug (static items)
    if (lookupSlug && tServices.has(`Items.${lookupSlug}.title`)) {
      title = tServices(`Items.${lookupSlug}.title`);
      if (tServices.has(`Items.${lookupSlug}.description`)) {
        detail = tServices(`Items.${lookupSlug}.description`);
      }
    }
    // 2. Try dynamic service fallback (service_ID)
    else if (tDynamic.has(`service_${item.id}.title`)) {
      title = tDynamic(`service_${item.id}.title`);
      if (tDynamic.has(`service_${item.id}.description`)) {
        detail = tDynamic(`service_${item.id}.description`);
      }
    }
    // 3. Try legacy/direct ID match
    else if (tDynamic.has(`${item.id}.title`)) {
      title = tDynamic(`${item.id}.title`);
      if (tDynamic.has(`${item.id}.description`)) {
        detail = tDynamic(`${item.id}.description`);
      }
    }

    return { title, detail };
  };

  return (
    <motion.div
      key="details"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-10"
    >
      <div className="text-center">
        <h2 className="text-3xl font-black text-[#0D4B4D] mb-6">
          {t("title")}
        </h2>
        <Stepper current={2} />
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
        {/* Desktop Header */}
        <div className="hidden md:grid grid-cols-12 bg-[#0D4B4D]/5 border-b border-slate-100 px-8 py-4">
          <div className="col-span-8 text-[10px] font-black uppercase text-[#0D4B4D] tracking-widest">
            {t("table.header")}
          </div>
          <div className="col-span-4 text-[10px] font-black uppercase text-[#0D4B4D] tracking-widest text-right">
            {t("table.price")}
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
                      {getTranslatedItem(item).title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {getTranslatedItem(item).detail || t("table.defaultDetail")}
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
                    {t("table.orderNameLabel")}
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
          <h4 className="font-bold text-[#0D4B4D] text-lg">{t("totalLabel")}</h4>
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
            {t("advisorCode")}
          </label>
          <Input
            value={advisorCode}
            onChange={(e) => setAdvisorCode(e.target.value)}
            className="h-12 rounded-xl bg-white border-slate-200"
            placeholder={t("advisorCodePlaceholder")}
          />
        </div>
        <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 md:border-t-0 md:pt-0">
          <Button
            variant="outline"
            onClick={onBack}
            className="font-bold text-slate-500 bg-white border-slate-200 hover:bg-slate-50 rounded-xl px-8 h-12"
          >
            {t("navigation.back")}
          </Button>
          <Button
            onClick={onContinue}
            className="bg-[#0D4B4D] hover:bg-[#093638] text-white px-10 h-12 rounded-xl font-bold shadow-md shadow-[#0D4B4D]/10"
          >
            {t("navigation.continue")}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
