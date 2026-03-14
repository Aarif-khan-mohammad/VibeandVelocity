"use client";

import { useState, useMemo } from "react";
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

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState<SortOption>("default");

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

  return (
    <>
      {/* Background */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: "#0a0a1e",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(138,43,226,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(0,212,255,0.1) 0%, transparent 60%)",
          }}
        />
      </div>

      <Navbar />

      <main
        className="mx-auto px-4 pb-16"
        style={{ maxWidth: 1400, paddingTop: 100 }}
      >
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
          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            }}
          >
            {filtered.map((product) => (
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
        )}
      </main>
    </>
  );
}
