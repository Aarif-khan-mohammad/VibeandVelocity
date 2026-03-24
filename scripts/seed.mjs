// Run: node scripts/seed.mjs
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

const supabase = createClient(
  "https://ubfrlfjiucteiqmacwuu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViZnJsZmppdWN0ZWlxbWFjd3V1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzMDk3OTgsImV4cCI6MjA4OTg4NTc5OH0.2SPE5UfYHxcc6Jqy27nWC9dj1aFayFnkztsbgA6iOmk"
);

const products = JSON.parse(readFileSync("./data/products.json", "utf-8"));

const rows = products.map(({ name, mrp, price, category, image, link }) => ({
  name,
  mrp: Number(mrp),
  price: Number(price),
  category,
  image,
  link,
}));

const { error } = await supabase.from("products").insert(rows);
if (error) {
  console.error("Seed failed:", error.message);
} else {
  console.log(`Seeded ${rows.length} products successfully.`);
}
