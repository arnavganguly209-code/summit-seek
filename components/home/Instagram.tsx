"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { instagramPosts } from "@/lib/data/content";
import { SOCIAL } from "@/lib/constants";

export function Instagram() {
  return (
    <section className="bg-snow py-20 md:py-24" aria-labelledby="instagram">
      <Container>
        <SectionHeading
          eyebrow="@summitseek"
          title="Instagram"
          description="Follow the journey — peaks, trails, and quiet mornings above the clouds."
          align="center"
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
          {instagramPosts.map((src, i) => (
            <motion.div
              key={src + i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
            >
              <Link
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-xl"
              >
                <Image
                  src={src}
                  alt={`Summit Seek Instagram ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 16vw"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-midnight/0 transition-colors group-hover:bg-midnight/45">
                  <InstagramIcon className="size-7 text-snow opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
