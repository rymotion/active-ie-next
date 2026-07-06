"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Logo from "../assets/logo.png";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { useTranslations } from "next-intl";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations();

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-black text-white">
      <nav className="fixed w-full h-24 shadow-xl bg-black">
        <div className="header-menu items-center h-full w-full px-4 2xl:px-16 bg-black">
          <button onClick={handleNav}>
            <AiOutlineMenu size={25} />
          </button>
          <Link href="/" className="flex flex-row items-center">
            <Image
              src={Logo}
              alt="Logo"
              width="100"
              height="100"
              className="cursor-pointer"
              priority
            />
            <h2 className="text-2xl font-bold">{t("nav.organizationName")}</h2>
          </Link>
        </div>
        {/* <NavMenu /> */}
        <div
          className={
            menuOpen
              ? "fixed left-0 top-0 w-[65%] h-screen bg-[#FFFFFF] p-10 ease-in duration-500 bg-black"
              : "fixed left-[-100%] top-0 p-10 ease-in duration-500 bg-black"
          }
        >
          <div className="flex w-full items-center justify-center">
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
                  {t("nav.home")}
                </li>
              </Link>
              <Link href="/blog">
                <li
                  className="py-4 cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  {t("nav.blog")}
                </li>
              </Link>
              <Link href="/events">
                <li
                  className="py-4 cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  {t("nav.events")}
                </li>
              </Link>
              <Link href="/projects">
                <li
                  className="py-4 cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  {t("nav.projects")}
                </li>
              </Link>
              <Link href="/products">
                <li
                  className="py-4 cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  {t("nav.merch")}
                </li>
              </Link>
              <Link href="/contact">
                <li
                  className="py-4 cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  {t("nav.contactUs")}
                </li>
              </Link>
              <Link href="/support">
                <li
                  className="py-4 cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  {t("nav.supportUs")}
                </li>
              </Link>
              <Link href="/addc">
                <li
                  className="py-4 cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  <Image
                    src={
                      "https://cdn.shopify.com/s/files/1/0638/5536/2102/files/be-wave-sticker-band-aid-brand.png?v=1754035334"
                    }
                    alt="ADD"
                    width={200}
                    height={200}
                  />
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
