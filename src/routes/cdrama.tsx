import { createFileRoute } from "@tanstack/react-router";

import { BrowseView } from "@/components/pixel/BrowseView";
import type { Title } from "@/data/catalog";

const select = (t: Title) => t.category === "cdrama";

export const Route = createFileRoute("/cdrama")({
  head: () => ({
    meta: [
      { title: "C-Drama — Chinese Dramas on Pixel" },
      { name: "description", content: "Xianxia epics, wuxia duels, 1930s Shanghai romance and modern rom-coms on Pixel." },
      { property: "og:title", content: "C-Drama on Pixel" },
      { property: "og:description", content: "Chinese dramas streaming on Pixel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <BrowseView
      eyebrow="Chinese drama"
      title="C-Drama"
      description="Celestial empresses, sword-sect brothers and hotpot-fuelled romance."
      select={select}
      showKind={false}
    />
  ),
});
