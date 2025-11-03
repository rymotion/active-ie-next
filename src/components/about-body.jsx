import CustomHeadlineWidget, {
  textBoxStyle,
} from "./animated/container/text/custom-headline-text";
import { motion } from "framer-motion";

const OrgContentBody = () => {
  return (
    <>
      <div className="relative flex w-full h-full flex-col items-center overflow-hidden  ">
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
