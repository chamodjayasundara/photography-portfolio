import Head from "next/head";

export default function SEO({
  title = "Chamod Jayasundara Photography | Luxury Property & Hospitality Photography",
  description = "Professional photography and videography for luxury villas, resorts, and hotels in Sri Lanka and worldwide. Specializing in architectural, aerial, and FPV cinematic tours.",
  image = "/images/og-image.jpg",
  url = "https://chamodjayasundaraphotography.com",
  type = "website"
}) {
  const fullTitle = title.includes("Chamod Jayasundara") 
    ? title 
    : `${title} | Chamod Jayasundara Photography`;

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