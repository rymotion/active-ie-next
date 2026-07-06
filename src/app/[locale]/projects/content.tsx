"use client";
import Screen from "@/components/screen/screen";
import { Analytics } from "@vercel/analytics/react";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/container";
import BikeProjectWindow from "./bike_project_window.jsx";
import BikeParkForm from "./bike park form_b.jsx";
import GofundmeWidget from "@/components/gofundme.jsx";
import ProjectDetail from "@/components/projects/project-detail";
import EmbedOnDemand from "@/components/projects/embed-on-demand";
import GivebutterEmbed from "@/components/projects/givebutter-embed";
import { projects } from "@/content/projects";
import type { FundingNumbers } from "@/services/funding";
import type { FundingDashboardData } from "@/services/funding-dashboard";
import FundingDashboard from "@/components/projects/funding-dashboard";

export default function ProjectsContent({
  funding,
  dashboards = {},
}: {
  funding: Record<string, FundingNumbers>;
  dashboards?: Record<string, FundingDashboardData | null>;
}) {
  const t = useTranslations();
  const bikeRamps = projects.find((p) => p.slug === "bike-ramps")!;
  const generalFund = projects.find((p) => p.slug === "general-fund")!;

  return (
    <Screen>
      <Analytics />
      <Container size="wide" className="py-12">
        <div className="mb-4 text-center">
          <h1 className="mb-4 font-display text-display uppercase tracking-wide">
            {t("projects.title")}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-cream/80">
            {t("projects.description")}
          </p>
        </div>

        <ProjectDetail project={bikeRamps} funding={funding["bike-ramps"]}>
          {/* Connection-stage evidence: build updates + a zero-cost way to participate */}
          <div className="flex flex-col gap-10">
            {dashboards["bike-ramps"] ? (
              <FundingDashboard data={dashboards["bike-ramps"]} />
            ) : null}
            <BikeProjectWindow />
            <div>
              <h3 className="mb-2 font-display text-title uppercase tracking-wide">
                {t("projects.publicCommentTitle")}
              </h3>
              <p className="mb-4 text-cream/80">
                {t("projects.publicCommentDescription")}
              </p>
              <BikeParkForm />
            </div>
            <EmbedOnDemand cta={t("common.viewOnGofundme")}>
              <GofundmeWidget />
            </EmbedOnDemand>
          </div>
        </ProjectDetail>

        <ProjectDetail
          project={generalFund}
          funding={funding["general-fund"]}
        >
          <EmbedOnDemand cta={t("projects.items.generalFund.cta")}>
            <GivebutterEmbed />
          </EmbedOnDemand>
        </ProjectDetail>
      </Container>
    </Screen>
  );
}
