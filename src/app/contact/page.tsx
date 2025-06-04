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
          <div className="hidden lg:block">
            <div className="flex flex-row min-h-screen min-w-screen justify-center items-center h-full w-full">
              <NewsletterWidget />
              <InstaWidget />
            </div>
          </div>

          <div className="flex flex-col min-h-screen min-w-screen justify-center items-center h-full w-full">
            <h2 className="text-2xl font-bold text-center mb-4">Inquries:</h2>

            <a
              href="mailto:organization@activeie.org"
              className="text-blue-400 hover:text-blue-300"
            >
              organization@activeie.org
            </a>
          </div>
          <Analytics />
        </Screen>
      </div>
    </>
  );
}
