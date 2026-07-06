"use client";
import Screen from "@/components/screen/screen";
import { useTranslations } from "next-intl";
import { Analytics } from "@vercel/analytics/react";
import PublicCalendar from "../events/calender";
import NewsletterWidget from "../contact/newsletter_subscribe";
import React, { useState } from "react";
import Dialog from "@/components/dialog/dialog";
import VolunteerInterestWidget from "../volunteer/volunteer_interest";
import GofundmeWidget from "@/components/gofundme";
import { motion } from "framer-motion";
import ProjectFundingWidget from "../projects/bike_project_widget";
import BikeProjectWindow from "../projects/bike_project_window";
import BikeParkForm from "../projects/bike park form_b";

export default function SpecialEvent() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Analytics />
      <Screen>
        <main>
          <div className="flex-grow">
            <div className="text-center mb-6 sm:mb-8 w-full">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">
                {t("projects.title")}
              </h1>
              <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-2">
                {t("projects.description")}
              </p>
            </div>
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full max-w-6xl mx-auto px-2 sm:px-0"
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 sm:mb-8">
                {t("projects.bikeRampTitle")}
              </h2>
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 xl:col-span-8">
                  <BikeProjectWindow />
                </div>

                <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-8">
                  <div className="flex flex-col items-center justify-center mx-auto px-4">
                    <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 sm:mb-8">
                      {t("projects.publicCommentTitle")}
                    </h2>
                    <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-2">
                      {t("projects.publicCommentDescription")}
                    </p>
                    <BikeParkForm />
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="w-full max-w-md">
                      <ProjectFundingWidget />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-12 xl:col-span-12">
                  <GofundmeWidget />
                </div>
              </div>
            </motion.section>
          </div>
          <section className="min-h-screen py-20 bg-black">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">
                {t("specialEvent.joinOurCommunity")}
              </h2>
              <p className="text-xl mb-8">
                {t("specialEvent.wantToWorkEvents")}
              </p>
              <VolunteerInterestWidget />
            </div>
          </section>

          {/* <AltGFMPoster /> */}
          <div className="flex justify-center">
            <button
              onClick={() => setOpen(true)}
              className="text-2xl font-bold bg-black text-white hover:bg-red-500 transition-all duration-300 transform hover:scale-105"
            >
              {t("specialEvent.clickToSubscribe")}
            </button>
          </div>
          <div className="flex flex-col min-h-screen w-full justify-center items-center">
            <div>
              <p>{t("specialEvent.ourEventCalendar")}</p>
            </div>
            <PublicCalendar />
          </div>

          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            title={t("specialEvent.newsletterSubscribe")}
            closeLabel={t("common.close")}
            size="lg"
          >
            <NewsletterWidget />
          </Dialog>
        </main>
      </Screen>
    </>
  );
}
