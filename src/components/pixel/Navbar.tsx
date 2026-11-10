import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Bell, Check, ChevronDown, Menu, Search, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

import { Logo } from "@/components/pixel/Logo";
import { ProfileAvatar } from "@/components/pixel/ProfileAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NOTIFICATIONS, useViewer } from "@/lib/viewer-store";
import { cn } from "@/lib/utils";

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/originals", label: "Originals" },
  { to: "/movies", label: "Movies" },
  { to: "/series", label: "Series" },
  { to: "/anime", label: "Anime" },
  { to: "/kdrama", label: "K-Drama" },
  { to: "/cdrama", label: "C-Drama" },
  { to: "/my-list", label: "My List" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const { profile, profiles, setActiveProfile, unreadCount, isRead, markAllRead } = useViewer();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-border bg-background/95 backdrop-blur-md" : "nav-fade",
      )}
    >
      <div className="mx-auto flex h-20 max-w-[1600px] items-center gap-6 px-5 md:px-10">
        <Logo />

        <nav className="ml-6 hidden items-center gap-1 xl:flex" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:gap-4">
          <Link
            to="/search"
            search={{}}
            aria-label="Search"
            className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Search className="size-5" />
          </Link>

          <Popover>
            <PopoverTrigger
              aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
              className="relative flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Bell className="size-5" />
              {unreadCount > 0 && (
                <span className="absolute right-2 top-1.5 size-2.5 rounded-full bg-primary ring-2 ring-background" />
              )}
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 border-border bg-popover p-0">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <p className="font-display text-sm font-semibold">Notifications</p>
                <button
                  onClick={markAllRead}
                  className="text-xs font-medium text-primary hover:underline disabled:opacity-40"
                  disabled={unreadCount === 0}
                >
                  Mark all read
                </button>
              </div>
              <ul className="max-h-96 overflow-y-auto py-1">
                {NOTIFICATIONS.map((n) => (
                  <li key={n.id}>
                    <button
                      className="flex w-full gap-3 px-4 py-3 text-left transition-colors hover:bg-accent"
                      onClick={() =>
                        n.titleId && navigate({ to: "/title/$id", params: { id: n.titleId } })
                      }
                    >
                      <span
                        className={cn(
                          "mt-1.5 size-2 shrink-0 rounded-full",
                          isRead(n.id) ? "bg-transparent" : "bg-primary",
                        )}
                      />
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold">{n.title}</span>
                        <span className="block text-sm text-muted-foreground">{n.body}</span>
                        <span className="mt-1 block text-xs text-muted-foreground/70">{n.ago}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2.5 rounded-xl py-1 pl-1 pr-2 transition-colors hover:bg-accent">
              <ProfileAvatar profile={profile} />
              <span className="hidden text-sm font-semibold sm:inline">
                {profile.name}
                {profile.tag ? ` (${profile.tag})` : ""}
              </span>
              <ChevronDown className="hidden size-4 text-muted-foreground sm:inline" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60 border-border bg-popover">
              <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground">
                Switch profile
              </DropdownMenuLabel>
              {profiles.map((p) => (
                <DropdownMenuItem
                  key={p.id}
                  onSelect={() => setActiveProfile(p.id)}
                  className="gap-3 py-2"
                >
                  <ProfileAvatar profile={p} className="size-8" />
                  <span className="flex-1">
                    {p.name}
                    {p.kids && (
                      <span className="ml-2 rounded bg-success/15 px-1.5 py-0.5 text-[10px] font-bold uppercase text-success">
                        Kids
                      </span>
                    )}
                  </span>
                  {p.id === profile.id && <Check className="size-4 text-primary" />}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/my-list">My List</Link>
              </DropdownMenuItem>
              {profile.kids && (
                <div className="flex items-center gap-2 px-2 py-2 text-xs text-muted-foreground">
                  <ShieldCheck className="size-4 text-success" /> Showing age-appropriate titles
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className="flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent xl:hidden"
            >
              <Menu className="size-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 border-border bg-background">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <Logo />
              </SheetHeader>
              <nav className="mt-4 flex flex-col gap-1 px-4" aria-label="Mobile">
                {NAV_LINKS.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    activeOptions={{ exact: l.to === "/" }}
                    className="rounded-lg px-3 py-3 font-display text-base font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground data-[status=active]:bg-primary/15 data-[status=active]:text-primary"
                  >
                    {l.label}
                  </Link>
                ))}
                <Link
                  to="/genres"
                  className="rounded-lg px-3 py-3 font-display text-base font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground data-[status=active]:bg-primary/15 data-[status=active]:text-primary"
                >
                  Genres
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
