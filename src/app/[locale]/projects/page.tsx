import { setRequestLocale } from "next-intl/server";
import { getFundingNumbers } from "@/services/funding";
import ProjectsContent from "./content";

export const revalidate = 3600;

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const funding = await getFundingNumbers();
  return <ProjectsContent funding={funding} />;
}
