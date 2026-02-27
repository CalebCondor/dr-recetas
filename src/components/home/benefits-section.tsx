"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface BenefitCard {
  id: number;
  name?: string;
  imageFond?: string;
  title: string;
  description?: string;
  buttonText: string;
  bgColor: string;
  image?: string;
}

const benefits: BenefitCard[] = [
  {
    id: 1,
    name: "ISLANDMED",
    imageFond: "/meet.png",
    title: "¿Eres paciente de cannabis medicinal?",
    description: "Obtenga su licencia con solo un click",
    buttonText: "Solicitar ahora",
    bgColor: "bg-teal-900",
    image: "🏥",
  },
  {
    id: 2,
    name: "",
    title: "Ahorro hasta 80% en sus medicamentos",
    description: "Acceda a medicamentos de calidad a precios accesibles",
    buttonText: "Ingresa aquí",
    bgColor: "bg-[#ff6b35]",
  },
];

export function BenefitsSection() {
  const t = useTranslations("HomePage.Benefits");
  const translatedBenefits: BenefitCard[] = [
    {
      id: 1,
      name: "ISLANDMED",
      imageFond: "/meet.png",
      title: t("benefit1.title"),
      description: t("benefit1.description"),
      buttonText: t("benefit1.button"),
      bgColor: "bg-teal-900",
      image: "🏥",
    },
    {
      id: 2,
      name: "",
      title: t("benefit2.title"),
      description: t("benefit2.description"),
      buttonText: t("benefit2.button"),
      bgColor: "bg-[#ff6b35]",
    },
  ];
  const [order, setOrder] = useState<number[]>([1, 2]);

  const handleCardClick = (id: number) => {
    setOrder((prev) => {
      const filtered = prev.filter((item) => item !== id);
      return [id, ...filtered];
    });
  };

  return (
    <section className="w-full py-5 lg:py-24">
      <div className="w-full px-6 md:px-12 lg:px-[8%]">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-[#8BAF4A] mb-16 text-balance">
          {t("title")}
        </h2>

        <div className="relative h-[340px] w-full perspective">
          <AnimatePresence>
            {order.map((id, index) => {
              const benefit = translatedBenefits.find((b) => b.id === id);
              if (!benefit) return null;

              const isFirst = index === 0;

              return (
                <motion.div
                  key={benefit.id}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{
                    opacity: 1,
                    scale: isFirst ? 1 : 0.94,
                    zIndex: isFirst ? 20 : 10,
                    x: 0,
                    y: isFirst ? 0 : 160,
                    rotateX: isFirst ? 0 : -2,
                  }}
                  exit={{ opacity: 0, scale: 0.9, y: -30 }}
                  transition={{
                    duration: 0.6,
                    type: "spring",
                    stiffness: 180,
                    damping: 25,
                  }}
                  onClick={() => handleCardClick(benefit.id)}
                  className="absolute inset-0 cursor-pointer"
                >
                  <div
                    className={`relative h-full w-full rounded-[2.5rem] shadow-2xl overflow-hidden flex items-center p-8 lg:p-10 ${benefit.bgColor} transition-all duration-500`}
                  >
                    {/* Background Image with Overlay */}
                    {benefit.imageFond && (
                      <div className="absolute inset-0 z-0">
                        <Image
                          src={benefit.imageFond}
                          alt=""
                          fill
                          className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                      </div>
                    )}

                    <div className="relative z-10 w-full lg:w-2/3">
                      {benefit.name && (
                        <div className="text-white text-sm font-bold mb-4 tracking-[0.2em] uppercase opacity-90">
                          {benefit.name}
                        </div>
                      )}
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-[1.1] text-balance">
                        {benefit.title}
                      </h3>
                      <p className="text-white text-lg md:text-xl mb-8 opacity-90 max-w-md">
                        {benefit.description}
                      </p>
                      <Button className="bg-white hover:bg-white/90 text-teal-900 font-bold px-8 py-4 rounded-2xl text-lg shadow-lg transition-transform hover:scale-105 active:scale-95">
                        {benefit.buttonText}
                        {benefit.id === 2 && (
                          <ChevronRight className="ml-2 w-5 h-5" />
                        )}
                      </Button>
                    </div>

                    {benefit.image && (
                      <div className="hidden lg:flex flex-1 items-center justify-end">
                        <div className="w-56 h-56 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-8xl shadow-inner border border-white/20">
                          {benefit.image}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-2 mt-48 text-teal-800/40 font-medium">
          <div className="w-8 h-1 bg-teal-800/20 rounded-full" />
          <p className="text-sm uppercase tracking-widest">{t("tap_hint")}</p>
          <div className="w-8 h-1 bg-teal-800/20 rounded-full" />
        </div>
      </div>
    </section>
  );
}
