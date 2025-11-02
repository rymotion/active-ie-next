"use client";

import { Analytics } from "@vercel/analytics/react";
import SweatPalsLogo from "@/assets/vendors/sweatpals-logo.svg";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function SweatpalEvents() {
  const calendarContainerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = React.useState<number>(500);

  useEffect(() => {
    const targetContainer = calendarContainerRef.current;
    if (!targetContainer) return;

    // Create a wrapper div for the embedded content
    const embedWrapper = document.createElement("div");
    embedWrapper.className = "sweatpal-embed-wrapper";
    embedWrapper.style.position = "relative";
    embedWrapper.style.width = "100%";
    embedWrapper.style.maxWidth = "100%";
    embedWrapper.style.minHeight = "500px";
    embedWrapper.style.overflow = "visible";
    embedWrapper.style.display = "flex";
    embedWrapper.style.justifyContent = "center";
    embedWrapper.style.alignItems = "flex-start";

    // Create the script element
    const script = document.createElement("script");
    script.src =
      "https://www.sweatpals.com/static/embed/community/calendar/events/script.js?communityUsername=actv_ie&primaryColorHex=ff0000&popupBackgroundColorHex=FFFFFF&headerFontColorHex=ffffff&fontFamily=Montserrat";
    script.type = "text/javascript";
    script.async = true;

    // Append wrapper and script to the target container
    targetContainer.appendChild(embedWrapper);
    embedWrapper.appendChild(script);

    // Set up ResizeObserver to watch for content size changes
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.contentRect.height;
        if (height > 0) {
          setContainerHeight(height);
        }
      }
    });

    // Observe the wrapper for size changes
    resizeObserver.observe(embedWrapper);

    // Also check for mutations in case content is added dynamically
    const mutationObserver = new MutationObserver(() => {
      // Small delay to allow content to render
      setTimeout(() => {
        const height = embedWrapper.scrollHeight;
        if (height > 0) {
          setContainerHeight(height);
        }
      }, 100);
    });

    mutationObserver.observe(embedWrapper, {
      childList: true,
      subtree: true,
    });

    // Cleanup function
    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      if (targetContainer.contains(embedWrapper)) {
        targetContainer.removeChild(embedWrapper);
      }
    };
  }, []);

  return (
    <section className="w-full px-[10px] max-w-[100vw] box-border overflow-hidden">
      <Analytics />
      <div className="w-full max-w-[100%] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center justify-center py-10 w-full"
        >
          <h1 className="text-2xl font-bold text-white mb-4">
            Our SweatPals Events Calendar
          </h1>
          <Image src={SweatPalsLogo} alt="SweatPals Logo" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          ref={calendarContainerRef}
          className="flex w-full justify-center items-start py-10 relative"
          style={{
            isolation: "isolate",
            minHeight: `${containerHeight}px`,
            transition: "min-height 0.3s ease-in-out",
          }}
        ></motion.div>
      </div>
    </section>
  );
}
