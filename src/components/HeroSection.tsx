import { motion } from "framer-motion";
import heroImage from "@/assets/daniel-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Daniel Atsu Hukporti-Adjorble"
          className="h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-end pb-24 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-gold mb-4 text-sm tracking-[0.35em] uppercase font-sans font-light"
        >
          Official Selection — Berlinale 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-light tracking-wide mb-4"
        >
          Daniel Atsu
          <br />
          <span className="italic font-light">Hukporti-Adjorble</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-10 font-sans font-light"
        >
          Actor &nbsp;|&nbsp; Creative &nbsp;|&nbsp; Performer
        </motion.p>

        <motion.a
          href="#work"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="border border-gold/40 text-gold px-8 py-3 text-xs tracking-[0.25em] uppercase font-sans hover:bg-gold/10 transition-colors duration-500"
        >
          View Work
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-gold/60 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
