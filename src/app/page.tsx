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

const services = [
  {
    title: "Ordenes médicas",
    description:
      "Obtén de forma digital tus órdenes para Laboratorios, Rayos X, CT Scan, MRI y más, con entrega inmediata a tu correo electrónico.",
    imageSrc: "/citas-medicas/1.png",
    imageAlt: "Ordenes médicas",
  },
  {
    title: "Certificados médicos",
    description:
      "Emisión rápida de certificados de salud oficiales para procesos de empleo, estudios, deportes o viajes, validados por médicos expertos.",
    imageSrc: "/citas-medicas/2.png",
    imageAlt: "Certificados médicos",
  },
  {
    title: "Consultas médicas",
    description:
      "Accede a atención médica general y primaria de alta calidad desde la comodidad de tu hogar, sin largas filas ni salas de espera.",
    imageSrc: "/citas-medicas/3.png",
    imageAlt: "Consultas médicas",
  },
  {
    title: "Salud y bienestar",
    description:
      "Programas preventivos y de cuidado integral diseñados para mejorar tu calidad de vida y mantener un control riguroso de tu salud.",
    imageSrc: "/citas-medicas/1.png",
    imageAlt: "Salud y bienestar",
  },
  {
    title: "Para él",
    description:
      "Servicios preventivos y diagnósticos especializados en salud masculina, enfocados en el bienestar integral y rendimiento óptimo.",
    imageSrc: "/citas-medicas/2.png",
    imageAlt: "Para él",
  },
  {
    title: "Para ella",
    description:
      "Atención médica personalizada y servicios especializados para las necesidades de salud femenina, brindando soluciones preventivas y cuidado continuo.",
    imageSrc: "/citas-medicas/3.png",
    imageAlt: "Para ella",
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
