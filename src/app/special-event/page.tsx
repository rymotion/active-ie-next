"use client";
import Screen from "@/components/screen/screen";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import PublicCalendar from "../events/calender";
import NewsletterWidget from "../contact/newsletter_subscribe";
import {
  InstaWidgetMain,
  InstaWidgetD2D,
} from "@/app/contact/instagram_gallery";
import React, { useState } from "react";
import ACTVDialog from "@/components/dialog/dialog";
import VolunteerInterestWidget from "../volunteer/volunteer_interest";
import GofundmeWidget from "@/components/gofundme";
import { motion } from "framer-motion";
import PublicCommentBoard from "../projects/public_comment_board";
import ProjectFundingWidget from "../projects/bike_project_widget";
import BikeProjectWindow from "../projects/bike_project_window";

export default function SpecialEvent() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const container = document.createElement("div");
    window.addEventListener("resize", () => {
      document.body.removeChild(container);
      console.log(window.innerWidth);
      container.style.width = "auto";
      container.style.maxWidth = "100vw";
      container.style.minWidth = "20vw";
      container.style.height = "auto";
      container.style.minHeight = "300px";
      if (marquee) {
        marquee.appendChild(script);
        document.body.appendChild(container);
      }
    });

    container.id = "sweatpals-container";
    container.style.justifyContent = "center";
    container.style.display = "flex";
    container.style.alignItems = "center";

    container.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    const marquee = document.getElementById("sweatpals-container");

    const script = document.createElement("script");
    script.src =
      "https://www.sweatpals.com/static/embed/event/checkout/script.js?enableAutoEmbed=true&eventAlias=chill-vibe&shortLocalInstance=2025-07-05&colorHex=ffffff&backgroundHex=000000&fontFamily=Poppins&priceTierId=169a1714-23b1-4957-91a5-5f965c61d182";
    script.async = true;

    if (marquee) {
      marquee.appendChild(script);
      document.body.appendChild(container);
    }

    return () => {
      document.body.removeChild(container);
    };
  }, []);

  return (
    <>
      <Analytics />
      <Screen>
        <main>
          {/* <div
            className="flex flex-col justify-center px-5 w-full h-full"
            id="application-head"
          >
            <SweatpalEvents />
          </div> */}

          <InstaWidgetMain />
          <InstaWidgetD2D />
          <section className="min-h-screen py-20 bg-gray-100">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
              <p className="text-xl mb-8">
                Want to work our events or be a part of our organization?
              </p>
              <VolunteerInterestWidget />
            </div>
          </section>
          <div className="flex-grow">
            <div className="text-center mb-6 sm:mb-8 w-full">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">
                Projects
              </h1>
              <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-2">
                These are our current ongoing projects and efforts across the
                Inland Empire.
              </p>
            </div>
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full max-w-6xl mx-auto px-2 sm:px-0"
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 sm:mb-8">
                Bike Ramp Project Update
              </h2>
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 xl:col-span-8">
                  <BikeProjectWindow />
                </div>
                <div className="lg:col-span-5 xl:col-span-4 flex items-center justify-center">
                  <div className="w-full max-w-md">
                    <ProjectFundingWidget />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center mx-auto px-4">
                  <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 sm:mb-8">
                    Public Comment Board
                  </h2>
                  <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-2">
                    By selecting the pup-out window option from the image below
                    you will be taken to the file hosted on Google Drive to
                    provide feedback on the bike ramp project. Have a voice in
                    the planning of the project. You must be signed in to a
                    registered Google account to participate.
                  </p>
                  <PublicCommentBoard />
                </div>
                <div className="lg:col-span-12 xl:col-span-12">
                  <GofundmeWidget />
                </div>
              </div>
            </motion.section>
          </div>
          {/* <AltGFMPoster /> */}
          <div className="flex justify-center">
            <button
              onClick={() => setOpen(true)}
              className="text-2xl font-bold bg-black text-white hover:bg-red-500 transition-all duration-300 transform hover:scale-105"
            >
              Click here to subscribe to our newsletter.
            </button>
          </div>
          <div className="flex flex-col min-h-screen min-w-screen justify-center items-center  w-full">
            <div>
              <p>Our Event Calendar</p>
            </div>
            <PublicCalendar />
          </div>

          {/* Modal Dialog */}
          <ACTVDialog open={open} setOpen={setOpen}>
            <div className=" inset-0 z-50 items-center justify-center bg-black p-20">
              <div className="w-full flex-col min-h-screen flex items-center justify-center">
                <button
                  className="text-2xl font-bold text-gray-400 hover:text-white bg-black hover:bg-red-500 transition-all duration-300 transform hover:scale-105"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                >
                  {"Close"}
                </button>
                <div className="relative bg-black rounded-lg shadow-lg w-[95vw] max-w-4xl max-h-[95vh] p-4 md:p-8 overflow-auto flex flex-col">
                  <h2 className="text-lg md:text-2xl font-semibold mb-4 text-center">
                    Newsletter Subscribe
                  </h2>
                  <NewsletterWidget />
                </div>
              </div>
            </div>
          </ACTVDialog>
        </main>
      </Screen>
    </>
  );
}
