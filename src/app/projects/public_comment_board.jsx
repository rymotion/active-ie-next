"use client";

import { useState, useEffect } from "react";

export default function PublicCommentBoard() {
  const [dimensions, setDimensions] = useState({
    width: "100%",
    height: "600px",
    padding: 20, // padding in pixels
  });

  useEffect(() => {
    const updateDimensions = () => {
      // Get the viewport dimensions
      const viewportWidth = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      const viewportHeight = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );

      // Calculate maximum dimensions with padding
      const maxWidth = viewportWidth - dimensions.padding * 2;
      const maxHeight = viewportHeight - dimensions.padding * 2 - 120; // Subtract header/footer space

      // Maintain 16:9 aspect ratio
      const aspectRatio = 16 / 9;
      let width = maxWidth;
      let height = width / aspectRatio;

      // If height is too tall, adjust based on height
      if (height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
      }

      setDimensions((prev) => ({
        ...prev,
        width: `${width}px`,
        height: `${height}px`,
      }));
    };

    // Initial calculation
    updateDimensions();

    // Add event listener for window resize
    window.addEventListener("resize", updateDimensions);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div
      className="flex items-center justify-center w-full"
      style={{ padding: `${dimensions.padding}px` }}
    >
      <div
        style={{
          width: dimensions.width,
          height: dimensions.height,
          maxWidth: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <iframe
          src="https://drive.google.com/file/d/1sDSYMx52tP6rQeDwE-9GKM8sPjU-tF9A/preview"
          allowFullScreen={true}
          width="100%"
          height="100%"
          style={{
            border: "none",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        ></iframe>
      </div>
    </div>
  );
}
