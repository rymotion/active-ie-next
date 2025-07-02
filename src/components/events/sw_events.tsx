"use client";

import { Analytics } from "@vercel/analytics/react";
import SweatPalsLogo from "@/assets/vendors/sweatpals-logo.svg";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function SweatpalEvents() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch events from Google Sheets on component mount
  useEffect(() => {
    const container = document.createElement("div");
    container.id = "sweatpal-calendar";
    container.style.justifyContent = "center";
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.width = "100%";
    container.style.height = "100vh";
    container.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    const marquee = document.getElementById("sweatpal-calendar");

    if (marquee) {
      marquee.appendChild(container);
      const script = document.createElement("script");
      script.src =
        "https://www.sweatpals.com/static/embed/community/calendar/events/script.js?communityUsername=actv_ie&primaryColorHex=ff0000&popupBackgroundColorHex=FFFFFF&headerFontColorHex=ffffff&fontFamily=Montserrat";
      script.async = true;

      container.appendChild(script);
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
      <div className="flex min-h-screen justify-center w-full items-center px-20">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col items-center justify-center"
          >
            <h1 className="text-2xl font-bold text-white">
              Our Events hosted on SweatPals
            </h1>
            <Image src={SweatPalsLogo} alt="SweatPals Logo" />
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        id="sweatpal-calendar"
        className="w-full h-full bg-black/50 justify-center items-center px-20"
        ref={containerRef}
      ></motion.div>
    </>
  );
}
