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
import Image from "next/image";
import SocialPlunge from "@/assets/events/plunge.jpg";

export default function SpecialEvent() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const container = document.createElement("div");
    container.id = "sweatpals-container";
    container.style.justifyContent = "center";
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    const marquee = document.getElementById("sweatpals-container");

    const script = document.createElement("script");
    script.src =
      "https://www.sweatpals.com/static/embed/event/checkout/script.js?priceMode=several&enableAutoEmbed=true&eventAlias=chill-vibe&shortLocalInstance=2025-07-05&size=lg&colorHex=ffffff&backgroundHex=000000&buttonColorHex=ffffff&fontFamily=Poppins&priceTiersJson=%5B%22169a1714-23b1-4957-91a5-5f965c61d182%22%2C%22d578a184-89f8-4d8b-b00e-a8602815beb9%22%2C%2226b2f832-5cd4-463a-961a-14529531e191%22%5D";
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
            className="sm:hidden md:hidden lg:flex flex-row justify-center px-20 w-full h-full"
            id="application-head"
          >
            <Image
              src={SocialPlunge}
              alt="Event Widget"
              objectFit="aspectFill"
              width={500}
              className="w-full h-full"
            />
            <div
              id="sweatpals-container"
              className="w-full h-full bg-black/50 justify-center items-center px-20"
            ></div>
          </div>

          <div
            className="hidden lg:hidden md:hidden flex flex-col justify-center px-20 w-full h-full"
            id="application-head"
          >
            <Image
              src={SocialPlunge}
              alt="Event Widget"
              objectFit="contain"
              width={200}
            />
            <div
              id="sweatpals-container"
              className="w-full h-full bg-black/50 justify-center items-center px-20"
            ></div>
          </div>

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
