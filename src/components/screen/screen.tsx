import React, { ReactNode } from "react";
import Navbar from "../navbar";
import DisclosureBar from "../disclosure";

interface ScreenProps {
  children: ReactNode;
  className?: string;
}

const Screen: React.FC<ScreenProps> = ({ children, className = "" }) => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-black">
      {/* Persistent Navigation */}
      <header className="sticky top-0 z-50 w-full">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className={`flex-grow w-full ${className}`}>{children}</main>

      {/* Sticky Footer */}
      <footer className="w-full bg-black border-t border-gray-800">
        <div className="page-width mx-auto py-4">
          <DisclosureBar />
        </div>
      </footer>
    </div>
  );
};

export default Screen;
