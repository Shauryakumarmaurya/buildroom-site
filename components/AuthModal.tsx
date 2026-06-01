"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";

type Status = "idle" | "sending" | "sent" | "error";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export function AuthModal() {
  const { isAuthOpen, closeAuth, signInWithEmail, signInWithGoogle, authEnabled } =
    useAuth();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    if (!isAuthOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAuth();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isAuthOpen, closeAuth]);

  useEffect(() => {
    if (!isAuthOpen) {
      const t = setTimeout(() => {
        setStatus("idle");
        setErrorMsg("");
        setEmail("");
        setShowEmail(false);
        setGoogleLoading(false);
      }, 250);
      return () => clearTimeout(t);
    }
  }, [isAuthOpen]);

  const handleGoogle = async () => {
    setGoogleLoading(true);
    setErrorMsg("");
    const { error } = await signInWithGoogle();
    if (error) {
      setErrorMsg(error);
      setStatus("error");
      setGoogleLoading(false);
    }
    // on success the browser redirects to Google, so no further state needed
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmail(email.trim())) {
      setErrorMsg("please enter a valid email.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setErrorMsg("");
    const { error } = await signInWithEmail(email.trim());
    if (error) {
      setErrorMsg(error);
      setStatus("error");
      return;
    }
    setStatus("sent");
  };

  return (
    <AnimatePresence>
      {isAuthOpen && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <motion.button
            type="button"
            aria-label="close login"
            onClick={closeAuth}
            className="absolute inset-0 bg-ink/30 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-title"
            className="relative w-full sm:max-w-sm bg-white border-hairline-all sm:rounded-2xl rounded-t-2xl overflow-hidden"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b-hairline">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand" />
                <span className="text-sm text-ink/70">log in to buildroom</span>
              </div>
              <button
                type="button"
                onClick={closeAuth}
                aria-label="close"
                className="text-ink/50 hover:text-ink transition-colors text-sm"
              >
                close
              </button>
            </div>

            {status === "sent" ? (
              <div className="px-6 py-10 text-center">
                <div className="mx-auto mb-4 h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center">
                  <span className="h-2.5 w-2.5 rounded-full bg-brand" />
                </div>
                <h3 className="text-lg tracking-tightish text-ink">check your email.</h3>
                <p className="mt-2 text-sm text-ink/60 max-w-xs mx-auto">
                  we sent a magic link to{" "}
                  <span className="text-ink">{email}</span>. open it to log in — you can
                  then save your application and finish later.
                </p>
                <button
                  type="button"
                  onClick={closeAuth}
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-ink text-white text-sm px-5 py-2.5 hover:bg-ink/90 transition-colors"
                >
                  done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
                <div>
                  <h3 id="auth-title" className="text-lg tracking-tightish text-ink">
                    save your progress.
                  </h3>
                  <p className="mt-1 text-sm text-ink/55">
                    log in with your email to save your application and come back to it
                    anytime. no password needed.
                  </p>
                </div>

                {!authEnabled && (
                  <p className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                    login isn&apos;t configured yet.
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleGoogle}
                  disabled={googleLoading || !authEnabled}
                  className="w-full inline-flex items-center justify-center gap-2.5 rounded-full border border-ink/20 bg-white text-sm text-ink px-5 py-2.5 hover:border-ink/40 transition-colors disabled:opacity-50"
                >
                  <GoogleIcon />
                  {googleLoading ? "redirecting..." : "continue with google"}
                </button>

                {!showEmail ? (
                  <button
                    type="button"
                    onClick={() => setShowEmail(true)}
                    disabled={!authEnabled}
                    className="w-full text-center text-xs text-ink/50 hover:text-ink transition-colors disabled:opacity-50"
                  >
                    or use email instead
                  </button>
                ) : (
                  <div className="space-y-3 pt-1">
                    <div className="flex items-center gap-3">
                      <span className="h-px flex-1 bg-ink/10" />
                      <span className="text-[11px] uppercase tracking-wider text-ink/40">
                        or
                      </span>
                      <span className="h-px flex-1 bg-ink/10" />
                    </div>
                    <label className="block">
                      <span className="text-xs uppercase tracking-wider text-ink/50 mb-1.5 block">
                        email
                      </span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your email address"
                        disabled={!authEnabled}
                        className="w-full rounded-[10px] border border-ink/20 px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15 placeholder:text-ink/40 disabled:opacity-50"
                      />
                    </label>
                    <button
                      type="submit"
                      disabled={status === "sending" || !authEnabled}
                      className="w-full inline-flex items-center justify-center rounded-full bg-ink text-white text-sm px-5 py-2.5 hover:bg-ink/90 transition-colors disabled:opacity-50"
                    >
                      {status === "sending" ? "sending link..." : "send magic link →"}
                    </button>
                  </div>
                )}

                {status === "error" && errorMsg && (
                  <p
                    role="alert"
                    className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2"
                  >
                    {errorMsg}
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden>
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.34A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.94H.96a9 9 0 0 0 0 8.12l3.01-2.34Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 .96 4.94l3.01 2.34C4.68 5.16 6.66 3.58 9 3.58Z"
      />
    </svg>
  );
}
