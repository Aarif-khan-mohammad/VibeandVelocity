import Link from "next/link";
import { Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="w-full mt-auto py-6 px-6"
      style={{
        background: "linear-gradient(135deg, rgba(10,10,30,0.98), rgba(30,10,50,0.98))",
        borderTop: "1px solid rgba(138,43,226,0.25)",
      }}
    >
      <div className="mx-auto flex flex-col sm:flex-row items-center justify-between gap-3" style={{ maxWidth: 1400 }}>
        <p className="text-gray-500 text-xs">
          © {new Date().getFullYear()} Vibe &amp; Velocity. All rights reserved.
        </p>

        <div className="flex items-center gap-5">
          <Link href="/about" className="text-gray-400 text-xs hover:text-white transition-colors">
            About
          </Link>
          <Link href="/support" className="text-gray-400 text-xs hover:text-white transition-colors">
            Support
          </Link>
          <Link href="/privacy" className="text-gray-400 text-xs hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <a
            href="https://www.instagram.com/vibe.andvelocity/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-pink-400 transition-colors"
          >
            <Instagram size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
