export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        aria-hidden
        className="h-2.5 w-2.5 rounded-full bg-brand"
      />
      <span className="text-[15px] font-medium tracking-tightish text-ink">
        buildroom
      </span>
    </span>
  );
}
