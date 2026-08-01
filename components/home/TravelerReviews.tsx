"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Star,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Calendar,
  User,
  Mountain,
  Users,
} from "lucide-react";
import { SITE, SOCIAL } from "@/lib/constants";
import { cn } from "@/lib/utils";

const GOLD = "#D4AF37";
const ease = [0.22, 1, 0.36, 1] as const;

type Review = {
  id: string;
  name: string;
  country: string;
  flag: string;
  package: string;
  date: string;
  rating: number;
  text: string;
  duration: string;
  guide: string;
  travelType: string;
  image: string;
};

const reviews: Review[] = [
  {
    id: "r1",
    name: "Sakura Tanaka",
    country: "Japan",
    flag: "🇯🇵",
    package: "Island Peak Climbing",
    date: "May 2025",
    rating: 5,
    text: "I trained for months and still worried about the summit day. Our guide walked me through every pitch with calm patience. When we reached the top, the team celebrated like it was their own climb. I have never felt safer on a mountain.",
    duration: "18 Days",
    guide: "Pasang Sherpa",
    travelType: "Solo Traveler",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=85",
  },
  {
    id: "r2",
    name: "James Wilson",
    country: "Australia",
    flag: "🇦🇺",
    package: "Everest Base Camp Trek",
    date: "October 2025",
    rating: 5,
    text: "We did EBC in peak season and expected crowds and chaos. Summit Seek kept everything smooth — lodge bookings, rest days, even a quiet birthday cake at Gorak Shep. Proper organisation without feeling rushed.",
    duration: "14 Days",
    guide: "Nima Sherpa",
    travelType: "Couple Traveler",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=85",
  },
  {
    id: "r3",
    name: "Michael Carter",
    country: "USA",
    flag: "🇺🇸",
    package: "Manaslu Circuit Trek",
    date: "September 2025",
    rating: 5,
    text: "Manaslu is remote and the logistics are serious. These guys handled permits, porters, and altitude pacing better than any company I've used in Alaska or Patagonia. Quiet professionalism the whole way.",
    duration: "16 Days",
    guide: "Tashi Gurung",
    travelType: "Adventure Trek",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=85",
  },
  {
    id: "r4",
    name: "Sophia Müller",
    country: "Germany",
    flag: "🇩🇪",
    package: "Annapurna Base Camp Trek",
    date: "April 2026",
    rating: 5,
    text: "My first trek in Asia and I was nervous about food and hygiene. Everything was thoughtfully arranged. The sanctuary views at sunrise were worth every step — and our guide knew exactly when to push and when to rest.",
    duration: "10 Days",
    guide: "Maya Tamang",
    travelType: "Solo Traveler",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=85",
  },
  {
    id: "r5",
    name: "Emma Laurent",
    country: "France",
    flag: "🇫🇷",
    package: "Everest Luxury Lodge Trek",
    date: "March 2026",
    rating: 5,
    text: "We wanted Everest without the teahouse discomfort. Summit Seek delivered warm lodges, private dining, and still kept the raw mountain feeling. It felt refined without ever being flashy.",
    duration: "12 Days",
    guide: "Nima Sherpa",
    travelType: "Couple Traveler",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=85",
  },
  {
    id: "r6",
    name: "Oliver Smith",
    country: "United Kingdom",
    flag: "🇬🇧",
    package: "Upper Mustang Trek",
    date: "August 2025",
    rating: 5,
    text: "Upper Mustang feels like another world. The team arranged monastery visits that weren't on any tourist script, and the jeep sections were seamless. A rare mix of culture and high desert landscape.",
    duration: "17 Days",
    guide: "Dorje Lama",
    travelType: "Cultural Journey",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=85",
  },
  {
    id: "r7",
    name: "Daniel Lim",
    country: "Singapore",
    flag: "🇸🇬",
    package: "EBC with Helicopter Return",
    date: "November 2025",
    rating: 5,
    text: "Walking up and flying out was the perfect balance. Summit Seek timed the heli window perfectly after a snow delay. Clear communication the whole time — that alone is worth the booking.",
    duration: "11 Days",
    guide: "Kami Sherpa",
    travelType: "Luxury Adventure",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=85",
  },
  {
    id: "r8",
    name: "Nur Aisyah",
    country: "Malaysia",
    flag: "🇲🇾",
    package: "Langtang Valley Trek",
    date: "February 2026",
    rating: 5,
    text: "Langtang was gentle enough for my parents and still beautiful enough for me. The tea houses were clean, the pacing was kind, and we never felt like just another group on a checklist.",
    duration: "8 Days",
    guide: "Sita Rai",
    travelType: "Family Trek",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=85",
  },
  {
    id: "r9",
    name: "Min Ji Park",
    country: "South Korea",
    flag: "🇰🇷",
    package: "Mardi Himal Trek",
    date: "December 2025",
    rating: 5,
    text: "Short trek, big views. High Camp at sunrise stopped me cold. Our guide knew every ridge and still made time for photos and stories. Perfect for a long weekend escape from Seoul.",
    duration: "5 Days",
    guide: "Bikram Magar",
    travelType: "Short Trek",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994d69dafe?auto=format&fit=crop&w=300&q=85",
  },
  {
    id: "r10",
    name: "Rahul Sharma",
    country: "India",
    flag: "🇮🇳",
    package: "Annapurna Circuit Trek",
    date: "October 2025",
    rating: 5,
    text: "Thorong La day was tough. The team monitored our oxygen and adjusted the start time without drama. Felt like traveling with friends who happen to know the mountains inside out.",
    duration: "15 Days",
    guide: "Hari Bahadur",
    travelType: "Group Trek",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=85",
  },
  {
    id: "r11",
    name: "Carlos Martin",
    country: "Spain",
    flag: "🇪🇸",
    package: "Gokyo Lakes Trek",
    date: "April 2025",
    rating: 5,
    text: "Gokyo Ri at dawn is something I will talk about for years. Clear ice lakes, quiet trails, and a team that never rushed us past the moments that matter. Excellent value for the care we received.",
    duration: "13 Days",
    guide: "Lhakpa Sherpa",
    travelType: "Adventure Trek",
    image:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=300&q=85",
  },
  {
    id: "r12",
    name: "Jessica Brown",
    country: "Canada",
    flag: "🇨🇦",
    package: "Three Passes Trek",
    date: "May 2026",
    rating: 5,
    text: "Three Passes is no joke. Summit Seek screened our fitness honestly before we booked — that honesty built trust. On the trail, every high camp decision felt measured and smart.",
    duration: "18 Days",
    guide: "Pembu Sherpa",
    travelType: "Challenging Trek",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&q=85",
  },
  {
    id: "r13",
    name: "Lucas De Vries",
    country: "Netherlands",
    flag: "🇳🇱",
    package: "Upper Dolpo Trek",
    date: "July 2025",
    rating: 5,
    text: "Dolpo is wild country. Camps were set early, food was solid, and the guides knew the restricted area rules cold. Hard trek, but never careless. Exactly what I wanted.",
    duration: "23 Days",
    guide: "Sonam Gurung",
    travelType: "Expedition Style",
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=85",
  },
  {
    id: "r14",
    name: "Marco Rossi",
    country: "Italy",
    flag: "🇮🇹",
    package: "Mera Peak Climbing",
    date: "November 2025",
    rating: 5,
    text: "Mera was my first 6000er. Gear checks, rope practice, and weather calls were all clear and calm. Summit Seek treats climbing like a craft, not a photo opportunity.",
    duration: "18 Days",
    guide: "Ang Dawa",
    travelType: "Peak Climbing",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=85",
  },
  {
    id: "r15",
    name: "Liam Cooper",
    country: "New Zealand",
    flag: "🇳🇿",
    package: "Kanchenjunga Base Camp",
    date: "October 2025",
    rating: 5,
    text: "Remote, long, and absolutely worth it. We barely saw other groups. The kitchen crew cooked like they were feeding family, and the mountain views on the north side still sit with me.",
    duration: "21 Days",
    guide: "Mingma Sherpa",
    travelType: "Remote Trek",
    image:
      "https://images.unsplash.com/photo-1501196354665-ef132a777a05?auto=format&fit=crop&w=300&q=85",
  },
];

const stats = [
  { value: 3000, suffix: "+", label: "Happy Travelers" },
  { value: 4.9, suffix: "/5", label: "Average Rating", decimals: 1 },
  { value: 98, suffix: "%", label: "Recommend Summit Seek" },
  { value: 20, suffix: "+", label: "Years Experience" },
] as const;

function Stars({ rating, size = "md" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const cls = size === "lg" ? "size-5" : size === "sm" ? "size-3" : "size-3.5";
  return (
    <div className="flex items-center gap-0.5" style={{ color: GOLD }} aria-label={`${rating} star rating`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn(cls, i < rating ? "fill-current" : "opacity-25")} />
      ))}
    </div>
  );
}

function AnimatedCounter({
  value,
  suffix,
  decimals = 0,
}: {
  value: number;
  suffix: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString()}
      {suffix}
    </span>
  );
}

function FeaturedCard({ review }: { review: Review }) {
  return (
    <article className="relative overflow-hidden rounded-[30px] border border-[#e8ebf0] bg-white p-6 shadow-[0_28px_70px_rgba(8,18,30,0.1)] sm:p-8 lg:p-10">
      <div
        className="pointer-events-none absolute -right-6 -top-6 font-[family-name:var(--font-display)] text-[140px] leading-none text-[#D4AF37]/[0.07]"
        aria-hidden
      >
        “
      </div>

      <div className="relative grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-10">
        {/* Left profile */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="relative">
            <div className="relative size-[90px] overflow-hidden rounded-full border-[3px] border-white shadow-[0_12px_32px_rgba(8,18,30,0.15)] ring-2 ring-[#D4AF37]/40">
              <Image
                src={review.image}
                alt={review.name}
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
                sizes="90px"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full bg-[#D4AF37] text-[#08121E] shadow-md">
              <BadgeCheck className="size-3.5" />
            </span>
          </div>

          <p className="mt-4 font-[family-name:var(--font-display)] text-[1.25rem] font-bold text-[#08121E]">
            {review.name}
          </p>
          <p className="mt-1 text-[14px] text-[#5a6577]">
            <span className="mr-1.5" aria-hidden>
              {review.flag}
            </span>
            {review.country}
          </p>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#9a7b1a]">
            <BadgeCheck className="size-3" />
            Verified Review
          </span>

          <div className="mt-4 space-y-1.5 text-[13px]">
            <p className="font-semibold text-[#08121E]">{review.package}</p>
            <p className="inline-flex items-center gap-1.5 text-[#5a6577]">
              <Calendar className="size-3.5 text-[#D4AF37]" />
              {review.date}
            </p>
          </div>

          <div className="mt-4">
            <Stars rating={review.rating} size="lg" />
          </div>
        </div>

        {/* Right content */}
        <div className="flex flex-col">
          <blockquote className="font-[family-name:var(--font-display)] text-[1.15rem] font-medium leading-[1.65] text-[#1a2433] sm:text-[1.35rem] lg:text-[1.45rem]">
            &ldquo;{review.text}&rdquo;
          </blockquote>

          <div className="mt-auto grid grid-cols-2 gap-3 border-t border-[#eef0f4] pt-6 sm:grid-cols-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8a93a3]">
                Duration
              </p>
              <p className="mt-1 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#08121E]">
                <Calendar className="size-3.5 text-[#D4AF37]" />
                {review.duration}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8a93a3]">
                Guide
              </p>
              <p className="mt-1 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#08121E]">
                <User className="size-3.5 text-[#D4AF37]" />
                {review.guide}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8a93a3]">
                Package
              </p>
              <p className="mt-1 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#08121E]">
                <Mountain className="size-3.5 text-[#D4AF37]" />
                Trek
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8a93a3]">
                Travel Type
              </p>
              <p className="mt-1 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#08121E]">
                <Users className="size-3.5 text-[#D4AF37]" />
                {review.travelType}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function PreviewCard({
  review,
  active,
  onSelect,
}: {
  review: Review;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group w-full rounded-[22px] border bg-white p-4 text-left shadow-[0_12px_36px_rgba(8,18,30,0.06)] transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(8,18,30,0.1)]",
        active
          ? "border-[#D4AF37]/50 ring-2 ring-[#D4AF37]/25"
          : "border-[#e8ebf0]",
      )}
    >
      <div className="flex items-start gap-3">
        <div className="relative size-12 shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-md">
          <Image
            src={review.image}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="48px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-[14px] font-bold text-[#08121E]">{review.name}</p>
            <span className="text-[14px]" aria-hidden>
              {review.flag}
            </span>
          </div>
          <p className="mt-0.5 truncate text-[11px] text-[#5a6577]">{review.package}</p>
          <div className="mt-2">
            <Stars rating={review.rating} size="sm" />
          </div>
          <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-[#5a6577]">
            {review.text}
          </p>
        </div>
      </div>
    </button>
  );
}

export function TravelerReviews() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const active = reviews[index];

  const prev = useCallback(() => {
    setIndex((i) => (i === 0 ? reviews.length - 1 : i - 1));
  }, []);

  const next = useCallback(() => {
    setIndex((i) => (i === reviews.length - 1 ? 0 : i + 1));
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const previewIds = [
    reviews[(index + 1) % reviews.length],
    reviews[(index + 2) % reviews.length],
    reviews[(index + 3) % reviews.length],
  ];

  return (
    <section
      id="traveler-reviews"
      className="relative overflow-hidden bg-white py-[80px] sm:py-[100px] lg:py-[120px]"
      aria-labelledby="traveler-reviews-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
          className="mx-auto max-w-[760px] text-center"
        >
          <p
            className="inline-flex items-center justify-center gap-2 text-[12px] font-bold uppercase tracking-[0.24em]"
            style={{ color: GOLD }}
          >
            <Stars rating={5} size="sm" />
            Traveler Reviews
          </p>
          <h2
            id="traveler-reviews-heading"
            className="mt-4 font-[family-name:var(--font-display)] text-[1.85rem] font-bold leading-[1.15] tracking-[-0.02em] text-[#08121E] sm:text-[2.35rem] lg:text-[2.65rem]"
          >
            What Our Travelers Say
          </h2>
          <p className="mx-auto mt-4 max-w-[760px] text-[15px] leading-[1.75] text-[#5a6577] sm:text-[16px]">
            Thousands of travelers have trusted Summit Seek for unforgettable trekking, peak
            climbing and Himalayan adventures across Nepal.
          </p>
        </motion.div>

        {/* Featured carousel */}
        <div
          className="mt-12 sm:mt-14"
          onTouchStart={(e) => {
            touchX.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (touchX.current == null) return;
            const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current;
            if (dx > 50) prev();
            if (dx < -50) next();
            touchX.current = null;
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.98, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -12 }}
              transition={{ duration: 0.45, ease }}
            >
              <FeaturedCard review={active} />
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous review"
              className="flex size-11 items-center justify-center rounded-full border border-[#e0e4ea] bg-white text-[#08121E] shadow-sm transition-all duration-300 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.25)]"
            >
              <ChevronLeft className="size-5" />
            </button>
            <div className="flex items-center gap-1.5">
              {reviews.map((r, i) => (
                <button
                  key={r.id}
                  type="button"
                  aria-label={`Review ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === index ? "w-7 bg-[#D4AF37]" : "w-2 bg-[#d0d5de] hover:bg-[#D4AF37]/50",
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              aria-label="Next review"
              className="flex size-11 items-center justify-center rounded-full border border-[#e0e4ea] bg-white text-[#08121E] shadow-sm transition-all duration-300 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.25)]"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        {/* Preview cards */}
        <div className="mt-10 hidden gap-5 md:grid md:grid-cols-2 xl:grid-cols-3">
          {previewIds.map((review) => (
            <PreviewCard
              key={review.id}
              review={review}
              active={false}
              onSelect={() => setIndex(reviews.findIndex((r) => r.id === review.id))}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              className="rounded-[22px] border border-[#e8ebf0] bg-[#F9FAFB] px-5 py-6 text-center shadow-[0_10px_30px_rgba(8,18,30,0.04)]"
            >
              <p
                className="font-[family-name:var(--font-display)] text-[2rem] font-bold sm:text-[2.25rem]"
                style={{ color: GOLD }}
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={"decimals" in stat ? stat.decimals : 0}
                />
              </p>
              <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#5a6577]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Google + Tripadvisor */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <a
            href={SOCIAL.google}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-5 rounded-[22px] border border-white/60 bg-white/80 px-6 py-5 shadow-[0_14px_40px_rgba(8,18,30,0.06)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(212,175,55,0.2)]"
          >
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#F9FAFB] text-[22px] font-bold text-[#4285F4] shadow-inner">
              G
            </div>
            <div>
              <Stars rating={5} />
              <p className="mt-1.5 text-[18px] font-bold text-[#08121E]">
                {SITE.googleRating}/5
              </p>
              <p className="text-[13px] text-[#5a6577]">Based on 850+ Reviews</p>
            </div>
          </a>

          <a
            href={SOCIAL.tripadvisor}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-5 rounded-[22px] border border-white/60 bg-white/80 px-6 py-5 shadow-[0_14px_40px_rgba(8,18,30,0.06)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(212,175,55,0.2)]"
          >
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#00aa6c]/10 text-[11px] font-bold uppercase tracking-wide text-[#00aa6c]">
              TA
            </div>
            <div>
              <Stars rating={5} />
              <p className="mt-1.5 text-[18px] font-bold text-[#08121E]">Travelers Choice</p>
              <p className="text-[13px] text-[#5a6577]">Premium Badge · Tripadvisor</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
