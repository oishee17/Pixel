import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";

import { Hero } from "@/components/pixel/Hero";
import { TitleRow } from "@/components/pixel/TitleRow";
import { getTitle, recommendFor, sortTitles, type Title } from "@/data/catalog";
import { useViewer } from "@/lib/viewer-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pixel — Stream Originals, Anime, K-Drama & C-Drama" },
      {
        name: "description",
        content:
          "Watch Pixel Originals, blockbuster movies, anime, K-Drama and C-Drama in one cinematic streaming home.",
      },
      { property: "og:title", content: "Pixel — Your world of stories, all in one place" },
      {
        property: "og:description",
        content: "Originals, movies, anime, K-Drama and C-Drama — all streaming on Pixel.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const { catalog, progress, removeProgress, myList, likes } = useViewer();

  const rows = useMemo(() => {
    const by = (fn: (t: Title) => boolean) => catalog.filter(fn);
    const featured = catalog.filter((t) => t.featured);
    const seeds = [
      ...progress.map((p) => p.titleId),
      ...myList,
      ...Object.entries(likes)
        .filter(([, v]) => v === 1)
        .map(([id]) => id),
    ];
    const lastWatched = progress[0] ? getTitle(progress[0].titleId) : undefined;
    return {
      featured: featured.length ? featured : sortTitles(catalog, "popular").slice(0, 4),
      continueWatching: progress.map((p) => getTitle(p.titleId)).filter(Boolean) as Title[],
      originals: by((t) => t.original),
      trending: sortTitles(catalog, "popular").slice(0, 10),
      anime: by((t) => t.category === "anime"),
      kdrama: by((t) => t.category === "kdrama"),
      cdrama: by((t) => t.category === "cdrama"),
      movies: by((t) => t.kind === "movie" && t.category !== "anime"),
      topRated: sortTitles(catalog, "rating").slice(0, 10),
      recent: [...catalog].sort((a, b) => a.addedDaysAgo - b.addedDaysAgo).slice(0, 10),
      forYou: recommendFor(seeds, catalog, 10),
      becauseYouWatched: lastWatched
        ? { t: lastWatched, items: recommendFor([lastWatched.id], catalog, 10) }
        : undefined,
      romance: by((t) => t.genres.includes("Romance")),
      action: by((t) => t.genres.includes("Action")),
    };
  }, [catalog, progress, myList, likes]);

  const progressMap = Object.fromEntries(progress.map((p) => [p.titleId, p]));

  return (
    <>
      <Hero items={rows.featured} />
      <div className="relative z-10 -mt-16 space-y-10 md:-mt-20">
        <TitleRow
          title="Continue Watching"
          items={rows.continueWatching}
          progress={progressMap}
          onRemove={removeProgress}
        />
        <TitleRow title="Pixel Originals" items={rows.originals} href="/originals" />
        <TitleRow title="Trending Now" items={rows.trending} ranked />
        <TitleRow title="Recommended for You" items={rows.forYou} />
        <TitleRow title="Anime" items={rows.anime} href="/anime" />
        <TitleRow title="K-Drama" items={rows.kdrama} href="/kdrama" />
        <TitleRow title="C-Drama" items={rows.cdrama} href="/cdrama" />
        {rows.becauseYouWatched && (
          <TitleRow
            title={`Because you watched ${rows.becauseYouWatched.t.title}`}
            items={rows.becauseYouWatched.items}
          />
        )}
        <TitleRow title="Popular Movies" items={rows.movies} href="/movies" />
        <TitleRow title="Top Rated" items={rows.topRated} />
        <TitleRow title="Recently Added" items={rows.recent} />
        <TitleRow title="Action & Adventure" items={rows.action} />
        <TitleRow title="Romance" items={rows.romance} />
      </div>
    </>
  );
}
