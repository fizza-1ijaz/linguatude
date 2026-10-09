/** Decorative trailing dots behind paper-plane / flight icons */
export function FlightTrail({
  className,
  dots = 9,
}: {
  className?: string;
  dots?: number;
}) {
  return (
    <span
      className={`pointer-events-none absolute flex items-center gap-1.5 ${className ?? ""}`}
      aria-hidden
    >
      {Array.from({ length: dots }, (_, i) => {
        const t = i / Math.max(dots - 1, 1);
        return (
          <span
            key={i}
            className="rounded-full bg-[#2D5BFF]"
            style={{
              width: `${Math.max(3, 7 - t * 3)}px`,
              height: `${Math.max(3, 7 - t * 3)}px`,
              opacity: 0.15 + (1 - t) * 0.45,
            }}
          />
        );
      })}
    </span>
  );
}
