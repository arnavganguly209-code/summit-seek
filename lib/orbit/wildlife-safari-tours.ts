import { buildSafariPage } from "@/lib/orbit/build-safari-page";

const CHITWAN_INCLUDES = [
  "Private AC vehicle Kathmandu–Chitwan–Kathmandu",
  "Licensed English-speaking naturalist guide",
  "Chitwan National Park entry and conservation fees",
  "Jungle lodge or resort accommodation as listed",
  "All meals on safari days (breakfast, lunch, dinner)",
  "Jeep safari, canoe ride, and village walk as listed",
  "Applicable government taxes as listed",
];

const CHITWAN_EXCLUDES = [
  "International flights and Nepal visa",
  "Travel insurance (mandatory)",
  "Drinks, snacks, and personal shopping",
  "Tips for guide, driver, and lodge staff",
  "Elephant bathing or optional activities not listed",
  "Anything not listed under inclusions",
];

const CHITWAN_EQUIPMENT = [
  {
    title: "Clothing",
    items: [
      "Light breathable layers for warm afternoons",
      "Long sleeves and trousers for evening walks",
      "Neutral colours (khaki, olive, grey)",
      "Light rain jacket in monsoon",
    ],
  },
  {
    title: "Footwear & bag",
    items: [
      "Comfortable walking shoes or trainers",
      "Sandals for lodge downtime",
      "Small daypack for park excursions",
      "Reusable water bottle",
    ],
  },
  {
    title: "Wildlife viewing",
    items: [
      "Binoculars (highly recommended)",
      "Camera with zoom lens",
      "Head torch for evening",
      "Insect repellent",
    ],
  },
  {
    title: "Documents",
    items: [
      "Passport and visa",
      "Summit Seek booking confirmation",
      "Travel insurance policy details",
    ],
  },
];

export const DEFAULT_CHITWAN_JUNGLE_SAFARI = buildSafariPage({
  title: "Chitwan Jungle Safari - 3 Days",
  breadcrumbLabel: "Wildlife Tours · Chitwan",
  regionLabel: "Chitwan National Park",
  coverSubtitle:
    "Three-day Chitwan jungle safari from Kathmandu — jeep drive, dugout canoe, Tharu village walk, and rhino and wildlife viewing in Nepal's premier national park.",
  coverImageId: "photo-1564760055775-d63b17a69df2",
  heroMainImageId: "photo-1564760055775-d63b17a69df2",
  heroSideImage1Id: "photo-1549366021-9f849d740274",
  heroSideImage2Id: "photo-1516426122078-c23e703198bf",
  overviewImageId: "photo-1549366021-9f849d740274",
  gallery: [
    {
      imageId: "photo-1564760055775-d63b17a69df2",
      caption: "Chitwan jungle and grassland safari scenery",
    },
    {
      imageId: "photo-1549366021-9f849d740274",
      caption: "One-horned rhino in Chitwan National Park",
    },
    {
      imageId: "photo-1516426122078-c23e703198bf",
      caption: "Asian elephant in the Terai lowlands",
    },
    {
      imageId: "photo-1534567110280-d5f69265bc38",
      caption: "Riverine forest and wetland habitats",
    },
  ],
  price: 325,
  compareAtPrice: 385,
  discountBadge: "16% OFF",
  groupDiscounts: [
    { paxLabel: "1 pax", price: 385 },
    { paxLabel: "2-3 pax", price: 325 },
    { paxLabel: "4-6 pax", price: 295 },
    { paxLabel: "7+ pax", price: 275 },
  ],
  durationLabel: "3 Days",
  difficultyLabel: "Easy",
  shortTripBadge: "Classic Jungle Safari",
  maxAltitude: "150 m",
  startEnd: "Kathmandu",
  bestSeason: "Oct–Mar (year-round)",
  activities: "Jeep Safari, Canoe & Culture",
  bookingNote:
    "Private departures year-round. Package includes Kathmandu–Chitwan road transfer, park permits, naturalist guide, lodge meals, jeep safari, canoe ride, and village walk. Ideal first wildlife trip in Nepal — family-friendly pacing with lodge comfort.",
  overviewBody:
    "Chitwan Jungle Safari is Nepal's classic three-day wildlife escape into Chitwan National Park — a UNESCO World Heritage Site in the Terai lowlands, home to one-horned rhinos, Bengal tigers, wild elephants, sloth bears, crocodiles, and over 500 bird species.\n\nFrom Kathmandu you drive (or optionally fly) to Sauraha or Meghauli, check into a jungle lodge, and spend a full safari day on jeep drives through sal forest and grassland, a quiet dugout canoe on the Rapti or Narayani, and a Tharu village walk to learn local culture and farming life.\n\nSummit Seek includes permits, guide, lodge accommodation, meals on safari days, and clear group pricing — perfect before or after a Himalayan trek, or as a standalone nature holiday for families and first-time safari travelers.",
  highlights: [
    "Chitwan National Park — UNESCO Terai wildlife sanctuary",
    "Jeep safari for rhino, deer, monkey, and bird sightings",
    "Dugout canoe on the Rapti or Narayani rivers",
    "Tharu village walk and cultural introduction",
    "Licensed naturalist guide and private safari logistics",
    "Jungle lodge accommodation with meals included",
    "Easy road access from Kathmandu (~5–6 hours)",
    "Family-friendly — no strenuous trekking required",
  ],
  whyPoints: [
    "Nepal's most accessible and popular wildlife park",
    "High rhino sighting probability on jeep drives",
    "Blend of adventure, culture, and comfortable lodge stays",
    "Works year-round with best wildlife viewing Oct–Mar",
    "Easy combine with Kathmandu sightseeing or Pokhara",
  ],
  beginnersBody:
    "Yes — graded Easy and ideal for travelers who want wildlife without trekking. Daily activity is light: jeep drives, short walks, and canoe rides. No climbing or altitude concerns.\n\nSuitable for families, seniors, and first-time safari guests. Discuss mobility needs in advance for village walks and canoe boarding. Insect repellent and modest clothing help for evening excursions.",
  prepPoints: [
    "Wear neutral-coloured clothing for wildlife drives",
    "Bring binoculars and a camera with zoom for rhino and birds",
    "Use insect repellent — Terai evenings can be buggy",
    "Pack light rain gear in monsoon (Jun–Sep)",
    "Carry passport copy for park entry registration",
    "Confirm Kathmandu hotel pickup time for road transfer",
  ],
  itineraryHeading: "3-day itinerary",
  itineraryIntro:
    "Typical schedule from Kathmandu hotel pickup to return. Road times vary with traffic and season; optional flights to Bharatpur shorten travel. Your naturalist guide adjusts activities for weather and wildlife movement.",
  days: [
    {
      dayLabel: "Day 1",
      title: "Kathmandu to Chitwan — lodge check-in",
      maxAltitude: "150 m",
      meals: "Lunch, dinner",
      accommodation: "Jungle lodge / resort",
      description:
        "Morning pickup from your Kathmandu hotel (~7:00–8:00 a.m.) for the scenic drive to Chitwan (~5–6 hours via Mugling). Arrive at Sauraha or Meghauli, check into your jungle lodge, and refresh. Afternoon Tharu village walk or sunset riverbank stroll with your guide — introduction to local culture, farming, and the park boundary. Evening briefing on tomorrow's safari schedule. Dinner at the lodge.",
    },
    {
      dayLabel: "Day 2",
      title: "Full safari day — jeep, canoe, and wildlife viewing",
      maxAltitude: "150 m",
      meals: "Breakfast, lunch, dinner",
      accommodation: "Jungle lodge / resort",
      description:
        "Early-morning jeep safari into Chitwan National Park — sal forest, grassland, and riverine corridors for rhino, deer, wild boar, monkeys, and birds (tiger sightings are possible but rare). Return for breakfast at the lodge. Midday rest during heat. Afternoon dugout canoe on the Rapti or Narayani — crocodiles, water birds, and riverside wildlife from the water. Optional visit to the elephant breeding centre or cultural programme. Evening wildlife viewing or relaxed lodge time. Dinner at the lodge.",
    },
    {
      dayLabel: "Day 3",
      title: "Morning activity and return to Kathmandu",
      maxAltitude: "150 m",
      meals: "Breakfast",
      accommodation: "—",
      description:
        "Optional early bird-watching walk or short jeep drive (as lodge schedule allows). Breakfast and checkout. Drive back to Kathmandu (~5–6 hours) with drop at your hotel — end of safari. Traffic and season affect arrival time; plan an evening in Kathmandu or onward travel accordingly.",
    },
  ],
  availabilityBody:
    "Private departures daily year-round. October–March offers cooler mornings and clearer wildlife viewing; April–May is warmer with lush vegetation. Monsoon (Jun–Sep) is wetter but rhinos remain active and lodges are quieter.",
  availabilityNotes: [
    "Private groups of any size",
    "Optional Bharatpur flight instead of road (surcharge)",
    "Festival and holiday periods — book lodges early",
    "Combine with Bardiya or Koshi Tappu for multi-park itineraries",
  ],
  addons: [
    {
      title: "Bharatpur flight upgrade",
      description: "Skip the road — fly Kathmandu–Bharatpur with lodge transfer.",
      priceLabel: "On request",
    },
    {
      title: "Elephant breeding centre visit",
      description: "Dedicated visit to the park's elephant conservation facility.",
      priceLabel: "On request",
    },
    {
      title: "Tharu cultural dance evening",
      description: "Traditional dance performance at a local cultural centre.",
      priceLabel: "On request",
    },
  ],
  includes: CHITWAN_INCLUDES,
  excludes: CHITWAN_EXCLUDES,
  essentialBlocks: [
    {
      title: "Best season",
      body: "October–March is peak — cool mornings and active wildlife. April–May is warm and green. Monsoon (Jun–Sep) is wet but rewarding for birders and quieter lodge stays.",
    },
    {
      title: "Wildlife expectations",
      body: "One-horned rhino sightings are common on jeep drives. Bengal tiger, leopard, and sloth bear are present but elusive — your guide focuses on ethical viewing without guarantees.",
    },
    {
      title: "Park permits",
      body: "Chitwan National Park entry and conservation fees are included as listed. Your guide handles registration at the park gate.",
    },
    {
      title: "Getting there",
      body: "Road transfer from Kathmandu (~5–6 hours) is standard. Optional flights to Bharatpur reduce travel to ~25 minutes plus a short lodge transfer.",
    },
  ],
  equipmentGroups: CHITWAN_EQUIPMENT,
  faqs: [
    {
      question: "What wildlife can I see in Chitwan?",
      answer:
        "Rhino, deer, wild boar, monkeys, crocodiles, and hundreds of bird species are commonly seen. Tiger, leopard, and sloth bear live in the park but sightings are rare and never guaranteed.",
    },
    {
      question: "How long is the drive from Kathmandu?",
      answer:
        "About 5–6 hours by private vehicle depending on traffic. Optional flights to Bharatpur take ~25 minutes with a short transfer to your lodge.",
    },
    {
      question: "Is the jeep safari included?",
      answer:
        "Yes — a full-day programme with jeep safari, canoe ride, and village walk is included as listed in this package.",
    },
    {
      question: "What is the group discount pricing?",
      answer:
        "US$385 for 1 pax, US$325 for 2–3 pax, US$295 for 4–6 pax, and US$275 for 7+ pax. The listing price reflects the 2–3 pax rate.",
    },
    {
      question: "Is this safari suitable for children?",
      answer:
        "Yes — Chitwan is one of Nepal's most family-friendly wildlife trips. Jeep drives and lodge stays suit children; discuss ages and pacing with us when booking.",
    },
    {
      question: "Are meals included?",
      answer:
        "Breakfast, lunch, and dinner are included on safari days at the lodge as per the itinerary. Drinks and snacks outside meals are on your own.",
    },
  ],
  ctaHeading: "Ready for Chitwan jungle safari?",
  metaTitle: "Chitwan Jungle Safari 3 Days | Summit Seek",
  metaDescription:
    "Book 3-day Chitwan Jungle Safari — rhino jeep drive, canoe, Tharu village, lodge meals & group rates from US$275. Nepal's classic Terai wildlife trip.",
  reviewCount: 18,
});

export const DEFAULT_BARDIYA_JUNGLE_SAFARI = buildSafariPage({
  title: "Bardiya National Park Safari - 4 Days",
  breadcrumbLabel: "Wildlife Tours · Bardiya",
  regionLabel: "Bardiya National Park",
  coverSubtitle:
    "Four-day Bardiya safari for serious wildlife lovers — remote Terai park with strong tiger and rhino habitat, jeep drives, and quiet jungle walking in western Nepal.",
  coverImageId: "photo-1549366021-9f849d740274",
  heroMainImageId: "photo-1549366021-9f849d740274",
  heroSideImage1Id: "photo-1564760055775-d63b17a69df2",
  heroSideImage2Id: "photo-1534567110280-d5f69265bc38",
  overviewImageId: "photo-1564760055775-d63b17a69df2",
  gallery: [
    {
      imageId: "photo-1549366021-9f849d740274",
      caption: "Rhino habitat in Bardiya's Terai grasslands",
    },
    {
      imageId: "photo-1564760055775-d63b17a69df2",
      caption: "Sal forest and riverine jungle corridors",
    },
    {
      imageId: "photo-1534567110280-d5f69265bc38",
      caption: "Wetland and river ecosystems",
    },
    {
      imageId: "photo-1516426122078-c23e703198bf",
      caption: "Terai lowland wildlife sanctuary",
    },
  ],
  price: 495,
  compareAtPrice: 575,
  discountBadge: "14% OFF",
  groupDiscounts: [
    { paxLabel: "1 pax", price: 575 },
    { paxLabel: "2-3 pax", price: 495 },
    { paxLabel: "4-6 pax", price: 455 },
    { paxLabel: "7+ pax", price: 425 },
  ],
  durationLabel: "4 Days",
  difficultyLabel: "Easy",
  shortTripBadge: "Tiger & Rhino Focus",
  maxAltitude: "150 m",
  startEnd: "Kathmandu",
  bestSeason: "Oct–Apr",
  activities: "Jeep Safari & Jungle Walk",
  bookingNote:
    "Four-day Bardiya programme with Kathmandu flights or road transfer, park permits, naturalist guide, lodge accommodation, and multiple safari activities. Bardiya is quieter than Chitwan — best for travelers prioritizing tiger and rhino habitat with fewer crowds.",
  overviewBody:
    "Bardiya National Park Safari is a four-day journey into western Nepal's largest and least crowded Terai wilderness — a stronghold for Bengal tiger, one-horned rhino, wild elephant, swamp deer, and Gangetic dolphin in the Karnali River system.\n\nUnlike busier parks, Bardiya offers a more remote feel: long jeep drives through sal forest and grassland, guided jungle walks with armed park staff, river viewing, and Tharu community culture in a quieter setting. Tiger sightings are still never guaranteed, but Bardiya consistently ranks among Nepal's best tiger habitats.\n\nSummit Seek includes domestic flights or road transfer as listed, park permits, naturalist guide, lodge meals, and clear group pricing — ideal for wildlife enthusiasts who have already visited Chitwan or want a deeper Terai experience.",
  highlights: [
    "Bardiya National Park — Nepal's largest Terai wilderness",
    "Prime Bengal tiger and one-horned rhino habitat",
    "Multiple jeep safaris and guided jungle walks",
    "Karnali River dolphins and riverside birdlife",
    "Quieter, less commercial than Chitwan",
    "Tharu village culture in western Terai",
    "Licensed naturalist guide and park permits included",
    "Four full days for better wildlife odds",
  ],
  whyPoints: [
    "One of Nepal's best tiger-focused parks",
    "Less tourist traffic than Chitwan — more immersive feel",
    "Four days allow repeat drives at peak wildlife hours",
    "Strong rhino population in grassland and forest mosaic",
    "Ideal second safari for repeat Nepal visitors",
  ],
  beginnersBody:
    "Yes — graded Easy overall, though jungle walks require moderate fitness and comfort walking 2–3 hours on flat terrain. Jeep safaris suit all ages. Guided walks are optional and conducted with park rangers.\n\nNot recommended for severe mobility limitations. Bardiya's remoteness means longer travel — plan accordingly.",
  prepPoints: [
    "Expect longer travel to western Nepal — flights or full-day road",
    "Neutral clothing and sturdy walking shoes for jungle walks",
    "Binoculars essential — wildlife is often at distance",
    "Insect repellent and sun protection for Terai heat",
    "Patience for tiger viewing — early mornings are key",
    "Travel insurance covering medical evacuation is mandatory",
  ],
  itineraryHeading: "4-day itinerary",
  itineraryIntro:
    "Schedule from Kathmandu with domestic flight to Nepalgunj (preferred) or road transfer. Activities adjust for weather, park rules, and wildlife patterns. Jungle walks require park ranger escort.",
  days: [
    {
      dayLabel: "Day 1",
      title: "Kathmandu to Bardiya — lodge arrival",
      maxAltitude: "150 m",
      meals: "Lunch, dinner",
      accommodation: "Jungle lodge / resort",
      description:
        "Morning flight Kathmandu–Nepalgunj (~1 hour) or long road transfer, then drive to Bardiya lodge (~2 hours from Nepalgunj). Check in, lunch, and rest. Afternoon Tharu village visit or short riverbank walk. Evening safari briefing with your naturalist guide. Dinner at the lodge.",
    },
    {
      dayLabel: "Day 2",
      title: "Full-day jeep safari — tiger and rhino habitat",
      maxAltitude: "150 m",
      meals: "Breakfast, lunch, dinner",
      accommodation: "Jungle lodge / resort",
      description:
        "Early-morning jeep safari into Bardiya National Park — sal forest, grassland, and riverine corridors. Focus on rhino, deer, wild boar, monkeys, and birdlife; tiger movement is tracked when possible. Return for breakfast. Midday rest. Afternoon second jeep drive or river viewing for dolphins and water birds. Dinner at the lodge.",
    },
    {
      dayLabel: "Day 3",
      title: "Jungle walk and wildlife drives",
      maxAltitude: "150 m",
      meals: "Breakfast, lunch, dinner",
      accommodation: "Jungle lodge / resort",
      description:
        "Morning guided jungle walk with park ranger — on-foot wildlife tracking through forest trails (flat terrain, 2–3 hours). Return for breakfast. Afternoon jeep safari or canoe/river activity as lodge programme allows. Evening optional cultural programme or relaxed lodge time. Dinner at the lodge.",
    },
    {
      dayLabel: "Day 4",
      title: "Morning safari and return to Kathmandu",
      maxAltitude: "150 m",
      meals: "Breakfast",
      accommodation: "—",
      description:
        "Optional early jeep drive or bird-watching walk. Breakfast and checkout. Drive to Nepalgunj airport for afternoon flight to Kathmandu, or road transfer as booked. Hotel drop in Kathmandu — end of safari.",
    },
  ],
  availabilityBody:
    "Best wildlife viewing October–April with cool mornings. May is hot; monsoon (Jun–Sep) closes some trails but park access continues with adjusted programmes. Bardiya lodges are fewer — book ahead in peak season.",
  availabilityNotes: [
    "Flights to Nepalgunj recommended over road",
    "Jungle walks require park ranger escort — included",
    "Tiger sightings never guaranteed — ethical viewing only",
    "Combine with Chitwan or Koshi Tappu for multi-park trip",
  ],
  addons: [
    {
      title: "Extra jeep safari day",
      description: "Add a fifth day with additional morning and afternoon drives.",
      priceLabel: "On request",
    },
    {
      title: "Karnali River fishing trip",
      description: "Guided fishing excursion on the Karnali (seasonal).",
      priceLabel: "On request",
    },
    {
      title: "Chitwan extension",
      description: "Continue to Chitwan National Park after Bardiya.",
      priceLabel: "On request",
    },
  ],
  includes: [
    "Kathmandu–Nepalgunj–Kathmandu airfare (or road transfer as listed)",
    "Nepalgunj–Bardiya lodge transfers",
    "Licensed English-speaking naturalist guide",
    "Bardiya National Park entry and conservation fees",
    "Jungle lodge accommodation as listed",
    "All meals on safari days",
    "Jeep safaris and guided jungle walk with ranger",
    "Applicable government taxes as listed",
  ],
  excludes: [
    "International flights and Nepal visa",
    "Travel insurance (mandatory)",
    "Drinks, snacks, and personal shopping",
    "Tips for guide, driver, ranger, and lodge staff",
    "Optional activities not listed",
    "Anything not listed under inclusions",
  ],
  essentialBlocks: [
    {
      title: "Tiger viewing",
      body: "Bardiya is among Nepal's best tiger habitats, but sightings are never guaranteed. Early-morning and late-afternoon drives offer the best odds. Ethical viewing — no chasing or crowding.",
    },
    {
      title: "Best season",
      body: "October–April for cooler weather and active wildlife. March–April offers new grass and tiger movement. Monsoon is wetter with lush forest and fewer visitors.",
    },
    {
      title: "Remote location",
      body: "Bardiya is farther west than Chitwan. Flights to Nepalgunj plus a 2-hour drive are standard. Road travel from Kathmandu is possible but long (~12+ hours).",
    },
    {
      title: "Jungle walks",
      body: "Guided walks with armed park rangers are included. Flat terrain but 2–3 hours on foot — moderate fitness recommended. Alternative jeep drives available if preferred.",
    },
  ],
  equipmentGroups: CHITWAN_EQUIPMENT,
  faqs: [
    {
      question: "Why choose Bardiya over Chitwan?",
      answer:
        "Bardiya is quieter, larger, and considered stronger tiger habitat with fewer tourists. Chitwan is more accessible and rhino-focused. Many travelers visit both.",
    },
    {
      question: "Will I see a tiger?",
      answer:
        "Tiger sightings are possible but never guaranteed. Bardiya offers among the best odds in Nepal — your guide focuses on ethical tracking without guarantees.",
    },
    {
      question: "How do I get to Bardiya?",
      answer:
        "Fly Kathmandu–Nepalgunj (~1 hour) then drive ~2 hours to the lodge. Road transfer from Kathmandu is possible but very long.",
    },
    {
      question: "What is the group discount pricing?",
      answer:
        "US$575 for 1 pax, US$495 for 2–3 pax, US$455 for 4–6 pax, and US$425 for 7+ pax. Listing price reflects the 2–3 pax rate.",
    },
    {
      question: "Are jungle walks safe?",
      answer:
        "Yes — walks are led by licensed park rangers with firearms for safety. Routes are flat forest trails; you follow guide instructions at all times.",
    },
    {
      question: "Is Bardiya good for rhino too?",
      answer:
        "Yes — Bardiya has a healthy rhino population. Jeep drives through grassland and forest mosaic offer regular rhino sightings alongside other wildlife.",
    },
  ],
  ctaHeading: "Ready for Bardiya tiger safari?",
  metaTitle: "Bardiya National Park Safari 4 Days | Summit Seek",
  metaDescription:
    "Book 4-day Bardiya Safari — tiger & rhino habitat, jeep drives, jungle walks, lodge meals & group rates from US$425. Western Nepal's premier wildlife park.",
  reviewCount: 9,
});

export const DEFAULT_KOSHI_TAPPU_SAFARI = buildSafariPage({
  title: "Koshi Tappu Bird Watching Safari - 3 Days",
  breadcrumbLabel: "Wildlife Tours · Koshi Tappu",
  regionLabel: "Koshi Tappu Wildlife Reserve",
  coverSubtitle:
    "Three-day Koshi Tappu birding safari — wetlands, migratory waterbirds, swamp francolin, and Bengal florican in Nepal's premier bird sanctuary of the eastern Terai.",
  coverImageId: "photo-1534567110280-d5f69265bc38",
  heroMainImageId: "photo-1534567110280-d5f69265bc38",
  heroSideImage1Id: "photo-1549366021-9f849d740274",
  heroSideImage2Id: "photo-1564760055775-d63b17a69df2",
  overviewImageId: "photo-1534567110280-d5f69265bc38",
  gallery: [
    {
      imageId: "photo-1534567110280-d5f69265bc38",
      caption: "Koshi Tappu wetlands and marsh habitat",
    },
    {
      imageId: "photo-1549366021-9f849d740274",
      caption: "Waterbirds on the Koshi floodplain",
    },
    {
      imageId: "photo-1564760055775-d63b17a69df2",
      caption: "Terai grassland and riverine scenery",
    },
    {
      imageId: "photo-1516426122078-c23e703198bf",
      caption: "Eastern Nepal wildlife reserve",
    },
  ],
  price: 310,
  compareAtPrice: 365,
  discountBadge: "15% OFF",
  groupDiscounts: [
    { paxLabel: "1 pax", price: 365 },
    { paxLabel: "2-3 pax", price: 310 },
    { paxLabel: "4-6 pax", price: 285 },
    { paxLabel: "7+ pax", price: 265 },
  ],
  durationLabel: "3 Days",
  difficultyLabel: "Easy",
  shortTripBadge: "Birding & Wetlands",
  maxAltitude: "100 m",
  startEnd: "Kathmandu",
  bestSeason: "Nov–Mar (birding peak)",
  activities: "Birding, Canoe & Wetlands",
  bookingNote:
    "Three-day Koshi Tappu programme for birders and nature lovers — wetland walks, jeep drives, canoe rides, and expert naturalist guiding. Peak migratory season November–March. Binoculars strongly recommended.",
  overviewBody:
    "Koshi Tappu Bird Watching Safari is a three-day immersion in Nepal's finest wetland bird sanctuary — Koshi Tappu Wildlife Reserve on the Sapta Koshi floodplain in eastern Terai. The reserve protects over 500 bird species, including migratory waterfowl, swamp francolin, Bengal florican, and rare waders that draw birders from around the world.\n\nBeyond birds, the reserve hosts wild buffalo (arnai), deer, crocodiles, and Gangetic dolphins in the Koshi River. Activities include early-morning bird walks, jeep drives through grassland and marsh, dugout canoe on quiet channels, and village visits in the eastern Terai.\n\nSummit Seek includes permits, naturalist guide, lodge accommodation, meals, and clear group pricing — perfect for dedicated birders, photographers, and travelers seeking a quieter alternative to Chitwan's jeep-safari focus.",
  highlights: [
    "Koshi Tappu Wildlife Reserve — 500+ bird species",
    "Migratory waterbirds November–March peak season",
    "Bengal florican, swamp francolin, and rare waders",
    "Wetland canoe rides and marsh walking trails",
    "Wild buffalo (arnai) and Gangetic dolphin habitat",
    "Licensed naturalist guide with birding expertise",
    "Quieter eastern Terai — ideal for photographers",
    "Three days focused on dawn and dusk birding windows",
  ],
  whyPoints: [
    "Nepal's premier dedicated birding destination",
    "Migratory season brings exceptional waterbird diversity",
    "Less crowded than Chitwan — peaceful wetland atmosphere",
    "Combines birding with gentle canoe and jeep activities",
    "Ideal extension after eastern Nepal treks or city tours",
  ],
  beginnersBody:
    "Yes — graded Easy with flat wetland terrain. Bird walks are slow-paced with frequent stops. No trekking or altitude. Ideal for birders of all experience levels.\n\nBring binoculars — essential for this trip. Early mornings (dawn) are key for peak bird activity; expect 5:30–6:00 a.m. starts on birding days.",
  prepPoints: [
    "Bring quality binoculars (8x42 recommended) and bird field guide",
    "Camera with telephoto lens for waterbird photography",
    "Neutral clothing and waterproof boots for marsh walks",
    "Insect repellent for wetland mornings",
    "Notebook or birding app for species logging",
    "Patience for dawn starts — best birding is early",
  ],
  itineraryHeading: "3-day itinerary",
  itineraryIntro:
    "Birding-focused schedule with dawn and dusk activity windows. Migratory peak November–March; resident species year-round. Your naturalist guide adjusts routes for tides, weather, and recent sightings.",
  days: [
    {
      dayLabel: "Day 1",
      title: "Kathmandu to Koshi Tappu — lodge arrival",
      maxAltitude: "100 m",
      meals: "Lunch, dinner",
      accommodation: "Lodge / tented camp",
      description:
        "Morning flight Kathmandu–Biratnagar (~45 min) or road transfer, then drive to Koshi Tappu lodge (~1.5 hours). Check in and lunch. Afternoon introductory wetland walk or short jeep drive — first waterbird sightings, waders, and egrets. Evening birding briefing. Dinner at the lodge.",
    },
    {
      dayLabel: "Day 2",
      title: "Full birding day — wetlands, canoe, and grassland",
      maxAltitude: "100 m",
      meals: "Breakfast, lunch, dinner",
      accommodation: "Lodge / tented camp",
      description:
        "Pre-dawn bird walk (~5:30 a.m.) — peak activity for francolin, florican, and migratory species. Return for breakfast. Midday rest. Afternoon dugout canoe on quiet channels — waterbirds, herons, storks, and riverside wildlife. Late-afternoon grassland jeep drive for arnai (wild buffalo) and open-country birds. Dinner at the lodge.",
    },
    {
      dayLabel: "Day 3",
      title: "Morning birding and return to Kathmandu",
      maxAltitude: "100 m",
      meals: "Breakfast",
      accommodation: "—",
      description:
        "Final early-morning bird walk targeting species missed on previous days. Breakfast and checkout. Drive to Biratnagar for afternoon flight to Kathmandu, or road transfer as booked. Hotel drop — end of safari.",
    },
  ],
  availabilityBody:
    "Peak birding November–March when migratory waterfowl arrive. Resident species year-round. Monsoon (Jun–Sep) is wet but rewarding for local breeders and lush wetland scenery.",
  availabilityNotes: [
    "Dawn starts essential for best birding",
    "Binoculars not provided — bring your own",
    "Biratnagar flights recommended over long road",
    "Combine with Chitwan for birds-plus-rhino itinerary",
  ],
  addons: [
    {
      title: "Extra birding day",
      description: "Add a fourth day for extended dawn and dusk sessions.",
      priceLabel: "On request",
    },
    {
      title: "Koshi River dolphin boat trip",
      description: "Dedicated boat excursion for Gangetic dolphin viewing.",
      priceLabel: "On request",
    },
    {
      title: "Chitwan rhino extension",
      description: "Continue to Chitwan for jeep safari after birding.",
      priceLabel: "On request",
    },
  ],
  includes: [
    "Kathmandu–Biratnagar–Kathmandu airfare (or road as listed)",
    "Biratnagar–Koshi Tappu lodge transfers",
    "Licensed English-speaking naturalist / birding guide",
    "Koshi Tappu Wildlife Reserve entry fees",
    "Lodge or tented camp accommodation",
    "All meals on safari days",
    "Jeep drives, canoe, and wetland walks as listed",
    "Applicable government taxes as listed",
  ],
  excludes: [
    "International flights and Nepal visa",
    "Travel insurance (mandatory)",
    "Binoculars and birding equipment",
    "Drinks, snacks, and personal shopping",
    "Tips for guide, driver, and lodge staff",
    "Anything not listed under inclusions",
  ],
  essentialBlocks: [
    {
      title: "Birding season",
      body: "November–March is peak for migratory waterfowl from Tibet and the Himalaya. April–May offers breeding displays. Resident species present year-round.",
    },
    {
      title: "Key species",
      body: "Bengal florican, swamp francolin, various storks, herons, eagles, and hundreds of waders. Over 500 species recorded in the reserve.",
    },
    {
      title: "Wetland terrain",
      body: "Flat marsh and grassland — waterproof footwear helps. Canoe and jeep access reduce walking distance on some routes.",
    },
    {
      title: "Photography",
      body: "Telephoto lens (300mm+) recommended for waterbirds. Dawn light is best — plan for early starts and still mornings.",
    },
  ],
  equipmentGroups: [
    {
      title: "Birding gear",
      items: [
        "Binoculars (8x42 or similar — essential)",
        "Bird field guide for South Asia",
        "Telephoto camera lens",
        "Notebook or birding app",
      ],
    },
    {
      title: "Clothing",
      items: [
        "Neutral layers for dawn chill and midday heat",
        "Long trousers for marsh walks",
        "Light rain jacket in monsoon",
        "Wide-brim hat and sunglasses",
      ],
    },
    {
      title: "Footwear & protection",
      items: [
        "Comfortable walking shoes",
        "Waterproof boots for wetland trails",
        "Insect repellent",
        "Sunscreen",
      ],
    },
    {
      title: "Documents",
      items: [
        "Passport and visa",
        "Summit Seek booking confirmation",
        "Travel insurance details",
      ],
    },
  ],
  faqs: [
    {
      question: "When is the best time for birding?",
      answer:
        "November–March is peak migratory season with the greatest waterbird diversity. Resident species are present year-round; dawn is always the best viewing window.",
    },
    {
      question: "Do I need to be an expert birder?",
      answer:
        "No — the naturalist guide helps identify species. Enthusiasm matters more than expertise. Bring binoculars and a field guide if you have them.",
    },
    {
      question: "What birds are the main targets?",
      answer:
        "Bengal florican, swamp francolin, various storks and herons, migratory ducks and waders, and raptors over the grassland. Over 500 species are recorded in the reserve.",
    },
    {
      question: "What is the group discount pricing?",
      answer:
        "US$365 for 1 pax, US$310 for 2–3 pax, US$285 for 4–6 pax, and US$265 for 7+ pax. Listing price reflects the 2–3 pax rate.",
    },
    {
      question: "Are binoculars provided?",
      answer:
        "No — bring your own binoculars. They are essential for this trip. 8x42 is a good all-round choice for wetland birding.",
    },
    {
      question: "Can I combine with Chitwan?",
      answer:
        "Yes — many birders add Chitwan for rhino jeep safari after Koshi Tappu. Ask us for a combined quote.",
    },
  ],
  ctaHeading: "Ready for Koshi Tappu birding?",
  metaTitle: "Koshi Tappu Bird Watching Safari 3 Days | Summit Seek",
  metaDescription:
    "Book 3-day Koshi Tappu Bird Safari — wetlands, 500+ species, canoe, lodge meals & group rates from US$265. Nepal's premier eastern Terai bird sanctuary.",
  reviewCount: 7,
});

export const DEFAULT_CHITWAN_WILDLIFE_LODGE_SAFARI = buildSafariPage({
  title: "Chitwan Wildlife Lodge Safari - 2 Days",
  breadcrumbLabel: "Wildlife Tours · Chitwan Express",
  regionLabel: "Chitwan National Park",
  coverSubtitle:
    "Two-day express Chitwan safari — quick Kathmandu getaway with lodge stay, jeep drive, and rhino viewing in Nepal's most popular wildlife park.",
  coverImageId: "photo-1516426122078-c23e703198bf",
  heroMainImageId: "photo-1516426122078-c23e703198bf",
  heroSideImage1Id: "photo-1564760055775-d63b17a69df2",
  heroSideImage2Id: "photo-1549366021-9f849d740274",
  overviewImageId: "photo-1516426122078-c23e703198bf",
  gallery: [
    {
      imageId: "photo-1516426122078-c23e703198bf",
      caption: "Terai wildlife and jungle lodge atmosphere",
    },
    {
      imageId: "photo-1564760055775-d63b17a69df2",
      caption: "Chitwan sal forest safari drives",
    },
    {
      imageId: "photo-1549366021-9f849d740274",
      caption: "Rhino viewing in Chitwan grasslands",
    },
    {
      imageId: "photo-1534567110280-d5f69265bc38",
      caption: "River and wetland ecosystems",
    },
  ],
  price: 245,
  compareAtPrice: 290,
  discountBadge: "16% OFF",
  groupDiscounts: [
    { paxLabel: "1 pax", price: 290 },
    { paxLabel: "2-3 pax", price: 245 },
    { paxLabel: "4-6 pax", price: 225 },
    { paxLabel: "7+ pax", price: 210 },
  ],
  durationLabel: "2 Days",
  difficultyLabel: "Easy",
  shortTripBadge: "Express Safari",
  maxAltitude: "150 m",
  startEnd: "Kathmandu",
  bestSeason: "Oct–Mar (year-round)",
  activities: "Jeep Safari & Lodge Stay",
  bookingNote:
    "Short two-day Chitwan express — ideal for travelers with limited time who still want a real jungle lodge experience and rhino jeep safari. Includes transfer, permits, guide, one full safari day, and lodge meals.",
  overviewBody:
    "Chitwan Wildlife Lodge Safari is the popular express option for Kathmandu-based travelers and trek returnees who want a quick wildlife hit without a full three-day commitment. You drive to Chitwan, overnight in a jungle lodge, and enjoy a full safari day with jeep drive, canoe or village walk, and rhino-focused wildlife viewing.\n\nThis compressed itinerary sacrifices the third travel day of the classic package but keeps the core Chitwan experience: park permits, naturalist guide, lodge comfort, and Terai wildlife in Nepal's most accessible national park.\n\nSummit Seek includes road transfer, permits, guide, lodge accommodation, meals, and clear group pricing — perfect as a weekend escape or trek buffer day.",
  highlights: [
    "Express 2-day format — minimal time away from Kathmandu",
    "Full safari day with jeep drive and rhino viewing",
    "Jungle lodge overnight with meals included",
    "Chitwan National Park entry and permits",
    "Licensed naturalist guide",
    "Canoe ride or village walk as lodge programme allows",
    "Family-friendly and beginner-appropriate",
    "Most affordable Chitwan safari option",
  ],
  whyPoints: [
    "Best value for a quick Chitwan wildlife experience",
    "Ideal weekend or post-trek buffer trip",
    "Same rhino habitat as longer packages",
    "Lodge comfort without a third travel day",
    "Easy upgrade to 3-day classic safari if time allows",
  ],
  beginnersBody:
    "Yes — the easiest Chitwan option with minimal travel days. One full safari day with jeep and gentle activities. Suitable for all ages and fitness levels. Perfect first wildlife trip in Nepal.",
  prepPoints: [
    "Pack an overnight bag — leave main luggage in Kathmandu if preferred",
    "Neutral clothing for jeep safari",
    "Binoculars and camera for rhino and bird sightings",
    "Insect repellent for Terai evenings",
    "Confirm early pickup for same-day lodge arrival",
    "Plan a relaxed evening in Kathmandu after return drive",
  ],
  itineraryHeading: "2-day itinerary",
  itineraryIntro:
    "Compressed schedule maximising safari time. Day 1 is travel plus lodge arrival; Day 2 is full safari then return. Optional Bharatpur flight upgrade shortens travel on both days.",
  days: [
    {
      dayLabel: "Day 1",
      title: "Kathmandu to Chitwan — lodge check-in",
      maxAltitude: "150 m",
      meals: "Lunch, dinner",
      accommodation: "Jungle lodge / resort",
      description:
        "Early morning pickup from Kathmandu hotel (~7:00 a.m.) for drive to Chitwan (~5–6 hours). Arrive at lodge, lunch, and check in. Afternoon Tharu village walk or sunset riverbank stroll. Evening safari briefing. Dinner at the lodge.",
    },
    {
      dayLabel: "Day 2",
      title: "Full safari day and return to Kathmandu",
      maxAltitude: "150 m",
      meals: "Breakfast, lunch",
      accommodation: "—",
      description:
        "Early-morning jeep safari into Chitwan National Park — rhino, deer, monkeys, and birds in sal forest and grassland. Return for breakfast. Morning canoe ride or village activity as lodge schedule allows. Lunch and checkout. Drive back to Kathmandu (~5–6 hours) with hotel drop — end of express safari.",
    },
  ],
  availabilityBody:
    "Daily departures year-round. October–March offers the best wildlife viewing weather. Express format suits weekend travellers — depart Friday, return Saturday evening or Sunday.",
  availabilityNotes: [
    "Most popular short safari from Kathmandu",
    "Upgrade to 3-day classic for canoe-focused second day",
    "Bharatpur flight option reduces travel time",
    "Book ahead for weekends and holiday periods",
  ],
  addons: [
    {
      title: "Upgrade to 3-day classic",
      description: "Add a third day with return travel on Day 3 for a fuller programme.",
      priceLabel: "On request",
    },
    {
      title: "Bharatpur flight upgrade",
      description: "Fly Kathmandu–Bharatpur both ways to maximise safari time.",
      priceLabel: "On request",
    },
    {
      title: "Cultural dance evening",
      description: "Tharu cultural programme on Day 1 evening.",
      priceLabel: "On request",
    },
  ],
  includes: [
    "Private AC vehicle Kathmandu–Chitwan–Kathmandu",
    "Licensed English-speaking naturalist guide",
    "Chitwan National Park entry and conservation fees",
    "Jungle lodge accommodation (1 night)",
    "Meals as listed (lunch, dinner Day 1; breakfast, lunch Day 2)",
    "Jeep safari and canoe or village activity as listed",
    "Applicable government taxes as listed",
  ],
  excludes: [
    "International flights and Nepal visa",
    "Travel insurance (mandatory)",
    "Drinks, snacks, and personal shopping",
    "Tips for guide, driver, and lodge staff",
    "Dinner on return day in Kathmandu",
    "Anything not listed under inclusions",
  ],
  essentialBlocks: [
    {
      title: "Express format",
      body: "Two days total including travel. One full safari day in the park — ideal for time-limited travellers. Upgrade to 3-day for a relaxed return and extra activities.",
    },
    {
      title: "Best season",
      body: "October–March for cool mornings and active wildlife. Year-round rhino sightings on jeep drives.",
    },
    {
      title: "Travel time",
      body: "Expect ~5–6 hours each way by road. Bharatpur flights (~25 min) available as upgrade to save time.",
    },
    {
      title: "What you miss vs 3-day",
      body: "The 3-day package adds a second full safari morning and separate return travel day. This express keeps the core jeep and canoe experience in one intensive safari day.",
    },
  ],
  equipmentGroups: CHITWAN_EQUIPMENT,
  faqs: [
    {
      question: "Is 2 days enough for Chitwan?",
      answer:
        "Yes for a first taste — you get one full safari day with jeep drive and rhino viewing. The 3-day classic adds a second morning and more relaxed pacing.",
    },
    {
      question: "What is included in the express safari?",
      answer:
        "Transfer, lodge (1 night), meals as listed, park permits, guide, jeep safari, and canoe or village activity on safari day.",
    },
    {
      question: "What is the group discount pricing?",
      answer:
        "US$290 for 1 pax, US$245 for 2–3 pax, US$225 for 4–6 pax, and US$210 for 7+ pax. Listing price reflects the 2–3 pax rate.",
    },
    {
      question: "Can I fly instead of driving?",
      answer:
        "Yes — Bharatpur flights are available as an upgrade on request. This shortens travel and adds more time at the lodge.",
    },
    {
      question: "Is this good for families?",
      answer:
        "Yes — the express format suits families with limited holiday time. Jeep safaris are comfortable for children; discuss ages when booking.",
    },
    {
      question: "When do we return to Kathmandu?",
      answer:
        "Typically late afternoon or evening on Day 2 after the safari and drive back. Traffic affects exact arrival — plan a relaxed evening.",
    },
  ],
  ctaHeading: "Ready for express Chitwan safari?",
  metaTitle: "Chitwan Wildlife Lodge Safari 2 Days | Summit Seek",
  metaDescription:
    "Book 2-day Chitwan Express Safari — rhino jeep drive, lodge stay, meals & group rates from US$210. Quick Kathmandu wildlife getaway.",
  reviewCount: 14,
});
