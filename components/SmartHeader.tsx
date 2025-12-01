"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SmartHeader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScroll = 0;
    let timeout: any;

    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScroll && current > 50) {
        // scrolling down → hide
        setHidden(true);
      } else {
        // scrolling up or near top → show
        setHidden(false);
      }

      lastScroll = current;

      // If user stops scrolling → show again after 200ms
      clearTimeout(timeout);
      timeout = setTimeout(() => setHidden(false), 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      animate={hidden ? { y: -80, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-ink/80 backdrop-blur-lg border-b border-slate-800/60"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* LEFT: Logo + dynamic scene subtitle */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-amberLux shadow-md" />
          <div className="flex flex-col">
            <span className="tracking-[0.25em] text-xs text-slate-300">
              PARFEMI
            </span>
            <span
              id="sceneSubtitle"
              className="text-[0.7rem] text-slate-500 mt-0.5 transition-opacity duration-300"
            >
              Welcome · Front Page
            </span>
          </div>
        </Link>

        {/* CENTER: 3 MAIN TABS */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/aesthetic"
            className="text-xs px-3 py-1.5 rounded-3xl border border-slate-700 text-slate-300 hover:border-amberLux hover:text-amberLux transition"
          >
            Aesthetic sections
          </Link>
          <Link
            href="/seasonal"
            className="text-xs px-3 py-1.5 rounded-3xl border border-slate-700 text-slate-300 hover:border-amberLux hover:text-amberLux transition"
          >
            Seasonal vibes
          </Link>
          <Link
            href="/feels"
            className="text-xs px-3 py-1.5 rounded-3xl border border-slate-700 text-slate-300 hover:border-amberLux hover:text-amberLux transition"
          >
            In my feels 
          </Link>
        </div>

        {/* RIGHT: Nav links */}
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase text-slate-400">
          <Link href="/" className="hover:text-amberLux transition">
            Home
          </Link>
          <Link href="/quiz" className="hover:text-amberLux transition">
            AI Scent Stylist
          </Link>
          <Link href="/checkout" className="hover:text-amberLux transition">
            Cart
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
