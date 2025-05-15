"use client";
import { Analytics } from "@vercel/analytics/react";
import StreetHockeyPoster from "@/assets/events/street-hockey.png";
import BreathePoster from "@/assets/events/breathe-ig.png";
import SweatPalsLogo from "@/assets/vendors/sweatpals-logo.svg";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import MarqueeWidget from "../custom-widget/marquee";

const events = [
  {
    image: BreathePoster,
    alt: "Active Nights Breathe",
    href: "https://www.sweatpals.com/event/active-nights-breath/",
    headline: "Join a breathwork, meditation, and flow session",
  },
  {
    image: StreetHockeyPoster,
    alt: "Street Hockey",
    href: "https://www.sweatpals.com/host/actv_ie",
    headline: "Play competitively in a pickup street hockey game.",
  },
  // Add more events here if needed
  // Swap this out with an API call of events
];

export default function SweatpalEvents() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // const animationFrameRef = useRef<number>(0);
  // const lastTimestampRef = useRef<number>(0);
  const scrollSpeed = 50; // pixels per second

  // Auto-scroll effect
  useEffect(() => {
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
      <div className="flex flex-col items-center px-20">
        <h2>Our Programs</h2>
        <Link href="https://www.sweatpals.com/host/actv_ie">
          <Image
            src={SweatPalsLogo}
            alt="SweatPals"
            width="800"
            height="400"
            priority
          ></Image>
        </Link>
        {events.map((event, index) => (
          <div className="bg-black">
            <MarqueeWidget
              marquee={
                <Image
                  src={event.image}
                  alt={event.alt}
                  width="200"
                  height="400"
                  priority
                />
              }
              information={<p>{event.headline}</p>}
            />
          </div>
        ))}
      </div>
      <Analytics />
    </>
  );
}

// /** {/**
//         {/* standard vertical widget */}
//         <div className="sm:hidden">
//           <div
//             className="flex space-x-8 transition-transform duration-1000 ease-in-out"
//             onMouseEnter={() => setIsPaused(true)}
//             onMouseLeave={() => setIsPaused(false)}
//             ref={carouselRef}
//             style={{
//               transform: `translateX(-${scrollPosition}px)`,
//               width: "fit-content",
//               display: "flex",
//               gap: "2rem",
//               willChange: "transform",
//             }}
//           >
//             {events.map((event, index) => (
//               <div
//                 key={index}
//                 className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
//                 style={{
//                   width: "720px",
//                   height: "1280px",
//                   position: "relative",
//                   borderRadius: "0.5rem",
//                   overflow: "hidden",
//                   boxShadow:
//                     "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
//                 }}
//               >
//                 <button
//                   onClick={() => setOpen(true)}
//                   className="transition-all duration-300 hover:scale-105"
//                 >
//                   <Image
//                     src={event.image}
//                     alt={event.alt}
//                     fill
//                     style={{ objectFit: "cover" }}
//                     priority
//                   />
//                 </button>
//                 {/* <Link href={event.href}>
//                   <Image
//                     src={event.image}
//                     alt={event.alt}
//                     fill
//                     style={{ objectFit: "cover" }}
//                     priority
//                   />
//                 </Link> */}
//               </div>
//             ))}
//           </div>
//         </div>
//         {/* standard widescreen  marquee widget */}
//         <div
//           className="hidden sm:block w-full overflow-hidden py-4 relative"
//           ref={containerRef}
//         >
//           <div
//             className="flex space-x-8 transition-transform duration-1000 ease-in-out"
//             onMouseEnter={() => setIsPaused(true)}
//             onMouseLeave={() => setIsPaused(false)}
//             ref={carouselRef}
//             style={{
//               transform: `translateX(-${scrollPosition}px)`,
//               width: "fit-content",
//               display: "flex",
//               gap: "2rem",
//               willChange: "transform",
//             }}
//           >
//             {events.map((event, index) => (
//               <div
//                 key={index}
//                 className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
//                 style={{
//                   width: "720px",
//                   height: "1280px",
//                   position: "relative",
//                   borderRadius: "0.5rem",
//                   overflow: "hidden",
//                   boxShadow:
//                     "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
//                 }}
//               >
//                 <Link href={event.href}>
//                   <Image
//                     src={event.image}
//                     alt={event.alt}
//                     fill
//                     style={{ objectFit: "cover" }}
//                     priority
//                   />
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div> */}
