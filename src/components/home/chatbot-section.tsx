"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatbotPanel } from "../shell/chatbot-panel";
import { ChatbotFloating } from "../shell/chatbot-floating";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function ChatbotSection() {
  const t = useTranslations("Chatbot");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="chatbot" className="relative w-full py-16 lg:py-24">
      <div className="w-full px-6 md:px-12 lg:px-[8%]">
        {/* Banner Section */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl md:text-5xl lg:text-5xl font-extrabold text-[#0D4B4D] tracking-tight">
            {t("title")}
          </h2>
          <div className="mx-auto max-w-3xl">
            <p className="text-lg md:text-xl font-medium text-slate-600 leading-relaxed">
              {t("description")}
            </p>
          </div>
        </div>

        {/* Open button */}
        <div className="flex justify-center">
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#0D4B4D] text-white font-semibold shadow-lg hover:bg-[#0a3d3f] transition-colors duration-200"
          >
            <div className="relative h-8 w-8 shrink-0">
              <Image src="/logo_bot.png" alt="Bot" fill className="object-contain" />
            </div>
            {t("open")}
          </motion.button>
        </div>
      </div>

    </section>
  );
}
