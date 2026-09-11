import { cn } from "@/lib/utils";

const marks: Record<string, { label: string; short: string }> = {
  Peugeot: { label: "Peugeot", short: "PE" },
  Fiat: { label: "Fiat", short: "FI" },
  "Citroën": { label: "Citroën", short: "CI" },
  Citroen: { label: "Citroën", short: "CI" },
  Renault: { label: "Renault", short: "RE" },
  VW: { label: "Volkswagen", short: "VW" },
  Volkswagen: { label: "Volkswagen", short: "VW" },
  Mercedes: { label: "Mercedes-Benz", short: "MB" },
  Ford: { label: "Ford", short: "FO" },
  Iveco: { label: "Iveco", short: "IV" },
  "24Cargo": { label: "24Cargo", short: "24" },
};

export function BrandBadge({
  brand,
  className,
  size = "md",
}: {
  brand: string;
  className?: string;
  size?: "sm" | "md";
}) {
  const mark = marks[brand] ?? marks["24Cargo"];

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full border border-border/70 bg-background/40 backdrop-blur-sm",
        size === "md" ? "py-1.5 pl-1.5 pr-3.5" : "py-1 pl-1 pr-3",
        className,
      )}
      aria-label={`Марка: ${mark.label}`}
    >
      <span
        className={cn(
          "grid place-items-center rounded-full bg-foreground/95 font-bold tracking-tight text-navy",
          size === "md" ? "size-8 text-[11px]" : "size-6 text-[10px]",
        )}
      >
        {mark.short}
      </span>
      <span
        className={cn(
          "font-semibold uppercase tracking-[0.14em] text-foreground/90",
          size === "md" ? "text-xs" : "text-[10px]",
        )}
      >
        {mark.label}
      </span>
    </div>
  );
}
