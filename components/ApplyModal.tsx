"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useApply } from "./ApplyProvider";

type Status = "idle" | "submitting" | "done" | "error";

const TOTAL_STEPS = 3;

const stepLabels = ["the basics", "what you bring", "the hard questions"];

const emptyForm = {
  name: "",
  collegeYear: "",
  email: "",
  role: "looking",
  building: "",
  unfairAdvantage: "",
  links: "",
  hardestThing: "",
  commitment: "",
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export function ApplyModal() {
  const { isOpen, closeApply } = useApply();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(emptyForm);

  const set = (key: keyof typeof emptyForm, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeApply();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeApply]);

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setStatus("idle");
        setErrorMsg("");
        setStep(0);
        setForm(emptyForm);
      }, 250);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const validateStep = (s: number): string => {
    if (s === 0) {
      if (!form.name.trim() || !form.collegeYear.trim() || !form.email.trim())
        return "please fill in your name, college, and email.";
      if (!isEmail(form.email.trim())) return "please enter a valid email.";
    }
    if (s === 1) {
      if (!form.building.trim() || !form.unfairAdvantage.trim())
        return "please answer what you're building and your unfair advantage.";
    }
    if (s === 2) {
      if (!form.hardestThing.trim() || !form.commitment.trim())
        return "please answer both questions before submitting.";
    }
    return "";
  };

  const goNext = () => {
    const err = validateStep(step);
    if (err) {
      setErrorMsg(err);
      return;
    }
    setErrorMsg("");
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const goBack = () => {
    setErrorMsg("");
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateStep(2);
    if (err) {
      setErrorMsg(err);
      return;
    }
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "something went wrong. please try again.");
      }
      setStatus("done");
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "something went wrong. please try again."
      );
      setStatus("error");
    }
  };

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <motion.button
            type="button"
            aria-label="close apply"
            onClick={closeApply}
            className="absolute inset-0 bg-ink/30 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="apply-title"
            className="relative w-full sm:max-w-lg bg-white border-hairline-all sm:rounded-2xl rounded-t-2xl overflow-hidden max-h-[92vh] flex flex-col"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b-hairline">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand" />
                <span className="text-sm text-ink/70">apply to cohort 01</span>
              </div>
              <button
                type="button"
                onClick={closeApply}
                aria-label="close"
                className="text-ink/50 hover:text-ink transition-colors text-sm"
              >
                close
              </button>
            </div>

            {status === "done" ? (
              <div className="px-6 py-12 text-center">
                <div className="mx-auto mb-4 h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center">
                  <span className="h-2.5 w-2.5 rounded-full bg-brand" />
                </div>
                <h3 className="text-xl tracking-tightish text-ink">application received.</h3>
                <p className="mt-2 text-sm text-ink/60 max-w-sm mx-auto">
                  we read every application personally. if there&apos;s a fit, you&apos;ll hear from us within a week.
                </p>
                <button
                  type="button"
                  onClick={closeApply}
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-ink text-white text-sm px-5 py-2.5 hover:bg-ink/90 transition-colors"
                >
                  done
                </button>
              </div>
            ) : (
              <>
                <div className="px-6 pt-4">
                  <div className="flex items-center justify-between text-xs text-ink/50">
                    <span>{stepLabels[step]}</span>
                    <span className="tabular-nums">
                      step {step + 1} / {TOTAL_STEPS}
                    </span>
                  </div>
                  <div className="mt-2 h-px w-full bg-ink/10 overflow-hidden">
                    <motion.div
                      className="h-full bg-brand"
                      initial={false}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="px-6 py-6 space-y-5 overflow-y-auto"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="space-y-5"
                    >
                      {step === 0 && (
                        <>
                          <h3 id="apply-title" className="text-xl tracking-tightish text-ink">
                            tell us who you are.
                          </h3>
                          <Field label="full name">
                            <input
                              value={form.name}
                              onChange={(e) => set("name", e.target.value)}
                              placeholder="aarav sharma"
                              className="input"
                            />
                          </Field>
                          <Field label="college & graduation year">
                            <input
                              value={form.collegeYear}
                              onChange={(e) => set("collegeYear", e.target.value)}
                              placeholder="bits pilani, 2027"
                              className="input"
                            />
                          </Field>
                          <Field label="email">
                            <input
                              type="email"
                              value={form.email}
                              onChange={(e) => set("email", e.target.value)}
                              placeholder="you@college.edu"
                              className="input"
                            />
                          </Field>
                          <fieldset className="space-y-2">
                            <legend className="text-xs uppercase tracking-wider text-ink/50 mb-1">
                              are you looking for a co-founder, or open to joining a team?
                            </legend>
                            <div className="flex flex-col sm:flex-row gap-2">
                              <Radio
                                name="role"
                                checked={form.role === "looking"}
                                onChange={() => set("role", "looking")}
                                label="looking for a co-founder"
                              />
                              <Radio
                                name="role"
                                checked={form.role === "joining"}
                                onChange={() => set("role", "joining")}
                                label="open to joining a team"
                              />
                              <Radio
                                name="role"
                                checked={form.role === "either"}
                                onChange={() => set("role", "either")}
                                label="open to either"
                              />
                            </div>
                          </fieldset>
                        </>
                      )}

                      {step === 1 && (
                        <>
                          <h3 className="text-xl tracking-tightish text-ink">
                            what you bring.
                          </h3>
                          <Field label="what are you building, or what do you want to build?">
                            <textarea
                              value={form.building}
                              onChange={(e) => set("building", e.target.value)}
                              rows={3}
                              placeholder="“no concrete idea yet, i just want to build” is a fine answer."
                              className="input resize-none"
                            />
                          </Field>
                          <Field label="what's your unfair advantage?">
                            <textarea
                              value={form.unfairAdvantage}
                              onChange={(e) => set("unfairAdvantage", e.target.value)}
                              rows={3}
                              placeholder="prior startup wins, deep technical skill, a unique market insight, or a strong network."
                              className="input resize-none"
                            />
                          </Field>
                          <Field label="show your work (optional)">
                            <input
                              value={form.links}
                              onChange={(e) => set("links", e.target.value)}
                              placeholder="github, portfolio, twitter, app store — anything you've shipped."
                              className="input"
                            />
                          </Field>
                        </>
                      )}

                      {step === 2 && (
                        <>
                          <h3 className="text-xl tracking-tightish text-ink">
                            the hard questions.
                          </h3>
                          <Field label="the hardest thing you've ever done — outside academics or startups. what made it hard, and what did you do?">
                            <textarea
                              value={form.hardestThing}
                              onChange={(e) => set("hardestThing", e.target.value)}
                              rows={4}
                              placeholder="be specific. the situation, what made it hard, and what you actually did."
                              className="input resize-none"
                            />
                          </Field>
                          <Field label="realistically, how many hours a week can you give buildroom over the 8 weeks — and what are you giving up to make room for it?">
                            <textarea
                              value={form.commitment}
                              onChange={(e) => set("commitment", e.target.value)}
                              rows={3}
                              placeholder="be honest. mismatched expectations are the #1 reason co-founders break up."
                              className="input resize-none"
                            />
                          </Field>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {errorMsg && (
                    <p
                      role="alert"
                      className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2"
                    >
                      {errorMsg}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-1">
                    {step > 0 ? (
                      <button
                        type="button"
                        onClick={goBack}
                        className="text-sm text-ink/60 hover:text-ink transition-colors"
                      >
                        ← back
                      </button>
                    ) : (
                      <span className="text-xs text-ink/50">we read every application.</span>
                    )}

                    {step < TOTAL_STEPS - 1 ? (
                      <button
                        type="button"
                        onClick={goNext}
                        className="inline-flex items-center justify-center rounded-full bg-ink text-white text-sm px-5 py-2.5 hover:bg-ink/90 transition-colors"
                      >
                        continue →
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="inline-flex items-center justify-center rounded-full bg-ink text-white text-sm px-5 py-2.5 hover:bg-ink/90 transition-colors disabled:opacity-50"
                      >
                        {status === "submitting"
                          ? "sending..."
                          : status === "error"
                          ? "try again →"
                          : "submit application →"}
                      </button>
                    )}
                  </div>
                </form>
              </>
            )}
          </motion.div>

          <style jsx>{`
            .input {
              width: 100%;
              background: #fff;
              border: 0.5px solid rgba(44, 44, 42, 0.18);
              border-radius: 10px;
              padding: 10px 12px;
              font-size: 14px;
              color: #2c2c2a;
              outline: none;
              transition: border-color 0.15s ease, box-shadow 0.15s ease;
            }
            .input::placeholder {
              color: rgba(44, 44, 42, 0.4);
            }
            .input:focus {
              border-color: #533ab7;
              box-shadow: 0 0 0 3px rgba(83, 58, 183, 0.12);
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-ink/50 mb-1.5 block">
        {label}
      </span>
      {children}
    </label>
  );
}

function Radio({
  name,
  checked,
  onChange,
  label,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label
      className={`flex-1 cursor-pointer rounded-xl border px-4 py-3 text-sm transition-colors ${
        checked
          ? "border-brand bg-brand/5 text-ink"
          : "border-hairline text-ink/70 hover:text-ink hover:border-ink/30"
      }`}
      style={{ borderWidth: "0.5px" }}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className="flex items-center gap-2">
        <span
          className={`h-2 w-2 rounded-full shrink-0 ${checked ? "bg-brand" : "bg-ink/20"}`}
        />
        {label}
      </span>
    </label>
  );
}
