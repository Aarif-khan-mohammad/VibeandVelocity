"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mail, Clock } from "lucide-react";

export default function SupportPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/mqeylwvd", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen" style={{ background: "#0a0a1e" }}>
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(138,43,226,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(0,212,255,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="mx-auto px-4 pb-20" style={{ maxWidth: 700, paddingTop: 100 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1
            className="font-black uppercase tracking-widest mb-3"
            style={{
              fontSize: "2.2rem",
              background: "linear-gradient(135deg, #00d4ff, #8a2be2, #ff00ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Support
          </h1>
          <p className="text-gray-400 leading-relaxed">
            Have a question, found a broken link, or want to suggest a product? We're here to help.
          </p>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
        >
          {[
            { icon: MessageCircle, title: "Quick Response", desc: "We reply within 24 hours" },
            { icon: Mail, title: "Email Support", desc: "Direct message to our team" },
            { icon: Clock, title: "Always Open", desc: "Submit anytime, 24/7" },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl p-4 flex flex-col items-center text-center gap-2"
              style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(138,43,226,0.25)" }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #8a2be2, #00d4ff)" }}
              >
                <Icon size={18} color="white" />
              </div>
              <p className="text-white font-semibold text-sm">{title}</p>
              <p className="text-gray-400 text-xs">{desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="rounded-2xl p-8"
          style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(138,43,226,0.25)" }}
        >
          <h2 className="text-white font-bold text-xl mb-1">Send us a Message</h2>
          <p className="text-gray-400 text-sm mb-6">Fill in the form below and we'll get back to you.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Your Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl text-white text-sm transition-all duration-300 search-focus"
                  style={{ background: "rgba(10,10,30,0.8)", border: "1px solid rgba(138,43,226,0.3)" }}
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Your Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl text-white text-sm transition-all duration-300 search-focus"
                  style={{ background: "rgba(10,10,30,0.8)", border: "1px solid rgba(138,43,226,0.3)" }}
                />
              </div>
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Describe your issue or suggestion..."
                className="w-full px-4 py-3 rounded-xl text-white text-sm transition-all duration-300 search-focus resize-none"
                style={{ background: "rgba(10,10,30,0.8)", border: "1px solid rgba(138,43,226,0.3)" }}
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="px-8 py-3 rounded-xl text-white font-bold text-sm transition-all duration-300 buy-btn disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, #8a2be2, #00d4ff)" }}
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm"
                style={{ color: "#00d4ff" }}
              >
                ✓ Message sent! We'll get back to you within 24 hours.
              </motion.p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-400">Something went wrong. Please try again.</p>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}
