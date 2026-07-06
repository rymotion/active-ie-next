import { setRequestLocale } from "next-intl/server";
import { getFundingNumbers } from "@/services/funding";
import { getFundingDashboard } from "@/services/funding-dashboard";
import ProjectsContent from "./content";

export const revalidate = 3600;

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [funding, bikeRampsDashboard] = await Promise.all([
    getFundingNumbers(),
    getFundingDashboard("bike-ramps"),
  ]);
  return (
    <ProjectsContent
      funding={funding}
      dashboards={{ "bike-ramps": bikeRampsDashboard }}
    />
  );
}
