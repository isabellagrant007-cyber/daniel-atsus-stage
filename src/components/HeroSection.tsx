import { motion } from "framer-motion";
import heroImage from "@/assets/daniel-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Ken Burns */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
      >
        <img
          src={heroImage}
          alt="Daniel Atsu Hukporti-Adjorble"
          className="h-full w-full object-cover object-top"
        />
      </motion.div>

      {/* Cinematic vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />

      {/* Film grain */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjY1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30 pointer-events-none mix-blend-overlay" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-end pb-16 md:pb-24 px-4 md:px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-gold mb-3 md:mb-4 text-[10px] md:text-sm tracking-[0.25em] md:tracking-[0.4em] uppercase font-sans font-light"
        >
          Official Selection — Berlinale 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="font-serif text-4xl md:text-7xl lg:text-8xl font-light tracking-wide mb-3 md:mb-4"
        >
          Daniel Atsu
          <br />
          <span className="italic font-light">Hukporti-Adjorble</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="text-muted-foreground text-[10px] md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase mb-8 md:mb-10 font-sans font-light"
        >
          Actor &nbsp;·&nbsp; Artist &nbsp;·&nbsp; Creative
        </motion.p>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[8px] tracking-[0.3em] uppercase text-muted-foreground/40 font-sans">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-6 md:h-8 bg-gradient-to-b from-gold/50 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
