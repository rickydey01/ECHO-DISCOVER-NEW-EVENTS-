export interface TicketTier {
  name: "GA" | "VIP" | "BACKSTAGE";
  price: number;
  perks: string;
  badge: string;
}

export interface UpcomingEvent {
  id: number;
  title: string;
  category: string;
  description: string;
  date: string;
  day: string;
  time: string;
  venue: string;
  location: string;
  coordinates: string;
  ageRestriction: string;
  image: string;
  status: "live" | "selling_fast" | "sold_out";
  serialNumber: string;
  tiers: TicketTier[];
}
