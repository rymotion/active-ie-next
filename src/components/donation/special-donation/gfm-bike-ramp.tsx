import AxelBikeRamp from "@/assets/event-photos/Eagle-scout-poster.png";
import Image from "next/image";
import Link from "next/link";

export default function AltGFMPoster() {
  return (
    <>
      {/* standard vertical widget */}
      <div className="sm:hidden">
        <Link href="https://gofund.me/af39d7ad">
          <Image
            src={AxelBikeRamp}
            alt="SweatPals"
            width="800"
            height="400"
            priority
          ></Image>
        </Link>
      </div>
      {/* standard widescreen  marquee widget */}
      <div className={"flex flex-row items-center padding-10 hidden sm:flex"}>
        {/* TODO: Add programs and efforts components */}

        <Link href="https://gofund.me/af39d7ad">
          <Image
            src={AxelBikeRamp}
            alt="SweatPals"
            width="800"
            height="400"
            priority
          ></Image>
        </Link>
      </div>
    </>
  );
}
