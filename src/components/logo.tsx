import Logo from "../assets/logo.png";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function LogoComponent({}: {
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
