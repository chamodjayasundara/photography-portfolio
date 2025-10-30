import Image from "next/image";

export default function BrandsCarousel() {
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
  ];

  return (
    <section className="min-h-[70vh] py-32 bg-white flex flex-col justify-center">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-light text-center text-gray-800 mb-16">
          <span style={{ color: '#f15a24' }}>Brands</span> I've Worked With
        </h2>

        {/* Mobile: horizontal scroll, Desktop: animated carousel */}
  <div className="md:hidden overflow-x-auto select-none scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          <div className="flex items-center gap-6 px-2" style={{ minWidth: 'max-content' }}>
            {brands.map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-32 h-32 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-300"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={120}
                  height={120}
                  className="object-contain w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="hidden md:block overflow-hidden select-none">
          <div className="brands-scroll flex items-center gap-12 md:gap-16">
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-40 h-40 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-300"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={120}
                  height={120}
                  className="object-contain w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
