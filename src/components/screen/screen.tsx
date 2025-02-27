"use client";
import Navbar from "@/components/navbar";
import DisclosureBar from "@/components/disclosure";

export default function Screen({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>
        <main>
          <div>
            <Navbar />
          </div>
          {children}
        </main>
      </div>
      <div className="geist-wrapper">
        <DisclosureBar />
      </div>
    </>
  );
}
