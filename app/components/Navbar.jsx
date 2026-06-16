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
ArrowDownLeftIcon
} from "@heroicons/react/24/outline";

// 1. المسارات المحظورة التي لا يظهر فيها الـ Navbar
const disabledNavbarRoutes = [
  "/dashboard",
  "/login",
  "/signUp",
  "/checkout",
  "/admin",
];

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
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // التحكم في قائمة الحساب المنسدلة
  const { scrollYProgress } = useScroll();

  // محاكاة بيانات المستخدم (قم بربطها بنظام الـ Auth الخاص بك لاحقاً)
  const [isLoggedIn, setIsLoggedIn] = useState(true); // غيرها لـ false لرؤية زر Get Started
  const [userName, setUserName] = useState("Ahmed");

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

  const shouldHideNavbar = disabledNavbarRoutes.some((route) =>
    pathname?.startsWith(route)
  );

  if (shouldHideNavbar) {
    return null;
  }

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

          {/* أيقونات الإجراءات وزر الـ Auth لسطح المكتب */}
          <div className="flex flex-1 justify-end items-center gap-1 sm:gap-3">
            
            {/* زر البحث المحتفظ به من تعديلاتك */}
            <button className="p-2 text-gray-700 hover:text-indigo-600 rounded-full hover:bg-gray-100/70 transition-colors">
              <MagnifyingGlassIcon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </button>

            {/* الجزء الديناميكي: بناءً على حالة تسجيل الدخول */}
            {isLoggedIn ? (
              <div className="relative hidden md:block">
                {/* اسم المستخدم كمشغل للقائمة المنسدلة */}
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-800 hover:text-indigo-600 transition-colors bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-xl border border-gray-200/60"
                >
                  <UserIcon className="h-4 w-4 text-indigo-600" />
                  <span>Hello, <span className="text-indigo-600">{userName}</span></span>
                </button>

                {/* القائمة المنسدلة للحساب */}
                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsProfileDropdownOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-20 p-1"
                      >
                        <Link
                          href="/Profile"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
                        >
                          <UserIcon className="h-4 w-4" /> My Profile
                        </Link>
                        <button
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            setIsLoggedIn(false); // تجربة تسجيل الخروج
                          }}
                          className="flex items-center gap-2 w-full text-left px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <ArrowDownLeftIcon className="h-4 w-4" /> Log Out
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link 
                href="/signUp" 
                className="hidden md:inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition-all shadow-md shadow-indigo-200 active:scale-95"
              >
                Get Started
              </Link>
            )}

            {/* زر قائمة الموبايل */}
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

                {/* روابط الملاحة العادية */}
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

              {/* أزرار أسفل قائمة الموبايل التفاعلية بناءً على الـ Auth */}
              <div className="pt-6 border-t border-gray-100 space-y-3">
                {isLoggedIn ? (
                  <>
                    <div className="px-3 py-2 text-sm font-medium text-gray-500">
                      Logged in as: <span className="font-bold text-gray-900">{userName}</span>
                    </div>
                    <Link
                      href="/Profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full rounded-xl border border-gray-200 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <UserIcon className="h-5 w-5 text-indigo-600" /> My Account
                    </Link>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsLoggedIn(false);
                      }}
                      className="flex items-center justify-center gap-2 w-full rounded-xl bg-red-50 text-red-600 py-3 text-sm font-bold hover:bg-red-100 transition-colors"
                    >
                      <ArrowDownLeftIcon className="h-5 w-5" /> Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/Profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full rounded-xl border border-gray-200 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <UserIcon className="h-5 w-5" /> My Account
                    </Link>
                    <Link
                      href="/signUp"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center w-full rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white hover:bg-indigo-500 shadow-lg shadow-indigo-100 transition-colors text-center"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}