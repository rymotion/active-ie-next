"use client";
import Navbar from "@/components/navbar";
import DisclosureBar from "@/components/disclosure";
import { ScrollArrow } from "../scroll-arrow";

export default function Screen({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="flex flex-row min-h-screen min-w-screen justify-center items-center h-full w-full bg-black">
        <ScrollArrow />
        <main>{children}</main>
      </div>
      <footer className="geist-wrapper flex justify-center items-center h-full w-full">
        <DisclosureBar />
      </footer>
    </>
  );
}
