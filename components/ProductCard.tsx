"use client";

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card-hover relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: "rgba(20,20,40,0.8)",
        border: "1px solid rgba(138,43,226,0.3)",
      }}
    >
      {/* Discount Badge */}
      {discount > 0 && (
        <span
          className="absolute top-3 left-3 z-10 text-white text-xs font-bold px-2 py-1 rounded-full"
          style={{ background: "linear-gradient(135deg, #ff6a00, #ee0979)" }}
        >
          -{discount}%
        </span>
      )}

      {/* Image */}
      <div className="relative w-full h-36 sm:h-52 bg-white/5">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-3"
          sizes="(max-width: 768px) 100vw, 33vw"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://placehold.co/400x300/1a0a2e/8a2be2?text=Product";
          }}
        />
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-2 sm:p-4 gap-1 sm:gap-2">
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full self-start"
          style={{
            background: "rgba(138,43,226,0.2)",
            color: "#00d4ff",
            border: "1px solid rgba(0,212,255,0.3)",
          }}
        >
          {product.category}
        </span>

        <p className="text-white text-xs sm:text-sm font-medium leading-snug line-clamp-2">{product.name}</p>

        <div className="flex items-center gap-1 sm:gap-2 mt-auto pt-1">
          <span className="text-white font-bold text-sm sm:text-lg">₹{product.price}</span>
          <span className="text-gray-400 text-xs line-through">₹{product.mrp}</span>
        </div>

        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="buy-btn mt-2 text-center text-white text-sm font-bold py-2.5 rounded-xl transition-all duration-300"
          style={{ background: "linear-gradient(135deg, #8a2be2, #00d4ff)" }}
        >
          Buy Now
        </a>
      </div>
    </motion.div>
  );
}
