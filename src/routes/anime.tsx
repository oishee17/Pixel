import { createFileRoute } from "@tanstack/react-router";

import { BrowseView } from "@/components/pixel/BrowseView";
import type { Title } from "@/data/catalog";

const select = (t: Title) => t.category === "anime";

export const Route = createFileRoute("/anime")({
  head: () => ({
    meta: [
      { title: "Anime — Stream Anime Series & Films on Pixel" },
      { name: "description", content: "Samurai epics, magical academies, mecha battles and cozy slice-of-life anime on Pixel." },
      { property: "og:title", content: "Anime on Pixel" },
      { property: "og:description", content: "Anime series and films, subbed and streaming on Pixel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <BrowseView
      eyebrow="Anime"
      title="Anime"
      description="Sky-island samurai, magical academies, giant mecha and cozy spirit cafés."
      select={select}
    />
  ),
});
