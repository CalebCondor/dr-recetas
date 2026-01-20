"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

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
    <section className="relative py-20 lg:py-32 border-b border-black/5">
      <div className="w-full px-6 md:px-12 lg:px-[8%]">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold text-teal-900 mb-6">
              ¿Por qué elegimos?
            </h2>

            <div className="prose prose-sm text-teal-700 mb-8 space-y-4">
              <p>
                Doctor Recetas, somos una compañía puertorriqueña establecida en
                2020 como consecuencia de la pandemia del COVID.
              </p>
              <p>
                Nuestro grupo medico está compuesto por un diverso número de
                doctores asistentes, enfermeras, doctores internistas y
                especialistas. Nuestra meta es poder llevar SALUD a la mayor
                cantidad de personas en Puerto Rico desde nuestro centro a la
                comodidad de su hogar.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-xl border-none bg-white px-4 shadow-sm transition-all hover:shadow-md"
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
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative h-96 w-full overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/meet.png"
                alt="Medical consultation via video"
                fill
                className="object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-blue-400/20 via-transparent to-teal-400/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
