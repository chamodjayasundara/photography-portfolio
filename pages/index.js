import { albums } from "@/data/albums";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col bg-[#fdfdfd] text-gray-900">
      {/* Hero Section */}
      <section
        className="h-screen bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
    >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Text Content */}
        <motion.div
          className="relative text-center text-white px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-semibold tracking-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Chamod Jayasundara
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-6 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Professional Luxury Resort & Villa Photographer
          </motion.p>

          <motion.a
            href="#featured"
            className="inline-block bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-all duration-300 shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            View Projects
          </motion.a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 text-white text-sm tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <span className="opacity-70">Scroll to explore ↓</span>
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section
        id="featured"
        className="py-24 px-6 container mx-auto"
      >
        <motion.h2
          className="text-3xl md:text-4xl font-semibold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Featured Projects
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {albums.map((album, i) => (
            <motion.div
              key={album.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            >
              <Link href={`/projects/${album.slug}`} passHref>
                <div className="group overflow-hidden rounded-2xl shadow-lg relative cursor-pointer">
                  <img
                    src={album.photos[0].src}
                    alt={album.title}
                    className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <h3 className="font-semibold text-lg">{album.title}</h3>
                    <p className="text-sm opacity-80">{album.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-6 bg-gray-50 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-semibold mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Explore Categories
        </motion.h2>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {["Architecture", "Product", "Food", "Lifestyle", "Travel"].map((cat) => (
            <Link
              key={cat}
              href={`/categories/${cat.toLowerCase()}`}
              className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all duration-300 font-medium"
            >
              {cat}
            </Link>
          ))}
        </motion.div>
      </section>
    </div>
  );
}