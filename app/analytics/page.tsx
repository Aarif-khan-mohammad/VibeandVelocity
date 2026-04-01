"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, Legend, Cell,
} from "recharts";

type TopProduct = { product_name: string; count: number };
type Monthly = { month: string; total: number };
type Daily = { day: string; total: number };

export default function AnalyticsPage() {
  const { user, ready } = useAuth();
  const router = useRouter();
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [monthly, setMonthly] = useState<Monthly[]>([]);
  const [daily, setDaily] = useState<Daily[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ready) return;
    if (!user) { router.push("/login"); return; }
    if (user.role !== "admin") { router.push("/"); return; }

    fetch("/api/analytics")
      .then((r) => r.json())
      .then((d) => {
        setTopProducts(d.topProducts ?? []);
        setMonthly(d.monthly ?? []);
        setDaily(d.daily ?? []);
        setLoading(false);
      });
  }, [user, ready, router]);

  if (!ready) return null;

  const cardStyle = {
    background: "rgba(20,20,40,0.8)",
    border: "1px solid rgba(138,43,226,0.3)",
    borderRadius: 16,
    padding: 24,
  };

  const tooltipStyle = {
    contentStyle: { background: "#1a0a2e", border: "1px solid rgba(138,43,226,0.4)", borderRadius: 8, color: "white" },
    labelStyle: { color: "#00d4ff" },
  };

  return (
    <div className="min-h-screen px-4 pb-16" style={{ background: "#0a0a1e", paddingTop: 90 }}>
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white text-3xl font-black mb-8 text-center"
        >
          📊 Analytics Dashboard
        </motion.h1>

        {loading ? (
          <p className="text-gray-500 text-center mt-20">Loading analytics...</p>
        ) : (
          <div className="flex flex-col gap-8">

            {/* Top 10 Products Bar Chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={cardStyle}>
              <h2 className="text-white font-bold text-lg mb-4">🔥 Top 10 Products by Clicks</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topProducts} margin={{ top: 5, right: 10, left: 0, bottom: 80 }}>
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8a2be2" />
                      <stop offset="100%" stopColor="#00d4ff" />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="product_name" tick={{ fill: "#9ca3af", fontSize: 10 }} angle={-35} textAnchor="end" interval={0} />
                  <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} />
                  <Tooltip {...tooltipStyle} />
                  <Bar dataKey="count" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Daily Clicks Bar Chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={cardStyle}>
              <h2 className="text-white font-bold text-lg mb-4">📆 Daily Clicks (Last 30 Days)</h2>
              {daily.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-10">No daily click data yet.</p>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={daily} margin={{ top: 5, right: 10, left: 0, bottom: 40 }} barSize={10}>
                    <defs>
                      <linearGradient id="dailyGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00d4ff" />
                        <stop offset="100%" stopColor="#8a2be2" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(138,43,226,0.1)" />
                    <XAxis dataKey="day" tick={{ fill: "#9ca3af", fontSize: 10 }} angle={-35} textAnchor="end" interval={0} />
                    <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} />
                    <Tooltip {...tooltipStyle} />
                    <Bar dataKey="total" fill="url(#dailyGrad)" radius={[4, 4, 0, 0]} name="Clicks">
                      {daily.map((_, i) => <Cell key={i} fill="url(#dailyGrad)" />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </motion.div>

            {/* Monthly Clicks Line Chart — only if data exists */}
            {monthly.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={cardStyle}>
                <h2 className="text-white font-bold text-lg mb-4">📅 Monthly Clicks</h2>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={monthly} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(138,43,226,0.15)" />
                    <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 11 }} />
                    <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} />
                    <Tooltip {...tooltipStyle} />
                    <Legend wrapperStyle={{ color: "#9ca3af" }} />
                    <Line type="monotone" dataKey="total" stroke="#8a2be2" strokeWidth={2} dot={{ fill: "#00d4ff", r: 4 }} name="Clicks" />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
