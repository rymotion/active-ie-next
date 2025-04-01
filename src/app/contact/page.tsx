"use client";
import Screen from "@/components/screen/screen";
import InstaWidget from "./instagram_gallery";

import NewsletterWidget from "./newsletter_subscribe";
import { Analytics } from "@vercel/analytics/react";

export default function Contact() {
  return (
    <>
      <div>
        <Screen>
          <div className="display: flex; flex-direction: column; align-items: center">
            <NewsletterWidget />
            <InstaWidget />
          </div>
          <div className="flex flex-row min-h-screen min-w-screen justify-center items-center h-full w-full">
            <h2>Inquries:</h2>

            <p>organization@activeie.org</p>
          </div>
          <Analytics />
        </Screen>
      </div>
    </>
  );
}
