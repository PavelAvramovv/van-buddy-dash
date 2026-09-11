import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Phone, ShieldCheck, Truck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Вход в клиентския портал — 24Cargo" },
      {
        name: "description",
        content:
          "Влезте в клиентския портал на 24Cargo с телефонен номер — без парола. Следете активния наем, пробег, гориво, договори и плащания.",
      },
      { property: "og:title", content: "Вход в клиентския портал — 24Cargo" },
      {
        property: "og:description",
        content: "Бус под наем в София. Вход без парола — с линк на имейла ви.",
      },
    ],
  }),
  component: LoginScreen,
});

function LoginScreen() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.replace(/\D/g, "").length < 9) {
      toast.error("Въведете валиден телефонен номер.");
      return;
    }
    setSent(true);
    toast.success("Изпратихме ви линк за вход.");
  };

  return (
    <main className="relative flex min-h-screen flex-col justify-center overflow-hidden px-5 py-12">
      <div className="pointer-events-none absolute -top-32 left-1/2 size-[420px] -translate-x-1/2 rounded-full bg-primary/20 blur-[110px]" />

      <div className="relative mx-auto w-full max-w-md">
        <div className="flex items-center gap-2.5">
          <span className="grid size-11 place-items-center rounded-2xl bg-primary shadow-glow">
            <Truck className="size-5.5 text-primary-foreground" />
          </span>
          <div>
            <p className="text-lg font-bold leading-none tracking-tight">24Cargo</p>
            <p className="mt-1 text-xs text-muted-foreground">Бус под наем · София</p>
          </div>
        </div>

        <h1 className="mt-10 text-3xl font-bold leading-tight tracking-tight">
          Вход в клиентския портал
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Вижте активния си наем, пробег, гориво, договори и плащания на едно място.
        </p>

        <div className="mt-7 rounded-3xl border border-border bg-card p-5 shadow-card">
          {sent ? (
            <div className="text-center">
              <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-success/15">
                <ShieldCheck className="size-6 text-success" />
              </span>
              <h2 className="mt-4 text-lg font-semibold">Проверете имейла си</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Изпратихме линк за вход за номер {phone}. Линкът е валиден 15 минути.
              </p>
              <Button
                className="mt-5 h-12 w-full rounded-xl"
                onClick={() => navigate({ to: "/dashboard" })}
              >
                Отвори таблото
                <ArrowRight className="ml-2 size-4" />
              </Button>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-3 text-xs text-muted-foreground underline-offset-4 hover:underline"
              >
                Друг номер
              </button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <label
                htmlFor="phone"
                className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"
              >
                Телефонен номер
              </label>
              <div className="relative mt-2.5">
                <Phone className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+359 88 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12 rounded-xl pl-10 text-base"
                />
              </div>

              <Button type="submit" className="mt-4 h-12 w-full rounded-xl text-base shadow-glow">
                Изпрати линк за вход
              </Button>

              <p className="mt-3.5 text-center text-xs leading-relaxed text-muted-foreground">
                Ще ви пратим линк за вход на имейла ви. Никога не използваме парола.
              </p>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Нужна ви е помощ? Обадете се на <span className="text-foreground">+359 88 888 2424</span>
        </p>
      </div>
    </main>
  );
}
