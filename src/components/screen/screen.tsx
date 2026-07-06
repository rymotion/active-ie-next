import React, { ReactNode } from "react";
import Navbar from "../nav/navbar";
import Footer from "../footer";

interface ScreenProps {
  children: ReactNode;
  className?: string;
  /**
   * Landing page: the fixed header starts transparent over the hero video
   * and content flows underneath it (no top padding).
   */
  transparentHeader?: boolean;
}

const Screen: React.FC<ScreenProps> = ({
  children,
  className = "",
  transparentHeader = false,
}) => {
  return (
    // Transparent when a fixed video backdrop sits behind the page
    // (body is black anyway, so opaque pages are unaffected).
    <div
      className={`flex flex-col min-h-[100dvh] ${transparentHeader ? "" : "bg-black"}`}
    >
      <Navbar transparent={transparentHeader} />

      <main
        className={`flex-grow w-full ${transparentHeader ? "" : "pt-20"} ${className}`}
      >
        {children}
      </main>

      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
};

export default Screen;
