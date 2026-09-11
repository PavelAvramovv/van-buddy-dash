import { useEffect, useState } from "react";
import { eur } from "@/lib/mock-data";

type Props = {
  drivenKm: number;
  includedKm: number;
  extraKmPrice: number;
};

/** Хоризонтална лента с 🏁 флагче — изминати км от включените в наема. */
export function MileageTrack({ drivenKm, includedKm, extraKmPrice }: Props) {
  const ratio = drivenKm / includedKm;
  const over = Math.max(0, drivenKm - includedKm);
  const percent = Math.min(100, ratio * 100);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(percent), 150);
    return () => clearTimeout(t);
  }, [percent]);

  const barColor =
    ratio >= 1 ? "var(--primary)" : ratio >= 0.85 ? "var(--warning)" : "var(--success)";

  return (
    <div>
      <div className="mb-2.5 flex items-end justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Пробег
        </p>
        <p className="tabular text-sm font-semibold text-foreground">
          {drivenKm} <span className="text-muted-foreground">/ {includedKm} км</span>
        </p>
      </div>

      <div className="relative pt-6">
        {/* флагче маркер */}
        <div
          className="absolute top-0 -translate-x-1/2 transition-[left] duration-1000 ease-out"
          style={{ left: `${width}%` }}
        >
          <span className="block text-base leading-none" aria-hidden>
            🏁
          </span>
        </div>

        <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full transition-[width] duration-1000 ease-out"
            style={{ width: `${width}%`, backgroundColor: barColor }}
          />
        </div>

        <div className="mt-1.5 flex justify-between text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          <span>0 км</span>
          <span>{includedKm} км включени</span>
        </div>
      </div>

      {over > 0 ? (
        <p className="mt-2.5 rounded-xl bg-primary/15 px-3 py-2 text-xs font-medium text-foreground">
          Просрочен лимит с <strong>{over} км</strong> — доплащане{" "}
          <strong>{eur(over * extraKmPrice)}</strong> ({extraKmPrice.toFixed(2)} EUR/км)
        </p>
      ) : (
        <p className="mt-2.5 text-xs text-muted-foreground">
          <strong className="text-foreground">{includedKm - drivenKm} км остават</strong> до лимита ·
          над него {extraKmPrice.toFixed(2)} EUR/км
        </p>
      )}
    </div>
  );
}
