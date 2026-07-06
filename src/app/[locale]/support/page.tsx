import { setRequestLocale } from "next-intl/server";
import { getInstagramMedia } from "@/services/instagram";
import { getFundingNumbers } from "@/services/funding";
import Content from "./content";

export const revalidate = 3600;

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [igResult, funding] = await Promise.all([
    getInstagramMedia(12),
    getFundingNumbers(),
  ]);
  return <Content igPosts={igResult.posts ?? null} funding={funding} />;
}
