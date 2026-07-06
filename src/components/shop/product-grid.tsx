import { useTranslations } from "next-intl";
import type { Product } from "@/services/shopify";
import ProductCard from "./product-card";

export const SHOPIFY_STORE_URL = "https://activeie.myshopify.com";

/** Responsive product grid with an empty-state fallback to the hosted store. */
export default function ProductGrid({ products }: { products: Product[] }) {
  const t = useTranslations();

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <p className="text-lg text-cream/80">{t("products.unavailable")}</p>
        <a
          href={SHOPIFY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-maroon px-6 py-3 font-semibold text-white transition-colors hover:bg-red-800"
        >
          {t("products.visitStore")}
        </a>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
