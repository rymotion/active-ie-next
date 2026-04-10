"use client";
import Screen from "@/components/screen/screen";
import { useTranslation } from "@/hooks/useTranslation";

import { Analytics } from "@vercel/analytics/react";
import ScrollReveal from "@/components/animated/scroll-reveal";

export default function Project() {
  const { t } = useTranslation();
  
  return (
    <>
      <div>
        <Screen>
          <ScrollReveal
            delay={0.2}
            duration={0.7}
            className="flex flex-col items-center px-4 max-w-xl"
            as="div"
          >
            <h1 className="text-2xl font-bold">{t("support.sponsorshipTitle")}</h1>
            <p>
              {t("support.sponsorshipDescription")}
            </p>
            <button
              className="text-2xl font-bold bg-black text-white hover:bg-red-500 transition-all duration-300 transform hover:scale-105"
              onClick={() =>
                (window.location.href = "mailto:sponsorships@active-ie.org")
              }
            >
              {t("support.getInTouch")}
            </button>
          </ScrollReveal>

          <Analytics />
        </Screen>
      </div>
    </>
  );
}
