import dynamic from "next/dynamic";
import Hero from "@/components/hero-section";
import { ServicesCarousel } from "@/components/home/services-carousel";
import { PageWrapper } from "@/components/page-wrapper";

// Dynamically import components below the fold
const ChatbotSection = dynamic(() =>
  import("@/components/home/chatbot-section").then((mod) => mod.ChatbotSection),
);
const WhyChooseUs = dynamic(() =>
  import("@/components/home/why-choose-us").then((mod) => mod.WhyChooseUs),
);
const HowItWorks = dynamic(() =>
  import("@/components/home/how-it-works").then((mod) => mod.HowItWorks),
);
const FAQSection = dynamic(() =>
  import("@/components/home/faq-section").then((mod) => mod.FAQSection),
);
const TestimonialsSection = dynamic(() =>
  import("@/components/home/testimonials-section").then(
    (mod) => mod.TestimonialsSection,
  ),
);
const BenefitsSection = dynamic(() =>
  import("@/components/home/benefits-section").then(
    (mod) => mod.BenefitsSection,
  ),
);

import { servicesData } from "@/lib/services-data";

const services = servicesData.map((service) => ({
  title: service.title,
  description: service.description,
  imageSrc: service.imageSrc,
  imageAlt: service.imageAlt,
  href: `/servicios/${service.slug}`,
}));

export default function Home() {
  return (
    <PageWrapper>
      <Hero />

      {/* Services Section */}
      <section id="servicios" className="w-full sm:py-12 relative group">
        <div className="w-full px-6 md:px-12 lg:px-[8%]">
          <div className="flex justify-center mb-16 px-2">
            <div className="space-y-4 text-center">
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-[#0D4B4D] tracking-tighter leading-none">
                Nuestros Servicios
              </h2>
              <p className="text-teal-900/60 font-medium text-lg">
                Explora nuestras soluciones médicas digitales
              </p>
            </div>
          </div>

          {/* Unified Carousel for all screens */}
          <div className="relative">
            <ServicesCarousel services={services} />
          </div>
        </div>
      </section>

      <ChatbotSection />
      <WhyChooseUs />
      <HowItWorks />
      <FAQSection />
      <TestimonialsSection />
      <BenefitsSection />
    </PageWrapper>
  );
}
