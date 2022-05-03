import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/images/backstage-logo.svg" />
        <meta name="theme-color" content="#485ED1" />
        <meta property="og:title" content="Backstage" />
        <meta property="og:image" content="/images/artist-concert.jpg" />
        <link rel="icon" href="/images/backstage-logo.svg" />
        <link rel="apple-touch-icon" href="/images/backstage-logo.svg" />
        <link rel="manifest" href="/manifest.json" />
        {/* Get Lato from Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
