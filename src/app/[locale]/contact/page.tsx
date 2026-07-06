import { setRequestLocale } from "next-intl/server";
import { getInstagramMedia } from "@/services/instagram";
import Content from "./content";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const result = await getInstagramMedia(12);
  return <Content igPosts={result.posts ?? null} />;
}
