import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { albums } from "@/data/albums";
import dynamic from "next/dynamic";

const SEO = dynamic(() => import("@/components/SEO"), { ssr: true });

const CATEGORIES = ["All", "Properties", "Travel", "Product", "Lifestyle", "Food"];

export default function Projects() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = [...albums];

    if (activeCat !== "All") {
      list = list.filter((a) => a.albumCategory === activeCat);
    }

    if (q) {
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q)
      );
    }

    return list;
  }, [query, activeCat]);

  return (
    <>
      <SEO
        title="Projects - Photography Portfolio"
        description="Browse the complete portfolio of Chamod Jayasundara. View luxury property photography projects including hotels, resorts, villas, and commercial spaces in Sri Lanka and worldwide."
        url="https://chamodjayasundaraphotography.com/projects"
      />
      <main className="min-h-screen bg-black text-white py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-light mb-8 text-center">
          All <span style={{ color: "#f15a24" }}>Projects</span>
        </h1>

        {/* Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex-1">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full bg-zinc-900 text-white rounded-full px-5 py-3 outline-none border border-zinc-700 focus:border-zinc-500"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-5 py-2 rounded-full transition-all border ${
                activeCat === cat
                  ? "bg-[#f15a24] border-[#f15a24] text-white"
                  : "bg-zinc-900 border-zinc-700 hover:border-zinc-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="opacity-70">No projects found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filtered.map((album, index) => (
              <Link key={album.title + album.date} href={`/projects/${album.slug}`}>
                <div className="group overflow-hidden rounded-2xl shadow-2xl relative cursor-pointer bg-zinc-900 border border-zinc-800 hover:border-zinc-600">
                  <div className="relative w-full h-56 overflow-hidden">
                    <Image
                      src={album.photos[0].src}
                      alt={album.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      className="object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out will-change-transform"
                      priority={index === 0}
                      quality={index === 0 ? 85 : 75}
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%2318181b' width='400' height='300'/%3E%3C/svg%3E"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-xs uppercase tracking-wide opacity-70 mb-1">
                      {album.albumCategory} • {album.date}
                    </div>
                    <h2 className="font-semibold text-lg">{album.title}</h2>
                    <p className="text-sm opacity-80 mt-1">{album.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
    </>
  );
}