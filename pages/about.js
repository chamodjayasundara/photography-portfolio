import { motion } from "framer-motion";
import Image from "next/image";
import { FiCamera, FiVideo, FiAperture, FiMap } from "react-icons/fi";
import SEO from "@/components/SEO";

const services = [
  {
    icon: FiCamera,
    title: "Architectural Photography",
    description: "Capturing the elegance and character of luxury spaces with attention to detail, precise composition, and thoughtful use of light."
  },
  {
    icon: FiAperture,
    title: "Interior Photography",
    description: "Showcasing textures, colors, and design elements that bring interiors to life through professional photography."
  },
  {
    icon: FiMap,
    title: "Aerial Photography",
    description: "Stunning aerial perspectives that provide a complete view of properties, highlighting their surroundings and scale."
  },
  {
    icon: FiVideo,
    title: "FPV Cinematic Tours",
    description: "Immersive single-take property tours that give viewers a dynamic sense of space, flow, and ambiance."
  }
];

const testimonials = [
  {
    name: "Fadhil Fazil",
    designation: "Marketing Executive",
    company: "Victoria Golf Resort",
    text: "It was an absolute pleasure working with Chamod Jayasundara during our recent property shoot at Victoria Golf Resort. He beautifully captured the essence of the resort, from our rooms and restaurant to the golf course and clubhouse - with a truly artistic eye. The final images were nothing short of stunning, perfectly reflecting the natural charm and elegance of the property. Chamod was incredibly professional, flexible, and easy to work with, allowing our daily operations to continue seamlessly while he worked around the resort. We're truly grateful for his effort and creativity, and look forward to collaborating again in the future!",
    image: "/images/testimonials/client1.jpg"
  },
  {
    name: "Gihan Thenuwara",
    designation: "Head of Digital & eMarketing",
    company: "Oak Ray Hotels & Resorts, Seven Angels Collection and Oak Ray Group of Companies",
    text: "Working with Chamod was an absolute pleasure! His passion for photography truly shines through every shot. He’s professional, flexible, and full of energy, always going the extra mile to capture the perfect moment. Beyond his skill behind the lens, Chamod is down-to-earth, friendly, and incredibly easy to work with. I have no hesitation in recommending him for any hotel, resort, or villa project, he knows exactly what he’s doing and delivers outstanding results every time",
    image: "/images/testimonials/client2.jpg"
  },
  /*
  {
    name: "Client Name",
    designation: "Owner",
    company: "Boutique Hotel",
    text: "The FPV tour video was incredible! It showcased our hotel perfectly and has been instrumental in attracting new guests. Highly professional and creative work.",
    image: "/images/testimonials/client2.jpg"
  }
  */
];

export default function About() {
  // Structured data for about page with reviews
  const aboutStructuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Chamod Jayasundara Photography",
    "image": "https://chamodjayasundaraphotography.com/images/myself.jpg",
    "logo": {
      "@type": "ImageObject",
      "url": "https://chamodjayasundaraphotography.com/images/Chamod_Jayasundara_Logo.png",
      "width": "200",
      "height": "50"
    },
    "url": "https://chamodjayasundaraphotography.com",
    "telephone": "+94761937301",
    "email": "chamodjayasundaraphotography@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "LK"
    },
    "sameAs": [
      "https://www.instagram.com/chamodjayasundaraphotography",
      "https://www.facebook.com/share/17mCTCwf4Y"
    ],
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": testimonials.length.toString()
    },
    "review": testimonials.map(testimonial => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": testimonial.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": testimonial.text,
      "datePublished": "2025-01-01"
    }))
  };

  return (
    <>
      <SEO
        title="About - Luxury Property & Hospitality Photographer"
        description="Learn about Chamod Jayasundara, a professional photographer specializing in luxury villas, resorts, and hotels in Sri Lanka and worldwide. Offering architectural, aerial, and FPV cinematic photography services."
        url="https://chamodjayasundaraphotography.com/about"
        image="https://chamodjayasundaraphotography.com/images/myself.jpg"
        structuredData={aboutStructuredData}
      />
      <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black z-10" />
        <div className="absolute inset-0">
          <div className="w-full h-full bg-zinc-900" />
          {/* You can add a hero image here later */}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-20 text-center px-6"
        >
          <h1 className="text-5xl md:text-7xl font-light mb-4">
            About <span style={{ color: '#f15a24' }}>Me</span>
          </h1>
          <p className="text-xl text-gray-300 font-light">
            Capturing the Essence of Luxury
          </p>
        </motion.div>
      </section>

      {/* About Content */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 text-lg leading-relaxed text-gray-300"
            >
              <h2 className="text-3xl md:text-4xl font-light mb-8">
                Chamod <span style={{ color: '#f15a24' }}>Jayasundara</span>
              </h2>
              
              <p>
                I specialize in capturing the essence of luxury through professional photography,
                 focusing on villas, resorts, and hotels. My work is about more
                than just images. It's about creating a visual story that showcases the elegance,
                atmosphere, and unique character of each space.
              </p>
              
              <p>
                Every project is approached with attention to detail, precise composition, and 
                thoughtful use of light to highlight textures, colors, and architectural elements. 
                I provide a range of services to bring properties to life, including aerial 
                photography, FPV cinematic single-take hotel tours, as well as architectural and 
                interior photography.
              </p>
              
              <p>
                Each service is designed to create immersive visuals that give viewers a complete 
                sense of space, ambiance, and luxury. I collaborate closely with clients to 
                understand their vision and deliver visuals that elevate their brand or property.
              </p>
              
              <p>
                Whether it's a serene villa, a sophisticated resort, or a luxurious hotel, my 
                photography and videography transform spaces into compelling stories, combining 
                technical precision with creative storytelling to leave a lasting impression.
              </p>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative">
                {/* Main image container */}
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="/images/myself.jpg"
                    alt="Chamod Jayasundara - Professional Photographer specializing in luxury property and hospitality photography"
                    width={600}
                    height={700}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 bg-zinc-900/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-4">
              My <span style={{ color: '#f15a24' }}>Services</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Comprehensive visual solutions for luxury properties
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black border border-zinc-800 rounded-2xl p-8 hover:border-[#f15a24] transition-all duration-300"
                >
                  <div className="bg-[#f15a24] w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-2xl font-medium mb-4">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href="/quote"
              className="inline-block bg-[#f15a24] text-white px-10 py-4 rounded-full hover:bg-[#d14b1a] transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl"
            >
              Request a Quote
            </a>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-4">
              Client <span style={{ color: '#f15a24' }}>Testimonials</span>
            </h2>
            <p className="text-gray-400 text-lg">
              What my clients say about working with me
            </p>
          </motion.div>

          <div className="block">
            {/* Mobile: Horizontal scroll carousel */}
            <div className="block md:hidden w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide">
              <div className="flex gap-6 px-2 pb-4" style={{ width: 'max-content' }}>
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    viewport={{ once: true }}
                    className="w-[320px] flex-shrink-0 snap-center bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-[#f15a24] transition-all duration-300"
                  >
                    <div className="mb-6">
                      <svg
                        className="w-10 h-10 text-[#f15a24]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#f15a24] flex items-center justify-center text-white font-semibold text-xl" style={{ aspectRatio: '1/1' }}>
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-gray-400">{testimonial.designation}</p>
                        <p className="text-sm text-gray-400">{testimonial.company}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Desktop Grid Layout */}
            {/* Desktop Grid Layout */}
            <div className="hidden md:grid grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-[#f15a24] transition-all duration-300"
                >
                  <div className="mb-6">
                    <svg
                      className="w-10 h-10 text-[#f15a24]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#f15a24] flex items-center justify-center text-white font-semibold text-xl" style={{ aspectRatio: '1/1' }}>
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-gray-400">{testimonial.designation}</p>
                      <p className="text-sm text-gray-400">{testimonial.company}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-zinc-900/50">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Let's Create Something <span style={{ color: '#f15a24' }}>Extraordinary</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Ready to showcase your property with stunning visuals? Let's collaborate 
              to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/quote"
                className="bg-[#f15a24] text-white px-10 py-4 rounded-full hover:bg-[#d14b1a] transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl"
              >
                Get a Quote
              </a>
              <a
                href="/contact"
                className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300 font-medium text-lg"
              >
                Contact Me
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}
