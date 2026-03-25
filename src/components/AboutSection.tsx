import { motion } from "framer-motion";
import aboutImage from "@/assets/daniel-about.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={aboutImage}
              alt="Daniel portrait"
              className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/20 -z-10" />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-6"
        >
          <p className="text-gold text-xs tracking-[0.35em] uppercase font-sans">About</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light italic">
            An Emerging Presence
          </h2>

          <div className="space-y-5 text-muted-foreground text-sm leading-relaxed font-sans font-light">
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
