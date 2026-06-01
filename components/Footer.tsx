import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t-hairline">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <Logo />
          <p className="text-xs text-ink/50">
            find your co-founder. build something real.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-xs text-ink/55">
          <a
            href="mailto:hello@buildroom.in"
            className="hover:text-ink transition-colors"
          >
            hello@buildroom.in
          </a>
          <a
            href="#"
            className="hover:text-ink transition-colors"
          >
            twitter
          </a>
          <a
            href="#"
            className="hover:text-ink transition-colors"
          >
            linkedin
          </a>
          <span className="text-ink/40">© {new Date().getFullYear()} buildroom</span>
        </div>
      </div>
    </footer>
  );
}
