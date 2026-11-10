import { Check, Plus, ThumbsDown, ThumbsUp } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import type { Title } from "@/data/catalog";
import { useViewer } from "@/lib/viewer-store";

export function ListButton({ t, size = "icon-xl" }: { t: Title; size?: "icon-xl" | "icon" }) {
  const { inList, toggleList } = useViewer();
  const saved = inList(t.id);
  return (
    <Button
      variant={saved ? "icon-active" : "icon-glass"}
      size={size}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${t.title} from My List` : `Add ${t.title} to My List`}
      title={saved ? "Remove from My List" : "Add to My List"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const added = toggleList(t.id);
        toast(added ? "Added to My List" : "Removed from My List", { description: t.title });
      }}
    >
      {saved ? <Check /> : <Plus />}
    </Button>
  );
}

export function LikeButton({
  t,
  value = 1,
  size = "icon-xl",
}: {
  t: Title;
  value?: 1 | -1;
  size?: "icon-xl" | "icon";
}) {
  const { likes, setLike } = useViewer();
  const active = likes[t.id] === value;
  const Icon = value === 1 ? ThumbsUp : ThumbsDown;
  const label = value === 1 ? "I like this" : "Not for me";
  return (
    <Button
      variant={active ? "icon-active" : "icon-glass"}
      size={size}
      aria-pressed={active}
      aria-label={label}
      title={label}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setLike(t.id, value);
      }}
    >
      <Icon className={active ? "fill-current" : undefined} />
    </Button>
  );
}
