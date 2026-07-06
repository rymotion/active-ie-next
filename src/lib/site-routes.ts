/**
 * Single source of truth for every page on the site.
 * Consumed by: the navbar, the footer link columns, the human-readable
 * /sitemap page, and app/sitemap.ts (sitemap.xml generation).
 */

export type SiteSection = "main" | "getInvolved" | "programs" | "legal";

export interface SiteRoute {
  /** Path without locale prefix, e.g. "/events" */
  path: string;
  /** Translation key for the link label, e.g. "nav.events" */
  labelKey: string;
  /** Grouping used by the footer and the human sitemap page */
  section: SiteSection;
  /** Shown in the primary navigation (header / mobile menu) */
  inNav: boolean;
  /** Listed in sitemap.xml */
  includeInSitemap: boolean;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
}

export const siteRoutes: SiteRoute[] = [
  { path: "/", labelKey: "nav.home", section: "main", inNav: true, includeInSitemap: true, changeFrequency: "weekly", priority: 1 },
  { path: "/events", labelKey: "nav.events", section: "main", inNav: true, includeInSitemap: true, changeFrequency: "daily", priority: 0.9 },
  { path: "/blog", labelKey: "nav.blog", section: "main", inNav: true, includeInSitemap: true, changeFrequency: "weekly", priority: 0.7 },
  { path: "/projects", labelKey: "nav.projects", section: "getInvolved", inNav: true, includeInSitemap: true, changeFrequency: "weekly", priority: 0.8 },
  { path: "/products", labelKey: "nav.products", section: "main", inNav: true, includeInSitemap: true, changeFrequency: "weekly", priority: 0.7 },
  { path: "/contrast-therapy", labelKey: "nav.contrastTherapy", section: "programs", inNav: true, includeInSitemap: true, changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", labelKey: "nav.contact", section: "main", inNav: true, includeInSitemap: true, changeFrequency: "monthly", priority: 0.5 },
  { path: "/support", labelKey: "nav.support", section: "getInvolved", inNav: true, includeInSitemap: true, changeFrequency: "monthly", priority: 0.8 },
  { path: "/volunteer", labelKey: "nav.volunteer", section: "getInvolved", inNav: false, includeInSitemap: true, changeFrequency: "monthly", priority: 0.6 },
  { path: "/addc", labelKey: "nav.addc", section: "programs", inNav: false, includeInSitemap: true, changeFrequency: "monthly", priority: 0.4 },
  { path: "/special-event", labelKey: "nav.specialEvent", section: "programs", inNav: false, includeInSitemap: false },
  { path: "/privacy", labelKey: "nav.privacy", section: "legal", inNav: false, includeInSitemap: true, changeFrequency: "yearly", priority: 0.3 },
  { path: "/data-policy", labelKey: "nav.dataPolicy", section: "legal", inNav: false, includeInSitemap: true, changeFrequency: "yearly", priority: 0.3 },
  { path: "/sitemap", labelKey: "nav.sitemap", section: "legal", inNav: false, includeInSitemap: true, changeFrequency: "monthly", priority: 0.2 },
];

export const navRoutes = siteRoutes.filter((r) => r.inNav);

export const routesBySection = (section: SiteSection) =>
  siteRoutes.filter((r) => r.section === section);
