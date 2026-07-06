import AxelBikeRamp from "@/assets/event-photos/Eagle-scout-poster.png";
import Image from "next/image";

export default function AltGFMPoster() {
  return (
    <>
      {/* standard vertical widget */}
      <div className="flex flex-col sm:hidden items-center justify-center">
        <a href="https://gofund.me/af39d7ad" target="_blank" rel="noopener noreferrer">
          <Image
            src={AxelBikeRamp}
            alt="SweatPals"
            width="300"
            height="150"
            priority
          ></Image>
        </a>
      </div>
      {/* standard widescreen  marquee widget */}
      <div
        className={
          "flex flex-row items-center justify-center padding-10 hidden sm:flex"
        }
      >
        {/* TODO: Add programs and efforts components */}

        <a href="https://gofund.me/af39d7ad" target="_blank" rel="noopener noreferrer">
          <Image
            src={AxelBikeRamp}
            alt="SweatPals"
            width="800"
            height="400"
            priority
          ></Image>
        </a>
      </div>
    </>
  );
}
