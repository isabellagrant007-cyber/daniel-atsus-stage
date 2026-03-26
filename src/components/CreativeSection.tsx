import { motion } from "framer-motion";

const categories = [
  { label: "All", value: "all" },
  { label: "Art", value: "art" },
  { label: "Design", value: "design" },
  { label: "Direction", value: "direction" },
];

const works = [
  {
    title: "Fragments of Home",
    category: "art",
    type: "Mixed Media on Canvas",
    year: "2025",
  },
  {
    title: "Luxury Brand Identity",
    category: "design",
    type: "Brand System & Collateral",
    year: "2025",
  },
  {
    title: "Production Moodboard",
    category: "direction",
    type: "Creative Direction",
    year: "2024",
  },
  {
    title: "Adorned",
    category: "art",
    type: "Digital Illustration",
    year: "2024",
  },
  {
    title: "Editorial Spread",
    category: "design",
    type: "Publication Design",
    year: "2025",
  },
  {
    title: "Festival Campaign",
    category: "direction",
    type: "Art Direction & Poster",
    year: "2024",
  },
];

const CreativeSection = () => {
  return (
    <section id="creative" className="py-20 md:py-40 px-4 md:px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/20 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-gold text-[10px] md:text-xs tracking-[0.4em] uppercase font-sans mb-3 md:mb-4">
            Art & Design
          </p>
          <h2 className="font-serif text-3xl md:text-6xl font-light">
            Creative <span className="italic text-gold-gradient">Practice</span>
          </h2>
          <p className="text-muted-foreground text-xs md:text-sm font-sans font-light tracking-wide mt-4 md:mt-6 max-w-lg mx-auto">
            A selection of visual art, graphic design, and creative direction work
          </p>
        </motion.div>

        {/* Portfolio Grid — Masonry-inspired */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {works.map((work, i) => (
            <motion.div
              key={work.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`group relative overflow-hidden ${
                i === 0 || i === 3 ? "md:row-span-2" : ""
              }`}
            >
              <div className={`relative overflow-hidden ${
                i === 0 || i === 3 ? "aspect-[3/4]" : "aspect-[4/3]"
              }`}>
                <img
                  src={work.image}
                  alt={work.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Info on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                  <p className="text-gold text-[9px] md:text-[10px] tracking-[0.3em] uppercase font-sans mb-2">
                    {work.type}
                  </p>
                  <h3 className="font-serif text-lg md:text-xl italic font-light">
                    {work.title}
                  </h3>
                  <p className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase font-sans mt-2">
                    {work.year}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Artist Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-2xl mx-auto text-center mt-20 md:mt-32"
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
