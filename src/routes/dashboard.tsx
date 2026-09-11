import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarClock,
  Check,
  Copy,
  Download,
  Gauge,
  Gift,
  MapPin,
  Repeat,
  Route as RouteIcon,
  Star,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppShell } from "@/components/portal/AppShell";
import { BrandBadge } from "@/components/portal/BrandBadge";
import { Countdown } from "@/components/portal/Countdown";
import { FuelGauge } from "@/components/portal/FuelGauge";
import { MileageTrack } from "@/components/portal/MileageTrack";
import { ReturnVanDialog } from "@/components/portal/ReturnVanDialog";
import { StatusPill } from "@/components/portal/StatusPill";
import { UploadReceiptDialog } from "@/components/portal/UploadReceiptDialog";
import {
  activeRental,
  contracts,
  customer,
  eur,
  payments,
  reservations,
  upcomingRental,
} from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Моето табло — 24Cargo клиентски портал" },
      {
        name: "description",
        content:
          "Активен наем с таймер за връщане, пробег, ниво на гориво, лоялна отстъпка, договори и плащания — всичко в клиентското табло на 24Cargo.",
      },
      { property: "og:title", content: "Моето табло — 24Cargo" },
      {
        property: "og:description",
        content: "Следете активния си наем на бус в реално време — пробег, гориво и таймер.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const maxDiscount = 20;
  const referralLink = `https://24cargo.bg/r/${customer.referralCode}`;
  const [copied, setCopied] = useState(false);
  const daysToStart = Math.ceil(
    (new Date(upcomingRental.startAt).getTime() - Date.now()) / 86400000,
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success("Линкът е копиран.");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Копирайте линка ръчно.");
    }
  };

  return (
    <AppShell>
      <main className="ambient mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">24Cargo · клиентски портал</p>
            <h1 className="mt-1.5 text-2xl uppercase sm:text-3xl">Моето табло</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Здравейте, {customer.firstName} · клиент от {customer.memberSince}
            </p>
          </div>
          <div className="flex gap-2">
            <Stat value={String(customer.completedRentals)} label="завършени наеми" />
            <Stat value={`${Math.round(customer.totalPaid)}`} label="платено (EUR)" />
            <Stat value={`${customer.loyaltyDiscount}%`} label="отстъпка" accent />
          </div>
        </div>

        {/* Bento */}
        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Active rental — hero tile */}
          <section className="on-dark sheen relative overflow-hidden rounded-3xl bg-gradient-active p-5 shadow-glow ring-1 ring-white/10 lg:col-span-2 lg:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground">
                  <span className="size-1.5 animate-pulse rounded-full bg-primary-foreground" />
                  Активен наем
                </span>
                <h2 className="mt-3 text-2xl uppercase leading-tight sm:text-3xl">
                  {activeRental.vehicle}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {activeRental.plate} · взет {activeRental.pickedUpAt} · №{activeRental.reference}
                </p>
              </div>
              <BrandBadge brand={activeRental.brand} />
            </div>

            <div className="mt-5 rounded-2xl border border-border bg-white/5 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                До връщане на буса
              </p>
              <div className="mt-2.5">
                <Countdown target={activeRental.returnAt} />
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
              <UploadReceiptDialog />
              <ReturnVanDialog vehicle={activeRental.vehicle} plate={activeRental.plate} />
            </div>
          </section>

          {/* Fuel gauge tile */}
          <section className="card-premium p-5">
            <TileTitle icon={<Gauge className="size-4" />} title="Гориво" hint="GPS сензор" />
            <div className="mt-2">
              <FuelGauge
                level={activeRental.fuelLevel}
                litersUsed={activeRental.litersUsed}
                tankCapacity={activeRental.tankCapacity}
              />
            </div>
          </section>

          {/* Mileage tile */}
          <section className="card-premium p-5 lg:col-span-2">
            <TileTitle
              icon={<RouteIcon className="size-4" />}
              title="Пробег"
              hint={`${activeRental.includedKm} км включени`}
            />
            <div className="mt-4">
              <MileageTrack
                drivenKm={activeRental.drivenKm}
                includedKm={activeRental.includedKm}
                extraKmPrice={activeRental.extraKmPrice}
              />
            </div>
          </section>

          {/* Upcoming */}
          <section className="on-dark sheen relative overflow-hidden rounded-3xl bg-gradient-upcoming p-5 shadow-elevated ring-1 ring-white/10">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]">
              <CalendarClock className="size-3.5" />
              Предстоящ наем
            </span>
            <h2 className="mt-3 text-xl uppercase leading-tight">{upcomingRental.vehicle}</h2>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-white/75">
              <MapPin className="size-3.5" />
              {upcomingRental.pickupPoint}
            </p>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="tabular font-display text-4xl leading-none">{daysToStart}</p>
                <p className="text-xs uppercase tracking-wider text-white/70">дни до началото</p>
              </div>
              <p className="text-sm text-white/85">
                {upcomingRental.days} дни · {eur(upcomingRental.price)}
              </p>
            </div>
          </section>

          {/* Loyalty */}
          <section className="card-premium p-5">
            <TileTitle
              icon={<Star className="size-4 text-gold-deep" />}
              title="Лоялност"
              hint={`макс. ${maxDiscount}%`}
            />
            <p className="tabular mt-3 font-display text-4xl leading-none">
              {customer.loyaltyDiscount}%
            </p>
            <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-secondary inset-ring inset-ring-black/5">
              <div
                className="h-full rounded-full bg-gradient-gold shadow-[0_0_12px_oklch(0.82_0.11_85/0.55)] transition-[width] duration-700"
                style={{ width: `${(customer.loyaltyDiscount / maxDiscount) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {customer.completedRentals} от 10 наема · още {10 - customer.completedRentals} до 20%
            </p>
          </section>

          {/* Referral */}
          <section className="card-premium p-5 lg:col-span-2">
            <TileTitle
              icon={<Gift className="size-4 text-primary" />}
              title="Покани приятел"
              hint={
                <span className="inline-flex items-center gap-1.5">
                  <Users className="size-3.5" />
                  {customer.invitedFriends} поканени
                </span>
              }
            />
            <p className="mt-2 text-sm text-muted-foreground">
              Приятелят получава 10% отстъпка, вие — безплатен ден при следващия наем.
            </p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <div className="flex flex-1 gap-2">
                <Input readOnly value={referralLink} className="h-11 rounded-xl bg-secondary text-sm" />
                <Button variant="secondary" onClick={copy} className="h-11 shrink-0 rounded-xl px-3.5">
                  {copied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
                  <span className="sr-only">Копирай линка</span>
                </Button>
              </div>
              <Button
                asChild
                className="h-11 rounded-xl bg-success text-success-foreground hover:bg-success/90"
              >
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `Наемам бус от 24Cargo — вземи 10% отстъпка с моя линк: ${referralLink}`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Сподели в WhatsApp
                </a>
              </Button>
            </div>
          </section>

          {/* Reservations */}
          <section
            id="reservations"
            className="scroll-mt-24 card-premium p-5 lg:col-span-2"
          >
            <TileTitle title="Моите резервации" hint={`${reservations.length} записа`} />
            <div className="mt-3 space-y-2.5">
              {reservations.map((r) => (
                <div
                  key={r.id}
                  className="rounded-2xl border border-border/70 bg-gradient-to-b from-secondary/60 to-secondary/20 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-card"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate font-semibold">{r.vehicle}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {r.from} – {r.to} · {r.service}
                      </p>
                    </div>
                    <StatusPill status={r.status} />
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">{eur(r.price)}</span> ·{" "}
                      {r.paymentMethod}
                    </p>
                    {r.status === "completed" && (
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-9 rounded-xl"
                        onClick={() =>
                          toast.success(`Заявка за нов наем на ${r.vehicle} е започната.`)
                        }
                      >
                        <Repeat className="mr-1.5 size-3.5" />
                        Наеми пак
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="space-y-4">
            {/* Contracts */}
            <section
              id="contracts"
              className="scroll-mt-24 card-premium p-5"
            >
              <TileTitle title="Договори" hint={`${contracts.length} бр.`} />
              <div className="mt-3 space-y-2.5">
                {contracts.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-border/70 bg-gradient-to-b from-secondary/60 to-secondary/20 p-3.5 transition-colors hover:border-border"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{c.reference}</p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {c.signedAt} · PDF {c.fileSize}
                      </p>
                    </div>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="size-9 shrink-0 rounded-xl"
                      onClick={() => toast.success("Изтеглянето на PDF започна.")}
                      aria-label="Свали PDF"
                    >
                      <Download className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </section>

            {/* Payments */}
            <section
              id="payments"
              className="scroll-mt-24 card-premium p-5"
            >
              <TileTitle title="Плащания" hint="история" />
              <div className="mt-3 space-y-2">
                {payments.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-border/70 bg-gradient-to-b from-secondary/60 to-secondary/20 px-3.5 py-2.5"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold">
                        {eur(p.amount)}
                        {p.status === "refunded" && (
                          <span className="ml-2 text-xs font-medium text-muted-foreground">
                            възстановено
                          </span>
                        )}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {p.date} · {p.method}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="secondary"
                className="mt-3 h-11 w-full rounded-xl"
                onClick={() => toast.success("Справката (CSV) се генерира.")}
              >
                <Download className="mr-2 size-4" />
                Свали справка (CSV)
              </Button>
            </section>
          </div>
        </div>
      </main>
    </AppShell>
  );
}

function Stat({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <div
      className={`min-w-[96px] rounded-2xl px-3.5 py-2.5 transition-transform duration-300 hover:-translate-y-0.5 ${
        accent
          ? "bg-navy text-white shadow-glow ring-1 ring-white/10"
          : "card-premium"
      }`}
    >
      <p className="tabular font-display text-xl leading-none">{value}</p>
      <p className={`mt-1 text-[11px] leading-tight ${accent ? "text-white/70" : "text-muted-foreground"}`}>
        {label}
      </p>
    </div>
  );
}

function TileTitle({
  icon,
  title,
  hint,
}: {
  icon?: React.ReactNode;
  title: string;
  hint?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="flex items-center gap-2 text-sm uppercase tracking-[0.06em]">
        {icon}
        {title}
      </h2>
      {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
    </div>
  );
}
