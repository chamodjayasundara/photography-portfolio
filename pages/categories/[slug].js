import { useRouter } from "next/router";
import { albums } from "@/data/albums";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useMemo } from "react";

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;
  const category = slug?.toLowerCase();
  const [sortByRecent, setSortByRecent] = useState(true); // Default to Most Recent

  // Capitalize first letter helper
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Collect all photos from all albums matching the category, with album info
  // Fisher-Yates shuffle
  function shuffleArray(array) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const photosWithAlbum = useMemo(() => {
    let photos = albums.flatMap(album =>
      album.photos
        .filter(photo => photo.category.toLowerCase() === category)
        .map(photo => ({
          src: photo.src,
          albumTitle: album.title,
          albumSlug: album.slug,
          albumDate: album.date
        }))
    );

    // Remove sorting by recent, shuffle instead
    return shuffleArray(photos);
  }, [category]);

  if (!slug) return null;

  return (
    <main className="min-h-screen bg-black text-white py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-light mb-4">
            <span style={{ color: '#f15a24' }}>{capitalizeFirstLetter(category)}</span> Photography
          </h1>
          <p className="text-gray-400">
            {photosWithAlbum.length} {photosWithAlbum.length === 1 ? 'photo' : 'photos'}
          </p>
        </motion.div>

        {/* Masonry Grid */}
        {photosWithAlbum.length === 0 ? (
          <p className="text-center text-gray-500">No photos in this category yet.</p>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {photosWithAlbum.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.03 }}
                className="break-inside-avoid"
              >
                <Link href={`/projects/${item.albumSlug}`}>
                  <div className="group relative overflow-hidden rounded-lg cursor-pointer">
                    <img
                      src={item.src}
                      alt={item.albumTitle}
                      className="w-full h-auto object-cover select-none"
                      draggable="false"
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    {/* Overlay with album title on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 w-full">
                        <p className="text-white font-medium text-sm md:text-base">
                          {item.albumTitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Back Button */}
        <div className="mt-16 text-center">
          <button
            onClick={() => router.push("/")}
            className="text-[#f15a24] hover:text-[#d14b1a] font-medium transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </main>
  );
}