// components/StorySlide.tsx
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Align = "left" | "right";

export interface StorySlideProps {
  id: string;
  image?: string;      // full path like "/images/desert-wood-bottle.jpg"
  videoSrc?: string;   // e.g. "/video/forest-water.mp4"
  align?: Align;
  label: string;
  title: string;
  description: string;
  textTheme?: "light" | "dark"; // light text on dark bg vs dark on light
  children?: ReactNode;         // optional extra content (buttons, links, etc.)
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function StorySlide({
  id,
  image,
  videoSrc,
  align = "left",
  label,
  title,
  description,
  textTheme = "light",
  children,
}: StorySlideProps) {
  const textOnLeft = align === "left";

  const textColors =
    textTheme === "light" ? "text-slate-50" : "text-slate-900";

  const panelBg =
    textTheme === "light"
      ? "bg-black/45 border-white/15"
      : "bg-[#fdf3ea]/90 border-black/5";

  return (
    <section id={id} className="relative snap-start min-h-screen">
      {/* BACKGROUND (image or video) */}
      <div className="absolute inset-0 overflow-hidden">
        {videoSrc ? (
          <video
            className="h-full w-full object-cover"
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <motion.div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
            initial={{ scale: 1.05, opacity: 0.95 }}
            animate={{ scale: 1.0, opacity: 1 }}
            transition={{
              duration: 12,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        )}

        {/* vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_80%)]" />
      </div>

      {/* FOREGROUND CONTENT */}
      <div className="relative z-10 flex min-h-screen items-center px-6 py-10 lg:px-16">
        <div
          className={`grid w-full gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] ${
            textOnLeft ? "" : "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
          }`}
        >
          {/* TEXT PANEL */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.6 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`flex items-center ${
              textOnLeft ? "" : "lg:order-last"
            }`}
          >
            <div
              className={`max-w-sm rounded-3xl border px-6 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-md ${panelBg} ${textColors}`}
            >
              <p className="font-body text-[11px] uppercase tracking-[0.32em] opacity-80">
                {label}
              </p>
              <h2 className="font-title mt-3 text-3xl font-light tracking-[0.06em]">
                {title}
              </h2>
              <p className="font-body mt-3 text-sm leading-relaxed opacity-90">
                {description}
              </p>

              {children && <div className="mt-3">{children}</div>}
            </div>
          </motion.div>

          {/* empty column just for composition / breathing room */}
          <div />
        </div>
      </div>
    </section>
  );
}
