"use client";
import Screen from "@/components/screen/screen";
import PublicCalendar from "./calender";

export default function Events() {
  return (
    <>
      <div>
        <Screen>
          <div className="flex flex-row min-h-screen min-w-screen justify-center items-center h-full w-full">
            <PublicCalendar />
          </div>
        </Screen>
      </div>
    </>
  );
}
