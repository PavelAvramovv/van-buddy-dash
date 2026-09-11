import { cn } from "@/lib/utils";
import { statusLabels, type ReservationStatus } from "@/lib/mock-data";

const styles: Record<ReservationStatus, string> = {
  new: "bg-warning/15 text-warning border-warning/30",
  confirmed: "bg-info/15 text-info border-info/30",
  cancelled: "bg-primary/15 text-primary border-primary/30",
  completed: "bg-success/15 text-success border-success/30",
};

export function StatusPill({ status }: { status: ReservationStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold capitalize",
        styles[status],
      )}
    >
      {statusLabels[status]}
    </span>
  );
}
