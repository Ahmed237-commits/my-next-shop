'use client'

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRightIcon } from "@heroicons/react/24/outline";
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/Products' },
  { name: 'About', href: '/About' },
  { name: 'Contact', href: '/Contact' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
  const pathname = usePathname();

  return (
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-white/70 backdrop-blur-xl backdrop-saturate-150 transition-all duration-300">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900">
            My<span className="text-indigo-600">Shop</span>
          </Link>

          {/* Desktop Navigation */}
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                pathname === item.href ? 'text-indigo-600' : 'text-gray-700'
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* CTA Button */}
          <div className="hidden lg:flex">
            <Link
              href="/Products"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-300"
            >
              Shop Now
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </nav>
      </header>
  )
}
