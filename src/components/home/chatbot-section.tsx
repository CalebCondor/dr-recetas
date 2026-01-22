"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom only when a new bot message arrives or loading starts
  useEffect(() => {
    // If loading, keep spinner in view at the bottom
    if (isLoading) {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
      return;
    }

    // When a new bot message arrives, scroll so the START of that message is visible
    if (messages.length > 0 && messages[messages.length - 1].type === "bot") {
      const lastMsg = messages[messages.length - 1];
      const el = scrollRef.current?.querySelector(
        `[data-msg-id="${lastMsg.id}"]`,
      ) as HTMLElement | null;
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (bottomRef.current) {
        bottomRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    const newUserMsg = {
      id: Date.now(),
      type: "user" as const,
      text: userMessage,
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://doctorrecetas.com/v3/chat-api.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: userMessage }),
        },
      );

      const data = await response.json();

      const botResponse =
        data.response ||
        data.message ||
        data.text ||
        "Lo siento, tuve un problema al procesar tu mensaje.";

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, type: "bot" as const, text: botResponse },
      ]);
    } catch (error) {
      console.error("Error calling chat API:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "bot" as const,
          text: "Lo siento, no pude conectarme con el servidor. Inténtalo de nuevo más tarde.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="chatbot" className="w-full py-16 lg:py-24">
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
          <div className="w-full rounded-[2.5rem] overflow-hidden border border-teal-100 shadow-2xl flex flex-col h-162.5 md:h-[600px] bg-white relative">
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
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide"
              style={{
                background:
                  "linear-gradient(180deg, rgba(176, 229, 204, 0.15) 0%, rgba(255, 255, 255, 1) 100%)",
              }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  data-msg-id={msg.id}
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
                    className={`max-w-[85%] rounded-[2rem] px-6 py-4 text-sm md:text-base shadow-sm transition-all whitespace-pre-wrap ${
                      msg.type === "user"
                        ? "bg-[#0D4B4D] text-white rounded-br-none"
                        : "bg-white border border-teal-50 text-slate-700 rounded-bl-none prose prose-slate prose-sm max-w-none [&_b]:text-[#0D4B4D] [&_b]:font-bold [&_a]:text-teal-600 [&_a]:font-bold [&_a]:underline [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-4 [&_div.service-card]:bg-slate-50 [&_div.service-card]:p-4 [&_div.service-card]:rounded-xl [&_div.service-card]:my-3 [&_div.service-card]:border [&_div.service-card]:border-teal-100"
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: msg.text
                        .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
                        .replace(/\n/g, "<br/>"),
                    }}
                  />
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-white border border-teal-100 shrink-0 mb-1 shadow-sm">
                    <Image
                      src="/logo_bot.png"
                      alt="ANA"
                      width={32}
                      height={32}
                    />
                  </div>
                  <div className="bg-white border border-teal-50 text-slate-400 rounded-3xl px-6 py-3.5 text-sm flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce [animation-delay:0.2s]">
                      .
                    </span>
                    <span className="animate-bounce [animation-delay:0.4s]">
                      .
                    </span>
                  </div>
                </div>
              )}
              {/* Anchor to ensure scroll moves to the end (includes spinner) */}
              <div ref={bottomRef} />
            </div>

            {/* Footer / Input Area - Light Mint */}
            <div className="bg-[#B0E5CC]/30 p-4 md:p-8 border-t border-teal-50">
              <div className="flex items-center gap-4 bg-white p-2 pl-6 rounded-2xl border border-slate-100 shadow-sm focus-within:border-[#B0E5CC] focus-within:ring-4 focus-within:ring-[#B0E5CC]/20 transition-all duration-200">
                <Input
                  placeholder="Escribe tu duda aquí..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1 border-none bg-transparent text-slate-700 placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0 text-base h-12 p-0"
                />
                <Button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="bg-[#0D4B4D] text-white hover:bg-[#0D4B4D]/90 rounded-xl px-6 h-12 font-bold transition-all shadow-md active:scale-95 flex items-center gap-2 disabled:opacity-50"
                >
                  <span className="hidden sm:inline">
                    {isLoading ? "Enviando..." : "Enviar"}
                  </span>
                  <Send
                    className={`h-4 w-4 ${isLoading ? "animate-pulse" : ""}`}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
