"use client";
import Screen from "@/components/screen/screen";
import { useTranslations } from "next-intl";

export default function Privacy() {
  const t = useTranslations();
  
  return (
    <>
      <div>
        <Screen>
          <div className="flex flex-col p-8">
            <h1 className="text-3xl font-bold mb-6">{t("privacy.title")}</h1>
            <p className="text-base leading-relaxed">
              {t("privacy.content")}
            </p>
          </div>
        </Screen>
      </div>
    </>
  );
}
