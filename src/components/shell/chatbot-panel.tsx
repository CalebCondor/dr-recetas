"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useChat } from "@/context/chat-context";

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
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const isFirstRender = useRef(true);

  // Auto-scroll to bottom
  useEffect(() => {
    // Skip scroll on initial load to prevent jumping the page
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (bottomRef.current && (messages.length > 1 || isLoading)) {
      bottomRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
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
      className={`flex flex-col overflow-hidden bg-white shadow-2xl ${className} ${isFloating ? "rounded-3xl border border-teal-100" : "rounded-[2.5rem] border border-teal-100"}`}
    >
      {/* Header */}
      {showHeader && (
        <div className="bg-[#B0E5CC]/40 px-6 py-4 flex items-center justify-between border-b border-teal-50">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white border-2 border-white shadow-sm">
              <Image
                src="/logo_bot.png"
                alt="ANA"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-[#0D4B4D] text-base tracking-tight">
                ANA
              </h3>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[9px] uppercase tracking-widest text-[#0D4B4D]/60 font-bold">
                  En línea
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isFloating && (
              <div className="hidden sm:block px-3 py-1 rounded-full bg-white/50 border border-[#0D4B4D]/10 text-[9px] font-bold text-[#0D4B4D]/70 uppercase tracking-wider">
                Respuesta instantánea
              </div>
            )}
            {onClose && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 rounded-full hover:bg-black/5 text-[#0D4B4D]/60"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Chat Body */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-hide"
        style={{
          background:
            "linear-gradient(180deg, rgba(176, 229, 204, 0.1) 0%, rgba(255, 255, 255, 1) 100%)",
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2.5 ${msg.type === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.type === "bot" && (
              <div className="w-7 h-7 rounded-full overflow-hidden bg-white border border-teal-100 shrink-0 mb-1 shadow-sm">
                <Image src="/logo_bot.png" alt="ANA" width={28} height={28} />
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-[1.5rem] px-4 py-3 text-sm shadow-sm transition-all whitespace-pre-wrap ${
                msg.type === "user"
                  ? "bg-[#0D4B4D] text-white rounded-br-none"
                  : "bg-white border border-teal-50 text-slate-700 rounded-bl-none prose prose-slate prose-sm max-w-none [&_b]:text-[#0D4B4D] [&_b]:font-bold [&_a]:text-teal-600 [&_a]:font-bold [&_a]:underline"
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
          <div className="flex items-center gap-2.5 justify-start">
            <div className="w-7 h-7 rounded-full overflow-hidden bg-white border border-teal-100 shrink-0 mb-1 shadow-sm">
              <Image src="/logo_bot.png" alt="ANA" width={28} height={28} />
            </div>
            <div className="bg-white border border-teal-50 text-slate-400 rounded-2xl px-4 py-2 text-sm flex gap-1">
              <span className="animate-bounce">.</span>
              <span className="animate-bounce [animation-delay:0.2s]">.</span>
              <span className="animate-bounce [animation-delay:0.4s]">.</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Footer */}
      <div
        className={`${isFloating ? "p-4" : "p-6 md:p-8"} bg-[#B0E5CC]/20 border-t border-teal-50`}
      >
        <div className="flex items-center gap-2 bg-white p-1.5 pl-4 rounded-xl border border-slate-100 shadow-sm focus-within:border-[#B0E5CC] focus-within:ring-2 focus-within:ring-[#B0E5CC]/20 transition-all duration-200">
          <Input
            placeholder="Escribe aquí..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 border-none bg-transparent text-slate-700 placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm h-10 p-0"
          />
          <Button
            onClick={handleSend}
            disabled={isLoading}
            size="icon"
            className="bg-[#0D4B4D] text-white hover:bg-[#0D4B4D]/90 rounded-lg h-9 w-9 transition-all shadow-md active:scale-95 flex items-center justify-center disabled:opacity-50"
          >
            <Send className={`h-4 w-4 ${isLoading ? "animate-pulse" : ""}`} />
          </Button>
        </div>
      </div>
    </div>
  );
}
