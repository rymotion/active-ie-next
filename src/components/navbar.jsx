import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/logo.png";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-black">
      <nav className="fixed w-full h-24 shadow-xl bg-black">
        <div className="flex justify-between items-center h-full w-full px-4 2xl:px-16 bg-black">
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
          <div className="hidden sm:flex">
            <ul className="hidden sm:flex">
              <Link href="/">
                <li className="ml-10 uppercase hover:border-b text-xl">Home</li>
              </Link>
              <Link href="/blog">
                <li className="ml-10 uppercase hover:border-b text-xl">Blog</li>
              </Link>
              <Link href="/events">
                <li className="ml-10 uppercase hover:border-b text-xl">
                  Events
                </li>
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
              <Link href="/contact">
                <li className="ml-10 uppercase hover:border-b text-xl">
                  Contact Us
                </li>
              </Link>
              <Link href="/support">
                <li className="mx-10 uppercase hover:border-b text-xl">
                  Support Us
                </li>
              </Link>
            </ul>
          </div>
          <div onClick={handleNav} className="sm:hidden cursor-pointer pl-24">
            <AiOutlineMenu size={25} />
          </div>
        </div>
        <div
          className={
            menuOpen
              ? "fixed left-0 top-0 w-{65%} sm:hidden h-screen bg-[#FFFFFF] p-10 ease-in duration-450 bg-black"
              : "fixed left-[-100%] top-0 p-10 ease-in duration-450 bg-black"
          }
        >
          <div className="flex w-full items-center justify-end">
            <div onClick={handleNav} className="cursor-pointer">
              <AiOutlineClose size={25} />
            </div>
          </div>
          <div className="flex-col py-4">
            <ul>
              <Link href="/">
                <li
                  className="py-4 cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </li>
              </Link>
              <Link href="/blog">
                <li
                  className="py-4 cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  Blog
                </li>
              </Link>
              <Link href="/events">
                <li
                  className="py-4 cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  Events
                </li>
              </Link>
              {/* <Link href="/projects">
              <li className="py-4 cursor-pointer" onClick={() => setMenuOpen(false)}>
                Projects
              </li>
            </Link> */}
              <Link href="https://activeie.myshopify.com">
                <li
                  className="py-4 cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  Products
                </li>
              </Link>
              <Link href="/contact">
                <li
                  className="py-4 cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  Contact Us
                </li>
              </Link>
              <Link href="/support">
                <li
                  className="py-4 cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  Support Us
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
