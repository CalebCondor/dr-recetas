
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
  pq_codigo: string | null;
  category?: string;
}

export interface ApiResponse {
  [key: string]: ApiServiceItem[];
}

export async function getProductBySlug(slug: string): Promise<ApiServiceItem | null> {
  console.log(`🔍 [Server] Fetching product: ${slug}`);
  try {
    const res = await fetch("https://doctorrecetas.com/v3/api.php?action=getServices", {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
      next: { revalidate: 0 } 
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const allData: ApiResponse = await res.json();
    let foundProduct: ApiServiceItem | null = null;

    Object.entries(allData).forEach(([categoryName, items]) => {
      const match = items.find((item) => {
        const itemSlug = item.slug?.trim().toLowerCase();
        const targetSlug = slug?.trim().toLowerCase();
        
        if (itemSlug === targetSlug) return true;
        try {
           if (decodeURIComponent(itemSlug) === decodeURIComponent(targetSlug)) return true;
        } catch {}
        return false;
      });

      if (match) {
        foundProduct = { ...match, category: categoryName };
      }
    });

    return foundProduct;
  } catch (error) {
    console.error("❌ [Server] Error fetching product:", error);
    return null;
  }
}

export interface Category {
  id: number;
  nombre: string;
  tipo: number;
  tag: string;
  lead: string;
  imagen: string;
}

export async function getRelatedProducts(categorySlug: string, currentSlug: string): Promise<ApiServiceItem[]> {
  try {
    const [servicesRes, catsRes] = await Promise.all([
      fetch("https://doctorrecetas.com/v3/api.php?action=getServices", { next: { revalidate: 0 } }),
      fetch("https://doctorrecetas.com/v3/api_categorias.php", { next: { revalidate: 0 } })
    ]);

    if (!servicesRes.ok || !catsRes.ok) throw new Error("Failed to fetch data");

    const allData: ApiResponse = await servicesRes.json();
    const categories: Category[] = await catsRes.json();

    // Find the current category's info to get its apiTag
    const currentCat = categories.find(
      (c) => (c.tag?.toLowerCase().replace(/\s+/g, "-") || "otros") === categorySlug
    );

    const targetTag = currentCat?.tag?.toLowerCase();

    const allItems: ApiServiceItem[] = [];
    Object.entries(allData).forEach(([catName, items]) => {
      items.forEach(item => allItems.push({ ...item, category: catName }));
    });

    let related = allItems.filter(item => item.slug !== currentSlug);

    if (targetTag) {
      related = related.filter((item) => {
        const itemTags = item.pq_tag
          ?.split(",")
          .map((t) => t.trim().toLowerCase()) || [];
        
        const hasTag = itemTags.includes(targetTag);
        
        // Also match by category name if it's the same as the current category
        const isInCategory = currentCat && item.category?.toLowerCase() === currentCat.nombre.toLowerCase();

        return hasTag || isInCategory;
      });
      
      // Strict exclusion: if we are in laboratory, don't show imaging
      if (targetTag.includes("laboratorio")) {
        related = related.filter(item => {
          const itemTags = item.pq_tag?.toLowerCase() || "";
          return !itemTags.includes("imagen");
        });
      }
    } else {
      // Fallback to slug match if no category tag found
      related = related.filter(item => item.slug.includes(categorySlug));
    }

    // Shuffle and limit to 3 for the UI
    return related
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
}
