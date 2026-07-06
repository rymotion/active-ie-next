"use client";
import Screen from "@/components/screen/screen";
import { useTranslations } from "next-intl";
import PublicCalendar from "./calender";
import ScheduleSurvey from "./suvey";
import { Analytics } from "@vercel/analytics/react";
import Dialog from "@/components/dialog/dialog";
import SweatpalEvents from "@/components/events/sw_events";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/layout/container";
import InstagramSection from "@/components/instagram/instagram-section";
import type { IgPost } from "@/services/instagram";

export default function Events({ igPosts }: { igPosts: IgPost[] | null }) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Analytics />
      <Screen>
        <div className="flex flex-col min-h-screen justify-center items-center w-full h-full">
          <SweatpalEvents />
        </div>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center"
        >
          <button
            onClick={() => setOpen(true)}
            className="inline-block mt-4 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-color"
          >
            {t("events.takeSurvey")}
          </button>
        </motion.section>

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title={t("events.surveyTitle")}
          closeLabel={t("events.close")}
          size="lg"
        >
          <ScheduleSurvey />
        </Dialog>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="page-width flex-col min-h-screen win-w-screen justify-center items-center w-full"
        >
          <h1 className="page-width flex-col h-[10vh] items-center justify-center items-center text-2xl font-bold">
            {t("events.title")}
          </h1>
          {/* Google Calendars demoted: Sweatpals is the primary calendar.
              Kept collapsed here in case some events only live on Google. */}
          <details className="page-width mx-auto w-full max-w-4xl py-8">
            <summary className="cursor-pointer py-2 text-center text-xl font-semibold text-cream hover:text-white">
              {t("events.ourCalendar")}
            </summary>
            <PublicCalendar />
          </details>
        </motion.section>

        <Container size="wide">
          <InstagramSection posts={igPosts} />
        </Container>
      </Screen>
    </>
  );
}
