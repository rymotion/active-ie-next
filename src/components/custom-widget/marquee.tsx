import React from "react";

export default function MarqueeWidget({
  marquee,
  information,
}: {
  marquee: React.ReactNode;
  information: React.ReactNode;
}) {

  return (
    <>
      {/* standard vertical widget */}
      <div className="sm:hidden">
        <div>{marquee}</div>
        <div className="flex flex-wrap items-start padding-20px">
          {information}
        </div>
      </div>
      {/* standard widescreen  marquee widget */}
      <div
        className={
          "flex flex-row items-center padding-20px hidden  sp:even sm:flex"
        }
      >
        <div className="flex flex-wrap items-start padding-20">{marquee}</div>
        <div className="flex flex-wrap items-start padding-20">
          {information}
        </div>
      </div>
    </>
  );
}
