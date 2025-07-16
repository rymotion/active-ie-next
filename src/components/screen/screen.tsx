"use client";
import Navbar from "@/components/navbar";
import DisclosureBar from "@/components/disclosure";
import { ScrollArrow } from "../scroll-arrow";
import { useState, useEffect } from "react";

export default function Screen({ children }: { children: React.ReactNode }) {
  const [scaler, setScaler] = useState("compact");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScaler("compact");
      } else {
        setScaler("full");
      }
    };

    handleResize();
    window.addEventListener(`resized for ${scaler}`, handleResize);

    return () => {
      window.removeEventListener(`resized for ${scaler}`, handleResize);
    };
  }, [scaler]);

  return (
    <>
      <Navbar />
      <div className="flex flex-row min-h-screen min-w-screen justify-center items-center h-full w-full bg-black">
        <ScrollArrow />
        {/* item checkout overlay */}
        <main>{children}</main>
      </div>

      <footer className="geist-wrapper flex justify-center items-center h-full w-full">
        <DisclosureBar />
      </footer>
    </>
  );
}
