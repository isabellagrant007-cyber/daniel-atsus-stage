import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type MediaItem = {
  id: string;
  section: string;
  category: string | null;
  type: "image" | "video" | string;
  title: string | null;
  subtitle: string | null;
  url: string;
  poster_url: string | null;
  storage_path: string | null;
  sort_order: number;
  metadata: Record<string, unknown>;
};

export function useMedia(section: string) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const { data } = await supabase
        .from("media_items")
        .select("*")
        .eq("section", section)
        .order("sort_order", { ascending: true });
      if (!active) return;
      setItems((data ?? []) as MediaItem[]);
      setLoading(false);
    };
    load();

    const channel = supabase
      .channel(`media-${section}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "media_items", filter: `section=eq.${section}` },
        () => load()
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, [section]);

  return { items, loading };
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
