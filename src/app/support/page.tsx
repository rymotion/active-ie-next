"use client";
import Screen from "@/components/screen/screen";
import DonationBody from "@/components/donation";
import OrgContentBody from "@/components/about-body";
import { useState, useEffect } from "react";

export default function Project({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>
        <Screen>
          <h1>Support</h1>
          <div>
            <DonationBody />
            <div>
              <div
                className="gfm-embed text- 3x1 font-bold h-full w-half px-4 2xl:px-16"
                data-url="https://www.gofundme.com/f/axels-eagle-project-bike-ramps-for-rancho-cucamonga/widget/large?sharesheet=fundraiser sidebar&attribution_id=sl:36c9bb55-d95a-46ce-a8fa-197a857f6dcf"
              ></div>
            </div>
            <div>
              <script type="text/javascript">
                gnp_url = "active-inland-empire-inc"; gnp_num = "1";
              </script>
            </div>
          </div>
        </Screen>
      </div>
    </>
  );
}
