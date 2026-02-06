import dynamic from "next/dynamic";
import Hero from "@/components/home/hero-section";
import { ServicesCarousel } from "@/components/home/services-carousel";
import { PageWrapper } from "@/components/page-wrapper";
import { ServicesSection } from "@/components/home/services-section";

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

interface Category {
  id: number;
  nombre: string;
  tipo: number;
  tag: string;
  lead: string;
  imagen: string;
}

async function getCategories() {
  const res = await fetch("https://doctorrecetas.com/v3/api_categorias.php", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const categories = await getCategories();

  const services = categories.map((cat: Category) => ({
    title: cat.nombre,
    description: cat.lead,
    imageSrc: cat.imagen,
    imageAlt: cat.nombre,
    href: `/servicios/${cat.tag?.toLowerCase().replace(/\s+/g, "-") || "otros"}`,
  }));
  return (
    <PageWrapper>
      <div className="relative overflow-hidden">
        {/* Optimized Background Gradients - Limit to Hero + Half of Services */}
        <div className="absolute top-0 left-0 w-full h-[75%] z-0 pointer-events-none select-none overflow-hidden">
          {/* Desktop Version - Consolidated to reduce GPU layers */}
          <div
            className="hidden lg:block absolute -top-[5%] -right-[10%] w-[110%] h-[110%] opacity-60 mix-blend-multiply blur-[120px] will-change-transform"
            style={{
              background: `
                radial-gradient(circle at 85% 35%, rgba(34, 197, 94, 0.45) 0%, rgba(20, 184, 166, 0.15) 50%, transparent 70%),
                radial-gradient(circle at 90% 10%, rgba(132, 204, 22, 0.4) 0%, transparent 70%)
              `,
            }}
          />

          {/* Mobile Version - Highly optimized: No blend modes, less blur */}
          <div
            className="lg:hidden absolute inset-0 w-full h-full opacity-40 blur-3xl will-change-transform"
            style={{
              background: `
                radial-gradient(circle at 95% 15%, rgba(34, 197, 94, 0.25) 0%, transparent 60%),
                radial-gradient(circle at 5% 80%, rgba(132, 204, 22, 0.15) 0%, transparent 60%)
              `,
            }}
          />

          {/* Smooth Fade-out to White to end gracefully in the middle of services */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-white via-white to-transparent" />
        </div>

        <Hero />
        <ServicesSection services={services} />
      </div>

      <ChatbotSection />
      <WhyChooseUs />
      <HowItWorks />
      <FAQSection />
      <TestimonialsSection />
      <BenefitsSection />
    </PageWrapper>
  );
}
