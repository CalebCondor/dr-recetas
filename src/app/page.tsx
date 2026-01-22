import dynamic from "next/dynamic";
import Hero from "@/components/hero-section";
import { ServiceCard } from "@/components/home/service-card";
import { ServicesCarousel } from "@/components/home/services-carousel";
import { PageWrapper } from "@/components/page-wrapper";

// Dynamically import components below the fold
const ChatbotSection = dynamic(() =>
  import("@/components/home/chatbot-section").then((mod) => mod.ChatbotSection)
);
const WhyChooseUs = dynamic(() =>
  import("@/components/home/why-choose-us").then((mod) => mod.WhyChooseUs)
);
const HowItWorks = dynamic(() =>
  import("@/components/home/how-it-works").then((mod) => mod.HowItWorks)
);
const FAQSection = dynamic(() =>
  import("@/components/home/faq-section").then((mod) => mod.FAQSection)
);
const TestimonialsSection = dynamic(() =>
  import("@/components/home/testimonials-section").then(
    (mod) => mod.TestimonialsSection
  )
);
const BenefitsSection = dynamic(() =>
  import("@/components/home/benefits-section").then(
    (mod) => mod.BenefitsSection
  )
);

const services = [
  {
    title: "Receta de medicamentos o “refill”",
    description: "Receta de medicamentos o “refill”.",
    imageSrc: "/citas-medicas/3.png",
    imageAlt: "Revisión ultrasónica",
  },
  {
    title: "ECBC + DIFF Lab",
    description:
      "Electrocardiograma completo con análisis digital avanzado y monitoreo cardíaco en tiempo real.",
    imageSrc: "/citas-medicas/2.png",
    imageAlt: "ECG Scan",
  },
  {
    title: "Análisis de orina y cultivo de orina",
    description:
      "Medición precisa de composición corporal, porcentaje de grasa y masa muscular mediante bioimpedancia.",
    imageSrc: "/citas-medicas/1.png",
    imageAlt: "Análisis corporal",
  },
];

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

          {/* Desktop Grid / Mobile Carousel */}
          <div className="relative">
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both hover:-translate-y-2 transition-transform"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <ServiceCard {...service} />
                </div>
              ))}
            </div>

            <div className="md:hidden">
              <ServicesCarousel services={services} />
            </div>
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
