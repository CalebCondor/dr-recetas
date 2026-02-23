"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send,ArrowUp, X } from "lucide-react";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useChat } from "@/context/chat-context";
import { useTranslations } from "next-intl";

interface ChatbotPanelProps {
  className?: string;
  showHeader?: boolean;
  onClose?: () => void;
  isFloating?: boolean;
}

export function ChatbotPanel({
  className = "",
  showHeader = true,
  onClose,
  isFloating = false,
}: ChatbotPanelProps) {
  const { messages, isLoading, sendMessage } = useChat();
  const t = useTranslations("Chatbot");
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (bottomRef.current && (messages.length > 1 || isLoading)) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages.length, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const text = input.trim();
    setInput("");
    await sendMessage(text);
  };

  return (
    <div
      className={`flex flex-col overflow-hidden ${className} ${isFloating ? "rounded-3xl" : "rounded-[2rem]"}`}
      style={{
        background: "linear-gradient(135deg, rgba(242,250,236,0.72) 0%, rgba(236,248,226,0.65) 35%, rgba(248,253,242,0.70) 65%, rgba(238,249,228,0.68) 100%)",
        backdropFilter: "blur(32px) saturate(180%)",
        WebkitBackdropFilter: "blur(32px) saturate(180%)",
        boxShadow: "0 8px 48px rgba(40,100,70,0.12), 0 1.5px 0 rgba(255,255,255,0.6) inset",
        border: "1px solid rgba(255,255,255,0.55)",
      }}
    >
      {/* Header */}
      {showHeader && (
        <div
          className="px-5 py-4 flex items-center justify-between"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.4)" }}
        >
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full overflow-hidden shadow-sm" style={{ border: "1.5px solid rgba(255,255,255,0.7)" }}>
              <img src="/logo_bot.png" alt="ANA" className="object-cover w-full h-full" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 text-sm tracking-tight">ANA</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold">
                  {t("online")}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isFloating && (
              <div
                className="hidden sm:block px-3 py-1 rounded-full text-[9px] font-semibold text-slate-500 uppercase tracking-wider"
                style={{ background: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.7)" }}
              >
                {t("instant_reply")}
              </div>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="h-7 w-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
                style={{ background: "rgba(255,255,255,0.4)" }}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Chat Body */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-hide"
      >
        {/* Empty state — guía de uso */}
        {messages.length === 0 && !isLoading && (
          <div className="flex flex-col gap-3 py-1">

            {/* Simulated user message */}
            <div className="flex justify-end">
              <div
                className="rounded-full px-4 py-2 text-sm text-slate-600 font-medium"
                style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.9)" }}
              >
                ¿Qué servicios ofrecen?
              </div>
            </div>

            {/* Simulated bot response */}
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 mt-0.5 shadow-sm" style={{ border: "1px solid rgba(255,255,255,0.7)" }}>
                <Image src="/logo_bot.png" alt="ANA" width={24} height={24} />
              </div>
              <div
                className="flex-1 rounded-2xl rounded-tl-sm px-4 py-3"
                style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.8)" }}
              >
                <p className="text-[10px] text-slate-400 mb-2 flex items-center gap-1">
                  <span>✦</span> Respuesta en segundos
                </p>
                <p className="font-bold text-slate-800 text-sm leading-snug mb-2.5">
                  Servicios disponibles<br />en Dr. Recetas
                </p>
                <div className="flex flex-col gap-1.5">
                  {[
                    { num: "1", title: "Receta médica", desc: "Obtén tu receta o refill de medicamentos en minutos." },
                    { num: "2", title: "Evaluación inmediata", desc: "Consulta con un médico ahora, sin cita previa." },
                    { num: "3", title: "Cita de seguimiento", desc: "Continúa tu tratamiento con el mismo doctor." },
                  ].map((item) => (
                    <p key={item.num} className="text-xs text-slate-600 leading-relaxed">
                      <span className="font-semibold text-slate-700">{item.num}. {item.title}</span> — {item.desc}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Suggested questions label */}
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mt-1 px-1">Prueba preguntando</p>

            {/* Chips */}
            <div className="flex flex-col gap-1.5">
              {[
                "¿Cómo obtengo una receta médica?",
                "¿Cuánto cuesta la evaluación?",
                "¿Hacen pruebas de laboratorio?",
                "¿Cómo funciona la membresía?",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-left w-full rounded-xl px-3.5 py-2.5 text-xs text-slate-600 font-medium transition-all active:scale-[0.98] hover:brightness-95"
                  style={{
                    background: "rgba(255,255,255,0.55)",
                    border: "1px solid rgba(255,255,255,0.8)",
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${msg.type === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.type === "bot" && (
              <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 mb-0.5 shadow-sm" style={{ border: "1px solid rgba(255,255,255,0.7)" }}>
                <Image src="/logo_bot.png" alt="ANA" width={24} height={24} />
              </div>
            )}
            <div
              className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap ${
                msg.type === "user"
                  ? "rounded-br-sm text-white"
                  : "rounded-bl-sm text-slate-700"
              }`}
              style={
                msg.type === "user"
                  ? {
      
 background: "#9E9B88",
  border: "1px solid #9E9B88"

                    }
                  : {
                      background: "rgba(255,255,255,0.65)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.8)",
                      boxShadow: "0 1px 8px rgba(80,100,160,0.07)",
                    }
              }
              dangerouslySetInnerHTML={{
                __html: msg.text
                  .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
                  .replace(/\n/g, "<br/>"),
              }}
            />
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 justify-start">
            <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 mb-0.5 shadow-sm" style={{ border: "1px solid rgba(255,255,255,0.7)" }}>
              <Image src="/logo_bot.png" alt="ANA" width={24} height={24} />
            </div>
            <div
              className="rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm flex gap-1"
              style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.8)" }}
            >
              <span className="text-slate-400 animate-bounce">.</span>
              <span className="text-slate-400 animate-bounce [animation-delay:0.2s]">.</span>
              <span className="text-slate-400 animate-bounce [animation-delay:0.4s]">.</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Footer */}
      <div className={`${isFloating ? "p-3" : "p-4 md:p-5"}`}>
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full"
          style={{
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.75)",
            boxShadow: "0 2px 12px rgba(80,100,160,0.08)",
          }}
        >
          <Input
            placeholder={t("placeholder")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 border-none bg-transparent text-slate-700 placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm h-9 p-0 shadow-none"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="h-8 w-8 rounded-full flex items-center justify-center text-white transition-all active:scale-90 disabled:opacity-50 shrink-0"
            style={{
              background: "linear-gradient(135deg, #ed8134 0%, #f59a3c 100%)",
              boxShadow: "0 2px 10px rgba(237,129,52,0.38)",
            }}
          >
            <ArrowUp className={`h-3.5 w-3.5 ${isLoading ? "animate-pulse" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
