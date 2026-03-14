import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Vibe & Velocity — Budget Deals ₹500–₹1000",
  description: "Discover the best budget products under ₹1000. Curated deals on mobiles, fashion, electronics & more.",
  icons: {
    icon: "${basePath}/logo.png",
    apple: "${basePath}/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
