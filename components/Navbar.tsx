"use client";

import { Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  const btnStyle = {
    background: "linear-gradient(135deg, #8a2be2, #00d4ff)",
  };

  return (
    <nav
      style={{
        background: "linear-gradient(135deg, rgba(10,10,30,0.95), rgba(30,10,50,0.95))",
        borderBottom: "2px solid rgba(138,43,226,0.6)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      className="fixed top-0 left-0 right-0 z-50 h-[60px] flex items-center px-6"
    >
      <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <Image
            src="/logo.png"
            alt="Vibe & Velocity Logo"
            width={40}
            height={40}
            className="rounded-full object-contain"
            priority
          />
          <span
            className="brand-gradient font-black uppercase tracking-widest hidden sm:block"
            style={{ fontSize: "1.5rem", lineHeight: 1 }}
          >
            Vibe &amp; Velocity
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/" className="hidden sm:inline-block px-4 py-1.5 rounded-full text-white text-sm font-semibold transition-all buy-btn" style={btnStyle}>
            Home
          </Link>
          <Link href="/about" className="hidden sm:inline-block px-4 py-1.5 rounded-full text-white text-sm font-semibold transition-all buy-btn" style={btnStyle}>
            About
          </Link>

          {user?.role === "admin" && (
            <Link href="/analytics" className="hidden sm:inline-block px-4 py-1.5 rounded-full text-white text-sm font-semibold transition-all buy-btn" style={btnStyle}>
              Analytics
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-white text-xs hidden sm:block">Hi, {user.name.split(" ")[0]}</span>
              <button
                onClick={logout}
                className="px-4 py-1.5 rounded-full text-white text-sm font-semibold transition-all buy-btn"
                style={{ background: "linear-gradient(135deg, #ee0979, #ff6a00)" }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="px-4 py-1.5 rounded-full text-white text-sm font-semibold transition-all buy-btn" style={btnStyle}>
              Login
            </Link>
          )}

          <a
            href="https://www.instagram.com/vibe.andvelocity/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ color: "#e1306c" }}
          >
            <Instagram size={20} />
            <span className="hidden sm:inline">Follow</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
