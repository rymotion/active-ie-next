import { setRequestLocale } from "next-intl/server";
import { shopifyService } from "@/services/shopify";
import LandingClient from "./landing-client";

/**
 * Server shell: fetches shop data (cached 5 min) and hands it to the
 * client scroll-story. Later phases add Instagram posts here the same way.
 */
export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { products } = shopifyService.isConfigured()
    ? await shopifyService.getProducts(8)
    : { products: [] };

  return <LandingClient products={products} />;
}
