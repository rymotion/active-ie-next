"use client";
import Screen from "@/components/screen/screen";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import AltGFMPoster from "@/components/donation/special-donation/gfm-bike-ramp";
import PublicCalendar from "../events/calender";
import NewsletterWidget from "../contact/newsletter_subscribe";
import InstaWidget from "@/app/contact/instagram_gallery";
import React, { useState } from "react";
import ACTVDialog from "@/components/dialog/dialog";
import InstagramPost from "@/app/contact/instagram_post";
import SweatpalEvents from "@/components/events/sw_events";

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
          <div
            className="flex flex-col justify-center px-5 w-full h-full"
            id="application-head"
          >
            <SweatpalEvents />
            <InstagramPost />
          </div>

          {/* <div
            className="hidden lg:hidden md:hidden flex flex-col justify-center px-10 w-full h-full"
            id="application-head"
          >
            <Image
              src={SocialPlunge}
              alt="Event Widget"
              objectFit="contain"
              width={200}
            />
            <div id="sweatpals-container"></div>
          </div> */}

          <InstaWidget />

          <AltGFMPoster />
          <div className="flex justify-center">
            <button
              onClick={() => setOpen(true)}
              className="text-2xl font-bold bg-black text-white hover:bg-red-500 transition-all duration-300 transform hover:scale-105"
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
        </main>
      </Screen>
    </>
  );
}
