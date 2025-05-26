"use client";
import { Analytics } from "@vercel/analytics/react";
import StreetHockeyPoster from "@/assets/events/street-hockey-v1.png";
import SweatPalsLogo from "@/assets/vendors/sweatpals-logo.svg";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import MarqueeWidget from "../custom-widget/marquee";
import { motion } from "framer-motion";
import { textBoxStyle } from "../animated/container/text/custom-headline-text";
import { fetchEventsFromGoogleSheets } from "@/lib/googleSheets";

// Fallback events in case Google Sheets fails
const fallbackEvents = [
  {
    name: "Active Nights Night Mosh",
    eventLink: "https://www.sweatpals.com/event/active-nights-night-mosh/",
    headline: "A community bike ride for the community",
  },
  {
    name: "Active Nights Breathe",
    eventLink: "https://www.sweatpals.com/event/active-nights-breath/",
    headline:
      "Ease into a guided session to better center yourself in a stressful world.",
    videoEmbed: "https://www.youtube.com/embed/ZiAxgxoJ2js",
  },
  {
    name: "Street Hockey",
    eventLink: "https://www.sweatpals.com/host/actv_ie",
    headline: "Play competitively in a pickup street hockey game.",
  },
];

export default function SweatpalEvents() {
  const [events, setEvents] = useState<
    Array<{
      name: string;
      eventLink: string;
      headline?: string;
      imageUrl?: string;
      videoEmbed?: string;
    }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollSpeed = 50; // pixels per second

  // Fetch events from Google Sheets on component mount
  useEffect(() => {
    const loadEvents = async () => {
      try {
        // Replace with your Google Sheet ID and sheet name
        const sheetId = "1YUiVTKoPOdC6a_muaHwyhsj6QqlRMeTSYXcCi9_9i90";
        const sheetName = "Sheet1";

        const fetchedEvents = await fetchEventsFromGoogleSheets(
          sheetId,
          sheetName
        );

        // If we got events from Google Sheets, use them, otherwise fall back to default
        setEvents(fetchedEvents.length > 0 ? fetchedEvents : fallbackEvents);
      } catch (err) {
        console.error("Failed to load events:", err);
        setError("Failed to load events. Using default events instead.");
        setEvents(fallbackEvents);
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    console.log("scrollPosition", scrollPosition);
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
    <>
      <div className="flex flex-col items-center px-4 sm:px-20 py-8">
        <div style={textBoxStyle.standard}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl font-bold text-center mb-4"
          >
            Our Events
          </motion.h1>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
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

            <Link
              href="https://www.sweatpals.com/host/actv_ie"
              className="hover:bg-red-500 transition-all duration-300 transform hover:scale-105 hidden sm:flex mb-8"
            >
              <Image
                src={SweatPalsLogo}
                alt="SweatPals"
                width={800}
                height={400}
                priority
              />
            </Link>

            <Link
              href="https://www.sweatpals.com/host/actv_ie"
              className="hover:bg-red-500 transition-all duration-300 transform hover:scale-105 sm:hidden mb-8"
            >
              <Image
                src={SweatPalsLogo}
                alt="SweatPals"
                width={500}
                height={400}
                priority
              />
            </Link>

            <div className="w-full max-w-6xl">
              {events.map((event, index) => (
                <div
                  key={`${event.name}-${index}`}
                  className="mb-12 bg-gray-900 rounded-lg overflow-hidden shadow-xl"
                >
                  <MarqueeWidget
                    marquee={
                      event.imageUrl ? (
                        <div className="relative w-full h-64 md:h-96">
                          <Image
                            src={event.imageUrl}
                            alt={event.name}
                            fill
                            className="object-cover"
                            priority
                          />
                        </div>
                      ) : (
                        <div className="w-full h-64 md:h-96 bg-gray-800 flex items-center justify-center">
                          <span className="text-gray-500">
                            <Image
                              src={StreetHockeyPoster}
                              alt={event.name}
                              fill
                              className="object-cover"
                              priority
                            />
                          </span>
                        </div>
                      )
                    }
                    information={
                      <div className="p-6">
                        <h2 className="text-2xl font-bold text-white mb-4">
                          {event.name}
                        </h2>
                        {event.headline && (
                          <p className="text-gray-300 mb-4">{event.headline}</p>
                        )}
                        {event.videoEmbed && (
                          <div className="aspect-w-16 aspect-h-9 mt-4">
                            <iframe
                              src={event.videoEmbed}
                              title={event.name}
                              className="w-full h-64 md:h-96"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
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
              ))}
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
