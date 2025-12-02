"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { quizQuestions } from "@/lib/data";
import ResultsSkeleton from "@/components/results-skeleton";

const baseVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 20, scale: 0.98 }
};

type Intensity = "soft" | "moderate" | "loud" | null;
type Budget = "low" | "medium" | "high" | null;

export default function QuizPage() {
  const router = useRouter();

  const totalQuestionSteps = quizQuestions.length;
  // +1 intensity +1 budget +1 free-text persona
  const extraSteps = 3;
  const totalSteps = totalQuestionSteps + extraSteps;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [intensity, setIntensity] = useState<Intensity>(null);
  const [budget, setBudget] = useState<Budget>(null);
  const [personaText, setPersonaText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLastStep = step === totalSteps - 1;

  const goNext = () => {
    if (step < totalSteps - 1) {
      setStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleOptionClick = (option: string) => {
    // store answer for this question index
    const nextAnswers = [...answers];
    nextAnswers[step] = option;
    setAnswers(nextAnswers);
    goNext();
  };

  const handleSkip = () => {
    // Skipping just advances the step without recording anything
    goNext();
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    const enrichedAnswers: string[] = [...answers];

    if (intensity) {
      enrichedAnswers.push(`Intensity preference: ${intensity}`);
    } else {
      enrichedAnswers.push("Intensity preference: no strong preference");
    }

    if (budget) {
      enrichedAnswers.push(`Budget: ${budget}`);
    } else {
      enrichedAnswers.push("Budget: flexible / not specified");
    }

    if (personaText.trim().length > 0) {
      enrichedAnswers.push(`Desired vibe description: ${personaText.trim()}`);
    }

    const params = new URLSearchParams();
    if (enrichedAnswers.length > 0) {
      params.set("answers", JSON.stringify(enrichedAnswers));
    }
    params.set("limit", "3");

    setTimeout(() => {
      router.push(`/results?${params.toString()}`);
    }, 800);
  };

  // Progress text
  const displayStep = Math.min(step + 1, totalSteps);

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

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                className="rounded-3xl bg-fog/80 border border-slate-800 p-5 md:p-7 shadow-lux-soft"
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.97 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-slate-400">
                    Step {displayStep} of {totalSteps}
                  </span>
                  <div className="w-32 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amberLux to-softGold"
                      style={{
                        width: `${(displayStep / totalSteps) * 100}%`
                      }}
                    />
                  </div>
                </div>

                {/* Core choice questions */}
                {step < totalQuestionSteps && (
                  <>
                    <h2 className="text-base md:text-lg text-slate-50 mb-4">
                      {quizQuestions[step].question}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-3">
                      {quizQuestions[step].options.map(option => (
                        <motion.button
                          key={option}
                          whileTap={{ scale: 0.97 }}
                          disabled={isSubmitting}
                          onClick={() => handleOptionClick(option)}
                          className="rounded-2xl bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-slate-900/40 border border-slate-700/80 px-4 py-3 text-left text-sm text-slate-200 hover:border-amberLux hover:text-amberLux transition disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          <span className="block text-sm">{option}</span>
                        </motion.button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={handleSkip}
                      className="mt-4 text-[0.7rem] text-slate-500 hover:text-slate-300 underline underline-offset-4"
                    >
                      Skip this question
                    </button>
                  </>
                )}

                {/* Intensity step */}
                {step === totalQuestionSteps && (
                  <>
                    <h2 className="text-base md:text-lg text-slate-50 mb-4">
                      How loud do you want your scent to feel?
                    </h2>
                    <p className="text-xs text-slate-400 mb-4">
                      We&apos;ll avoid recommending perfumes that are too shy
                      or too aggressive for your taste.
                    </p>
                    <div className="flex flex-col gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIntensity("soft");
                          goNext();
                        }}
                        className={`rounded-2xl px-4 py-3 text-left text-sm border ${
                          intensity === "soft"
                            ? "border-amberLux text-amberLux bg-slate-900/70"
                            : "border-slate-700 text-slate-200 bg-slate-900/40 hover:border-amberLux hover:text-amberLux"
                        } transition`}
                      >
                        Soft — close-skin, intimate, only noticed up close.
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIntensity("moderate");
                          goNext();
                        }}
                        className={`rounded-2xl px-4 py-3 text-left text-sm border ${
                          intensity === "moderate"
                            ? "border-amberLux text-amberLux bg-slate-900/70"
                            : "border-slate-700 text-slate-200 bg-slate-900/40 hover:border-amberLux hover:text-amberLux"
                        } transition`}
                      >
                        Moderate — present, noticeable, but never too much.
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIntensity("loud");
                          goNext();
                        }}
                        className={`rounded-2xl px-4 py-3 text-left text-sm border ${
                          intensity === "loud"
                            ? "border-amberLux text-amberLux bg-slate-900/70"
                            : "border-slate-700 text-slate-200 bg-slate-900/40 hover:border-amberLux hover:text-amberLux"
                        } transition`}
                      >
                        Loud — statement-making, room-filling, unapologetic.
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={handleSkip}
                      className="mt-4 text-[0.7rem] text-slate-500 hover:text-slate-300 underline underline-offset-4"
                    >
                      I&apos;m not sure, surprise me
                    </button>
                  </>
                )}

                {/* Budget step */}
                {step === totalQuestionSteps + 1 && (
                  <>
                    <h2 className="text-base md:text-lg text-slate-50 mb-4">
                      What&apos;s your comfort zone for a bottle?
                    </h2>
                    <p className="text-xs text-slate-400 mb-4">
                      This doesn&apos;t lock you in — it just helps us avoid
                      recommending things wildly outside your range.
                    </p>
                    <div className="grid md:grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setBudget("low");
                          goNext();
                        }}
                        className={`rounded-2xl px-4 py-3 text-left text-sm border ${
                          budget === "low"
                            ? "border-amberLux text-amberLux bg-slate-900/70"
                            : "border-slate-700 text-slate-200 bg-slate-900/40 hover:border-amberLux hover:text-amberLux"
                        } transition`}
                      >
                        Up to ~€70 <br />
                        <span className="text-[0.7rem] text-slate-400">
                          Smart buys, good value.
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setBudget("medium");
                          goNext();
                        }}
                        className={`rounded-2xl px-4 py-3 text-left text-sm border ${
                          budget === "medium"
                            ? "border-amberLux text-amberLux bg-slate-900/70"
                            : "border-slate-700 text-slate-200 bg-slate-900/40 hover:border-amberLux hover:text-amberLux"
                        } transition`}
                      >
                        ~€70–150 <br />
                        <span className="text-[0.7rem] text-slate-400">
                          Mix of designer & niche.
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setBudget("high");
                          goNext();
                        }}
                        className={`rounded-2xl px-4 py-3 text-left text-sm border ${
                          budget === "high"
                            ? "border-amberLux text-amberLux bg-slate-900/70"
                            : "border-slate-700 text-slate-200 bg-slate-900/40 hover:border-amberLux hover:text-amberLux"
                        } transition`}
                      >
                        €150+ <br />
                        <span className="text-[0.7rem] text-slate-400">
                          I&apos;m open to indulgence.
                        </span>
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={handleSkip}
                      className="mt-4 text-[0.7rem] text-slate-500 hover:text-slate-300 underline underline-offset-4"
                    >
                      Skip — show me a mix
                    </button>
                  </>
                )}

                {/* Free-text persona step */}
                {step === totalQuestionSteps + 2 && (
                  <>
                    <h2 className="text-base md:text-lg text-slate-50 mb-3">
                      In 1–2 sentences, describe the vibe you want to give off.
                    </h2>
                    <p className="text-xs text-slate-400 mb-4">
                      Don&apos;t overthink it. Think:{" "}
                      <span className="italic">
                        “quiet luxury bookworm”, “chaotic nightlife angel”,
                        “dark wine-stained romantic”
                      </span>
                      .
                    </p>
                    <textarea
                      value={personaText}
                      onChange={e => setPersonaText(e.target.value)}
                      rows={4}
                      className="w-full rounded-2xl bg-slate-950/70 border border-slate-700 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amberLux resize-none"
                      placeholder="Write a few words that feel like your future self in scent form..."
                    />
                    <div className="mt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handleSkip}
                        className="text-[0.7rem] text-slate-500 hover:text-slate-300 underline underline-offset-4"
                      >
                        Skip — let the AI infer it
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs uppercase tracking-[0.2em] bg-amberLux text-slate-950 hover:bg-softGold transition disabled:opacity-60 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                      >
                        See my matches
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <p className="text-[0.7rem] text-slate-500 text-center">
              Your choices, intensity, budget and vibe description feed directly
              into the AI recommendation engine behind the Results page.
            </p>
          </section>
        </motion.main>
      </div>

      {isSubmitting && <ResultsSkeleton />}
    </>
  );
}
