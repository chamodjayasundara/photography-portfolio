import Link from "next/link";
import { albums } from "@/data/albums";

export default function Projects() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-semibold mb-6">Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {albums.map(album => (
          <Link key={album.slug} href={`/projects/${album.slug}`}>
            <div className="border rounded shadow hover:shadow-lg overflow-hidden cursor-pointer">
              <img
                src={album.photos[0].src}
                alt={album.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="font-semibold text-lg">{album.title}</h2>
                <p className="text-gray-600 text-sm">{album.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}