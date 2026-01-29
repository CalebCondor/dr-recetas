"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatbotPanel } from "./chatbot-panel";
import Image from "next/image";

export function ChatbotFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Hide button if ChatbotSection is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the chatbot section is intersecting, hide the floating button
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }, // Trigger when at least 10% is visible
    );

    const chatbotElement = document.getElementById("chatbot");
    if (chatbotElement) {
      observer.observe(chatbotElement);
    }

    return () => {
      if (chatbotElement) {
        observer.unobserve(chatbotElement);
      }
    };
  }, []);

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-90"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-100 flex flex-col items-end"
          >
            {/* Modal */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                    y: 20,
                    transformOrigin: "bottom right",
                  }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="mb-4 w-[90vw] max-w-[400px] h-[500px] shadow-2xl overflow-hidden"
                >
                  <ChatbotPanel
                    className="h-full"
                    isFloating={true}
                    onClose={() => setIsOpen(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floating Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setIsOpen(!isOpen)}
                className={`h-16 w-16 rounded-full shadow-2xl border-2 transition-all duration-300 relative overflow-hidden flex items-center justify-center p-0 ${
                  isOpen
                    ? "bg-white border-teal-100 text-[#0D4B4D]"
                    : "bg-[#0D4B4D] border-teal-200 text-white"
                }`}
              >
                {/* Background animation for the button */}
                {!isOpen && (
                  <motion.div
                    className="absolute inset-0 bg-linear-to-tr from-teal-500/20 to-transparent"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                )}

                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <X className="h-7 w-7" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="chat"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      className="flex items-center justify-center"
                    >
                      <div className="relative h-10 w-10">
                        <Image
                          src="/logo_bot.png"
                          alt="Chat"
                          fill
                          className="object-contain drop-shadow-md"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>

            {/* Tooltip hint if not open */}
            {!isOpen && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute right-20 bottom-4 pointer-events-none whitespace-nowrap hidden md:block"
              >
                <div className="bg-white px-4 py-2 rounded-xl shadow-lg border border-teal-100 text-[#0D4B4D] font-bold text-sm">
                  ¿Necesitas ayuda? ¡Habla con Ana! 👋
                  <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45 border-r border-t border-teal-100" />
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
