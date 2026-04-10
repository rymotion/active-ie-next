"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/logo.png";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="text-white z-[999] relative">
      <motion.nav 
        className={`fixed w-full h-24 shadow-xl z-[999] transition-colors duration-300 ${isScrolled ? "bg-black/70 backdrop-blur-md" : "bg-transparent"}`}
      >
        <div className="header-menu items-center h-full w-full px-4 2xl:px-16">
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
        {/* Backdrop for Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[998]"
              onClick={() => setMenuOpen(false)}
            />
          )}
        </AnimatePresence>
        
        {/* Sidebar Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed left-0 top-0 w-[80%] md:w-[60%] h-screen bg-black/95 backdrop-blur-xl p-10 z-[999] overflow-y-auto"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.x < -100 || velocity.x < -500) {
                  setMenuOpen(false);
                }
              }}
            >
              <div className="flex w-full items-center justify-between mb-8">
                <h2 className="text-xl font-bold">{t("nav.organizationName")}</h2>
                <div onClick={handleNav} className="cursor-pointer text-white">
                  <AiOutlineClose size={25} />
                </div>
              </div>
              
              <motion.ul
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                }}
                className="flex flex-col gap-6"
              >
                {[
                  { href: "/", label: t("nav.home") },
                  { href: "/blog", label: t("nav.blog") },
                  { href: "/events", label: t("nav.events") },
                  { href: "/projects", label: t("nav.projects") },
                  { href: "/products", label: t("nav.merch") },
                  { href: "/contact", label: t("nav.contactUs") },
                  { href: "/support", label: t("nav.supportUs") },
                ].map((link) => (
                  <motion.li
                    key={link.href}
                    variants={{
                      open: { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: -20 }
                    }}
                  >
                    <Link href={link.href} onClick={() => setMenuOpen(false)} className="text-2xl font-medium hover:text-red-500 transition-colors">
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
                
                <motion.li
                  variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: -20 }
                  }}
                  className="mt-4"
                >
                  <Link href="/addc" onClick={() => setMenuOpen(false)}>
                    <Image
                      src="https://cdn.shopify.com/s/files/1/0638/5536/2102/files/be-wave-sticker-band-aid-brand.png?v=1754035334"
                      alt="ADD"
                      width={150}
                      height={150}
                    />
                  </Link>
                </motion.li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
};

export default Navbar;
