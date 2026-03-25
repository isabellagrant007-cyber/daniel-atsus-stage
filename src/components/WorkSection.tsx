import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cinematicImage from "@/assets/daniel-cinematic.jpg";
import galleryImage1 from "@/assets/daniel-gallery-1.jpg";
import fashionUntamed1 from "@/assets/fashion-untamed-1.jpg";
import fashionUntamed2 from "@/assets/fashion-untamed-2.jpg";
import fashionUntamed3 from "@/assets/fashion-untamed-3.jpg";
import fashionAfw1 from "@/assets/fashion-afw-1.jpg";
import fashionAfw2 from "@/assets/fashion-afw-2.jpg";
import fashionAfw3 from "@/assets/fashion-afw-3.jpg";
import fashionAfw4 from "@/assets/fashion-afw-4.jpg";

const filmCredits = [
  {
    title: "Paradise",
    year: "2026",
    role: "Lead Role",
    type: "Feature Film",
    detail: "World Premiere — Berlin International Film Festival",
    accolade: "Official Selection — Berlinale 2026",
    image: cinematicImage,
  },
  {
    title: "Tantra",
    year: "2025",
    role: "Supporting Role",
    type: "Short Horror Film",
    detail: "Directed by Helel Venture Smith",
    accolade: null,
    image: galleryImage1,
  },
];

const fashionImages = [
  { src: fashionAfw1, alt: "Accra Fashion Week 2023 — Denim couture look", label: "AFWK 2023" },
  { src: fashionAfw2, alt: "Accra Fashion Week 2023 — All-white structured ensemble", label: "AFWK 2023" },
  { src: fashionAfw3, alt: "Accra Fashion Week 2023 — Sheer avant-garde", label: "AFWK 2023" },
  { src: fashionAfw4, alt: "Accra Fashion Week 2023 — Navy brocade set", label: "AFWK 2023" },
  { src: fashionUntamed1, alt: "Untamed Empire Creative Community shoot", label: "Untamed Empire" },
  { src: fashionUntamed2, alt: "Untamed Empire Creative Community editorial", label: "Untamed Empire" },
  { src: fashionUntamed3, alt: "Untamed Empire Creative Community BTS", label: "Untamed Empire" },
];

const WorkSection = () => {
  const [hoveredFilm, setHoveredFilm] = useState<number | null>(null);
  const [selectedFashion, setSelectedFashion] = useState<number | null>(null);

  return (
    <section id="work" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <p className="text-gold text-xs tracking-[0.35em] uppercase font-sans mb-4">Portfolio</p>
          <h2 className="font-serif text-4xl md:text-6xl font-light">Work</h2>
        </motion.div>

        {/* ─── FILM ─── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <div className="flex items-center gap-6 mb-14">
            <p className="text-gold text-xs tracking-[0.35em] uppercase font-sans">Film</p>
            <div className="flex-1 h-px bg-gold/20" />
          </div>

          <div className="space-y-8">
            {filmCredits.map((film, i) => (
              <motion.div
                key={film.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="group relative grid md:grid-cols-[1fr_1.2fr] gap-8 items-center"
                onMouseEnter={() => setHoveredFilm(i)}
                onMouseLeave={() => setHoveredFilm(null)}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-elevated">
                  <motion.img
                    src={film.image}
                    alt={`${film.title} — Film Still`}
                    className="h-full w-full object-cover"
                    animate={{
                      scale: hoveredFilm === i ? 1.08 : 1,
                    }}
                    transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                  {/* Cinematic bars */}
                  <div className="absolute top-0 left-0 right-0 h-[8%] bg-background/80" />
                  <div className="absolute bottom-0 left-0 right-0 h-[8%] bg-background/80" />
                  {/* Type badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[9px] tracking-[0.3em] uppercase font-sans text-gold bg-background/60 backdrop-blur-sm px-3 py-1.5 border border-gold/20">
                      {film.type}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-4 md:pl-4">
                  <div className="flex items-baseline gap-4">
                    <h3 className="font-serif text-3xl md:text-5xl italic font-light group-hover:text-gold transition-colors duration-700">
                      {film.title}
                    </h3>
                    <span className="text-gold/40 text-xs tracking-[0.2em] uppercase font-sans">
                      {film.year}
                    </span>
                  </div>
                  <div className="w-12 h-px bg-gold/30 group-hover:w-20 transition-all duration-700" />
                  <p className="text-foreground text-sm font-sans tracking-wide">{film.role}</p>
                  <p className="text-muted-foreground text-sm font-sans font-light">{film.detail}</p>
                  {film.accolade && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                      className="text-gold/60 text-xs tracking-[0.15em] uppercase font-sans mt-4 flex items-center gap-2"
                    >
                      <span className="w-4 h-px bg-gold/40" />
                      {film.accolade}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── FASHION ─── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-6 mb-6">
            <p className="text-gold text-xs tracking-[0.35em] uppercase font-sans">Fashion</p>
            <div className="flex-1 h-px bg-gold/20" />
          </div>
          <p className="text-muted-foreground text-sm font-sans font-light mb-14 max-w-lg">
            Runway and editorial work including Accra Fashion Week 2023 and collaborative shoots with Untamed Empire Creative Community.
          </p>

          {/* Runway marquee strip */}
          <div className="relative mb-12 overflow-hidden">
            <motion.div
              className="flex gap-3"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {[...fashionImages, ...fashionImages].map((img, i) => (
                <div
                  key={i}
                  className="group relative flex-shrink-0 w-[260px] md:w-[320px] aspect-[3/4] overflow-hidden cursor-pointer"
                  onClick={() => setSelectedFashion(i % fashionImages.length)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-[10px] tracking-[0.25em] uppercase font-sans text-gold">{img.label}</p>
                  </div>
                  {/* Gold corner accent on hover */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-gold/0 group-hover:border-gold/50 transition-all duration-700" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-gold/0 group-hover:border-gold/50 transition-all duration-700" />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Credits grid */}
          <div className="grid grid-cols-2 gap-px bg-border/10">
            {[
              { title: "Accra Fashion Week", year: "2023", detail: "Runway Model — 4 Looks" },
              { title: "Untamed Empire", year: "2024", detail: "Editorial & Creative Campaign" },
            ].map((credit, i) => (
              <motion.div
                key={credit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group bg-surface-elevated/30 p-8 hover:bg-surface-elevated/60 transition-colors duration-500"
              >
                <p className="font-serif text-xl md:text-2xl italic font-light group-hover:text-gold transition-colors duration-500">
                  {credit.title}
                </p>
                <p className="text-gold/40 text-xs tracking-[0.2em] uppercase font-sans mt-2">{credit.year}</p>
                <div className="w-6 h-px bg-gold/20 my-3 group-hover:w-12 group-hover:bg-gold/40 transition-all duration-700" />
                <p className="text-muted-foreground text-xs font-sans tracking-wide">{credit.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Fashion Lightbox */}
      <AnimatePresence>
        {selectedFashion !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md cursor-pointer"
            onClick={() => setSelectedFashion(null)}
          >
            <motion.img
              key={selectedFashion}
              src={fashionImages[selectedFashion].src}
              alt={fashionImages[selectedFashion].alt}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="max-h-[85vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-8 text-xs tracking-[0.2em] uppercase font-sans text-foreground/40"
            >
              {fashionImages[selectedFashion].alt}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WorkSection;
