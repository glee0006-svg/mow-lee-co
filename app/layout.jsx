import "./globals.css";
import { AppProvider } from "@/lib/store";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mowleeco.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "茂利號腊味 · Mow Lee & Co. — Traditional Chinese Cured Meats Since 1856",
    template: "%s · Mow Lee & Co.",
  },
  description:
    "Six generations of traditional Chinese cured meats — lap cheong, cured pork belly, whole roast duck — hand-hung and oven-dried at 774 Commercial Street, San Francisco Chinatown since 1856.",
  keywords: [
    "Mow Lee", "茂利號", "Chinese cured meats", "lap cheong", "lap yuk",
    "Chinese sausage", "San Francisco Chinatown", "cured duck", "腊味",
    "腊腸", "Cantonese cured meats", "774 Commercial Street",
  ],
  authors: [{ name: "Mow Lee Shing Kee & Co." }],
  creator: "Mow Lee Shing Kee & Co.",
  publisher: "Mow Lee Shing Kee & Co.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_HK"],
    url: SITE_URL,
    siteName: "Mow Lee & Co.",
    title: "Mow Lee & Co. — Traditional Chinese Cured Meats Since 1856",
    description:
      "Six generations. One Chinatown storefront. Hand-hung lap cheong, lap yuk, and cured duck at 774 Commercial Street since 1856.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Mow Lee & Co. — Since 1856" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mow Lee & Co. — Traditional Chinese Cured Meats Since 1856",
    description: "Six generations. One Chinatown storefront. Since 1856.",
    images: ["/og.jpg"],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.webmanifest",
  category: "food",
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4c5d8" },
    { media: "(prefers-color-scheme: dark)",  color: "#1c0a0e" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}#business`,
  name: "Mow Lee Shing Kee & Co.",
  alternateName: ["茂利號腊味", "Mow Lee Company"],
  description:
    "Family-owned traditional Chinese cured meats shop, operating in San Francisco's Chinatown since 1856.",
  url: SITE_URL,
  telephone: "+1-415-982-5767",
  foundingDate: "1856",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "774 Commercial Street",
    addressLocality: "San Francisco",
    addressRegion: "CA",
    postalCode: "94108",
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: 37.7946, longitude: -122.4047 },
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    opens: "10:00", closes: "18:00",
  }],
  servesCuisine: "Chinese",
  paymentAccepted: "Cash, Credit Card",
};

// Pre-paint script — runs synchronously before React hydrates so the
// body class reflects the saved language on first paint. Wrapped in
// try/catch because iOS Safari Private mode throws on localStorage access.
const PRE_PAINT_LANG = `(function(){try{var l=localStorage.getItem("mowlee-lang");if(l==="zh"||l==="en"){document.body.classList.remove("zh","en");document.body.classList.add(l);}}catch(e){}})();`;

/**
 * Root layout — server component. It imports the client-side
 * <AppProvider> from "@/lib/store" and wraps every page under it. App
 * Router does NOT remount this layout on client navigation, so the
 * provider state survives every route change.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=IM+Fell+English+SC&family=JetBrains+Mono:wght@400;500&family=Noto+Serif+TC:wght@400;500;700;900&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=IM+Fell+English+SC&family=JetBrains+Mono:wght@400;500&family=Noto+Serif+TC:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body className="en" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: PRE_PAINT_LANG }} />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
