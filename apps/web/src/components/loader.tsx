import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex h-full min-h-32 items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        <p className="text-xs text-muted-foreground/60 tracking-widest uppercase">
          Loading…
        </p>
      </div>
    </div>
  );
}
