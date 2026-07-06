import Image from "next/image";
import { useTranslations } from "next-intl";
import Logo from "@/assets/logo.png";

const IG_URL = "https://www.instagram.com/actv_ie/";

/** Branded stand-in when the Instagram feed is unavailable. */
export default function InstagramFallback() {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-cream/15 bg-black/60 px-6 py-12 text-center">
      <Image src={Logo} alt="" width={72} height={72} />
      <p className="max-w-md text-lg text-cream/80">
        {t("instagram.fallbackText")}
      </p>
      <a
        href={IG_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-md bg-maroon px-6 py-3 font-semibold text-white transition-colors hover:bg-red-800"
      >
        {t("instagram.follow")}
      </a>
    </div>
  );
}
