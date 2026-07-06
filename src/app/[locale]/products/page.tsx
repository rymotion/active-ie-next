import { getTranslations, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/react";
import Screen from "@/components/screen/screen";
import Container from "@/components/layout/container";
import ProductGrid from "@/components/shop/product-grid";
import { shopifyService } from "@/services/shopify";

export default async function Products({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const { products } = shopifyService.isConfigured()
    ? await shopifyService.getProducts(20)
    : { products: [] };

  return (
    <Screen>
      <Analytics />
      <Container size="wide" className="py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-display text-display uppercase tracking-wide">
            {t("products.title")}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-cream/80">
            {t("products.description")}
          </p>
        </div>
        <ProductGrid products={products} />
      </Container>
    </Screen>
  );
}
