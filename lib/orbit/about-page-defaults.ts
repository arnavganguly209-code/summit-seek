import type { AboutPageContent, AboutTeamMember } from "@/types/about-page-cms";
import { SITE } from "@/lib/constants";

function emptyTeamSlot(index: number): AboutTeamMember {
  const n = index + 1;
  return {
    id: `t${n}`,
    name: `Team Member ${n}`,
    role: "Designation",
    bio: "Add a short bio for this team member in Orbit.",
    imageUrl: "",
    visible: true,
  };
}

export const DEFAULT_ABOUT_PAGE: AboutPageContent = {
  coverImageUrl:
    "https://images.unsplash.com/photo-1486911278844-a81c525f45b5?auto=format&fit=crop&w=2000&q=80",
  coverTitle: "About Us",
  coverSubtitle:
    "Summit Seek Travels & Tours — premium Himalayan trekking, expeditions, and cultural journeys from Kathmandu.",
  companyName: SITE.legalName,
  tagline: SITE.tagline,
  storyHeading: "The pioneers of thoughtful Himalayan travel",
  storyBody:
    "Summit Seek Travels & Tours is a Kathmandu-based trekking and adventure company dedicated to safe, meaningful journeys across Nepal’s Himalaya. From Everest Base Camp and Annapurna trails to remote circuits, peak climbs, and cultural tours, we design every itinerary with local expertise, careful pacing, and genuine hospitality.\n\nBased in Thamel, our licensed team handles permits, logistics, guides, and on-trail support so guests can focus on the mountains — not the paperwork. We believe great travel balances adventure with respect for communities, culture, and the natural environment we walk through.",
  storyImageUrl: "",
  missionHeading: "Our Mission",
  missionBody:
    "To craft Himalayan journeys that feel personal, safe, and unforgettable — connecting travelers with Nepal’s landscapes and people while delivering world-class service from the first briefing to the final farewell.",
  visionHeading: "Our Vision",
  visionBody:
    "To be Nepal’s most trusted premium trekking partner — known for ethical operations, expert guidance, and adventures that leave mountains cleaner and communities stronger.",
  valuesHeading: "What defines Summit Seek",
  values: [
    {
      id: "v1",
      title: "Safety first",
      description:
        "Acclimatization-aware itineraries, trained guides, and clear protocols on every trek and climb.",
    },
    {
      id: "v2",
      title: "Local expertise",
      description:
        "Kathmandu-based operations with guides who know the trails, lodges, weather, and culture.",
    },
    {
      id: "v3",
      title: "Ethical travel",
      description:
        "Fair treatment of porters and partners, Leave No Trace habits, and community-minded planning.",
    },
    {
      id: "v4",
      title: "Tailored journeys",
      description:
        "Private and small-group trips shaped around your pace, season, and mountain goals.",
    },
  ],
  responsibleHeading: "Responsible travel, practiced daily",
  responsibleBody:
    "We pack out what we can, avoid unnecessary trail waste, support fair wages for guides and porters, and encourage travelers to engage respectfully with mountain communities. Your journey with Summit Seek is designed to give back in small, lasting ways.",
  ctaHeading: "Ready to plan your Himalayan journey?",
  ctaBody:
    "Tell us your dates, group size, and dream trek — our Kathmandu team will craft a clear, professional itinerary.",
  ctaLabel: "Contact Summit Seek",
  ctaHref: "/contact",
  metaTitle: "About Summit Seek Travels & Tours",
  metaDescription:
    "Learn about Summit Seek Travels & Tours — a Kathmandu-based Himalayan trekking company focused on safety, local expertise, and responsible adventure in Nepal.",
  teamCoverImageUrl:
    "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=2000&q=80",
  teamCoverTitle: "Our Team",
  teamCoverSubtitle:
    "The guides, planners, and mountain professionals behind every Summit Seek journey.",
  teamIntro:
    "Summit Seek is powered by a Kathmandu-based operations team and trusted trail partners across Nepal. Meet the people who plan, guide, and support your Himalayan adventure — from first briefing to safe return.",
  team: Array.from({ length: 8 }, (_, i) => emptyTeamSlot(i)),
  teamMetaTitle: "Our Team | Summit Seek",
  teamMetaDescription:
    "Meet the Summit Seek Travels & Tours team — guides, planners, and mountain professionals in Kathmandu.",
  visionPageCoverTitle: "Our Vision",
  visionPageCoverSubtitle:
    "Exploring new frontiers with safety, culture, and purpose at the center.",
  visionPageBody:
    "Our vision is to show travelers the real Himalayan world — not only famous viewpoints, but also the living cultures, quiet valleys, and carefully planned routes that make Nepal unforgettable.\n\nSafety is always the priority. Detailed preparation, trained guides, and honest communication shape every Summit Seek itinerary. Alongside adventure, we seek balance: meaningful contact with local communities, respect for heritage, and journeys that protect the trails we love.\n\nWhen you travel with Summit Seek Travels & Tours, you join a team committed to excellence on the path and responsibility beyond it.",
  visionMetaTitle: "Our Vision | Summit Seek",
  visionMetaDescription:
    "Discover Summit Seek’s vision for safe, ethical, and unforgettable Himalayan travel in Nepal.",
};

/** Old placeholder headshots — do not resurrect after CMS clear. */
export const LEGACY_DEFAULT_TEAM_IMAGE_URLS = new Set([
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
]);
