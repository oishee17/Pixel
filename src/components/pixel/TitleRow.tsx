import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, type ReactNode } from "react";

import { TitleCard } from "@/components/pixel/TitleCard";
import type { Title } from "@/data/catalog";
import type { Progress } from "@/lib/viewer-store";

export function TitleRow({
  title,
  items,
  href,
  ranked,
  progress,
  onRemove,
  eyebrow,
}: {
  title: string;
  items: Title[];
  href?: "/originals" | "/movies" | "/series" | "/anime" | "/kdrama" | "/cdrama" | "/my-list";
  ranked?: boolean;
  progress?: Record<string, Progress>;
  onRemove?: (id: string) => void;
  eyebrow?: ReactNode;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  if (!items.length) return null;

  const scroll = (dir: 1 | -1) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <section className="group/row relative">
      <div className="mx-auto flex max-w-[1600px] items-end justify-between px-5 md:px-10">
        <div>
          {eyebrow}
          <h2 className="font-display text-xl font-bold md:text-2xl">{title}</h2>
        </div>
        {href && (
          <Link
            to={href}
            className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            See all
          </Link>
        )}
      </div>
      <div className="relative">
        <div
          ref={scroller}
          className="scrollbar-none flex snap-x gap-4 overflow-x-auto scroll-px-5 px-5 pb-28 pt-4 -mb-24 md:scroll-px-10 md:px-10"
        >
          {items.map((t, i) => (
            <TitleCard
              key={t.id}
              t={t}
              rank={ranked ? i + 1 : undefined}
              progress={progress?.[t.id]}
              onRemove={onRemove ? () => onRemove(t.id) : undefined}
              className="w-[72vw] snap-start sm:w-[44vw] md:w-[30vw] lg:w-[23vw] xl:w-[19vw] 2xl:w-[300px]"
            />
          ))}
        </div>
        <button
          onClick={() => scroll(-1)}
          aria-label={`Scroll ${title} left`}
          className="absolute left-0 top-4 hidden h-[calc(100%-8rem)] w-10 items-center justify-center bg-background/60 opacity-0 transition-opacity hover:bg-background/80 group-hover/row:opacity-100 md:flex"
        >
          <ChevronLeft className="size-7" />
        </button>
        <button
          onClick={() => scroll(1)}
          aria-label={`Scroll ${title} right`}
          className="absolute right-0 top-4 hidden h-[calc(100%-8rem)] w-10 items-center justify-center bg-background/60 opacity-0 transition-opacity hover:bg-background/80 group-hover/row:opacity-100 md:flex"
        >
          <ChevronRight className="size-7" />
        </button>
      </div>
    </section>
  );
}
