import { Link, createFileRoute } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { useMemo, useState } from "react";

import { EmptyState, TitleGrid } from "@/components/pixel/BrowseView";
import { TitleRow } from "@/components/pixel/TitleRow";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABELS, getTitle, type Category, type Title } from "@/data/catalog";
import { useViewer } from "@/lib/viewer-store";

export const Route = createFileRoute("/my-list")({
  head: () => ({
    meta: [
      { title: "My List — Saved Titles | Pixel" },
      { name: "description", content: "Your saved movies, series, anime and dramas on Pixel, plus everything you're still watching." },
      { property: "og:title", content: "My List on Pixel" },
      { property: "og:description", content: "Everything you've saved to watch on Pixel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MyList,
});

function MyList() {
  const { myList, progress, removeProgress, profile, hydrated } = useViewer();
  const [cat, setCat] = useState<Category | "all">("all");

  const saved = useMemo(() => myList.map(getTitle).filter(Boolean) as Title[], [myList]);
  const cats = useMemo(() => Array.from(new Set(saved.map((t) => t.category))), [saved]);
  const shown = cat === "all" ? saved : saved.filter((t) => t.category === cat);
  const watching = progress.map((p) => getTitle(p.titleId)).filter(Boolean) as Title[];
  const progressMap = Object.fromEntries(progress.map((p) => [p.titleId, p]));

  return (
    <div className="pt-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.12em] text-primary">
          <span className="size-2 rounded-full bg-primary" /> {profile.name}'s collection
        </p>
        <h1 className="mt-3 font-display text-4xl font-extrabold md:text-6xl">My List</h1>
      </div>

      {watching.length > 0 && (
        <div className="mt-10">
          <TitleRow
            title="Continue Watching"
            items={watching}
            progress={progressMap}
            onRemove={removeProgress}
          />
        </div>
      )}

      <div className="mx-auto mt-10 max-w-[1600px] space-y-6 px-5 md:px-10">
        {saved.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {(["all", ...cats] as const).map((c) => (
              <Button key={c} variant="chip" size="pill" data-active={cat === c} onClick={() => setCat(c)}>
                {c === "all" ? `All (${saved.length})` : CATEGORY_LABELS[c]}
              </Button>
            ))}
          </div>
        )}
        {hydrated && (
          <TitleGrid
            items={shown}
            empty={
              <EmptyState
                icon={<Bookmark className="size-8" />}
                title="Your list is empty"
                body="Tap the + on any title to save it here for later."
                action={
                  <Button asChild variant="hero" size="xl">
                    <Link to="/">Find something to watch</Link>
                  </Button>
                }
              />
            }
          />
        )}
      </div>
    </div>
  );
}
