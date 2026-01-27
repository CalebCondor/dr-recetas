import { useState, useEffect } from "react";
import axios from "axios";
import { ApiServiceItem, ApiResponse } from "./use-service-details";

export function useProductDetail(categorySlug: string, productSlug: string) {
  const [product, setProduct] = useState<ApiServiceItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await axios.get<ApiResponse>(
          "https://doctorrecetas.com/v3/api.php?action=getServices",
        );
        const allData = res.data;

        let foundProduct: ApiServiceItem | null = null;

        // Search through all categories
        Object.values(allData).forEach((items) => {
          const match = items.find((item) => item.slug === productSlug);
          if (match) {
            foundProduct = match;
          }
        });

        setProduct(foundProduct);
      } catch (error) {
        console.error("Error fetching product detail:", error);
      } finally {
        setLoading(false);
      }
    }

    if (productSlug) {
      fetchProduct();
    }
  }, [productSlug]);

  return { product, loading };
}
