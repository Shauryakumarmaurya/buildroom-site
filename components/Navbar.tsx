"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { useApply } from "./ApplyProvider";

const links = [
  { href: "#how", label: "how it works" },
  { href: "#cohort", label: "cohort" },
  { href: "#founders", label: "founders" },
];

export function Navbar() {
  const { openApply } = useApply();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleApply = () => {
    setMobileOpen(false);
    openApply();
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-200 ${
        scrolled ? "bg-white/85 backdrop-blur-md" : "bg-white"
      }`}
      style={{ borderBottom: "0.5px solid var(--hairline)" }}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex h-14 items-center justify-between">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="-ml-1 px-1 py-1 rounded-md hover:opacity-80 transition-opacity"
            aria-label="buildroom home"
          >
            <Logo />
          </button>

          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className="text-sm text-ink/65 hover:text-ink transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={openApply}
              className="inline-flex items-center justify-center rounded-full bg-ink text-white text-sm px-4 py-1.5 hover:bg-ink/90 transition-colors"
            >
              apply now
            </button>
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? "close menu" : "open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden flex items-center justify-center h-9 w-9 -mr-1.5 rounded-md text-ink"
          >
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
              <motion.path
                d="M1 1H17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={mobileOpen ? { d: "M2 12L16 2" } : { d: "M1 1H17" }}
                transition={{ duration: 0.2 }}
              />
              <motion.path
                d="M1 7H17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.path
                d="M1 13H17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={mobileOpen ? { d: "M2 2L16 12" } : { d: "M1 13H17" }}
                transition={{ duration: 0.2 }}
              />
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            className="md:hidden overflow-hidden bg-white"
            style={{ borderTop: "0.5px solid var(--hairline)" }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-5 py-4 flex flex-col">
              {links.map((l) => (
                <button
                  key={l.href}
                  onClick={() => handleNav(l.href)}
                  className="py-3 text-left text-base text-ink/80 hover:text-ink"
                  style={{ borderBottom: "0.5px solid var(--hairline)" }}
                >
                  {l.label}
                </button>
              ))}
              <button
                type="button"
                onClick={handleApply}
                className="mt-4 inline-flex items-center justify-center rounded-full bg-ink text-white text-sm px-4 py-2.5 hover:bg-ink/90 transition-colors"
              >
                apply now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
