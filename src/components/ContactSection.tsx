import { motion } from "framer-motion";
import { Instagram, Mail } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 md:py-40 px-4 md:px-6 relative">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent pointer-events-none" />

      <div className="max-w-2xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="space-y-6 md:space-y-8"
        >
          <p className="text-gold text-[10px] md:text-xs tracking-[0.4em] uppercase font-sans">Contact</p>
          <h2 className="font-serif text-3xl md:text-5xl font-light italic leading-tight">
            Let's Work
            <br />
            <span className="text-gold-gradient">Together</span>
          </h2>
          <p className="text-muted-foreground text-xs md:text-sm font-sans font-light tracking-wide">
            For bookings and professional inquiries
          </p>

          <div className="w-12 h-px bg-gold/30 mx-auto" />

          <div className="space-y-4 md:space-y-5 pt-2 md:pt-4">
            <motion.a
              href="mailto:danielhukportiadjorble@gmail.com"
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-center gap-3 text-foreground text-xs md:text-sm font-sans tracking-wider hover:text-gold transition-colors duration-500 break-all md:break-normal"
            >
              <Mail className="w-4 h-4 flex-shrink-0" />
              danielhukportiadjorble@gmail.com
            </motion.a>

            <motion.a
              href="https://instagram.com/adjdanniel"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-3 text-muted-foreground text-xs tracking-[0.25em] uppercase font-sans hover:text-gold transition-colors duration-500"
            >
              <Instagram className="w-4 h-4 flex-shrink-0" />
              @adjdanniel
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
