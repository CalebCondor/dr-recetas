"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { motion } from "framer-motion";

export function WhyChooseUs() {
  const faqs = [
    {
      question: "Lorem ipsum lorem ipsum",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "Lorem ipsum lorem ipsum",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <section className="relative py-20 lg:py-32">
      {/* Centered Background Gradient - Subdued version */}
      <div className="absolute inset-0 -top-40 opacity-40 pointer-events-none z-0">
        <BackgroundGradientAnimation
          containerClassName="!h-full !w-full blur-[100px]"
          firstColor="30, 210, 150" // Green (Left)
          secondColor="60, 130, 255" // Blue (Right)
          thirdColor="100, 220, 255" // Lighter Blue (Right)
          fourthColor="40, 240, 180" // Green (Left)
          fifthColor="200, 255, 240" // Soft Teal (Left)
          pointerColor="60, 130, 255"
          size="100%"
          blendingValue="hard-light"
          interactive={true}
        />
      </div>

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-[8%]">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl font-bold text-teal-900 mb-6 tracking-tight">
              ¿Por qué elegirnos?
            </h2>

            <div className="prose prose-sm text-teal-800/80 mb-8 space-y-4">
              <p className="text-lg leading-relaxed">
                <span className="font-bold text-teal-900">Doctor Recetas</span>,
                somos una compañía puertorriqueña establecida en 2020 como
                consecuencia de la pandemia del COVID.
              </p>
              <p className="text-lg leading-relaxed">
                Nuestro grupo medico está compuesto por un diverso número de
                doctores asistentes, enfermeras, doctores internistas y
                especialistas. Nuestra meta es poder llevar{" "}
                <span className="text-teal-600 font-bold uppercase tracking-wider">
                  Salud
                </span>{" "}
                a la mayor cantidad de personas en Puerto Rico desde nuestro
                centro a la comodidad de su hogar.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-xl border border-teal-100/50 bg-white/60 backdrop-blur-sm px-4 shadow-sm transition-all hover:shadow-md"
                >
                  <AccordionTrigger className="text-teal-900 font-semibold hover:no-underline [&>svg]:text-teal-600 [&>svg]:size-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-teal-700">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[450px] w-full overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-white/50">
              <Image
                src="/meet.png"
                alt="Medical consultation via video"
                fill
                className="object-cover"
              />
              {/* Refined Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-teal-400/10 via-transparent to-blue-400/10" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-teal-100/50 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-100/50 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
