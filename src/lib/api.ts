
import axios from "axios";

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

export async function getProductBySlug(slug: string): Promise<ApiServiceItem | null> {
  console.log(`🔍 [Server] Fetching product: ${slug}`);
  try {
    const res = await axios.get<ApiResponse>(
      "https://doctorrecetas.com/v3/api.php?action=getServices",
      {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      }
    );
    const allData = res.data;
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
