import { albums } from "@/data/albums";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section
        className="h-screen bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      >
        <div className="bg-black/40 absolute inset-0"></div>
        <div className="relative text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Chamod Jayasundara
          </h1>
          <p className="text-xl md:text-2xl mb-6">Professional Luxury Resort & Villa Photography</p>
          <a
            href="#featured"
            className="inline-block bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-200 transition"
          >
            View Projects
          </a>
        </div>
      </section>

      {/* Featured Projects */}
       <section id="featured" className="py-16 px-4 container mx-auto">
        <h2 className="text-3xl font-semibold mb-8 text-center">Featured Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {albums.map(album => (
            <Link key={album.slug} href={`/projects/${album.slug}`} passHref>
              <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition cursor-pointer">
                <img
                  src={album.photos[0].src}
                  alt={album.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-lg">{album.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{album.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-gray-50">
        <h2 className="text-3xl font-semibold mb-8 text-center">Explore Categories</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {["Architecture", "Product", "Food", "Lifestyle", "Travel"].map(cat => (
            <a
              key={cat}
              href={`/categories/${cat.toLowerCase()}`}
              className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
            >
              {cat}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}