import { useEffect, useState } from "react";

type Props = {
  /** 0 = E, 1 = F */
  level: number;
  litersUsed: number;
  tankCapacity: number;
};

/**
 * Полукръгъл автомобилен gauge със стрелка — E вляво, F вдясно.
 */
export function FuelGauge({ level, litersUsed, tankCapacity }: Props) {
  const clamped = Math.min(1, Math.max(0, level));
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(clamped), 120);
    return () => clearTimeout(t);
  }, [clamped]);

  const cx = 110;
  const cy = 104;
  const r = 82;
  const startAngle = 180;
  const sweep = 180;
  const angle = startAngle - animated * sweep;
  const rad = (angle * Math.PI) / 180;
  const needleLen = r - 12;
  const nx = cx + Math.cos(rad) * needleLen;
  const ny = cy - Math.sin(rad) * needleLen;

  const arcPoint = (a: number, radius: number) => {
    const ar = (a * Math.PI) / 180;
    return [cx + Math.cos(ar) * radius, cy - Math.sin(ar) * radius];
  };

  const [sx, sy] = arcPoint(startAngle, r);
  const [ex, ey] = arcPoint(0, r);
  const arcLength = Math.PI * r;

  const ticks = Array.from({ length: 9 }, (_, i) => i / 8);
  const litersLeft = Math.round(clamped * tankCapacity);
  const low = clamped <= 0.2;

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="0 0 220 160"
        className="w-full max-w-[250px]"
        role="img"
        aria-label={`Ниво на гориво: ${Math.round(clamped * 100)}%`}
      >
        <defs>
          <linearGradient id="fuelArc" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="35%" stopColor="var(--warning)" />
            <stop offset="100%" stopColor="var(--success)" />
          </linearGradient>
        </defs>

        {/* фон на скалата */}
        <path
          d={`M ${sx} ${sy} A ${r} ${r} 0 0 1 ${ex} ${ey}`}
          fill="none"
          stroke="var(--secondary)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* активна дъга */}
        <path
          d={`M ${sx} ${sy} A ${r} ${r} 0 0 1 ${ex} ${ey}`}
          fill="none"
          stroke="url(#fuelArc)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={arcLength}
          strokeDashoffset={arcLength * (1 - animated)}
          style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(0.4,0,0.2,1)" }}
        />

        {/* деления */}
        {ticks.map((t, i) => {
          const a = startAngle - t * sweep;
          const [x1, y1] = arcPoint(a, r - 22);
          const [x2, y2] = arcPoint(a, i % 4 === 0 ? r - 33 : r - 28);
          return (
            <line
              key={t}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--muted-foreground)"
              strokeWidth={i % 4 === 0 ? 2.4 : 1.2}
              strokeLinecap="round"
              opacity={i % 4 === 0 ? 0.95 : 0.5}
            />
          );
        })}

        {/* стрелка */}
        <g style={{ transition: "all 1.1s cubic-bezier(0.4,0,0.2,1)" }}>
          <line
            x1={cx}
            y1={cy}
            x2={nx}
            y2={ny}
            stroke="var(--foreground)"
            strokeWidth="3.4"
            strokeLinecap="round"
          />
        </g>
        <circle cx={cx} cy={cy} r="9" fill="var(--card)" stroke="var(--foreground)" strokeWidth="2.5" />
        <circle cx={cx} cy={cy} r="3" fill="var(--primary)" />

        <text x={cx - r + 2} y={cy + 6} textAnchor="middle" fill="var(--foreground)" fontSize="13" fontWeight="700">
          E
        </text>
        <text x={cx + r - 2} y={cy + 6} textAnchor="middle" fill="var(--foreground)" fontSize="13" fontWeight="700">
          F
        </text>
        <text x={cx} y={cy + 26} textAnchor="middle" fill="var(--muted-foreground)" fontSize="9" letterSpacing="2.5">
          ГОРИВО
        </text>
        <text x={cx} y={cy + 48} textAnchor="middle" fill="var(--foreground)" fontSize="22" fontWeight="700">
          {Math.round(clamped * 100)}%
        </text>
      </svg>

      <div className="mt-1 text-center">
        <p className="text-sm font-medium text-foreground">
          ≈ {litersLeft} л в резервоара
          <span className="text-muted-foreground"> / {tankCapacity} л</span>
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {litersUsed} литра изразходвани от началото на наема
        </p>
        {low && (
          <p className="mt-1.5 text-xs font-semibold text-primary">
            Ниско ниво — заредете преди връщане
          </p>
        )}
      </div>
    </div>
  );
}
