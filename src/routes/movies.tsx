import { createFileRoute } from "@tanstack/react-router";

import { BrowseView } from "@/components/pixel/BrowseView";
import type { Title } from "@/data/catalog";

const select = (t: Title) => t.kind === "movie";

export const Route = createFileRoute("/movies")({
  head: () => ({
    meta: [
      { title: "Movies — Stream Films on Pixel" },
      { name: "description", content: "Browse thrillers, sci-fi, romance, comedy and anime films on Pixel." },
      { property: "og:title", content: "Movies on Pixel" },
      { property: "og:description", content: "Browse and filter every film on Pixel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <BrowseView
      eyebrow="Feature films"
      title="Movies"
      description="Blockbusters, slow-burn thrillers, feel-good comedies and anime features."
      select={select}
      showKind={false}
    />
  ),
});
