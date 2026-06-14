"use client";
import { motion } from "framer-motion";

const features = [
  { title: "2-Year Warranty", desc: "Full coverage on all hardware and devices", icon: "🛡️" },
  { title: "Tech Support 24/7", desc: "Expert engineers ready to help anytime", icon: "👨‍💻" },
  { title: "Fast & Free Delivery", desc: "Free shipping on orders over $150", icon: "🚚" },
  { title: "Secure Checkout", desc: "100% protected and encrypted payments", icon: "🔒" },
  { title: "Hassle-Free Returns", desc: "30 days money-back guarantee policy", icon: "🔄" },
  { title: "Trade-In Program", desc: "Upgrade your old tech for brand new gear", icon: "📱" },
];

export default function Features() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Why Shop With Us?
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          We combine premium quality tech with world-class customer service to give you the ultimate shopping experience.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-indigo-100"
          >
            <div className="text-4xl transition-transform duration-300 group-hover:scale-110 inline-block">
              {feature.icon}
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-900">{feature.title}</h3>
            <p className="mt-2 text-gray-600 leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}