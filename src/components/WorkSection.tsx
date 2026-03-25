import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cinematicImage from "@/assets/daniel-cinematic.jpg";
import tantraPoster from "@/assets/tantra-poster.jpg";
import fashionUntamed1 from "@/assets/fashion-untamed-1.jpg";
import fashionUntamed2 from "@/assets/fashion-untamed-2.jpg";
import fashionUntamed3 from "@/assets/fashion-untamed-3.jpg";
import fashionAfw1 from "@/assets/fashion-afw-1.jpg";
import fashionAfw2 from "@/assets/fashion-afw-2.jpg";
import fashionAfw3 from "@/assets/fashion-afw-3.jpg";
import fashionAfw4 from "@/assets/fashion-afw-4.jpg";
import personal1 from "@/assets/personal-1.jpg";
import personal2 from "@/assets/personal-2.jpg";
import personal3 from "@/assets/personal-3.jpg";
import personal4 from "@/assets/personal-4.jpg";
import personal5 from "@/assets/personal-5.jpg";
import copa1 from "@/assets/copa-1.jpg";
import copa2 from "@/assets/copa-2.jpg";
import copa3 from "@/assets/copa-3.jpg";
import copa4 from "@/assets/copa-4.jpg";

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
    accolade: "Official Selection — Blackstar International Film Festival 2025",
    image: tantraPoster,
  },
];

const fashionSections = [
  {
    title: "FL × COPA Jersey Launch",
    subtitle: "Campaign shoot for copafootball",
    year: "2024",
    images: [
      { src: copa1, alt: "FL × COPA — Solo portrait in stadium" },
      { src: copa2, alt: "FL × COPA — Duo campaign shot" },
      { src: copa3, alt: "FL × COPA — Stadium seated editorial" },
      { src: copa4, alt: "FL × COPA — Duo standing campaign" },
    ],
  },
  {
    title: "Accra Fashion Week",
    subtitle: "Runway Model — 4 Looks",
    year: "2023",
    images: [
      { src: fashionAfw1, alt: "AFWK 2023 — Denim couture look" },
      { src: fashionAfw2, alt: "AFWK 2023 — All-white structured ensemble" },
      { src: fashionAfw3, alt: "AFWK 2023 — Sheer avant-garde" },
      { src: fashionAfw4, alt: "AFWK 2023 — Navy brocade set" },
    ],
  },
  {
    title: "Untamed Empire",
    subtitle: "Editorial & Creative Campaign",
    year: "2026",
    images: [
      { src: fashionUntamed1, alt: "Untamed Empire — Editorial 1" },
      { src: fashionUntamed2, alt: "Untamed Empire — Editorial 2" },
      { src: fashionUntamed3, alt: "Untamed Empire — BTS" },
    ],
  },
];

const personalImages = [
  { src: personal1, alt: "Personal shoot — Collar pop" },
  { src: personal2, alt: "Personal shoot — Crosswalk front" },
  { src: personal3, alt: "Personal shoot — Crosswalk back" },
  { src: personal4, alt: "Personal shoot — Crosswalk standing" },
  { src: personal5, alt: "Personal shoot — Crosswalk walking" },
];

const WorkSection = () => {
  const [hoveredFilm, setHoveredFilm] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

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
          className="mb-32"
        >
          <div className="flex items-center gap-6 mb-6">
            <p className="text-gold text-xs tracking-[0.35em] uppercase font-sans">Fashion</p>
            <div className="flex-1 h-px bg-gold/20" />
          </div>
          <p className="text-muted-foreground text-sm font-sans font-light mb-14 max-w-lg">
            Runway, editorial, and campaign work spanning Accra Fashion Week, FL × COPA, and Untamed Empire Creative Community.
          </p>

          {fashionSections.map((section, sIdx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: sIdx * 0.1 }}
              className="mb-16 last:mb-0"
            >
              {/* Section header */}
              <div className="flex items-baseline justify-between mb-6">
                <div>
                  <h3 className="font-serif text-xl md:text-2xl italic font-light">{section.title}</h3>
                  <p className="text-muted-foreground text-xs font-sans tracking-wide mt-1">{section.subtitle}</p>
                </div>
                <span className="text-gold/40 text-xs tracking-[0.2em] uppercase font-sans">{section.year}</span>
              </div>

              {/* Image strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {section.images.map((img, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.4 }}
                    className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
                    onClick={() => setSelectedImage(img)}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-gold/0 group-hover:border-gold/50 transition-all duration-700" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-gold/0 group-hover:border-gold/50 transition-all duration-700" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ─── PERSONAL ─── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-6 mb-6">
            <p className="text-gold text-xs tracking-[0.35em] uppercase font-sans">Personal</p>
            <div className="flex-1 h-px bg-gold/20" />
          </div>
          <p className="text-muted-foreground text-sm font-sans font-light mb-14 max-w-lg">
            Street-style and personal editorial shoots.
          </p>

          {/* Horizontal scroll strip */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-3"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              {[...personalImages, ...personalImages].map((img, i) => (
                <div
                  key={i}
                  className="group relative flex-shrink-0 w-[240px] md:w-[300px] aspect-[3/4] overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-gold/0 group-hover:border-gold/50 transition-all duration-700" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-gold/0 group-hover:border-gold/50 transition-all duration-700" />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              key={selectedImage.src}
              src={selectedImage.src}
              alt={selectedImage.alt}
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
              {selectedImage.alt}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WorkSection;
