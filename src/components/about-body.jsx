import CustomHeadlineWidget, {
  textBoxStyle,
} from "./animated/container/text/custom-headline-text";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const OrgContentBody = () => {
  const t = useTranslations();

  return (
    <div className="relative flex w-full h-full flex-col items-center overflow-hidden px-5">
      <CustomHeadlineWidget
        headline={t("landing.missionLabel")}
        headlineStyle={textBoxStyle.standard}
        bodyStyle={textBoxStyle.content}
        body={
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg text-gray-200 max-w-xl"
          >
            {t("landing.missionBody")}
          </motion.p>
        }
      />
    </div>
  );
};

export default OrgContentBody;
