"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Tag, Zap, Shield, Star, HeartHandshake, TrendingDown, BadgePercent } from "lucide-react";
import Link from "next/link";

const offerings = [
  { icon: ShoppingBag, title: "Curated Budget Deals", desc: "Hand-picked products priced between ₹500–₹1000 across mobiles, fashion, electronics, and more." },
  { icon: Tag, title: "Real Discounts", desc: "Every product shows the actual MRP vs sale price so you always know exactly how much you're saving." },
  { icon: Zap, title: "Instant Buy Links", desc: "One click takes you directly to the product on Amazon — no redirects, no middlemen." },
  { icon: Shield, title: "Trusted Affiliate Links", desc: "All links are Amazon affiliate links. You pay the same price — we earn a small commission at no extra cost to you." },
  { icon: Star, title: "Top Rated Products", desc: "We only feature products with strong reviews and proven quality within the budget range." },
  { icon: HeartHandshake, title: "Community First", desc: "Built for everyday shoppers in India who want the best value for their money." },
  { icon: TrendingDown, title: "Cheapest Products", desc: "We hunt the internet so you don't have to — every product listed is verified to be at its lowest available price." },
  { icon: BadgePercent, title: "Price Drop Alerts", desc: "We regularly update our listings whenever prices drop, so you always catch the best deal at the right time." },
];

const benefits = [
  { stat: "₹500–₹1000", label: "Price Range" },
  { stat: "100%", label: "Genuine Links" },
  { stat: "6+", label: "Categories" },
  { stat: "0", label: "Hidden Charges" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: "#0a0a1e" }}>
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(138,43,226,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(0,212,255,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="mx-auto px-4 pb-20" style={{ maxWidth: 1000, paddingTop: 100 }}>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h1
            className="font-black uppercase tracking-widest mb-4"
            style={{
              fontSize: "2.2rem",
              background: "linear-gradient(135deg, #00d4ff, #8a2be2, #ff00ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            About Vibe &amp; Velocity
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed text-base">
            We're on a mission to help every Indian shopper discover the best quality products under ₹1000 — without the endless scrolling, fake reviews, or hidden costs.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14"
        >
          {benefits.map(({ stat, label }) => (
            <div
              key={label}
              className="rounded-2xl p-5 text-center"
              style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(138,43,226,0.25)" }}
            >
              <p
                className="font-black text-2xl mb-1"
                style={{
                  background: "linear-gradient(135deg, #00d4ff, #8a2be2)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat}
              </p>
              <p className="text-gray-400 text-xs">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* What We Offer */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white font-bold text-xl mb-6"
        >
          What We Offer
        </motion.h2>
        <div className="grid gap-5 mb-14" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
          {offerings.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.06 }}
              className="rounded-2xl p-6"
              style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(138,43,226,0.25)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "linear-gradient(135deg, #8a2be2, #00d4ff)" }}
              >
                <Icon size={20} color="white" />
              </div>
              <h3 className="text-white font-bold mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA to Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="rounded-2xl p-8 text-center"
          style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(138,43,226,0.25)" }}
        >
          <h2 className="text-white font-bold text-xl mb-2">Have a question or suggestion?</h2>
          <p className="text-gray-400 text-sm mb-6">Our support team is happy to help you with anything.</p>
          <Link
            href="/support"
            className="inline-block px-8 py-3 rounded-xl text-white font-bold text-sm buy-btn transition-all duration-300"
            style={{ background: "linear-gradient(135deg, #8a2be2, #00d4ff)" }}
          >
            Contact Support
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
