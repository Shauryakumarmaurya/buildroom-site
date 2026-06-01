"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/Logo";

type Track = "founder" | "builder";
type Status = "idle" | "submitting" | "done" | "error";

const founderStages = [
  "idea",
  "mvp built",
  "beta users",
  "revenue",
  "scaling",
] as const;

const founderRoles = [
  "backend engineer",
  "ai engineer",
  "growth marketer",
  "designer",
  "product manager",
  "operator",
];

const builderRoles = [
  "engineer",
  "ai engineer",
  "marketer",
  "designer",
  "product builder",
  "operator",
];

const startupTypes = [
  "ai",
  "saas",
  "fintech",
  "d2c",
  "consumer",
  "education",
  "open to anything",
];

const countWords = (v: string) =>
  v.trim() ? v.trim().split(/\s+/).filter(Boolean).length : 0;

export default function ApplyPage() {
  const router = useRouter();
  const [track, setTrack] = useState<Track | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // shared
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [college, setCollege] = useState("");
  const [links, setLinks] = useState("");

  // founder
  const [building, setBuilding] = useState("");
  const [stage, setStage] = useState("");
  const [whyJoining, setWhyJoining] = useState("");
  const [lookingFor, setLookingFor] = useState<string[]>([]);
  const [whySelectStartup, setWhySelectStartup] = useState("");

  // builder
  const [impressive, setImpressive] = useState("");
  const [describes, setDescribes] = useState("");
  const [startupInterest, setStartupInterest] = useState<string[]>([]);
  const [brings, setBrings] = useState("");
  const [whySelectYou, setWhySelectYou] = useState("");

  const toggle = (
    list: string[],
    setList: (v: string[]) => void,
    value: string
  ) => {
    setList(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!track) return;
    setStatus("submitting");
    setErrorMsg("");

    const data =
      track === "founder"
        ? {
            building,
            links,
            stage,
            why_joining: whyJoining,
            looking_for: lookingFor,
            why_select_startup: whySelectStartup,
          }
        : {
            most_impressive: impressive,
            links,
            describes,
            startup_interest: startupInterest,
            brings,
            why_select_you: whySelectYou,
          };

    const pitch = track === "founder" ? building : impressive;

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          track,
          name,
          email,
          linkedin,
          college,
          pitch,
          data,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "something went wrong. please try again.");
      }
      setStatus("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "something went wrong. please try again."
      );
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-paper">
      <TopBar onBack={() => router.push("/")} />

      <main className="mx-auto max-w-2xl px-5 sm:px-8 pt-12 sm:pt-16 pb-24">
        {status === "done" ? (
          <SuccessState onHome={() => router.push("/")} />
        ) : (
          <>
            <Intro />

            <TrackSelector track={track} onSelect={setTrack} />

            <AnimatePresence mode="wait">
              {track && (
                <motion.form
                  key={track}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-10"
                >
                  <div className="mb-8 flex items-center gap-3">
                    <span className="h-px flex-1 bg-[var(--hairline)]" />
                    <span className="text-xs uppercase tracking-[0.18em] text-ink/45">
                      {track === "founder" ? "founder track" : "builder track"}
                    </span>
                    <span className="h-px flex-1 bg-[var(--hairline)]" />
                  </div>

                  {track === "founder" ? (
                    <FounderForm
                      values={{
                        name,
                        email,
                        linkedin,
                        college,
                        building,
                        links,
                        stage,
                        whyJoining,
                        lookingFor,
                        whySelectStartup,
                      }}
                      set={{
                        setName,
                        setEmail,
                        setLinkedin,
                        setCollege,
                        setBuilding,
                        setLinks,
                        setStage,
                        setWhyJoining,
                        setWhySelectStartup,
                      }}
                      toggleLookingFor={(v) =>
                        toggle(lookingFor, setLookingFor, v)
                      }
                    />
                  ) : (
                    <BuilderForm
                      values={{
                        name,
                        email,
                        linkedin,
                        college,
                        impressive,
                        links,
                        describes,
                        startupInterest,
                        brings,
                        whySelectYou,
                      }}
                      set={{
                        setName,
                        setEmail,
                        setLinkedin,
                        setCollege,
                        setImpressive,
                        setLinks,
                        setDescribes,
                        setBrings,
                        setWhySelectYou,
                      }}
                      toggleStartup={(v) =>
                        toggle(startupInterest, setStartupInterest, v)
                      }
                    />
                  )}

                  {status === "error" && errorMsg && (
                    <p
                      role="alert"
                      className="mt-8 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3"
                    >
                      {errorMsg}
                    </p>
                  )}

                  <div className="mt-10 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="text-xs text-ink/50">
                      we read every application personally.
                    </p>
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="inline-flex items-center justify-center rounded-full bg-ink text-white text-sm px-6 py-3.5 hover:bg-ink/90 transition-colors disabled:opacity-50 group"
                    >
                      {status === "submitting"
                        ? "submitting…"
                        : status === "error"
                        ? "try again"
                        : "submit application"}
                      <span className="ml-1.5 transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </>
        )}
      </main>

      <FormStyles />
    </div>
  );
}

function TopBar({ onBack }: { onBack: () => void }) {
  return (
    <header
      className="sticky top-0 z-50 w-full bg-paper/85 backdrop-blur-md"
      style={{ borderBottom: "0.5px solid var(--hairline)" }}
    >
      <div className="mx-auto max-w-2xl px-5 sm:px-8 flex h-14 items-center justify-between">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Logo />
        </Link>
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-ink/55 hover:text-ink transition-colors"
        >
          ← back to site
        </button>
      </div>
    </header>
  );
}

function Intro() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 rounded-full border-hairline-all bg-white px-3 py-1 text-xs text-ink/70">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </span>
        cohort 01 — applications open
      </div>
      <h1 className="mt-6 text-4xl sm:text-5xl tracking-tighter2 leading-[1.05] text-ink font-medium">
        apply to buildroom.
      </h1>
      <p className="mt-4 max-w-xl text-base sm:text-lg text-ink/60 leading-relaxed">
        a small cohort. 8 weeks. fully remote — join from anywhere in india. we
        look for proof of work, ambition, and execution — not grades, not
        resumes. it takes about five minutes.
      </p>
    </div>
  );
}

function TrackSelector({
  track,
  onSelect,
}: {
  track: Track | null;
  onSelect: (t: Track) => void;
}) {
  const options: {
    id: Track;
    label: string;
    sub: string;
    accent: string;
  }[] = [
    {
      id: "founder",
      label: "i am building a startup and looking for teammates.",
      sub: "founders with a product, momentum, or an idea in motion.",
      accent: "bg-[#EEEDFE] text-[#3C3489]",
    },
    {
      id: "builder",
      label: "i want to join a startup and build alongside ambitious founders.",
      sub: "builders with skills, ambition, and proof of work.",
      accent: "bg-[#E1F5EE] text-[#085041]",
    },
  ];

  return (
    <div className="mt-10">
      <p className="text-xs uppercase tracking-[0.18em] text-ink/45">
        which best describes you?
      </p>
      <div className="mt-4 grid grid-cols-1 gap-3">
        {options.map((o) => {
          const active = track === o.id;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => onSelect(o.id)}
              className={`group text-left rounded-2xl border bg-white p-5 sm:p-6 transition-all ${
                active
                  ? "border-brand ring-2 ring-brand/15"
                  : "border-hairline hover:border-ink/25"
              }`}
              style={{ borderWidth: active ? "1px" : "0.5px" }}
            >
              <div className="flex items-start gap-4">
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    active ? "border-brand bg-brand" : "border-ink/25"
                  }`}
                >
                  {active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  )}
                </span>
                <div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-tightish ${o.accent}`}
                  >
                    {o.id === "founder" ? "founder" : "builder"}
                  </span>
                  <p className="mt-2.5 text-base sm:text-lg text-ink leading-snug font-medium tracking-tightish">
                    {o.label}
                  </p>
                  <p className="mt-1.5 text-sm text-ink/55 leading-relaxed">
                    {o.sub}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ----------------------------- Founder form ----------------------------- */

function FounderForm({
  values,
  set,
  toggleLookingFor,
}: {
  values: {
    name: string;
    email: string;
    linkedin: string;
    college: string;
    building: string;
    links: string;
    stage: string;
    whyJoining: string;
    lookingFor: string[];
    whySelectStartup: string;
  };
  set: {
    setName: (v: string) => void;
    setEmail: (v: string) => void;
    setLinkedin: (v: string) => void;
    setCollege: (v: string) => void;
    setBuilding: (v: string) => void;
    setLinks: (v: string) => void;
    setStage: (v: string) => void;
    setWhyJoining: (v: string) => void;
    setWhySelectStartup: (v: string) => void;
  };
  toggleLookingFor: (v: string) => void;
}) {
  return (
    <div className="space-y-10">
      <Question index={1} title="basic information">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SubField label="name">
            <input
              required
              className="input"
              value={values.name}
              onChange={(e) => set.setName(e.target.value)}
              placeholder="aarav sharma"
            />
          </SubField>
          <SubField label="email">
            <input
              required
              type="email"
              className="input"
              value={values.email}
              onChange={(e) => set.setEmail(e.target.value)}
              placeholder="you@college.edu"
            />
          </SubField>
          <SubField label="linkedin">
            <input
              required
              className="input"
              value={values.linkedin}
              onChange={(e) => set.setLinkedin(e.target.value)}
              placeholder="linkedin.com/in/…"
            />
          </SubField>
          <SubField label="college / organization">
            <input
              required
              className="input"
              value={values.college}
              onChange={(e) => set.setCollege(e.target.value)}
              placeholder="bits pilani"
            />
          </SubField>
        </div>
      </Question>

      <Question index={2} title="what are you building?">
        <WordArea
          value={values.building}
          onChange={set.setBuilding}
          limit={200}
          rows={5}
          required
          placeholder="describe the problem, your product, and where you are today."
        />
      </Question>

      <Question
        index={3}
        title="share your startup link(s)"
        hint="website, product, app, demo, or github — anything we can look at."
        mandatory
      >
        <input
          required
          className="input"
          value={values.links}
          onChange={(e) => set.setLinks(e.target.value)}
          placeholder="https://…  (separate multiple with commas)"
        />
      </Question>

      <Question
        index={4}
        title="what stage are you at?"
        hint="we strongly prefer mvp and beyond."
      >
        <PillSelect
          options={[...founderStages]}
          value={values.stage}
          onChange={set.setStage}
        />
      </Question>

      <Question
        index={5}
        title="why are you joining buildroom?"
        hint="e.g. need a technical cofounder, marketer, designer, operator, or accountability."
      >
        <WordArea
          value={values.whyJoining}
          onChange={set.setWhyJoining}
          limit={120}
          rows={3}
          required
          placeholder="what do you need most from the room?"
        />
      </Question>

      <Question
        index={6}
        title="what type of people are you looking for?"
        hint="select all that apply."
      >
        <ChipMulti
          options={founderRoles}
          selected={values.lookingFor}
          onToggle={toggleLookingFor}
        />
      </Question>

      <Question index={7} title="why should we select your startup?">
        <WordArea
          value={values.whySelectStartup}
          onChange={set.setWhySelectStartup}
          limit={150}
          rows={4}
          required
          placeholder="make the case for your startup and your team."
        />
      </Question>
    </div>
  );
}

/* ----------------------------- Builder form ----------------------------- */

function BuilderForm({
  values,
  set,
  toggleStartup,
}: {
  values: {
    name: string;
    email: string;
    linkedin: string;
    college: string;
    impressive: string;
    links: string;
    describes: string;
    startupInterest: string[];
    brings: string;
    whySelectYou: string;
  };
  set: {
    setName: (v: string) => void;
    setEmail: (v: string) => void;
    setLinkedin: (v: string) => void;
    setCollege: (v: string) => void;
    setImpressive: (v: string) => void;
    setLinks: (v: string) => void;
    setDescribes: (v: string) => void;
    setBrings: (v: string) => void;
    setWhySelectYou: (v: string) => void;
  };
  toggleStartup: (v: string) => void;
}) {
  return (
    <div className="space-y-10">
      <Question index={1} title="basic information">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SubField label="name">
            <input
              required
              className="input"
              value={values.name}
              onChange={(e) => set.setName(e.target.value)}
              placeholder="aarav sharma"
            />
          </SubField>
          <SubField label="email">
            <input
              required
              type="email"
              className="input"
              value={values.email}
              onChange={(e) => set.setEmail(e.target.value)}
              placeholder="you@college.edu"
            />
          </SubField>
          <SubField label="linkedin">
            <input
              required
              className="input"
              value={values.linkedin}
              onChange={(e) => set.setLinkedin(e.target.value)}
              placeholder="linkedin.com/in/…"
            />
          </SubField>
          <SubField label="college">
            <input
              required
              className="input"
              value={values.college}
              onChange={(e) => set.setCollege(e.target.value)}
              placeholder="bits pilani"
            />
          </SubField>
        </div>
      </Question>

      <Question
        index={2}
        title="what is the most impressive thing you've built, launched, grown, or created?"
        hint="this is the question that matters most. be specific and concrete."
      >
        <WordArea
          value={values.impressive}
          onChange={set.setImpressive}
          limit={200}
          rows={5}
          required
          placeholder="what did you make, what was the impact, and what was your role?"
        />
      </Question>

      <Question
        index={3}
        title="share links to your work"
        hint="github, portfolio, website, community, or linkedin."
        mandatory
      >
        <input
          required
          className="input"
          value={values.links}
          onChange={(e) => set.setLinks(e.target.value)}
          placeholder="https://…  (separate multiple with commas)"
        />
      </Question>

      <Question index={4} title="which best describes you?">
        <PillSelect
          options={builderRoles}
          value={values.describes}
          onChange={set.setDescribes}
        />
      </Question>

      <Question
        index={5}
        title="what type of startup would you like to join?"
        hint="select all that apply."
      >
        <ChipMulti
          options={startupTypes}
          selected={values.startupInterest}
          onToggle={toggleStartup}
        />
      </Question>

      <Question index={6} title="what do you bring to a startup team?">
        <WordArea
          value={values.brings}
          onChange={set.setBrings}
          limit={150}
          rows={4}
          required
          placeholder="the skills, mindset, and edge you bring."
        />
      </Question>

      <Question index={7} title="why should we select you for buildroom?">
        <WordArea
          value={values.whySelectYou}
          onChange={set.setWhySelectYou}
          limit={150}
          rows={4}
          required
          placeholder="make the case for yourself."
        />
      </Question>
    </div>
  );
}

/* ----------------------------- Primitives ----------------------------- */

function Question({
  index,
  title,
  hint,
  mandatory,
  children,
}: {
  index: number;
  title: string;
  hint?: string;
  mandatory?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline gap-3">
        <span className="text-xs tabular-nums text-brand font-medium pt-0.5">
          {String(index).padStart(2, "0")}
        </span>
        <div className="flex-1">
          <h3 className="text-base sm:text-lg text-ink font-medium tracking-tightish leading-snug">
            {title}
            {mandatory && (
              <span className="ml-2 align-middle inline-flex items-center rounded-full bg-ink/[0.06] px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-ink/55">
                required
              </span>
            )}
          </h3>
          {hint && (
            <p className="mt-1 text-sm text-ink/50 leading-relaxed">{hint}</p>
          )}
        </div>
      </div>
      <div className="mt-4 pl-0 sm:pl-8">{children}</div>
    </div>
  );
}

function SubField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-wider text-ink/50">
        {label}
      </span>
      {children}
    </label>
  );
}

function WordArea({
  value,
  onChange,
  limit,
  rows = 4,
  required,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  limit: number;
  rows?: number;
  required?: boolean;
  placeholder?: string;
}) {
  const words = countWords(value);
  const over = words > limit;
  return (
    <div>
      <textarea
        required={required}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input resize-none"
      />
      <div className="mt-1.5 flex justify-end">
        <span
          className={`text-[11px] tabular-nums ${
            over ? "text-red-500" : "text-ink/40"
          }`}
        >
          {words} / {limit} words
        </span>
      </div>
    </div>
  );
}

function PillSelect({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = value === o;
        return (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={`rounded-full px-4 py-2 text-sm transition-colors ${
              active
                ? "bg-ink text-white"
                : "bg-white border-hairline-all text-ink/70 hover:border-ink/30 hover:text-ink"
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

function ChipMulti({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = selected.includes(o);
        return (
          <button
            key={o}
            type="button"
            onClick={() => onToggle(o)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors ${
              active
                ? "bg-brand/10 text-brand-700 border border-brand/30"
                : "bg-white border-hairline-all text-ink/70 hover:border-ink/30 hover:text-ink"
            }`}
            style={{ borderWidth: active ? "1px" : "0.5px" }}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                active ? "bg-brand" : "bg-ink/20"
              }`}
            />
            {o}
          </button>
        );
      })}
    </div>
  );
}

function SuccessState({ onHome }: { onHome: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="pt-16 text-center"
    >
      <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-brand/10">
        <span className="h-3 w-3 rounded-full bg-brand" />
      </div>
      <h1 className="text-3xl sm:text-4xl tracking-tighter2 text-ink font-medium">
        application received.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-base text-ink/60 leading-relaxed">
        we read every application personally. if there&apos;s a fit, you&apos;ll
        hear from us within a week. in the meantime — keep building.
      </p>
      <button
        type="button"
        onClick={onHome}
        className="mt-8 inline-flex items-center justify-center rounded-full bg-ink text-white text-sm px-6 py-3 hover:bg-ink/90 transition-colors"
      >
        back to home
      </button>
    </motion.div>
  );
}

function FormStyles() {
  return (
    <style jsx global>{`
      .input {
        width: 100%;
        background: #fff;
        border: 0.5px solid rgba(44, 44, 42, 0.18);
        border-radius: 12px;
        padding: 11px 14px;
        font-size: 15px;
        line-height: 1.5;
        color: #2c2c2a;
        outline: none;
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
      }
      .input::placeholder {
        color: rgba(44, 44, 42, 0.38);
      }
      .input:focus {
        border-color: #533ab7;
        box-shadow: 0 0 0 3px rgba(83, 58, 183, 0.12);
      }
    `}</style>
  );
}
