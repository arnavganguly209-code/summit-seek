"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { blogPosts } from "@/lib/data/content";

export function TravelBlogs() {
  return (
    <section className="bg-mist py-20 md:py-28" aria-labelledby="travel-blogs">
      <Container>
        <SectionHeading
          eyebrow="Field Notes"
          title="Travel Blogs"
          description="Guides, stories, and preparation insights from our expedition desk."
          href="/blog"
          linkLabel="All Articles"
        />

        <div className="flex gap-6 overflow-x-auto pb-4 luxury-scroll snap-x snap-mandatory md:grid md:grid-cols-2 md:overflow-visible xl:grid-cols-2">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="group flex w-[min(100%,420px)] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border bg-snow shadow-[0_12px_36px_rgba(11,29,54,0.05)] md:w-auto md:flex-row"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden md:aspect-auto md:w-[44%] md:min-h-[220px]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center p-6 md:p-7">
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.16em]">
                  <span className="text-gold-dark">{post.category}</span>
                  <span className="text-border-strong">·</span>
                  <span className="text-slate-light">{post.date}</span>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-midnight md:text-2xl">
                  <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-gold-dark">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate">
                  {post.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate">
                    <Clock className="size-3.5 text-gold-dark" />
                    {post.readingTime} read
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-midnight hover:text-gold-dark"
                  >
                    Read
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
