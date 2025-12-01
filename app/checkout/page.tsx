"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const baseVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 20, scale: 0.98 }
};

export default function CheckoutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
      <header className="flex items-center justify-between mb-6 md:mb-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-amberLux"
        >
          ← Continue discovering
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase text-slate-400">
          <Link href="/" className="hover:text-amberLux transition">
            Discover
          </Link>
          <Link href="/quiz" className="hover:text-amberLux transition">
            AI Scent Stylist
          </Link>
          <Link
            href="/checkout"
            className="hover:text-amberLux transition text-amberLux"
          >
            Cart
          </Link>
        </nav>
      </header>

      <motion.main
        variants={baseVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="space-y-6 md:space-y-8"
      >
        <section className="grid md:grid-cols-[1.7fr,2fr] gap-6 items-start">
          {/* Cart summary (mock) */}
          <div className="space-y-4">
            <h2 className="text-lg md:text-xl font-light text-slate-50">
              Cart
            </h2>
            <div className="rounded-3xl bg-fog/80 border border-slate-800 p-4 space-y-3">
              <p className="text-sm text-slate-400">
                Cart functionality is not wired yet — this is a layout
                skeleton. In production, this block will show decants, Discovery
                Boxes and full bottles.
              </p>
            </div>
          </div>

          {/* Checkout form */}
          <div className="space-y-4">
            <h2 className="text-lg md:text-xl font-light text-slate-50">
              Checkout
            </h2>
            <form className="rounded-3xl bg-fog/80 border border-slate-800 p-4 md:p-5 space-y-4">
              <div className="grid md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">First name</label>
                  <input
                    className="w-full rounded-2xl bg-slate-950/60 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-amberLux"
                    placeholder="Alex"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Last name</label>
                  <input
                    className="w-full rounded-2xl bg-slate-950/60 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-amberLux"
                    placeholder="Solano"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-400">Email</label>
                <input
                  className="w-full rounded-2xl bg-slate-950/60 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-amberLux"
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-400">
                  Shipping address
                </label>
                <input
                  className="w-full rounded-2xl bg-slate-950/60 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-amberLux"
                  placeholder="Street, number, city, country"
                />
              </div>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Postal</label>
                  <input className="w-full rounded-2xl bg-slate-950/60 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-amberLux" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">City</label>
                  <input className="w-full rounded-2xl bg-slate-950/60 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-amberLux" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Country</label>
                  <input className="w-full rounded-2xl bg-slate-950/60 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-amberLux" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-400">
                  Card placeholder (for design only)
                </label>
                <div className="h-20 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-xs text-slate-500">
                  Payment integration will live here.
                </div>
              </div>
              <button
                type="button"
                className="w-full rounded-3xl bg-gradient-to-r from-amberLux to-softGold text-ink text-sm font-medium py-3 mt-2 hover:opacity-95 transition shadow-lux-soft"
              >
                Place order (mock)
              </button>
            </form>
          </div>
        </section>
      </motion.main>
    </div>
  );
}
