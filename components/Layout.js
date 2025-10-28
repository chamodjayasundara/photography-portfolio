import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const categories = ["Architecture", "Product", "Food", "Lifestyle", "Travel"];

  // Transparent navbar that becomes solid on scroll
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside (desktop)
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  // Check if a path is active
  const isActivePath = (path) => router.pathname === path;
  const isActiveCategoryPath = () => router.pathname.startsWith('/categories');

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white overflow-x-hidden">
      {/* Navbar */}
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 border-none ${
          scrolled ? "bg-black/95 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <nav className="w-full flex justify-between items-center py-3 px-6 border-none max-w-full">
          <Link href="/" className="block" aria-label="Home">
            <Image
              src="/images/Chamod_Jayasundara_Logo.png"
              alt="Chamod Jayasundara logo"
              width={200}
              height={32}
              priority
              className={`h-16 w-auto md:h-20 transition ${scrolled ? "" : ""}`}
            />
          </Link>

          {/* Desktop Menu */}
          <div
            className={`hidden md:flex items-center space-x-8 font-medium ${
              scrolled ? "text-white" : "text-white"
            }`}
          >
            <Link 
              href="/projects" 
              className="hover:opacity-70 transition"
              style={isActivePath('/projects') ? { color: '#f15a24' } : {}}
            >
              Projects
            </Link>

            {/* Categories Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="hover:opacity-70 transition"
                style={isActiveCategoryPath() ? { color: '#f15a24' } : {}}
              >
                Categories
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 bg-white text-gray-700 border rounded-md shadow-lg w-44"
                  >
                    {categories.map((cat) => (
                      <Link
                        key={cat}
                        href={`/categories/${cat.toLowerCase()}`}
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {capitalizeFirstLetter(cat)}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              href="/contact" 
              className="hover:opacity-70 transition"
              style={isActivePath('/contact') ? { color: '#f15a24' } : {}}
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(true)}
              className="bg-black/50 backdrop-blur-sm p-2 rounded-lg"
            >
              <FiMenu
                size={28}
                className="text-white transition"
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Slide-In Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="fixed right-0 top-0 h-full w-72 bg-white shadow-2xl p-6 overflow-y-auto border-none"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end mb-8">
                <button onClick={() => setIsOpen(false)}>
                  <FiX size={28} />
                </button>
              </div>

              <nav className="flex flex-col space-y-3 text-gray-800 font-medium">
                <Link 
                  href="/projects" 
                  onClick={() => setIsOpen(false)}
                  style={isActivePath('/projects') ? { color: '#f15a24' } : {}}
                >
                  Projects
                </Link>

                <div>
                  <button
                    className="w-full text-left py-2 flex justify-between items-center"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    style={isActiveCategoryPath() ? { color: '#f15a24' } : {}}
                  >
                    Categories
                    <span className="ml-2">{dropdownOpen ? "▲" : "▼"}</span>
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        className="pl-4 mt-2 flex flex-col space-y-2"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {categories.map((cat) => (
                          <Link
                            key={cat}
                            href={`/categories/${cat.toLowerCase()}`}
                            onClick={() => {
                              setIsOpen(false);
                              setDropdownOpen(false);
                            }}
                            className="block py-1 hover:underline"
                          >
                            {capitalizeFirstLetter(cat)}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link 
                  href="/contact" 
                  onClick={() => setIsOpen(false)}
                  style={isActivePath('/contact') ? { color: '#f15a24' } : {}}
                >
                  Contact
                </Link>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-black text-gray-400 text-center py-8">
        <div className="container mx-auto px-6">
          <p className="text-sm tracking-wide">
            © {new Date().getFullYear()} Chamod Jayasundara Photography
          </p>
          <p className="text-xs mt-1">All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}