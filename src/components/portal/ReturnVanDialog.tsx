import { useState } from "react";
import { KeyRound } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function ReturnVanDialog({ vehicle, plate }: { vehicle: string; plate: string }) {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="h-11 w-full rounded-xl shadow-glow">
          <KeyRound className="mr-2 size-4" />
          Предай буса / Прекрати резервацията
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Потвърждавате ли предаването?</AlertDialogTitle>
          <AlertDialogDescription>
            {vehicle} ({plate}) ще бъде маркиран за предаване. Наш служител ще провери пробега и
            нивото на горивото, след което наемът се приключва и се издава финална сметка.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="h-11 rounded-xl">Отказ</AlertDialogCancel>
          <AlertDialogAction
            className="h-11 rounded-xl"
            onClick={() => toast.success("Заявката за предаване е изпратена. Очаквайте обаждане.")}
          >
            Да, предавам буса
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
