import crownOfValoria from "@/assets/titles/crown-of-valoria.jpg";
import neonRequiem from "@/assets/titles/neon-requiem.jpg";
import lastLighthouse from "@/assets/titles/the-last-lighthouse.jpg";
import emberProtocol from "@/assets/titles/ember-protocol.jpg";
import paperMoons from "@/assets/titles/paper-moons.jpg";
import deepSignal from "@/assets/titles/deep-signal.jpg";
import wildHours from "@/assets/titles/wild-hours.jpg";
import kingdomOfIce from "@/assets/titles/kingdom-of-ice.jpg";
import skyboundRonin from "@/assets/titles/skybound-ronin.jpg";
import starlightAcademy from "@/assets/titles/starlight-academy.jpg";
import mechaDawn from "@/assets/titles/mecha-dawn-zero.jpg";
import spiritLantern from "@/assets/titles/spirit-lantern-cafe.jpg";
import seoulMidnight from "@/assets/titles/seoul-midnight-diaries.jpg";
import chaebolSecret from "@/assets/titles/the-chaebols-secret.jpg";
import hanokLove from "@/assets/titles/hanok-love-letter.jpg";
import codeRed from "@/assets/titles/code-red-gangnam.jpg";
import jadePhoenix from "@/assets/titles/legend-of-the-jade-phoenix.jpg";
import shanghaiMoon from "@/assets/titles/shanghai-moonlight.jpg";
import lotusSword from "@/assets/titles/lotus-sword-chronicle.jpg";
import loveChengdu from "@/assets/titles/love-in-chengdu.jpg";

export type Category = "movie" | "series" | "anime" | "kdrama" | "cdrama";
export type Kind = "movie" | "series";

/** Openly licensed sample films used for demo playback (Blender Foundation, CC BY). */
export const SAMPLE_VIDEOS = {
  bunny: {
    src: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
    credit: "Big Buck Bunny · Blender Foundation · CC BY 3.0",
  },
  sintel: {
    src: "https://archive.org/download/Sintel/sintel-2048-surround.mp4",
    credit: "Sintel · Blender Foundation · CC BY 3.0",
  },
  elephants: {
    src: "https://archive.org/download/ElephantsDream/ed_hd.mp4",
    credit: "Elephants Dream · Blender Foundation · CC BY 2.5",
  },
  steel: {
    src: "https://archive.org/download/Tears-of-Steel/tears_of_steel_720p.mp4",
    credit: "Tears of Steel · Blender Foundation · CC BY 3.0",
  },
} as const;

export const SAMPLE_TRAILER = {
  src: "https://download.blender.org/durian/trailer/sintel_trailer-720p.mp4",
  credit: "Sintel trailer · Blender Foundation · CC BY 3.0",
};

export type SampleKey = keyof typeof SAMPLE_VIDEOS;

export interface Episode {
  number: number;
  title: string;
  synopsis: string;
  minutes: number;
}

export interface Season {
  number: number;
  episodes: Episode[];
}

export interface Title {
  id: string;
  title: string;
  kind: Kind;
  category: Category;
  original: boolean;
  featured?: boolean;
  year: number;
  maturity: string;
  score: number;
  reviews: string;
  match: number;
  genres: string[];
  language: string;
  runtime?: number;
  seasonCount?: number;
  quality: "4K Ultra HD" | "HD";
  synopsis: string;
  cast: string[];
  director: string;
  studio: string;
  keywords: string[];
  image: string;
  sample: SampleKey;
  popularity: number;
  addedDaysAgo: number;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  movie: "Movies",
  series: "Series",
  anime: "Anime",
  kdrama: "K-Drama",
  cdrama: "C-Drama",
};

export const KIDS_RATINGS = ["G", "PG", "TV-Y", "TV-Y7", "TV-G", "TV-PG"];

export const TITLES: Title[] = [
  {
    id: "crown-of-valoria",
    title: "Crown of Valoria",
    kind: "series",
    category: "series",
    original: true,
    featured: true,
    year: 2025,
    maturity: "TV-14",
    score: 9.1,
    reviews: "11.2k",
    match: 95,
    genres: ["Fantasy", "Action", "Drama"],
    language: "English",
    seasonCount: 2,
    quality: "4K Ultra HD",
    synopsis:
      "High in the northern peaks of Valoria, three rival dynasties vie for dominion over the Runestone Thrones. As a mythical frost-bearing celestial anomaly approaches, ancient wards shatter and the exiled guardians must reclaim their legacy.",
    cast: ["Elara Voss", "Kian Marlowe", "Sora Lindqvist", "Dev Arora"],
    director: "Ingrid Halvorsen",
    studio: "Pixel Originals",
    keywords: ["kingdom", "throne", "aurora", "dynasty", "magic"],
    image: crownOfValoria,
    sample: "sintel",
    popularity: 99,
    addedDaysAgo: 3,
  },
  {
    id: "neon-requiem",
    title: "Neon Requiem",
    kind: "movie",
    category: "movie",
    original: true,
    featured: true,
    year: 2026,
    maturity: "R",
    score: 8.7,
    reviews: "8.4k",
    match: 92,
    genres: ["Sci-Fi", "Thriller", "Noir"],
    language: "English",
    runtime: 128,
    quality: "4K Ultra HD",
    synopsis:
      "In a rain-drowned megacity where memories are traded like currency, a burned-out detective takes one last case: find the woman whose face is on every hologram — and who claims she never existed.",
    cast: ["Rafael Ortiz", "Mina Kato", "Jonah Pierce"],
    director: "Adaeze Okafor",
    studio: "Pixel Originals",
    keywords: ["cyberpunk", "detective", "memory", "future", "rain"],
    image: neonRequiem,
    sample: "steel",
    popularity: 94,
    addedDaysAgo: 1,
  },
  {
    id: "the-last-lighthouse",
    title: "The Last Lighthouse",
    kind: "series",
    category: "series",
    original: true,
    featured: true,
    year: 2024,
    maturity: "TV-14",
    score: 8.5,
    reviews: "6.1k",
    match: 89,
    genres: ["Mystery", "Drama", "Thriller"],
    language: "English",
    seasonCount: 2,
    quality: "4K Ultra HD",
    synopsis:
      "When a marine biologist inherits a crumbling lighthouse on a storm-battered island, she discovers its keeper logs predict shipwrecks decades before they happen — including one scheduled for next week.",
    cast: ["Harriet Dunmore", "Callum Reyes", "Ines Moreau"],
    director: "Tobias Wren",
    studio: "Pixel Originals",
    keywords: ["island", "storm", "secrets", "ocean", "prophecy"],
    image: lastLighthouse,
    sample: "elephants",
    popularity: 86,
    addedDaysAgo: 18,
  },
  {
    id: "ember-protocol",
    title: "Ember Protocol",
    kind: "movie",
    category: "movie",
    original: true,
    year: 2025,
    maturity: "PG-13",
    score: 7.9,
    reviews: "9.8k",
    match: 87,
    genres: ["Action", "Thriller"],
    language: "English",
    runtime: 117,
    quality: "4K Ultra HD",
    synopsis:
      "A disavowed operative has six hours to stop a rogue energy cartel from igniting a desert refinery network — with nothing but a stolen satellite key and the one ally who betrayed her.",
    cast: ["Nadia Kross", "Marcus Hale", "Yusuf Demir"],
    director: "Clint Arbogast",
    studio: "Pixel Originals",
    keywords: ["heist", "explosion", "spy", "desert", "mission"],
    image: emberProtocol,
    sample: "steel",
    popularity: 90,
    addedDaysAgo: 9,
  },
  {
    id: "paper-moons",
    title: "Paper Moons",
    kind: "movie",
    category: "movie",
    original: false,
    year: 2023,
    maturity: "PG-13",
    score: 7.6,
    reviews: "4.2k",
    match: 84,
    genres: ["Romance", "Drama"],
    language: "French",
    runtime: 104,
    quality: "HD",
    synopsis:
      "Two strangers locked out of the same Paris apartment building spend one moonlit night on its rooftop — trading secrets they've never told anyone, knowing they'll never meet again.",
    cast: ["Camille Rousseau", "Théo Laurent"],
    director: "Margaux Delacroix",
    studio: "Lune Pictures",
    keywords: ["paris", "night", "love", "rooftop", "strangers"],
    image: paperMoons,
    sample: "elephants",
    popularity: 72,
    addedDaysAgo: 40,
  },
  {
    id: "deep-signal",
    title: "Deep Signal",
    kind: "movie",
    category: "movie",
    original: false,
    year: 2024,
    maturity: "R",
    score: 7.4,
    reviews: "5.5k",
    match: 81,
    genres: ["Horror", "Sci-Fi"],
    language: "English",
    runtime: 98,
    quality: "4K Ultra HD",
    synopsis:
      "A salvage diver answers a distress call from a research station that went dark eleven years ago. The signal is still transmitting — and something down there learned how to answer.",
    cast: ["Ola Brandt", "Priya Shah", "Wes Calloway"],
    director: "Henrik Saar",
    studio: "Abyssal Films",
    keywords: ["underwater", "monster", "ocean", "station", "creature"],
    image: deepSignal,
    sample: "steel",
    popularity: 78,
    addedDaysAgo: 6,
  },
  {
    id: "wild-hours",
    title: "Wild Hours",
    kind: "movie",
    category: "movie",
    original: false,
    year: 2025,
    maturity: "PG",
    score: 7.2,
    reviews: "3.9k",
    match: 88,
    genres: ["Comedy", "Family", "Adventure"],
    language: "English",
    runtime: 101,
    quality: "HD",
    synopsis:
      "One rusty camper van, two bickering parents, three kids and a dog with no sense of direction. The Delgado family's cross-country trip to Grandma's turns into the best disaster of their lives.",
    cast: ["Luis Delgado", "Maya Brooks", "Pip Henley"],
    director: "Sasha Klein",
    studio: "Sunbeam Studios",
    keywords: ["road trip", "family", "dog", "funny", "summer"],
    image: wildHours,
    sample: "bunny",
    popularity: 80,
    addedDaysAgo: 12,
  },
  {
    id: "kingdom-of-ice",
    title: "Kingdom of Ice",
    kind: "series",
    category: "series",
    original: true,
    year: 2025,
    maturity: "TV-G",
    score: 9.3,
    reviews: "7.7k",
    match: 91,
    genres: ["Documentary", "Nature"],
    language: "English",
    seasonCount: 1,
    quality: "4K Ultra HD",
    synopsis:
      "Filmed over three polar winters, this landmark documentary follows the animals who rule the planet's most unforgiving frontier — and the shrinking ice they depend on.",
    cast: ["Narrated by Eleanor Achebe"],
    director: "Rowan Pike",
    studio: "Pixel Originals",
    keywords: ["arctic", "polar bear", "wildlife", "climate", "nature"],
    image: kingdomOfIce,
    sample: "bunny",
    popularity: 75,
    addedDaysAgo: 22,
  },
  {
    id: "skybound-ronin",
    title: "Skybound Ronin",
    kind: "series",
    category: "anime",
    original: true,
    featured: true,
    year: 2025,
    maturity: "TV-14",
    score: 9.0,
    reviews: "14.6k",
    match: 96,
    genres: ["Anime", "Action", "Fantasy"],
    language: "Japanese",
    seasonCount: 2,
    quality: "4K Ultra HD",
    synopsis:
      "Above an endless sea of clouds, a masterless swordsman hunts the sky pirates who burned his island — and uncovers a war between the floating kingdoms and the storm gods below.",
    cast: ["Haruto Mizuki", "Aoi Sakamoto", "Ren Fujiwara"],
    director: "Kenji Arakawa",
    studio: "Studio Kumo",
    keywords: ["samurai", "sky", "islands", "sword", "revenge"],
    image: skyboundRonin,
    sample: "sintel",
    popularity: 97,
    addedDaysAgo: 2,
  },
  {
    id: "starlight-academy",
    title: "Starlight Academy",
    kind: "series",
    category: "anime",
    original: false,
    year: 2024,
    maturity: "TV-PG",
    score: 8.4,
    reviews: "10.1k",
    match: 90,
    genres: ["Anime", "Fantasy", "Comedy"],
    language: "Japanese",
    seasonCount: 2,
    quality: "HD",
    synopsis:
      "Hikari can't cast a single spell — so why did the most elite magic academy in the realm admit her? Her new friends are determined to find out before the Comet Festival exam.",
    cast: ["Yui Hoshino", "Takumi Aizawa", "Mei Kurosawa"],
    director: "Naomi Shirai",
    studio: "Hoshi Animation",
    keywords: ["magic", "school", "friendship", "stars", "witch"],
    image: starlightAcademy,
    sample: "elephants",
    popularity: 88,
    addedDaysAgo: 30,
  },
  {
    id: "mecha-dawn-zero",
    title: "Mecha Dawn: Zero",
    kind: "movie",
    category: "anime",
    original: false,
    year: 2026,
    maturity: "PG-13",
    score: 8.8,
    reviews: "12.3k",
    match: 93,
    genres: ["Anime", "Sci-Fi", "Action"],
    language: "Japanese",
    runtime: 124,
    quality: "4K Ultra HD",
    synopsis:
      "Twenty years after the Last War, a scavenger girl wakes the colossal machine that destroyed her city. It remembers everything — and it's asking her to finish what it started.",
    cast: ["Rin Takahashi", "Daichi Mori"],
    director: "Shoji Kanamura",
    studio: "Forge Animation",
    keywords: ["robot", "mecha", "war", "pilot", "future"],
    image: mechaDawn,
    sample: "steel",
    popularity: 92,
    addedDaysAgo: 4,
  },
  {
    id: "spirit-lantern-cafe",
    title: "Spirit Lantern Café",
    kind: "series",
    category: "anime",
    original: true,
    year: 2025,
    maturity: "TV-G",
    score: 8.9,
    reviews: "6.8k",
    match: 94,
    genres: ["Anime", "Slice of Life", "Fantasy"],
    language: "Japanese",
    seasonCount: 1,
    quality: "HD",
    synopsis:
      "Every evening at dusk, Kotone's mountain café opens its doors to a very particular clientele: wandering forest spirits, a grumpy fox, and anyone who's lost their way home.",
    cast: ["Kotone Amari", "Sota Hayashi"],
    director: "Emi Watanabe",
    studio: "Studio Kumo",
    keywords: ["cozy", "spirits", "fox", "cafe", "healing"],
    image: spiritLantern,
    sample: "bunny",
    popularity: 83,
    addedDaysAgo: 8,
  },
  {
    id: "seoul-midnight-diaries",
    title: "Seoul Midnight Diaries",
    kind: "series",
    category: "kdrama",
    original: true,
    featured: true,
    year: 2025,
    maturity: "TV-14",
    score: 8.9,
    reviews: "18.4k",
    match: 95,
    genres: ["K-Drama", "Romance", "Drama"],
    language: "Korean",
    seasonCount: 1,
    quality: "4K Ultra HD",
    synopsis:
      "A late-night radio DJ and a reclusive webtoon artist keep crossing paths on the same Seoul rooftop at midnight — but neither knows the other is the anonymous listener they've fallen for.",
    cast: ["Kang Min-jae", "Yoon Seo-ah", "Park Ji-hoon"],
    director: "Lee Hye-won",
    studio: "Pixel Originals",
    keywords: ["seoul", "radio", "romance", "rooftop", "webtoon"],
    image: seoulMidnight,
    sample: "elephants",
    popularity: 96,
    addedDaysAgo: 5,
  },
  {
    id: "the-chaebols-secret",
    title: "The Chaebol's Secret",
    kind: "series",
    category: "kdrama",
    original: false,
    year: 2024,
    maturity: "TV-MA",
    score: 8.6,
    reviews: "13.0k",
    match: 90,
    genres: ["K-Drama", "Thriller", "Drama"],
    language: "Korean",
    seasonCount: 2,
    quality: "4K Ultra HD",
    synopsis:
      "The new CEO of Korea's most powerful conglomerate has one goal: destroy it from the inside. The family who ruined her father has no idea who she really is — yet.",
    cast: ["Han Ye-jin", "Choi Dong-hyun", "Seo Yu-ri"],
    director: "Jung Tae-sik",
    studio: "Hwaseong Pictures",
    keywords: ["revenge", "corporate", "family", "power", "secret"],
    image: chaebolSecret,
    sample: "steel",
    popularity: 91,
    addedDaysAgo: 26,
  },
  {
    id: "hanok-love-letter",
    title: "Hanok Love Letter",
    kind: "series",
    category: "kdrama",
    original: false,
    year: 2023,
    maturity: "TV-PG",
    score: 8.3,
    reviews: "9.2k",
    match: 88,
    genres: ["K-Drama", "Historical", "Romance"],
    language: "Korean",
    seasonCount: 1,
    quality: "HD",
    synopsis:
      "In Joseon-era Hanyang, a disgraced royal scholar is hired to ghost-write love letters for a noblewoman — never suspecting she's writing back to him in secret.",
    cast: ["Lee Joon-seo", "Kim Ha-neul"],
    director: "Oh Sang-min",
    studio: "Hanbit Studios",
    keywords: ["joseon", "letters", "historical", "cherry blossom", "scholar"],
    image: hanokLove,
    sample: "elephants",
    popularity: 79,
    addedDaysAgo: 50,
  },
  {
    id: "code-red-gangnam",
    title: "Code Red: Gangnam",
    kind: "series",
    category: "kdrama",
    original: false,
    year: 2025,
    maturity: "TV-MA",
    score: 8.2,
    reviews: "7.3k",
    match: 86,
    genres: ["K-Drama", "Crime", "Medical"],
    language: "Korean",
    seasonCount: 1,
    quality: "4K Ultra HD",
    synopsis:
      "An ER surgeon and a disgraced detective team up when patients arriving at her Gangnam trauma ward all carry the same mysterious marking — and none of them survive the night.",
    cast: ["Song Ji-woo", "Bae Hyun-soo"],
    director: "Kwon Na-rae",
    studio: "Red Line Media",
    keywords: ["hospital", "detective", "crime", "doctor", "seoul"],
    image: codeRed,
    sample: "steel",
    popularity: 84,
    addedDaysAgo: 7,
  },
  {
    id: "legend-of-the-jade-phoenix",
    title: "Legend of the Jade Phoenix",
    kind: "series",
    category: "cdrama",
    original: true,
    featured: true,
    year: 2025,
    maturity: "TV-14",
    score: 8.8,
    reviews: "15.9k",
    match: 94,
    genres: ["C-Drama", "Xianxia", "Fantasy"],
    language: "Mandarin",
    seasonCount: 1,
    quality: "4K Ultra HD",
    synopsis:
      "Reborn as a mortal after a thousand years of exile, the Phoenix Empress must reclaim her celestial powers before the Nine Heavens fall — and before she falls for the general sworn to stop her.",
    cast: ["Lin Yue", "Zhao Chen", "Xu Ming"],
    director: "Wang Lihua",
    studio: "Pixel Originals",
    keywords: ["immortal", "phoenix", "heavens", "reincarnation", "empress"],
    image: jadePhoenix,
    sample: "sintel",
    popularity: 95,
    addedDaysAgo: 10,
  },
  {
    id: "shanghai-moonlight",
    title: "Shanghai Moonlight",
    kind: "series",
    category: "cdrama",
    original: false,
    year: 2024,
    maturity: "TV-14",
    score: 8.4,
    reviews: "8.0k",
    match: 87,
    genres: ["C-Drama", "Period", "Romance"],
    language: "Mandarin",
    seasonCount: 1,
    quality: "HD",
    synopsis:
      "1936 Shanghai. A jazz club singer moonlights as a spy, and the newspaper reporter who keeps showing up at her shows is getting dangerously close to the truth.",
    cast: ["Su Wanqing", "Gu Yichen"],
    director: "Chen Jiayi",
    studio: "Bund Pictures",
    keywords: ["1930s", "spy", "jazz", "shanghai", "romance"],
    image: shanghaiMoon,
    sample: "elephants",
    popularity: 77,
    addedDaysAgo: 34,
  },
  {
    id: "lotus-sword-chronicle",
    title: "Lotus Sword Chronicle",
    kind: "series",
    category: "cdrama",
    original: false,
    year: 2023,
    maturity: "TV-14",
    score: 8.5,
    reviews: "11.4k",
    match: 89,
    genres: ["C-Drama", "Wuxia", "Action"],
    language: "Mandarin",
    seasonCount: 2,
    quality: "HD",
    synopsis:
      "Two sworn brothers from the Lotus Sect are torn apart when their master is murdered. Years later, one is the jianghu's most wanted man — and the other is sent to bring him in.",
    cast: ["Mo Xuan", "Ye Zhiyuan", "Bai Lan"],
    director: "Liu Feng",
    studio: "Jianghu Studios",
    keywords: ["martial arts", "sword", "brothers", "sect", "jianghu"],
    image: lotusSword,
    sample: "sintel",
    popularity: 85,
    addedDaysAgo: 45,
  },
  {
    id: "love-in-chengdu",
    title: "Love in Chengdu",
    kind: "series",
    category: "cdrama",
    original: false,
    year: 2025,
    maturity: "TV-PG",
    score: 8.1,
    reviews: "6.6k",
    match: 91,
    genres: ["C-Drama", "Romance", "Comedy"],
    language: "Mandarin",
    seasonCount: 1,
    quality: "HD",
    synopsis:
      "A Shanghai food critic who can't handle spice is sent to review Chengdu's hottest hotpot stall — run by the chef whose restaurant she once destroyed with a single review.",
    cast: ["Tang Xiaoyu", "Jiang Hao"],
    director: "Zhou Mei",
    studio: "Panda Lane Media",
    keywords: ["food", "hotpot", "romcom", "chef", "city"],
    image: loveChengdu,
    sample: "bunny",
    popularity: 82,
    addedDaysAgo: 3,
  },
];

/* ------------------------------ Episodes ------------------------------ */

const EP_NAMES = [
  "The First Light",
  "Whispers in the Dark",
  "A Promise Broken",
  "Crossroads",
  "What the Tide Brings",
  "Ashes and Embers",
  "The Long Night",
  "Echoes",
  "Behind the Mask",
  "The Turning Point",
  "Fault Lines",
  "Homecoming",
  "Into the Storm",
  "Old Wounds",
  "The Reckoning",
  "Beneath the Surface",
];

const EP_LINES = [
  "{lead} makes a choice that can't be undone, while an old ally returns with unsettling news.",
  "A secret from the past resurfaces, forcing {lead} to question everyone they trust.",
  "Tensions boil over as {lead} races against time to protect what matters most.",
  "An unexpected encounter changes everything — and {lead} isn't ready for the consequences.",
  "{lead} follows a dangerous lead deeper than ever before.",
  "Alliances shift and {lead} learns the true cost of victory.",
  "In the aftermath, {lead} must decide who to save — and who to let go.",
  "A quiet moment turns into a revelation that rewrites {lead}'s story.",
];

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function getSeasons(t: Title): Season[] {
  if (t.kind !== "series") return [];
  const base = hash(t.id);
  const lead = t.cast[0]?.replace("Narrated by ", "") ?? "Our hero";
  return Array.from({ length: t.seasonCount ?? 1 }, (_, si) => {
    const count = 6 + ((base + si) % 3);
    return {
      number: si + 1,
      episodes: Array.from({ length: count }, (_, ei) => ({
        number: ei + 1,
        title: EP_NAMES[(base + si * 7 + ei * 3) % EP_NAMES.length],
        synopsis: EP_LINES[(base + si * 5 + ei) % EP_LINES.length].replace("{lead}", lead),
        minutes: 42 + ((base + ei * 11 + si) % 18),
      })),
    };
  });
}

/* ------------------------------ Helpers ------------------------------ */

export const getTitle = (id: string) => TITLES.find((t) => t.id === id);

export const isKidSafe = (t: Title) => KIDS_RATINGS.includes(t.maturity);

export function formatLength(t: Title) {
  if (t.kind === "movie" && t.runtime) {
    const h = Math.floor(t.runtime / 60);
    const m = t.runtime % 60;
    return h ? `${h}h ${m}m` : `${m}m`;
  }
  const n = t.seasonCount ?? 1;
  return `${n} Season${n === 1 ? "" : "s"}`;
}

export function featuredLabel(t: Title) {
  const base = t.original ? "Featured Original" : "Featured";
  const kind =
    t.category === "anime"
      ? "Anime"
      : t.category === "kdrama"
        ? "K-Drama"
        : t.category === "cdrama"
          ? "C-Drama"
          : t.kind === "movie"
            ? "Film"
            : "Series";
  return `${base} ${kind}`;
}

export const ALL_GENRES = Array.from(new Set(TITLES.flatMap((t) => t.genres))).sort();
export const ALL_LANGUAGES = Array.from(new Set(TITLES.map((t) => t.language))).sort();
export const ALL_YEARS = Array.from(new Set(TITLES.map((t) => t.year))).sort((a, b) => b - a);

export type SortKey = "popular" | "rating" | "newest" | "az";

export const SORT_LABELS: Record<SortKey, string> = {
  popular: "Most Popular",
  rating: "Top Rated",
  newest: "Recently Released",
  az: "A – Z",
};

export function sortTitles(list: Title[], sort: SortKey) {
  const copy = [...list];
  switch (sort) {
    case "rating":
      return copy.sort((a, b) => b.score - a.score);
    case "newest":
      return copy.sort((a, b) => b.year - a.year || a.addedDaysAgo - b.addedDaysAgo);
    case "az":
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return copy.sort((a, b) => b.popularity - a.popularity);
  }
}

/** Case-insensitive match against title, cast, director, genre, keyword, language. */
export function searchTitles(list: Title[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  const scored = list
    .map((t) => {
      let score = 0;
      if (t.title.toLowerCase().includes(q)) score += t.title.toLowerCase().startsWith(q) ? 10 : 6;
      if (t.cast.some((c) => c.toLowerCase().includes(q))) score += 4;
      if (t.director.toLowerCase().includes(q)) score += 4;
      if (t.genres.some((g) => g.toLowerCase().includes(q))) score += 3;
      if (t.keywords.some((k) => k.toLowerCase().includes(q))) score += 2;
      if (t.language.toLowerCase().includes(q)) score += 2;
      if (CATEGORY_LABELS[t.category].toLowerCase().includes(q)) score += 2;
      return { t, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.t.popularity - a.t.popularity);
  return scored.map((x) => x.t);
}

/** Simple genre-overlap recommender — swap for a smarter model later. */
export function similarTitles(t: Title, pool: Title[], limit = 8) {
  return pool
    .filter((x) => x.id !== t.id)
    .map((x) => ({
      x,
      s:
        x.genres.filter((g) => t.genres.includes(g)).length * 3 +
        (x.category === t.category ? 2 : 0) +
        x.score / 10,
    }))
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((r) => r.x);
}

export function recommendFor(seedIds: string[], pool: Title[], limit = 10) {
  const seeds = seedIds.map(getTitle).filter(Boolean) as Title[];
  if (!seeds.length) return [...pool].sort((a, b) => b.score - a.score).slice(0, limit);
  const genreWeight = new Map<string, number>();
  seeds.forEach((s) => s.genres.forEach((g) => genreWeight.set(g, (genreWeight.get(g) ?? 0) + 1)));
  return pool
    .filter((t) => !seedIds.includes(t.id))
    .map((t) => ({
      t,
      s: t.genres.reduce((acc, g) => acc + (genreWeight.get(g) ?? 0), 0) * 2 + t.score / 5,
    }))
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((r) => r.t);
}
