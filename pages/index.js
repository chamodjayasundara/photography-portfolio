import { albums } from "@/data/albums";
import Link from "next/link";
import { motion } from "framer-motion";
import BrandsCarousel from "@/components/BrandsCarousel";

export default function Home() {
  return (
    <div className="flex flex-col bg-[#fdfdfd] text-gray-900">
      {/* Hero Section */}
      <section className="hero-section h-screen relative overflow-hidden">
        {/* Background image */}
        <img
          src="/images/hero.jpg"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 hero-overlay"></div>

  {/* Top-right paragraph (moved further down to avoid covering face) */}
  <div className="absolute top-36 md:top-48 right-8 text-right flex flex-col items-end gap-6">
          <p className="hero-top-right text-white/85 max-w-xs text-xs md:text-sm leading-snug">
            I BRING SPACES, EXPERIENCES, AND MOMENTS TO LIFE THROUGH PHOTOGRAPHY, 
            SPECIALIZING IN VILLAS, RESORTS, AND LIFESTYLE VISUALS 
            THAT SPEAK FOR THEMSELVES.

          </p>
        </div>

        {/* Large left-aligned name and subtitle */}
        <motion.div
          className="absolute left-1/2 md:left-14 top-[72%] md:top-[70%] transform -translate-x-1/2 md:translate-x-0 -translate-y-1/2 text-center md:text-left z-10"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="hero-title-big leading-tight text-cream">CHAMOD<br/><span className="hero-last">JAYASUNDARA</span></h1>
          <div className="hero-subtitle mt-6 text-cream">PHOTOGRAPHY</div>
        </motion.div>

        {/* Bottom divider and scroll hint (removed 'WORK WITH ME') */}
        <div className="absolute bottom-6 left-6 right-6 z-10">
          <div className="hero-divider-line"></div>

          <div className="flex items-center justify-start mt-4 px-2 text-white text-xs">
            <div className="flex items-center gap-3">
              <span className="opacity-80">↓ SCROLL TO EXPLORE</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section (I am...) */}
      <section
        id="about"
        className="min-h-[70vh] bg-black text-white flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-24"
      >
        <motion.div
          className="md:w-1/2 text-6xl md:text-7xl font-light text-[#f15a24] mb-10 md:mb-0 md:pr-12"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          I am...
        </motion.div>

        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="text-lg md:text-xl font-light leading-relaxed mb-10">
            a photographer specialized in architecture and lifestyle imagery, with a strong focus on hospitality. From villas and resorts to food, products, and everyday moments, my work captures spaces and stories with detail and atmosphere.
          </p>
          
        </motion.div>
      </section>

      {/* Brands Carousel */}
      <BrandsCarousel />

      {/* Featured Projects */}
      <section id="featured" className="relative min-h-screen bg-black py-32 px-6">
        {/* Animated title that slides up */}
        <motion.div
          className="relative z-10 mb-24"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-light text-center text-white">
            Featured <span style={{ color: '#f15a24' }}>Projects</span>
          </h2>
        </motion.div>

        {/* Albums that scroll up two at a time side by side */}
        <div className="relative z-10 container mx-auto max-w-7xl space-y-12">
          {albums.slice(0, 4).reduce((rows, album, i) => {
            if (i % 2 === 0) rows.push([album]);
            else rows[rows.length - 1].push(album);
            return rows;
          }, []).map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {row.map((album, colIndex) => (
                <motion.div
                  key={album.slug}
                  initial={{ opacity: 0, x: colIndex === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: colIndex * 0.2 }}
                >
                  <Link href={`/projects/${album.slug}`} passHref>
                    <div className="group overflow-hidden rounded-2xl shadow-2xl relative cursor-pointer">
                      <img
                        src={album.photos[0].src}
                        alt={album.title}
                        className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-8 left-8 right-8 text-white">
                        <h3 className="font-semibold text-2xl mb-2">{album.title}</h3>
                        <p className="text-sm opacity-90">{album.description}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <motion.div
          className="relative z-10 mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Link href="/projects">
            <button className="bg-[#f15a24] text-white px-10 py-4 rounded-full hover:bg-[#d14b1a] transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl">
              View All Projects
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="min-h-[70vh] py-32 px-6 bg-gray-50 text-center flex flex-col justify-center">
        <motion.h2
          className="text-4xl md:text-5xl font-light text-center text-gray-800 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Explore <span style={{ color: '#f15a24' }}>Categories</span>
        </motion.h2>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {["Architecture", "Product", "Food", "Lifestyle", "Travel"].map(
            (cat) => (
              <Link
                key={cat}
                href={`/categories/${cat.toLowerCase()}`}
                className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all duration-300 font-medium"
              >
                {cat}
              </Link>
            )
          )}
        </motion.div>
      </section>
    </div>
  );
}