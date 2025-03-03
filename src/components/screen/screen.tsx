"use client";
import Navbar from "@/components/navbar";
import DisclosureBar from "@/components/disclosure";

export default function Screen({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />

      <main>{children}</main>

      <footer className="geist-wrapper">
        <DisclosureBar />
      </footer>
    </>
  );
}
