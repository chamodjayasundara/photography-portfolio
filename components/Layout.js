import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header / Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <nav className="container mx-auto flex justify-between items-center py-4 px-6">
          <Link href="/" className="text-xl font-bold text-gray-800">
            CJ Photography
          </Link>
          <div className="space-x-6 text-gray-700 font-medium">
            <Link href="/projects">Projects</Link>
            <div className="inline-block relative group">
              <span className="cursor-pointer">Categories</span>
              <div className="absolute hidden group-hover:block bg-white border mt-2 py-2 shadow-lg">
                <Link href="/categories/architecture" className="block px-4 py-1 hover:bg-gray-100">Architecture</Link>
                <Link href="/categories/product" className="block px-4 py-1 hover:bg-gray-100">Product</Link>
                <Link href="/categories/food" className="block px-4 py-1 hover:bg-gray-100">Food</Link>
                <Link href="/categories/lifestyle" className="block px-4 py-1 hover:bg-gray-100">Lifestyle</Link>
                <Link href="/categories/travel" className="block px-4 py-1 hover:bg-gray-100">Travel</Link>
              </div>
            </div>
            <Link href="/contact">Contact Us</Link>
          </div>
        </nav>
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