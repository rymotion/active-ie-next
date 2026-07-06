import { setRequestLocale } from "next-intl/server";
import { shopifyService } from "@/services/shopify";
import { getInstagramMedia } from "@/services/instagram";
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

  const [{ products }, igResult] = await Promise.all([
    shopifyService.isConfigured()
      ? shopifyService.getProducts(8)
      : Promise.resolve({ products: [] }),
    getInstagramMedia(12),
  ]);

  return (
    <LandingClient products={products} igPosts={igResult.posts ?? null} />
  );
}
