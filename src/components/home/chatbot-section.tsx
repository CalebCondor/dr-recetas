"use client";

import { ChatbotPanel } from "../shell/chatbot-panel";
import { useTranslations } from "next-intl";

export function ChatbotSection() {
  const t = useTranslations("Chatbot");
  return (
    <section id="chatbot" className="w-full py-16 lg:py-24">
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

        {/* Chatbot Container */}
        <div className="w-full max-w-6xl mx-auto">
          <ChatbotPanel className="h-[600px]" />
        </div>
      </div>
    </section>
  );
}
