import Head from "next/head";

export default function SEO({
  title = "Chamod Jayasundara Photography | Luxury Property & Hospitality Photography",
  description = "Professional photography and videography for luxury villas, resorts, and hotels in Sri Lanka and worldwide. Specializing in architectural, aerial, and FPV cinematic tours.",
  image = "https://chamodjayasundaraphotography.com/images/myself.jpg",
  url = "https://chamodjayasundaraphotography.com",
  type = "website",
  structuredData = null
}) {
  const fullTitle = title.includes("Chamod Jayasundara") 
    ? title 
    : `${title} | Chamod Jayasundara Photography`;

  // Default structured data for the website
  const defaultStructuredData = {
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
    "description": description,
    "url": url,
    "telephone": "+94761937301",
    "email": "chamodjayasundaraphotography@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "LK",
      "addressLocality": "Sri Lanka"
    },
    "priceRange": "$$",
    "geo": {
      "@type": "GeoCoordinates",
      "addressCountry": "LK"
    },
    "sameAs": [
      "https://www.instagram.com/chamodjayasundaraphotography",
      "https://www.facebook.com/share/17mCTCwf4Y"
    ],
    "serviceType": [
      "Architectural Photography",
      "Hotel Photography",
      "Resort Photography",
      "Villa Photography",
      "Aerial Photography",
      "FPV Videography",
      "Product Photography",
      "Food Photography",
      "Lifestyle Photography"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Sri Lanka"
    }
  };

  const schemaData = structuredData || defaultStructuredData;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content="photography, luxury property photography, hotel photography, villa photography, resort photography, aerial photography, FPV video, architectural photography, Sri Lanka, Colombo, real estate photography" />
      <meta name="author" content="Chamod Jayasundara" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <link rel="canonical" href={url} />

      {/* Structured Data for AI/Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Chamod Jayasundara Photography" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    </Head>
  );
}