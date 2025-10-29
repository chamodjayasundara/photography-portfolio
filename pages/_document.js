import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* DNS Prefetch for external domains */}
        <link rel="dns-prefetch" href="https://www.instagram.com" />
        <link rel="dns-prefetch" href="https://www.facebook.com" />
        
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/ClashDisplay-Regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/ClashDisplay-Semibold.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
