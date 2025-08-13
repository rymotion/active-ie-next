import React, { useState, useEffect, useRef } from "react";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the device is mobile
    const userAgent =
      typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const isMobileDevice =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      );
    setIsMobile(isMobileDevice);
  }, []);

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

    // Add touch start and click events for mobile devices
    const events = ["touchstart", "click", "scroll"];

    const handleInitialInteraction = () => {
      // Remove all event listeners after first interaction
      events.forEach((event) => {
        document.removeEventListener(event, handleInitialInteraction);
      });
    };

    if (isMobile) {
      events.forEach((event) => {
        document.addEventListener(event, handleInitialInteraction, {
          once: true,
          passive: true,
        });
      });
    }

    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        container.removeEventListener("scroll", handleScroll);
        events.forEach((event) => {
          document.removeEventListener(event, handleInitialInteraction);
        });
      };
    }
  }, []);

  return (
    <>
      <div className="h-screen w-screen overflow-hidden bg-transparent">
        {/* Background Video */}
        <video
          ref={videoRef}
          autoPlay={true}
          muted={true}
          loop={true}
          playsInline={true}
          id="scrollable-video"
          controls={false}
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
          webkit-playsinline="true"
          x5-playsinline="true"
          x5-video-player-type="h5"
          x5-video-orientation="portrait"
        >
          <source src={componentUrl} type="video/mp4" />
        </video>

        {/* Scrollable Content */}
        <div
          ref={scrollContainerRef}
          className="content h-full w-full overflow-y-auto"
          style={{ scrollBehavior: "smooth" }}
          id="scrollable-content"
        >
          <div
            ref={scrollContentRef}
            className="min-h-[200vh] flex flex-col items-center justify-start pt-20 pb-20 bg-transparent"
          >
            <div className="w-full max-w-4xl px-4">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
