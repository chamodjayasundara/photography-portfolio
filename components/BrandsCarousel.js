import { useEffect, useRef } from "react";
import Image from "next/image";

export default function BrandsCarousel() {
  const scrollRef = useRef(null);

  const brands = [
    { name: "Brand 1", logo: "/images/brands/ekhol1.jpg" },
    { name: "Brand 2", logo: "/images/brands/oakray.png" },
    { name: "Brand 3", logo: "/images/brands/queens.png" },
    { name: "Brand 4", logo: "/images/brands/heritage-collection-black.jpg" },
    { name: "Brand 5", logo: "/images/brands/golf.png" },
    { name: "Brand 6", logo: "/images/brands/ellerton.png" },
    { name: "Brand 7", logo: "/images/brands/aneehara.jpeg" },
    { name: "Brand 8", logo: "/images/brands/terrace.jpeg" },
    { name: "Brand 9", logo: "/images/brands/hillparadise.jpeg" },
    { name: "Brand 10", logo: "/images/brands/bowatte.jpg" },

    // Add more brands as needed
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Smooth, frame-based fast auto-scroll (no manual override)
    let rafId;
    let lastTs = performance.now();
    const SPEED_PX_PER_SEC = 200; // much faster auto-scroll

    const tick = (ts) => {
      const dt = (ts - lastTs) / 1000; // seconds
      lastTs = ts;

      const half = scrollContainer.scrollWidth / 2 || 1;
      const next = (scrollContainer.scrollLeft + SPEED_PX_PER_SEC * dt) % half;
      scrollContainer.scrollLeft = next;

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="min-h-[70vh] py-32 bg-white flex flex-col justify-center">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-light text-center text-gray-800 mb-16">
          <span style={{ color: '#f15a24' }}>Brands</span> I've Worked With
        </h2>

        <div
          className="overflow-hidden select-none"
          ref={scrollRef}
        >
          <div className="flex items-center gap-12 md:gap-16" style={{ width: 'max-content' }}>
            {/* Duplicate brands for infinite scroll effect */}
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-300"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={120}
                  height={120}
                  className="object-contain w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
