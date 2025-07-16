"use client";
import Screen from "@/components/screen/screen";
import VolunteerInterestWidget from "./volunteer_interest";

export default function Volunteer() {
  return (
    <>
      <div>
        <Screen>
          <div className="flex sm:flex-col md:flex-col lg:flex-row min-h-screen min-w-screen justify-center items-center h-full w-full px-20">
            <p className="text-2xl font-bold">
              Want to work our events or be a part of our organization? Fill out
              the form below to express your interest.
            </p>
            <VolunteerInterestWidget />
          </div>
        </Screen>
      </div>
    </>
  );
}
