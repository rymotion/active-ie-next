import React, { useState, useEffect, useRef } from "react";
import OrgContentBody from "../about-body";

import LogoComponent, { logoStyle } from "@/components/logo";

interface ScrollableVideoProps {
  componentUrl: string;
  children: React.ReactNode;
}

export default function ScrollableVideoView({
  children,
  componentUrl,
}: ScrollableVideoProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: Event) => {
    const scrollableContent = document.getElementById("scrollable-video");

    const target = e.target as HTMLElement;
    const scrollTop = target.scrollTop;
    if (scrollPosition != 0 && scrollableContent) {
      const playbackOpacity = (scrollTop - scrollPosition) / scrollPosition;
      scrollableContent.style.opacity = playbackOpacity.toString();
    }
    const maxScroll =
      (scrollContentRef.current?.scrollHeight || 0) -
      (scrollContainerRef.current?.clientHeight || 0);
    const scrollPercentage = Math.min(scrollTop / maxScroll, 1);
    setScrollPosition(scrollPercentage);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <div className="fixed inset-0 -z-10">
        <video
          autoPlay={true}
          muted={true}
          loop={true}
          playsInline={true}
          id="scrollable-video"
          controls={false}
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
        >
          <source src={componentUrl} type="video/mp4" />
        </video>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Scrollable Content */}
      <div
        ref={scrollContainerRef}
        className="h-full w-full overflow-y-auto"
        style={{ scrollBehavior: "smooth" }}
        id="scrollable-content"
      >
        <div
          ref={scrollContentRef}
          className="min-h-[200vh] flex flex-col items-center justify-start pt-20 pb-20"
        >
          <div className="w-full max-w-4xl px-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
