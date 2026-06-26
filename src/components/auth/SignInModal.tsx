"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface SignInModalProps {
  onClose: () => void;
}

type Tab = "signin" | "signup";

export function SignInModal({ onClose }: SignInModalProps) {
  const [tab, setTab] = useState<Tab>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Detect misconfigured client before making any network call
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes("placeholder")) {
      const msg = "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your Vercel environment variables.";
      console.error("[auth]", msg);
      setError(msg);
      setLoading(false);
      return;
    }

    // Quick connectivity probe — distinguishes CORS/network from auth errors
    try {
      const probe = await fetch(`${supabaseUrl}/auth/v1/settings`, {
        headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "" },
      });
      console.log("[auth] probe status:", probe.status);
    } catch (probeErr) {
      console.error("[auth] connectivity probe failed:", probeErr);
      setError(
        `Cannot reach Supabase Auth (${supabaseUrl}). ` +
        "Fix: In Supabase Dashboard → Authentication → URL Configuration, add your Vercel URL to Site URL and Redirect URLs, then redeploy."
      );
      setLoading(false);
      return;
    }

    try {
      if (tab === "signin") {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        console.log("[auth] signIn response:", { data, error });
        if (error) {
          setError(error.message);
        } else {
          onClose();
        }
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password });
        console.log("[auth] signUp response:", { data, error });
        if (error) {
          setError(error.message);
        } else {
          setSuccess("Account created! Check your email to confirm, then sign in.");
          setTab("signin");
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("[auth] Unexpected error:", err);
      // "Failed to fetch" means the network call never reached Supabase
      if (message.toLowerCase().includes("failed to fetch")) {
        setError("Could not reach Supabase. Check that NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in your Vercel environment variables, then redeploy.");
      } else {
        setError(message);
      }
    }

    setLoading(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h2 className="text-xl font-bold text-slate-900">
            {tab === "signin" ? "Welcome back" : "Create account"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-6 pb-4">
          <div className="flex rounded-xl bg-slate-100 p-1">
            {(["signin", "signup"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(null); setSuccess(null); }}
                className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-all ${
                  tab === t
                    ? "bg-white text-brand-primary shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {t === "signin" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600"
              >
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="rounded-xl bg-green-50 border border-green-100 px-4 py-3 text-sm text-green-700"
              >
                {success}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-3">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-primary py-3 text-sm font-semibold text-white hover:bg-brand-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : tab === "signin" ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
