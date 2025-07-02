"use client";
import React, { useRef, useEffect } from "react";

const GofundmeWidget = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = document.createElement("div");
    container.id = "gfm-embed";
    container.style.justifyContent = "center";
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    const marquee = document.getElementById("gfm-embed");

    if (marquee) {
      marquee.appendChild(container);
      const script = document.createElement("script");
      script.src = "https://www.gofundme.com/static/js/embed.js";
      script.async = true;

      container.appendChild(script);
    }

    return () => {
      if (marquee?.contains(container)) {
        marquee.removeChild(container);
      }
    };
  }, []);

  return <div ref={containerRef}></div>;
};

export default GofundmeWidget;
