"use client";

import { useState, useEffect } from "react";

export default function DisclosureBar() {
  const [isOpen, setIsOpen] = useState(false);

  // Load the external script after component mounts
  useEffect(() => {
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
    <div className="w-full bg-black border-b border-gray-200 text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2 md:py-3 md:justify-start md:space-x-10">
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
            <div className="text-xs sm:text-sm text-gray-300">
              <p>
                Active: Inland Empire Inc is a 501(c)(3) non-profit organization
              </p>
              <p>Federal EIN 33-1746388 - All donations are tax-deductible</p>
              <p className="mt-1">
                More information is available on our Guidestar page or by
                opening an inquiry at{" "}
                <a
                  href="mailto:organization@activeie.org"
                  className="text-blue-400 hover:text-blue-300"
                >
                  organization@activeie.org
                </a>
              </p>
            </div>
            <div className="mt-4 flex-shrink-0 md:mt-0 md:ml-4">
              <a
                href="https://app.candid.org/profile/15951102"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://widgets.guidestar.org/prod/v1/pdp/transparency-seal/15951102/svg"
                  alt="Guidestar Transparency 2023"
                  className="h-16 w-auto"
                />
              </a>
            </div>
            <div className="mt-4 flex-shrink-0 md:mt-0 md:ml-4">
              <div id="mni-membership-638839483148203538"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on mobile menu state */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-gray-900`}>
        <div className="pt-2 pb-4 space-y-2">
          <div className="px-4 py-2 text-sm text-gray-300">
            <p>
              Active: Inland Empire Inc is a 501(c)(3) non-profit organization
            </p>
            <p>Federal EIN 33-1746388</p>
            <p>All donations are tax-deductible</p>
            <p className="mt-2">
              More information is available on our Guidestar page or by opening
              an inquiry at{" "}
              <a
                href="mailto:organization@activeie.org"
                className="text-blue-400 hover:text-blue-300"
              >
                organization@activeie.org
              </a>
            </p>
          </div>
          <div className="px-4 py-2">
            <a
              href="https://app.candid.org/profile/15951102"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://widgets.guidestar.org/prod/v1/pdp/transparency-seal/15951102/svg"
                alt="Guidestar Transparency 2023"
                className="h-16 w-auto mx-auto"
              />
            </a>
          </div>
          <div className="px-4 py-2">
            <div id="mni-membership-mobile"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
