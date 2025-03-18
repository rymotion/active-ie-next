import React from "react";
import EmblaCarousel from "./embla_carousel";
import { EmblaOptionsType } from "embla-carousel";
import EventInformation from "@/data/events";

import "../css/base.css";
import "../css/sandbox.css";
import "../css/embla.css";

const OPTIONS: EmblaOptionsType = { loop: true };

export default function ReEmblaCarousel({
  data,
}: {
  data: Array<React.ReactNode>;
}) {
  return <EmblaCarousel slides={data} options={OPTIONS}></EmblaCarousel>;
}
