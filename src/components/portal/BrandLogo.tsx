import { cn } from "@/lib/utils";
import peugeotLogo from "@/assets/peugeot-logo.png.asset.json";

export type BrandKey =
  | "Peugeot"
  | "Fiat"
  | "Citroën"
  | "Citroen"
  | "Renault"
  | "VW"
  | "Volkswagen"
  | "Mercedes"
  | "Ford"
  | "Iveco"
  | "24Cargo";

function sizeClasses(size: "sm" | "md") {
  return size === "md" ? "size-8" : "size-6";
}

export function BrandLogo({
  brand,
  size = "md",
  className,
}: {
  brand: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const b = brand as BrandKey;

  const common = cn(
    "shrink-0 rounded-full object-contain",
    sizeClasses(size),
    className,
  );

  switch (b) {
    case "Peugeot":
      return (
        <img
          src={peugeotLogo.url}
          alt="Peugeot"
          className={cn(common, "bg-white p-[2px]")}
          loading="lazy"
        />
      );


    case "Fiat":
      return (
        <svg
          viewBox="0 0 100 100"
          className={cn(common, "bg-[#B3002C] p-[2px]")}
          aria-hidden="true"
        >
          <circle cx="50" cy="50" r="48" fill="#B3002C" />
          <text
            x="50"
            y="60"
            textAnchor="middle"
            fill="#fff"
            fontSize="26"
            fontWeight="700"
            fontFamily="Arial, sans-serif"
            letterSpacing="1"
          >
            FIAT
          </text>
        </svg>
      );

    case "Citroën":
    case "Citroen":
      return (
        <svg
          viewBox="0 0 100 100"
          className={cn(common, "bg-white p-[2px]")}
          aria-hidden="true"
        >
          <circle cx="50" cy="50" r="48" fill="#fff" />
          <path
            d="M50 18L32 42h10l8-12 8 12h10L50 18zm0 28L32 70h10l8-12 8 12h10L50 46z"
            fill="#6E7F9B"
            stroke="#6E7F9B"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "Renault":
      return (
        <svg
          viewBox="0 0 100 100"
          className={cn(common, "bg-white p-[2px]")}
          aria-hidden="true"
        >
          <circle cx="50" cy="50" r="48" fill="#fff" />
          <path
            d="M50 18L22 50l28 32 28-32L50 18z"
            fill="none"
            stroke="#222"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path d="M50 28L32 50h36L50 28z" fill="#222" />
          <line x1="50" y1="28" x2="50" y2="82" stroke="#222" strokeWidth="3" />
        </svg>
      );

    case "VW":
    case "Volkswagen":
      return (
        <svg
          viewBox="0 0 100 100"
          className={cn(common, "bg-[#1a1a1a] p-[2px]")}
          aria-hidden="true"
        >
          <circle cx="50" cy="50" r="48" fill="#1a1a1a" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="#e8e8e8" strokeWidth="3" />
          <text
            x="50"
            y="64"
            textAnchor="middle"
            fill="#e8e8e8"
            fontSize="30"
            fontWeight="700"
            fontFamily="Arial, sans-serif"
            letterSpacing="-1"
          >
            VW
          </text>
        </svg>
      );

    case "Mercedes":
      return (
        <svg
          viewBox="0 0 100 100"
          className={cn(common, "bg-[#1a1a1a] p-[2px]")}
          aria-hidden="true"
        >
          <circle cx="50" cy="50" r="48" fill="#1a1a1a" />
          <path d="M50 14L28 74h44L50 14z" fill="none" stroke="#c0c0c0" strokeWidth="5" strokeLinejoin="round" />
          <path d="M50 14v60" stroke="#c0c0c0" strokeWidth="5" />
        </svg>
      );

    case "Ford":
      return (
        <svg
          viewBox="0 0 100 100"
          className={cn(common, "bg-white p-[2px]")}
          aria-hidden="true"
        >
          <ellipse cx="50" cy="50" rx="46" ry="30" fill="#183A72" />
          <text
            x="50"
            y="58"
            textAnchor="middle"
            fill="#fff"
            fontSize="22"
            fontWeight="700"
            fontFamily="Georgia, serif"
            fontStyle="italic"
          >
            Ford
          </text>
        </svg>
      );

    case "Iveco":
      return (
        <svg
          viewBox="0 0 100 100"
          className={cn(common, "bg-[#003399] p-[2px]")}
          aria-hidden="true"
        >
          <circle cx="50" cy="50" r="48" fill="#003399" />
          <text
            x="50"
            y="58"
            textAnchor="middle"
            fill="#fff"
            fontSize="16"
            fontWeight="700"
            fontFamily="Arial, sans-serif"
            letterSpacing="1"
          >
            IVECO
          </text>
        </svg>
      );

    default:
      return (
        <div
          className={cn(
            common,
            "grid place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground",
            size === "md" ? "text-[11px]" : "text-[10px]",
          )}
        >
          24
        </div>
      );
  }
}
