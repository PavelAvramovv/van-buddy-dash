import { cn } from "@/lib/utils";
import { BrandLogo } from "./BrandLogo";

const marks: Record<string, { label: string }> = {
  Peugeot: { label: "Peugeot" },
  Fiat: { label: "Fiat" },
  "Citroën": { label: "Citroën" },
  Citroen: { label: "Citroën" },
  Renault: { label: "Renault" },
  VW: { label: "Volkswagen" },
  Volkswagen: { label: "Volkswagen" },
  Mercedes: { label: "Mercedes-Benz" },
  Ford: { label: "Ford" },
  Iveco: { label: "Iveco" },
  "24Cargo": { label: "24Cargo" },
};

export function BrandBadge({
  brand,
  className,
  size = "md",
  showLabel = true,
}: {
  brand: string;
  className?: string;
  size?: "sm" | "md";
  showLabel?: boolean;
}) {
  const mark = marks[brand] ?? { label: "24Cargo" };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 backdrop-blur-sm",
        size === "md" ? "py-1.5 pl-1.5 pr-3.5" : "py-1 pl-1 pr-3",
        className,
      )}
      aria-label={`Марка: ${mark.label}`}
    >
      <BrandLogo brand={brand} size={size} />
      {showLabel && (
        <span
          className={cn(
            "font-semibold uppercase tracking-[0.12em] text-white/90",
            size === "md" ? "text-xs" : "text-[10px]",
          )}
        >
          {mark.label}
        </span>
      )}
    </div>
  );
}
