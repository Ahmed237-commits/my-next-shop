"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { 
  ShoppingCartIcon, 
  UserIcon, 
  ChevronDownIcon, 
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

const categories = [
  { name: "Laptops & PC", href: "/Products/laptops", desc: "Gaming rigs, MacBooks & Workstations", icon: "💻" },
  { name: "Smartphones", href: "/Products/phones", desc: "Latest flagship iOS & Android devices", icon: "📱" },
  { name: "Audio & Sound", href: "/Products/audio", desc: "Noise cancelling headphones & speakers", icon: "🎧" },
  { name: "Accessories", href: "/Products/accessories", desc: "Premium chargers & mechanical keyboards", icon: "🔌" },
];

export default function Navbar() {
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // تتبع السكرول عشان خط التقدم الـ Neon
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* 1. شريط العروض المتحرك الفاخر (Top Ticker Banner) */}
      <div className="fixed top-0 z-50 w-full bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white text-xs py-2 overflow-hidden border-b border-white/10 hidden sm:block">
        <motion.div 
          animate={{ x: ["100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="whitespace-nowrap flex items-center gap-8 font-medium tracking-wide"
        >
          <span className="flex items-center gap-1"><SparklesIcon className="h-3.5 w-3.5 text-yellow-400" /> FLASH SALE: 25% OFF ON ALL LAPTOPS USE CODE: TECH25</span>
          <span>⚡ FREE SHIPPING ON ORDERS OVER $150</span>
          <span className="flex items-center gap-1"><SparklesIcon className="h-3.5 w-3.5 text-yellow-400" /> NEW APPLE MACBOOKS NOW IN STOCK</span>
        </motion.div>
      </div>

      {/* 2. الهيدر الرئيسي المتفاعل مع السكرول */}
      <motion.header 
        className={`fixed z-50 w-full transition-all duration-500 ${
          isScrolled 
            ? "top-0 bg-white/70 backdrop-blur-2xl border-b border-gray-200/40 shadow-lg shadow-gray-150/20 py-3" 
            : "top-0 sm:top-8 bg-transparent py-6"
        }`}
      >
        {/* خط التقدم النيون (Scroll Progress Bar) - بيظهر بس لما العميل ينزل في الصفحة */}
        {isScrolled && (
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left"
            style={{ scaleX: scrollYProgress }}
          />
        )}

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="group text-2xl font-black text-gray-900 tracking-tighter">
              My<span className="text-indigo-600 transition-colors group-hover:text-indigo-500">Shop</span>
              <span className="text-indigo-600">.</span>
            </Link>
          </div>

          {/* Navigation links (Desktop) */}
          <nav className="hidden lg:flex lg:gap-x-10 items-center">
            <Link href="/" className="text-sm font-bold text-gray-800 hover:text-indigo-600 transition-colors">
              Home
            </Link>

            {/* Mega Dropdown Triger */}
            <div 
              className="relative py-2"
              onMouseEnter={() => setIsDesktopMenuOpen(true)}
              onMouseLeave={() => setIsDesktopMenuOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-bold text-gray-800 hover:text-indigo-600 transition-colors outline-none">
                Categories
                <ChevronDownIcon className={`h-3.5 w-3.5 transition-transform duration-300 ${isDesktopMenuOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isDesktopMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[520px] rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-black/5 border border-gray-100/80 grid grid-cols-2 gap-3"
                  >
                    {categories.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex gap-4 rounded-xl p-3 transition-all duration-200 hover:bg-indigo-55/40 hover:scale-[1.02] group/item"
                      >
                        <span className="text-3xl p-2 bg-gray-50 rounded-lg group-hover/item:bg-white transition-colors">{item.icon}</span>
                        <div>
                          <p className="text-sm font-bold text-gray-950 group-hover/item:text-indigo-600 transition-colors">
                            {item.name}
                          </p>
                          <p className="mt-1 text-xs text-gray-500 leading-normal">
                            {item.desc}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/Products" className="text-sm font-bold text-gray-800 hover:text-indigo-600 transition-colors">
              All Products
            </Link>
            <Link href="/About" className="text-sm font-bold text-gray-800 hover:text-indigo-600 transition-colors">
              About
            </Link>
          </nav>

          {/* Actions Icons */}
          <div className="flex flex-1 justify-end items-center gap-1 sm:gap-3">
            <button className="p-2.5 text-gray-700 hover:text-indigo-600 rounded-full hover:bg-gray-100/70 transition-colors">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>

            <Link href="/Profile" className="hidden sm:inline-block p-2.5 text-gray-700 hover:text-indigo-600 rounded-full hover:bg-gray-100/70 transition-colors">
              <UserIcon className="h-5 w-5" />
            </Link>

            <Link href="/Cart" className="p-2.5 text-gray-700 hover:text-indigo-600 rounded-full hover:bg-gray-100/70 transition-all relative group">
              <ShoppingCartIcon className="h-5 w-5 group-hover:scale-105 transition-transform" />
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white shadow-md shadow-indigo-300">
                3
              </span>
            </Link>

            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2.5 text-gray-800 lg:hidden rounded-full hover:bg-gray-100/70 transition-colors"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* 3. الـ Mobile Drawer (متوافق 100% مع الموبايل وشاشات اللمس) */}
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

                <div className="mt-6 space-y-4">
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-bold text-gray-950 p-3 hover:bg-gray-50 rounded-xl transition-colors">Home</Link>
                  <Link href="/Products" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-bold text-gray-950 p-3 hover:bg-gray-50 rounded-xl transition-colors">All Products</Link>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <p className="px-3 text-xs font-bold uppercase tracking-wider text-gray-400">Categories</p>
                    <div className="mt-2 grid grid-cols-1 gap-1">
                      {categories.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 rounded-xl p-3 hover:bg-indigo-50/40 active:bg-indigo-50 transition-colors"
                        >
                          <span className="text-2xl">{item.icon}</span>
                          <span className="text-sm font-semibold text-gray-700">{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
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