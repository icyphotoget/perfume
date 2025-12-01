"use client";

import { motion } from "framer-motion";

export default function ResultsSkeleton() {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-md rounded-3xl bg-fog/90 border border-slate-800 p-6 shadow-lux-soft"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-amberLux to-softGold animate-pulse" />
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
              AI Scent Stylist
            </p>
            <p className="text-sm text-slate-200">
              Preparing your matches…
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="animate-pulse space-y-3">
            <div className="h-4 rounded-full bg-slate-800/80 w-5/6" />
            <div className="h-3 rounded-full bg-slate-800/80 w-4/6" />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="h-20 rounded-2xl bg-slate-900/80 animate-pulse" />
            <div className="h-20 rounded-2xl bg-slate-900/80 animate-pulse" />
            <div className="h-20 rounded-2xl bg-slate-900/80 animate-pulse" />
          </div>

          <div className="mt-4 space-y-2 animate-pulse">
            <div className="h-3 rounded-full bg-slate-800/80 w-full" />
            <div className="h-3 rounded-full bg-slate-800/80 w-5/6" />
            <div className="h-3 rounded-full bg-slate-800/80 w-3/5" />
          </div>

          <p className="mt-4 text-[0.7rem] text-slate-500">
            In a real build, this is where we call the recommendation API,
            compute your matches and craft the copy that explains why they fit
            your current mood.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
