import Logo from "../assets/logo.png";
import Image from "next/image";
import { motion, useTransform, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
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
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  useEffect(() => {
    // Fetch a product image from Shopify to use as background
    const fetchBackgroundImage = async () => {
      try {
        // Fetch a featured collection
        const collection = await shopifyService.getCollectionByHandle(
          "featured",
          1
        );
        if (collection?.products?.[0]?.images?.[0]?.src) {
          setBackgroundImage(collection.products[0].images[0].src);
        }
      } catch (error) {
        console.error("Error fetching background image:", error);
      }
    };

    fetchBackgroundImage();
  }, []);

  return (
    <div
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        ...styles,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <video
        src="https://cdn.shopify.com/videos/c/o/v/1a1c3a2e5dce42fb99821f36002c1bd0.mov"
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
    </div>
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
