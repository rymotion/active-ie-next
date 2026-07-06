import { setRequestLocale } from "next-intl/server";
import { getInstagramMedia } from "@/services/instagram";
import { getFundingNumbers } from "@/services/funding";
import { getFundingDashboard } from "@/services/funding-dashboard";
import Content from "./content";

export const revalidate = 3600;

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [igResult, funding, orgDashboard] = await Promise.all([
    getInstagramMedia(12),
    getFundingNumbers(),
    getFundingDashboard(), // no slug = organization-wide aggregate
  ]);
  return (
    <Content
      igPosts={igResult.posts ?? null}
      funding={funding}
      orgDashboard={orgDashboard}
    />
  );
}
