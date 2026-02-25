import dynamic from "next/dynamic";
import Hero from "@/components/home/hero-section";
import { PageWrapper } from "@/components/page-wrapper";
import { ServiceBento } from "@/components/home/service-bento";
import { ReviewsSectionCopy } from "@/components/home/reviews-section copy";

// Dynamically import components below the fold


const WhyChooseUs = dynamic(() =>
  import("@/components/home/why-choose-us").then((mod) => mod.WhyChooseUs),
);
const HowItWorks = dynamic(() =>
  import("@/components/home/how-it-works").then((mod) => mod.HowItWorks),
);
const FAQSection = dynamic(() =>
  import("@/components/home/faq-section").then((mod) => mod.FAQSection),
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
  try {
    const res = await fetch(
      "https://doctorrecetas.com/api/categorias_principales.php",
      {
        cache: "no-store", // Siempre obtener datos frescos
      },
    );
    if (!res.ok) {
      console.error(
        `API error: ${res.status} ${res.statusText}`,
      );
      return [];
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

import { getTranslations } from "next-intl/server";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const categories = await getCategories();
  const t = await getTranslations({ locale, namespace: "Categories" });

  // Mapeo de tags del API a claves de Categories en JSON
  const tagToKeyMap: Record<string, string> = {
    "Citas Medicas": "citas-medicas",
    "lab": "lab",
    "Para el": "para-el",
    "Para ella": "para-ella",
    "Membresia": "membresia",
    "": "otros",
  };

  const rawServices = categories.map((cat: Category) => {
    // Mapear el tag del API a la clave correcta en Categories
    const categoryKey = tagToKeyMap[cat.tag] || "otros";

    // Obtener la traducción de Categories
    const translatedTitle = t.has(`${categoryKey}.title`)
      ? t(`${categoryKey}.title`)
      : cat.nombre;
    const translatedDescription = t.has(`${categoryKey}.description`)
      ? t(`${categoryKey}.description`)
      : cat.lead;

    return {
      title: translatedTitle,
      description: translatedDescription,
      imageSrc: cat.imagen,
      imageAlt: translatedTitle,
      href: `/servicios/${categoryKey}`,
    };
  });

  // Eliminar duplicados por href (mantener primera aparición)
  const seen = new Set<string>();
  const services = rawServices.filter((s: { href: string }) => {
    if (seen.has(s.href)) return false;
    seen.add(s.href);
    return true;
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
        <BenefitsSection />
      </PageWrapper>
    </div>
  );
}
