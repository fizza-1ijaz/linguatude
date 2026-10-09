const CITY_A = [9, 10, 14, 18, 24, 28, 31, 32, 28, 22, 16, 12];
const CITY_B = [18, 17, 16, 15, 18, 22, 26, 27, 24, 20, 16, 14];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export function WritingTemperatureChart({
  className = "mt-3 h-auto w-full",
}: {
  className?: string;
}) {
  const w = 320;
  const h = 180;
  const padL = 28;
  const padR = 8;
  const padT = 12;
  const padB = 28;
  const plotW = w - padL - padR;
  const plotH = h - padT - padB;
  const maxY = 40;

  function xAt(i: number) {
    return padL + (i / 11) * plotW;
  }
  function yAt(v: number) {
    return padT + plotH - (v / maxY) * plotH;
  }

  const pathA = CITY_A.map(
    (v, i) => `${i === 0 ? "M" : "L"} ${xAt(i)} ${yAt(v)}`,
  ).join(" ");
  const pathB = CITY_B.map(
    (v, i) => `${i === 0 ? "M" : "L"} ${xAt(i)} ${yAt(v)}`,
  ).join(" ");

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={className}
      role="img"
      aria-label="Line graph of average monthly temperatures for City A and City B"
    >
      {[0, 10, 20, 30, 40].map((tick) => (
        <g key={tick}>
          <line
            x1={padL}
            x2={w - padR}
            y1={yAt(tick)}
            y2={yAt(tick)}
            stroke="#E2E8F0"
            strokeWidth="1"
          />
          <text
            x={padL - 6}
            y={yAt(tick) + 3}
            textAnchor="end"
            className="fill-[#94A3B8]"
            fontSize="9"
          >
            {tick}
          </text>
        </g>
      ))}
      {MONTHS.map((m, i) => (
        <text
          key={m}
          x={xAt(i)}
          y={h - 8}
          textAnchor="middle"
          className="fill-[#94A3B8]"
          fontSize="8"
        >
          {m}
        </text>
      ))}
      <path d={pathA} fill="none" stroke="#2b5ce6" strokeWidth="2" />
      <path d={pathB} fill="none" stroke="#22C55E" strokeWidth="2" />
      {CITY_A.map((v, i) => (
        <circle key={`a-${i}`} cx={xAt(i)} cy={yAt(v)} r="2.5" fill="#2b5ce6" />
      ))}
      {CITY_B.map((v, i) => (
        <circle key={`b-${i}`} cx={xAt(i)} cy={yAt(v)} r="2.5" fill="#22C55E" />
      ))}
    </svg>
  );
}
