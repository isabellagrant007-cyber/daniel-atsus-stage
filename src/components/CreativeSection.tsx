import { motion } from "framer-motion";
import { Palette, PenTool, Layers } from "lucide-react";

const disciplines = [
  {
    icon: Palette,
    title: "Visual Art",
    description: "Original artwork exploring identity, culture, and the human form through mixed media and digital illustration.",
  },
  {
    icon: PenTool,
    title: "Graphic Design",
    description: "Brand identities, editorial layouts, and visual systems crafted with precision and intentional storytelling.",
  },
  {
    icon: Layers,
    title: "Creative Direction",
    description: "Conceptual development and art direction for campaigns, shoots, and multimedia projects.",
  },
];

const CreativeSection = () => {
  return (
    <section id="creative" className="py-20 md:py-40 px-4 md:px-6 relative">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/20 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-12 md:mb-24"
        >
          <p className="text-gold text-xs tracking-[0.35em] uppercase font-sans mb-3 md:mb-4">
            Art & Design
          </p>
          <h2 className="font-serif text-3xl md:text-6xl font-light">
            Creative <span className="italic text-gold-gradient">Practice</span>
          </h2>
        </motion.div>

        {/* Discipline Cards */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-16 md:mb-24">
          {disciplines.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group relative p-6 md:p-10 border border-border/20 hover:border-gold/30 transition-all duration-700 bg-surface/50"
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-l border-t border-gold/0 group-hover:border-gold/40 transition-all duration-700" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-r border-b border-gold/0 group-hover:border-gold/40 transition-all duration-700" />

              <item.icon className="w-5 h-5 md:w-6 md:h-6 text-gold mb-5 md:mb-6 group-hover:scale-110 transition-transform duration-500" />

              <h3 className="font-serif text-lg md:text-xl italic font-light mb-3 md:mb-4 group-hover:text-gold transition-colors duration-500">
                {item.title}
              </h3>

              <div className="w-8 h-px bg-gold/20 mb-4 group-hover:w-12 transition-all duration-700" />

              <p className="text-muted-foreground text-xs md:text-sm font-sans font-light leading-[1.8]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-12 h-px bg-gold/30 mx-auto mb-6 md:mb-8" />
          <p className="font-serif text-xl md:text-3xl font-light italic leading-relaxed text-foreground/80">
            "Art is how I process the world — whether on screen, on paper, or on a canvas."
          </p>
          <p className="text-gold/50 text-[10px] md:text-xs tracking-[0.3em] uppercase font-sans mt-4 md:mt-6">
            — Daniel Atsu
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CreativeSection;
