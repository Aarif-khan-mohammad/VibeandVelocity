"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import SearchFilter, { SortOption } from "@/components/SearchFilter";
import ProductCard from "@/components/ProductCard";
import productsData from "@/data/products.json";

const products = (productsData as unknown) as {
  name: string;
  mrp: number;
  price: number;
  category: string;
  image: string;
  link: string;
}[];

const categories = [...new Set(products.map((p) => p.category))];

function getPerPage() {
  if (typeof window === "undefined") return 12;
  return window.innerWidth < 640 ? 8 : 12;
}

function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;

  const go = (p: number) => {
    onChange(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show max 5 page numbers with ellipsis
  const getPages = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 3) return [1, 2, 3, 4, "...", totalPages];
    if (page >= totalPages - 2) return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, "...", page - 1, page, page + 1, "...", totalPages];
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
      {/* Prev */}
      <button
        onClick={() => go(Math.max(1, page - 1))}
        disabled={page === 1}
        className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 disabled:opacity-30"
        style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(138,43,226,0.4)", color: "white" }}
      >
        ← Prev
      </button>

      {/* Page numbers */}
      {getPages().map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="text-gray-500 text-sm px-1">…</span>
        ) : (
          <button
            key={p}
            onClick={() => go(p as number)}
            className="w-9 h-9 rounded-full text-xs font-bold transition-all duration-300"
            style={{
              background: page === p ? "linear-gradient(135deg, #8a2be2, #00d4ff)" : "rgba(20,20,40,0.8)",
              border: "1px solid rgba(138,43,226,0.4)",
              color: "white",
              boxShadow: page === p ? "0 0 12px rgba(138,43,226,0.5)" : "none",
            }}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => go(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 disabled:opacity-30"
        style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(138,43,226,0.4)", color: "white" }}
      >
        Next →
      </button>
    </div>
  );
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState<SortOption>("default");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(() => 12);

  useEffect(() => {
    const update = () => setPerPage(getPerPage());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Reset to page 1 on filter/sort change
  useEffect(() => { setPage(1); }, [search, activeCategory, sort, perPage]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchSearch = (p.name ?? "").toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
    if (sort === "low-high") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "high-low") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "latest") list = [...list].reverse();
    return list;
  }, [search, activeCategory, sort]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <>
      <div className="fixed inset-0 -z-10" style={{ background: "#0a0a1e" }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(138,43,226,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(0,212,255,0.1) 0%, transparent 60%)",
          }}
        />
      </div>

      <Navbar />

      <main className="mx-auto px-4 pb-16" style={{ maxWidth: 1400, paddingTop: 100 }}>
        <div className="mb-10">
          <SearchFilter
            search={search}
            setSearch={setSearch}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            categories={categories}
            sort={sort}
            setSort={setSort}
          />
        </div>

        {filtered.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 mt-20 text-lg"
          >
            No products found. Try a different search or category.
          </motion.p>
        ) : (
          <>
            <div className="grid gap-3 sm:gap-6 grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
              {paginated.map((product) => (
                <motion.div
                  key={product.name + product.price}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>

            <Pagination page={page} totalPages={totalPages} onChange={setPage} />

            {/* Page info */}
            <p className="text-center text-gray-500 text-xs mt-3">
              Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length} products
            </p>
          </>
        )}
      </main>
    </>
  );
}
