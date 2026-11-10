import { Link } from "@tanstack/react-router";

import { Logo } from "@/components/pixel/Logo";
import { NAV_LINKS } from "@/components/pixel/Navbar";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr] md:px-10">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Your world of stories, all in one place. Originals, films, anime, K-Drama and C-Drama.
          </p>
          <p className="mt-6 text-xs leading-relaxed text-muted-foreground/70">
            Pixel is an independent demo project. All titles and artwork are fictional. Playback uses
            openly licensed Blender Foundation films as sample video.
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm sm:grid-cols-3" aria-label="Footer">
          {NAV_LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
            </Link>
          ))}
          <Link to="/genres" className="text-muted-foreground transition-colors hover:text-foreground">
            Genres
          </Link>
          <Link
            to="/search"
            search={{}}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Search
          </Link>
        </nav>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground/70">
        © {new Date().getFullYear()} Pixel
      </div>
    </footer>
  );
}
