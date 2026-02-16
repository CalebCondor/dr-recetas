"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";
import { checkPassword } from "./actions";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LockPage() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      toast.error("Por favor, ingresa la contraseña");
      return;
    }

    setIsLoading(true);
    try {
      const result = await checkPassword(password);
      if (result.success) {
        setIsSuccess(true);
        toast.success("¡Acceso concedido!");
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 1000);
      } else {
        toast.error(result.error || "Contraseña incorrecta");
      }
    } catch (error) {
      console.log(error);
      toast.error("Ocurrió un error al verificar la contraseña");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] w-full h-full bg-slate-950 font-sans overflow-hidden">
      {/* Fallback background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800" />

      <div className="absolute z-50 inset-0 flex items-center justify-center px-4 w-full h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md relative z-50"
        >
          <div className="bg-black/20 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden relative group">
            {/* Decorative elements */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors duration-500" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <motion.div
                initial={{ rotate: -10, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 shadow-inner"
              >
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-green-400"
                    >
                      <ShieldCheck size={40} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="lock"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-white"
                    >
                      <Lock size={32} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-white mb-2 tracking-tight"
              >
                Sitio en Desarrollo
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-white/70 mb-8 text-sm"
              >
                Estamos trabajando para brindarte la mejor experiencia médica
                digital. Por favor, ingresa la clave de acceso para continuar.
              </motion.p>

              <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onSubmit={handleSubmit}
                className="w-full space-y-4"
              >
                <div className="relative">
                  <Input
                    type="password"
                    placeholder="Contraseña de acceso"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-black/20 border-white/10 text-white placeholder:text-white/30 h-12 rounded-xl focus-visible:ring-primary/50 text-center text-lg tracking-widest transition-all duration-300 hover:bg-black/30"
                    disabled={isLoading || isSuccess}
                    autoFocus
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold transition-all duration-300 flex items-center justify-center group overflow-hidden relative"
                  disabled={isLoading || isSuccess}
                >
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <Loader2 className="animate-spin" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="text"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center"
                      >
                        Entrar{" "}
                        <ArrowRight
                          size={18}
                          className="ml-2 group-hover:translate-x-1 transition-transform"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.form>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center"
          >
            <p className="text-white/40 text-xs">
              © 2026 Dr. Recetas. Todos los derechos reservados.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
