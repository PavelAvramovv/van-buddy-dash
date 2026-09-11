import { cn } from "@/lib/utils";

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
        <svg
          viewBox="0 0 100 100"
          className={cn(common, "bg-white p-[2px]")}
          aria-hidden="true"
        >
          <circle cx="50" cy="50" r="48" fill="#1a1a1a" />
          <g fill="#f4f4f4">
            {/* стилизиран лъв на Peugeot */}
            <path d="M55.5 28c-3.2 0-5.8 1.5-7.2 3.9-1.8-.8-3.8-1.2-5.8-1.2-2.3 0-4.5.5-6.5 1.5-2.5 1.2-4.6 3.2-5.9 5.7-1.3 2.6-1.8 5.5-1.3 8.3.4 2.3 1.5 4.4 3 6.1-1.1 1.3-1.8 3-1.8 4.9 0 3.6 2.6 6.6 6 7.2-.4 1.2-.6 2.5-.6 3.8 0 6.8 5.1 12.4 11.6 13.1v6.7h4.4v-6.4c4.6-.9 8.4-4.2 9.7-8.6 1.2.2 2.4.2 3.6.2 4.5 0 8.9-1.1 12.8-3.2 2.3-1.3 3.5-4.1 2.9-6.7-.3-1.2-1-2.3-1.9-3.1 1.1-1.4 1.7-3.1 1.7-4.9 0-4.2-3.4-7.7-7.6-7.8-.5-3.6-2.2-6.9-4.8-9.5-3.1-3.1-7.3-4.9-11.6-4.9zm-.3 4.4c3.2 0 6.2 1.4 8.3 3.7 2 2.1 3.2 4.9 3.5 7.8.1 1 .9 1.8 1.9 1.9 2.6.1 4.7 2.2 4.7 4.8 0 1.1-.4 2.1-1 2.9-.7.9-.7 2.1 0 3 .5.6.8 1.4.8 2.2 0 1.6-1 3-2.4 3.6-3.1 1.7-6.7 2.5-10.2 2.5-.9 0-1.9-.1-2.8-.2-.8-.1-1.6.2-2.1.8-1.8 2.8-5 4.6-8.5 4.6-4.9 0-9-3.8-9.4-8.6 0-.6-.1-1.2-.1-1.9 0-1 .1-2 .4-2.9.3-.9 0-1.8-.6-2.4-1.3-1.2-2.1-2.9-2.4-4.7-.4-2.1.1-4.2 1-6 1-1.9 2.5-3.4 4.4-4.3 1.5-.7 3.1-1.1 4.8-1.1 1.7 0 3.4.4 4.9 1.1.7.3 1.5.2 2.1-.3 1.4-1.6 3.5-2.6 5.7-2.6h.8z" />
            <path d="M44.5 51.2c-.6 0-1.1.5-1.1 1.1v4.4c0 .6.5 1.1 1.1 1.1s1.1-.5 1.1-1.1v-4.4c0-.6-.5-1.1-1.1-1.1zm11.2 0c-.6 0-1.1.5-1.1 1.1v4.4c0 .6.5 1.1 1.1 1.1s1.1-.5 1.1-1.1v-4.4c0-.6-.5-1.1-1.1-1.1z" />
          </g>
        </svg>
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
