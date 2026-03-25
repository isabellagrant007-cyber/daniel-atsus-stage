import { motion } from "framer-motion";
import cinematicImage from "@/assets/daniel-cinematic.jpg";
import galleryImage1 from "@/assets/daniel-gallery-1.jpg";

const WorkSection = () => {
  return (
    <section id="work" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <p className="text-gold text-xs tracking-[0.35em] uppercase font-sans mb-4">Portfolio</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light">Work</h2>
        </motion.div>

        {/* FILM */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <p className="text-gold text-xs tracking-[0.35em] uppercase font-sans mb-10">Film</p>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="aspect-video overflow-hidden bg-surface-elevated">
              <img
                src={cinematicImage}
                alt="Paradise — Film Still"
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="space-y-4">
              <h3 className="font-serif text-3xl md:text-4xl italic font-light">Paradise</h3>
              <p className="text-gold text-xs tracking-[0.2em] uppercase font-sans">2026</p>
              <div className="w-8 h-px bg-gold/40" />
              <p className="text-muted-foreground text-sm font-sans font-light">Lead Role</p>
              <p className="text-muted-foreground text-sm font-sans font-light">
                World Premiere — Berlin International Film Festival
              </p>
              <p className="text-gold/60 text-xs tracking-[0.15em] uppercase font-sans mt-4">
                Official Selection — Berlinale 2026
              </p>
            </div>
          </div>
        </motion.div>

        {/* MUSIC VIDEOS */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gold text-xs tracking-[0.35em] uppercase font-sans mb-10">Music Videos</p>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="group relative aspect-[4/5] overflow-hidden bg-surface-elevated cursor-pointer">
              <img
                src={galleryImage1}
                alt="Music video appearance"
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="font-serif text-lg italic">Fameye</p>
                <p className="text-muted-foreground text-xs font-sans tracking-wider uppercase mt-1">Featured Appearance</p>
              </div>
            </div>

            <div className="group relative aspect-[4/5] overflow-hidden bg-surface-elevated flex items-center justify-center border border-border/30">
              <div className="text-center space-y-3 px-6">
                <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase font-sans">More Projects</p>
                <p className="text-muted-foreground/60 text-xs font-sans font-light">Coming Soon</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkSection;
