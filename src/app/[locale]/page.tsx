import dynamic from "next/dynamic";
import Hero from "@/components/home/hero-section";
import { PageWrapper } from "@/components/page-wrapper";
import { ServiceBento } from "@/components/home/service-bento";
import { ReviewsSectionCopy } from "@/components/home/reviews-section copy";

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
const ReviewsSection = dynamic(() =>
  import("@/components/home/reviews-section").then((mod) => mod.ReviewsSection),
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

import { getTranslations } from "next-intl/server";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const categories = await getCategories();
  const t = await getTranslations({ locale, namespace: "DynamicServices" });

  const services = categories.map((cat: Category) => {
    // Usamos el ID de la API como llave para la traducción (ej: service_7)
    const key = `service_${cat.id}`;

    // Intentamos obtener la traducción del JSON
    // t(`service_${id}.title`)
    const translatedTitle = t.has(`${key}.title`)
      ? t(`${key}.title`)
      : cat.nombre;
    const translatedDescription = t.has(`${key}.description`)
      ? t(`${key}.description`)
      : cat.lead;

    return {
      title: translatedTitle,
      description: translatedDescription,
      imageSrc: cat.imagen,
      imageAlt: translatedTitle,
      href: `/servicios/${cat.tag?.toLowerCase().replace(/\s+/g, "-") || "otros"}`,
    };
  });

  return (
    <div id="home" className="bg-[#F2FAEC]">
      <PageWrapper >
        <div className="relative overflow-hidden">
          <Hero />
          <ServiceBento services={services} />
        </div>
        
        <ReviewsSectionCopy />
        

        

        <WhyChooseUs />
        <HowItWorks />
        <FAQSection />
        <ReviewsSection />
        <BenefitsSection />
      </PageWrapper>
    </div>
  );
}
