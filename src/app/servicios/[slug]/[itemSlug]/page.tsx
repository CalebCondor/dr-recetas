import { getProductBySlug } from "@/lib/api";
import { ProductDetailClient } from "@/components/product-detail-client";
import { PageWrapper } from "@/components/page-wrapper";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

  return <ProductDetailClient product={product} categorySlug={slug} />;
}
