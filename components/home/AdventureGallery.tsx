"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { galleryImages } from "@/lib/data/content";
import { cn } from "@/lib/utils";

export function AdventureGallery() {
  return (
    <section className="bg-snow py-20 md:py-28" aria-labelledby="gallery">
      <Container>
        <SectionHeading
          eyebrow="Moments on the Trail"
          title="Adventure Gallery"
          description="A visual journal of light, altitude, and human presence across the Himalaya."
          align="center"
        />

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 lg:gap-5">
          {galleryImages.map((img, i) => (
            <motion.figure
              key={img.src + i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.45 }}
              className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl lg:mb-5"
            >
              <div
                className={cn(
                  "relative overflow-hidden",
                  img.span === "tall" && "aspect-[3/4]",
                  img.span === "wide" && "aspect-[16/10]",
                  img.span === "square" && "aspect-square",
                )}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-midnight/80 to-transparent p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm font-semibold text-snow">{img.alt}</p>
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
