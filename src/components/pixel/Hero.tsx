import { Link } from "@tanstack/react-router";
import { Info, Play } from "lucide-react";
import { useEffect, useState } from "react";

import { LikeButton, ListButton } from "@/components/pixel/ListLikeButtons";
import { GenreLine, TitleMeta } from "@/components/pixel/TitleMeta";
import { Button } from "@/components/ui/button";
import { featuredLabel, type Title } from "@/data/catalog";
import { cn } from "@/lib/utils";

const ROTATE_MS = 9000;

export function Hero({ items }: { items: Title[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = items[index % items.length];

  useEffect(() => {
    if (paused || items.length < 2) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % items.length), ROTATE_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, items.length]);

  if (!t) return null;

  return (
    <section
      className="relative isolate flex min-h-[640px] items-end overflow-hidden md:min-h-[88vh]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured titles"
    >
      <div key={t.id} className="absolute inset-0 -z-10">
        <img
          src={t.image}
          alt=""
          width={1600}
          height={912}
          className="size-full animate-hero-zoom object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 hero-fade-x" />
        <div className="absolute inset-0 hero-fade-y" />
      </div>

      <div
        key={`${t.id}-copy`}
        className="mx-auto w-full max-w-[1600px] animate-fade-up px-5 pb-24 pt-32 md:px-10 md:pb-32"
      >
        <div className="max-w-2xl">
          <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.12em] text-primary md:text-sm">
            <span className="size-2 rounded-full bg-primary" />
            {featuredLabel(t)}
          </p>
          <h1 className="mt-4 font-display text-5xl font-extrabold leading-[1.02] md:text-7xl">
            {t.title}
          </h1>
          <TitleMeta t={t} className="mt-6" />
          <GenreLine t={t} className="mt-4" />
          <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/85 md:text-lg">
            {t.synopsis}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild variant="hero" size="xl">
              <Link to="/watch/$id" params={{ id: t.id }} search={{}}>
                <Play className="fill-current" /> Play Now
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link to="/title/$id" params={{ id: t.id }}>
                <Info /> More Info
              </Link>
            </Button>
            <ListButton t={t} />
            <LikeButton t={t} />
          </div>
        </div>
      </div>

      {items.length > 1 && (
        <div className="absolute bottom-10 right-5 flex gap-2 md:right-10">
          {items.map((it, i) => (
            <button
              key={it.id}
              onClick={() => setIndex(i)}
              aria-label={`Show ${it.title}`}
              aria-current={i === index}
              className={cn(
                "relative h-1.5 overflow-hidden rounded-full bg-foreground/20 transition-all",
                i === index ? "w-10" : "w-4 hover:bg-foreground/40",
              )}
            >
              {i === index && (
                <span
                  key={`${index}-${paused}`}
                  className="absolute inset-0 animate-progress-fill rounded-full bg-primary"
                  style={{
                    animationDuration: `${ROTATE_MS}ms`,
                    animationPlayState: paused ? "paused" : "running",
                  }}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
