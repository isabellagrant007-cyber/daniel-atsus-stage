import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type MediaItem = {
  id: string;
  section: string;
  category: string | null;
  slot: string | null;
  type: "image" | "video" | string;
  title: string | null;
  subtitle: string | null;
  url: string;
  poster_url: string | null;
  storage_path: string | null;
  sort_order: number;
  metadata: Record<string, unknown>;
};

function useMediaQuery(filter: { section?: string }) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      let q = supabase.from("media_items").select("*").order("sort_order", { ascending: true });
      if (filter.section) q = q.eq("section", filter.section);
      const { data } = await q;
      if (!active) return;
      setItems((data ?? []) as MediaItem[]);
      setLoading(false);
    };
    load();

    const channel = supabase
      .channel(`media-${filter.section ?? "all"}-${Math.random().toString(36).slice(2)}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "media_items",
          ...(filter.section ? { filter: `section=eq.${filter.section}` } : {}),
        },
        () => load()
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter.section]);

  return { items, loading };
}

export function useMedia(section: string) {
  return useMediaQuery({ section });
}

export function useAllMedia() {
  return useMediaQuery({});
}

/**
 * Returns a function to look up the live URL for a slot key.
 * Falls back to the provided default when no override exists.
 */
export function useSlotResolver() {
  const { items } = useAllMedia();
  return useMemo(() => {
    const bySlot: Record<string, MediaItem> = {};
    for (const it of items) if (it.slot) bySlot[it.slot] = it;
    return {
      get: (slotKey: string, fallback: string) => bySlot[slotKey]?.url ?? fallback,
      item: (slotKey: string) => bySlot[slotKey],
      extras: (section: string) => items.filter((i) => i.section === section && !i.slot),
    };
  }, [items]);
}

export function groupByCategory(items: MediaItem[]) {
  const map: Record<string, MediaItem[]> = {};
  for (const it of items) {
    const k = it.category ?? "_";
    if (!map[k]) map[k] = [];
    map[k].push(it);
  }
  return map;
}
