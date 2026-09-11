import type { ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { CreditCard, FileText, LayoutDashboard, LogOut, Truck, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { customer, initials } from "@/lib/mock-data";

const nav = [
  { to: "/dashboard", label: "Табло", icon: LayoutDashboard },
  { to: "/dashboard", label: "Наеми", icon: Truck, hash: "reservations" },
  { to: "/dashboard", label: "Договори", icon: FileText, hash: "contracts" },
  { to: "/dashboard", label: "Плащания", icon: CreditCard, hash: "payments" },
  { to: "/profile", label: "Профил", icon: User },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar (desktop) */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[84px] flex-col items-center justify-between bg-navy py-6 lg:flex">
        <div className="flex flex-col items-center gap-7">
          <span className="grid size-12 place-items-center rounded-2xl bg-primary font-display text-sm text-primary-foreground">
            24
          </span>

          <nav className="flex flex-col items-center gap-2">
            {nav.map((item) => {
              const active = pathname === item.to && !("hash" in item && item.hash);
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  {...("hash" in item ? { hash: item.hash } : {})}
                  className={cn(
                    "group grid size-12 place-items-center rounded-2xl transition-colors duration-300",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-white/45 hover:bg-white/10 hover:text-white",
                  )}
                  aria-label={item.label}
                  title={item.label}
                >
                  <item.icon className="size-5" />
                </Link>
              );
            })}
          </nav>
        </div>

        <Link
          to="/"
          className="grid size-12 place-items-center rounded-2xl text-white/45 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Изход"
          title="Изход"
        >
          <LogOut className="size-5" />
        </Link>
      </aside>

      {/* Topbar */}
      <div className="lg:pl-[84px]">
        <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur-md">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
            <div className="flex items-center gap-2.5 lg:hidden">
              <span className="grid size-9 place-items-center rounded-xl bg-navy font-display text-[11px] text-white">
                24
              </span>
              <span className="font-display text-sm uppercase tracking-tight">24Cargo</span>
            </div>

            <p className="hidden text-sm text-muted-foreground lg:block">
              Клиентски портал · София
            </p>

            <Link
              to="/profile"
              className="flex items-center gap-2.5 rounded-full border border-border bg-card py-1 pl-1 pr-3.5 shadow-card transition-shadow hover:shadow-glow"
            >
              <span className="grid size-8 place-items-center rounded-full bg-navy text-[11px] font-semibold text-white">
                {initials}
              </span>
              <span className="max-w-[120px] truncate text-sm font-semibold">
                {customer.firstName}
              </span>
            </Link>
          </div>
        </header>

        <div className="pb-24 lg:pb-10">{children}</div>
      </div>

      {/* Bottom nav (mobile) */}
      <nav className="fixed bottom-3 left-1/2 z-30 flex w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 items-center justify-around rounded-3xl bg-navy p-2 shadow-glow lg:hidden">
        {nav.map((item) => {
          const active = pathname === item.to && !("hash" in item && item.hash);
          return (
            <Link
              key={item.label}
              to={item.to}
              {...("hash" in item ? { hash: item.hash } : {})}
              className={cn(
                "grid size-11 place-items-center rounded-2xl transition-colors",
                active ? "bg-primary text-primary-foreground" : "text-white/50",
              )}
              aria-label={item.label}
            >
              <item.icon className="size-5" />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
