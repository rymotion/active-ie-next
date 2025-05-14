import Logo from "../assets/logo.png";
import Image from "next/image";
export default function LogoComponent() {
  return (
    <div className="flex flex-row items-center">
      <Image
        src={Logo}
        alt="Logo"
        width="100"
        height="100"
        className="cursor-pointer"
        priority
      ></Image>
      <h1>Active Inland Empire</h1>
    </div>
  );
}
