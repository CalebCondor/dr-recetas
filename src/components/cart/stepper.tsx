import React from "react";
import { useTranslations } from "next-intl";

interface StepperProps {
  current: number;
}

export const Stepper = ({ current }: StepperProps) => {
  const t = useTranslations("Cart.Stepper");

  return (
    <div className="flex items-center justify-center mt-12 gap-4 sm:gap-8 mb-12">
      {[1, 2, 3].map((s, idx) => {
        const labels = [t("step1"), t("step2"), t("step3")];
        const isActive = current >= s;
        return (
          <React.Fragment key={s}>
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors border ${isActive
                    ? "text-[#0D4B4D] border-[#0D4B4D] bg-white"
                    : "bg-white border-slate-200 text-slate-300"
                  }`}
              >
                {s}
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider hidden sm:block ${isActive ? "text-[#0D4B4D]" : "text-slate-300"
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
};
