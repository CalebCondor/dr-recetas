"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState } from "react";
import { FaRobot } from "react-icons/fa";

export function ChatbotSection() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "Hola! 👋 How can I help you today?",
    },
    {
      id: 2,
      type: "user",
      text: "Hola, ¿Qué servicios ofrecen?",
    },
    {
      id: 3,
      type: "bot",
      text: "💬 Need help with scheduling customer support",
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
    <section className="w-full py-12 lg:py-24">
      <div className="w-full px-6 md:px-12 lg:px-[8%]">
        {/* Banner Section */}
        <div className="mb-12 lg:mb-16 rounded-3xl p-6 md:p-12 text-center backdrop-blur-sm">
          <h2 className="mb-6 text-3xl md:text-5xl lg:text-7xl font-extrabold text-[#0D4B4D] tracking-tight leading-[1.1]">
            ¿Qué necesitas hoy?
          </h2>
          <div className="mx-auto max-w-2xl">
            <p className="text-base md:text-lg lg:text-md font-medium text-slate-600 leading-relaxed">
              Ya sea un certificado médico para el trabajo, si tu hijo tiene
              fiebre o necesitas un refill urgente de tu receta, dinos cómo
              podemos ayudarte.
            </p>
          </div>
        </div>

        {/* Chatbot Section Container */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="w-full h-auto rounded-[2.5rem] border border-teal-600/20 bg-linear-to-b from-teal-600 to-teal-700 p-5 md:p-8 text-white shadow-2xl">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-white/20 p-3 backdrop-blur-md shadow-inner border border-white/10">
                  <FaRobot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl tracking-wide uppercase">
                    ANA
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <p className="text-[11px] uppercase tracking-widest opacity-80 font-bold">
                      Asistente Virtual Activa
                    </p>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-[10px] font-bold uppercase tracking-wider">
                Respuesta instantánea
              </div>
            </div>

            {/* Messages */}
            <div className="mb-8 space-y-6 max-h-[400px] overflow-y-auto scrollbar-hide pr-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] md:max-w-[75%] rounded-[1.5rem] px-5 py-3.5 text-sm md:text-base shadow-lg transition-all ${
                      msg.type === "user"
                        ? "bg-white text-teal-900 rounded-tr-none font-medium"
                        : "bg-white/10 backdrop-blur-sm border border-white/10 rounded-tl-none font-medium"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center gap-3 bg-white/10 p-2 rounded-2xl border border-white/10 focus-within:bg-white/15 transition-all">
              <Input
                placeholder="Escribe tu duda aquí..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 border-none bg-transparent text-white placeholder:text-white/50 rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0 text-sm md:text-base h-12"
              />
              <Button
                onClick={handleSend}
                className="bg-white text-teal-700 hover:bg-teal-50 rounded-xl px-6 h-12 font-bold transition-all shadow-lg active:scale-95 flex items-center gap-2"
              >
                <span className="hidden sm:inline">Enviar</span>
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {/* Footer shadow/info */}
            <div className="mt-6 text-center">
              <p className="text-[9px] uppercase tracking-[0.2em] opacity-40 font-bold">
                Seguridad garantizada por Dr. Recetas
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
