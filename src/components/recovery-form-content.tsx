"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Mail, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";

interface RecoveryFormContentProps {
  setView: (view: "login" | "register" | "recovery") => void;
}

export function RecoveryFormContent({ setView }: RecoveryFormContentProps) {
  const t = useTranslations("Auth.Recovery");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://doctorrecetas.com/api/solicitar_recuperacion.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.message || t("error"));
      }
    } catch (err) {
      console.error("Error requesting recovery:", err);
      setError(t("unexpectedError"));
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md space-y-8 fade-in-0 animate-in zoom-in-95 duration-300 py-4 sm:py-0">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4 animate-in zoom-in duration-500">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <SheetHeader>
            <SheetTitle className="text-3xl font-bold tracking-tight text-slate-900 text-center">
              {t("successTitle")}
            </SheetTitle>
          </SheetHeader>
          <p className="text-slate-500 text-base max-w-xs mx-auto">
            {t("successSubtitle")} <br />
            <span className="font-semibold text-slate-900">{email}</span>
          </p>
        </div>

        <Button
          onClick={() => setView("login")}
          className="w-full h-12 rounded-xl bg-[#0D4B4D] hover:bg-[#093638] text-white font-bold shadow-lg hover:shadow-xl transition-all"
        >
          {t("backToLogin")}
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-8 fade-in-0 animate-in zoom-in-95 duration-300 py-4 sm:py-0">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0D4B4D]/10 text-[#0D4B4D] mb-4">
          <Mail className="w-6 h-6" />
        </div>
        <SheetHeader>
          <SheetTitle className="text-3xl font-bold tracking-tight text-slate-900 text-center">
            {t("title")}
          </SheetTitle>
        </SheetHeader>
        <p className="text-slate-500 text-sm">
          {t("subtitle")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-600 font-medium">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 ml-1">
              {t("email")}
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#0D4B4D] transition-colors" />
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("emailPlaceholder")}
                className="pl-12 h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-[#0D4B4D] focus-visible:ring-offset-0 transition-all"
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 rounded-xl bg-[#0D4B4D] hover:bg-[#093638] text-white font-bold shadow-lg hover:shadow-xl transition-all"
        >
          {isLoading ? t("loading") : t("submit")}
        </Button>

        <Button
          type="button"
          variant="ghost"
          onClick={() => setView("login")}
          className="w-full h-12 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("backToLogin")}
        </Button>
      </form>
    </div>
  );
}
