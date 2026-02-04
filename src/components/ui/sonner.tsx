"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-5" />,
        info: <InfoIcon className="size-5" />,
        warning: <TriangleAlertIcon className="size-5" />,
        error: <OctagonXIcon className="size-5" />,
        loading: <Loader2Icon className="size-5 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-[#0D4B4D] group-[.toaster]:border-slate-100 group-[.toaster]:shadow-2xl group-[.toaster]:rounded-2xl group-[.toaster]:p-4",
          description: "group-[.toast]:text-slate-500 group-[.toast]:text-sm",
          actionButton:
            "group-[.toast]:bg-[#3AC991] group-[.toast]:text-white group-[.toast]:rounded-xl group-[.toast]:font-bold group-[.toast]:hover:bg-[#2fb57d]",
          cancelButton:
            "group-[.toast]:bg-slate-50 group-[.toast]:text-slate-600 group-[.toast]:rounded-xl group-[.toast]:hover:bg-slate-100",
          success:
            "group-[.toast]:!bg-[#E8F8F2] group-[.toast]:!text-[#0D4B4D] group-[.toast]:!border-[#3AC991]/20",
          error:
            "group-[.toast]:!bg-red-50 group-[.toast]:!text-red-800 group-[.toast]:!border-red-100",
          warning:
            "group-[.toast]:!bg-amber-50 group-[.toast]:!text-amber-800 group-[.toast]:!border-amber-100",
          info: "group-[.toast]:!bg-blue-50 group-[.toast]:!text-blue-800 group-[.toast]:!border-blue-100",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
