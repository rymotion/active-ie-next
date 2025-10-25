import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [showScrollPrompt, setShowScrollPrompt] = useState(false);
  const [autoPlayComplete, setAutoPlayComplete] = useState(false);
  const [isScrollControlled, setIsScrollControlled] = useState(false);

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

  // Auto-play for 5 seconds then show scroll prompt
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Pause video initially
    video.pause();

    // Start auto-play after a brief delay to ensure video is loaded
    const startTimer = setTimeout(() => {
      video.play().catch((error) => {
        console.log("Auto-play prevented:", error);
      });
    }, 100);

    // After 5 seconds, pause and show scroll prompt
    const autoPlayTimer = setTimeout(() => {
      video.pause();
      setAutoPlayComplete(true);
      setShowScrollPrompt(true);
    }, 5100);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(autoPlayTimer);
    };
  }, []);

  const handleScroll = (e: Event) => {
    const video = videoRef.current;
    const target = e.target as HTMLElement;
    const scrollTop = target.scrollTop;

    // Hide scroll prompt once user starts scrolling
    if (scrollTop > 10 && showScrollPrompt) {
      setShowScrollPrompt(false);
      setIsScrollControlled(true);
    }

    // Calculate scroll progress
    const maxScroll =
      (scrollContentRef.current?.scrollHeight || 0) -
      (scrollContainerRef.current?.clientHeight || 0);
    const scrollPercentage = Math.min(scrollTop / maxScroll, 1);
    setScrollPosition(scrollPercentage);

    // Control video playback based on scroll position
    if (video && autoPlayComplete && isScrollControlled) {
      // Map scroll position to video duration
      const videoDuration = video.duration;
      if (!isNaN(videoDuration) && videoDuration > 0) {
        const targetTime = scrollPercentage * videoDuration;
        video.currentTime = targetTime;
      }
    }
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
  }, [autoPlayComplete, isScrollControlled, showScrollPrompt]);

  return (
    <>
      <div className="h-screen w-screen overflow-hidden bg-transparent">
        {/* Background Video */}
        <video
          ref={videoRef}
          autoPlay={false}
          muted={true}
          loop={false}
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

        {/* Scroll Prompt Overlay */}
        <AnimatePresence>
          {showScrollPrompt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
            >
              <div className="bg-black/60 backdrop-blur-sm px-8 py-6 rounded-lg text-center">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <svg
                    className="w-8 h-8 mx-auto mb-3 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </motion.div>
                <p className="text-white text-lg font-light tracking-wide">
                  Scroll to continue
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
