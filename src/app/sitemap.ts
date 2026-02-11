import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://drreceta.com";

  // Páginas estáticas principales
  const staticPages = ["", "/servicios", "/nosotros", "/contacto"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    }),
  );

  // Categorías de servicios principales
  const serviceCategories = [
    "citas-medicas",
    "certificados-medicos",
    "recetas-digitales",
    "evaluaciones-medicas",
    "otros",
  ].map((category) => ({
    url: `${baseUrl}/servicios/${category}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...serviceCategories];
}
