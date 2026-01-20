"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MessageCircle, Smile } from "lucide-react";
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
    <section className="w-full py-16">
      <div className="w-full px-6 md:px-12 lg:px-[8%]">
        {/* Banner Section */}
        <div className="mb-16 rounded-2xl p-8 text-center backdrop-blur-sm ">
          <h2 className="mb-4 text-6xl font-bold text-teal-800">
            ¿Qué necesitas hoy?
          </h2>
          <div className="mx-auto max-w-2xl">
            <p className="text-[15.6px] font-medium text-slate-600 leading-relaxed">
              Ya sea un certificado médico para el trabajo, si tu hijo tiene
              fiebre o necesitas un refill urgente de tu receta, dinos como
              podemos ayudarte
            </p>
          </div>
        </div>

        {/* Chatbot Section */}
        <div className="w-full">
          <div className="w-full h-auto rounded-3xl border border-teal-600/20 bg-linear-to-b from-teal-600 to-teal-700 p-6 text-white shadow-xl">
            {/* Header */}
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-full bg-white/20 p-2.5 backdrop-blur-md">
                <FaRobot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold tracking-wide">ANA</h3>
                <p className="text-[10px] uppercase tracking-widest opacity-70 font-bold">
                  AI Assistant
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="mb-6 space-y-4 max-h-[300px] overflow-y-auto scrollbar-hide pr-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                      msg.type === "user"
                        ? "bg-white/20 backdrop-blur-md border border-white/10"
                        : "bg-white/10 backdrop-blur-sm border border-white/5"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Escribe tu mensaje..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="border-white/20 bg-white/10 text-white placeholder:text-white/50 rounded-xl focus-visible:ring-white/30"
              />
              <Button
                size="icon"
                onClick={handleSend}
                className="bg-white/20 hover:bg-white/30 text-white rounded-xl"
                variant="ghost"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
