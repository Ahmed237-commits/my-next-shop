import Link from 'next/link';

export default function Footer() {
  return (
     <footer className="bg-gray-900 pt-16">
        <div className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand Column */}
            <div>
              <h3 className="text-2xl font-bold text-white">
                My<span className="text-indigo-400">Shop</span>
              </h3>
              <p className="mt-4 text-sm leading-6 text-gray-400">
                Elevating your shopping experience with quality products and exceptional service.
              </p>
              <div className="mt-6 flex space-x-4">
                {["facebook", "twitter", "instagram"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="rounded-full bg-gray-800 p-2 text-gray-400 transition-colors hover:bg-indigo-600 hover:text-white"
                  >
                    <span className="sr-only">{social}</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h4>
              <ul className="mt-4 space-y-3">
                {["Products", "About Us", "Contact", "FAQs"].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase().replace(/\s/g, "")}`} className="text-sm text-gray-400 transition-colors hover:text-indigo-400">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Support</h4>
              <ul className="mt-4 space-y-3">
                {["Help Center", "Returns", "Shipping", "Size Guide"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-gray-400 transition-colors hover:text-indigo-400">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Newsletter</h4>
              <p className="mt-4 text-sm text-gray-400">Subscribe for exclusive offers and updates.</p>
              <form className="mt-4 flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full min-w-0 flex-auto rounded-l-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
                <button
                  type="submit"
                  className="flex-none rounded-r-md bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 border-t border-white/10 pt-8">
            <p className="text-center text-xs text-gray-400">
              &copy; {new Date().getFullYear()} MyShop. All rights reserved. Crafted with ❤️ for better shopping.
            </p>
          </div>
        </div>
      </footer>
  );
};