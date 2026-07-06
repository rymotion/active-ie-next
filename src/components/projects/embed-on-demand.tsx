"use client";

import { useState, type ReactNode } from "react";

/**
 * Click-to-load facade: third-party embed JS (GoFundMe/GiveButter) stays
 * off the page until the visitor asks for it. `cta` should be a translated,
 * specific label ("Open the donation form"), never a vague "click here".
 */
export default function EmbedOnDemand({
  cta,
  children,
}: {
  cta: string;
  children: ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) return <>{children}</>;

  return (
    <div className="flex justify-center py-4">
      <button
        type="button"
        onClick={() => setLoaded(true)}
        className="rounded-md bg-maroon px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-red-800"
      >
        {cta}
      </button>
    </div>
  );
}
