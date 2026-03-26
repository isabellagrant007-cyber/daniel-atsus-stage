import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import img1 from "@/assets/daniel-hero.jpg";
import img2 from "@/assets/daniel-gallery-1.jpg";
import img3 from "@/assets/daniel-gallery-2.jpg";
import img4 from "@/assets/daniel-gallery-3.jpg";
import img5 from "@/assets/daniel-gallery-4.jpg";
import img6 from "@/assets/daniel-cinematic.jpg";
import img7 from "@/assets/daniel-about.jpg";

import bts1 from "@/assets/bts-1.jpg";
import bts2 from "@/assets/bts-2.jpg";
import bts3 from "@/assets/bts-3.jpg";
import bts4 from "@/assets/bts-4.jpg";
import bts5 from "@/assets/bts-5.jpg";
import bts6 from "@/assets/bts-6.jpg";
import bts7 from "@/assets/bts-7.jpg";
import bts8 from "@/assets/bts-8.jpg";
import bts9 from "@/assets/bts-9.jpg";
import bts10 from "@/assets/bts-10.jpg";
import bts11 from "@/assets/bts-11.jpg";

import fw1 from "@/assets/fashion-untamed-1.jpg";
import fw2 from "@/assets/fashion-untamed-2.jpg";
import fw3 from "@/assets/fashion-untamed-3.jpg";
import fw4 from "@/assets/fashion-untamed-4.jpg";
import fa1 from "@/assets/fashion-afw-1.jpg";
import fa2 from "@/assets/fashion-afw-2.jpg";
import fa3 from "@/assets/fashion-afw-3.jpg";
import fa4 from "@/assets/fashion-afw-4.jpg";

import p1 from "@/assets/personal-1.jpg";
import p2 from "@/assets/personal-2.jpg";
import p3 from "@/assets/personal-3.jpg";
import p4 from "@/assets/personal-4.jpg";
import p5 from "@/assets/personal-5.jpg";
import p6 from "@/assets/personal-6.jpg";
import copa1 from "@/assets/copa-1.jpg";
import copa2 from "@/assets/copa-2.jpg";

type Category = "cinematic" | "bts" | "fashion" | "personal";

type GalleryImage = {
  src: string;
  alt: string;
  category: Category;
  span?: string;
  aspect?: string;
};

const allImages: GalleryImage[] = [
  { src: img6, alt: "Cinematic still", category: "cinematic", span: "col-span-2", aspect: "aspect-[21/9]" },
  { src: fa1, alt: "AFWK 2023 — Denim couture", category: "fashion", aspect: "aspect-[3/4]" },
  { src: bts6, alt: "Close-up portrait – Paradise", category: "cinematic", aspect: "aspect-[4/3]" },
  { src: fw1, alt: "Untamed Empire — Editorial", category: "fashion", aspect: "aspect-[3/4]" },
  { src: bts1, alt: "Silhouette on fishing boat", category: "bts", aspect: "aspect-[4/3]" },
  { src: fa2, alt: "AFWK 2023 — White ensemble", category: "fashion", aspect: "aspect-[3/4]" },
  { src: bts9, alt: "Monitor playback – Paradise", category: "bts", span: "col-span-2", aspect: "aspect-[16/9]" },
  { src: img1, alt: "Portrait at Beach Bar", category: "cinematic", aspect: "aspect-[3/4]" },
  { src: fa3, alt: "AFWK 2023 — Avant-garde sheer", category: "fashion", aspect: "aspect-[3/4]" },
  { src: bts5, alt: "With clapperboard on set", category: "bts", aspect: "aspect-[4/3]" },
  { src: fw2, alt: "Untamed Empire — Full look", category: "fashion", aspect: "aspect-[3/4]" },
  { src: img4, alt: "Outdoor portrait", category: "cinematic", aspect: "aspect-[3/4]" },
  { src: bts8, alt: "In the makeup trailer", category: "bts", aspect: "aspect-[4/3]" },
  { src: fa4, alt: "AFWK 2023 — Navy brocade", category: "fashion", aspect: "aspect-[3/4]" },
  
  { src: bts4, alt: "On the water", category: "bts", span: "col-span-2", aspect: "aspect-[16/9]" },
  { src: fw3, alt: "Untamed Empire — Behind the scenes", category: "fashion", span: "col-span-2", aspect: "aspect-[16/9]" },
  { src: fw4, alt: "Untamed Empire — Twilight editorial", category: "fashion", aspect: "aspect-[3/4]" },
  { src: img7, alt: "Nature portrait", category: "cinematic", aspect: "aspect-[3/4]" },
  { src: bts10, alt: "Between takes", category: "bts", aspect: "aspect-[4/3]" },
  { src: bts11, alt: "Silhouette at sea — Paradise", category: "bts", aspect: "aspect-square" },
  { src: img3, alt: "Bar scene", category: "cinematic", aspect: "aspect-[3/4]" },
  { src: bts2, alt: "Cast group photo", category: "bts", span: "col-span-2", aspect: "aspect-[16/9]" },
  { src: img5, alt: "Rustic setting", category: "cinematic", aspect: "aspect-[3/4]" },
  { src: p1, alt: "Personal — Street editorial", category: "personal", aspect: "aspect-[3/4]" },
  { src: bts3, alt: "Night shoot crew", category: "bts", aspect: "aspect-[4/3]" },
  { src: copa1, alt: "FL × COPA — Solo portrait", category: "fashion", aspect: "aspect-[3/4]" },
  { src: p4, alt: "Personal — Garage editorial", category: "personal", aspect: "aspect-[3/4]" },
  { src: bts7, alt: "Harbor filming", category: "bts", aspect: "aspect-[4/3]" },
  { src: p2, alt: "Personal — Crosswalk front", category: "personal", aspect: "aspect-[3/4]" },
  { src: copa2, alt: "FL × COPA — Duo campaign", category: "fashion", aspect: "aspect-[3/4]" },
  { src: p5, alt: "Personal — Interior portrait", category: "personal", aspect: "aspect-[3/4]" },
  { src: img2, alt: "Full body portrait", category: "cinematic", aspect: "aspect-[3/4]" },
  { src: p3, alt: "Personal — Crosswalk back", category: "personal", aspect: "aspect-[3/4]" },
  { src: p6, alt: "Personal — Studio triptych", category: "personal", span: "col-span-2", aspect: "aspect-[16/9]" },
];

const categories = [
  { key: "all", label: "All" },
  { key: "cinematic", label: "Cinematic" },
  { key: "fashion", label: "Fashion" },
  { key: "personal", label: "Personal" },
  { key: "bts", label: "BTS" },
] as const;

const GallerySection = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [60, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const filtered = activeFilter === "all"
    ? allImages
    : allImages.filter((img) => img.category === activeFilter);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const navigateLightbox = useCallback((dir: number) => {
    if (lightboxIndex === null) return;
    const next = (lightboxIndex + dir + filtered.length) % filtered.length;
    setLightboxIndex(next);
  }, [lightboxIndex, filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigateLightbox(-1);
      if (e.key === "ArrowRight") navigateLightbox(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, navigateLightbox]);

  return (
    <>
      <section id="gallery" ref={sectionRef} className="py-16 md:py-32 px-4 md:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div style={{ y: headerY, opacity: headerOpacity }} className="text-center mb-12 md:mb-20">
            <p className="text-gold text-xs tracking-[0.35em] uppercase font-sans mb-3 md:mb-4">Visual</p>
            <h2 className="font-serif text-3xl md:text-6xl font-light">Gallery</h2>
          </motion.div>

          {/* Filter tabs — horizontally scrollable on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-start md:justify-center gap-1 mb-8 md:mb-16 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide"
          >
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className={`px-3 md:px-5 py-1.5 md:py-2 text-[10px] md:text-xs tracking-[0.15em] md:tracking-[0.2em] uppercase font-sans transition-all duration-500 border whitespace-nowrap flex-shrink-0 ${
                  activeFilter === cat.key
                    ? "border-gold text-gold bg-gold/5"
                    : "border-border/30 text-muted-foreground hover:text-foreground hover:border-border/60"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-1.5 md:gap-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <motion.div
                  key={img.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.04,
                    layout: { duration: 0.5, type: "spring", bounce: 0.15 },
                  }}
                  className={`group relative overflow-hidden cursor-pointer ${img.span || ""} ${img.aspect || "aspect-[3/4]"}`}
                  onClick={() => openLightbox(i)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-[1.2s] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out">
                    <p className="text-[9px] md:text-xs tracking-[0.15em] uppercase font-sans text-foreground/80">{img.alt}</p>
                    {img.category === "bts" && (
                      <p className="text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-gold mt-1">Paradise — BTS</p>
                    )}
                    {img.category === "fashion" && (
                      <p className="text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-gold mt-1">Fashion</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md p-4"
            onClick={closeLightbox}
          >
            <button onClick={closeLightbox} className="absolute top-4 right-4 md:top-6 md:right-6 z-50 text-foreground/60 hover:text-foreground transition-colors">
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }} className="absolute left-2 md:left-8 z-50 p-1 md:p-2 text-foreground/40 hover:text-foreground transition-colors">
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }} className="absolute right-2 md:right-8 z-50 p-1 md:p-2 text-foreground/40 hover:text-foreground transition-colors">
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <AnimatePresence mode="wait">
              <motion.img
                key={filtered[lightboxIndex].src}
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].alt}
                initial={{ opacity: 0, scale: 0.92, x: 40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.92, x: -40 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="max-h-[75vh] md:max-h-[85vh] max-w-[85vw] md:max-w-[90vw] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="absolute bottom-6 md:bottom-8 text-center">
              <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase font-sans text-foreground/50">{filtered[lightboxIndex].alt}</p>
              <p className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-foreground/30 mt-1">{lightboxIndex + 1} / {filtered.length}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GallerySection;
