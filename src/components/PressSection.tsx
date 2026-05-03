import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type PressFeature = {
  id: string;
  url: string;
  title: string | null;
  description: string | null;
  image_url: string | null;
  site_name: string | null;
  favicon_url: string | null;
  sort_order: number;
};

const PressSection = () => {
  const [items, setItems] = useState<PressFeature[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("press_features")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      setItems((data ?? []) as PressFeature[]);
    };
    load();
    const channel = supabase
      .channel(`press-${Math.random().toString(36).slice(2)}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "press_features" }, load)
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <section id="press" className="relative py-32 md:py-40 px-5 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mb-16 md:mb-24"
        >
          <p className="text-gold text-[10px] tracking-[0.5em] uppercase mb-4">— Press</p>
          <h2 className="font-serif text-4xl md:text-6xl tracking-tight text-foreground">
            Featured In
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {items.map((item, i) => (
            <motion.a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              className="group relative block overflow-hidden border border-border/30 hover:border-gold/50 transition-colors duration-700 bg-card/20"
            >
              {/* Preview image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-background">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title ?? item.site_name ?? "Press feature"}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground/40 text-xs tracking-[0.3em] uppercase">
                    {item.site_name}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />

                {/* Outlet badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-background/80 backdrop-blur-md border border-border/40 px-3 py-1.5">
                  {item.favicon_url && (
                    <img
                      src={item.favicon_url}
                      alt=""
                      className="w-4 h-4 object-contain"
                      loading="lazy"
                    />
                  )}
                  <span className="text-[10px] tracking-[0.25em] uppercase text-foreground font-sans">
                    {item.site_name}
                  </span>
                </div>

                {/* Hover arrow */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gold/0 group-hover:bg-gold/90 border border-gold/40 flex items-center justify-center transition-all duration-500 translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100">
                  <ArrowUpRight className="w-4 h-4 text-background" />
                </div>
              </div>

              {/* Text */}
              <div className="p-6 md:p-8 space-y-3">
                <h3 className="font-serif text-xl md:text-2xl leading-snug text-foreground group-hover:text-gold transition-colors duration-500 line-clamp-3">
                  {item.title ?? "Read article"}
                </h3>
                {item.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                )}
                <div className="pt-3 flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-gold/80">
                  <span>Read on {item.site_name}</span>
                  <span className="w-8 h-px bg-gold/40 group-hover:w-16 transition-all duration-500" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PressSection;
