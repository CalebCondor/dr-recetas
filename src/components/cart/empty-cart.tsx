import React from "react";
import Link from "next/link";
import { RiShoppingBag4Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export const EmptyCart = () => {
  const t = useTranslations("Cart.Empty");

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center pt-32">
      <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-6 border border-slate-100">
        <RiShoppingBag4Line size={32} />
      </div>
      <h1 className="text-2xl font-bold text-[#0D4B4D] mb-2">
        {t("title")}
      </h1>
      <p className="text-slate-500 text-sm mb-8">
        {t("description")}
      </p>
      <Button
        asChild
        className="bg-[#0D4B4D] hover:bg-[#093638] h-12 px-8 rounded-xl font-bold"
      >
        <Link href="/servicios/otros">{t("button")}</Link>
      </Button>
    </div>
  );
};
