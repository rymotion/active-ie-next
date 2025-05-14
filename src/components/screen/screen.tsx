"use client";
import Navbar from "@/components/navbar";
import DisclosureBar from "@/components/disclosure";
// import { motion, useScroll, useTransform } from "framer-motion";

// export default function Screen({ children }: { children: React.ReactNode }) {
export default function Screen({ children }: { children: React.ReactNode }) {
  // const { scrollYProgress } = useScroll();
  // const scaleValue = useTransform(scrollYProgress, [0, 1], [1, 2]);
  // const opacityValue = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  return (
    <>
      <Navbar />
      <div className="flex flex-row min-h-screen min-w-screen justify-center items-center h-full w-full">
        <main>{children}</main>
      </div>
      <footer className="geist-wrapper">
        <DisclosureBar />
      </footer>
    </>
  );
}
