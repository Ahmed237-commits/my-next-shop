"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import {
  ShoppingCartIcon,
  UserIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/Products" },
  { name: "About", href: "/About" },
  { name: "Contact", href: "/Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* شريط العروض العلوي */}
      <div className="fixed top-0 z-50 w-full bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white text-[10px] sm:text-xs py-1.5 overflow-hidden border-b border-white/10 hidden sm:block">
        <motion.div
          animate={{ x: ["100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="whitespace-nowrap flex items-center gap-8 font-medium tracking-wide"
        >
          <span className="flex items-center gap-1">
            <SparklesIcon className="h-3 w-3 text-yellow-400" /> FLASH SALE: 25% OFF ON ALL LAPTOPS USE CODE: TECH25
          </span>
          <span>⚡ FREE SHIPPING ON ORDERS OVER $150</span>
          <span className="flex items-center gap-1">
            <SparklesIcon className="h-3 w-3 text-yellow-400" /> NEW APPLE MACBOOKS NOW IN STOCK
          </span>
        </motion.div>
      </div>

      {/* الهيدر الرئيسي */}
      <motion.header
        className={`fixed z-50 w-full transition-all duration-500 ${
          isScrolled
            ? "top-0 bg-white/95 backdrop-blur-2xl border-b border-gray-200/40 shadow-lg shadow-gray-150/20 py-2"
            : "top-0 sm:top-7 bg-transparent py-3"
        }`}
      >
        {/* خط التقدم النيون */}
        {isScrolled && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left"
            style={{ scaleX: scrollYProgress }}
          />
        )}

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="group text-xl sm:text-2xl font-black text-gray-900 tracking-tighter">
              My<span className="text-indigo-600 transition-colors group-hover:text-indigo-500">Shop</span>
              <span className="text-indigo-600">.</span>
            </Link>
          </div>

          {/* روابط سطح المكتب */}
          <nav className="hidden lg:flex lg:gap-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-[13px] font-bold transition-colors ${
                  isActive(link.href) ? "text-indigo-600" : "text-gray-800 hover:text-indigo-600"
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="navbar-active"
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-indigo-600 rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* أيقونات الإجراءات */}
          <div className="flex flex-1 justify-end items-center gap-0.5 sm:gap-2">
            <button className="p-2 text-gray-700 hover:text-indigo-600 rounded-full hover:bg-gray-100/70 transition-colors">
              <MagnifyingGlassIcon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </button>
            <Link href="/Profile" className="hidden sm:inline-block p-2 text-gray-700 hover:text-indigo-600 rounded-full hover:bg-gray-100/70 transition-colors">
              <UserIcon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </Link>
            <Link href="/Cart" className="p-2 text-gray-700 hover:text-indigo-600 rounded-full hover:bg-gray-100/70 transition-all relative group">
              <ShoppingCartIcon className="h-4.5 w-4.5 sm:h-5 sm:w-5 group-hover:scale-105 transition-transform" />
              <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5 sm:h-4 sm:w-4 items-center justify-center rounded-full bg-indigo-600 text-[9px] sm:text-[10px] font-bold text-white shadow-md shadow-indigo-300">
                3
              </span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-gray-800 lg:hidden rounded-full hover:bg-gray-100/70 transition-colors"
            >
              <Bars3Icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* قائمة الموبايل */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-md lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white p-6 shadow-2xl lg:hidden flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                  <span className="text-xl font-black text-gray-950">Navigation</span>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-50">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="mt-6 space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block text-base font-bold p-3 rounded-xl transition-colors ${
                        isActive(link.href)
                          ? "text-indigo-600 bg-indigo-50"
                          : "text-gray-950 hover:bg-gray-50"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <Link
                  href="/Profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full rounded-xl border border-gray-200 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <UserIcon className="h-5 w-5" /> My Account
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}