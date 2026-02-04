import React from "react";

interface StepperProps {
  current: number;
}

export const Stepper = ({ current }: StepperProps) => (
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
