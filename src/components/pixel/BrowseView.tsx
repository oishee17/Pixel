import { SearchX } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";

import { TitleCard } from "@/components/pixel/TitleCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SORT_LABELS, sortTitles, type SortKey, type Title } from "@/data/catalog";
import { useViewer } from "@/lib/viewer-store";

export interface Filters {
  genre: string;
  year: string;
  language: string;
  kind: "all" | "movie" | "series";
  minScore: string;
  sort: SortKey;
}

export const DEFAULT_FILTERS: Filters = {
  genre: "all",
  year: "all",
  language: "all",
  kind: "all",
  minScore: "0",
  sort: "popular",
};

export function applyFilters(list: Title[], f: Filters) {
  return sortTitles(
    list.filter(
      (t) =>
        (f.genre === "all" || t.genres.includes(f.genre)) &&
        (f.year === "all" || String(t.year) === f.year) &&
        (f.language === "all" || t.language === f.language) &&
        (f.kind === "all" || t.kind === f.kind) &&
        t.score >= Number(f.minScore),
    ),
    f.sort,
  );
}

export function FilterBar({
  pool,
  filters,
  onChange,
  showKind = true,
}: {
  pool: Title[];
  filters: Filters;
  onChange: (f: Filters) => void;
  showKind?: boolean;
}) {
  const genres = useMemo(() => Array.from(new Set(pool.flatMap((t) => t.genres))).sort(), [pool]);
  const years = useMemo(
    () => Array.from(new Set(pool.map((t) => t.year))).sort((a, b) => b - a),
    [pool],
  );
  const languages = useMemo(() => Array.from(new Set(pool.map((t) => t.language))).sort(), [pool]);
  const set = <K extends keyof Filters>(k: K, v: Filters[K]) => onChange({ ...filters, [k]: v });
  const dirty = JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS);

  return (
    <div className="space-y-4">
      <div className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
        {["all", ...genres].map((g) => (
          <Button
            key={g}
            variant="chip"
            size="pill"
            data-active={filters.genre === g}
            onClick={() => set("genre", g)}
          >
            {g === "all" ? "All genres" : g}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {showKind && (
          <div className="flex rounded-lg border border-border bg-surface p-1">
            {(["all", "movie", "series"] as const).map((k) => (
              <button
                key={k}
                onClick={() => set("kind", k)}
                data-active={filters.kind === k}
                className="rounded-md px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
              >
                {k === "all" ? "All" : k === "movie" ? "Movies" : "Series"}
              </button>
            ))}
          </div>
        )}
        <FilterSelect
          label="Year"
          value={filters.year}
          onChange={(v) => set("year", v)}
          options={[["all", "Any year"], ...years.map((y) => [String(y), String(y)] as [string, string])]}
        />
        <FilterSelect
          label="Language"
          value={filters.language}
          onChange={(v) => set("language", v)}
          options={[["all", "Any language"], ...languages.map((l) => [l, l] as [string, string])]}
        />
        <FilterSelect
          label="Rating"
          value={filters.minScore}
          onChange={(v) => set("minScore", v)}
          options={[
            ["0", "Any rating"],
            ["8", "8.0+"],
            ["8.5", "8.5+"],
            ["9", "9.0+"],
          ]}
        />
        <FilterSelect
          label="Sort"
          value={filters.sort}
          onChange={(v) => set("sort", v as SortKey)}
          options={Object.entries(SORT_LABELS) as [string, string][]}
        />
        {dirty && (
          <button
            onClick={() => onChange(DEFAULT_FILTERS)}
            className="text-xs font-semibold text-primary hover:underline"
          >
            Reset filters
          </button>
        )}
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger aria-label={label} className="h-9 w-auto min-w-36 border-border bg-surface text-xs font-semibold">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="border-border bg-popover">
        {options.map(([v, l]) => (
          <SelectItem key={v} value={v} className="text-sm">
            {l}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function TitleGrid({ items, empty }: { items: Title[]; empty?: ReactNode }) {
  if (!items.length)
    return (
      empty ?? (
        <EmptyState
          icon={<SearchX className="size-8" />}
          title="Nothing matches those filters"
          body="Try a different genre, year or rating."
        />
      )
    );
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-8 pb-24 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {items.map((t) => (
        <TitleCard key={t.id} t={t} />
      ))}
    </div>
  );
}

export function EmptyState({ icon, title, body, action }: { icon: ReactNode; title: string; body: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-secondary px-6 py-20 text-center">
      <span className="flex size-16 items-center justify-center rounded-2xl bg-primary/15 text-primary">
        {icon}
      </span>
      <h3 className="mt-5 font-display text-xl font-bold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{body}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function BrowseView({
  eyebrow,
  title,
  description,
  select,
  showKind = true,
}: {
  eyebrow: string;
  title: string;
  description: string;
  select: (t: Title) => boolean;
  showKind?: boolean;
}) {
  const { catalog } = useViewer();
  const pool = useMemo(() => catalog.filter(select), [catalog, select]);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const results = useMemo(() => applyFilters(pool, filters), [pool, filters]);
  const cover = pool[0];

  return (
    <div>
      <header className="relative isolate overflow-hidden pb-10 pt-36">
        {cover && (
          <div className="absolute inset-0 -z-10">
            <img src={cover.image} alt="" className="size-full object-cover opacity-40" />
            <div className="absolute inset-0 hero-fade-x" />
            <div className="absolute inset-0 hero-fade-y" />
          </div>
        )}
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.12em] text-primary">
            <span className="size-2 rounded-full bg-primary" />
            {eyebrow}
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold md:text-6xl">{title}</h1>
          <p className="mt-4 max-w-xl text-muted-foreground md:text-lg">{description}</p>
        </div>
      </header>
      <div className="mx-auto max-w-[1600px] space-y-8 px-5 md:px-10">
        <FilterBar pool={pool} filters={filters} onChange={setFilters} showKind={showKind} />
        <p className="text-sm text-muted-foreground">
          {results.length} title{results.length === 1 ? "" : "s"}
        </p>
        <TitleGrid items={results} />
      </div>
    </div>
  );
}
