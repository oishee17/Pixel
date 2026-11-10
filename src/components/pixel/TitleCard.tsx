import { Link } from "@tanstack/react-router";
import { ChevronDown, Play, Star, X } from "lucide-react";

import { ListButton } from "@/components/pixel/ListLikeButtons";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABELS, formatLength, type Title } from "@/data/catalog";
import type { Progress } from "@/lib/viewer-store";
import { cn } from "@/lib/utils";

export function TitleCard({
  t,
  progress,
  onRemove,
  rank,
  className,
}: {
  t: Title;
  progress?: Progress;
  onRemove?: () => void;
  rank?: number;
  className?: string;
}) {
  const pct = progress && progress.duration ? Math.min(100, (progress.time / progress.duration) * 100) : 0;
  const resume = progress
    ? { s: progress.season, e: progress.episode }
    : {};

  return (
    <article
      className={cn(
        "group/card relative shrink-0 rounded-xl transition-transform duration-300 ease-out hover:z-20 md:hover:scale-[1.06]",
        className,
      )}
    >
      <Link
        to="/title/$id"
        params={{ id: t.id }}
        className="block overflow-hidden rounded-xl bg-card ring-1 ring-border transition-shadow group-hover/card:shadow-card group-hover/card:ring-foreground/20"
        aria-label={t.title}
      >
        <div className="relative aspect-video">
          <img
            src={t.image}
            alt=""
            loading="lazy"
            width={1600}
            height={912}
            className="size-full object-cover transition-transform duration-500 group-hover/card:scale-105"
          />
          <div className="absolute inset-0 card-fade" />
          {t.original && (
            <span className="absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded-md bg-background/70 px-2 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur">
              <span className="size-1.5 rounded-full bg-primary" /> Pixel Original
            </span>
          )}
          {rank && (
            <span className="absolute right-3 top-1 font-display text-5xl font-extrabold text-foreground/90 drop-shadow-lg">
              {rank}
            </span>
          )}
          <div className="absolute inset-x-3 bottom-3">
            <h3 className="line-clamp-1 font-display text-base font-bold md:text-lg">{t.title}</h3>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Star className="size-3 fill-gold text-gold" />
              <span className="font-semibold text-foreground/90">{t.score.toFixed(1)}</span>
              <span>· {CATEGORY_LABELS[t.category]}</span>
              <span>· {t.year}</span>
            </p>
          </div>
          {progress && (
            <div className="absolute inset-x-0 bottom-0 h-1 bg-foreground/20">
              <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
            </div>
          )}
        </div>
      </Link>

      {/* Hover / focus reveal panel */}
      <div className="pointer-events-none absolute inset-x-0 top-full -mt-2 hidden rounded-b-xl border border-t-0 border-border bg-card px-3 pb-3 pt-4 opacity-0 shadow-card transition-opacity duration-200 group-hover/card:pointer-events-auto group-hover/card:opacity-100 md:block">
        <div className="flex items-center gap-2">
          <Button asChild variant="hero" size="icon" className="rounded-full" aria-label={`Play ${t.title}`}>
            <Link to="/watch/$id" params={{ id: t.id }} search={resume}>
              <Play className="fill-current" />
            </Link>
          </Button>
          <ListButton t={t} size="icon" />
          {onRemove && (
            <Button
              variant="icon-glass"
              size="icon"
              aria-label={`Remove ${t.title} from Continue Watching`}
              title="Remove from Continue Watching"
              onClick={onRemove}
            >
              <X />
            </Button>
          )}
          <Button asChild variant="icon-glass" size="icon" className="ml-auto rounded-full" aria-label="More info">
            <Link to="/title/$id" params={{ id: t.id }}>
              <ChevronDown />
            </Link>
          </Button>
        </div>
        <p className="mt-3 flex flex-wrap items-center gap-x-2 text-xs">
          <span className="font-semibold text-success">{t.match}% Match</span>
          <span className="rounded border border-foreground/30 px-1.5 text-[10px] font-semibold">
            {t.maturity}
          </span>
          <span className="text-muted-foreground">{formatLength(t)}</span>
        </p>
        <p className="mt-1.5 text-xs text-muted-foreground">
          {progress?.episode
            ? `Resume S${progress.season} · E${progress.episode}`
            : t.genres.slice(0, 3).join(" · ")}
        </p>
      </div>

      {/* Touch alternative: always-visible remove control on small screens */}
      {onRemove && (
        <button
          onClick={onRemove}
          aria-label={`Remove ${t.title} from Continue Watching`}
          className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-background/80 text-foreground md:hidden"
        >
          <X className="size-4" />
        </button>
      )}
    </article>
  );
}
