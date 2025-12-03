// components/PerfumeStories.tsx
"use client";

import { useRef } from "react";
import { useScroll, motion } from "framer-motion";
import Link from "next/link";
import { StorySlide } from "./StorySlide";

export default function PerfumeStories() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  return (
    <div className="relative h-[calc(100vh-64px)] bg-black text-slate-50">
      {/* top scroll progress bar */}
      <motion.div
        className="pointer-events-none absolute left-0 top-0 z-30 h-[2px] w-full origin-left bg-gradient-to-r from-emerald-200 via-lime-200 to-amber-100"
        style={{ scaleX: scrollYProgress }}
      />

      {/* snap-scrolling container */}
      <div
        ref={containerRef}
        className="h-full snap-y snap-mandatory overflow-y-scroll scroll-smooth"
      >
        {/* SLIDE 1 – VIDEO HERO */}
        <StorySlide
          id="scene-1"
          videoSrc="/video/forest-water.mp4"
          align="left"
          label="Prologue"
          title="A moving moodboard of scent."
          description="Scroll through water, wood, moss and skin — the worlds your perfumes can live in."
          textTheme="light"
        >
          <p className="font-body text-[0.65rem] text-slate-300/60 italic">
            Featured scent:{" "}
            <Link
              href="/product/cda179b6-eb3c-4645-802c-169bacbc1a45"
              className="hover:text-amberLux transition"
            >
              View perfume →
            </Link>
          </p>
        </StorySlide>

        {/* SLIDE 2 – WOOD / BEIGE BOTTLE */}
        <StorySlide
          id="scene-2"
          image="/images/desert-wood-bottle.jpg"
          align="right"
          label="Desert Resin"
          title="Sun-baked wood & quiet air."
          description="Soft resins, warm sand, a trace of smoke — stillness after a long day in dry heat."
          textTheme="dark"
        >
          <p className="font-body text-[0.65rem] text-slate-700/70 italic">
            Featured scent:{" "}
            <Link
              href="/product/6fd53823-0ae8-491d-9e5a-f26215c09cd1"
              className="hover:text-amberLux transition"
            >
              View perfume →
            </Link>
          </p>
        </StorySlide>

        {/* SLIDE 3 – BOTTLE IN WATER */}
        <StorySlide
          id="scene-3"
          image="/images/river-bottle.jpg"
          align="left"
          label="River Clean"
          title="Green light on cold water."
          description="Rinsed, clear, softly sharp — not citrus fresh, more current and flow."
          textTheme="light"
        >
          <p className="font-body text-[0.65rem] text-slate-300/60 italic">
            Featured scent:{" "}
            <Link
              href="/product/8b1985d6-81b0-4d33-ac1d-f80ba10db7ee"
              className="hover:text-amberLux transition"
            >
              View perfume →
            </Link>
          </p>
        </StorySlide>

        {/* SLIDE 4 – BLACK BOTTLE + STONE */}
        <StorySlide
          id="scene-4"
          image="/images/stone-bottle.jpg"
          align="right"
          label="Skin & Stone"
          title="Bare skin, cool room."
          description="Close-wearing woods and musks that feel like a memory, not a perfume."
          textTheme="dark"
        >
          <p className="font-body text-[0.65rem] text-slate-700/70 italic">
            Featured scent:{" "}
            <Link
              href="/product/a8f3804a-2e7b-460a-a4df-68e8e6e54266"
              className="hover:text-amberLux transition"
            >
              View perfume →
            </Link>
          </p>
        </StorySlide>

        {/* SLIDE 5 – MOSS TOP-DOWN */}
        <StorySlide
          id="scene-5"
          image="/images/moss-bottle.jpg"
          align="left"
          label="Forest Quiet"
          title="Soft moss under glass."
          description="Green, humid, a little shadowy — built for rainy walks and headphone hours."
          textTheme="light"
        >
          <p className="font-body text-[0.65rem] text-slate-300/60 italic">
            Featured scent:{" "}
            <Link
              href="/product/37258b7a-fc18-4932-b43e-c574734c782b"
              className="hover:text-amberLux transition"
            >
              View perfume →
            </Link>
          </p>
        </StorySlide>
      </div>
    </div>
  );
}
