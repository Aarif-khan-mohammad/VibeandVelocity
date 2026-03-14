"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const glitchVariants = {
  animate: {
    x: [0, -4, 4, -2, 2, 0],
    opacity: [1, 0.8, 1, 0.6, 1],
    transition: { duration: 0.4, repeat: Infinity, repeatDelay: 2.5 },
  },
};

const signalBars = [
  { height: 8, delay: 0 },
  { height: 16, delay: 0.1 },
  { height: 24, delay: 0.2 },
  { height: 32, delay: 0.3 },
];

function SignalIcon() {
  return (
    <div className="flex items-end gap-1 justify-center">
      {signalBars.map(({ height, delay }, i) => (
        <motion.div
          key={i}
          className="w-3 rounded-sm"
          style={{ height, background: i < 2 ? "rgba(138,43,226,0.3)" : "rgba(255,255,255,0.1)" }}
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, delay, ease: "easeInOut" }}
        />
      ))}
      {/* X over signal */}
      <motion.div
        className="absolute text-red-500 font-black text-lg"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1.2, repeat: Infinity }}
        style={{ marginLeft: 4 }}
      >
        ✕
      </motion.div>
    </div>
  );
}

export default function NotFound() {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "." : d + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative overflow-hidden"
      style={{ background: "#0a0a1e" }}
    >
      {/* Background glow */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(138,43,226,0.1) 0%, transparent 70%)",
        }}
      />

      {/* Floating noise lines */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0 h-px"
          style={{
            top: `${15 + i * 14}%`,
            background: `rgba(138,43,226,${0.04 + i * 0.02})`,
          }}
          animate={{ scaleX: [1, 0.3, 1, 0.6, 1], opacity: [0.5, 1, 0.3, 0.8, 0.5] }}
          transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      {/* Signal icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative flex items-center justify-center mb-8"
      >
        <motion.div
          className="w-24 h-24 rounded-full flex items-center justify-center relative"
          style={{ background: "rgba(20,20,40,0.9)", border: "2px solid rgba(138,43,226,0.4)" }}
          animate={{ boxShadow: ["0 0 20px rgba(138,43,226,0.2)", "0 0 40px rgba(138,43,226,0.05)", "0 0 20px rgba(138,43,226,0.2)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <SignalIcon />
        </motion.div>

        {/* Ripple rings */}
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute rounded-full border"
            style={{ borderColor: "rgba(138,43,226,0.3)", width: 96 + ring * 36, height: 96 + ring * 36 }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: ring * 0.4 }}
          />
        ))}
      </motion.div>

      {/* 404 glitch text */}
      <div className="relative mb-4">
        <motion.h1
          variants={glitchVariants}
          animate="animate"
          className="font-black select-none"
          style={{
            fontSize: "clamp(5rem, 20vw, 9rem)",
            background: "linear-gradient(135deg, #00d4ff, #8a2be2, #ff00ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1,
          }}
        >
          404
        </motion.h1>
        {/* Glitch shadow layers */}
        <motion.h1
          className="font-black select-none absolute inset-0 pointer-events-none"
          style={{
            fontSize: "clamp(5rem, 20vw, 9rem)",
            color: "rgba(0,212,255,0.25)",
            lineHeight: 1,
          }}
          animate={{ x: [-3, 3, -3], opacity: [0, 0.6, 0] }}
          transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 2.5 }}
        >
          404
        </motion.h1>
        <motion.h1
          className="font-black select-none absolute inset-0 pointer-events-none"
          style={{
            fontSize: "clamp(5rem, 20vw, 9rem)",
            color: "rgba(255,0,255,0.2)",
            lineHeight: 1,
          }}
          animate={{ x: [3, -3, 3], opacity: [0, 0.5, 0] }}
          transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 2.5, delay: 0.05 }}
        >
          404
        </motion.h1>
      </div>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-white font-bold text-xl mb-2">Connection Lost</h2>
        <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
          The page you're looking for has gone offline or never existed. Reconnecting{dots}
        </p>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <Link
          href="/"
          className="px-7 py-3 rounded-xl text-white font-bold text-sm buy-btn transition-all duration-300"
          style={{ background: "linear-gradient(135deg, #8a2be2, #00d4ff)" }}
        >
          Back to Home
        </Link>
        <Link
          href="/support"
          className="px-7 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
          style={{
            background: "rgba(20,20,40,0.8)",
            border: "1px solid rgba(138,43,226,0.35)",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          Contact Support
        </Link>
      </motion.div>
    </div>
  );
}
