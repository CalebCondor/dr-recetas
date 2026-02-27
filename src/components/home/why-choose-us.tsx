"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { motion } from "framer-motion";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { useTranslations } from "next-intl";

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
  const isMounted = useIsMounted();
  const t = useTranslations("HomePage.WhyChooseUs");
  return (
    <section
      className="relative py-5 md:py-16 lg:py-32"
      aria-labelledby="why-choose-us-title"
    >
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
              className="text-4xl text-[#8BAF4A] font-bold mb-6 tracking-tight"
            >
              {t("title")}
            </h2>

            <div className="prose prose-sm text-gray-800/80 mb-8 space-y-4">
              <p className="text-lg leading-relaxed">
                <span className="font-bold text-teal-900">Doctor Recetas</span>,{" "}
                {t("p1")}
              </p>
              <p className="text-lg text-gray-800 leading-relaxed">{t("p2")}</p>
            </div>

            {isMounted && (
              <Accordion type="single" collapsible className="w-full space-y-3">
                {faqs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    className="rounded-xl border border-teal-100/50 bg-white/60 backdrop-blur-sm px-4 shadow-sm transition-all hover:shadow-md"
                  >
                    <AccordionTrigger className="text-gray-900 font-semibold hover:no-underline [&>svg]:text-[#3C5901] [&>svg]:size-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-500">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
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
