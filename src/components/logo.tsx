import Logo from "../assets/logo.png";
import Background from "../assets/background.png";
import Image from "next/image";
import { motion, useTransform, useScroll } from "framer-motion";

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
    <div
      className="flex flex-row flex-col items-center full-width min-h-screen"
      style={styles}
    >
      <motion.h1
        style={{ scale: scaleValue }}
        className="text-6xl font-bold text-white drop-shadow-lg"
      >
        <div className="flex flex-col items-center justify-center">
          <Image
            src={Logo}
            alt="Logo"
            width="200"
            height="200"
            className="cursor-pointer"
            priority
          ></Image>
          <h1>Active Inland Empire</h1>
        </div>
      </motion.h1>
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
