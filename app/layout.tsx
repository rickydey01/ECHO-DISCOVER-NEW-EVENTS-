import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ECHO — Cinematic Event Universe & Live Experiences",
  description: "Experience the next evolution of live nightlife, music, festivals, and curated cultural gatherings.",
  keywords: ["ECHO", "Live Events", "Concerts", "Nightlife", "Festivals", "Guwahati", "Shillong", "Assam"],
  openGraph: {
    title: "ECHO — Cinematic Event Universe",
    description: "Discover unforgettable nights, live music, and immersive experiences.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#040406",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@500;600;700;800&family=Playfair+Display:ital,wght@0,600;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
