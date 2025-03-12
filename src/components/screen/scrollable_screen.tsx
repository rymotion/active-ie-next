import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/navbar";
import DisclosureBar from "@/components/disclosure";

export default function ScrollableScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = useCallback(() => {
    setScrollPosition(window.scrollY);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <div className="contnr">
        <p>Scroll position debug: {scrollPosition}</p>
      </div>
      <footer className="geist-wrapper">
        <DisclosureBar />
      </footer>
    </>
  );
}
