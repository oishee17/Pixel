import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search as SearchIcon, SearchX, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { DEFAULT_FILTERS, EmptyState, FilterBar, TitleGrid, applyFilters, type Filters } from "@/components/pixel/BrowseView";
import { Button } from "@/components/ui/button";
import { searchTitles, sortTitles } from "@/data/catalog";
import { useViewer } from "@/lib/viewer-store";

interface SearchParams {
  q?: string;
  genre?: string;
}

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    q: typeof s.q === "string" && s.q ? s.q : undefined,
    genre: typeof s.genre === "string" && s.genre ? s.genre : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Search — Find Titles, Actors & Genres | Pixel" },
      { name: "description", content: "Search Pixel by title, actor, director, genre or keyword." },
      { property: "og:title", content: "Search Pixel" },
      { property: "og:description", content: "Find any movie, series, anime or drama on Pixel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SearchPage,
});

const QUICK = ["Fantasy", "K-Drama", "Romance", "samurai", "Thriller", "Kang Min-jae", "Documentary"];

function SearchPage() {
  const { q = "", genre } = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });
  const { catalog } = useViewer();
  const [text, setText] = useState(q);
  const [focused, setFocused] = useState(false);
  const [filters, setFilters] = useState<Filters>({ ...DEFAULT_FILTERS, genre: genre ?? "all" });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  useEffect(() => setFilters((f) => ({ ...f, genre: genre ?? "all" })), [genre]);

  // Keep the URL in sync with what's typed so results are shareable.
  useEffect(() => {
    const id = window.setTimeout(() => {
      if (text !== q) navigate({ search: (p) => ({ ...p, q: text || undefined }), replace: true });
    }, 250);
    return () => window.clearTimeout(id);
  }, [text, q, navigate]);

  const matched = useMemo(() => searchTitles(catalog, text), [catalog, text]);
  const results = useMemo(() => {
    const filtered = applyFilters(matched, filters);
    // Keep relevance order for text queries unless the viewer picked a sort.
    if (text && filters.sort === "popular") return matched.filter((t) => filtered.includes(t));
    return filtered;
  }, [matched, filters, text]);

  const suggestions = useMemo(() => {
    const s = text.trim().toLowerCase();
    if (s.length < 2) return [];
    const people = new Set<string>();
    catalog.forEach((t) =>
      [...t.cast, t.director].forEach((p) => p.toLowerCase().includes(s) && people.add(p)),
    );
    return [
      ...matched.slice(0, 5).map((t) => ({ label: t.title, hint: t.year.toString() })),
      ...[...people].slice(0, 3).map((p) => ({ label: p, hint: "Person" })),
    ];
  }, [text, matched, catalog]);

  const browsing = !text && filters.genre === "all";

  return (
    <div className="mx-auto max-w-[1600px] px-5 pt-32 md:px-10">
      <div className="relative max-w-3xl">
        <SearchIcon className="pointer-events-none absolute left-5 top-1/2 size-6 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => window.setTimeout(() => setFocused(false), 150)}
          placeholder="Titles, people, genres, keywords…"
          aria-label="Search Pixel"
          className="h-16 w-full rounded-2xl border border-border bg-card pl-14 pr-14 font-display text-lg font-semibold outline-none transition-colors placeholder:font-sans placeholder:font-normal placeholder:text-muted-foreground focus:border-primary/70 md:text-xl"
        />
        {text && (
          <button
            onClick={() => {
              setText("");
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="absolute right-4 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
        {focused && suggestions.length > 0 && (
          <ul className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-border bg-popover py-1 shadow-card">
            {suggestions.map((s) => (
              <li key={s.label + s.hint}>
                <button
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setText(s.label);
                    setFocused(false);
                  }}
                  className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm hover:bg-accent"
                >
                  <span className="font-medium">{s.label}</span>
                  <span className="text-xs text-muted-foreground">{s.hint}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {browsing && (
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm text-muted-foreground">Try:</span>
          {QUICK.map((s) => (
            <Button key={s} variant="chip" size="pill" onClick={() => setText(s)}>
              {s}
            </Button>
          ))}
        </div>
      )}

      <div className="mt-10 space-y-8">
        <FilterBar
          pool={catalog}
          filters={filters}
          onChange={(f) => {
            setFilters(f);
            if (f.genre !== (genre ?? "all"))
              navigate({ search: (p) => ({ ...p, genre: f.genre === "all" ? undefined : f.genre }), replace: true });
          }}
        />
        <h2 className="font-display text-xl font-bold">
          {browsing
            ? "Popular on Pixel"
            : `${results.length} result${results.length === 1 ? "" : "s"}${text ? ` for “${text}”` : ""}`}
        </h2>
        <TitleGrid
          items={browsing ? sortTitles(results, filters.sort) : results}
          empty={
            <EmptyState
              icon={<SearchX className="size-8" />}
              title={`No matches${text ? ` for “${text}”` : ""}`}
              body="Check the spelling, try an actor or director, or search a genre like “Fantasy”."
              action={
                <Button
                  variant="glass"
                  onClick={() => {
                    setText("");
                    setFilters(DEFAULT_FILTERS);
                    navigate({ search: {}, replace: true });
                  }}
                >
                  Clear search
                </Button>
              }
            />
          }
        />
      </div>
    </div>
  );
}
