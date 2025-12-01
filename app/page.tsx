"use client";

import {
  motion,
  useScroll,
  useTransform,
  useInView
} from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { products } from "@/lib/data";

function smooth(prev: number, next: number, factor = 0.08) {
  return prev + (next - prev) * factor;
}

type ScrollDirection = "up" | "down";

type SlideBaseProps = {
  index: number;
  total: number;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl: string;
  children?: React.ReactNode;
  scrollVelocity: number;
  scrollDirection: ScrollDirection;
  onActive: (index: number) => void;
  isDesktop: boolean;
};

function SlideScene({
  index,
  total,
  title,
  subtitle,
  description,
  imageUrl,
  children,
  scrollVelocity,
  scrollDirection,
  onActive,
  isDesktop
}: SlideBaseProps) {
  const ref = useRef<HTMLElement | null>(null);

  const inView = useInView(ref, { margin: "-30% 0px -30% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Desktop-only transforms
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "4%"]);
  const fadeOverlay = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.7, 0.25, 0.7]
  );
  const yDown = useTransform(scrollYProgress, [0, 0.4], ["16%", "0%"]);
  const yUp = useTransform(scrollYProgress, [0, 0.4], ["-16%", "0%"]);
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.25, 0.7, 1],
    [
      "inset(100% 0% 0% 0%)",
      "inset(0% 0% 0% 0%)",
      "inset(0% 0% 0% 0%)",
      "inset(0% 0% 100% 0%)"
    ]
  );

  const [bgScale, setBgScale] = useState(1);
  useEffect(() => {
    if (!isDesktop) {
      setBgScale(1);
      return;
    }
    const zoomAmount = Math.min(Math.abs(scrollVelocity) * 0.02, 0.05);
    setBgScale(1 + zoomAmount);
  }, [scrollVelocity, isDesktop]);

  return (
    <section
      ref={ref}
      data-scene={index}
      className="relative min-h-[100svh] w-full flex items-center justify-center"
    >
      {/* background image */}
      <motion.div
        style={
          isDesktop
            ? {
                y: bgY,
                scale: bgScale,
                backgroundImage: `url(${imageUrl})`
              }
            : { backgroundImage: `url(${imageUrl})` }
        }
        className="absolute inset-0 bg-cover bg-center will-change-transform"
      />

      {/* overlay */}
      <motion.div
        style={isDesktop ? { opacity: fadeOverlay } : undefined}
        className="absolute inset-0 bg-black/55 pointer-events-none"
      />

      {/* content */}
      <motion.div
        style={
          isDesktop
            ? {
                y: scrollDirection === "down" ? yDown : yUp,
                clipPath
              }
            : undefined
        }
        transition={
          isDesktop
            ? {
                type: "tween",
                ease: [0.23, 0.86, 0.32, 0.99],
                duration: 0.6
              }
            : undefined
        }
        className="relative z-10 max-w-3xl mx-auto px-5 md:px-6 py-16 md:py-16 text-center space-y-4 md:space-y-5 bg-black/55 backdrop-blur-xl rounded-[1.75rem] md:rounded-[2.5rem] border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.9)]"
      >
        <p className="text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.3em] text-slate-300">
          Scene {index + 1} / {total}
        </p>
        <h1 className="text-2xl md:text-5xl font-light leading-tight text-slate-50">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs md:text-base text-slate-100">{subtitle}</p>
        )}
        {description && (
          <p className="text-[0.7rem] md:text-sm text-slate-300 max-w-2xl mx-auto">
            {description}
          </p>
        )}
        {children}
      </motion.div>

      {index === 0 && (
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[0.75rem] text-slate-200 hidden sm:flex flex-col items-center gap-1"
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

function ThreeDCard({ delay }: { delay: number }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (y / rect.height) * -12;
    const rotateY = (x / rect.width) * 12;
    setRotation({ x: rotateX, y: rotateY });
  }

  function handleMouseLeave() {
    setRotation({ x: 0, y: 0 });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay,
        duration: 0.7,
        ease: [0.23, 0.86, 0.32, 0.99]
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(900px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
      }}
      className="h-32 md:h-56 rounded-2xl md:rounded-3xl bg-slate-950/80 border border-slate-700/80 shadow-[0_20px_60px_rgba(0,0,0,0.85)] transition-transform duration-150 will-change-transform overflow-hidden"
    >
      <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.22),_transparent_60%)]" />
    </motion.div>
  );
}

export default function HomePage() {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const [activeScene, setActiveScene] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [scrollDirection, setScrollDirection] =
    useState<ScrollDirection>("down");
  const [isDesktop, setIsDesktop] = useState(false);

  // detect desktop vs mobile
  useEffect(() => {
    const check = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const featured = products[0];
  const newIn = products.slice(1, 4);
  const scenesCount = 4;

  const sceneNames = [
    "Welcome · Front Page",
    "AI Scent Stylist",
    "Featured Perfume of the Week",
    "New In · Fresh Arrivals"
  ];

  // DESKTOP: wheel → snap slide-by-slide
  useEffect(() => {
    if (!isDesktop) return;

    const velRef = { current: 0 };
    const animatingRef = { current: false };
    const currentIndexRef = { current: 0 };

    const handleWheel = (e: WheelEvent) => {
      const delta = e.deltaY;

      const smoothed = smooth(velRef.current, delta, 0.15);
      velRef.current = smoothed;
      setScrollVelocity(smoothed);

      if (Math.abs(delta) < 25) return;

      const direction: ScrollDirection = delta > 0 ? "down" : "up";
      setScrollDirection(direction);

      if (animatingRef.current) {
        e.preventDefault();
        return;
      }

      const sections =
        document.querySelectorAll<HTMLElement>("section[data-scene]");
      if (!sections.length) return;

      let nextIndex =
        currentIndexRef.current + (direction === "down" ? 1 : -1);
      nextIndex = Math.max(0, Math.min(scenesCount - 1, nextIndex));
      if (nextIndex === currentIndexRef.current) return;

      animatingRef.current = true;
      e.preventDefault();

      const targetSection = sections[nextIndex];
      const top = targetSection.offsetTop;

      window.scrollTo({ top, behavior: "smooth" });

      currentIndexRef.current = nextIndex;
      setActiveScene(nextIndex);

      const el = document.getElementById("sceneSubtitle");
      if (el) el.textContent = sceneNames[nextIndex] ?? "";

      setTimeout(() => {
        animatingRef.current = false;
      }, 900);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel as any);
  }, [isDesktop, scenesCount, sceneNames]);

  // mobile: samo lagani velocity za parallax (no snap)
  useEffect(() => {
    if (isDesktop) return;

    const handler = () => {
      // možete dodati nešto kasnije, za sada samo reset
      setScrollVelocity(0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [isDesktop]);

  // progress bar derived from activeScene
  const progressPercent =
    scenesCount > 1 ? (activeScene / (scenesCount - 1)) * 100 : 0;

  return (
    <main
      ref={mainRef}
      className="relative min-h-screen bg-black text-slate-50 overflow-x-hidden"
    >
      {/* LEFT progress bar – hidden on mobile */}
      <div className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center gap-3">
        <div className="w-[2px] h-40 bg-slate-800 rounded-full overflow-hidden">
          <div
            style={{ height: `${progressPercent}%` }}
            className="w-full bg-gradient-to-b from-amberLux to-softGold transition-[height] duration-500"
          />
        </div>
        <div className="flex flex-col gap-1">
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
                const sections =
                  document.querySelectorAll<HTMLElement>(
                    "section[data-scene]"
                  );
                const target = sections[i];
                if (!target) return;
                const top = target.offsetTop;
                window.scrollTo({ top, behavior: "smooth" });
                setActiveScene(i);
                const el = document.getElementById("sceneSubtitle");
                if (el) el.textContent = sceneNames[i] ?? "";
              }}
            />
          ))}
        </div>
      </div>

      {/* SCENES */}
      <div>
        {/* 1 – Welcome / vibe intro */}
        <SlideScene
          index={0}
          total={scenesCount}
          scrollVelocity={scrollVelocity}
          scrollDirection={scrollDirection}
          imageUrl="/section-1.jpg"
          isDesktop={isDesktop}
          title="Discover niche perfumes through aesthetics, seasons & feelings."
          subtitle="A cinematic front page for perfume obsessives."
          description="You don’t need to know notes or pyramids. Just scroll: we’ll guide you through moods, seasons and AI-powered picks."
          onActive={i => {
            setActiveScene(i);
            const el = document.getElementById("sceneSubtitle");
            if (el) el.textContent = sceneNames[i] ?? "";
          }}
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
          scrollVelocity={scrollVelocity}
          scrollDirection={scrollDirection}
          imageUrl="/section-2.jpg"
          isDesktop={isDesktop}
          title="AI Scent Stylist"
          subtitle="Your digital nose that speaks in vibe, not chemistry."
          description="Answer a visual-first quiz about your outfits, playlists and social battery. We’ll serve 3–5 perfumes with emotional explanations, not just note lists."
          onActive={i => {
            setActiveScene(i);
            const el = document.getElementById("sceneSubtitle");
            if (el) el.textContent = sceneNames[i] ?? "";
          }}
        >
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 pt-2">
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center px-4 md:px-6 py-1.5 md:py-2.5 rounded-3xl bg-gradient-to-r from-amberLux to-softGold text-ink text-[0.7rem] md:text-xs shadow-lux-soft hover:opacity-95 transition"
            >
              Start AI Scent Stylist
            </Link>
            <span className="hidden md:inline text-[0.7rem] text-slate-200 max-w-xs">
              In the full build, this slide would also show your last session,
              saved personas and how often people like you loved the picks.
            </span>
          </div>
        </SlideScene>

        {/* 3 – Featured perfume */}
        <SlideScene
          index={2}
          total={scenesCount}
          scrollVelocity={scrollVelocity}
          scrollDirection={scrollDirection}
          imageUrl="/section-3.jpg"
          isDesktop={isDesktop}
          title={
            featured
              ? `Featured perfume of the week: ${featured.name}`
              : "Featured perfume of the week"
          }
          subtitle={featured?.house}
          description={featured?.description}
          onActive={i => {
            setActiveScene(i);
            const el = document.getElementById("sceneSubtitle");
            if (el) el.textContent = sceneNames[i] ?? "";
          }}
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
          scrollVelocity={scrollVelocity}
          scrollDirection={scrollDirection}
          imageUrl="/section-4.jpg"
          isDesktop={isDesktop}
          title="New arrivals & slow perfume stories."
          subtitle="Fresh niche drops plus weekly deep dives."
          description="A rotating selection of new releases, paired with short, readable pieces about fragrance culture, notes and perfumers."
          onActive={i => {
            setActiveScene(i);
            const el = document.getElementById("sceneSubtitle");
            if (el) el.textContent = sceneNames[i] ?? "";
          }}
        >
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-xl mx-auto">
            {newIn.map((p, i) => (
              <Link key={p.id} href={`/product/${p.id}`}>
                <ThreeDCard delay={i * 0.15} />
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
  );
}
