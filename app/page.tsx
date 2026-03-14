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

const MOBILE_PER_PAGE = 10; // 5 rows × 2 cols
const DESKTOP_PER_PAGE = 12;

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState<SortOption>("default");
  const [page, setPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Reset to page 1 whenever filters change
  useEffect(() => { setPage(1); }, [search, activeCategory, sort]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
    if (sort === "low-high") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "high-low") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "latest") list = [...list].reverse();
    return list;
  }, [search, activeCategory, sort]);

  const perPage = isMobile ? MOBILE_PER_PAGE : DESKTOP_PER_PAGE;
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = isMobile ? filtered.slice((page - 1) * perPage, page * perPage) : filtered;

  return (
    <>
      {/* Background */}
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
        {/* Search + Filter */}
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

        {/* Product Grid */}
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
            <div
              className="grid gap-3 sm:gap-6 grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]"
              style={{ alignItems: "stretch" }}
            >
              {paginated.map((product) => (
                <motion.div
                  key={product.name + product.price}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: "flex" }}
                >
                  <div style={{ width: "100%" }}>
                    <ProductCard product={product} />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination — mobile only */}
            {isMobile && totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => { setPage((p) => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 disabled:opacity-30"
                  style={{
                    background: "rgba(20,20,40,0.8)",
                    border: "1px solid rgba(138,43,226,0.4)",
                    color: "white",
                  }}
                >
                  ← Prev
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      className="w-8 h-8 rounded-full text-xs font-bold transition-all duration-300"
                      style={{
                        background: page === p ? "linear-gradient(135deg, #8a2be2, #00d4ff)" : "rgba(20,20,40,0.8)",
                        border: "1px solid rgba(138,43,226,0.4)",
                        color: "white",
                        boxShadow: page === p ? "0 0 12px rgba(138,43,226,0.5)" : "none",
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 disabled:opacity-30"
                  style={{
                    background: "rgba(20,20,40,0.8)",
                    border: "1px solid rgba(138,43,226,0.4)",
                    color: "white",
                  }}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
