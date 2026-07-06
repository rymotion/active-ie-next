import React, { ReactNode } from "react";
import Navbar from "../nav/navbar";
import DisclosureBar from "../disclosure";

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
    <div className="flex flex-col min-h-[100dvh] bg-black">
      <Navbar transparent={transparentHeader} />

      <main
        className={`flex-grow w-full ${transparentHeader ? "" : "pt-20"} ${className}`}
      >
        {children}
      </main>

      <footer className="w-full">
        <DisclosureBar />
      </footer>
    </div>
  );
};

export default Screen;
