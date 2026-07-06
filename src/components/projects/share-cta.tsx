"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

/**
 * Micro-conversion for cold visitors: sharing costs nothing and feeds
 * discovery. Web Share API with a clipboard fallback.
 */
export default function ShareCta({
  title,
  text,
  url,
}: {
  title: string;
  text: string;
  url: string;
}) {
  const t = useTranslations();
  const [copied, setCopied] = useState(false);

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        // user cancelled — fall through to nothing
        return;
      }
    }
    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // clipboard unavailable; the button label stays unchanged
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      className="rounded-md border border-cream/40 px-5 py-2.5 font-semibold text-cream transition-colors hover:border-cream hover:text-white"
    >
      {copied ? t("funding.linkCopied") : t("funding.share")}
    </button>
  );
}
