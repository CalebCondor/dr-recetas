import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  RiDeleteBin6Line,
  RiArrowLeftLine,
  RiArrowRightLine,
} from "react-icons/ri";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useTranslations } from "next-intl";

import { CartItem } from "@/context/cart-context";

interface CartReviewProps {
  cart: CartItem[];
  total: number;
  removeFromCart: (id: string) => void;
  onContinue: () => void;
}

export const CartReview = ({
  cart,
  total,
  removeFromCart,
  onContinue,
}: CartReviewProps) => {
  const t = useTranslations("Cart.Review");
  const [itemToDelete, setItemToDelete] = useState<CartItem | null>(null);

  const handleDeleteClick = (item: CartItem) => {
    setItemToDelete(item);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      removeFromCart(itemToDelete.id);
      setItemToDelete(null);
    }
  };

  return (
    <>
      <motion.div
        key="review"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="space-y-10"
      >
        <div className="border-b border-slate-100 pb-8 space-y-5">
          <Link
            href="/servicios/otros"
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#0D4B4D] transition-all group"
          >
            <RiArrowLeftLine className="group-hover:-translate-x-1 transition-transform" />
            {t("back")}
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-[#0D4B4D] tracking-tight">
                {t("title")}
              </h1>
              <p className="text-slate-400 text-sm md:text-base mt-2 font-medium">
                {t.rich("summary", {
                  count: cart.length,
                  span: (chunks) => <span className="text-[#0D4B4D] font-bold">{chunks}</span>
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden border border-slate-100 rounded-2xl">
          <table className="w-full text-left">
            <thead className="bg-[#0D4B4D]/5 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-[#0D4B4D] tracking-widest">
                  {t("table.service")}
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-[#0D4B4D] tracking-widest text-right">
                  {t("table.price")}
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
                    <span className="font-bold text-[#0D4B4D] text-xl">
                      ${parseFloat(item.precio).toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <button
                      onClick={() => handleDeleteClick(item)}
                      className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                      aria-label={t("table.delete", { name: item.titulo })}
                    >
                      <RiDeleteBin6Line size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-50 border-t border-slate-100">
              <tr>
                <td className="px-6 py-6 font-bold text-[#0D4B4D]">{t("table.total")}</td>
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
            onClick={onContinue}
            className="bg-[#0D4B4D] hover:bg-[#093638] text-white px-5 py-3 rounded-xl font-semibold shadow-md shadow-[#0D4B4D]/20 transition-all active:scale-95 disabled:opacity-70 h-auto"
          >
            {t("continue")}
            <RiArrowRightLine />
          </Button>
        </div>
      </motion.div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!itemToDelete}
        onOpenChange={() => setItemToDelete(null)}
      >
        <AlertDialogContent className="rounded-3xl border-none shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-black text-[#0D4B4D]">
              {t("deleteDialog.title")}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600 text-base">
              {t.rich("deleteDialog.description", {
                name: (chunks) => <span className="font-bold text-[#0D4B4D]">{itemToDelete?.titulo}</span>
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">
              {t("deleteDialog.cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white rounded-xl"
            >
              {t("deleteDialog.confirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
