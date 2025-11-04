"use client";

import Script from "next/script";
import { useTranslation } from "@/hooks/useTranslation";

const GofundmeWidget = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* GoFundMe Widget Container - Exact embed code from GoFundMe */}
      <div
        className="gfm-embed"
        data-url="https://www.gofundme.com/f/axels-eagle-project-bike-ramps-for-rancho-cucamonga/widget/large?sharesheet=undefined&attribution_id=sl:36c9bb55-d95a-46ce-a8fa-197a857f6dcf"
      />

      {/* GoFundMe Script - loads and auto-initializes */}
      <Script
        src="https://www.gofundme.com/static/js/embed.js"
        strategy="lazyOnload"
      />

      {/* Fallback link */}
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
