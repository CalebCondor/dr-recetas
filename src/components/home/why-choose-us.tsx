"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export function WhyChooseUs() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

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
    <section className="relative py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
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

            {/* FAQs */}
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setExpandedIndex(expandedIndex === index ? null : index)
                  }
                  className="w-full rounded-xl bg-white p-4 text-left shadow-sm transition-all hover:shadow-md"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-teal-900">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-teal-600 transition-transform ${
                        expandedIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {expandedIndex === index && (
                    <div className="mt-3 text-sm text-teal-700">
                      {faq.answer}
                    </div>
                  )}
                </button>
              ))}
            </div>
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
