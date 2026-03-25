import { motion } from "framer-motion";
import aboutImage from "@/assets/daniel-about.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-40 px-4 md:px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-20 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative group"
        >
          <div className="aspect-[3/4] overflow-hidden">
            <motion.img
              src={aboutImage}
              alt="Daniel portrait"
              className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s]"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 1.5 }}
            />
          </div>
          <div className="absolute -bottom-3 -right-3 md:-bottom-5 md:-right-5 w-full h-full border border-gold/15 -z-10 group-hover:border-gold/30 transition-colors duration-1000" />
          <div className="absolute -top-3 -left-3 md:-top-5 md:-left-5 w-24 h-24 border-l border-t border-gold/10 -z-10" />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="space-y-5 md:space-y-7"
        >
          <p className="text-gold text-[10px] md:text-xs tracking-[0.4em] uppercase font-sans">About</p>
          <h2 className="font-serif text-3xl md:text-5xl font-light italic leading-tight">
            An Emerging
            <br />
            <span className="text-gold-gradient">Presence</span>
          </h2>

          <div className="w-12 h-px bg-gold/30" />

          <div className="space-y-4 md:space-y-5 text-muted-foreground text-xs md:text-sm leading-[1.8] font-sans font-light">
            <p>
              Daniel Atsu Hukporti-Adjorble is an emerging screen talent whose work spans film and music visuals.
            </p>
            <p>
              With a strong on-screen presence and a natural ability to embody character, he continues to position himself at the intersection of cinema and culture.
            </p>
            <p>
              His performance in <span className="text-foreground italic">Paradise</span> (2026) marks a significant step in his career, premiering at the Berlin International Film Festival.
            </p>
            <p>
              Beyond film, Daniel has appeared in music videos, bringing a distinctive visual energy that connects storytelling with sound.
            </p>
            <p>
              As his body of work grows, he remains focused on building a global presence through intentional, compelling performances.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
