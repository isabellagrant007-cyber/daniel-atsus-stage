import { motion } from "framer-motion";

const Footer = () => (
  <footer className="py-10 md:py-16 px-4 md:px-6 border-t border-border/10">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="max-w-5xl mx-auto flex flex-col items-center gap-6"
    >
      <p className="font-serif text-lg tracking-wider text-gold-gradient">ADJ</p>
      <div className="w-8 h-px bg-gold/20" />
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8 text-[10px] md:text-xs text-muted-foreground/60 font-sans tracking-[0.15em] uppercase">
        <p>© {new Date().getFullYear()} Daniel Atsu Hukporti-Adjorble</p>
        <span className="hidden md:inline text-border/40">·</span>
        <p>All Rights Reserved</p>
      </div>
    </motion.div>
  </footer>
);

export default Footer;
