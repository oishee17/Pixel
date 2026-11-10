import { createFileRoute } from "@tanstack/react-router";

import { BrowseView } from "@/components/pixel/BrowseView";
import type { Title } from "@/data/catalog";

const select = (t: Title) => t.kind === "series";

export const Route = createFileRoute("/series")({
  head: () => ({
    meta: [
      { title: "Series — Binge TV Shows on Pixel" },
      { name: "description", content: "Fantasy epics, mysteries, documentaries, anime and dramas to binge on Pixel." },
      { property: "og:title", content: "Series on Pixel" },
      { property: "og:description", content: "Browse every TV series on Pixel by genre, year and rating." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <BrowseView
      eyebrow="Binge-worthy"
      title="Series"
      description="Every season, every episode — from fantasy epics to K-Drama romances."
      select={select}
      showKind={false}
    />
  ),
});
