"use client";
import Screen from "@/components/screen/screen";
import PublicCalendar from "./calender";
import ScheduleSurvey from "./suvey";
import { Analytics } from "@vercel/analytics/react";
import ACTVDialog from "@/components/dialog/dialog";
import SweatpalEvents from "@/components/events/sw_events";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Events() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Analytics />
      <Screen>
        <div className="flex flex-col min-h-screen justify-center items-center w-full h-full">
          <SweatpalEvents />
          <p className="max-w-xl text-center px-4">
            We want to hear from you, the community, on how we can best serve
            you and have our in-person events. By clicking the button below, we
            can learn how to better serve you to support you on your health
            journey.
          </p>
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
            Take the Program Schedule Survey
          </button>
        </motion.section>

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
                  Program Schedule Survey
                </h2>
                <ScheduleSurvey />
              </div>
            </div>
          </div>
        </ACTVDialog>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="page-width flex-col min-h-screen win-w-screen justify-center items-center w-full"
        >
          <h1 className="page-width flex-col h-[10vh] items-center justify-center items-center text-2xl font-bold">
            Join Our Events
          </h1>
          <div className="page-width flex-col w-full py-8 items-center justify-center">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Our Event Calendar
            </h2>
            <PublicCalendar />
          </div>
        </motion.section>
      </Screen>
    </>
  );
}
