"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Package } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm">
      <div className="px-6 lg:px-10 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 2xl:px-0  py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Package className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">OTrack</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Beranda
            </Link>
            {/* <Link href="#features" className="text-gray-700 hover:text-blue-600 font-medium">
              Fitur
            </Link> */}
            <Link href="#how-it-works" className="text-gray-700 hover:text-blue-600 font-medium">
              Cara Kerja
            </Link>
            <Link href="#contact" className="text-gray-700 hover:text-blue-600 font-medium">
              Kontak
            </Link>
            <Link
              href="/signin"
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-colors flex items-center justify-center"
              title="Admin Dashboard"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-lock"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span className="sr-only">Admin Dashboard</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col space-y-4 pb-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Beranda
            </Link>
            {/* <Link
              href="#features"
              className="text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Fitur
            </Link> */}
            <Link
              href="#how-it-works"
              className="text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Cara Kerja
            </Link>
            <Link
              href="#contact"
              className="text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Kontak
            </Link>
            <Link
              href="/signin"
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-colors inline-flex items-center justify-center w-10 h-10"
              onClick={() => setIsMenuOpen(false)}
              title="Admin Dashboard"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-lock"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span className="sr-only">Admin Dashboard</span>
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
