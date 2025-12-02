"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type AuthStatus = "loading" | "guest" | "user";

export default function SmartHeader() {
  const [hidden, setHidden] = useState(false);
  const [authStatus, setAuthStatus] = useState<AuthStatus>("loading");
  const pathname = usePathname();
  const router = useRouter();

  // jedan Supabase client za ovaj header
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  // scroll hide/show
  useEffect(() => {
    let lastScroll = 0;
    let timeout: any;

    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScroll && current > 50) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScroll = current;

      clearTimeout(timeout);
      timeout = setTimeout(() => setHidden(false), 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ➜ inicijalno provjeri usera (nema više fetch /api/auth/user)
  useEffect(() => {
    let canceled = false;

    const checkAuth = async () => {
      try {
        const {
          data: { user },
          error
        } = await supabase.auth.getUser();

        if (error) {
          console.error("Error getting user in header:", error.message);
        }

        if (!canceled) {
          setAuthStatus(user ? "user" : "guest");
        }
      } catch (e) {
        console.error("Unexpected auth error in header:", e);
        if (!canceled) setAuthStatus("guest");
      }
    };

    checkAuth();

    return () => {
      canceled = true;
    };
  }, [supabase]);

  // ➜ slušaj promjene auth state-a (login/logout) da se header odmah osvježi
  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthStatus(session ? "user" : "guest");
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.error("Logout error:", e);
    } finally {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <motion.header
      animate={hidden ? { y: -80, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-ink/80 backdrop-blur-xl border-b border-slate-800/60"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-2">
        {/* TOP ROW: logo + actions */}
        <div className="flex items-center justify-between gap-3">
          {/* LEFT: Logo + dynamic scene subtitle */}
          <Link href="/" className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-full bg-amberLux shadow-md" />
            <div className="flex flex-col">
              <span className="tracking-[0.25em] text-[0.7rem] text-slate-200 uppercase">
                PARFEMI
              </span>
              <span
                id="sceneSubtitle"
                className="text-[0.7rem] text-slate-500 mt-0.5 transition-opacity duration-300 line-clamp-1"
              >
                Welcome · Front Page
              </span>
            </div>
          </Link>

          {/* RIGHT: main actions (desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-[0.7rem] uppercase text-slate-400">
            <Link
              href="/"
              className={`hover:text-amberLux transition ${
                isActive("/") ? "text-amberLux" : ""
              }`}
            >
              Home
            </Link>
            <Link
              href="/profile/library"
              className={`hover:text-amberLux transition ${
                isActive("/profile/library") ? "text-amberLux" : ""
              }`}
            >
              My Library
            </Link>
            <Link
              href="/quiz"
              className={`hover:text-amberLux transition ${
                isActive("/quiz") ? "text-amberLux" : ""
              }`}
            >
              AI Scent Stylist
            </Link>

            {/* CONDITIONAL: Log in vs Profile/Logout */}
            {authStatus === "user" ? (
              <>
                <Link
                  href="/profile"
                  className={`hover:text-amberLux transition ${
                    isActive("/profile") ? "text-amberLux" : ""
                  }`}
                >
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="hover:text-amberLux transition text-slate-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className={`hover:text-amberLux transition ${
                  isActive("/login") ? "text-amberLux" : ""
                }`}
              >
                Log in
              </Link>
            )}
          </nav>

          {/* RIGHT: compact actions (mobile) */}
          <nav className="flex md:hidden items-center gap-2 text-[0.7rem] text-slate-300">
            <Link
              href="/quiz"
              className={`px-2 py-1 rounded-2xl border border-slate-700/80 bg-black/40 hover:border-amberLux hover:text-amberLux transition ${
                isActive("/quiz") ? "border-amberLux text-amberLux" : ""
              }`}
            >
              AI
            </Link>
            <Link
              href="/profile/library"
              className={`px-2 py-1 rounded-2xl border border-slate-700/80 bg-black/40 hover:border-amberLux hover:text-amberLux transition ${
                isActive("/profile/library")
                  ? "border-amberLux text-amberLux"
                  : ""
              }`}
            >
              Lib
            </Link>

            {authStatus === "user" ? (
              <>
                <Link
                  href="/profile"
                  className={`px-2 py-1 rounded-2xl border border-slate-700/80 bg-black/40 hover:border-amberLux hover:text-amberLux transition ${
                    isActive("/profile") ? "border-amberLux text-amberLux" : ""
                  }`}
                >
                  Me
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-2 py-1 rounded-2xl border border-slate-700/80 bg-black/40 hover:border-red-500 hover:text-red-300 transition"
                >
                  Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className={`px-2 py-1 rounded-2xl border border-slate-700/80 bg-black/40 hover:border-amberLux hover:text-amberLux transition ${
                  isActive("/login") ? "border-amberLux text-amberLux" : ""
                }`}
              >
                Log in
              </Link>
            )}
          </nav>
        </div>

        {/* BOTTOM ROW: vibe segmented control */}
        <div className="flex items-center justify-center">
          <div className="inline-flex w-full md:w-auto items-center gap-1 rounded-3xl bg-black/40 border border-slate-800/70 px-1 py-1 overflow-x-auto no-scrollbar">
            <Link
              href="/aesthetic"
              className={`text-[0.7rem] md:text-xs px-3 py-1.5 rounded-2xl whitespace-nowrap transition ${
                isActive("/aesthetic")
                  ? "bg-amberLux text-ink"
                  : "text-slate-300 hover:text-amberLux hover:bg-slate-900/60"
              }`}
            >
              Aesthetic sections
            </Link>
            <Link
              href="/seasonal"
              className={`text-[0.7rem] md:text-xs px-3 py-1.5 rounded-2xl whitespace-nowrap transition ${
                isActive("/seasonal")
                  ? "bg-amberLux text-ink"
                  : "text-slate-300 hover:text-amberLux hover:bg-slate-900/60"
              }`}
            >
              Seasonal vibes
            </Link>
            <Link
              href="/feels"
              className={`text-[0.7rem] md:text-xs px-3 py-1.5 rounded-2xl whitespace-nowrap transition ${
                isActive("/feels")
                  ? "bg-amberLux text-ink"
                  : "text-slate-300 hover:text-amberLux hover:bg-slate-900/60"
              }`}
            >
              In my feels / mood
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
