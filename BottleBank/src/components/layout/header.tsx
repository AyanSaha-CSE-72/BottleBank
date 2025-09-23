import { Recycle } from "lucide-react";

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground p-4 text-center font-bold text-lg sticky top-0 z-10 flex items-center justify-center gap-2">
      <Recycle className="w-6 h-6" />
      <span>BottleBank</span>
    </header>
  );
}
