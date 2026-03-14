"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export type SortOption = "default" | "low-high" | "high-low" | "latest";

const SORT_LABELS: Record<SortOption, string> = {
  default: "Default",
  "low-high": "Price: Low to High",
  "high-low": "Price: High to Low",
  latest: "Latest",
};

interface Props {
  search: string;
  setSearch: (v: string) => void;
  activeCategory: string;
  setActiveCategory: (v: string) => void;
  categories: string[];
  sort: SortOption;
  setSort: (v: SortOption) => void;
}

export default function SearchFilter({
  search,
  setSearch,
  activeCategory,
  setActiveCategory,
  categories,
  sort,
  setSort,
}: Props) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      {/* Search Bar + Filter Icon */}
      <div className="flex items-center gap-3 w-full" style={{ maxWidth: 600 }}>
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "rgba(255,255,255,0.4)" }}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="search-focus w-full pl-11 pr-5 py-3 rounded-full text-white text-sm transition-all duration-300"
            style={{
              background: "rgba(20,20,40,0.8)",
              border: "1px solid rgba(138,43,226,0.3)",
            }}
          />
        </div>

        {/* Filter Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setOpen((o) => !o)}
            className="flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300"
            style={{
              background: sort !== "default"
                ? "linear-gradient(135deg, #8a2be2, #00d4ff)"
                : "rgba(20,20,40,0.8)",
              border: "1px solid rgba(138,43,226,0.4)",
              boxShadow: sort !== "default" ? "0 0 14px rgba(138,43,226,0.5)" : "none",
            }}
            title="Sort products"
          >
            <SlidersHorizontal size={18} color="white" />
          </motion.button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 rounded-2xl overflow-hidden z-50"
                style={{
                  background: "rgba(20,20,40,0.97)",
                  border: "1px solid rgba(138,43,226,0.35)",
                  minWidth: 190,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                }}
              >
                {(Object.keys(SORT_LABELS) as SortOption[]).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setSort(opt); setOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm transition-all duration-200"
                    style={{
                      color: sort === opt ? "#00d4ff" : "rgba(255,255,255,0.7)",
                      background: sort === opt ? "rgba(138,43,226,0.15)" : "transparent",
                      fontWeight: sort === opt ? 600 : 400,
                    }}
                  >
                    {sort === opt && <span className="mr-2">✓</span>}
                    {SORT_LABELS[opt]}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Category Tabs */}
      <div
        className="flex flex-wrap justify-center gap-2 p-2 rounded-full"
        style={{ background: "rgba(20,20,40,0.6)" }}
      >
        {["All", ...categories].map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                isActive ? "active-tab text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {cat}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
