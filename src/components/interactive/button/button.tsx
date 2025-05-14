"use client";
import { Analytics } from "@vercel/analytics/react";
import StreetHockeyPoster from "@/assets/events/street-hockey.png";
import BreathePoster from "@/assets/events/breathe-ig.png";
import SweatPalsLogo from "@/assets/vendors/sweatpals-logo.svg";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { div } from "framer-motion/client";

export default function InteractiveButton({
  animateSubject,
  informationSubject,
}: {
  animateSubject: [];
  informationSubject: React.ReactNode;
}) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);
  const lastTimestampRef = useRef<number>(0);
  const scrollSpeed = 50; // pixels per second

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
    <div
      className="hidden sm:block w-full overflow-hidden py-4 relative"
      ref={containerRef}
    >
      <div
        className="flex space-x-8 transition-transform duration-1000 ease-in-out"
        ref={carouselRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{
          transform: `translateX(-${scrollPosition}px)`,
          width: "fit-content",
          display: "flex",
          gap: "2rem",
          willChange: "transform",
        }}
      >
        {animateSubject.map((e, i) => (
          <></>
        ))}
      </div>
    </div>
  );
}
