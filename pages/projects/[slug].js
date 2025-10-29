import { albums } from "@/data/albums";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";

export default function AlbumDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const album = albums.find((a) => a.slug === slug);

  if (!album) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light mb-4">Album not found</h1>
          <button
            onClick={() => router.push("/projects")}
            className="text-[#f15a24] hover:underline"
          >
            ← Back to Projects
          </button>
        </div>
      </div>
    );
  }

  // Structured data for the project
  const projectStructuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": album.title,
    "description": album.description,
    "image": album.photos.map(photo => `https://chamodjayasundaraphotography.com${photo.src}`),
    "creator": {
      "@type": "Person",
      "name": "Chamod Jayasundara",
      "jobTitle": "Professional Photographer",
      "url": "https://chamodjayasundaraphotography.com"
    },
    "datePublished": album.date,
    "url": `https://chamodjayasundaraphotography.com/projects/${album.slug}`,
    "genre": album.albumCategory,
    "keywords": `${album.albumCategory}, ${album.title}, photography, Sri Lanka`
  };

  return (
    <>
      <SEO
        title={`${album.title} - Photography Project`}
        description={album.description}
        url={`https://chamodjayasundaraphotography.com/projects/${album.slug}`}
        image={album.photos[0]?.src}
        structuredData={projectStructuredData}
      />
      <div className="min-h-screen bg-black text-white py-24 px-6">
        {/* Header - Centered Title & Description */}
        <div className="container mx-auto max-w-4xl text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-light mb-6">
              {album.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-400 font-light">
              {album.description}
            </p>
            <div className="mt-4 text-sm text-gray-500">
              {album.albumCategory} • {new Date(album.date).toLocaleDateString()}
            </div>
          </motion.div>
        </div>

        {/* Masonry Grid - Bigger photos, no lightbox */}
        <div className="container mx-auto max-w-7xl">
          <div className="columns-1 md:columns-2 gap-6 space-y-6">
            {album.photos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="break-inside-avoid"
              >
                <div className="group relative overflow-hidden rounded-lg">
                  <img
                    src={photo.src}
                    alt={`${album.title} - ${index + 1}`}
                    className="w-full h-auto object-cover select-none pointer-events-none"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <p className="text-white text-sm md:text-base font-light tracking-wide">
                        {album.title} | CHAMOD JAYASUNDARA PHOTOGRAPHY ©
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="container mx-auto max-w-7xl mt-16 text-center">
          <button
            onClick={() => router.push("/projects")}
            className="text-[#f15a24] hover:text-[#d14b1a] font-medium transition-colors"
          >
            ← Back to All Projects
          </button>
        </div>
      </div>
    </>
  );
}
