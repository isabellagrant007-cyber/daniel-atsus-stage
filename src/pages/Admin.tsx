import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Trash2, Upload, LogOut, RefreshCw, Plus, ExternalLink, Newspaper } from "lucide-react";
import { SECTIONS, type Slot } from "@/lib/contentRegistry";
import type { MediaItem } from "@/hooks/useMedia";
import PressManager from "@/components/admin/PressManager";

const Admin = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].key);
  const [busySlot, setBusySlot] = useState<string | null>(null);

  // Auth + role gates
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate("/auth", { replace: true });
      else setUserId(session.user.id);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate("/auth", { replace: true });
      else setUserId(data.session.user.id);
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!data);
    })();
  }, [userId]);

  const loadItems = async () => {
    const { data } = await supabase.from("media_items").select("*").order("sort_order");
    setItems((data ?? []) as MediaItem[]);
  };

  useEffect(() => {
    if (isAdmin) loadItems();
  }, [isAdmin]);

  const sectionDef = useMemo(() => SECTIONS.find((s) => s.key === activeSection)!, [activeSection]);
  const overridesBySlot = useMemo(() => {
    const m: Record<string, MediaItem> = {};
    for (const i of items) if (i.slot) m[i.slot] = i;
    return m;
  }, [items]);
  const extras = useMemo(
    () => items.filter((i) => i.section === activeSection && !i.slot),
    [items, activeSection]
  );

  // Upload helpers
  const uploadFile = async (file: File, slotKey: string | null, category: string | null) => {
    if (!userId) return null;
    const ext = file.name.split(".").pop();
    const path = `${activeSection}/${slotKey ?? "extras"}/${crypto.randomUUID()}.${ext}`;
    const { error: upErr } = await supabase.storage.from("media").upload(path, file, { cacheControl: "3600" });
    if (upErr) throw upErr;
    const { data: pub } = supabase.storage.from("media").getPublicUrl(path);
    return { url: pub.publicUrl, path };
  };

  const removeItem = async (item: MediaItem) => {
    if (item.storage_path) {
      await supabase.storage.from("media").remove([item.storage_path]);
    }
    await supabase.from("media_items").delete().eq("id", item.id);
  };

  // Replace (or set) a slot — only one row per slot
  const handleSlotUpload = async (slot: Slot, file: File) => {
    setBusySlot(slot.key);
    try {
      const existing = overridesBySlot[slot.key];
      const uploaded = await uploadFile(file, slot.key, null);
      if (!uploaded) return;
      if (existing) await removeItem(existing);
      const isVideo = file.type.startsWith("video/");
      const { error } = await supabase.from("media_items").insert({
        section: activeSection,
        slot: slot.key,
        category: null,
        type: isVideo ? "video" : slot.kind,
        title: slot.label,
        url: uploaded.url,
        storage_path: uploaded.path,
        sort_order: 0,
      });
      if (error) throw error;
      toast({ title: existing ? "Replaced" : "Uploaded", description: slot.label });
      await loadItems();
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setBusySlot(null);
    }
  };

  const handleRevertSlot = async (slot: Slot) => {
    const existing = overridesBySlot[slot.key];
    if (!existing) return;
    if (!confirm(`Revert "${slot.label}" back to the default?`)) return;
    setBusySlot(slot.key);
    try {
      await removeItem(existing);
      toast({ title: "Reverted to default", description: slot.label });
      await loadItems();
    } catch (err: any) {
      toast({ title: "Revert failed", description: err.message, variant: "destructive" });
    } finally {
      setBusySlot(null);
    }
  };

  // Extras (additional items, no slot) — used for galleries
  const [extraTitle, setExtraTitle] = useState("");
  const [extraCategory, setExtraCategory] = useState("");
  const [addingExtra, setAddingExtra] = useState(false);

  const handleExtraUpload = async (file: File) => {
    setAddingExtra(true);
    try {
      const uploaded = await uploadFile(file, null, extraCategory || null);
      if (!uploaded) return;
      const isVideo = file.type.startsWith("video/");
      const { error } = await supabase.from("media_items").insert({
        section: activeSection,
        slot: null,
        category: extraCategory || null,
        type: isVideo ? "video" : "image",
        title: extraTitle || null,
        url: uploaded.url,
        storage_path: uploaded.path,
        sort_order: extras.length,
      });
      if (error) throw error;
      setExtraTitle("");
      setExtraCategory("");
      toast({ title: "Added" });
      await loadItems();
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setAddingExtra(false);
    }
  };

  const handleExtraDelete = async (item: MediaItem) => {
    if (!confirm("Remove this item?")) return;
    await removeItem(item);
    await loadItems();
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth", { replace: true });
  };

  if (isAdmin === null) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground text-sm">Loading…</div>;
  }
  if (isAdmin === false) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="font-serif text-2xl">Not authorized</h1>
        <p className="text-muted-foreground text-sm max-w-md">
          Your account ({userId}) does not have admin access.
        </p>
        <Button variant="outline" onClick={signOut}>Sign out</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/30 px-6 py-4 flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur z-20">
        <div>
          <p className="text-gold text-[10px] tracking-[0.4em] uppercase">Admin</p>
          <h1 className="font-serif text-xl">Content Manager</h1>
        </div>
        <Button variant="ghost" size="sm" onClick={signOut}><LogOut className="w-4 h-4 mr-1" /> Sign out</Button>
      </header>

      <div className="grid md:grid-cols-[240px_1fr] gap-0">
        <aside className="border-r border-border/30 p-4 space-y-1 md:sticky md:top-[73px] md:self-start">
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => setActiveSection(s.key)}
              className={`w-full text-left px-3 py-2 text-xs tracking-wider uppercase font-sans rounded-sm transition ${
                activeSection === s.key ? "bg-gold/10 text-gold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
          <button
            onClick={() => setActiveSection("__press__")}
            className={`w-full text-left px-3 py-2 text-xs tracking-wider uppercase font-sans rounded-sm transition flex items-center gap-2 ${
              activeSection === "__press__" ? "bg-gold/10 text-gold" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Newspaper className="w-3 h-3" /> Press / Featured In
          </button>
        </aside>

        <main className="p-6 space-y-8">
          {activeSection === "__press__" ? (
            <PressManager />
          ) : (
            <>
              <div>
                <h2 className="font-serif text-2xl mb-1">{sectionDef.label}</h2>
                {sectionDef.description && (
                  <p className="text-xs text-muted-foreground">{sectionDef.description}</p>
                )}
              </div>

          {/* Slots — one card per editable piece of content */}
          {sectionDef.slots.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sectionDef.slots.map((slot) => {
                const override = overridesBySlot[slot.key];
                const liveUrl = override?.url || slot.default;
                const isCustom = !!override;
                const busy = busySlot === slot.key;
                return (
                  <div
                    key={slot.key}
                    className={`border rounded-sm overflow-hidden bg-card/30 ${
                      isCustom ? "border-gold/40" : "border-border/30"
                    }`}
                  >
                    <div className="relative aspect-[4/3] bg-background flex items-center justify-center">
                      {liveUrl ? (
                        slot.kind === "video" ? (
                          <video src={liveUrl} className="w-full h-full object-cover" muted playsInline />
                        ) : (
                          <img src={liveUrl} alt={slot.label} className="w-full h-full object-cover" />
                        )
                      ) : (
                        <p className="text-[10px] tracking-[0.4em] uppercase text-gold/40">Empty — Coming Soon</p>
                      )}
                      <span
                        className={`absolute top-2 left-2 text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 backdrop-blur ${
                          isCustom ? "bg-gold/20 text-gold border border-gold/40" : "bg-background/70 text-muted-foreground border border-border/40"
                        }`}
                      >
                        {isCustom ? "Custom" : liveUrl ? "Default" : "Empty"}
                      </span>
                    </div>
                    <div className="p-3 space-y-2">
                      <p className="text-xs font-sans truncate">{slot.label}</p>
                      <div className="flex gap-2">
                        <label className="flex-1 inline-flex items-center justify-center gap-1.5 cursor-pointer border border-gold/40 hover:bg-gold/5 transition px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-gold">
                          {busy ? (
                            "Working…"
                          ) : (
                            <>
                              <Upload className="w-3 h-3" /> {isCustom ? "Replace" : "Upload"}
                            </>
                          )}
                          <input
                            type="file"
                            accept={slot.kind === "video" ? "video/*" : "image/*"}
                            hidden
                            disabled={busy}
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) handleSlotUpload(slot, f);
                              e.currentTarget.value = "";
                            }}
                          />
                        </label>
                        {isCustom && (
                          <button
                            onClick={() => handleRevertSlot(slot)}
                            disabled={busy}
                            title="Revert to default"
                            className="inline-flex items-center justify-center border border-border/40 hover:border-destructive hover:text-destructive transition px-3 py-2"
                          >
                            <RefreshCw className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Extras — additional uploads beyond the defaults */}
          {sectionDef.extras && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <h3 className="font-sans text-xs tracking-[0.3em] uppercase text-gold">Add more</h3>
                <div className="flex-1 h-px bg-gold/20" />
              </div>
              <div className="border border-dashed border-gold/30 p-4 rounded-sm grid sm:grid-cols-[1fr_1fr_auto] gap-3 items-end">
                <Input
                  placeholder="Optional title"
                  value={extraTitle}
                  onChange={(e) => setExtraTitle(e.target.value)}
                />
                {activeSection === "gallery" ? (
                  <select
                    value={extraCategory}
                    onChange={(e) => setExtraCategory(e.target.value)}
                    className="h-10 px-3 bg-background border border-input rounded-md text-sm"
                  >
                    <option value="">Select category…</option>
                    <option value="cinematic">Cinematic</option>
                    <option value="fashion">Fashion</option>
                    <option value="personal">Personal</option>
                    <option value="bts">BTS</option>
                  </select>
                ) : (
                  <div />
                )}
                <label className="inline-flex items-center justify-center gap-2 cursor-pointer border border-gold/40 hover:bg-gold/5 transition px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] text-gold whitespace-nowrap">
                  <Plus className="w-3 h-3" />
                  {addingExtra ? "Uploading…" : sectionDef.extras.label}
                  <input
                    type="file"
                    accept={sectionDef.extras.kind === "video" ? "video/*" : "image/*"}
                    hidden
                    disabled={addingExtra}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleExtraUpload(f);
                      e.currentTarget.value = "";
                    }}
                  />
                </label>
              </div>

              {extras.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {extras.map((it) => (
                    <div key={it.id} className="relative group border border-border/30 rounded-sm overflow-hidden">
                      {it.type === "video" ? (
                        <video src={it.url} className="w-full aspect-square object-cover" muted />
                      ) : (
                        <img src={it.url} alt={it.title ?? ""} className="w-full aspect-square object-cover" />
                      )}
                      <div className="p-2 text-[10px] truncate">
                        {it.title || "Untitled"}
                        {it.category ? ` · ${it.category}` : ""}
                      </div>
                      <button
                        onClick={() => handleExtraDelete(it)}
                        className="absolute top-2 right-2 p-1.5 bg-background/80 hover:bg-destructive hover:text-destructive-foreground rounded-sm opacity-0 group-hover:opacity-100 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
