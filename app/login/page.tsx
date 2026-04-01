"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

type ToastType = "success" | "error";

function Toast({ message, type }: { message: string; type: ToastType }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-20 left-1/2 z-50 px-5 py-3 rounded-xl text-white text-sm font-semibold shadow-lg"
        style={{
          transform: "translateX(-50%)",
          background: type === "success"
            ? "linear-gradient(135deg, #00b09b, #96c93d)"
            : "linear-gradient(135deg, #ee0979, #ff6a00)",
          minWidth: 260,
          textAlign: "center",
        }}
      >
        {type === "success" ? "✅ " : "❌ "}{message}
      </motion.div>
    </AnimatePresence>
  );
}

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", identifier: "", email: "", phone: "", password: "", age: "", gender: "" });
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [loading, setLoading] = useState(false);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (mode === "login") {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: form.identifier, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || "Login failed. Please try again.", "error");
        setLoading(false);
        return;
      }
      showToast(`Welcome back, ${data.user.name}! 🎉`, "success");
      login(data.user);
      setTimeout(() => router.push("/"), 1200);
    } else {
      if (!form.email && !form.phone) {
        showToast("Please enter email or phone number.", "error");
        setLoading(false);
        return;
      }
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email || undefined,
          phone: form.phone || undefined,
          password: form.password,
          age: form.age ? Number(form.age) : undefined,
          gender: form.gender || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || "Registration failed. Please try again.", "error");
        setLoading(false);
        return;
      }
      showToast(`Account created! Welcome, ${data.user.name} 🎉`, "success");
      login(data.user);
      setTimeout(() => router.push("/"), 1200);
    }
    setLoading(false);
  };

  const inputStyle = {
    background: "rgba(20,20,40,0.8)",
    border: "1px solid rgba(138,43,226,0.4)",
    color: "white",
    borderRadius: 12,
    padding: "10px 14px",
    width: "100%",
    outline: "none",
    fontSize: 14,
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0a0a1e" }}>
      {toast && <Toast message={toast.message} type={toast.type} />}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-2xl"
        style={{ background: "rgba(20,20,40,0.9)", border: "1px solid rgba(138,43,226,0.3)" }}
      >
        <h1 className="text-white text-2xl font-black text-center mb-6">
          {mode === "login" ? "Welcome Back 👋" : "Create Account ✨"}
        </h1>

        {/* Toggle */}
        <div className="flex rounded-xl overflow-hidden mb-6" style={{ border: "1px solid rgba(138,43,226,0.3)" }}>
          {(["login", "register"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="flex-1 py-2 text-sm font-semibold transition-all"
              style={{
                background: mode === m ? "linear-gradient(135deg, #8a2be2, #00d4ff)" : "transparent",
                color: "white",
              }}
            >
              {m === "login" ? "Login" : "Register"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {mode === "register" && (
            <input style={inputStyle} placeholder="Full Name *" value={form.name} onChange={(e) => set("name", e.target.value)} required />
          )}

          {mode === "login" ? (
            <input style={inputStyle} placeholder="Email or Phone *" value={form.identifier} onChange={(e) => set("identifier", e.target.value)} required />
          ) : (
            <>
              <input style={inputStyle} placeholder="Email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
              <input style={inputStyle} placeholder="Phone" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
              <p className="text-gray-500 text-xs -mt-1">* At least one of email or phone required</p>
            </>
          )}

          <input style={inputStyle} placeholder="Password *" type="password" value={form.password} onChange={(e) => set("password", e.target.value)} required />

          {mode === "register" && (
            <div className="flex gap-3">
              <input style={{ ...inputStyle, width: "50%" }} placeholder="Age" type="number" value={form.age} onChange={(e) => set("age", e.target.value)} />
              <select style={{ ...inputStyle, width: "50%" }} value={form.gender} onChange={(e) => set("gender", e.target.value)}>
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="py-3 rounded-xl text-white font-bold text-sm mt-2 transition-all disabled:opacity-50"
            style={{ background: "linear-gradient(135deg, #8a2be2, #00d4ff)" }}
          >
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
