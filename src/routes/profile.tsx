import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Lock, MailCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/portal/AppShell";
import { customer, initials } from "@/lib/mock-data";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Моят профил — 24Cargo клиентски портал" },
      {
        name: "description",
        content:
          "Редактирайте име, адрес и имейл в клиентския профил на 24Cargo. Телефонният номер е вашият вход в системата.",
      },
      { property: "og:title", content: "Моят профил — 24Cargo" },
      { property: "og:description", content: "Управлявайте данните си за наем на бус в 24Cargo." },
    ],
  }),
  component: ProfileScreen,
});

function ProfileScreen() {
  const [firstName, setFirstName] = useState(customer.firstName);
  const [lastName, setLastName] = useState(customer.lastName);
  const [address, setAddress] = useState(customer.address);
  const [newEmail, setNewEmail] = useState("");
  const [emailPending, setEmailPending] = useState(false);

  return (
    <AppShell>
    <main className="mx-auto w-full max-w-2xl px-4 pb-16 pt-6 sm:px-6">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Обратно към таблото
      </Link>

      <div className="mt-5 flex items-center gap-4">
        <span className="grid size-16 place-items-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground shadow-glow">
          {initials}
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Моят профил</h1>
          <p className="text-sm text-muted-foreground">Клиент от {customer.memberSince}</p>
        </div>
      </div>

      <Card className="mt-6 rounded-3xl border-border bg-card shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Лични данни</CardTitle>
          <CardDescription>Използваме ги за договорите и фактурите.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="first" className="text-xs uppercase tracking-wider text-muted-foreground">
                Име
              </Label>
              <Input
                id="first"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-2 h-11 rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="last" className="text-xs uppercase tracking-wider text-muted-foreground">
                Фамилия
              </Label>
              <Input
                id="last"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-2 h-11 rounded-xl"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address" className="text-xs uppercase tracking-wider text-muted-foreground">
              Адрес
            </Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-2 h-11 rounded-xl"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-xs uppercase tracking-wider text-muted-foreground">
              Телефон
            </Label>
            <div className="relative mt-2">
              <Input
                id="phone"
                value={customer.phone}
                readOnly
                className="h-11 rounded-xl bg-secondary pr-10 text-muted-foreground"
              />
              <Lock className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Телефонът е вашият вход в системата и не може да се променя тук. За смяна се обадете
              на +359 88 888 2424.
            </p>
          </div>

          <Button
            className="h-11 w-full rounded-xl"
            onClick={() => toast.success("Промените са запазени.")}
          >
            Запази промените
          </Button>
        </CardContent>
      </Card>

      <Card className="mt-5 rounded-3xl border-border bg-card shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Имейл за вход</CardTitle>
          <CardDescription>
            Текущ имейл: <span className="text-foreground">{customer.email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {emailPending ? (
            <div className="flex items-start gap-3 rounded-2xl bg-success/10 p-4">
              <MailCheck className="mt-0.5 size-5 shrink-0 text-success" />
              <div>
                <p className="text-sm font-semibold">Потвърдете новия имейл</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Изпратихме линк за потвърждение на {newEmail}. Смяната влиза в сила след
                  потвърждение.
                </p>
                <button
                  type="button"
                  onClick={() => setEmailPending(false)}
                  className="mt-2 text-xs text-muted-foreground underline-offset-4 hover:underline"
                >
                  Отказ от смяната
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground">
                  Нов имейл
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="novimail@example.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="mt-2 h-11 rounded-xl"
                />
              </div>
              <Button
                variant="secondary"
                className="h-11 w-full rounded-xl"
                onClick={() => {
                  if (!/.+@.+\..+/.test(newEmail)) {
                    toast.error("Въведете валиден имейл адрес.");
                    return;
                  }
                  setEmailPending(true);
                  toast.success("Изпратихме линк за потвърждение.");
                }}
              >
                Смени имейла
              </Button>
              <p className="text-xs text-muted-foreground">
                Ще изпратим линк за потвърждение на новия адрес.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
    </AppShell>
  );
}
