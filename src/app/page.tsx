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
  const res = await fetch(
    "https://doctorrecetas.com/api/categorias_principales.php",
    {
      next: { revalidate: 3600 },
    },
  );
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
