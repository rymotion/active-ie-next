import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ScrollArrowProps {
  duration?: number;
}

export const ScrollArrow: React.FC<ScrollArrowProps> = ({
  duration = 10000,
}) => {
  const [showArrow, setShowArrow] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const handleActivity = () => {
    if (timer) {
      clearTimeout(timer);
    }

    setShowArrow(false);
    setTimer(
      setTimeout(() => {
        setShowArrow(true);
      }, duration)
    );
  };

  useEffect(() => {
    // Add event listeners for user activity
    const events = [
      "mousemove",
      "mousedown",
      "wheel",
      "DOMMouseScroll",
      "mousewheel",
      "click",
      "scroll",
      "keypress",
      "touchstart",
      "touchmove",
    ];

    events.forEach((event) => {
      document.addEventListener(event, handleActivity);
    });

    // Start the initial timer
    setTimer(
      setTimeout(() => {
        setShowArrow(true);
      }, duration)
    );

    // Cleanup event listeners on unmount
    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity);
      });
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [duration]);

  if (!showArrow) return null;

  return (
    <>
      <div className="flex flex-row flex-col items-center justify-center">
        <motion.div
          className="scroll-arrow cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            bottom: "20px",
            left: "center",
            transform: "translateX(-50%)",
            zIndex: 1000,
            cursor: "pointer",
          }}
          onClick={() =>
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            })
          }
        >
          <svg
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5L12 19M19 12L12 19L5 12" />
          </svg>
        </motion.div>
      </div>
    </>
  );
};
