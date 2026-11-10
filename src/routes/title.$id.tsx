import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Clapperboard, Lock, Play, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { LikeButton, ListButton } from "@/components/pixel/ListLikeButtons";
import { TitleCard } from "@/components/pixel/TitleCard";
import { GenreLine, TitleMeta } from "@/components/pixel/TitleMeta";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CATEGORY_LABELS,
  SAMPLE_TRAILER,
  featuredLabel,
  getSeasons,
  getTitle,
  similarTitles,
} from "@/data/catalog";
import { useViewer } from "@/lib/viewer-store";

export const Route = createFileRoute("/title/$id")({
  loader: ({ params }) => {
    const t = getTitle(params.id);
    if (!t) throw notFound();
    return { id: t.id, title: t.title, synopsis: t.synopsis };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Watch on Pixel` },
          { name: "description", content: loaderData.synopsis },
          { property: "og:title", content: `${loaderData.title} | Pixel` },
          { property: "og:description", content: loaderData.synopsis },
          { property: "og:type", content: "video.other" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Unavailable | Pixel" }, { name: "robots", content: "noindex" }],
  }),
  component: TitleDetails,
});

function TitleDetails() {
  const { id } = Route.useParams();
  const t = getTitle(id)!;
  const { catalog, canView, getProgress } = useViewer();
  const seasons = getSeasons(t);
  const [season, setSeason] = useState(1);
  const [trailer, setTrailer] = useState(false);
  const progress = getProgress(t.id);
  const similar = similarTitles(t, catalog, 8);

  if (!canView(t)) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center px-5 text-center">
        <span className="flex size-16 items-center justify-center rounded-2xl bg-primary/15 text-primary">
          <Lock className="size-8" />
        </span>
        <h1 className="mt-5 font-display text-2xl font-bold">Not available on this profile</h1>
        <p className="mt-2 max-w-sm text-muted-foreground">
          {t.title} is rated {t.maturity}. Switch to a grown-up profile from the menu to watch it.
        </p>
        <Button asChild variant="hero" size="xl" className="mt-6">
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    );
  }

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: t.title, url });
      else {
        await navigator.clipboard.writeText(url);
        toast("Link copied", { description: t.title });
      }
    } catch {
      /* user dismissed the share sheet */
    }
  };

  const resumeLabel = progress
    ? progress.episode
      ? `Resume S${progress.season} · E${progress.episode}`
      : "Resume"
    : "Play Now";

  return (
    <div>
      <section className="relative isolate flex min-h-[640px] items-end overflow-hidden md:min-h-[80vh]">
        <div className="absolute inset-0 -z-10">
          <img src={t.image} alt="" width={1600} height={912} className="size-full object-cover object-[70%_center]" />
          <div className="absolute inset-0 hero-fade-x" />
          <div className="absolute inset-0 hero-fade-y" />
        </div>
        <div className="mx-auto w-full max-w-[1600px] animate-fade-up px-5 pb-14 pt-32 md:px-10">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.12em] text-primary md:text-sm">
              <span className="size-2 rounded-full bg-primary" />
              {t.original ? featuredLabel(t).replace("Featured ", "Pixel ") : CATEGORY_LABELS[t.category]}
            </p>
            <h1 className="mt-4 font-display text-5xl font-extrabold leading-[1.02] md:text-7xl">{t.title}</h1>
            <TitleMeta t={t} className="mt-6" />
            <GenreLine t={t} className="mt-4" />
            <p className="mt-6 text-base leading-relaxed text-foreground/85 md:text-lg">{t.synopsis}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild variant="hero" size="xl">
                <Link
                  to="/watch/$id"
                  params={{ id: t.id }}
                  search={progress ? { s: progress.season, e: progress.episode } : {}}
                >
                  <Play className="fill-current" /> {resumeLabel}
                </Link>
              </Button>
              <Button variant="glass" size="xl" onClick={() => setTrailer(true)}>
                <Clapperboard /> Trailer
              </Button>
              <ListButton t={t} />
              <LikeButton t={t} value={1} />
              <LikeButton t={t} value={-1} />
              <Button variant="icon-glass" size="icon-xl" onClick={share} aria-label="Share">
                <Share2 />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 pt-6 md:px-10 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0">
          {seasons.length > 0 && (
            <section>
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-display text-2xl font-bold">Episodes</h2>
                {seasons.length > 1 ? (
                  <Select value={String(season)} onValueChange={(v) => setSeason(Number(v))}>
                    <SelectTrigger aria-label="Season" className="w-40 border-border bg-surface font-semibold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-border bg-popover">
                      {seasons.map((s) => (
                        <SelectItem key={s.number} value={String(s.number)}>
                          Season {s.number}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <span className="text-sm font-semibold text-muted-foreground">Season 1</span>
                )}
              </div>
              <ol className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-secondary">
                {seasons[season - 1]?.episodes.map((ep) => {
                  const current = progress?.season === season && progress?.episode === ep.number;
                  return (
                    <li key={ep.number}>
                      <Link
                        to="/watch/$id"
                        params={{ id: t.id }}
                        search={{ s: season, e: ep.number }}
                        className="group flex items-center gap-4 p-4 transition-colors hover:bg-accent md:gap-6 md:p-5"
                      >
                        <span className="hidden w-6 text-center font-display text-xl font-bold text-muted-foreground md:block">
                          {ep.number}
                        </span>
                        <span className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-lg md:w-44">
                          <img
                            src={t.image}
                            alt=""
                            loading="lazy"
                            className="size-full object-cover"
                            style={{ objectPosition: `${(ep.number * 17) % 100}% ${(ep.number * 29) % 100}%`, transform: "scale(1.6)" }}
                          />
                          <span className="absolute inset-0 flex items-center justify-center bg-background/30 opacity-0 transition-opacity group-hover:opacity-100">
                            <Play className="size-8 fill-current" />
                          </span>
                          {current && progress && (
                            <span className="absolute inset-x-0 bottom-0 h-1 bg-foreground/25">
                              <span
                                className="block h-full bg-primary"
                                style={{ width: `${(progress.time / Math.max(progress.duration, 1)) * 100}%` }}
                              />
                            </span>
                          )}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-baseline justify-between gap-3">
                            <span className="font-semibold">
                              <span className="md:hidden">{ep.number}. </span>
                              {ep.title}
                            </span>
                            <span className="shrink-0 text-sm text-muted-foreground">{ep.minutes}m</span>
                          </span>
                          <span className="mt-1 line-clamp-2 block text-sm text-muted-foreground">{ep.synopsis}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </section>
          )}

          {similar.length > 0 && (
            <section className={seasons.length ? "mt-14" : ""}>
              <h2 className="font-display text-2xl font-bold">More like this</h2>
              <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-8 pb-24 sm:grid-cols-2 xl:grid-cols-3">
                {similar.map((s) => (
                  <TitleCard key={s.id} t={s} />
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="h-fit space-y-6 rounded-2xl border border-border bg-secondary p-6 lg:sticky lg:top-28">
          <Fact label="Cast" value={t.cast.join(", ")} />
          <Fact label={t.kind === "movie" ? "Director" : "Creator"} value={t.director} />
          <Fact label="Genres" value={t.genres.join(", ")} />
          <Fact label="Language" value={t.language} />
          <Fact label="Released" value={String(t.year)} />
          <Fact label="Rating" value={`${t.maturity} · ${t.score.toFixed(1)} / 10 from ${t.reviews} reviews`} />
          <Fact label="Studio" value={t.studio} />
          <p className="border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground/80">
            Demo playback: this title plays an openly licensed Blender Foundation film as sample video.
          </p>
        </aside>
      </div>

      <Dialog open={trailer} onOpenChange={setTrailer}>
        <DialogContent className="max-w-4xl overflow-hidden border-border bg-background p-0">
          <DialogTitle className="sr-only">{t.title} trailer</DialogTitle>
          {trailer && (
            <video src={SAMPLE_TRAILER.src} controls autoPlay className="aspect-video w-full bg-background" />
          )}
          <p className="px-5 pb-4 text-xs text-muted-foreground">Sample trailer: {SAMPLE_TRAILER.credit}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm leading-relaxed">{value}</p>
    </div>
  );
}
