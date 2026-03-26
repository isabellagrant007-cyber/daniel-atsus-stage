import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Creative", href: "#creative" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/20" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 py-4 md:py-5">
          <a href="#" className="font-serif text-lg md:text-xl tracking-wider text-foreground">
            ADJ
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-muted-foreground text-[11px] tracking-[0.2em] uppercase font-sans hover:text-gold transition-colors duration-500 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold/50 group-hover:w-full transition-all duration-500" />
              </a>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-1"
            aria-label="Menu"
          >
            <span className={`w-5 h-px bg-foreground transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
            <span className={`w-5 h-px bg-foreground transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`w-5 h-px bg-foreground transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-2xl flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-10">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="font-serif text-3xl tracking-wide hover:text-gold transition-colors duration-500"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
