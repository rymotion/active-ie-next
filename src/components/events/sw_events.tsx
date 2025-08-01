"use client";

import { Analytics } from "@vercel/analytics/react";
import SweatPalsLogo from "@/assets/vendors/sweatpals-logo.svg";
import Image from "next/image";
import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function SweatpalEvents() {
  // Fetch events from Google Sheets on component mount
  useEffect(() => {
    const container = document.createElement("div");
    container.id = "sweatpal-calendar";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    container.style.display = "flex";
    container.style.flexDirection = "row";
    container.style.width = "50%";
    container.style.height = "500px";
    container.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

    const marquee = document.getElementById("sweatpal-calendar");

    if (marquee) {
      const script = document.createElement("script");
      script.src =
        "https://www.sweatpals.com/static/embed/community/calendar/events/script.js?communityUsername=actv_ie&primaryColorHex=ff0000&popupBackgroundColorHex=FFFFFF&headerFontColorHex=ffffff&fontFamily=Montserrat";
      script.type = "text/javascript";
      script.async = true;

      container.appendChild(script);
      marquee.appendChild(container);
    }

    return () => {
      if (marquee?.contains(container)) {
        marquee.removeChild(container);
      }
    };
  }, []);

  return (
    <section className="w-full px-[10px] max-w-[100vw] box-border">
      <Analytics />
      <div className="w-full max-w-[100%] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center justify-center py-10 w-full"
          id="sweatpal-headline"
        >
          <h1 className="text-2xl font-bold text-white mb-4">
            Our Events hosted on SweatPals
          </h1>
          <Image src={SweatPalsLogo} alt="SweatPals Logo" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          id="sweatpal-calendar"
          className="flex w-full justify-center items-center py-10"
        ></motion.div>
      </div>
    </section>
  );
}
