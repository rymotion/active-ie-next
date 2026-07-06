"use client";

import { Analytics } from "@vercel/analytics/react";
import SweatPalsLogo from "@/assets/vendors/sweatpals-logo.svg";
import Image from "next/image";
import React, { useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import "./sw_events.css";

const SWEATPALS_ORIGIN = "https://sweatpals.com";
const SWEATPALS_EMBED_SCRIPT_PATH =
  "/static/embed/community/events/script.js";

/** Sweatpals embed options — edit these to change widget behavior and styling. */
const SWEATPALS_EMBED_CONFIG = {
  communityUsername: "actv_ie",
  defaultView: "tile",
  views: ["tile"] as const,
  filters: ["date-picker", "Location"] as const,
  showDescription: true,
  directToCheckout: false,
  enableAutoEmbed: true,
  // Brand palette: maroon primary/buttons, cream secondary, black background.
  primaryColorHex: "7B1113",
  secondaryColorHex: "F2EDE9",
  backgroundColorHex: "000000",
  buttonColorHex: "7B1113",
  fontFamily: "Poppins",
};

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
    primaryColorHex: config.primaryColorHex,
    secondaryColorHex: config.secondaryColorHex,
    backgroundColorHex: config.backgroundColorHex,
    buttonColorHex: config.buttonColorHex,
    fontFamily: config.fontFamily,
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
