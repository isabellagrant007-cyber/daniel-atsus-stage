import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Trash2, Upload, LogOut } from "lucide-react";
import type { MediaItem } from "@/hooks/useMedia";

const SECTIONS = [
  { key: "hero", label: "Hero", categories: [""], type: "image", single: true },
  { key: "about", label: "About", categories: [""], type: "image", single: true },
  {
    key: "work",
    label: "Work — Films",
    categories: ["paradise", "tantra"],
    type: "video",
    single: false,
    note: "Upload trailer videos. The first item per project replaces the default trailer.",
  },
  {
    key: "work-fashion",
    label: "Work — Fashion",
    categories: ["copa", "afw", "untamed"],
    type: "image",
    single: false,
  },
  {
    key: "work-personal",
    label: "Work — Personal",
    categories: [""],
    type: "image",
    single: false,
  },
  {
    key: "creative",
    label: "Creative — Artwork",
    categories: ["art", "design", "direction"],
    type: "image",
    single: false,
  },
  {
    key: "gallery",
    label: "Gallery",
    categories: ["cinematic", "fashion", "personal", "bts"],
    type: "image",
    single: false,
  },
] as const;

const Admin = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].key);
  const [activeCat, setActiveCat] = useState<string>("");
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);

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
  const filtered = items.filter(
    (i) => i.section === activeSection && (sectionDef.categories.length <= 1 || (i.category ?? "") === activeCat)
  );

  const handleUpload = async (file: File) => {
    if (!userId) return;
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${activeSection}/${activeCat || "default"}/${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("media").upload(path, file, { cacheControl: "3600" });
      if (upErr) throw upErr;
      const { data: pub } = supabase.storage.from("media").getPublicUrl(path);
      const isVideo = file.type.startsWith("video/");
      const { error: insErr } = await supabase.from("media_items").insert({
        section: activeSection,
        category: activeCat || null,
        type: isVideo ? "video" : "image",
        title: title || null,
        url: pub.publicUrl,
        storage_path: path,
        sort_order: filtered.length,
      });
      if (insErr) throw insErr;
      setTitle("");
      toast({ title: "Uploaded" });
      loadItems();
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item: MediaItem) => {
    if (!confirm("Delete this item?")) return;
    if (item.storage_path) {
      await supabase.storage.from("media").remove([item.storage_path]);
    }
    const { error } = await supabase.from("media_items").delete().eq("id", item.id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    loadItems();
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
          Your account ({userId}) does not have admin access. Ask the site owner to grant your account the admin role.
        </p>
        <Button variant="outline" onClick={signOut}>Sign out</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/30 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-gold text-[10px] tracking-[0.4em] uppercase">Admin</p>
          <h1 className="font-serif text-xl">Content Manager</h1>
        </div>
        <Button variant="ghost" size="sm" onClick={signOut}><LogOut className="w-4 h-4" /> Sign out</Button>
      </header>

      <div className="grid md:grid-cols-[220px_1fr] gap-0">
        <aside className="border-r border-border/30 p-4 space-y-1">
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => {
                setActiveSection(s.key);
                setActiveCat(s.categories[0]);
              }}
              className={`w-full text-left px-3 py-2 text-xs tracking-wider uppercase font-sans rounded-sm transition ${
                activeSection === s.key ? "bg-gold/10 text-gold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </aside>

        <main className="p-6 space-y-6">
          {sectionDef.categories.length > 1 && (
            <div className="flex gap-2 flex-wrap">
              {sectionDef.categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCat(c)}
                  className={`px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase border ${
                    activeCat === c ? "border-gold text-gold" : "border-border/40 text-muted-foreground"
                  }`}
                >
                  {c || "general"}
                </button>
              ))}
            </div>
          )}

          {sectionDef.note && <p className="text-xs text-muted-foreground italic">{sectionDef.note}</p>}

          <div className="border border-dashed border-gold/30 p-4 rounded-sm space-y-3">
            <Input placeholder="Optional title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <label className="flex items-center justify-center gap-2 cursor-pointer border border-gold/40 hover:bg-gold/5 transition px-4 py-3 text-xs uppercase tracking-[0.2em] text-gold">
              <Upload className="w-4 h-4" />
              {uploading ? "Uploading…" : `Upload ${sectionDef.type}`}
              <input
                type="file"
                accept={sectionDef.type === "video" ? "video/*" : "image/*"}
                hidden
                disabled={uploading}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleUpload(f);
                  e.currentTarget.value = "";
                }}
              />
            </label>
            <p className="text-[10px] text-muted-foreground">
              When you upload to a category here, it overrides the defaults for that category on the public site.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {filtered.map((it) => (
              <div key={it.id} className="relative group border border-border/30 rounded-sm overflow-hidden">
                {it.type === "video" ? (
                  <video src={it.url} className="w-full aspect-square object-cover" muted />
                ) : (
                  <img src={it.url} alt={it.title ?? ""} className="w-full aspect-square object-cover" />
                )}
                <div className="p-2 text-[10px] truncate">{it.title || "Untitled"}</div>
                <button
                  onClick={() => handleDelete(it)}
                  className="absolute top-2 right-2 p-1.5 bg-background/80 hover:bg-destructive hover:text-destructive-foreground rounded-sm opacity-0 group-hover:opacity-100 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full text-xs text-muted-foreground py-8 text-center">No items uploaded yet — defaults are showing on the site.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
