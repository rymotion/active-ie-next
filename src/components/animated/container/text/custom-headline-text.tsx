import { motion, useTransform, useScroll } from "framer-motion";

// This creates a custom headlining widget that will have a slight animation on user interaction
export default function CustomHeadlineWidget({
  headline,
  headlineStyle,
  body,
  bodyStyle,
}: {
  headline: string;
  headlineStyle: {};
  body: React.ReactNode;
  bodyStyle: {};
}) {
  const { scrollYProgress } = useScroll();
  const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], [1, 2, 1]);

  return (
    <>
      <div className="flex flex-col full-width min-h-screen">
        <div style={headlineStyle}>
          <motion.h1 style={{ scaleZ: scaleValue }}>{headline}</motion.h1>
        </div>
        <div className="flex flex-col items-center justify-center sm:px-60 md:px-40 lg:px-20">
          {body}
        </div>
      </div>
    </>
  );
}

export const textBoxStyle = {
  standard: {
    minHeight: "50vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    minHeight: "50vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
