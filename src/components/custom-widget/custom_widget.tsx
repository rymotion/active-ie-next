import React, { useRef, useEffect } from "react";

type ScrollVideoProps = {
  src: string; // video source (mp4/webm)
  height?: number; // px, height of scroll area
};

export default function ScrollVideoWidget({
  src,
  height = 1200,
}: ScrollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !videoRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Calculate scroll progress within the container (0 to 1)
      const scrollY = Math.min(
        Math.max(windowHeight - rect.top, 0),
        rect.height + windowHeight
      );
      const progress = Math.min(
        Math.max(scrollY / (rect.height + windowHeight), 0),
        1
      );

      // Set video time based on progress
      const video = videoRef.current;
      if (video.duration) {
        video.currentTime = progress * video.duration;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Pause the video so it only advances with scroll
  useEffect(() => {
    if (videoRef.current) videoRef.current.pause();
  }, []);

  return (
    <div ref={containerRef} style={{ height, position: "relative" }}>
      <video
        ref={videoRef}
        src={src}
        style={{ width: "100%", position: "sticky", top: "20vh" }}
        playsInline
        muted
        preload="auto"
      />
    </div>
  );
}
