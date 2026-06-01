"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useApply } from "./ApplyProvider";

type Status = "idle" | "submitting" | "done" | "error";

export function ApplyModal() {
  const { isOpen, closeApply } = useApply();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    college: "",
    email: "",
    pitch: "",
    role: "looking",
  });

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
        setForm({ name: "", college: "", email: "", pitch: "", role: "looking" });
      }, 250);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
            className="relative w-full sm:max-w-lg bg-white border-hairline-all sm:rounded-2xl rounded-t-2xl overflow-hidden"
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
              <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
                <h3 id="apply-title" className="text-xl tracking-tightish text-ink">
                  tell us about yourself.
                </h3>

                <div className="grid gap-4">
                  <Field label="full name">
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="aarav sharma"
                      className="input"
                    />
                  </Field>

                  <Field label="college">
                    <input
                      required
                      value={form.college}
                      onChange={(e) => setForm({ ...form, college: e.target.value })}
                      placeholder="bits pilani"
                      className="input"
                    />
                  </Field>

                  <Field label="email">
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@college.edu"
                      className="input"
                    />
                  </Field>

                  <Field label="what are you building or what do you bring?">
                    <textarea
                      required
                      value={form.pitch}
                      onChange={(e) => setForm({ ...form, pitch: e.target.value })}
                      rows={3}
                      placeholder="one or two sentences is enough."
                      className="input resize-none"
                    />
                  </Field>

                  <fieldset className="space-y-2">
                    <legend className="text-xs uppercase tracking-wider text-ink/50 mb-1">
                      are you looking for a co-founder, or open to joining a team?
                    </legend>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Radio
                        name="role"
                        value="looking"
                        checked={form.role === "looking"}
                        onChange={() => setForm({ ...form, role: "looking" })}
                        label="looking for a co-founder"
                      />
                      <Radio
                        name="role"
                        value="joining"
                        checked={form.role === "joining"}
                        onChange={() => setForm({ ...form, role: "joining" })}
                        label="open to joining a team"
                      />
                    </div>
                  </fieldset>
                </div>

                {status === "error" && errorMsg && (
                  <p
                    role="alert"
                    className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2"
                  >
                    {errorMsg}
                  </p>
                )}

                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-ink/50">we read every application.</p>
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
                </div>
              </form>
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
  value,
  checked,
  onChange,
  label,
}: {
  name: string;
  value: string;
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
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className="flex items-center gap-2">
        <span
          className={`h-2 w-2 rounded-full ${checked ? "bg-brand" : "bg-ink/20"}`}
        />
        {label}
      </span>
    </label>
  );
}
