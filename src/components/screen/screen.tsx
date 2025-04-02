"use client";
import Navbar from "@/components/navbar";
import DisclosureBar from "@/components/disclosure";

export default function Screen({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />{" "}
      <div className="flex flex-row min-h-screen min-w-screen justify-center items-center h-full w-full">
        <main>{children}</main>
      </div>
      <footer className="geist-wrapper">
        <DisclosureBar />
      </footer>
    </>
  );
}
