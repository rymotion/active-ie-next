import Logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { shopifyService } from "@/services/shopify";

export default function LogoComponent({
  styles,
}: {
  styles: {
    minHeight: string;
    display: string;
    justifyContent: string;
    alignItems: string;
  };
}) {
  const { scrollYProgress } = useScroll();
  const scaleValue = useTransform(scrollYProgress, [0, 1, 1], [1, 2, 1]);

  return (
    <>
      <div className="absolute inset-0 bg-opacity-50" />
      <video
        src="https://cdn.shopify.com/videos/c/o/v/ee108db5cf354e62bf3cca4363d5bdb8.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <motion.div
        style={{
          scale: scaleValue,
          position: "relative",
          zIndex: 1,
        }}
        className="text-6xl font-bold text-white drop-shadow-lg"
      >
        <div className="flex flex-col items-center justify-center">
          <Image
            src={Logo}
            alt="Active IE Logo"
            width="200"
            height="200"
            className="cursor-pointer"
            priority
          />
          <h1 className="text-center">Active Inland Empire</h1>
        </div>
      </motion.div>
    </>
  );
}

export const logoStyle = {
  welcome: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  standard: {
    minHeight: "50vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: "6rem",
    fontWeight: "bold",
    color: "white",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  },
};
