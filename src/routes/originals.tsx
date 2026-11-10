import { createFileRoute } from "@tanstack/react-router";

import { BrowseView } from "@/components/pixel/BrowseView";
import type { Title } from "@/data/catalog";

const select = (t: Title) => t.original;

export const Route = createFileRoute("/originals")({
  head: () => ({
    meta: [
      { title: "Pixel Originals — Exclusive Series & Films | Pixel" },
      { name: "description", content: "Series, films, anime and dramas you can only stream on Pixel." },
      { property: "og:title", content: "Pixel Originals" },
      { property: "og:description", content: "Exclusive stories made only for Pixel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <BrowseView
      eyebrow="Only on Pixel"
      title="Pixel Originals"
      description="Bold series, films, anime and dramas you won't find anywhere else."
      select={select}
    />
  ),
});
