import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { servicesData, type ServiceData } from "@/lib/services-data";

export interface Category {
  id: number;
  nombre: string;
  tipo: number;
  tag: string;
  lead: string;
  imagen: string;
}

export interface ApiServiceItem {
  id: number;
  slug: string;
  titulo: string;
  resumen: string;
  detalle: string;
  precio: string;
  imagen: string;
  tags: string[];
  pq_tag: string | null;
  url: string;
  category?: string;
}

export interface ApiResponse {
  [key: string]: ApiServiceItem[];
}

export function useServiceDetails(slug: string) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [apiItems, setApiItems] = useState<ApiServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Sync with local fallback data if found
  const localServiceInfo = servicesData.find((s) => s.slug === slug);
  const [serviceInfo, setServiceInfo] = useState<ServiceData | null>(
    localServiceInfo || null,
  );

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const [servicesRes, catsRes] = await Promise.all([
        axios.get<ApiResponse>(
          "https://doctorrecetas.com/v3/api.php?action=getServices",
        ),
        axios.get("https://doctorrecetas.com/v3/api_categorias.php"),
      ]);

      const allData = servicesRes.data;
      const fetchedCats: Category[] = catsRes.data;
      setCategories(fetchedCats);

      let currentServiceInfo: ServiceData | null = localServiceInfo || null;

      if (slug === "otros") {
        currentServiceInfo = {
          id: "otros",
          slug: "otros",
          title: "Otros Servicios",
          description: "Explora nuestra amplia gama de servicios médicos adicionales.",
          longDescription: "En Doctor Recetas ofrecemos una variedad de servicios complementarios para cubrir todas tus necesidades de salud.",
          imageSrc: "/citas-medicas/1.png",
          imageAlt: "Otros Servicios",
          apiTag: "ALL",
          accordionItems: [],
        };
      }

      if (!currentServiceInfo) {
        const catMatch = fetchedCats.find(
          (c) =>
            (c.tag?.toLowerCase().replace(/\s+/g, "-") || "otros") === slug,
        );
        if (catMatch) {
          currentServiceInfo = {
            id: catMatch.id.toString(),
            slug: slug,
            title: catMatch.nombre,
            description: catMatch.lead,
            longDescription: catMatch.lead,
            imageSrc: catMatch.imagen,
            imageAlt: catMatch.nombre,
            apiTag: catMatch.tag,
            accordionItems: [],
          };
        }
      }

      setServiceInfo(currentServiceInfo || null);

      let relevantItems: ApiServiceItem[] = [];

      if (currentServiceInfo) {
        const flattenedItems: ApiServiceItem[] = [];
        Object.entries(allData).forEach(([categoryName, items]) => {
          items.forEach((item) => {
            flattenedItems.push({ ...item, category: categoryName });
          });
        });

        if (slug === "otros") {
          relevantItems = flattenedItems;
        } else {
          const targetTag = currentServiceInfo.apiTag;

          if (targetTag) {
            relevantItems = flattenedItems.filter((item) => {
              const hasTag = item.pq_tag
                ?.split(",")
                .map((t) => t.trim().toLowerCase())
                .includes(targetTag.toLowerCase());

              const isInCategory =
                item.category?.toLowerCase() ===
                currentServiceInfo!.title.toLowerCase();

              return hasTag || isInCategory;
            });
          }

          if (relevantItems.length === 0) {
            relevantItems = flattenedItems.filter((item) => {
              const titleMatch = item.titulo
                .toLowerCase()
                .includes(currentServiceInfo!.title.toLowerCase());
              const slugMatch = item.slug.includes(slug);
              return titleMatch || slugMatch;
            });
          }
        }
      }

      if (relevantItems.length === 0 && Object.keys(allData).length > 0) {
        const firstCategoryKey = Object.keys(allData)[0];
        relevantItems = (allData[firstCategoryKey] || []).map((item) => ({
          ...item,
          category: firstCategoryKey,
        }));
      }

      setApiItems(relevantItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [slug, localServiceInfo]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    categories,
    apiItems,
    loading,
    serviceInfo,
    refresh: fetchData
  };
}
