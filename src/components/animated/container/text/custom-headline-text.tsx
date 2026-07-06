import { motion } from "framer-motion";

// This creates a custom headlining widget that will have a slight animation on user interaction
export default function CustomHeadlineWidget({
  headline,
  headlineStyle,
  body,
  bodyStyle,
}: {
  headline: string;
  headlineStyle: {
    minHeight: string;
    display: string;
    justifyContent: string;
    alignItems: string;
  };
  body: React.ReactNode;
  bodyStyle: {
    minHeight: string;
    display: string;
    justifyContent: string;
    alignItems: string;
  };
}) {
  return (
    <section>
      <div style={headlineStyle}>
        {/* h2: pages provide their own h1; this widget renders section headings */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display text-title uppercase tracking-wide"
        >
          {headline}
        </motion.h2>
      </div>
      <div style={bodyStyle}>
        <div className="flex flex-col items-center justify-center">{body}</div>
      </div>
    </section>
  );
}

export const textBoxStyle = {
  standard: {
    minHeight: "20vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    minHeight: "20vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
