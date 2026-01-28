

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
      // In Next.js, we can also use tags for revalidation
      next: { revalidate: 0 } 
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const allData: ApiResponse = await res.json();
    let foundProduct: ApiServiceItem | null = null;

    // Search logic
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
