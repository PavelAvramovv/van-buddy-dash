import { useRef, useState } from "react";
import { Receipt, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function UploadReceiptDialog() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = () => {
    if (!fileName || !amount) {
      toast.error("Добавете снимка на бележката и сума в EUR.");
      return;
    }
    toast.success("Касовата бележка е изпратена за проверка.");
    setOpen(false);
    setAmount("");
    setFileName(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="h-11 w-full rounded-xl">
          <Receipt className="mr-2 size-4" />
          Качи касова бележка за гориво
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Касова бележка за гориво</DialogTitle>
          <DialogDescription>
            Прикачете снимка или PDF от колонката и въведете платената сума.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Файл (снимка или PDF)
            </Label>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-2 flex w-full flex-col items-center gap-1.5 rounded-2xl border border-dashed border-border px-4 py-6 text-sm text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
            >
              <Upload className="size-5" />
              {fileName ?? "Изберете файл от телефона си"}
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
            />
          </div>

          <div>
            <Label htmlFor="receipt-amount" className="text-xs uppercase tracking-wider text-muted-foreground">
              Сума (EUR)
            </Label>
            <Input
              id="receipt-amount"
              inputMode="decimal"
              placeholder="45.80"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-2 h-11 rounded-xl"
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={submit} className="h-11 w-full rounded-xl">
            Изпрати
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
