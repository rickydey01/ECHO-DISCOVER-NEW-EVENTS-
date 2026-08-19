export interface CategoryNavTab {
  id: string;
  name: string;
  count: string;
  tagline: string;
  description: string;
}

export const categoryNavTabs: CategoryNavTab[] = [
  {
    id: "ALL",
    name: "All Universes",
    count: "03 Showcases",
    tagline: "The Full Spectrum",
    description: "Curated live music, underground club sanctuaries, and open air gatherings across the region.",
  },
  {
    id: "MUSIC",
    name: "Live Music",
    count: "01 Showcase",
    tagline: "Acoustic to Heavy Amplified",
    description: "Intimate artist sessions, stadium arenas, and transcendent live bands.",
  },
  {
    id: "NIGHTLIFE",
    name: "After Hours & Clubs",
    count: "01 Showcase",
    tagline: "Bass, Neon & Shadows",
    description: "Underground warehouse sets, rooftop lounges, and late-night electronic pulses.",
  },
  {
    id: "FESTIVAL",
    name: "Open Air & Festivals",
    count: "01 Showcase",
    tagline: "Multi-Stage Gatherings",
    description: "Multi-day open-air celebrations of art, food, frequency, and community.",
  },
];

export interface CategoryEvent {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  category: "MUSIC" | "FESTIVAL" | "NIGHTLIFE";
  date: string;
  time: string;
  place: string;
  venue: string;
  price: string;
  image: string;
  tag: string;
}

export const curatedCategoryEvents: CategoryEvent[] = [
  {
    id: "cat-01",
    num: "01",
    title: "NEON NIGHTS",
    subtitle: "High-voltage synth wave & visual overdrive",
    category: "MUSIC",
    date: "24 AUG 2026",
    time: "08:00 PM",
    place: "Guwahati",
    venue: "Echo Arena Main Hall",
    price: "₹899",
    image: "/images/events/event15.webp",
    tag: "LIVE MUSIC",
  },
  {
    id: "cat-02",
    num: "02",
    title: "GARBA UNDERGROUND",
    subtitle: "Late night underground frequencies and strobe tunnels",
    category: "NIGHTLIFE",
    date: "31 AUG 2026",
    time: "10:00 PM",
    place: "Shillong",
    venue: "Skyline Underground Club",
    price: "₹699",
    image: "/images/events/event2.webp",
    tag: "CLUB NIGHT",
  },
  {
    id: "cat-03",
    num: "03",
    title: "ECHO OPEN AIR",
    subtitle: "Three days of transcendent sound & food",
    category: "FESTIVAL",
    date: "07 SEP 2026",
    time: "03:00 PM",
    place: "Jorhat",
    venue: "Tea Garden Amphitheatre",
    price: "₹1,499",
    image: "/images/events/event17.webp",
    tag: "OPEN AIR",
  },
];
