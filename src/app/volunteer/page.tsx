"use client";
import Screen from "@/components/screen/screen";
import { useTranslation } from "@/hooks/useTranslation";
import VolunteerInterestWidget from "./volunteer_interest";

export default function Volunteer() {
  const { t } = useTranslation();
  
  return (
    <>
      <div>
        <Screen>
          <div className="flex sm:flex-col md:flex-col lg:flex-row min-h-screen min-w-screen justify-center items-center h-full w-full px-20">
            <p className="text-2xl font-bold">
              {t("volunteer.description")}
            </p>
            <VolunteerInterestWidget />
          </div>
        </Screen>
      </div>
    </>
  );
}
