"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="text-2xl font-extrabold text-white tracking-tighter">
              MyShop<span className="text-indigo-500">.</span>
            </Link>
            <p className="text-sm max-w-xs leading-relaxed">
              Your ultimate destination for the latest gadgets, electronics, and tech accessories. Empowering your digital lifestyle.
            </p>
          </div>

          {/* Links & Newsletter */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Shop</h3>
                <ul className="mt-4 space-y-2">
                  <li><Link href="/Products" className="hover:text-white transition-colors text-sm">Laptops</Link></li>
                  <li><Link href="/Products" className="hover:text-white transition-colors text-sm">Smartphones</Link></li>
                  <li><Link href="/Products" className="hover:text-white transition-colors text-sm">Audio & Sound</Link></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-2">
                  <li><Link href="/Contact" className="hover:text-white transition-colors text-sm">Contact Us</Link></li>
                  <li><Link href="/FAQ" className="hover:text-white transition-colors text-sm">FAQs</Link></li>
                  <li><Link href="/Shipping" className="hover:text-white transition-colors text-sm">Track Order</Link></li>
                </ul>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Subscribe to our newsletter</h3>
              <p className="mt-4 text-sm text-gray-400">The latest tech updates and deals, sent to your inbox weekly.</p>
              <form className="mt-4 sm:flex sm:max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  required
                  className="w-full rounded-md border-0 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 text-sm sm:max-w-xs"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="mt-2 w-full sm:mt-0 sm:w-auto rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} MyShop Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs">
            <Link href="/Privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/Terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}