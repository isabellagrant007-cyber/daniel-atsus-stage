import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import cinematicImage from "@/assets/daniel-cinematic.jpg";
import tantraPoster from "@/assets/tantra-poster.jpg";
import fashionUntamed1 from "@/assets/fashion-untamed-1.jpg";
import fashionUntamed2 from "@/assets/fashion-untamed-2.jpg";
import fashionUntamed3 from "@/assets/fashion-untamed-3.jpg";
import fashionUntamed4 from "@/assets/fashion-untamed-4.jpg";
import fashionAfw1 from "@/assets/fashion-afw-1.jpg";
import fashionAfw2 from "@/assets/fashion-afw-2.jpg";
import fashionAfw3 from "@/assets/fashion-afw-3.jpg";
import fashionAfw4 from "@/assets/fashion-afw-4.jpg";

import personal1 from "@/assets/personal-1.jpg";
import personal2 from "@/assets/personal-2.jpg";
import personal3 from "@/assets/personal-3.jpg";
import personal4 from "@/assets/personal-4.jpg";
import personal5 from "@/assets/personal-5.jpg";
import personal6 from "@/assets/personal-6.jpg";
import bts11 from "@/assets/bts-11.jpg";
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
    trailer: "/videos/paradise-trailer.mp4",
  },
  {
    title: "Tantra",
    year: "2025",
    role: "Supporting Role",
    type: "Short Horror Film",
    detail: "Directed by Helel Venture Smith",
    accolade: "Official Selection — Blackstar International Film Festival 2025",
    image: tantraPoster,
    trailer: "/videos/tantra-trailer.mp4",
  },
];

const fashionSections = [
  {
    title: "FL × COPA Jersey Launch",
    subtitle: "Campaign shoot for copafootball",
    year: "2026",
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
      { src: fashionAfw5, alt: "AFWK 2023 — Sheer neon runway" },
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
      { src: fashionUntamed4, alt: "Untamed Empire — Soft focus portrait" },
      { src: fashionUntamed5, alt: "Untamed Empire — Twilight editorial" },
    ],
  },
];

const personalImages = [
  { src: personal1, alt: "Personal shoot — Collar pop" },
  { src: personal2, alt: "Personal shoot — Crosswalk front" },
  { src: personal3, alt: "Personal shoot — Crosswalk back" },
  { src: personal4, alt: "Personal shoot — Garage editorial" },
  { src: personal5, alt: "Personal shoot — Interior portrait" },
  { src: personal6, alt: "Personal shoot — Studio triptych" },
];

const WorkSection = () => {
  const [hoveredFilm, setHoveredFilm] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const [playingTrailer, setPlayingTrailer] = useState<number | null>(null);
  const [muted, setMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const toggleTrailer = (idx: number) => {
    const video = videoRefs.current[idx];
    if (!video) return;
    if (playingTrailer === idx) {
      video.pause();
      setPlayingTrailer(null);
    } else {
      videoRefs.current.forEach((v, i) => { if (v && i !== idx) v.pause(); });
      video.play();
      setPlayingTrailer(idx);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMuted(!muted);
    videoRefs.current.forEach((v) => { if (v) v.muted = !muted; });
  };

  return (
    <section id="work" className="py-16 md:py-32 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-12 md:mb-24"
        >
          <p className="text-gold text-xs tracking-[0.35em] uppercase font-sans mb-3 md:mb-4">Portfolio</p>
          <h2 className="font-serif text-3xl md:text-6xl font-light">Work</h2>
        </motion.div>

        {/* ─── FILM ─── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-32"
        >
          <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-14">
            <p className="text-gold text-xs tracking-[0.35em] uppercase font-sans">Film</p>
            <div className="flex-1 h-px bg-gold/20" />
          </div>

          <div className="space-y-10 md:space-y-16">
            {filmCredits.map((film, i) => (
              <motion.div
                key={film.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="group relative"
                onMouseEnter={() => setHoveredFilm(i)}
                onMouseLeave={() => setHoveredFilm(null)}
              >
                {/* Cinematic media container — taller ratio on mobile */}
                <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-background rounded-sm mb-4 md:mb-8">
                  {/* Poster image */}
                  <motion.img
                    src={film.image}
                    alt={`${film.title} — Film Still`}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                      playingTrailer === i ? "opacity-0" : "opacity-100"
                    }`}
                    animate={{ scale: hoveredFilm === i ? 1.05 : 1 }}
                    transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                  />

                  {/* Video trailer */}
                  {film.trailer && (
                    <video
                      ref={(el) => { videoRefs.current[i] = el; }}
                      src={film.trailer}
                      muted={muted}
                      loop
                      playsInline
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                        playingTrailer === i ? "opacity-100" : "opacity-0"
                      }`}
                      onEnded={() => setPlayingTrailer(null)}
                    />
                  )}

                  {/* Cinematic letterbox bars */}
                  <div className="absolute top-0 left-0 right-0 h-[10%] bg-gradient-to-b from-background to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-[10%] bg-gradient-to-t from-background to-transparent" />

                  {/* Film grain overlay */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjY1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-40 pointer-events-none mix-blend-overlay" />

                  {/* Type badge */}
                  <div className="absolute top-3 left-3 md:top-6 md:left-6 z-10">
                    <span className="text-[8px] md:text-[9px] tracking-[0.3em] uppercase font-sans text-gold bg-background/60 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 border border-gold/20">
                      {film.type}
                    </span>
                  </div>

                  {/* Play/Pause button */}
                  {film.trailer && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <motion.button
                        onClick={() => toggleTrailer(i)}
                        className="relative group/play"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {/* Pulsing ring */}
                        <motion.div
                          className="absolute inset-0 rounded-full border border-gold/30"
                          animate={playingTrailer !== i ? { scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                          style={{ width: 60, height: 60, margin: "auto", inset: 0, position: "absolute" }}
                        />
                        <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-background/40 backdrop-blur-lg border border-gold/30 flex items-center justify-center group-hover/play:bg-gold/20 transition-colors duration-500">
                          {playingTrailer === i ? (
                            <Pause className="w-4 h-4 md:w-6 md:h-6 text-gold fill-gold" />
                          ) : (
                            <Play className="w-4 h-4 md:w-6 md:h-6 text-gold fill-gold ml-0.5" />
                          )}
                        </div>
                      </motion.button>

                      {/* Mute toggle */}
                      <AnimatePresence>
                        {playingTrailer === i && (
                          <motion.button
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            onClick={toggleMute}
                            className="absolute bottom-3 right-3 md:bottom-6 md:right-6 w-8 h-8 md:w-10 md:h-10 rounded-full bg-background/40 backdrop-blur-lg border border-gold/20 flex items-center justify-center hover:bg-gold/20 transition-colors"
                          >
                            {muted ? (
                              <VolumeX className="w-3 h-3 md:w-4 md:h-4 text-gold" />
                            ) : (
                              <Volume2 className="w-3 h-3 md:w-4 md:h-4 text-gold" />
                            )}
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* "Watch Trailer" text — hidden on mobile */}
                  {film.trailer && playingTrailer !== i && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredFilm === i ? 1 : 0 }}
                      className="hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] uppercase font-sans text-gold/60 z-10"
                    >
                      Watch Trailer
                    </motion.p>
                  )}
                </div>

                {/* Info row */}
                <div className="flex flex-col gap-3 md:gap-4 md:flex-row md:items-end md:justify-between">
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex items-baseline gap-3 md:gap-4">
                      <h3 className="font-serif text-2xl md:text-5xl italic font-light group-hover:text-gold transition-colors duration-700">
                        {film.title}
                      </h3>
                      <span className="text-gold/40 text-[10px] md:text-xs tracking-[0.2em] uppercase font-sans">
                        {film.year}
                      </span>
                    </div>
                    <div className="w-10 md:w-12 h-px bg-gold/30 group-hover:w-20 md:group-hover:w-24 transition-all duration-700" />
                    <p className="text-foreground text-xs md:text-sm font-sans tracking-wide">{film.role}</p>
                    <p className="text-muted-foreground text-xs md:text-sm font-sans font-light">{film.detail}</p>
                  </div>
                  {film.accolade && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center gap-2 md:gap-3"
                    >
                      <div className="w-6 md:w-8 h-px bg-gold/40" />
                      <p className="text-gold/60 text-[10px] md:text-xs tracking-[0.1em] md:tracking-[0.15em] uppercase font-sans">
                        {film.accolade}
                      </p>
                    </motion.div>
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
          className="mb-16 md:mb-32"
        >
          <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-6">
            <p className="text-gold text-xs tracking-[0.35em] uppercase font-sans">Fashion</p>
            <div className="flex-1 h-px bg-gold/20" />
          </div>
          <p className="text-muted-foreground text-xs md:text-sm font-sans font-light mb-8 md:mb-14 max-w-lg">
            Runway, editorial, and campaign work spanning Accra Fashion Week, FL × COPA, and Untamed Empire Creative Community.
          </p>

          {fashionSections.map((section, sIdx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: sIdx * 0.1 }}
              className="mb-10 md:mb-16 last:mb-0"
            >
              <div className="flex items-baseline justify-between mb-4 md:mb-6">
                <div>
                  <h3 className="font-serif text-lg md:text-2xl italic font-light">{section.title}</h3>
                  <p className="text-muted-foreground text-[10px] md:text-xs font-sans tracking-wide mt-1">{section.subtitle}</p>
                </div>
                <span className="text-gold/40 text-[10px] md:text-xs tracking-[0.2em] uppercase font-sans">{section.year}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 md:gap-2">
                {section.images.map((img, imgIdx) => (
                  <motion.div
                    key={imgIdx}
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
                    <div className="absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8 border-l border-t border-gold/0 group-hover:border-gold/50 transition-all duration-700" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 border-r border-b border-gold/0 group-hover:border-gold/50 transition-all duration-700" />
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
          <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-6">
            <p className="text-gold text-xs tracking-[0.35em] uppercase font-sans">Personal</p>
            <div className="flex-1 h-px bg-gold/20" />
          </div>
          <p className="text-muted-foreground text-xs md:text-sm font-sans font-light mb-8 md:mb-14 max-w-lg">
            Street-style and personal editorial shoots.
          </p>

          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-2 md:gap-3"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              {[...personalImages, ...personalImages].map((img, i) => (
                <div
                  key={i}
                  className="group relative flex-shrink-0 w-[180px] md:w-[300px] aspect-[3/4] overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8 border-l border-t border-gold/0 group-hover:border-gold/50 transition-all duration-700" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 border-r border-b border-gold/0 group-hover:border-gold/50 transition-all duration-700" />
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md cursor-pointer p-4"
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
              className="max-h-[80vh] md:max-h-[85vh] max-w-[92vw] md:max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-6 md:bottom-8 text-[10px] md:text-xs tracking-[0.2em] uppercase font-sans text-foreground/40"
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
