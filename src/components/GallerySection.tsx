import { motion } from "framer-motion";
import img1 from "@/assets/daniel-hero.jpg";
import img2 from "@/assets/daniel-gallery-1.jpg";
import img3 from "@/assets/daniel-gallery-2.jpg";
import img4 from "@/assets/daniel-gallery-3.jpg";
import img5 from "@/assets/daniel-gallery-4.jpg";
import img6 from "@/assets/daniel-cinematic.jpg";
import img7 from "@/assets/daniel-about.jpg";

const images = [
  { src: img6, alt: "Cinematic still", span: "md:col-span-2" },
  { src: img1, alt: "Portrait at Beach Bar", span: "" },
  { src: img4, alt: "Outdoor portrait", span: "" },
  { src: img7, alt: "Nature portrait", span: "" },
  { src: img3, alt: "Bar scene", span: "" },
  { src: img5, alt: "Rustic setting", span: "" },
  { src: img2, alt: "Full body portrait", span: "" },
];

const GallerySection = () => {
  return (
    <section id="gallery" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-xs tracking-[0.35em] uppercase font-sans mb-4">Visual</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light">Gallery</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`group relative overflow-hidden ${img.span} ${
                img.span ? "aspect-[21/9]" : "aspect-[3/4]"
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-background/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
