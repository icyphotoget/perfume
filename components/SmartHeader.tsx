"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

type AuthStatus = "loading" | "guest" | "user";

export default function SmartHeader() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authStatus, setAuthStatus] = useState<AuthStatus>("loading");

  const pathname = usePathname();
  const router = useRouter();

  /* Hide/show on scroll */
  useEffect(() => {
    let last = 0;
    let timeout: any;

    const onScroll = () => {
      const cur = window.scrollY;
      if (cur > last && cur > 50) setHidden(true);
      else setHidden(false);
      last = cur;

      clearTimeout(timeout);
      timeout = setTimeout(() => setHidden(false), 200);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close menu on navigation */
  useEffect(() => setMenuOpen(false), [pathname]);

  /* Get auth status */
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const r = await fetch("/api/auth/user", {
          credentials: "include"
        });
        if (!cancelled) setAuthStatus(r.ok ? "user" : "guest");
      } catch {
        if (!cancelled) setAuthStatus("guest");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    } catch {}
    router.push("/");
    router.refresh();
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <motion.header
      animate={hidden ? { y: -80, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-x-0 top-0 z-50 pointer-events-none"
    >
      <div className="mx-auto mt-3 max-w-6xl px-4 pointer-events-auto">
        <div className="
          flex h-12 items-center justify-between 
          rounded-full bg-black/40 backdrop-blur-2xl 
          shadow-[0_10px_50px_rgba(0,0,0,0.7)] 
          px-5
        ">
          {/* LEFT — LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amberLux shadow-[0_0_15px_rgba(245,197,120,0.9)]">
              <span className="font-body text-[0.7rem] font-semibold tracking-[0.18em] text-ink">
                P
              </span>
            </div>
            <span className="font-body text-[0.65rem] uppercase tracking-[0.28em] text-slate-100">
              Parfemi
            </span>
          </Link>

          {/* CENTER — Main nav */}
          <nav className="hidden md:flex items-center gap-6">
            <CenterLink href="/aesthetic" active={isActive("/aesthetic")}>
              Aesthetic
            </CenterLink>
            <CenterLink href="/seasonal" active={isActive("/seasonal")}>
              Seasonal
            </CenterLink>
            <CenterLink href="/feels" active={isActive("/feels")}>
              Feels
            </CenterLink>
            <CenterLink href="/take-me" active={isActive("/take-me")}>
              Take me to…
            </CenterLink>
          </nav>

          {/* RIGHT — MENU button */}
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="
              group flex h-9 w-9 items-center justify-center 
              rounded-full bg-black/40 
              text-slate-200 hover:text-amberLux 
              shadow-[0_8px_30px_rgba(0,0,0,0.6)]
            "
          >
            <span className="relative flex h-3 w-4 flex-col justify-between">
              <span className="h-[1px] w-full bg-current" />
              <span className="h-[1px] w-3/4 self-end bg-current opacity-80" />
            </span>
          </button>

          {/* DROPDOWN PANEL */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 10 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className="
                  absolute right-4 top-14 w-60 rounded-3xl 
                  bg-black/85 backdrop-blur-2xl 
                  shadow-[0_20px_60px_rgba(0,0,0,0.9)] 
                  border border-white/5 p-4
                "
              >
                <DropdownLink href="/" active={isActive("/")}>
                  Home
                </DropdownLink>

                <DropdownLink href="/profile/library" active={isActive("/profile/library")}>
                  My Library
                </DropdownLink>

                <DropdownLink href="/quiz" active={isActive("/quiz")}>
                  AI Scent Stylist
                </DropdownLink>

                <DropdownLink href="/results" active={isActive("/results")}>
                  Sample Results
                </DropdownLink>

                <div className="my-3 h-px bg-white/10"></div>

                {authStatus === "user" ? (
                  <>
                    <DropdownLink href="/profile" active={isActive("/profile")}>
                      Profile
                    </DropdownLink>

                    <button
                      onClick={logout}
                      className="
                        mt-2 w-full rounded-full border border-red-400/50 
                        px-3 py-1 text-[0.7rem] 
                        font-body uppercase tracking-[0.22em] 
                        text-red-200 hover:bg-red-500/10
                      "
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <DropdownLink href="/login" active={isActive("/login")}>
                    Log in
                  </DropdownLink>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}

/* CENTER NAV BUTTON */
function CenterLink({ href, active, children }: any) {
  return (
    <Link
      href={href}
      className={`
        font-body text-[0.65rem] uppercase tracking-[0.22em] transition 
        ${active ? "text-amberLux" : "text-slate-300 hover:text-amberLux"}
      `}
    >
      {children}
    </Link>
  );
}

/* DROPDOWN ITEM */
function DropdownLink({ href, active, children }: any) {
  return (
    <Link
      href={href}
      className={`
        block rounded-xl px-3 py-2 
        font-body text-[0.7rem] uppercase tracking-[0.22em] transition
        ${
          active
            ? "bg-amberLux/90 text-ink"
            : "text-slate-200 hover:bg-slate-900/60 hover:text-amberLux"
        }
      `}
    >
      {children}
    </Link>
  );
}
