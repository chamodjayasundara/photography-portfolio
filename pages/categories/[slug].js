import { useRouter } from "next/router";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { albums } from "@/data/albums";
import { useState } from "react";

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;
  const category = slug?.toLowerCase();

  // Collect all photos from all albums matching the category
  const photos = albums.flatMap(album =>
    album.photos
      .filter(photo => photo.category.toLowerCase() === category)
      .map(photo => ({ src: photo.src, title: photo.title }))
  );

  const [index, setIndex] = useState(-1);

  if (!slug) return null;

  return (
    <main className="p-10">
      <h1 className="text-3xl font-semibold mb-6">{slug} Photography</h1>
      <PhotoAlbum
        layout="rows"
        photos={photos}
        onClick={({ index }) => setIndex(index)}
      />
      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
      />
    </main>
  );
}