"use client";
import Screen from "@/components/screen/screen";
import { Analytics } from "@vercel/analytics/react";
import SweatpalEvents from "@/components/events/sw_events";
import CollaborationEvents from "@/components/events/collab_events";
import AltGFMPoster from "@/components/donation/special-donation/gfm-bike-ramp";
import PublicCalendar from "../events/calender";
import NewsletterWidget from "../contact/newsletter_subscribe";
import InstaWidget from "@/app/contact/instagram_gallery";
import LogoComponent, { logoStyle } from "@/components/logo";
import React, { useState } from "react";
import ACTVDialog from "@/components/dialog/dialog";

export default function SpecialEvent() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Analytics />
      <Screen>
        <div className="flex flex-col min-h-screen justify-center items-center h-full w-full">
          <div className=" flex flex-col items-center justify-center px-20 max-w-xl">
            <LogoComponent styles={logoStyle.standard} />
            <p className="max-w-xl text-center">
              A part of your purchase has gone back towards investing in our
              programs and efforts throughout the Inland Empire. We invite you
              to join us at our official Active Inland Empire events or the
              events we will be helping support in the next few months.
            </p>

            <InstaWidget />

            <AltGFMPoster />
          </div>
          <SweatpalEvents />
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
