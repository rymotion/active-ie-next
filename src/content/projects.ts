/**
 * Project content model. All display text lives in the message files under
 * `projects.items.<i18nKey>.*` (hook, summary, story, cta, shareText) so
 * every locale gets the full funnel copy.
 */
export type ProjectContent = {
  slug: string;
  /** Message namespace segment: projects.items.<i18nKey>.* */
  i18nKey: string;
  status: "active" | "completed" | "planned";
  /** Anchor on /projects, used by cards elsewhere on the site. */
  anchor: string;
  funding?: {
    platform: "gofundme" | "givebutter";
    /**
     * Direct external donate destination — the lowest-friction conversion.
     * When absent, the primary CTA opens the embedded donation widget.
     */
    donateUrl?: string;
    /** Fallbacks when no fresh snapshot exists (cents). */
    fallbackRaisedCents?: number;
    fallbackGoalCents?: number;
  };
};

export const projects: ProjectContent[] = [
  {
    slug: "bike-ramps",
    i18nKey: "bikeRamps",
    status: "active",
    anchor: "bike-ramps",
    funding: {
      platform: "gofundme",
      donateUrl:
        "https://www.gofundme.com/f/axels-eagle-project-bike-ramps-for-rancho-cucamonga",
      // Live numbers come from the funding cron; these were current at build time.
      fallbackRaisedCents: 339_200,
      fallbackGoalCents: 1_600_000,
    },
  },
  {
    slug: "general-fund",
    i18nKey: "generalFund",
    status: "active",
    anchor: "general-fund",
    // No public campaign URL exists — the GiveButter widget IS the
    // conversion surface (opened in place by the primary CTA).
    funding: {
      platform: "givebutter",
    },
  },
];

/** GoFundMe campaign page scraped by /api/cron/update-funding-data. */
export const GOFUNDME_CAMPAIGN_URL =
  "https://www.gofundme.com/f/axels-eagle-project-bike-ramps-for-rancho-cucamonga";

export const GIVEBUTTER_ACCOUNT = "ZJkY9KxBnEd5eqgh";
export const GIVEBUTTER_GENERAL_WIDGET_ID = "LPDl8L";
