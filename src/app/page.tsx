"use client";
import Screen from "@/components/screen/screen";
import DonationBody from "@/components/donation";
import OrgContentBody from "@/components/about-body";
import GofundmeWidget from "@/components/gofundme";

export default function Home() {
  return (
    <>
      <div>
        <Screen>
          <div className="flex flex-row min-h-screen min-w-screen justify-center items-center h-full w-full">
            <OrgContentBody />
          </div>
          <div>
            <DonationBody />
            <GofundmeWidget />
          </div>
        </Screen>
      </div>
    </>
  );
}
