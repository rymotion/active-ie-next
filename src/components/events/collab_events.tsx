"use client";
import { Analytics } from "@vercel/analytics/react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import MarqueeWidget from "../custom-widget/marquee";
import { motion } from "framer-motion";
import { fetchEventsFromGoogleSheets } from "@/lib/googleSheets";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

// Helper function to handle Google Drive URLs
const getDirectImageUrl = (url: string) => {
  if (!url) return null;
  // For Google Drive shareable links
  if (url.includes("drive.google.com")) {
    const fileId =
      url.match(/\/file\/d\/([^\/]+)/)?.[1] || url.match(/id=([^&]+)/)?.[1];
    return fileId
      ? `https://drive.google.com/uc?export=view&id=${fileId}`
      : url;
  }
  return url;
};

// Image component with loading and error states
const EventImage = ({
  src,
  alt,
  className = "",
  fallbackSrc = "/images/fallback-event.jpg",
}: {
  src: string | StaticImport;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc] = useState<string | StaticImport>(() => {
    if (typeof src === "string") {
      return getDirectImageUrl(src) || "";
    }
    return src;
  });
  console.log("image src %s", imageSrc);
  console.log("has error %s", hasError);
  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
      )}
      <Image
        src={hasError ? fallbackSrc : imageSrc}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        priority={false}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      {hasError && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-gray-500">Image not available</span>
        </div>
      )}
    </div>
  );
};

// Fallback events in case Google Sheets fails
const fallbackCollabEvents = [
  {
    name: "Mega Bowl",
    eventLink:
      "https://www.instagram.com/p/DGfJ0crxKvb/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    headline: "",
  },
];

export default function CollaborationEvents() {
  const [events, setEvents] = useState<
    Array<{
      name: string;
      eventLink: string;
      headline?: string;
      posterUrl?: string;
    }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scrollPosition] = useState(0);
  const [isPaused] = useState(false);
  // const carouselRef = useRef<HTMLDivElement>(null);
  // const containerRef = useRef<HTMLDivElement>(null);
  const scrollSpeed = 50; // pixels per second

  useEffect(() => {
    const loadCollabEvents = async () => {
      try {
        const sheetId = "1YUiVTKoPOdC6a_muaHwyhsj6QqlRMeTSYXcCi9_9i90";
        const sheetName = "Sheet2";

        const fetchedEvents = await fetchEventsFromGoogleSheets(
          sheetId,
          sheetName
        );

        setEvents(fetchedEvents);
      } catch (err) {
        console.error("Failed to load events:", err);
        setError("Failed to load events. Using default events instead.");
        setEvents(fallbackCollabEvents);
      } finally {
        setIsLoading(false);
      }
    };

    loadCollabEvents();
  });

  useEffect(() => {
    console.log("scrollPosition", scrollPosition);
  }, [isPaused, scrollSpeed]);

  return (
    <>
      <div>
        {isLoading ? (
          <div className="text-center py-8" role="alert">
            <p>Loading events...</p>
          </div>
        ) : error ? (
          <div
            className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6"
            role="alert"
          >
            <p className="font-bold">Warning</p>
            <p>{error}</p>
          </div>
        ) : (
          <>
            <p className="text-center mb-8 text-lg">
              Click the link below to access our calendar of events.
            </p>

            <div className="w-full max-w-6xl">
              {events.map((event, index) => {
                return (
                  <div
                    key={`${event.name}-${index}`}
                    className="mb-12 bg-gray-900 rounded-lg overflow-hidden shadow-xl"
                  >
                    <MarqueeWidget
                      marquee={
                        event.posterUrl ? (
                          <div className="relative w-full h-64 md:h-96">
                            <EventImage
                              src={event.posterUrl}
                              alt={event.name}
                              className="rounded-lg"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-64 md:h-96 bg-gray-800 flex items-center justify-center">
                            <span className="text-gray-500"></span>
                          </div>
                        )
                      }
                      information={
                        <div className="p-6">
                          <h2 className="text-2xl font-bold text-white mb-4">
                            {event.name}
                          </h2>
                          {event.headline && (
                            <p className="text-gray-300 mb-4">
                              {event.headline}
                            </p>
                          )}

                          {event.eventLink && (
                            <a
                              href={event.eventLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block mt-4 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                              Learn More
                            </a>
                          )}
                        </div>
                      }
                    />
                  </div>
                );
              })}
            </div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="mt-8 px-8 py-4 bg-red-600 text-white text-xl font-bold rounded-lg hover:bg-red-700 transition-colors shadow-lg"
              onClick={() =>
                window.open("https://www.sweatpals.com/host/actv_ie")
              }
            >
              View all events on SweatPals
            </motion.button>
          </>
        )}
      </div>

      <Analytics />
    </>
  );
}
