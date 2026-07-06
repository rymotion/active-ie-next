"use client";

import { useEffect } from "react";
import {
  GIVEBUTTER_ACCOUNT,
  GIVEBUTTER_GENERAL_WIDGET_ID,
} from "@/content/projects";

const SCRIPT_SRC = `https://widgets.givebutter.com/latest.umd.cjs?acct=${GIVEBUTTER_ACCOUNT}&p=other`;

/**
 * GiveButter donation widget. The script is injected via effect — a raw
 * <script> tag in JSX is not executed reliably by React (the old bug).
 */
export default function GivebutterEmbed({
  widgetId = GIVEBUTTER_GENERAL_WIDGET_ID,
}: {
  widgetId?: string;
}) {
  useEffect(() => {
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="flex w-full justify-center">
      <givebutter-widget id={widgetId}></givebutter-widget>
    </div>
  );
}
