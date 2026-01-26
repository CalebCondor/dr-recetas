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
import { useEffect, useState } from "react";

const faqs = [
  {
    id: "faq-1",
    question: "Lorem ipsum lorem ipsum",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "faq-2",
    question: "Lorem ipsum lorem ipsum",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

function WhyChooseUsContent() {
  const [isInteractive, setIsInteractive] = useState(true);

  useEffect(() => {
    // Disable interactive mode on mobile for better performance
    const checkMobile = () => {
      setIsInteractive(window.innerWidth >= 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      className="relative py-20 lg:py-32"
      aria-labelledby="why-choose-us-title"
    >
      {/* Centered Background Gradient - Subdued version */}
      <div className="absolute inset-0 -top-40 opacity-40 pointer-events-none z-0">
        <BackgroundGradientAnimation
          containerClassName="!h-full !w-full blur-[100px]"
          firstColor="30, 210, 150"
          secondColor="60, 130, 255"
          thirdColor="100, 220, 255"
          fourthColor="40, 240, 180"
          fifthColor="200, 255, 240"
          pointerColor="60, 130, 255"
          size="80%"
          blendingValue="hard-light"
          interactive={isInteractive}
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
            <h2
              id="why-choose-us-title"
              className="text-4xl font-bold text-teal-900 mb-6 tracking-tight"
            >
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
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
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
            <div className="relative h-[450px] w-full overflow-hidden rounded-[2.5rem] shadow-2xl">
              <Image
                src="/meet.png"
                alt="Medical consultation via video"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
                loading="lazy"
              />
              {/* Refined Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-teal-400/10 via-transparent to-blue-400/10" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Schema.org structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Doctor Recetas",
            description:
              "Compañía puertorriqueña de servicios médicos establecida en 2020",
            founded: "2020",
            areaServed: "Puerto Rico",
            knowsAbout: ["Medical Services", "Telemedicine", "Healthcare"],
          }),
        }}
      />
    </section>
  );
}

export function WhyChooseUs() {
  return <WhyChooseUsContent />;
}
