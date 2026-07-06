"use client";

import { useLayoutEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import styles from "./gofundme.module.css";

const GOFUNDME_WIDGET_URL =
  "https://www.gofundme.com/f/axels-eagle-project-bike-ramps-for-rancho-cucamonga/widget/large?sharesheet=undefined&attribution_id=sl:36c9bb55-d95a-46ce-a8fa-197a857f6dcf";

const GOFUNDME_SCRIPT_SRC = "https://www.gofundme.com/static/js/embed.js";

const WIDGET_WIDTH = 250;
const WIDGET_HEIGHT = 500;

const GofundmeWidget = () => {
  const t = useTranslations();
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    // Mirror the raw HTML snippet as closely as possible:
    // <div class="gfm-embed" data-url="..."></div>
    // <script defer src="https://www.gofundme.com/static/js/embed.js"></script>

    const existingScript = document.querySelector(
      `script[src="${GOFUNDME_SCRIPT_SRC}"]`,
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = GOFUNDME_SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-5 py-4">
      <div className={styles.gofundmeWrapper}>
        <div
          ref={containerRef}
          className={`gfm-embed ${styles.gfmEmbed}`}
          data-url={GOFUNDME_WIDGET_URL}
        >
          {/* If GoFundMe's embed.js doesn't initialize (SPA/hydration/CSP),
              this iframe still renders the exact "large" widget. */}
          <iframe
            title="GoFundMe fundraiser widget"
            src={GOFUNDME_WIDGET_URL}
            className={styles.gofundmeIframe}
            width={WIDGET_WIDTH}
            height={WIDGET_HEIGHT}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <div className="text-center mt-4">
        <a
          href="https://www.gofundme.com/f/axels-eagle-project-bike-ramps-for-rancho-cucamonga"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          {t("common.viewOnGofundme")}
          <svg
            className="w-3 h-3 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default GofundmeWidget;
