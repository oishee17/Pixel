import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex size-9 items-center justify-center rounded-[10px] bg-brand p-[3px] shadow-glow",
        className,
      )}
    >
      <span className="flex size-full items-center justify-center rounded-[7px] bg-background">
        <span className="size-[38%] rounded-[3px] bg-brand" />
      </span>
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("group flex items-center gap-3", className)} aria-label="Pixel home">
      <LogoMark className="transition-transform group-hover:scale-105" />
      <span className="font-display text-xl font-bold tracking-tight text-foreground">
        Pixel<span className="text-primary">.</span>
      </span>
    </Link>
  );
}
