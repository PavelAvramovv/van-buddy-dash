import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarClock,
  Check,
  Copy,
  Download,
  FileText,
  Gift,
  LogOut,
  MapPin,
  Repeat,
  Star,
  Truck,
  User,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  initials,
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
    <main className="mx-auto w-full max-w-3xl px-4 pb-20 pt-5 sm:px-6">
      {/* Hero header */}
      <section className="rounded-3xl border border-border bg-gradient-hero p-5 shadow-card">
        <div className="flex items-center gap-4">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground shadow-glow">
            {initials}
          </span>
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              24Cargo клиентски портал
            </p>
            <h1 className="mt-0.5 truncate text-xl font-bold tracking-tight sm:text-2xl">
              {customer.firstName} {customer.lastName}
            </h1>
            <p className="text-sm text-muted-foreground">{customer.phone}</p>
          </div>
        </div>

        <div className="mt-4 flex gap-2.5">
          <Button asChild variant="secondary" className="h-10 flex-1 rounded-xl">
            <Link to="/profile">
              <User className="mr-2 size-4" />
              Профил
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-10 flex-1 rounded-xl">
            <Link to="/">
              <LogOut className="mr-2 size-4" />
              Изход
            </Link>
          </Button>
        </div>
      </section>

      {/* Stat cards */}
      <section className="mt-4 grid grid-cols-3 gap-2.5">
        <StatCard emoji="🚐" value={String(customer.completedRentals)} label="завършени наеми" />
        <StatCard emoji="💶" value={`${Math.round(customer.totalPaid)}`} label="общо платено (EUR)" />
        <StatCard emoji="⭐" value={`${customer.loyaltyDiscount}%`} label="лоялна отстъпка" />
      </section>

      {/* Active rental */}
      <section className="mt-4 overflow-hidden rounded-3xl border border-primary/35 bg-gradient-active shadow-glow">
        <div className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-primary-foreground">
              <span className="size-1.5 animate-pulse rounded-full bg-primary-foreground" />
              Активен наем
            </span>
            <BrandBadge brand={activeRental.brand} />
          </div>

          <h2 className="mt-4 text-2xl font-bold leading-tight tracking-tight">
            {activeRental.vehicle}
          </h2>
          <p className="mt-1 text-sm text-foreground/70">
            {activeRental.plate} · взет {activeRental.pickedUpAt} · №{activeRental.reference}
          </p>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/60">
            До връщане на буса
          </p>
          <div className="mt-2.5">
            <Countdown target={activeRental.returnAt} />
          </div>

          <div className="mt-6 rounded-2xl border border-border/50 bg-background/35 p-4 backdrop-blur-sm">
            <MileageTrack
              drivenKm={activeRental.drivenKm}
              includedKm={activeRental.includedKm}
              extraKmPrice={activeRental.extraKmPrice}
            />
          </div>

          <div className="mt-3 rounded-2xl border border-border/50 bg-background/35 p-4 pt-5 backdrop-blur-sm">
            <FuelGauge
              level={activeRental.fuelLevel}
              litersUsed={activeRental.litersUsed}
              tankCapacity={activeRental.tankCapacity}
            />
          </div>

          <div className="mt-4 space-y-2.5">
            <UploadReceiptDialog />
            <ReturnVanDialog vehicle={activeRental.vehicle} plate={activeRental.plate} />
          </div>
        </div>
      </section>

      {/* Upcoming rental */}
      <section className="mt-4 rounded-3xl border border-info/30 bg-gradient-upcoming p-5 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-info/20 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-info">
            <CalendarClock className="size-3.5" />
            Предстоящ наем
          </span>
          <BrandBadge brand={upcomingRental.brand} size="sm" />
        </div>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold tracking-tight">{upcomingRental.vehicle}</h2>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-foreground/70">
              <MapPin className="size-3.5" />
              {upcomingRental.pickupPoint}
            </p>
          </div>
          <div className="text-right">
            <p className="tabular text-3xl font-bold leading-none">{daysToStart}</p>
            <p className="text-xs uppercase tracking-wider text-foreground/60">дни до началото</p>
          </div>
        </div>

        <p className="mt-3 text-sm text-foreground/70">
          {upcomingRental.days} дни · {eur(upcomingRental.price)} · №{upcomingRental.reference}
        </p>
      </section>

      {/* Loyalty */}
      <Card className="mt-4 rounded-3xl border-border bg-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Star className="size-4 text-warning" />
            Програма за лоялност
          </CardTitle>
          <CardDescription>
            2% отстъпка за всеки завършен наем, до 20% при 10 наема.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between">
            <p className="tabular text-3xl font-bold leading-none">{customer.loyaltyDiscount}%</p>
            <p className="text-xs text-muted-foreground">макс. {maxDiscount}%</p>
          </div>
          <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-warning transition-[width] duration-700"
              style={{ width: `${(customer.loyaltyDiscount / maxDiscount) * 100}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>{customer.completedRentals} от 10 наема</span>
            <span>още {10 - customer.completedRentals} наема до 20%</span>
          </div>
        </CardContent>
      </Card>

      {/* Referral */}
      <Card className="mt-4 rounded-3xl border-border bg-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Gift className="size-4 text-primary" />
            Покани приятел
          </CardTitle>
          <CardDescription>
            Приятелят получава 10% отстъпка, вие — безплатен ден при следващия наем.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input readOnly value={referralLink} className="h-11 rounded-xl bg-secondary text-sm" />
            <Button variant="secondary" onClick={copy} className="h-11 shrink-0 rounded-xl px-3.5">
              {copied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
              <span className="sr-only">Копирай линка</span>
            </Button>
          </div>

          <Button
            asChild
            variant="outline"
            className="mt-2.5 h-11 w-full rounded-xl border-success/40 text-success hover:bg-success/10 hover:text-success"
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

          <p className="mt-3 text-xs text-muted-foreground">
            Поканени приятели:{" "}
            <span className="font-semibold text-foreground">{customer.invitedFriends}</span>
          </p>
        </CardContent>
      </Card>

      {/* Reservations */}
      <Card className="mt-4 rounded-3xl border-border bg-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Truck className="size-4 text-muted-foreground" />
            Моите резервации
          </CardTitle>
          <CardDescription>Всички наеми и заявки по вашия номер.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2.5">
          {reservations.map((r) => (
            <div key={r.id} className="rounded-2xl border border-border bg-secondary/40 p-4">
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
                    onClick={() => toast.success(`Заявка за нов наем на ${r.vehicle} е започната.`)}
                  >
                    <Repeat className="mr-1.5 size-3.5" />
                    Наеми пак
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Contracts */}
      <Card className="mt-4 rounded-3xl border-border bg-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="size-4 text-muted-foreground" />
            Моите договори
          </CardTitle>
          <CardDescription>Подписани договори за наем.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2.5">
          {contracts.map((c) => (
            <div
              key={c.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-secondary/40 p-4"
            >
              <div className="min-w-0">
                <p className="truncate font-semibold">{c.reference}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {c.vehicle} · подписан {c.signedAt} · PDF {c.fileSize}
                </p>
              </div>
              <Button
                size="sm"
                variant="secondary"
                className="h-9 rounded-xl"
                onClick={() => toast.success("Изтеглянето на PDF започна.")}
              >
                <Download className="mr-1.5 size-3.5" />
                Свали PDF
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Payments */}
      <Card className="mt-4 rounded-3xl border-border bg-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Wallet className="size-4 text-muted-foreground" />
            Плащания
          </CardTitle>
          <CardDescription>История на плащанията по вашия профил.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2.5">
            {payments.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-secondary/40 px-4 py-3"
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
                    {p.date} · №{p.reference} · {p.method}
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
        </CardContent>
      </Card>
    </main>
  );
}

function StatCard({ emoji, value, label }: { emoji: string; value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-3.5 text-center shadow-card">
      <span className="text-lg leading-none" aria-hidden>
        {emoji}
      </span>
      <p className="tabular mt-1.5 text-xl font-bold leading-none">{value}</p>
      <p className="mt-1 text-[11px] leading-tight text-muted-foreground">{label}</p>
    </div>
  );
}
