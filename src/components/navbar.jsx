import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="fixed w-full h-24 shadow-xl bg-black">
      <div className="flex justify-between items-center h-full w-full px-4 2xl:px-16">
        <Link href="/">
          <Image
            src={Logo}
            alt="Logo"
            width="100"
            height="100"
            className="cursor-pointer"
            priority
          ></Image>
        </Link>
        <div>
          <ul className="hidden sm:flex">
            <Link href="/blog">
              <li className="ml-10 uppercase hover:border-b text-xl">Blog</li>
            </Link>
            <Link href="/events">
              <li className="ml-10 uppercase hover:border-b text-xl">Events</li>
            </Link>
            {/* <Link href="/projects">
              <li className="ml-10 uppercase hover:border-b text-xl">
                Projects
              </li>
            </Link> */}
            <Link href="https://activeie.myshopify.com">
              <li className="ml-10 uppercase hover:border-b text-xl">
                Products
              </li>
            </Link>
            {/* <Link href="/contact">
              <li className="ml-10 uppercase hover:border-b text-xl">
                Contact Us
              </li>
            </Link> */}
            <Link href="/support">
              <li className="mx-10 uppercase hover:border-b text-xl">
                Support Us
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
