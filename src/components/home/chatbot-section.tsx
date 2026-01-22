"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export function ChatbotSection() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "¡Hola! 👋 ¿En qué puedo ayudarte hoy?",
    },
    {
      id: 2,
      type: "user",
      text: "Hola, ¿Qué servicios ofrecen?",
    },
    {
      id: 3,
      type: "bot",
      text: "Ofrecemos recetas médicas, laboratorios y consultas digitales al instante. 💬",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, type: "user", text: input },
      ]);
      setInput("");
    }
  };

  return (
    <section className="w-full py-16 lg:py-24">
      <div className="w-full px-6 md:px-12 lg:px-[8%]">
        {/* Banner Section */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl md:text-5xl lg:text-5xl font-extrabold text-[#0D4B4D] tracking-tight">
            ¿Qué necesitas hoy?
          </h2>
          <div className="mx-auto max-w-3xl">
            <p className="text-lg md:text-xl font-medium text-slate-600 leading-relaxed">
              Ya sea un certificado médico, si tu hijo tiene fiebre o necesitas
              un refill urgente de tu receta, Ana está aquí para ayudarte.
            </p>
          </div>
        </div>

        {/* Chatbot Container - Wider/Rectangular */}
        <div className="w-full max-w-6xl mx-auto">
          <div className="w-full rounded-[2.5rem] overflow-hidden border border-teal-100 shadow-2xl flex flex-col h-[500px] md:h-[600px] bg-white relative">
            {/* Header - Light Mint */}
            <div className="bg-[#B0E5CC]/40 px-8 py-5 flex items-center justify-between border-b border-teal-50">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white border-2 border-white shadow-sm">
                  <Image
                    src="/logo_bot.png"
                    alt="ANA"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-[#0D4B4D] text-lg tracking-tight">
                    ANA
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-[10px] uppercase tracking-widest text-[#0D4B4D]/60 font-bold">
                      En línea
                    </p>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block px-4 py-1.5 rounded-full bg-white/50 border border-[#0D4B4D]/10 text-[10px] font-bold text-[#0D4B4D]/70 uppercase tracking-wider">
                Respuesta instantánea
              </div>
            </div>

            {/* Chat Body - Light Green to White Gradient */}
            <div
              className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide"
              style={{
                background:
                  "linear-gradient(180deg, rgba(176, 229, 204, 0.15) 0%, rgba(255, 255, 255, 1) 100%)",
              }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-end gap-3 ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.type === "bot" && (
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-white border border-teal-100 shrink-0 mb-1 shadow-sm">
                      <Image
                        src="/logo_bot.png"
                        alt="ANA"
                        width={32}
                        height={32}
                      />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-3xl px-6 py-3.5 text-sm md:text-base shadow-sm transition-all ${
                      msg.type === "user"
                        ? "bg-[#0D4B4D] text-white rounded-br-none"
                        : "bg-white border border-teal-50 text-slate-700 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer / Input Area - Light Mint */}
            <div className="bg-[#B0E5CC]/30 p-4 md:p-8 border-t border-teal-50">
              <div className="flex items-center gap-4 bg-white p-2 pl-6 rounded-2xl border border-slate-100 shadow-sm focus-within:border-[#B0E5CC] focus-within:ring-4 focus-within:ring-[#B0E5CC]/20 transition-all duration-200">
                <Input
                  placeholder="Escribe tu duda aquí..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  onFocus={(e) => {
                    // Prevenir que el scroll automático sea brusco o innecesario
                    // si ya está en vista
                    e.target.scrollIntoView({
                      block: "nearest",
                      behavior: "smooth",
                    });
                  }}
                  className="flex-1 border-none bg-transparent text-slate-700 placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0 text-base h-12 p-0"
                />
                <Button
                  onClick={handleSend}
                  className="bg-[#0D4B4D] text-white hover:bg-[#0D4B4D]/90 rounded-xl px-6 h-12 font-bold transition-all shadow-md active:scale-95 flex items-center gap-2"
                >
                  <span className="hidden sm:inline">Enviar</span>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
