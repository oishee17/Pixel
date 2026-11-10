import { Bot, Cat, Rocket, Smile } from "lucide-react";

import type { AvatarTone, Profile } from "@/lib/viewer-store";
import { cn } from "@/lib/utils";

const TONES: Record<AvatarTone, string> = {
  sky: "bg-chart-5/25 text-chart-5",
  violet: "bg-violet/25 text-violet",
  mint: "bg-success/20 text-success",
  rose: "bg-primary/20 text-primary",
};

const ICONS: Record<AvatarTone, typeof Bot> = { sky: Bot, violet: Cat, mint: Rocket, rose: Smile };

export function ProfileAvatar({
  profile,
  className,
}: {
  profile: Pick<Profile, "tone" | "name">;
  className?: string;
}) {
  const Icon = ICONS[profile.tone];
  return (
    <span
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-border",
        TONES[profile.tone],
        className,
      )}
      aria-label={profile.name}
    >
      <Icon className="size-[55%]" />
    </span>
  );
}
