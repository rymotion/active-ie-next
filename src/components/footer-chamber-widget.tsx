"use client";

import { useEffect } from "react";

const WIDGET_ID = "mni-membership-638839483148203538";

/** Rancho Cucamonga Chamber of Commerce member badge (external script). */
export default function FooterChamberWidget() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://ranchochamber.chambermaster.com/Content/Script/Member.js";
    script.async = true;
    script.onload = () => {
      if (window.MNI) {
        new window.MNI.Widgets.Member(WIDGET_ID, {
          member: 16257,
          styleTemplate:
            "#@id{text-align:center;position:relative}#@id .mn-widget-member-name{font-weight:700}#@id .mn-widget-member-logo{max-width:100%}",
        }).create();
      }
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id={WIDGET_ID} className="max-w-full" />;
}
