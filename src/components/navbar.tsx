"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/logo.png";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./language-switcher";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations("nav");

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-black text-white">
      <nav className="fixed w-full h-24 shadow-xl bg-black z-40">
        <div className="header-menu items-center h-full w-full px-4 2xl:px-16 bg-black">
          <button onClick={handleNav} aria-label="Open menu">
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
            <h2 className="text-2xl font-bold">{t("organizationName")}</h2>
          </Link>
        </div>
        
        {/* Backdrop overlay */}
        {menuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleNav}
            aria-hidden="true"
          />
        )}
        
        {/* Sidebar menu */}
        <div
          className={
            menuOpen
              ? "fixed left-0 top-0 w-[65%] sm:w-[40%] md:w-[30%] h-screen bg-black p-10 ease-in duration-450 overflow-y-auto z-50 shadow-2xl"
              : "fixed left-[-100%] top-0 p-10 ease-in duration-450 bg-black z-50"
          }
        >
          <div className="flex w-full items-center justify-end mb-6">
            <div onClick={handleNav} className="cursor-pointer">
              <AiOutlineClose size={25} />
            </div>
          </div>
          <div className="flex-col py-4 overflow-y-auto max-h-[calc(100vh-120px)]">
            <ul className="space-y-2">
              <Link href="/">
                <li
                  className="py-4 px-2 cursor-pointer hover:bg-gray-800 rounded transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {t("home")}
                </li>
              </Link>
              <Link href="/blog">
                <li
                  className="py-4 px-2 cursor-pointer hover:bg-gray-800 rounded transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {t("blog")}
                </li>
              </Link>
              <Link href="/events">
                <li
                  className="py-4 px-2 cursor-pointer hover:bg-gray-800 rounded transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {t("events")}
                </li>
              </Link>
              <Link href="/projects">
                <li
                  className="py-4 px-2 cursor-pointer hover:bg-gray-800 rounded transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {t("projects")}
                </li>
              </Link>
              <Link href="/products">
                <li
                  className="py-4 px-2 cursor-pointer hover:bg-gray-800 rounded transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {t("merch")}
                </li>
              </Link>
              <Link href="/contact">
                <li
                  className="py-4 px-2 cursor-pointer hover:bg-gray-800 rounded transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {t("contactUs")}
                </li>
              </Link>
              <Link href="/support">
                <li
                  className="py-4 px-2 cursor-pointer hover:bg-gray-800 rounded transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {t("supportUs")}
                </li>
              </Link>
              <Link href="/addc">
                <li
                  className="py-4 px-2 cursor-pointer hover:bg-gray-800 rounded transition-colors"
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
              <li className="pt-6 mt-6 border-t border-gray-700">
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-gray-400 uppercase tracking-wide">Language</span>
                  <LanguageSwitcher />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
