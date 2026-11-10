import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";

import { useViewer } from "@/lib/viewer-store";

export const Route = createFileRoute("/genres")({
  head: () => ({
    meta: [
      { title: "Genres — Browse by Mood | Pixel" },
      { name: "description", content: "Find your next watch on Pixel by genre: fantasy, thriller, romance, anime and more." },
      { property: "og:title", content: "Browse genres on Pixel" },
      { property: "og:description", content: "Every genre on Pixel, from xianxia to sci-fi noir." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Genres,
});

function Genres() {
  const { catalog } = useViewer();
  const genres = useMemo(() => {
    const map = new Map<string, typeof catalog>();
    catalog.forEach((t) => t.genres.forEach((g) => map.set(g, [...(map.get(g) ?? []), t])));
    return [...map.entries()].sort((a, b) => b[1].length - a[1].length);
  }, [catalog]);

  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-10 pt-32 md:px-10">
      <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.12em] text-primary">
        <span className="size-2 rounded-full bg-primary" /> Browse by mood
      </p>
      <h1 className="mt-3 font-display text-4xl font-extrabold md:text-6xl">Genres</h1>
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {genres.map(([g, items]) => (
          <Link
            key={g}
            to="/search"
            search={{ genre: g }}
            className="group relative isolate flex aspect-[16/10] items-end overflow-hidden rounded-2xl ring-1 ring-border transition-transform hover:-translate-y-1 hover:ring-primary/60"
          >
            <img
              src={items[0].image}
              alt=""
              loading="lazy"
              className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 -z-10 card-fade" />
            <div className="p-4">
              <h2 className="font-display text-lg font-bold md:text-2xl">{g}</h2>
              <p className="text-xs text-muted-foreground">
                {items.length} title{items.length === 1 ? "" : "s"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
