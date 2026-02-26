"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ChatbotPanel } from "../shell/chatbot-panel";
import { X } from "lucide-react";

export function ChatbotSection() {
  const t = useTranslations("Chatbot");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="chatbot" className="relative w-full py-16 lg:py-24 overflow-hidden">
      <div className="w-full h-[927px] px-6 md:px-12 lg:px-[8%] mx-auto">
        {/* Main Banner Container */}
        <div className="relative h-[927px] w-full rounded-[2.5rem] md:rounded-[5rem] overflow-hidden bg-[#1E3A2F] shadow-2xl group">

          {/* Background Image / Canvas */}
          <div className="absolute inset-0">
            <Image
              src="/bot/webfondo.png"
              alt="Background"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
            />
          </div>

          {/* Layout Grid */}
          <div className="relative h-full w-full z-20 flex flex-col md:grid md:grid-cols-3 items-center md:items-stretch px-8 md:px-16 lg:px-24 pt-12 pb-0 gap-12 text-white">

            {/* Left Content */}
            <div className="flex flex-col justify-center text-center md:text-left order-2 md:order-1 md:-translate-y-32">
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-5xl font-black leading-tight tracking-tight"
              >
                {t("need_help")} <br />
                <span className="text-[#A1FF00] font-black">{t("talk_to_ana")}</span>
              </motion.h2>
            </div>

            {/* Center Phone Illustration */}
            <div className="relative h-[400px] md:h-full w-full flex items-end justify-center order-1 md:order-2">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative md:absolute md:left-1/2 md:-translate-x-1/2 md:bottom-0 w-full md:w-[930px] h-full md:h-[896px] z-10"
              >
                <Image
                  src="/bot/webmanos.png"
                  alt="Ana Virtual Assistant"
                  fill
                  className="object-contain object-bottom drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                  priority
                />
              </motion.div>
            </div>

            {/* Right Content */}
            <div className="flex flex-col justify-center items-center md:items-start md:pl-8 text-center md:text-left order-3 z-30 md:-translate-y-32">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-[280px] lg:max-w-[320px] space-y-4"
              >
                <p className="text-xl md:text-2xl font-bold leading-tight">
                  <span className="text-white">{t("intro_prefix")}</span> <br />
                  <span className="text-[#C1E97C]">{t("intro_highlight")}</span>
                </p>
                <p className="text-white/80 text-base md:text-lg font-medium leading-relaxed">
                  {t("intro_description")}
                </p>
              </motion.div>
            </div>

          </div>

          {/* CTA Button Overlay - Moved outside Grid and reinforced z-index */}
          <div className="absolute bottom-10 md:bottom-16 left-1/2 -translate-x-1/2 w-full flex justify-center px-6 z-50">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(30,30,30,0.9)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="group relative flex items-center gap-4 px-12 py-6 rounded-full bg-black/80 backdrop-blur-2xl border border-white/30 text-white font-bold text-xl md:text-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-b-4 border-b-[#C1E97C]/50 transition-all pointer-events-auto"
            >
              <span className="relative tracking-tight">
                {t("cta")}
              </span>
              {/* Subtle inner glow */}
              <div className="absolute inset-0 rounded-full bg-linear-to-t from-[#C1E97C]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Chatbot Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-[500px] h-[700px] max-h-[90vh] bg-white rounded-[2rem] shadow-2xl overflow-hidden overflow-y-hidden"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                aria-label="Cerrar chat"
              >
                <X className="w-6 h-6 text-slate-800" />
              </button>
              <ChatbotPanel className="h-full" onClose={() => setIsOpen(false)} isFloating={true} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
