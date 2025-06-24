import CustomHeadlineWidget, {
  textBoxStyle,
} from "./animated/container/text/custom-headline-text";
import { motion } from "framer-motion";

const OrgContentBody = () => {
  return (
    <>
      <div
        className="relative flex w-full w-flex h-full h-flex
      flex-col items-center overflow-hidden  "
      >
        <CustomHeadlineWidget
          headline="Our Mission"
          headlineStyle={textBoxStyle.standard}
          bodyStyle={textBoxStyle.content}
          body={
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-lg text-gray-200 max-w-xl"
            >
              To build community by creating, cultivating, and promoting health
              and wellness programs with a low financial barrier of entry in the
              Inland Empire. At Active Inland Empire we aim to be able to foster
              a "third place" with local business partners, city governments,
              and supporting community led efforts to make a safer Southern
              California region.
            </motion.p>
          }
        />
      </div>
    </>
  );
};

export default OrgContentBody;

{
  /* <div className="flex flex-row items-center px-4 py-10">
          <div className="flex flex-col items-center px-4 py-10">
            <h1>Our Mission</h1>
            <p className="max-w-xl text-center">
              To build community by creating, cultivating, and promoting health
              and wellness programs with a low financial barrier of entry in the
              Inland Empire. At Active Inland Empire we aim to be able to foster
              a "third place" with local business partners, city governments,
              and supporting community led efforts to make a safer Southern
              California region.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center px-4">
          <h2>What We Do</h2>
          <p className="max-w-xl text-center">
            We aim to craft programs and help support and raise funds for
            efforts that engage with the community and introduce people to
            activities, exercises, and enhances community facilities that would
            push people to get outside of their house and connect with their
            community throughout the Inland Empire. Below are some of the
            efforts that we take on as an organization
          </p>
        </div>
        <div></div> */
}
