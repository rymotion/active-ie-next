"use client";
import Screen from "@/components/screen/screen";
import { useTranslation } from "@/hooks/useTranslation";

export default function Privacy() {
  const { t } = useTranslation();
  
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
