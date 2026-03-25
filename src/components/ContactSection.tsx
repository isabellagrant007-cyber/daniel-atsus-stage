import { motion } from "framer-motion";
import { Instagram, Mail } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <p className="text-gold text-xs tracking-[0.35em] uppercase font-sans">Contact</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light italic">
            Let's Work Together
          </h2>
          <p className="text-muted-foreground text-sm font-sans font-light">
            For bookings and professional inquiries
          </p>

          <div className="space-y-4 pt-4">
            <a
              href="mailto:danielhukportiadjorble@gmail.com"
              className="flex items-center justify-center gap-2 text-foreground text-sm font-sans tracking-wider hover:text-gold transition-colors duration-300"
            >
              <Mail className="w-4 h-4" />
              danielhukportiadjorble@gmail.com
            </a>

            <a
              href="https://instagram.com/adjdanniel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground text-xs tracking-[0.25em] uppercase font-sans hover:text-gold transition-colors duration-300"
            >
              <Instagram className="w-4 h-4" />
              @adjdanniel
            </a>
          </div>

          <div className="pt-8">
            <div className="w-12 h-px bg-gold/30 mx-auto" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
