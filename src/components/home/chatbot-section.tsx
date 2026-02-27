  "use client";

  import { useState, useEffect } from "react";
  import { createPortal } from "react-dom";
  import { motion, AnimatePresence } from "framer-motion";
  import { useTranslations } from "next-intl";
  import Image from "next/image";
  import { ChatbotPanel } from "../shell/chatbot-panel";
  import { X } from "lucide-react";
  import { Marquee } from "../ui/marquee";
  import { useIsMounted } from "@/hooks/use-is-mounted";

  const keywords = [
    "Salud", "Consulta", "Análisis", "Prueba de COVID", "Refill", "Alivio",
    "Certificado Médico", "Tratamiento", "Receta", "Hemograma", "Quantitative",
    "Cultivo", "Ginecología", "Bienestar", "Alergia", "Insomnio", "Dosis", "Respiratorio",
    "Influenza", "Pediatría", "Análisis", "Micoplasma", "Bronquitis", "Consulta",
    "Reducción de Peso", "Licencia Matrimonial", "Diabetes", "HGB Glicosilada",
    "ETS", "Salud", "Prueba de COVID"
  ];

  export function ChatbotSection() {
    const t = useTranslations("Chatbot");
    const [isOpen, setIsOpen] = useState(false);
    const mounted = useIsMounted();

    if (!mounted) return null;


    return (
      <section id="chatbot" className="relative w-full py-5 md:py-16 lg:py-24 overflow-hidden">
        <div className="w-full md:h-232 max-w-400 mx-auto">
          {/* Main Banner Container */}
          <div className="relative h-[748px] md:h-[927px] w-full rounded-[2.5rem] md:rounded-[5rem] overflow-hidden bg-[#1E3A2F] md:shadow-2xl group">
            <div className="absolute inset-0">
              {/* Desktop Background */}
              <Image
                src="/bot/bgr.webp"
                alt="Background"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority
              />

            </div>
            {/* Animated Glow Rings behind the phone */}
            <div className="absolute inset-0 pointer-events-none z-5">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
                {[0, 1.2, 2.4].map((delay, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: [0.5, 2.5], opacity: [0, 0.5, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay,
                      ease: "easeOut"
                    }}
                    className="absolute w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full border border-white/20"
                  />
                ))}
              </div>
            </div>
            {/* Text Marquee Background Layer */}
            <div className="absolute inset-0 opacity-[0.12] z-0 flex flex-col justify-end pb-8 pointer-events-none">
              <Marquee className="[--duration:140s] py-2" reverse repeat={5}>
                {keywords.map((word, i) => (
                  <span key={i} className="text-white text-3xl md:text-5xl font-black mx-4 whitespace-nowrap  tracking-tighter">
                    {word}
                  </span>
                ))}
              </Marquee>
              <Marquee className="[--duration:120s] py-2" repeat={5}>
                {keywords.slice().reverse().map((word, i) => (
                  <span key={i} className="text-white text-3xl md:text-5xl font-black mx-4 whitespace-nowrap tracking-tighter">
                    {word}
                  </span>
                ))}
              </Marquee>
              <Marquee className="[--duration:160s] py-2" reverse repeat={5}>
                {keywords.map((word, i) => (
                  <span key={i} className="text-white text-3xl md:text-5xl font-black mx-4 whitespace-nowrap  tracking-tighter">
                    {word}
                  </span>
                ))}
              </Marquee>
              <Marquee className="[--duration:130s] py-2" repeat={5}>
                {keywords.slice().reverse().map((word, i) => (
                  <span key={i} className="text-white text-3xl md:text-5xl font-black mx-4 whitespace-nowrap tracking-tighter">
                    {word}
                  </span>
                ))}
              </Marquee>
              <Marquee className="[--duration:130s] py-2" reverse repeat={5}>
                {keywords.map((word, i) => (
                  <span key={i} className="text-white text-3xl md:text-5xl font-black mx-4 whitespace-nowrap  tracking-tighter">
                    {word}
                  </span>
                ))}
              </Marquee>
            </div>

            {/* Center Phone Illustration - Absolute positioned relative to the entire banner */}
            <div className="absolute inset-0 pointer-events-none z-10">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[390px] md:w-[650px] lg:w-[930px] h-[514px] md:h-[896px]"
              >
                {/* Desktop Illustration */}
                <Image
                  src="/bot/webmanos.png"
                  alt="Ana Virtual Assistant"
                  fill
                  className="hidden md:block object-contain object-bottom drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                  priority
                />
                {/* Mobile Illustration */}
                <Image
                  src="/bot/mobfondoia.png"
                  alt="Ana Virtual Assistant"
                  fill
                  className="md:hidden object-contain object-bottom drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                  priority
                />
              </motion.div>
            </div>

            {/* Layout Grid (grid only on lg, keep mobile/tablet centered) */}
            <div className="relative h-full w-full z-20 flex flex-col lg:grid lg:grid-cols-3 items-center lg:items-stretch px-6 md:px-16 lg:px-24 pt-12 md:pt-12 pb-0 md:pb-0 gap-8 md:gap-12 text-white">

              {/* Left Content - centered on mobile/tablet, left on lg */}
              <div className="flex flex-col justify-center text-center lg:text-left order-1 lg:order-1 lg:-translate-y-40">
                <motion.h2
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-black md:leading-snug lg:leading-tight tracking-tight"
                >
                  {t("need_help")} <br />
                  <span className="text-[#A1FF00] font-black">{t("talk_to_ana")}</span>
                </motion.h2>
              </div>

              {/* Right Content - centered on mobile/tablet, left on lg */}
              <div className="flex flex-col justify-center items-center lg:items-start lg:pl-8 text-center lg:text-left order-2 lg:order-3 z-30 lg:-translate-y-40">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-[400px] md:max-w-[340px] lg:max-w-[320px]"
                >
                  <p className="text-xl md:text-2xl font-bold md:leading-relaxed leading-normal">
                    <span className="text-white">{t("intro_prefix")}</span> <br className="hidden md:block" />{" "}
                    <span className="text-[#A1FF00]">{t("intro_highlight")}</span>
                  </p>
                  <p className="text-white text-lg md:text-xl font-medium md:leading-relaxed leading-normal">
                    {t("intro_description")}
                  </p>
                </motion.div>
              </div>

              {/* Spacer for the central area in the grid (only expands on lg) */}
              <div className="relative h-[200px] lg:h-full w-full order-3 lg:order-2 pointer-events-none" />

            </div>

            {/* CTA Button Overlay - Moved outside Grid and reinforced z-index */}
            <div className="absolute bottom-10 md:bottom-20 left-1/2 -translate-x-1/2 w-full flex justify-center px-6 z-50">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(9, 47, 17, 0.70)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="group relative flex items-center justify-center gap-3 md:gap-4 px-8 md:px-14 py-4 md:py-6 rounded-full bg-[#092F11]/50 backdrop-blur-[5.25px] border border-white/20 text-white font-bold text-lg md:text-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all pointer-events-auto"
              >
                <span className="relative tracking-tight text-center">
                  {t("cta")}
                </span>
                {/* Subtle inner glow */}
                <div className="absolute inset-0 rounded-full bg-linear-to-t from-[#A1FF00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Chatbot Modal Overlay — rendered in a portal so fixed = viewport */}
        {mounted && isOpen && createPortal(
          <AnimatePresence>
            <motion.div
              key="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-12"
            >
              <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
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
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
      </section>
    );
  }
