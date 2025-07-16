"use client";

import Script from "next/script";

export default function EventWidget() {
  return (
    <div className="event-widget w-full">
      <Script
        src="https://www.sweatpals.com/static/embed/event/checkout/script.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("Sweatpals event widget script loaded successfully");
        }}
        onError={(e) => {
          console.error("Sweatpals event widget failed to load", e);
        }}
      />
      <div
        className="sweatpals-event w-full"
        data-enable-auto-embed="true"
        data-event-alias="chill-vibe"
        data-short-local-instance="2025-07-05"
        data-color-hex="ffffff"
        data-background-hex="000000"
        data-font-family="Poppins"
        data-price-tier-id="169a1714-23b1-4957-91a5-5f965c61d182"
      />
    </div>
  );
}
