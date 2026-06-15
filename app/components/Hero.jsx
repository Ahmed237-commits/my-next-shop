"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Premium Tech.",
    subtitle: "Elevate Your Digital Life",
    desc: "Unbox the future with our curated collection of elite gadgets and accessories. Next-day delivery, unboxed with care.",
    buttonText: "Explore Gear",
    image: "/undraw_morning-news_h9nz.svg",
    accentColor: "from-violet-600 to-fuchsia-500",
    bgLight: "from-violet-100/30 to-fuchsia-100/30",
  },
  {
    title: "Immersive Audio.",
    subtitle: "Feel Every Beat",
    desc: "Studio-grade noise cancellation. Wireless freedom. Discover sound that moves your soul.",
    buttonText: "Discover Sound",
    image: "/undraw_listening-to-podcasts_j0hm.svg",
    accentColor: "from-cyan-600 to-blue-500",
    bgLight: "from-cyan-100/30 to-blue-100/30",
  },
  {
    title: "Power & Performance.",
    subtitle: "Rule the Game",
    desc: "Dominate with next-gen processors and blistering displays. Gaming, streaming, creating — do it all flawlessly.",
    buttonText: "View Phones",
    image: "/undraw_talking-on-the-phone_lc9v.svg",
    accentColor: "from-orange-500 to-red-500",
    bgLight: "from-orange-100/30 to-red-100/30",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
<div className="relative isolate px-4 pt-20 sm:pt-24 sm:px-6 lg:px-8 min-h-[85vh] flex items-center overflow-hidden">      {/* خلفية ديناميكية */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].bgLight}`}
        />
      </div>

      <div className="mx-auto max-w-7xl w-full py-12 sm:py-16 lg:py-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* المحتوى النصي */}
            <div className="text-center lg:text-left z-10">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`inline-block bg-gradient-to-r ${slides[currentSlide].accentColor} text-transparent bg-clip-text text-sm font-bold tracking-widest uppercase mb-4`}
              >
                {slides[currentSlide].subtitle}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl font-black tracking-tight text-gray-900 sm:text-6xl lg:text-7xl leading-[1.1]"
              >
                {slides[currentSlide].title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 max-w-md mx-auto lg:mx-0 text-lg text-gray-600 leading-relaxed"
              >
                {slides[currentSlide].desc}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-5"
              >
                <Link
                  href="/Products"
                  className={`group inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${slides[currentSlide].accentColor} px-8 py-4 text-sm font-bold text-white shadow-lg shadow-gray-400/20 transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                >
                  {slides[currentSlide].buttonText}
                  <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1.5" />
                </Link>
                <button className="inline-flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-violet-600 transition-colors">
                  <PlayCircleIcon className="h-5 w-5" /> Watch Demo
                </button>
              </motion.div>
            </div>

            {/* الصورة */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className={`absolute -inset-4 rounded-3xl bg-gradient-to-r ${slides[currentSlide].accentColor} opacity-10 blur-3xl`} />
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="relative flex justify-center drop-shadow-2xl"
              >
                <Image
                  src={slides[currentSlide].image}
                  alt="Hero Illustration"
                  width={600}
                  height={600}
                  className="h-auto w-full max-h-[500px] object-contain"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* نقاط التنقل */}
        <div className="mt-16 flex justify-center lg:justify-start gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "w-10 bg-violet-600"
                  : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}