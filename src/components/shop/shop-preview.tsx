"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Product } from "@/services/shopify";
import ProductGrid from "./product-grid";

/** Landing-page strip: a few products plus a link to the full shop. */
export default function ShopPreview({ products }: { products: Product[] }) {
  const t = useTranslations();

  return (
    <div>
      <ProductGrid products={products.slice(0, 4)} />
      {products.length > 0 ? (
        <div className="mt-8 flex justify-center">
          <Link
            href="/products"
            className="rounded-md border border-cream/40 px-6 py-3 font-semibold text-cream transition-colors hover:border-cream hover:text-white"
          >
            {t("products.shopAll")} →
          </Link>
        </div>
      ) : null}
    </div>
  );
}
