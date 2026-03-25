import { useState, useRef } from "react";
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

type GalleryImage = {
  src: string;
  alt: string;
  category: "cinematic" | "bts";
  span?: string;
  aspect?: string;
};

const allImages: GalleryImage[] = [
  // Cinematic / Editorial
  { src: img6, alt: "Cinematic still", category: "cinematic", span: "col-span-2", aspect: "aspect-[21/9]" },
  { src: bts6, alt: "Close-up portrait – Paradise", category: "cinematic", aspect: "aspect-[4/3]" },
  { src: img1, alt: "Portrait at Beach Bar", category: "cinematic", aspect: "aspect-[3/4]" },
  { src: bts1, alt: "Silhouette on fishing boat", category: "bts", aspect: "aspect-[4/3]" },
  { src: bts9, alt: "Monitor playback – Paradise", category: "bts", span: "col-span-2", aspect: "aspect-[16/9]" },
  { src: img4, alt: "Outdoor portrait", category: "cinematic", aspect: "aspect-[3/4]" },
  { src: bts5, alt: "With clapperboard on set", category: "bts", aspect: "aspect-[4/3]" },
  { src: bts8, alt: "In the makeup trailer", category: "bts", aspect: "aspect-[4/3]" },
  { src: img7, alt: "Nature portrait", category: "cinematic", aspect: "aspect-[3/4]" },
  { src: bts4, alt: "On the water", category: "bts", span: "col-span-2", aspect: "aspect-[16/9]" },
  { src: img3, alt: "Bar scene", category: "cinematic", aspect: "aspect-[3/4]" },
  { src: bts10, alt: "Between takes", category: "bts", aspect: "aspect-[4/3]" },
  { src: bts2, alt: "Cast group photo", category: "bts", span: "col-span-2", aspect: "aspect-[16/9]" },
  { src: img5, alt: "Rustic setting", category: "cinematic", aspect: "aspect-[3/4]" },
  { src: bts3, alt: "Night shoot crew", category: "bts", aspect: "aspect-[4/3]" },
  { src: bts7, alt: "Harbor filming", category: "bts", aspect: "aspect-[4/3]" },
  { src: img2, alt: "Full body portrait", category: "cinematic", aspect: "aspect-[3/4]" },
];

const categories = [
  { key: "all", label: "All" },
  { key: "cinematic", label: "Cinematic" },
  { key: "bts", label: "Behind the Scenes" },
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

  const navigateLightbox = (dir: number) => {
    if (lightboxIndex === null) return;
    const next = (lightboxIndex + dir + filtered.length) % filtered.length;
    setLightboxIndex(next);
  };

  return (
    <>
      <section id="gallery" ref={sectionRef} className="py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            style={{ y: headerY, opacity: headerOpacity }}
            className="text-center mb-12"
          >
            <p className="text-gold text-xs tracking-[0.35em] uppercase font-sans mb-4">Visual</p>
            <h2 className="font-serif text-4xl md:text-6xl font-light">Gallery</h2>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center gap-1 mb-16"
          >
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className={`px-5 py-2 text-xs tracking-[0.2em] uppercase font-sans transition-all duration-500 border ${
                  activeFilter === cat.key
                    ? "border-gold text-gold bg-gold/5"
                    : "border-border/30 text-muted-foreground hover:text-foreground hover:border-border/60"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Masonry grid */}
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
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
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out">
                    <p className="text-xs tracking-[0.15em] uppercase font-sans text-foreground/80">
                      {img.alt}
                    </p>
                    {img.category === "bts" && (
                      <p className="text-[10px] tracking-[0.2em] uppercase text-gold mt-1">Paradise — BTS</p>
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 text-foreground/60 hover:text-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Nav */}
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
              className="absolute left-4 md:left-8 z-50 p-2 text-foreground/40 hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
              className="absolute right-4 md:right-8 z-50 p-2 text-foreground/40 hover:text-foreground transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={filtered[lightboxIndex].src}
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].alt}
                initial={{ opacity: 0, scale: 0.92, x: 40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.92, x: -40 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="max-h-[85vh] max-w-[90vw] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            {/* Caption */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-8 text-center"
            >
              <p className="text-xs tracking-[0.2em] uppercase font-sans text-foreground/50">
                {filtered[lightboxIndex].alt}
              </p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/30 mt-1">
                {lightboxIndex + 1} / {filtered.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GallerySection;
