import { Star } from "lucide-react";

import { formatLength, type Title } from "@/data/catalog";
import { cn } from "@/lib/utils";

const Dot = () => <span className="text-muted-foreground/60">·</span>;

export function TitleMeta({ t, compact, className }: { t: Title; compact?: boolean; className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-2.5 gap-y-2 text-sm font-medium text-foreground/90",
        className,
      )}
    >
      <span className="font-semibold text-success">{t.match}% Match</span>
      <Dot />
      <span>{t.year}</span>
      <Dot />
      <span className="rounded-md border border-foreground/30 px-2 py-0.5 text-xs font-semibold">
        {t.maturity}
      </span>
      <Dot />
      <span className="font-semibold">{formatLength(t)}</span>
      <Dot />
      <span className="inline-flex items-center gap-1">
        <Star className="size-4 fill-gold text-gold" />
        <span className="font-semibold">{t.score.toFixed(1)}</span>
        {!compact && <span className="text-xs text-muted-foreground">({t.reviews} reviews)</span>}
      </span>
      {!compact && (
        <>
          <Dot />
          <span className="font-mono text-xs text-foreground/80">{t.quality}</span>
        </>
      )}
    </div>
  );
}

export function GenreLine({ t, className }: { t: Title; className?: string }) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{t.genres.join(" · ")}</p>
  );
}
