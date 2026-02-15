import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://enesxbozkurt.com"),
  title: {
    default: "Enes Bozkurt | Software Developer",
    template: "%s | Enes Bozkurt"
  },
  description:
    "Enes Bozkurt - Full Stack Developer. Next.js, React, TypeScript, Node.js ve Supabase ile modern web uygulamaları geliştiriyorum.",
  keywords: [
    "Enes Bozkurt",
    "Enes Bozkurt Developer",
    "Enes Bozkurt CV",
    "Software Developer",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "Istanbul Developer"
  ],
  authors: [{ name: "Enes Bozkurt", url: "https://enesxbozkurt.com" }],
  creator: "Enes Bozkurt",
  openGraph: {
    title: "Enes Bozkurt | Software Developer",
    description:
      "Full Stack Developer portfolio and CV website.",
    url: "https://enesxbozkurt.com",
    siteName: "Enes Bozkurt",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enes Bozkurt | Full Stack Developer",
    description:
      "Software Developer portfolio and CV website.",
  },
  icons: {
    icon: "/brand/favicon-e.svg",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} antialiased selection:bg-primary/30 selection:text-white`}>

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Enes Bozkurt",
              url: "https://enesxbozkurt.com",
              jobTitle: "SoftwareDeveloper",
              sameAs: [
                "https://www.linkedin.com/in/enesxbozkurt/",
                "https://github.com/enesxbozkurt"
              ]
            }),
          }}
        />

        <div className="fixed-bg">
          <div className="glow-layer-1" />
          <div className="glow-layer-2" />
          <div className="absolute inset-0 bg-grid opacity-20" />
        </div>

        <div className="bg-noise" />

        <main className="relative z-10 w-full overflow-hidden">
          {children}
        </main>

      </body>
    </html>
  );
}

