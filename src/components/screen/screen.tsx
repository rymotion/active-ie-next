"use client";
import Navbar from "@/components/navbar";
import DisclosureBar from "@/components/disclosure";
import { ScrollArrow } from "../scroll-arrow";
import { useContext, useState, useEffect } from "react";

export default function Screen({ children }: { children: React.ReactNode }) {
  const [scaler, setScaler] = useState("compact");
  // const [screen, setScreen] = useState(useContext.name);
  // const [cart, setCart] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScaler("compact");
      } else {
        setScaler("full");
      }
    };

    const handleScreenChange = () => {
      console.log(`handle screen change: ${useContext.name}`);
      // setScreen(useContext.name);
    };

    handleResize();
    window.addEventListener(`resized for ${scaler}`, handleResize);
    window.addEventListener(
      `screen change for ${useContext.name}`,
      handleScreenChange
    );

    return () => {
      window.removeEventListener(`resized for ${scaler}`, handleResize);
    };
  }, [scaler]);

  // useEffect(() => {
  //   const handleCartUpdate = () => {};
  //   handleCartUpdate();
  // }, [cart]);

  return (
    <>
      <Navbar />
      <div className="flex flex-row min-h-screen min-w-screen justify-center items-center h-full w-full bg-black">
        <ScrollArrow />
        <section>{children}</section>
      </div>
      <footer className="geist-wrapper flex justify-center items-center h-full w-full">
        <DisclosureBar />
      </footer>
    </>
  );
}
