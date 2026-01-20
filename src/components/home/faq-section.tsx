"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "¿En qué tiempo recibo mi licencia?",
    answer:
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatu.\n\nQuis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatu.",
  },
  {
    id: 2,
    question: "¿Contrary to popular belief, Lorem Ipsum is not simply?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    question: "¿Contrary to popular belief, Lorem Ipsum is not simply?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 4,
    question: "¿Contrary to popular belief, Lorem Ipsum is not simply?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 5,
    question:
      "¿Contrary to popular belief, Lorem Ipsum is not simply lorem uosum?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export function FAQSection() {
  const leftColumnItems = faqItems.slice(0, 3);
  const rightColumnItems = faqItems.slice(3);

  return (
    <section className="py-20 lg:py-32 px-4 md:px-12 lg:px-[8%]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-teal-600 font-semibold text-sm mb-2 uppercase tracking-wider">
            ¿Preguntas?
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0D4B4D] text-balance">
            Nosotras tenemos respuestas
          </h2>
        </div>

        {/* FAQ Grid */}
        <div className="grid md:grid-cols-2 gap-6 items-start">
          {/* Left Column */}
          <Accordion
            type="single"
            collapsible
            defaultValue="item-1"
            className="space-y-4"
          >
            {leftColumnItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={`item-${item.id}`}
                className="border-none rounded-2xl overflow-hidden transition-all duration-300 data-[state=open]:bg-white data-[state=closed]:bg-teal-500 data-[state=open]:shadow-md data-[state=closed]:shadow-sm group"
              >
                <AccordionTrigger className="px-6 py-5 hover:no-underline [&>svg]:hidden">
                  <div className="flex items-center justify-between w-full gap-4">
                    <h3 className="text-left font-bold text-base transition-colors duration-300 group-data-[state=open]:text-[#0D4B4D] group-data-[state=closed]:text-white">
                      {item.question}
                    </h3>
                    <div className="shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-45">
                      <Plus className="w-6 h-6 transition-colors duration-300 group-data-[state=open]:text-teal-600 group-data-[state=closed]:text-white" />
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 mt-2">
                  <div className="text-gray-600 text-sm leading-relaxed space-y-4 whitespace-pre-line">
                    {item.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Right Column */}
          <Accordion type="single" collapsible className="space-y-4">
            {rightColumnItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={`item-${item.id}`}
                className="border-none rounded-2xl overflow-hidden transition-all duration-300 data-[state=open]:bg-white data-[state=closed]:bg-teal-500 data-[state=open]:shadow-md data-[state=closed]:shadow-sm group"
              >
                <AccordionTrigger className="px-6 py-5 hover:no-underline [&>svg]:hidden">
                  <div className="flex items-center justify-between w-full gap-4">
                    <h3 className="text-left font-bold text-base transition-colors duration-300 group-data-[state=open]:text-[#0D4B4D] group-data-[state=closed]:text-white">
                      {item.question}
                    </h3>
                    <div className="shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-45">
                      <Plus className="w-6 h-6 transition-colors duration-300 group-data-[state=open]:text-teal-600 group-data-[state=closed]:text-white" />
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 mt-2">
                  <div className="text-gray-600 text-sm leading-relaxed space-y-4 whitespace-pre-line">
                    {item.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
