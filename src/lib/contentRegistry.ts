// Central registry of every editable content slot on the site.
// Each slot has a stable key. The Admin uses this to show the current default
// alongside any uploaded replacement, and components use it to look up overrides.

import heroDefault from "@/assets/daniel-hero.jpg";
import aboutDefault from "@/assets/daniel-about.jpg";
import cinematicImage from "@/assets/daniel-cinematic.jpg";
import tantraPoster from "@/assets/tantra-poster.jpg";

import fashionUntamed1 from "@/assets/fashion-untamed-1.jpg";
import fashionUntamed2 from "@/assets/fashion-untamed-2.jpg";
import fashionUntamed3 from "@/assets/fashion-untamed-3.jpg";
import fashionUntamed4 from "@/assets/fashion-untamed-4.jpg";
import fashionAfw1 from "@/assets/fashion-afw-1.jpg";
import fashionAfw2 from "@/assets/fashion-afw-2.jpg";
import fashionAfw3 from "@/assets/fashion-afw-3.jpg";
import fashionAfw4 from "@/assets/fashion-afw-4.jpg";
import copa1 from "@/assets/copa-1.jpg";
import copa2 from "@/assets/copa-2.jpg";
import copa3 from "@/assets/copa-3.jpg";
import copa4 from "@/assets/copa-4.jpg";

import personal1 from "@/assets/personal-1.jpg";
import personal2 from "@/assets/personal-2.jpg";
import personal3 from "@/assets/personal-3.jpg";
import personal4 from "@/assets/personal-4.jpg";
import personal5 from "@/assets/personal-5.jpg";
import personal6 from "@/assets/personal-6.jpg";

export type SlotKind = "image" | "video";
export type Slot = {
  key: string; // unique across the whole site
  label: string; // human-friendly
  kind: SlotKind;
  default: string; // url to default asset
};

export type SectionDef = {
  key: string;
  label: string;
  description?: string;
  slots: Slot[];
  // If true, admins can add additional items beyond the defaults (no slot key)
  extras?: { label: string; kind: SlotKind } | null;
};

export const SECTIONS: SectionDef[] = [
  {
    key: "hero",
    label: "Hero",
    description: "Full-screen background image at the top of the page.",
    slots: [{ key: "hero/main", label: "Hero image", kind: "image", default: heroDefault }],
    extras: null,
  },
  {
    key: "about",
    label: "About",
    description: "Portrait shown beside the About copy.",
    slots: [{ key: "about/main", label: "About portrait", kind: "image", default: aboutDefault }],
    extras: null,
  },
  {
    key: "work-films",
    label: "Work — Films",
    description: "Poster image and trailer video for each film.",
    slots: [
      { key: "work/paradise/poster", label: "Paradise — Poster", kind: "image", default: cinematicImage },
      { key: "work/paradise/trailer", label: "Paradise — Trailer", kind: "video", default: "/videos/paradise-trailer.mp4" },
      { key: "work/tantra/poster", label: "Tantra — Poster", kind: "image", default: tantraPoster },
      { key: "work/tantra/trailer", label: "Tantra — Trailer", kind: "video", default: "/videos/tantra-trailer.mp4" },
    ],
    extras: null,
  },
  {
    key: "work-fashion",
    label: "Work — Fashion",
    description: "Fashion campaign images (4 per project).",
    slots: [
      { key: "fashion/copa/1", label: "FL × COPA — 1", kind: "image", default: copa1 },
      { key: "fashion/copa/2", label: "FL × COPA — 2", kind: "image", default: copa2 },
      { key: "fashion/copa/3", label: "FL × COPA — 3", kind: "image", default: copa3 },
      { key: "fashion/copa/4", label: "FL × COPA — 4", kind: "image", default: copa4 },
      { key: "fashion/afw/1", label: "Accra Fashion Week — 1", kind: "image", default: fashionAfw1 },
      { key: "fashion/afw/2", label: "Accra Fashion Week — 2", kind: "image", default: fashionAfw2 },
      { key: "fashion/afw/3", label: "Accra Fashion Week — 3", kind: "image", default: fashionAfw3 },
      { key: "fashion/afw/4", label: "Accra Fashion Week — 4", kind: "image", default: fashionAfw4 },
      { key: "fashion/untamed/1", label: "Untamed Empire — 1", kind: "image", default: fashionUntamed1 },
      { key: "fashion/untamed/2", label: "Untamed Empire — 2", kind: "image", default: fashionUntamed2 },
      { key: "fashion/untamed/3", label: "Untamed Empire — 3", kind: "image", default: fashionUntamed3 },
      { key: "fashion/untamed/4", label: "Untamed Empire — 4", kind: "image", default: fashionUntamed4 },
    ],
    extras: { label: "Additional fashion image", kind: "image" },
  },
  {
    key: "work-personal",
    label: "Work — Personal",
    description: "Marquee of personal editorial shots. Add more or replace existing slots.",
    slots: [
      { key: "personal/1", label: "Personal — 1", kind: "image", default: personal1 },
      { key: "personal/2", label: "Personal — 2", kind: "image", default: personal2 },
      { key: "personal/3", label: "Personal — 3", kind: "image", default: personal3 },
      { key: "personal/4", label: "Personal — 4", kind: "image", default: personal4 },
      { key: "personal/5", label: "Personal — 5", kind: "image", default: personal5 },
      { key: "personal/6", label: "Personal — 6", kind: "image", default: personal6 },
    ],
    extras: { label: "Additional personal image", kind: "image" },
  },
  {
    key: "creative",
    label: "Creative — Artwork",
    description: "Six artwork slots. Empty slots show 'Coming Soon' on the site.",
    slots: Array.from({ length: 6 }).map((_, i) => ({
      key: `creative/${i + 1}`,
      label: `Artwork ${i + 1}`,
      kind: "image" as const,
      default: "",
    })),
    extras: null,
  },
  {
    key: "gallery",
    label: "Gallery",
    description:
      "The Gallery has many built-in images; add more here. Choose a category so it appears under the right filter.",
    slots: [],
    extras: { label: "Additional gallery image", kind: "image" },
  },
];

export const ALL_SLOTS: Slot[] = SECTIONS.flatMap((s) => s.slots);

// Map a slot key -> default url, for quick lookup in components.
export const DEFAULT_BY_SLOT: Record<string, string> = Object.fromEntries(
  ALL_SLOTS.map((s) => [s.key, s.default])
);
