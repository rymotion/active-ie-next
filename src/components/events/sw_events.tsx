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
    container.style.flexDirection = "column";
    container.style.width = "50%";
    container.style.height = "50%";
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
    <>
      <Analytics />

      <div className="flex flex-col justify-center w-full h-full items-center px-4 sm:px-8 lg:px-20 sm:py40 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col h-full items-center justify-center py-20"
        >
          <h1 className="text-2xl font-bold text-white">
            Our Events hosted on SweatPals
          </h1>
          <Image src={SweatPalsLogo} alt="SweatPals Logo" />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        id="sweatpal-calendar"
        className="w-full h-full justify-center items-center"
      ></motion.div>
    </>
  );
}
