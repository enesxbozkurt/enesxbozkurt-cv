import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Professional CV & Portfolio",
  description: "Modern CV and portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased selection:bg-primary/30 selection:text-white`}>
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
