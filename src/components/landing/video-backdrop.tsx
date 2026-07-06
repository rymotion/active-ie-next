"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

type VideoBackdropProps = {
  src: string;
  poster?: string;
};

/**
 * Fixed full-viewport looping video behind the landing scroll story.
 * A scroll-driven scrim keeps the video vivid in the hero and dims it
 * behind the content sections. Under prefers-reduced-motion the video
 * stays paused on its poster frame.
 */
export default function VideoBackdrop({ src, poster }: VideoBackdropProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Vivid at the top, dimmed once the story begins.
  const scrimOpacity = useTransform(
    scrollY,
    [0, 600, 1400],
    [0.35, 0.7, 0.85]
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reducedMotion) {
      video.pause();
    } else {
      // Autoplay can be blocked (iOS low-power mode); the poster covers it.
      video.play().catch(() => {});
    }
  }, [reducedMotion]);

  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
      />
      <motion.div
        className="absolute inset-0 bg-black"
        style={{ opacity: scrimOpacity }}
      />
    </div>
  );
}
