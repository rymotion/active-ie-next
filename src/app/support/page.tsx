"use client";
import Screen from "@/components/screen/screen";
import { useTranslation } from "@/hooks/useTranslation";

import { Analytics } from "@vercel/analytics/react";
import { motion } from "framer-motion";

export default function Project() {
  const { t } = useTranslation();
  
  return (
    <>
      <div>
        <Screen>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col items-center px-4 max-w-xl"
          >
            <h1 className="text-2xl font-bold">{t("support.sponsorshipTitle")}</h1>
            <p>
              {t("support.sponsorshipDescription")}
            </p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-2xl font-bold bg-black text-white hover:bg-red-500 transition-all duration-300 transform hover:scale-105"
              onClick={() =>
                (window.location.href = "mailto:sponsorships@active-ie.org")
              }
            >
              {t("support.getInTouch")}
            </motion.button>
          </motion.div>

          <Analytics />
        </Screen>
      </div>
    </>
  );
}
