export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Dr. Recetas",
    description:
      "Servicios médicos digitales en Puerto Rico. Consultas en línea, recetas digitales y certificados médicos 24/7.",
    url: "https://drreceta.com",
    logo: "https://drreceta.com/logo.png",
    image: "https://drreceta.com/og-image.png",
    telephone: "+1-787-XXX-XXXX",
    email: "contacto@drreceta.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "PR",
      addressRegion: "Puerto Rico",
    },
    sameAs: [
      "https://facebook.com/drrecetas",
      "https://twitter.com/doctorrecetas",
      "https://instagram.com/drrecetas",
    ],
    priceRange: "$$",
    openingHours: "Mo-Su 00:00-23:59",
    areaServed: {
      "@type": "Country",
      name: "Puerto Rico",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Dr. Recetas",
    url: "https://drreceta.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://drreceta.com/servicios?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const medicalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Servicios Médicos Digitales",
    description:
      "Consultas médicas en línea, recetas digitales, certificados médicos y evaluaciones de salud.",
    specialty: ["Telemedicina", "Medicina General", "Certificaciones Médicas"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(medicalServiceSchema),
        }}
      />
    </>
  );
}
