const Footer = () => (
  <footer className="py-8 md:py-12 px-4 md:px-6 border-t border-border/20">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 text-[10px] md:text-xs text-muted-foreground font-sans tracking-wider">
      <p>© {new Date().getFullYear()} Daniel Atsu Hukporti-Adjorble</p>
      <p className="uppercase">All Rights Reserved</p>
    </div>
  </footer>
);

export default Footer;
