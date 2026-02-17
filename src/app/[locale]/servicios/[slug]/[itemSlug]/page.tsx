import { getProductBySlug, getRelatedProducts } from "@/lib/api";
import { ProductDetailClient } from "@/components/servicios/product-detail-client";
import { PageWrapper } from "@/components/page-wrapper";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RelatedBentoCard } from "@/app/[locale]/servicios/[slug]/page";
import { getTranslations } from "next-intl/server";

// Disable static generation for this dynamic route to ensure fresh data
export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string; itemSlug: string }>;
}) {
  const { locale, slug, itemSlug } = await params;
  const t = await getTranslations({ locale });

  // Fetch data on the server side
  const product = await getProductBySlug(itemSlug);

  if (!product) {
    return (
      <PageWrapper>
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFDFD] space-y-4">
          <h1 className="text-2xl font-bold text-[#0D4B4D]">
            {t("ServicesPage.Static.productNotFound")}
          </h1>
          <div className="bg-red-50 p-4 rounded text-red-600 font-mono text-xs max-w-lg">
            {t("ServicesPage.Static.debugSearch", { slug: itemSlug })}
          </div>
          <p className="text-slate-500">
            {t("ServicesPage.Static.productNotFoundMessage")}
          </p>
          <Link href={`/servicios/${slug}`}>
            <Button className="bg-[#0D4B4D] text-white rounded-full">
              {t("ServicesPage.Static.backToCategory", {
                category: t.has(`ServicesPage.Categories.${slug}.title`)
                  ? t(`ServicesPage.Categories.${slug}.title`)
                  : slug,
              })}
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
                {t("ServicesPage.Static.relatedServicesTitle")}
              </h2>
              <p className="text-center text-slate-500 font-medium mt-2">
                {t("ServicesPage.Static.relatedServicesSubtitle", {
                  category: t.has(`ServicesPage.Categories.${slug}.title`)
                    ? t(`ServicesPage.Categories.${slug}.title`)
                    : product.category || "General",
                })}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.slice(0, 3).map((item, idx) => {
                const title = t.has(`ServicesPage.Items.${item.slug}.title`)
                  ? t(`ServicesPage.Items.${item.slug}.title`)
                  : item.titulo;
                const content = t.has(
                  `ServicesPage.Items.${item.slug}.description`,
                )
                  ? t(`ServicesPage.Items.${item.slug}.description`)
                  : item.resumen;
                const categoryTitle = t.has(
                  `ServicesPage.Categories.${slug}.title`,
                )
                  ? t(`ServicesPage.Categories.${slug}.title`)
                  : item.category;

                return (
                  <div key={item.id} className="h-[420px]">
                    <RelatedBentoCard
                      title={title}
                      content={content}
                      price={item.precio}
                      image={item.imagen}
                      category={categoryTitle}
                      index={idx}
                      slug={item.slug}
                      categorySlug={slug}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
