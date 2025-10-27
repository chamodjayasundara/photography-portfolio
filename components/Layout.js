import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Hamburger & close icons
import { motion, AnimatePresence } from "framer-motion"; // For smooth animation

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false); // Mobile side menu
  const [dropdownOpen, setDropdownOpen] = useState(false); // Categories dropdown
  const dropdownRef = useRef(null);

  const categories = ["Architecture", "Product", "Food", "Lifestyle", "Travel"];

  // Capitalize first letter helper
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <nav className="container mx-auto flex justify-between items-center py-4 px-6">
          <Link href="/" className="text-xl font-bold text-gray-800">
            CJ Photography
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
            <Link href="/projects">Projects</Link>

            {/* Desktop Categories Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="cursor-pointer"
              >
                Categories
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white border py-2 shadow-lg w-40">
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/categories/${cat.toLowerCase()}`}
                      className="block px-4 py-1 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {capitalizeFirstLetter(cat)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/contact">Contact Us</Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(true)}>
              <FiMenu size={28} />
            </button>
          </div>
        </nav>

        {/* Mobile Side Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/50"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg p-6 overflow-y-auto"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
              >
                <div className="flex justify-end mb-8">
                  <button onClick={() => setIsOpen(false)}>
                    <FiX size={28} />
                  </button>
                </div>

                <nav className="flex flex-col text-gray-700 font-medium">
                  <Link
                    href="/projects"
                    onClick={() => setIsOpen(false)}
                    className="py-2"
                  >
                    Projects
                  </Link>

                  {/* Mobile Categories Dropdown */}
                  <div className="flex flex-col">
                    <button
                      className="w-full text-left py-2 flex justify-between items-center"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      Categories
                      <span className="ml-2">{dropdownOpen ? "▲" : "▼"}</span>
                    </button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          className="flex flex-col pl-4 mt-2 space-y-1"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {categories.map((cat) => (
                            <Link
                              key={cat}
                              href={`/categories/${cat.toLowerCase()}`}
                              className="py-1 hover:bg-gray-100"
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
                    className="py-2"
                  >
                    Contact Us
                  </Link>
                </nav>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-6 mt-10">
        © {new Date().getFullYear()} Chamod Jayasundara Photography. All rights reserved.
      </footer>
    </div>
  );
}