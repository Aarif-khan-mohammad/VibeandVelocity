"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Product {
  name: string;
  mrp: number;
  price: number;
  category: string;
  image: string;
  link: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const [clicks, setClicks] = useState(0);

  const handleBuy = () => setClicks((c) => c + 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card-hover relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: "rgba(20,20,40,0.8)",
        border: "1px solid rgba(138,43,226,0.3)",
        height: "100%",
      }}
    >
      {/* Discount Badge */}
      {discount > 0 && (
        <span
          className="absolute top-2 left-2 z-10 text-white text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ background: "linear-gradient(135deg, #ff6a00, #ee0979)" }}
        >
          -{discount}%
        </span>
      )}

      {/* Image — fixed height */}
      <div className="relative w-full flex-shrink-0 bg-white/5" style={{ height: 140 }}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-2"
          sizes="(max-width: 640px) 50vw, 25vw"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://placehold.co/400x300/1a0a2e/8a2be2?text=Product";
          }}
        />
      </div>

      {/* Info — fixed layout, no flex-1 growth on inner items */}
      <div className="flex flex-col p-2 sm:p-3 gap-1.5" style={{ flex: 1 }}>
        {/* Category tag — fixed height */}
        <div style={{ height: 22 }}>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(138,43,226,0.2)",
              color: "#00d4ff",
              border: "1px solid rgba(0,212,255,0.3)",
              whiteSpace: "nowrap",
            }}
          >
            {product.category}
          </span>
        </div>

        {/* Name — fixed 2-line height */}
        <div style={{ height: 36 }}>
          <p className="text-white text-xs font-medium leading-snug line-clamp-2">
            {product.name}
          </p>
        </div>

        {/* Price row — fixed height */}
        <div className="flex items-center justify-between" style={{ height: 28 }}>
          <div className="flex items-center gap-1.5">
            <span className="text-white font-bold text-sm sm:text-base">₹{product.price}</span>
            <span className="text-gray-400 text-xs line-through">₹{product.mrp}</span>
          </div>
          {clicks > 0 && (
            <span
              className="text-xs font-semibold px-1.5 py-0.5 rounded-full"
              style={{ background: "rgba(0,212,255,0.15)", color: "#00d4ff", border: "1px solid rgba(0,212,255,0.3)" }}
              title="Buy clicks"
            >
              🛒 {clicks}
            </span>
          )}
        </div>

        {/* Buy Now — always at bottom */}
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={handleBuy}
          className="buy-btn text-center text-white text-xs sm:text-sm font-bold py-2 rounded-xl transition-all duration-300 mt-auto"
          style={{ background: "linear-gradient(135deg, #8a2be2, #00d4ff)" }}
        >
          Buy Now
        </a>
      </div>
    </motion.div>
  );
}
