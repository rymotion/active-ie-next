"use client";
import Navbar from "@/components/navbar";
import DisclosureBar from "@/components/disclosure";

export default function Screen({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div>
        <main>{children}</main>
      </div>
      <footer className="geist-wrapper">
        <DisclosureBar />
      </footer>
    </>
  );
}
