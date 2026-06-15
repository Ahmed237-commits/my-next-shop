"use client";
import { motion } from "framer-motion";
import {
  ShieldCheckIcon,
  PhoneIcon,
  TruckIcon,
  LockClosedIcon,
  ArrowPathIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    title: "2-Year Warranty",
    desc: "Full coverage on all hardware and devices, no questions asked.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Support 24/7",
    desc: "Expert engineers ready to help you anytime, day or night.",
    icon: PhoneIcon,
  },
  {
    title: "Free & Fast Delivery",
    desc: "Free shipping on all orders over $150. Delivered in 2-3 days.",
    icon: TruckIcon,
  },
  {
    title: "Secure Checkout",
    desc: "100% encrypted and protected payment process.",
    icon: LockClosedIcon,
  },
  {
    title: "Easy Returns",
    desc: "30-day money-back guarantee, no questions asked.",
    icon: ArrowPathIcon,
  },
  {
    title: "Trade-In Program",
    desc: "Swap your old devices for credit towards new gear.",
    icon: DevicePhoneMobileIcon,
  },
];

export default function Features() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <span className="text-[#B88E2F] font-semibold text-sm tracking-widest uppercase">
            Why Choose Us
          </span>
          <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-[#0F172A] tracking-tight">
            Built for Your Satisfaction
          </h2>
          <p className="mt-5 text-gray-500 text-lg leading-relaxed">
            We prioritize quality, service, and trust. Every product we sell meets our rigorous standards.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group border border-gray-100 rounded-2xl p-8 hover:border-[#B88E2F]/30 hover:shadow-md transition-all duration-300 bg-white"
            >
              <div className="w-14 h-14 bg-[#FFF9F0] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#B88E2F] transition-colors duration-300">
                <feature.icon className="h-7 w-7 text-[#B88E2F] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-[15px]">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}