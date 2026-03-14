"use client";

import { Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        background: "linear-gradient(135deg, rgba(10,10,30,0.95), rgba(30,10,50,0.95))",
        borderBottom: "2px solid rgba(138,43,226,0.6)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      className="fixed top-0 left-0 right-0 z-50 h-[60px] md:h-[60px] flex items-center px-6"
    >
      <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <Image
            src="${basePath}/logo.png"
            alt="Vibe & Velocity Logo"
            width={40}
            height={40}
            className="rounded-full object-contain"
            priority
          />
          <span
            className="brand-gradient font-black uppercase tracking-widest"
            style={{ fontSize: "2rem", lineHeight: 1 }}
          >
            Vibe &amp; Velocity
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="hidden sm:inline-block px-4 py-1.5 rounded-full text-white text-sm font-semibold transition-all duration-300 buy-btn"
            style={{ background: "linear-gradient(135deg, #8a2be2, #00d4ff)" }}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="hidden sm:inline-block px-4 py-1.5 rounded-full text-white text-sm font-semibold transition-all duration-300 buy-btn"
            style={{ background: "linear-gradient(135deg, #8a2be2, #00d4ff)" }}
          >
            About
          </Link>
          <a
            href="https://www.instagram.com/vibe.andvelocity/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ color: "#e1306c" }}
          >
            <Instagram size={20} />
            <span className="hidden sm:inline">Follow Us!!</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
