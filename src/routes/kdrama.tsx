import { createFileRoute } from "@tanstack/react-router";

import { BrowseView } from "@/components/pixel/BrowseView";
import type { Title } from "@/data/catalog";

const select = (t: Title) => t.category === "kdrama";

export const Route = createFileRoute("/kdrama")({
  head: () => ({
    meta: [
      { title: "K-Drama — Korean Dramas on Pixel" },
      { name: "description", content: "Romance, revenge thrillers and Joseon-era sageuk — stream Korean dramas on Pixel." },
      { property: "og:title", content: "K-Drama on Pixel" },
      { property: "og:description", content: "Korean dramas streaming on Pixel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <BrowseView
      eyebrow="Korean drama"
      title="K-Drama"
      description="Midnight rooftop romances, chaebol revenge and Joseon love letters."
      select={select}
      showKind={false}
    />
  ),
});
