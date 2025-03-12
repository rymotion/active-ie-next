import React from "react";
import EmblaCarousel from "./embla_carousel";
import { EmblaOptionsType } from "embla-carousel";

import "../css/base.css";
import "../css/sandbox.css";
import "../css/embla.css";

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function ReEmblaCarousel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen justify-center items-center h-full w-full">
      <EmblaCarousel slides={SLIDES} options={OPTIONS}></EmblaCarousel>
    </div>
  );
}
