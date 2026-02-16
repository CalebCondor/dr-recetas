import { getProductBySlug, getRelatedProducts } from "@/lib/api";
import { ProductDetailClient } from "@/components/servicios/product-detail-client";
import { PageWrapper } from "@/components/page-wrapper";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RelatedBentoCard } from "@/app/[locale]/servicios/[slug]/page";

// Disable static generation for this dynamic route to ensure fresh data
export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string; itemSlug: string }>;
}) {
  const { slug, itemSlug } = await params;

  // Fetch data on the server side
  const product = await getProductBySlug(itemSlug);

  if (!product) {
    return (
      <PageWrapper>
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFDFD] space-y-4">
          <h1 className="text-2xl font-bold text-[#0D4B4D]">
            Producto no encontrado
          </h1>
          <div className="bg-red-50 p-4 rounded text-red-600 font-mono text-xs max-w-lg">
            Debug: Buscando slug {itemSlug} en la API.
          </div>
          <p className="text-slate-500">
            Lo sentimos, no pudimos encontrar el servicio que buscas.
          </p>
          <Link href={`/servicios/${slug}`}>
            <Button className="bg-[#0D4B4D] text-white rounded-full">
              Volver a {slug}
            </Button>
          </Link>
        </div>
      </PageWrapper>
    );
  }

  // Fetch related products from the same category
  const relatedProducts = await getRelatedProducts(
    product.category || "",
    product.slug,
  );

  return (
    <>
      <ProductDetailClient product={product} categorySlug={slug} />

      {relatedProducts.length > 0 && (
        <div className="pb-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-8">
            <div className="mb-12">
              <h2 className="text-center text-3xl md:text-4xl font-black text-[#0D4B4D] tracking-tighter">
                Servicios Relacionados
              </h2>
              <p className="text-center text-slate-500 font-medium mt-2">
                Otros servicios en la categoría {product.category} que podrían
                interesarte.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.slice(0, 3).map((item, idx) => (
                <div key={item.id} className="h-[420px]">
                  <RelatedBentoCard
                    title={item.titulo}
                    content={item.resumen}
                    price={item.precio}
                    image={item.imagen}
                    category={item.category}
                    index={idx}
                    slug={item.slug}
                    categorySlug={slug}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
