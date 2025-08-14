import React, { ReactNode } from "react";
import Navbar from "../navbar";
import DisclosureBar from "../disclosure";

interface ScreenProps {
  children: ReactNode;
  className?: string;
}

const Screen: React.FC<ScreenProps> = ({ children, className = "" }) => {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-black">
      {/* Persistent Navigation */}
      <header className="sticky top-0 z-50 w-full">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className={`flex-grow w-full ${className}`}>
        <div className="h-full">
          {children}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="w-full">
        <DisclosureBar />
      </footer>
    </div>
  );
};

export default Screen;
