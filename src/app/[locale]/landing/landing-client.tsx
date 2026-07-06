"use client";
import Screen from "@/components/screen/screen";
import OrgContentBody from "@/components/about-body";
import { Analytics } from "@vercel/analytics/react";
import { Link } from "@/i18n/navigation";
import VolunteerInterestWidget from "../volunteer/volunteer_interest";
import { SubStackNibble } from "@/app/[locale]/blog/substack";
import SweatpalEvents from "@/components/events/sw_events";
import ShopPreview from "@/components/shop/shop-preview";
import type { Product } from "@/services/shopify";
import type { IgPost } from "@/services/instagram";
import InstagramCarousel from "@/components/instagram/instagram-carousel";
import InstagramFallback from "@/components/instagram/instagram-fallback";
import ProjectCard from "@/components/projects/project-card";
import EmbedOnDemand from "@/components/projects/embed-on-demand";
import GivebutterEmbed from "@/components/projects/givebutter-embed";
import { projects } from "@/content/projects";
import type { FundingNumbers } from "@/services/funding";
import { useTranslations } from "next-intl";
import VideoBackdrop from "@/components/landing/video-backdrop";
import Hero from "@/components/landing/hero";
import StorySection from "@/components/landing/story-section";
import SectionIndicator from "@/components/landing/section-indicator";
import { SectionProvider } from "@/components/landing/section-context";

const HERO_VIDEO =
  "https://cdn.shopify.com/videos/c/o/v/ee108db5cf354e62bf3cca4363d5bdb8.mp4";

export default function LandingClient({
  products,
  igPosts,
  funding,
}: {
  products: Product[];
  igPosts: IgPost[] | null;
  funding: Record<string, FundingNumbers>;
}) {
  const t = useTranslations();

  return (
    <>
      <Analytics />
      <Screen transparentHeader>
        <VideoBackdrop src={HERO_VIDEO} poster="/hero-poster.jpg" />

        <SectionProvider>
          <Hero />

          <StorySection
            id="mission"
            label={t("landing.missionLabel")}
            size="prose"
          >
            <OrgContentBody />
          </StorySection>

          <StorySection
            id="events"
            label={t("nav.events")}
            heading={t("landing.eventCalendars")}
            size="wide"
          >
            <SweatpalEvents />
            <div className="mt-8 flex justify-center">
              <Link
                href="/events"
                className="rounded-md border border-cream/40 px-6 py-3 font-semibold text-cream transition-colors hover:border-cream hover:text-white"
              >
                {t("nav.events")} →
              </Link>
            </div>
          </StorySection>

          <StorySection
            id="projects"
            label={t("nav.projects")}
            heading={t("projects.title")}
          >
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  funding={funding[project.slug]}
                />
              ))}
            </div>
          </StorySection>

          <StorySection
            id="contrast-therapy"
            label={t("nav.contrastTherapy")}
            heading={t("landing.contrastTherapyTitle")}
            size="prose"
          >
            <p className="mb-8 text-center text-lg text-cream/90">
              {t("landing.contrastTherapyTeaser")}
            </p>
            <div className="flex justify-center">
              <Link
                href="/contrast-therapy"
                className="inline-block rounded-md bg-maroon px-6 py-3 font-semibold text-white transition-colors hover:bg-red-800"
              >
                {t("landing.contrastTherapyCta")}
              </Link>
            </div>
          </StorySection>

          <StorySection
            id="shop"
            label={t("nav.products")}
            heading={t("landing.shopTitle")}
            size="wide"
          >
            <ShopPreview products={products} />
          </StorySection>

          <StorySection
            id="donate"
            label={t("landing.donate")}
            heading={t("landing.donate")}
            size="prose"
          >
            <p className="mb-6 text-center text-lg text-cream/90">
              {t("donation.proceedsDescription")}
            </p>
            <p className="mb-8 text-center text-cream/80">
              {t("donation.partnerDescription")}
            </p>
            <EmbedOnDemand cta={t("projects.items.generalFund.cta")}>
              <GivebutterEmbed />
            </EmbedOnDemand>
          </StorySection>

          <StorySection
            id="volunteer"
            label={t("landing.volunteer")}
            heading={t("landing.volunteer")}
          >
            <div className="flex justify-center">
              <VolunteerInterestWidget />
            </div>
          </StorySection>

          <StorySection
            id="blog"
            label={t("nav.blog")}
            heading={t("landing.readBlog")}
          >
            <div className="flex justify-center">
              <SubStackNibble />
            </div>
          </StorySection>

          <StorySection
            id="instagram"
            label={t("instagram.title")}
            heading={t("instagram.title")}
            size="wide"
          >
            {igPosts && igPosts.length > 0 ? (
              <InstagramCarousel posts={igPosts} />
            ) : (
              <InstagramFallback />
            )}
          </StorySection>

          <SectionIndicator />
        </SectionProvider>
      </Screen>
    </>
  );
}
