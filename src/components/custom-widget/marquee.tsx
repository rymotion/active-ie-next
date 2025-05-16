// This marquee widget has the event poster on one side and the information and
// registration on the other side of the event
// import StreetHockeyPoster from "@/assets/events/street-hockey.png";
// import BreathePoster from "@/assets/events/breathe-ig.png";
// import SweatPalsLogo from "@/assets/vendors/sweatpals-logo.svg";
// import Image from "next/image";

import React, { useState, useEffect, useRef } from "react";
import { Analytics } from "@vercel/analytics/react";
// import Link from "next/link";
// import { useRouter } from "next/router";

export default function MarqueeWidget({
  marquee,
  information,
}: {
  marquee: React.ReactNode;
  information: React.ReactNode;
}) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollSpeed = 50; // pixels per second

  useEffect(() => {
    console.log("scrollPosition", scrollPosition);
    if (!carouselRef.current || !containerRef.current) return;

    const carousel = carouselRef.current;
    const container = containerRef.current;
    let animationFrameId: number;
    let lastTimestamp = 0;

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      if (!isPaused) {
        setScrollPosition((prev) => {
          const maxScroll = carousel.scrollWidth - container.clientWidth;
          if (maxScroll <= 0) return 0; // Handle case when container is wider than content
          const newPosition = prev + (scrollSpeed * deltaTime) / 1000;
          return newPosition >= maxScroll ? 0 : newPosition;
        });
      }

      animationFrameId = window.requestAnimationFrame(animate);
    };

    animationFrameId = window.requestAnimationFrame(animate);
    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPaused, scrollSpeed]);

  return (
    <>
      <Analytics />

      {/* standard vertical widget */}
      <div className="sm:hidden">
        <div>{marquee}</div>
        <div className="flex flex-col items-center ">{information}</div>
      </div>
      {/* standard widescreen  marquee widget */}
      <div className={"flex flex-row items-center padding-10 hidden sm:flex"}>
        {/* TODO: Add programs and efforts components */}
        <div>{marquee}</div>
        <div className="flex flex-col items-center ">{information}</div>
      </div>
    </>
  );
}
