import ScrollReveal from "@/components/animated/scroll-reveal";

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
        <ScrollReveal
          delay={0.2}
          duration={0.7}
          as="h1"
        >
          {headline}
        </ScrollReveal>
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
