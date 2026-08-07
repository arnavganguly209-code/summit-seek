import type { BlogPageContent, BlogPost } from "@/types/blog-cms";

function post(partial: BlogPost): BlogPost {
  return partial;
}

const body = (paras: string[]) => paras.join("\n\n");

export const DEFAULT_BLOG: BlogPageContent = {
  coverImageUrl:
    "https://images.unsplash.com/photo-1486911278844-a81c525f45b5?auto=format&fit=crop&w=2000&q=80",
  coverTitle: "Travel Blogs",
  coverSubtitle:
    "Guides, trail updates, and Himalayan stories from Summit Seek’s trekking specialists.",
  intro:
    "Welcome to Summit Seek’s travel blog — weekly insights on Nepal trekking, permits, destinations, health tips, and everything you need before your Himalayan adventure.",
  latestHeading: "Latest Travel Blogs",
  categories: [
    "News & Facts",
    "Everest Region",
    "Annapurna Region",
    "Manaslu Region",
    "Travel Tips",
    "Health & Safety",
    "Culture & Festivals",
    "Permits & Visa",
  ],
  metaTitle: "Travel Blogs",
  metaDescription:
    "Read Summit Seek travel blogs on Everest, Annapurna, Manaslu, trek tips, permits, and Himalayan adventure guides.",
  posts: [
    post({
      id: "blog-1",
      slug: "how-trekking-in-everest-region-started",
      title: "How Trekking in the Everest Region Started: A Complete History",
      excerpt:
        "From early expeditions to today’s tea-house trails — the story of how Everest region trekking became a global adventure classic.",
      content: body([
        "The Everest region was not always a busy network of lodges and trails. For centuries, Sherpa communities lived and traded across the Khumbu long before trekkers arrived.",
        "Modern trekking grew after pioneering climbs and the opening of Nepal to visitors in the mid-20th century. Over decades, Namche Bazaar, Tengboche, and Gorak Shep became milestones on the journey to Everest Base Camp.",
        "Today, Summit Seek guides combine that history with safe pacing, cultural respect, and careful acclimatization so every guest experiences the Khumbu with confidence.",
        "Whether you are planning your first Himalayan trek or returning for Island Peak, understanding this history makes every ridge and monastery more meaningful.",
      ]),
      coverImageUrl:
        "https://images.unsplash.com/photo-1519904988902-4973c5c3d0ed?auto=format&fit=crop&w=1200&q=80",
      author: "Summit Seek",
      category: "Everest Region",
      tags: ["Everest", "History", "Khumbu"],
      keywords: "everest trekking history, khumbu trek, everest base camp origin",
      metaTitle: "Everest Region Trekking History | Summit Seek",
      metaDescription:
        "Learn how trekking in Nepal’s Everest region began and how the Khumbu trails became world-famous.",
      dateLabel: "Aug 01, 2026",
      publishedAt: "2026-08-01",
      visible: true,
    }),
    post({
      id: "blog-2",
      slug: "best-lake-treks-in-nepal",
      title: "Best Lake Treks in Nepal",
      excerpt:
        "Crystal alpine lakes, quiet valleys, and rewarding day walks — our favorite lake treks across Nepal.",
      content: body([
        "Nepal’s lake treks deliver dramatic scenery without always requiring a full expedition pace. From Gokyo’s turquoise waters to the sacred stillness of Gosaikunda, each route has its own character.",
        "Popular choices include Gokyo Lakes, Tilicho Lake, Gosaikunda, and Rara Lake. Season, fitness, and altitude tolerance decide which fits you best.",
        "Summit Seek designs lake itineraries with buffer days for weather and acclimatization — especially important above 4,000 meters.",
      ]),
      coverImageUrl:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
      author: "Summit Seek",
      category: "Travel Tips",
      tags: ["Lakes", "Gokyo", "Tilicho"],
      keywords: "best lake treks nepal, gokyo lakes, tilicho lake trek",
      metaTitle: "Best Lake Treks in Nepal | Summit Seek",
      metaDescription:
        "Discover Nepal’s best lake treks including Gokyo, Tilicho, Gosaikunda, and Rara with local planning tips.",
      dateLabel: "Mar 20, 2026",
      publishedAt: "2026-03-20",
      visible: true,
    }),
    post({
      id: "blog-3",
      slug: "technology-transforming-trekking-nepal",
      title: "How Technology Is Transforming Trekking in Nepal",
      excerpt:
        "GPS, better weather tools, and digital permits are changing how hikers prepare — and how guides keep groups safer.",
      content: body([
        "Trekking in Nepal still depends on human judgment, strong porters, and mountain sense. Technology simply sharpens that foundation.",
        "Offline maps, satellite messaging, and clearer weather models help teams make earlier decisions about ice, snow, and flight delays to Lukla.",
        "At Summit Seek we use modern tools for logistics while keeping the trail experience authentic — tea houses, local food, and unhurried mountain mornings.",
      ]),
      coverImageUrl:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80",
      author: "Summit Seek",
      category: "News & Facts",
      tags: ["Technology", "Safety", "Planning"],
      keywords: "trekking technology nepal, gps trekking, lukla flights",
      metaTitle: "Technology & Trekking in Nepal | Summit Seek",
      metaDescription:
        "See how GPS, weather tools, and digital systems are improving trekking safety and logistics in Nepal.",
      dateLabel: "Feb 07, 2026",
      publishedAt: "2026-02-07",
      visible: true,
    }),
    post({
      id: "blog-4",
      slug: "hiking-vs-trekking-nepal",
      title: "Hiking vs Trekking — Everything You Need To Know",
      excerpt:
        "Short day walks or multi-day Himalayan journeys? Here’s how hiking and trekking differ in Nepal.",
      content: body([
        "In Nepal, “hiking” often means day trips near Kathmandu or Pokhara, while “trekking” usually means overnight stays on mountain trails for several days.",
        "Treks need packing systems, permits, pacing, and often a guide or porter. Hiking can be lighter — but still deserves good footwear and weather awareness.",
        "If you want Everest Base Camp or Annapurna Circuit, you are trekking. If you want Champadevi or Sarangkot sunrise walks, you are hiking.",
      ]),
      coverImageUrl:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      author: "Summit Seek",
      category: "Travel Tips",
      tags: ["Hiking", "Trekking", "Beginners"],
      keywords: "hiking vs trekking nepal, day hike kathmandu, multi day trek",
      metaTitle: "Hiking vs Trekking in Nepal | Summit Seek",
      metaDescription:
        "Understand the difference between hiking and trekking in Nepal before you book your Himalayan adventure.",
      dateLabel: "Jan 30, 2026",
      publishedAt: "2026-01-30",
      visible: true,
    }),
    post({
      id: "blog-5",
      slug: "trekking-in-nepal-with-kids",
      title: "Trekking in Nepal with Kids",
      excerpt:
        "Family-friendly routes, pacing advice, and practical packing tips for parents planning a Himalayan trek.",
      content: body([
        "Trekking with children can be magical when the itinerary respects young energy cycles and altitude limits.",
        "Gentler options include Ghorepani Poon Hill, short Annapurna foothill walks, and carefully paced lower Everest approaches.",
        "Summit Seek builds family itineraries with shorter walking days, warmer lodge stops, and flexible rest options.",
      ]),
      coverImageUrl:
        "https://images.unsplash.com/photo-1454496522488-12a49a703780?auto=format&fit=crop&w=1200&q=80",
      author: "Summit Seek",
      category: "Travel Tips",
      tags: ["Family", "Kids", "Poon Hill"],
      keywords: "trekking with kids nepal, family trek nepal, poon hill family",
      metaTitle: "Trekking in Nepal with Kids | Summit Seek",
      metaDescription:
        "Plan a safe, enjoyable family trek in Nepal with kid-friendly routes and practical pacing tips.",
      dateLabel: "Jan 18, 2026",
      publishedAt: "2026-01-18",
      visible: true,
    }),
    post({
      id: "blog-6",
      slug: "complete-guide-everest-base-camp-trek",
      title: "Complete Guide to Everest Base Camp Trek",
      excerpt:
        "Days, difficulty, permits, best seasons, and packing essentials for Nepal’s most iconic trek.",
      content: body([
        "The Everest Base Camp trek is a classic for a reason: dramatic peaks, Sherpa culture, and a finish line that feels legendary.",
        "Most itineraries run 12–16 days including Kathmandu and acclimatization. Difficulty is moderate to challenging due to altitude rather than technical climbing.",
        "Best seasons are spring and autumn. Winter is quieter and colder; monsoon brings cloud and slippery trails.",
        "Summit Seek handles permits, flights, guides, and lodge logistics so you can focus on the trail.",
      ]),
      coverImageUrl:
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
      author: "Summit Seek",
      category: "Everest Region",
      tags: ["EBC", "Guide", "Permits"],
      keywords: "everest base camp trek guide, ebc trek cost, ebc packing list",
      metaTitle: "Everest Base Camp Trek Guide | Summit Seek",
      metaDescription:
        "A complete Everest Base Camp trek guide covering itinerary length, seasons, difficulty, and preparation.",
      dateLabel: "Nov 26, 2025",
      publishedAt: "2025-11-26",
      visible: true,
    }),
    post({
      id: "blog-7",
      slug: "how-to-reach-manaslu-base-camp",
      title: "How to Reach Manaslu Base Camp: Routes and Difficulty",
      excerpt:
        "Remote trails, restricted-area permits, and what to expect on the Manaslu Circuit approach.",
      content: body([
        "Manaslu remains one of Nepal’s most rewarding restricted-area circuits — quieter than Annapurna, wilder than Everest tea-house corridors.",
        "Reaching Manaslu Base Camp involves multi-day trekking with proper permits and a licensed guide. Logistics start from Kathmandu via Gorkha / Soti Khola approaches.",
        "Expect long days, river crossings, and changing weather. Fitness and team experience matter.",
      ]),
      coverImageUrl:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
      author: "Summit Seek",
      category: "Manaslu Region",
      tags: ["Manaslu", "Restricted Area", "Base Camp"],
      keywords: "manaslu base camp, manaslu circuit route, manaslu difficulty",
      metaTitle: "Manaslu Base Camp Routes | Summit Seek",
      metaDescription:
        "Learn routes, difficulty, and permit needs for reaching Manaslu Base Camp in Nepal.",
      dateLabel: "Nov 13, 2025",
      publishedAt: "2025-11-13",
      visible: true,
    }),
    post({
      id: "blog-8",
      slug: "annapurna-base-camp-trek-guide",
      title: "Annapurna Base Camp Trek — Iconic Himalayan Adventure",
      excerpt:
        "Why ABC remains a favorite for first-time high-altitude trekkers visiting Nepal.",
      content: body([
        "Annapurna Base Camp offers amphitheater views of Annapurna I and Machhapuchhre with a trek length many first-timers can manage.",
        "Typical itineraries run about 7–14 days depending on side trips like Poon Hill. Spring rhododendrons and autumn clarity are peak seasons.",
        "Compared with Everest, flights are less critical — most journeys begin from Pokhara — which can simplify planning.",
      ]),
      coverImageUrl:
        "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?auto=format&fit=crop&w=1200&q=80",
      author: "Summit Seek",
      category: "Annapurna Region",
      tags: ["ABC", "Annapurna", "Pokhara"],
      keywords: "annapurna base camp trek, abc trek guide, pokhara trek",
      metaTitle: "Annapurna Base Camp Trek Guide | Summit Seek",
      metaDescription:
        "Plan the Annapurna Base Camp trek with season advice, difficulty notes, and itinerary guidance.",
      dateLabel: "Oct 20, 2025",
      publishedAt: "2025-10-20",
      visible: true,
    }),
    post({
      id: "blog-9",
      slug: "nepal-trek-permits-tims-visa",
      title: "TIMS, Permits, and Visa Extensions Explained",
      excerpt:
        "A clear overview of TIMS cards, national park permits, restricted areas, and tourist visa basics.",
      content: body([
        "Most popular treks need a mix of TIMS (or region equivalents) and national park or conservation area permits.",
        "Restricted areas such as Manaslu and Upper Mustang have additional rules and usually require a licensed agency.",
        "Summit Seek manages paperwork so your focus stays on training and packing — not embassy queues.",
      ]),
      coverImageUrl:
        "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80",
      author: "Summit Seek",
      category: "Permits & Visa",
      tags: ["TIMS", "Permits", "Visa"],
      keywords: "nepal trek permits, tims card, nepal visa extension",
      metaTitle: "Nepal Trek Permits & TIMS Guide | Summit Seek",
      metaDescription:
        "Understand TIMS, park permits, restricted-area rules, and visa basics for trekking in Nepal.",
      dateLabel: "Oct 06, 2025",
      publishedAt: "2025-10-06",
      visible: true,
    }),
    post({
      id: "blog-10",
      slug: "altitude-sickness-prevention-tips",
      title: "Altitude Sickness Prevention Tips for Himalayan Treks",
      excerpt:
        "Practical acclimatization habits every trekker should follow above 2,500 meters.",
      content: body([
        "Altitude illness can affect anyone — fitness alone is not protection. Slow ascent, hydration, and honest self-checks matter most.",
        "Rest days, “climb high sleep low” where appropriate, and listening to your guide are non-negotiable on Everest and Manaslu routes.",
        "Summit Seek itineraries include built-in acclimatization and clear protocols if symptoms appear.",
      ]),
      coverImageUrl:
        "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80",
      author: "Summit Seek",
      category: "Health & Safety",
      tags: ["Altitude", "Health", "Safety"],
      keywords: "altitude sickness nepal, acclimatization tips, trek health",
      metaTitle: "Altitude Sickness Prevention | Summit Seek",
      metaDescription:
        "Prevent altitude sickness on Nepal treks with proven acclimatization and safety tips from Summit Seek.",
      dateLabel: "Sep 12, 2025",
      publishedAt: "2025-09-12",
      visible: true,
    }),
  ],
};
