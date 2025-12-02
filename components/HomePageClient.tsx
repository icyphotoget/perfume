"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/data";

type SlideProps = {
  index: number;
  total: number;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl: string;
  children?: React.ReactNode;
  onActive: (index: number) => void;
};

function SlideScene({
  index,
  total,
  title,
  subtitle,
  description,
  imageUrl,
  children,
  onActive
}: SlideProps) {
  const ref = useRef<HTMLElement | null>(null);

  const inView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.7, 0.35, 0.7]
  );

  return (
    <section
      ref={ref}
      data-scene={index}
      className="relative h-[100svh] w-full flex items-center justify-center snap-start"
    >
      {/* Background image */}
      <motion.div
        style={{
          y: bgY,
          backgroundImage: `url(${imageUrl})`
        }}
        className="absolute inset-0 bg-cover bg-center will-change-transform"
      />

      {/* Dark overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-black pointer-events-none"
      />

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.5, once: false }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-3xl mx-auto px-5 md:px-6 py-14 md:py-16 text-center space-y-4 md:space-y-5 bg-black/55 backdrop-blur-xl rounded-[1.9rem] md:rounded-[2.5rem] border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.9)]"
      >
        <p className="text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.3em] text-slate-300">
          Scene {index + 1} / {total}
        </p>
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-light leading-tight text-slate-50">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs md:text-sm text-slate-100">{subtitle}</p>
        )}
        {description && (
          <p className="text-[0.75rem] md:text-sm text-slate-300 max-w-2xl mx-auto">
            {description}
          </p>
        )}
        {children}
      </motion.div>

      {/* scroll hint samo na prvoj sceni */}
      {index === 0 && (
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[0.75rem] text-slate-200 flex flex-col items-center gap-1"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        >
          <span>Scroll / swipe to explore</span>
          <span className="text-lg leading-none">↓</span>
        </motion.div>
      )}
    </section>
  );
}

type HomeProps = {
  products: Product[];
};

export default function HomePageClient({ products }: HomeProps) {
  const [activeScene, setActiveScene] = useState(0);
  const scenesCount = 4;

  const featured = products[0];
  const newIn = products.slice(1, 4);

  const sceneNames = [
    "Welcome · Front Page",
    "AI Scent Stylist",
    "Featured Perfume of the Week",
    "New In · Fresh Arrivals"
  ];

  useEffect(() => {
    const el = document.getElementById("sceneSubtitle");
    if (el) el.textContent = sceneNames[activeScene] ?? "";
  }, [activeScene]);

  const progressPercent =
    scenesCount > 1 ? (activeScene / (scenesCount - 1)) * 100 : 0;

  return (
    <div className="h-screen bg-black text-slate-50 overflow-hidden">
      <main className="relative h-full overflow-y-scroll scroll-smooth snap-y snap-mandatory">
        {/* LEFT progress bar (desktop only) */}
        <div className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center gap-3 pointer-events-none">
          <div className="w-[2px] h-40 bg-slate-800 rounded-full overflow-hidden">
            <div
              style={{ height: `${progressPercent}%` }}
              className="w-full bg-gradient-to-b from-amberLux to-softGold transition-[height] duration-400"
            />
          </div>
          <div className="flex flex-col gap-1 pointer-events-auto">
            {Array.from({ length: scenesCount }).map((_, i) => (
              <button
                key={i}
                className={`h-2 w-2 rounded-full border ${
                  i === activeScene
                    ? "bg-amberLux border-amberLux"
                    : "border-slate-600 bg-slate-900"
                }`}
                aria-label={`Go to scene ${i + 1}`}
                onClick={() => {
                  const target = document.querySelector<HTMLElement>(
                    `section[data-scene="${i}"]`
                  );
                  if (!target) return;
                  target.scrollIntoView({ behavior: "smooth" });
                }}
              />
            ))}
          </div>
        </div>

        {/* SCENES */}
        <div className="snap-y snap-mandatory">
          {/* 1 – Welcome / vibe intro */}
          <SlideScene
            index={0}
            total={scenesCount}
            imageUrl="/section-1.jpg"
            title="Discover niche perfumes through aesthetics, seasons & feelings."
            subtitle="A cinematic front page for perfume obsessives."
            description="You don’t need to know notes or pyramids. Just scroll: we’ll guide you through moods, seasons and AI-powered picks."
            onActive={setActiveScene}
          >
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 pt-2">
              <Link
                href="/aesthetic"
                className="text-[0.7rem] md:text-xs px-3 md:px-4 py-1.5 md:py-2 rounded-3xl border border-slate-400/50 text-slate-50 hover:border-amberLux hover:text-amberLux bg-black/40 backdrop-blur-sm transition"
              >
                Browse aesthetic sections
              </Link>
              <Link
                href="/seasonal"
                className="text-[0.7rem] md:text-xs px-3 md:px-4 py-1.5 md:py-2 rounded-3xl border border-slate-400/50 text-slate-50 hover:border-amberLux hover:text-amberLux bg-black/40 backdrop-blur-sm transition"
              >
                Check seasonal vibes
              </Link>
              <Link
                href="/feels"
                className="text-[0.7rem] md:text-xs px-3 md:px-4 py-1.5 md:py-2 rounded-3xl border border-slate-400/50 text-slate-50 hover:border-amberLux hover:text-amberLux bg-black/40 backdrop-blur-sm transition"
              >
                I&apos;m in my feels →
              </Link>
            </div>
          </SlideScene>

          {/* 2 – AI Scent Stylist */}
          <SlideScene
            index={1}
            total={scenesCount}
            imageUrl="/section-2.jpg"
            title="AI Scent Stylist"
            subtitle="Your digital nose that speaks in vibe, not chemistry."
            description="Answer a visual-first quiz about your outfits, playlists and social battery. We’ll serve 3–5 perfumes with emotional explanations, not just note lists."
            onActive={setActiveScene}
          >
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 pt-2">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center px-4 md:px-6 py-1.5 md:py-2.5 rounded-3xl bg-gradient-to-r from-amberLux to-softGold text-ink text-[0.7rem] md:text-xs shadow-lux-soft hover:opacity-95 transition"
              >
                Start AI Scent Stylist
              </Link>
              <span className="hidden md:inline text-[0.7rem] text-slate-200 max-w-xs">
                In the full build, this slide would also show your last
                session, saved personas and how often people like you loved
                the picks.
              </span>
            </div>
          </SlideScene>

          {/* 3 – Featured perfume */}
          <SlideScene
            index={2}
            total={scenesCount}
            imageUrl="/section-3.jpg"
            title={
              featured
                ? `Featured perfume of the week: ${featured.name}`
                : "Featured perfume of the week"
            }
            subtitle={featured?.house}
            description={featured?.description}
            onActive={setActiveScene}
          >
            {featured && (
              <div className="flex flex-col items-center gap-3 pt-1">
                <p className="text-[0.7rem] text-slate-200">
                  Vibe tags: {featured.vibeTags.join(" • ")}
                </p>
                <Link
                  href={`/product/${featured.id}`}
                  className="inline-flex items-center justify-center px-4 md:px-6 py-1.5 md:py-2.5 rounded-3xl border border-amberLux text-amberLux text-[0.7rem] md:text-xs bg-black/40 backdrop-blur-sm hover:bg-amberLux hover:text-ink transition"
                >
                  Explore this week&apos;s feature →
                </Link>
              </div>
            )}
          </SlideScene>

          {/* 4 – New in + editorial mood */}
          <SlideScene
            index={3}
            total={scenesCount}
            imageUrl="/section-4.jpg"
            title="New arrivals & slow perfume stories."
            subtitle="Fresh niche drops plus weekly deep dives."
            description="A rotating selection of new releases, paired with short, readable pieces about fragrance culture, notes and perfumers."
            onActive={setActiveScene}
          >
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-xl mx-auto">
              {newIn.map(p => (
                <Link key={p.id} href={`/product/${p.id}`}>
                  <div className="h-28 md:h-32 rounded-2xl bg-slate-950/80 border border-slate-700/80 shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex items-center justify-center px-3 text-center">
                    <span className="text-[0.7rem] md:text-sm text-slate-100 line-clamp-3">
                      {p.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <p className="hidden md:block text-[0.7rem] text-slate-200 max-w-xl mx-auto pt-2">
              Imagine editorials like “Dark Gourmand explained” or “Why everyone
              secretly loves iso-e super” living just below this section.
            </p>
          </SlideScene>
        </div>
      </main>
    </div>
  );
}
