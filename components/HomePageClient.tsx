"use client";

import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function HomePageClient() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  return (
    <div className="relative h-[calc(100vh-64px)] bg-[#f0d5c2] text-slate-900">
      {/* top progress bar */}
      <motion.div
        className="pointer-events-none absolute left-0 top-0 z-30 h-[2px] w-full origin-left bg-gradient-to-r from-[#2f4e5f] via-[#d26159] to-[#1d2935]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* scroll container */}
      <div
        ref={containerRef}
        className="h-full snap-y snap-mandatory overflow-y-scroll scroll-smooth"
      >
        {/* SECTION 1 – WELCOME / HERO */}
        <section className="snap-start">
          <div className="relative mx-auto flex h-[calc(100vh-64px)] max-w-6xl flex-col gap-10 px-4 pb-10 pt-10 lg:px-0 lg:pt-14">
            {/* abstract shapes in background */}
            <div className="pointer-events-none absolute -left-20 top-24 h-64 w-64 rounded-[40%] bg-[#d26159] opacity-70" />
            <div className="pointer-events-none absolute right-[-60px] top-40 h-72 w-72 rounded-[45%] bg-[#547789] opacity-80" />

            {/* header strip */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 flex items-center justify-between border-b border-black/10 pb-4 text-[11px] uppercase tracking-[0.32em] text-slate-700"
            >
              <span>Parfemi · Niche perfume studio</span>
              <span className="hidden md:inline">
                Discover scents by mood, season &amp; aesthetic
              </span>
            </motion.div>

            {/* hero content */}
            <div className="relative z-10 grid flex-1 gap-8 md:grid-cols-[1.2fr_minmax(0,0.95fr)] md:items-center">
              {/* large image */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative overflow-hidden rounded-[32px] border border-black/5 bg-[#f7e3d4] shadow-[0_26px_70px_rgba(0,0,0,0.18)]"
              >
                {/* replace with your own image */}
                <div className="relative h-72 w-full overflow-hidden sm:h-80">
                  <div className="absolute inset-0 bg-[url('/images/perfume-desk.jpg')] bg-cover bg-center" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                <div className="space-y-2 px-6 pb-5 pt-3 text-sm text-slate-900/85">
                  <p className="text-[11px] uppercase tracking-[0.26em] text-slate-700">
                    Welcome · Your scented moodboard
                  </p>
                  <p>
                    Flatlays, desk chaos, half-drunk coffee and the bottles that
                    live in the middle of it all.
                  </p>
                </div>
              </motion.div>

              {/* text card */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
                className="space-y-6 rounded-[24px] bg-[#f7e6d7]/90 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.15)]"
              >
                <h1 className="text-3xl font-semibold tracking-[0.04em] text-[#1d2935] sm:text-[34px]">
                  Welcome to Parfemi,{" "}
                  <span className="font-normal">
                    a perfume library built like a lifestyle moodboard.
                  </span>
                </h1>
                <p className="text-sm leading-relaxed text-slate-800/90">
                  Discover niche and indie scents through cozy visuals, colour
                  blocks and stories. No “for him / for her” — just scenes from
                  real life, matched with perfumes that actually feel like you.
                </p>
                <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.22em]">
                  <Link href="/aesthetic">
                    <button className="rounded-full bg-[#2f4e5f] px-5 py-2.5 text-xs font-medium text-[#fdf3ea] shadow-md transition hover:bg-[#233845]">
                      Explore by aesthetic
                    </button>
                  </Link>
                  <Link href="/quiz">
                    <button className="rounded-full border border-[#2f4e5f] bg-transparent px-5 py-2.5 text-xs font-medium text-[#2f4e5f] transition hover:bg-[#2f4e5f]/10">
                      Try the scent quiz
                    </button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 2 – THREE FEATURE CARDS (MOOD / SEASON / LIBRARY) */}
        <section className="snap-start">
          <div className="relative mx-auto flex h-[calc(100vh-64px)] max-w-6xl flex-col gap-8 px-4 pb-10 pt-10 lg:px-0 lg:pt-14">
            {/* coloured background band */}
            <div className="pointer-events-none absolute inset-x-[-80px] bottom-10 top-10 bg-[#547789]" />

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative z-10 flex items-center justify-between text-[#fbe9dd]"
            >
              <h2 className="text-xl font-semibold tracking-[0.12em] uppercase">
                Choose how you want to explore
              </h2>
              <p className="hidden text-xs uppercase tracking-[0.2em] md:inline">
                Mood · Season · Library
              </p>
            </motion.div>

            <div className="relative z-10 grid flex-1 gap-6 md:grid-cols-3">
              <FeatureCard
                background="#f7e3d4"
                label="Mood"
                title="In my feels"
                description="Dark academia, soft goblin, Sunday reset. Browse scents grouped like Pinterest boards, not perfume counters."
                href="/feels"
                image="/images/perfume-mood.jpg"
              />
              <FeatureCard
                background="#fbe9dd"
                label="Season"
                title="Weather & rituals"
                description="Foggy trams, August heat, first cold morning. Build micro-wardrobes that match your climate and habits."
                href="/seasonal"
                image="/images/perfume-season.jpg"
              />
              <FeatureCard
                background="#f7e6d7"
                label="Library"
                title="Your bottles, your notes"
                description="Save favourites, track samples, note how they wear on your skin. Slowly build a library that actually fits your life."
                href="/library"
                image="/images/perfume-library.jpg"
              />
            </div>
          </div>
        </section>

        {/* SECTION 3 – ABOUT / WHO WE ARE */}
        <section className="snap-start">
          <div className="relative mx-auto flex h-[calc(100vh-64px)] max-w-6xl flex-col gap-8 px-4 pb-10 pt-10 lg:px-0 lg:pt-14">
            <div className="pointer-events-none absolute -right-16 top-12 h-64 w-64 rounded-[45%] bg-[#d26159] opacity-80" />
            <div className="pointer-events-none absolute -left-24 bottom-4 h-72 w-72 rounded-[50%] bg-[#547789] opacity-80" />

            <div className="relative z-10 grid flex-1 gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center">
              {/* text block */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.4 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="rounded-[24px] bg-[#fdf3ea]/95 p-6 shadow-[0_22px_60px_rgba(0,0,0,0.16)]"
              >
                <h3 className="mb-3 text-sm uppercase tracking-[0.32em] text-slate-600">
                  Who are we?
                </h3>
                <h2 className="mb-4 text-2xl font-semibold tracking-[0.04em] text-[#1d2935]">
                  Scent nerds who care more about your life than note pyramids.
                </h2>
                <p className="mb-4 text-sm leading-relaxed text-slate-800/90">
                  Parfemi is a tiny online studio obsessed with mood, texture
                  and everyday rituals. We build playful tools that help you
                  discover niche perfumes without needing to know every molecule.
                </p>
                <p className="text-sm leading-relaxed text-slate-800/80">
                  Think of this website as a mix of an online magazine, a
                  scrapbook and a personal scent assistant. You scroll for
                  inspiration, save what you love, and let the AI do the heavy
                  lifting when you&apos;re ready to commit.
                </p>

                <Link href="/profile">
                  <button className="mt-5 rounded-full border border-[#2f4e5f] px-5 py-2 text-xs uppercase tracking-[0.2em] text-[#2f4e5f] transition hover:bg-[#2f4e5f]/10">
                    Meet your scent profile
                  </button>
                </Link>
              </motion.div>

              {/* large lifestyle image */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.4 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
                className="relative overflow-hidden rounded-[32px] border border-black/5 bg-[#f7e3d4] shadow-[0_26px_70px_rgba(0,0,0,0.2)]"
              >
                <div className="relative h-80 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/images/perfume-desk2.jpg')] bg-cover bg-center" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 4 – WHAT PARFEMI DOES / AI STYLIST CTA */}
        <section className="snap-start">
          <div className="relative mx-auto flex h-[calc(100vh-64px)] max-w-6xl flex-col gap-8 px-4 pb-10 pt-10 lg:px-0 lg:pt-14">
            <div className="pointer-events-none absolute inset-x-[-80px] top-16 bottom-10 bg-[#f7e3d4]" />

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative z-10 text-center"
            >
              <h3 className="text-xs uppercase tracking-[0.3em] text-slate-600">
                What does Parfemi actually do?
              </h3>
              <h2 className="mt-2 text-2xl font-semibold tracking-[0.04em] text-[#1d2935]">
                Turns your scrolling into a scent wardrobe — with a little help
                from AI.
              </h2>
            </motion.div>

            <div className="relative z-10 grid flex-1 gap-8 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-center">
              {/* explanation card */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.4 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="rounded-[24px] bg-[#fdf3ea] p-6 text-sm leading-relaxed text-slate-800/90 shadow-[0_22px_60px_rgba(0,0,0,0.16)]"
              >
                <p>
                  You wander through aesthetics, seasons and moods, saving
                  anything that feels like you. Behind the scenes, the AI Scent
                  Stylist quietly learns your patterns — what you linger on,
                  what you ignore, what you already own.
                </p>
                <p className="mt-3">
                  When you finally open the quiz, it&apos;s not a generic form.
                  It&apos;s the last chapter of the magazine you&apos;ve just
                  read — tuned to your taste, skin and budget.
                </p>
                <ul className="mt-4 space-y-2 text-xs">
                  <li>· No endless browsing of random bottles.</li>
                  <li>· No pressure to buy anything immediately.</li>
                  <li>· Just a shortlist that makes suspiciously perfect sense.</li>
                </ul>

                <div className="mt-5 flex flex-wrap justify-center gap-3 text-[11px] uppercase tracking-[0.22em]">
                  <Link href="/quiz">
                    <button className="rounded-full bg-[#2f4e5f] px-5 py-2.5 text-xs font-medium text-[#fdf3ea] shadow-md transition hover:bg-[#233845]">
                      Open the scent stylist
                    </button>
                  </Link>
                  <Link href="/results">
                    <button className="rounded-full border border-[#2f4e5f] bg-transparent px-5 py-2.5 text-xs font-medium text-[#2f4e5f] transition hover:bg-[#2f4e5f]/10">
                      See sample recommendations
                    </button>
                  </Link>
                </div>
              </motion.div>

              {/* chat preview / UI-style box */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.4 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
                className="rounded-[24px] bg-[#547789] p-5 text-xs text-[#fbe9dd] shadow-[0_22px_60px_rgba(0,0,0,0.25)]"
              >
                <p className="mb-3 text-[11px] uppercase tracking-[0.26em] text-[#fdf3ea]/80">
                  Preview · Chatting with the stylist
                </p>
                <div className="space-y-3">
                  <div className="inline-block max-w-[90%] rounded-2xl bg-white/10 px-4 py-3">
                    I want something cozy for home, but not too sweet. I live in
                    a small apartment and my partner hates heavy perfumes.
                  </div>
                  <div className="flex justify-end">
                    <div className="inline-block max-w-[90%] rounded-2xl bg-black/15 px-4 py-3">
                      Noted: cozy, low projection, zero cupcake. I&apos;ll pull
                      3 bottles that feel like soft knitwear and open windows.
                    </div>
                  </div>
                  <div className="inline-block max-w-[90%] rounded-2xl bg-white/10 px-4 py-3">
                    We&apos;ll start with a skin-scent musk, a milky wood, and a
                    subtle vanilla-with-bite. Nothing that lingers after you
                    leave the room.
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

type FeatureCardProps = {
  background: string;
  label: string;
  title: string;
  description: string;
  href: string;
  image: string;
};

function FeatureCard({
  background,
  label,
  title,
  description,
  href,
  image,
}: FeatureCardProps) {
  return (
    <Link href={href}>
      <motion.article
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ duration: 0.18 }}
        className="flex h-full flex-col overflow-hidden rounded-[28px] border border-black/5 bg-[#fdf3ea] shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
        style={{ backgroundColor: background }}
      >
        <div className="relative h-40 w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
        </div>
        <div className="flex flex-1 flex-col justify-between px-4 pb-4 pt-3">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-700">
              {label}
            </p>
            <h3 className="text-base font-semibold tracking-[0.04em] text-[#1d2935]">
              {title}
            </h3>
            <p className="text-xs leading-relaxed text-slate-800/90">
              {description}
            </p>
          </div>
          <span className="mt-3 text-[10px] uppercase tracking-[0.26em] text-slate-700">
            Discover →
          </span>
        </div>
      </motion.article>
    </Link>
  );
}
