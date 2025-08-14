"use client";

import { useEffect } from "react";

export default function DisclosureBar() {
  // Handle scroll events to detect when user is at the bottom
  useEffect(() => {
    // Load the member script
    const script = document.createElement("script");
    script.src =
      "https://ranchochamber.chambermaster.com/Content/Script/Member.js";
    script.async = true;
    script.onload = () => {
      if (window.MNI) {
        new window.MNI.Widgets.Member("mni-membership-638839483148203538", {
          member: 16257,
          styleTemplate:
            "#@id{text-align:center;position:relative}#@id .mn-widget-member-name{font-weight:700}#@id .mn-widget-member-logo{max-width:100%}",
        }).create();
      }
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full bg-black border-t border-gray-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
            <div className="text-xs leading-5 text-gray-300">
              <p>
                Active: Inland Empire Inc is a 501(c)(3) non-profit organization
              </p>
              <p>Federal EIN 33-1746388 - All donations are tax-deductible</p>
              <p className="mt-1">
                More information is available on our Guidestar page or by
                opening an inquiry at{" "}
                <a
                  href="mailto:organization@activeie.org"
                  className="text-blue-400 hover:text-blue-300 hover:underline"
                >
                  organization@activeie.org
                </a>
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <a
                href="https://app.candid.org/profile/15951102"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0"
              >
                <img
                  src="https://widgets.guidestar.org/prod/v1/pdp/transparency-seal/15951102/svg"
                  alt="Guidestar Transparency 2023"
                  className="h-14 w-auto"
                />
              </a>
              <div
                id="mni-membership-638839483148203538"
                className="flex-shrink-0"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
