import { useEffect, useState } from "react";

function diff(target: string) {
  const ms = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
    done: ms === 0,
  };
}

export function Countdown({ target }: { target: string }) {
  const [t, setT] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!t) {
    return (
      <div className="grid grid-cols-4 gap-2">
        {["дни", "часа", "мин", "сек"].map((label) => (
          <div
            key={label}
            className="rounded-2xl border border-border/60 bg-background/35 px-1 py-2.5 text-center backdrop-blur-sm"
          >
            <div className="tabular text-2xl font-bold leading-none text-foreground sm:text-3xl">
              --
            </div>
            <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-foreground/60">
              {label}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const cells = [
    { value: t.days, label: "дни" },
    { value: t.hours, label: "часа" },
    { value: t.minutes, label: "мин" },
    { value: t.seconds, label: "сек" },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {cells.map((c) => (
        <div
          key={c.label}
          className="rounded-2xl border border-border/60 bg-background/35 px-1 py-2.5 text-center backdrop-blur-sm"
        >
          <div className="tabular text-2xl font-bold leading-none text-foreground sm:text-3xl">
            {String(c.value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-foreground/60">
            {c.label}
          </div>
        </div>
      ))}
    </div>
  );
}
