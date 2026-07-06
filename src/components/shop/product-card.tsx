import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { formatPrice } from "@/lib/format-price";
import type { Product } from "@/services/shopify";

/**
 * Brand product card. The whole card links to the Shopify-hosted product
 * page, where their checkout takes over — no cart is maintained on-site.
 */
export default function ProductCard({ product }: { product: Product }) {
  const t = useTranslations();
  const locale = useLocale();
  const image = product.featuredImage ?? product.images[0];

  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-lg border border-cream/15 bg-black/60 transition-colors hover:border-cream/50 focus-visible:border-cream"
    >
      <div className="relative aspect-square w-full bg-cream/5">
        {image ? (
          <Image
            src={image.src}
            alt={image.altText || product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-display text-2xl text-cream/40">
            {product.title}
          </div>
        )}
        {!product.available ? (
          <span className="absolute left-3 top-3 rounded bg-maroon px-2 py-1 text-xs font-bold uppercase tracking-wider text-white">
            {t("products.soldOut")}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-display text-xl tracking-wide text-white">
          {product.title}
        </h3>
        <p className="mt-auto text-lg font-semibold text-cream">
          {formatPrice(product.price, product.currencyCode, locale)}
        </p>
      </div>
    </a>
  );
}
