"use client";

import { Analytics } from "@vercel/analytics/react";
import SweatPalsLogo from "@/assets/vendors/sweatpals-logo.svg";
import Image from "next/image";
import React, { useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import "./sw_events.css";

/**
 * Sweatpals hands out a plain HTML snippet from their dashboard:
 *
 *   <script src="https://sweatpals.com/static/embed/community/events/script.js?communityUsername=actv_ie&…"></script>
 *
 * plus an optional head block:
 *
 *   <link rel="preconnect" href="https://sweatpals.com">
 *   <link rel="preload" href="…same script URL…" as="script">
 *
 * That snippet can't be pasted into the App Router as-is: a <script> tag in
 * JSX is inert (React never executes it), and the widget writes into whatever
 * DOM node it finds at execution time, so it needs a real host element that
 * exists before the script runs. This file is that snippet decomposed into
 * three pieces:
 *
 *   1. SWEATPALS_EMBED_CONFIG      — the query string, parsed back into a
 *      typed object so options are readable and diffable instead of buried in
 *      URL encoding. Every key here maps 1:1 to a `?key=value` pair, and the
 *      `*Json` params are stored as real arrays/objects that the builder
 *      re-serializes.
 *   2. buildSweatpalsEmbedScriptUrl — re-encodes the config back into the exact
 *      URL Sweatpals gave us. URLSearchParams handles the percent-encoding, so
 *      the source stays legible.
 *   3. The effects in SweatpalEvents — inject the <link> head tags and the
 *      <script> element imperatively once the section nears the viewport, then
 *      tear them down on unmount so React Strict Mode's double-invoke and
 *      client-side navigation don't stack duplicate widgets.
 *
 * To adopt a new snippet: paste its query string into a URLSearchParams in a
 * scratch file, mirror the pairs into SWEATPALS_EMBED_CONFIG below (decoding
 * the JSON params into arrays/objects), and add any new key to the builder.
 */
const SWEATPALS_ORIGIN = "https://sweatpals.com";
const SWEATPALS_EMBED_SCRIPT_PATH =
  "/static/embed/community/events/script.js";

/** Sweatpals embed options — edit these to change widget behavior and styling. */
const SWEATPALS_EMBED_CONFIG = {
  communityUsername: "actv_ie",
  defaultView: "tile",
  views: ["tile", "list", "calendar"],
  filters: [
    "fitness-type",
    "Location",
    "type",
    "date-picker",
    "price-range",
  ],
  showDescription: false,
  directToCheckout: false,
  enableAutoEmbed: true,
  brandColorHex: "F13939",
  fontFamily: "Anuphan",
  cardStyle: "modern",
  displayTimeMode: "in-the-middle",
  /** Per-field toggles for what each event card shows. */
  contentVisibility: {
    startTime: true,
    duration: true,
    coverImage: true,
    address: true,
    price: true,
    priceWithMembership: true,
    tags: true,
    shareButton: true,
    rsvps: true,
    capacity: true,
    host: true,
    coHost: true,
    instructor: true,
  },
  bookingBehavior: "open-experience-details",
  buttonText: "DETAILS",
  animationsEnabled: true,
  // "auto" lets the widget size itself; the ResizeObserver below mirrors that
  // height onto the host element so the section doesn't clip or leave a gap.
  heightMode: "auto",
  spacingsMode: "tight",
  maxWidth: 1120,
  cornerRadius: 24,
  showWidgetTitle: true,
} as const;

function buildSweatpalsEmbedScriptUrl(
  config: typeof SWEATPALS_EMBED_CONFIG = SWEATPALS_EMBED_CONFIG,
) {
  const params = new URLSearchParams({
    communityUsername: config.communityUsername,
    defaultView: config.defaultView,
    viewsJson: JSON.stringify(config.views),
    filtersJson: JSON.stringify(config.filters),
    showDescription: String(config.showDescription),
    directToCheckout: String(config.directToCheckout),
    enableAutoEmbed: String(config.enableAutoEmbed),
    brandColorHex: config.brandColorHex,
    fontFamily: config.fontFamily,
    cardStyle: config.cardStyle,
    displayTimeMode: config.displayTimeMode,
    contentVisibilityJson: JSON.stringify(config.contentVisibility),
    bookingBehavior: config.bookingBehavior,
    buttonText: config.buttonText,
    animationsEnabled: String(config.animationsEnabled),
    heightMode: config.heightMode,
    spacingsMode: config.spacingsMode,
    maxWidth: String(config.maxWidth),
    cornerRadius: String(config.cornerRadius),
    showWidgetTitle: String(config.showWidgetTitle),
  });

  return `${SWEATPALS_ORIGIN}${SWEATPALS_EMBED_SCRIPT_PATH}?${params.toString()}`;
}

const SWEATPALS_EMBED_SCRIPT = buildSweatpalsEmbedScriptUrl();

function injectSweatpalsHeadLinks() {
  if (document.querySelector('[data-sweatpals-head="preload"]')) {
    return () => {};
  }

  const preconnect = document.createElement("link");
  preconnect.rel = "preconnect";
  preconnect.href = SWEATPALS_ORIGIN;
  preconnect.setAttribute("data-sweatpals-head", "preconnect");

  const preload = document.createElement("link");
  preload.rel = "preload";
  preload.href = SWEATPALS_EMBED_SCRIPT;
  preload.as = "script";
  preload.setAttribute("data-sweatpals-head", "preload");

  document.head.append(preconnect, preload);

  return () => {
    preconnect.remove();
    preload.remove();
  };
}

const getResponsiveMinHeight = () => {
  if (typeof window === "undefined") return 500;
  if (window.innerWidth >= 1024) return 640;
  if (window.innerWidth >= 640) return 520;
  return 400;
};

function normalizeEmbedLayout(root: HTMLElement) {
  root.querySelectorAll("iframe").forEach((iframe) => {
    iframe.style.width = "100%";
    iframe.style.maxWidth = "100%";
    iframe.style.minWidth = "0";
  });
}

export default function SweatpalEvents() {
  const t = useTranslations();
  const embedHostRef = useRef<HTMLDivElement>(null);
  // Server renders a fixed height; the responsive value applies after mount
  // (window-dependent initial state caused a hydration mismatch).
  const [containerHeight, setContainerHeight] = React.useState(500);
  const [nearViewport, setNearViewport] = React.useState(false);

  const measureEmbedHeight = useCallback((embedWrapper: HTMLElement) => {
    const height = Math.max(
      embedWrapper.scrollHeight,
      embedWrapper.getBoundingClientRect().height,
    );
    // Ignore sub-8px deltas: the ResizeObserver watches the element whose
    // min-height we set, so unfiltered updates feed back into themselves.
    setContainerHeight((previous) =>
      height > 0 && Math.abs(height - previous) > 8 ? height : previous,
    );
  }, []);

  useEffect(() => {
    setContainerHeight(getResponsiveMinHeight());
  }, []);

  // Defer all embed work until the section approaches the viewport —
  // on the landing page it sits below the fold.
  useEffect(() => {
    const host = embedHostRef.current;
    if (!host) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!nearViewport) return;
    return injectSweatpalsHeadLinks();
  }, [nearViewport]);

  useEffect(() => {
    if (!nearViewport) return;
    const targetContainer = embedHostRef.current;
    if (!targetContainer) return;

    const embedWrapper = document.createElement("div");
    embedWrapper.className = "sweatpal-embed-wrapper";

    const script = document.createElement("script");
    script.src = SWEATPALS_EMBED_SCRIPT;
    script.type = "text/javascript";
    script.async = true;

    targetContainer.appendChild(embedWrapper);
    embedWrapper.appendChild(script);

    let mutationTimeout: ReturnType<typeof setTimeout> | undefined;

    const scheduleMeasure = () => {
      if (mutationTimeout) clearTimeout(mutationTimeout);
      mutationTimeout = setTimeout(() => {
        normalizeEmbedLayout(embedWrapper);
        measureEmbedHeight(embedWrapper);
      }, 150);
    };

    const resizeObserver = new ResizeObserver(() => {
      scheduleMeasure();
    });
    resizeObserver.observe(embedWrapper);

    const mutationObserver = new MutationObserver(() => {
      scheduleMeasure();
    });
    mutationObserver.observe(embedWrapper, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    const onWindowResize = () => {
      scheduleMeasure();
    };
    window.addEventListener("resize", onWindowResize);

    script.addEventListener("load", scheduleMeasure);
    scheduleMeasure();

    return () => {
      if (mutationTimeout) clearTimeout(mutationTimeout);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("resize", onWindowResize);
      script.removeEventListener("load", scheduleMeasure);
      if (targetContainer.contains(embedWrapper)) {
        targetContainer.removeChild(embedWrapper);
      }
    };
  }, [nearViewport, measureEmbedHeight]);

  return (
    <section className="sweatpals-events-section w-full box-border bg-black">
      <Analytics />
      <div className="w-full min-w-0 mx-auto bg-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="sweatpals-events-header flex flex-col items-center justify-center w-full min-w-0"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 text-center px-2">
            {t("nav.events")}
          </h2>
          <Image
            src={SweatPalsLogo}
            alt="SweatPals Logo"
            className="w-36 sm:w-44 md:w-52 h-auto max-w-[min(100%,14rem)]"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          ref={embedHostRef}
          className="sweatpals-events-embed-host flex w-full min-w-0 justify-center items-start relative bg-black"
          style={{
            minHeight: `${containerHeight}px`,
            transition: "min-height 0.3s ease-in-out",
          }}
        />
      </div>
    </section>
  );
}
