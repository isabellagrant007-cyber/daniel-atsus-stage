import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Trash2, ExternalLink, RefreshCw, Plus, Loader2, Eye, EyeOff } from "lucide-react";

type PressFeature = {
  id: string;
  url: string;
  title: string | null;
  description: string | null;
  image_url: string | null;
  site_name: string | null;
  favicon_url: string | null;
  sort_order: number;
  published: boolean;
};

const PressManager = () => {
  const [items, setItems] = useState<PressFeature[]>([]);
  const [newUrl, setNewUrl] = useState("");
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data } = await supabase
      .from("press_features")
      .select("*")
      .order("sort_order", { ascending: true });
    setItems((data ?? []) as PressFeature[]);
  };

  useEffect(() => {
    load();
  }, []);

  const fetchPreview = async (url: string) => {
    const { data, error } = await supabase.functions.invoke("fetch-og", { body: { url } });
    if (error) throw error;
    return data as {
      title: string | null;
      description: string | null;
      image_url: string | null;
      site_name: string | null;
      favicon_url: string | null;
    };
  };

  const handleAdd = async () => {
    if (!newUrl.trim()) return;
    setBusy(true);
    try {
      const preview = await fetchPreview(newUrl.trim());
      const { error } = await supabase.from("press_features").insert({
        url: newUrl.trim(),
        title: preview.title,
        description: preview.description,
        image_url: preview.image_url,
        site_name: preview.site_name,
        favicon_url: preview.favicon_url,
        sort_order: items.length,
        published: true,
      });
      if (error) throw error;
      setNewUrl("");
      toast({ title: "Press feature added", description: preview.title ?? newUrl });
      await load();
    } catch (err: any) {
      toast({ title: "Could not add", description: err.message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  const handleRefresh = async (item: PressFeature) => {
    setBusy(true);
    try {
      const preview = await fetchPreview(item.url);
      await supabase
        .from("press_features")
        .update({
          title: preview.title,
          description: preview.description,
          image_url: preview.image_url,
          site_name: preview.site_name,
          favicon_url: preview.favicon_url,
        })
        .eq("id", item.id);
      toast({ title: "Refreshed preview" });
      await load();
    } catch (err: any) {
      toast({ title: "Refresh failed", description: err.message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (item: PressFeature) => {
    if (!confirm("Remove this press feature?")) return;
    await supabase.from("press_features").delete().eq("id", item.id);
    await load();
  };

  const togglePublished = async (item: PressFeature) => {
    await supabase.from("press_features").update({ published: !item.published }).eq("id", item.id);
    await load();
  };

  const updateField = async (item: PressFeature, patch: Partial<PressFeature>) => {
    await supabase.from("press_features").update(patch).eq("id", item.id);
    await load();
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl mb-1">Press / Featured In</h2>
        <p className="text-xs text-muted-foreground">
          Paste an article URL — preview image, headline, and outlet are fetched automatically. You can edit, refresh, hide, or remove each feature.
        </p>
      </div>

      {/* Add new */}
      <div className="border border-dashed border-gold/30 p-4 rounded-sm flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
        <div className="flex-1">
          <label className="text-[10px] tracking-[0.3em] uppercase text-gold/80 block mb-2">
            Article URL
          </label>
          <Input
            placeholder="https://deadline.com/..."
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
        </div>
        <Button
          onClick={handleAdd}
          disabled={busy || !newUrl.trim()}
          className="bg-gold/10 border border-gold/40 text-gold hover:bg-gold/20"
        >
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          Add Feature
        </Button>
      </div>

      {/* Existing */}
      <div className="space-y-4">
        {items.length === 0 && (
          <p className="text-xs text-muted-foreground italic">No press features yet.</p>
        )}
        {items.map((item) => (
          <div
            key={item.id}
            className={`border rounded-sm overflow-hidden grid grid-cols-1 md:grid-cols-[200px_1fr_auto] gap-4 ${
              item.published ? "border-border/30 bg-card/30" : "border-border/20 bg-card/10 opacity-60"
            }`}
          >
            <div className="aspect-[16/10] md:aspect-auto bg-background overflow-hidden">
              {item.image_url ? (
                <img src={item.image_url} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground/40 uppercase tracking-[0.3em]">
                  No preview
                </div>
              )}
            </div>
            <div className="p-3 space-y-2 min-w-0">
              <div className="flex items-center gap-2">
                {item.favicon_url && <img src={item.favicon_url} alt="" className="w-4 h-4" />}
                <Input
                  className="h-7 text-[10px] tracking-[0.25em] uppercase border-0 bg-transparent px-0 focus-visible:ring-0"
                  value={item.site_name ?? ""}
                  onChange={(e) =>
                    setItems((prev) => prev.map((p) => (p.id === item.id ? { ...p, site_name: e.target.value } : p)))
                  }
                  onBlur={(e) => updateField(item, { site_name: e.target.value })}
                />
              </div>
              <Input
                className="font-serif text-base"
                value={item.title ?? ""}
                placeholder="Article title"
                onChange={(e) =>
                  setItems((prev) => prev.map((p) => (p.id === item.id ? { ...p, title: e.target.value } : p)))
                }
                onBlur={(e) => updateField(item, { title: e.target.value })}
              />
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[10px] text-muted-foreground hover:text-gold truncate max-w-full"
              >
                <ExternalLink className="w-3 h-3 shrink-0" />
                <span className="truncate">{item.url}</span>
              </a>
            </div>
            <div className="flex md:flex-col gap-2 p-3 md:border-l border-border/20">
              <button
                onClick={() => togglePublished(item)}
                title={item.published ? "Hide from site" : "Show on site"}
                className="inline-flex items-center justify-center border border-border/40 hover:border-gold hover:text-gold transition px-3 py-2"
              >
                {item.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              </button>
              <button
                onClick={() => handleRefresh(item)}
                title="Re-fetch preview"
                disabled={busy}
                className="inline-flex items-center justify-center border border-border/40 hover:border-gold hover:text-gold transition px-3 py-2"
              >
                <RefreshCw className={`w-3 h-3 ${busy ? "animate-spin" : ""}`} />
              </button>
              <button
                onClick={() => handleDelete(item)}
                title="Remove"
                className="inline-flex items-center justify-center border border-border/40 hover:border-destructive hover:text-destructive transition px-3 py-2"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PressManager;
