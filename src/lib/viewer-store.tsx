import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { TITLES, isKidSafe, type Title } from "@/data/catalog";

export type AvatarTone = "sky" | "violet" | "mint" | "rose";

export interface Profile {
  id: string;
  name: string;
  tag?: string;
  kids: boolean;
  tone: AvatarTone;
}

export interface Progress {
  titleId: string;
  season?: number;
  episode?: number;
  time: number;
  duration: number;
  updatedAt: number;
}

interface ProfileData {
  list: string[];
  progress: Record<string, Progress>;
  likes: Record<string, 1 | -1>;
  readNotifs: string[];
}

interface PersistedState {
  activeProfileId: string;
  profiles: Profile[];
  data: Record<string, ProfileData>;
}

const STORAGE_KEY = "pixel.viewer.v1";

const DEFAULT_PROFILES: Profile[] = [
  { id: "alex", name: "Alex", tag: "Main", kids: false, tone: "sky" },
  { id: "mia", name: "Mia", kids: false, tone: "violet" },
  { id: "kids", name: "Kids", kids: true, tone: "mint" },
];

const emptyData = (): ProfileData => ({ list: [], progress: {}, likes: {}, readNotifs: [] });

const DEFAULT_STATE: PersistedState = {
  activeProfileId: "alex",
  profiles: DEFAULT_PROFILES,
  data: {},
};

export interface Notification {
  id: string;
  title: string;
  body: string;
  titleId?: string;
  ago: string;
}

export const NOTIFICATIONS: Notification[] = [
  ...[...TITLES]
    .filter((t) => t.addedDaysAgo <= 5)
    .sort((a, b) => a.addedDaysAgo - b.addedDaysAgo)
    .map((t) => ({
      id: `new-${t.id}`,
      title: t.original ? "New Pixel Original" : "Now streaming",
      body: `${t.title} is ready to watch.`,
      titleId: t.id,
      ago: t.addedDaysAgo === 1 ? "1 day ago" : `${t.addedDaysAgo} days ago`,
    })),
  {
    id: "announce-kdrama",
    title: "Welcome to Pixel",
    body: "Anime, K-Drama and C-Drama now have their own homes in the menu.",
    ago: "1 week ago",
  },
];

interface ViewerContextValue {
  hydrated: boolean;
  profiles: Profile[];
  profile: Profile;
  setActiveProfile: (id: string) => void;
  /** Catalog visible to the active profile (kids profiles see age-appropriate titles only). */
  catalog: Title[];
  canView: (t: Title) => boolean;
  myList: string[];
  inList: (id: string) => boolean;
  toggleList: (id: string) => boolean;
  likes: Record<string, 1 | -1>;
  setLike: (id: string, v: 1 | -1) => void;
  progress: Progress[];
  getProgress: (id: string) => Progress | undefined;
  saveProgress: (p: Omit<Progress, "updatedAt">) => void;
  removeProgress: (id: string) => void;
  unreadCount: number;
  isRead: (id: string) => boolean;
  markAllRead: () => void;
}

const ViewerContext = createContext<ViewerContextValue | null>(null);

export function ViewerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PersistedState;
        if (parsed?.profiles?.length) setState(parsed);
      }
    } catch {
      /* corrupted storage — start fresh */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const profile =
    state.profiles.find((p) => p.id === state.activeProfileId) ?? state.profiles[0];
  const data = state.data[profile.id] ?? emptyData();

  const update = useCallback(
    (fn: (d: ProfileData) => ProfileData) => {
      setState((s) => ({
        ...s,
        data: { ...s.data, [s.activeProfileId]: fn(s.data[s.activeProfileId] ?? emptyData()) },
      }));
    },
    [],
  );

  const value = useMemo<ViewerContextValue>(() => {
    const canView = (t: Title) => !profile.kids || isKidSafe(t);
    const catalog = TITLES.filter(canView);
    const progress = Object.values(data.progress)
      .filter((p) => {
        const t = TITLES.find((x) => x.id === p.titleId);
        return t && canView(t);
      })
      .sort((a, b) => b.updatedAt - a.updatedAt);
    return {
      hydrated,
      profiles: state.profiles,
      profile,
      setActiveProfile: (id) => setState((s) => ({ ...s, activeProfileId: id })),
      catalog,
      canView,
      myList: data.list.filter((id) => catalog.some((t) => t.id === id)),
      inList: (id) => data.list.includes(id),
      toggleList: (id) => {
        const adding = !data.list.includes(id);
        update((d) => ({
          ...d,
          list: adding ? [id, ...d.list.filter((x) => x !== id)] : d.list.filter((x) => x !== id),
        }));
        return adding;
      },
      likes: data.likes,
      setLike: (id, v) =>
        update((d) => {
          const likes = { ...d.likes };
          if (likes[id] === v) delete likes[id];
          else likes[id] = v;
          return { ...d, likes };
        }),
      progress,
      getProgress: (id) => data.progress[id],
      saveProgress: (p) =>
        update((d) => ({
          ...d,
          progress: { ...d.progress, [p.titleId]: { ...p, updatedAt: Date.now() } },
        })),
      removeProgress: (id) =>
        update((d) => {
          const next = { ...d.progress };
          delete next[id];
          return { ...d, progress: next };
        }),
      unreadCount: NOTIFICATIONS.filter((n) => !data.readNotifs.includes(n.id)).length,
      isRead: (id) => data.readNotifs.includes(id),
      markAllRead: () => update((d) => ({ ...d, readNotifs: NOTIFICATIONS.map((n) => n.id) })),
    };
  }, [state.profiles, profile, data, hydrated, update]);

  return <ViewerContext.Provider value={value}>{children}</ViewerContext.Provider>;
}

export function useViewer() {
  const ctx = useContext(ViewerContext);
  if (!ctx) throw new Error("useViewer must be used inside ViewerProvider");
  return ctx;
}
