"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { quizQuestions } from "@/lib/data";
import ResultsSkeleton from "@/components/results-skeleton";

const baseVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 20, scale: 0.98 }
};

export default function QuizPage() {
  const [index, setIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const total = quizQuestions.length;
  const router = useRouter();

  const handleOptionClick = () => {
    if (index < total - 1) {
      setIndex(prev => prev + 1);
    } else {
      // Last question → fake loading + redirect to results
      setIsSubmitting(true);
      setTimeout(() => {
        router.push("/results");
      }, 1000); // kasnije može biti realan vrijeme API poziva
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-10">
        <header className="flex items-center justify-between mb-6 md:mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-amberLux"
          >
            ← Back to discover
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-xs uppercase text-slate-400">
            <Link href="/" className="hover:text-amberLux transition">
              Discover
            </Link>
            <Link
              href="/quiz"
              className="hover:text-amberLux transition text-amberLux"
            >
              AI Scent Stylist
            </Link>
            <Link href="/checkout" className="hover:text-amberLux transition">
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
          <section className="max-w-3xl mx-auto space-y-5">
            <div className="space-y-2 text-center">
              <p className="text-[0.65rem] uppercase tracking-[0.24em] text-slate-500">
                AI Scent Stylist
              </p>
              <h1 className="text-2xl md:text-3xl font-light text-slate-50">
                Answer with your eyes, not your logic.
              </h1>
              <p className="text-sm md:text-base text-slate-400">
                We&apos;ll translate your mood, lifestyle and aesthetics into 3
                niche perfume recommendations — explained in emotion-first
                language.
              </p>
            </div>

            <motion.div
              className="rounded-3xl bg-fog/80 border border-slate-800 p-5 md:p-7 shadow-lux-soft"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-slate-400">
                  Question {index + 1} of {total}
                </span>
                <div className="w-32 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amberLux to-softGold"
                    style={{ width: `${((index + 1) / total) * 100}%` }}
                  />
                </div>
              </div>
              <h2 className="text-base md:text-lg text-slate-50 mb-4">
                {quizQuestions[index].question}
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {quizQuestions[index].options.map(option => (
                  <motion.button
                    key={option}
                    whileTap={{ scale: 0.97 }}
                    disabled={isSubmitting}
                    onClick={handleOptionClick}
                    className="rounded-2xl bg-slate-900/70 border border-slate-700 px-4 py-3 text-left text-sm text-slate-200 hover:border-amberLux hover:text-amberLux transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <p className="text-[0.7rem] text-slate-500 text-center">
              In production, each option becomes a visual card with imagery
              instead of plain text, and your answers will feed directly into
              the recommendation engine behind the Results page.
            </p>
          </section>
        </motion.main>
      </div>

      {isSubmitting && <ResultsSkeleton />}
    </>
  );
}
