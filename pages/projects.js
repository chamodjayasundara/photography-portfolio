import Link from "next/link";
import { useMemo, useState } from "react";
import { albums } from "@/data/albums";

const CATEGORIES = ["All", "Properties", "Travel", "Product", "Lifestyle", "Food"];

export default function Projects() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const [sortByRecent, setSortByRecent] = useState(true);

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

    if (sortByRecent) {
      list.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return list;
  }, [query, activeCat, sortByRecent]);

  return (
    <main className="min-h-screen bg-black text-white py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-light mb-8 text-center">
          All <span style={{ color: "#f15a24" }}>Projects</span>
        </h1>

        {/* Search + Sort */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex-1">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full bg-zinc-900 text-white rounded-full px-5 py-3 outline-none border border-zinc-700 focus:border-zinc-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm opacity-80">Sort:</label>
            <button
              onClick={() => setSortByRecent((s) => !s)}
              className="px-4 py-2 rounded-full border border-zinc-700 hover:border-zinc-500 bg-zinc-900"
              title="Toggle Most Recent"
            >
              {sortByRecent ? "Most Recent" : "Default"}
            </button>
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
            {filtered.map((album) => (
              <Link key={album.title + album.date} href={`/projects/${album.slug}`}>
                <div className="group overflow-hidden rounded-2xl shadow-2xl relative cursor-pointer bg-zinc-900 border border-zinc-800 hover:border-zinc-600">
                  <img
                    src={album.photos[0].src}
                    alt={album.title}
                    className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="p-4">
                    <div className="text-xs uppercase tracking-wide opacity-70 mb-1">
                      {album.albumCategory} • {new Date(album.date).toLocaleDateString()}
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
  );
}