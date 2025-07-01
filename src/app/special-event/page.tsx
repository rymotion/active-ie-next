"use client";
import Screen from "@/components/screen/screen";
import { Analytics } from "@vercel/analytics/react";
import CollaborationEvents from "@/components/events/collab_events";
import AltGFMPoster from "@/components/donation/special-donation/gfm-bike-ramp";
import PublicCalendar from "../events/calender";
import NewsletterWidget from "../contact/newsletter_subscribe";
import InstaWidget from "@/app/contact/instagram_gallery";
import React, { useState } from "react";
import ACTVDialog from "@/components/dialog/dialog";
import Image from "next/image";
import SocialPlunge from "@/assets/events/plunge.jpg";
import { motion } from "framer-motion";

export default function SpecialEvent() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Analytics />
      <Screen>
        <div className="flex flex-col min-h-screen justify-center items-center h-full w-full">
          <div className="flex flex-col items-center justify-center px-20 max-w-xl"></div>

          <Image
            src={SocialPlunge}
            alt="Event Widget"
            width={200}
            height={200}
            className=" py-20"
          />
          <p className="text-center">
            Join us for the Social Plunge on July 5, 2025
          </p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="mt-8 px-8 py-4 bg-red-600 text-white text-xl font-bold rounded-lg hover:bg-red-700 transition-colors shadow-lg"
            onClick={() =>
              window.open(
                "https://www.sweatpals.com/event/chill-vibe/2025-07-05"
              )
            }
          >
            Get the details!
          </motion.button>
          <InstaWidget />

          <AltGFMPoster />
          <CollaborationEvents />
          <div className="flex justify-center">
            <button
              onClick={() => setOpen(true)}
              className="text-2xl font-bold bg-black text-color:white hover:text-white hover:bg-red-500 transition-all duration-300 transform hover:scale-105"
            >
              Newsletter Subscribe
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
        </div>
      </Screen>
    </>
  );
}
