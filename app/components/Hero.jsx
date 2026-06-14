"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
// داتا السلايدات: كل سلايد ليه كلامه، ألوانه، والصورة الـ Illustration الخاصة بيه
const slides = [
  {
    title: "Next-Gen Tech, Delivered to You.",
    desc: "Upgrade your lifestyle with our premium selection of electronics. Smart devices, cutting-edge laptops, and accessories.",
    buttonText: "Explore Gear",
    image: "/undraw_morning-news_h9nz.svg", // حط هنا أول صورة إلكترونيات عندك
    bgGradient: "from-[#ff80b5] to-[#9089fc]"
  },
  {
    title: "Unmatched Sound Experience.",
    desc: "Immerse yourself in pure audio with our new collection of noise-canceling headphones and wireless earbuds.",
    buttonText: "Discover Sound",
    image:   "/undraw_listening-to-podcasts_j0hm.svg"
, // تقدر تغيرها لصورة سماعة أو تسيب نفس الـ SVG مؤقتاً
    bgGradient: "from-[#80eedd] to-[#9089fc]"
  },
  {
    title: "Power In Your Hands.",
    desc: "Stay ahead of the curve with latest flagship smartphones and smartwatches designed for the future.",
    buttonText: "View Phones",
    image: "/undraw_talking-on-the-phone_lc9v.svg", // تقدر تغيرها لصورة موبايل
    bgGradient: "from-[#ffb580] to-[#e63946]"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // لوجيك تغيير السلايد أوتوماتيكياً كل 4 ثواني
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative isolate px-4 pt-24 sm:px-6 lg:px-8 min-h-[85vh] flex items-center overflow-hidden">
      
      {/* الـ Background Gradient المتغير ديناميكياً مع السلايد */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <motion.div 
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr ${slides[currentSlide].bgGradient} sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]`} 
        />
      </div>

      <div className="mx-auto max-w-7xl w-full py-12 sm:py-16 lg:py-20">
        {/* استخدام AnimatePresence عشان لما العناصر تتغير تختفي وتظهر بنعومة */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16"
          >
            
            {/* الجزء النصي المتغير */}
            <div className="flex-1 text-center lg:text-left z-10">
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl lg:text-6xl"
              >
                {slides[currentSlide].title}
              </motion.h1>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 lg:mx-0"
              >
                {slides[currentSlide].desc}
              </motion.p>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start"
              >
                <Link
                  href="/Products"
                  className="group inline-flex items-center gap-2 rounded-full bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-250 transition-all duration-300 hover:scale-105 hover:bg-indigo-700"
                >
                  {slides[currentSlide].buttonText}
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            {/* الجزء البصري (الصورة المتغيرة مع حركة عومان خفيفة) */}
            <div className="flex-1 w-full max-w-md lg:max-w-none">
              <div className="relative mx-auto">
                {/* توهج خلفي ملون */}
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-10 blur-3xl" />
                
                <motion.div 
                  animate={{ y: [0, -12, 0] }} 
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="relative flex justify-center"
                >
                  <Image
                    src={slides[currentSlide].image} 
                    alt="Store Showcase"
                    width={550}
                    height={550}
                    className="h-auto w-full max-h-[450px] object-contain drop-shadow-3xl"
                    priority
                  />
                </motion.div>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

        {/* مؤشرات السلايدر السفلية (Dots) - متوافقة وممتازة للموبايل */}
        <div className="mt-12 flex justify-center lg:justify-start gap-2.5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? "w-8 bg-indigo-600" : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}