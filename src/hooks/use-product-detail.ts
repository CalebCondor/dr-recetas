import { useState, useEffect } from "react";
import axios from "axios";
import { ApiServiceItem, ApiResponse } from "./use-service-details";

export function useProductDetail(categorySlug: string, productSlug: string) {
  console.log("🎯 useProductDetail called with:", { categorySlug, productSlug });

  const [product, setProduct] = useState<ApiServiceItem | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.warn("⚠️ HOOK MOUNTED - productSlug:", productSlug);

    if (!productSlug) {
      console.error("❌ HOOK ERROR: productSlug is empty/undefined!");
      return;
    }

    let isMounted = true;

    async function fetchProduct() {
      try {
        console.log("🚀 Starting fetch for product slug:", productSlug);
        setLoading(true);

        const res = await axios.get<ApiResponse>(
          "https://doctorrecetas.com/v3/api.php?action=getServices",
        );

        if (!isMounted) {
          console.log("Component unmounted, ignoring response");
          return;
        }

        console.log("✅ API Response received:", res.data);
        const allData = res.data;

        let foundProduct: ApiServiceItem | null = null;

        // Search through all categories

        for (const [categoryName, items] of Object.entries(allData)) {
          // console.log(`📂 Category: ${categoryName} (${items.length} items)`);
          
          const match = items.find((item) => {
            const itemSlug = item.slug?.trim().toLowerCase();
            const targetSlug = productSlug?.trim().toLowerCase();
            
            // Direct match
            if (itemSlug === targetSlug) return true;
            
            // URL decoded match fallback
            try {
               if (decodeURIComponent(itemSlug) === decodeURIComponent(targetSlug)) return true;
            } catch {}

            return false;
          });

          if (match) {
            console.log(`✨ Match found in ${categoryName}:`, match.slug);
            foundProduct = { ...match, category: categoryName };
            break; 
          }
        }

        console.log("=== DEBUG INFO ===");
        console.log("🔍 Searching for slug:", productSlug);
        console.log("📦 Found product:", foundProduct ? foundProduct.slug : "NULL");
        
        if (foundProduct) {
             console.log("✅ Product details loaded successfully");
        } else {
             console.warn("❌ Product NOT found in any category.");
             // Log all slugs to help debug
             const allSlugs = Object.values(allData).flat().map((i: ApiServiceItem) => i.slug);
             console.log("Available slugs sample:", allSlugs.slice(0, 5));
             console.log("Total items scanned:", allSlugs.length);
        }

        if (isMounted) {
          setProduct(foundProduct);
          setLoading(false);
        }
      } catch (error) {
        console.error("❌ Error fetching product detail:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [productSlug]);

  return { product, loading };
}
