export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <GateMark />
      <span className="text-[15px] font-medium tracking-tightish text-ink">
        buildroom
      </span>
    </span>
  );
}

function GateMark({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="17"
      viewBox="0 0 14 17"
      fill="none"
      aria-hidden
      className={className}
    >
      {/* the room behind, revealed by the open door */}
      <rect x="1.5" y="1.5" width="11" height="14" rx="1.5" fill="#533AB7" />
      {/* the door, ajar (hinged on the left) */}
      <path
        d="M1.5 1.9 L9 3.3 V13.7 L1.5 15.1 Z"
        fill="#FAFAF7"
        stroke="rgba(44,44,42,0.28)"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
      {/* handle on the free edge */}
      <circle cx="7.5" cy="8.5" r="0.7" fill="rgba(44,44,42,0.4)" />
      {/* doorway frame */}
      <rect
        x="0.6"
        y="0.6"
        width="12.8"
        height="15.8"
        rx="2.2"
        stroke="rgba(44,44,42,0.28)"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}
