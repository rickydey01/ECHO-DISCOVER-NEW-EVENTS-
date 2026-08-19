export interface FeaturedEvent {
  id: number;
  title: string;
  category: string;
  tagline: string;
  description: string;
  date: string;
  fullDate: string;
  time: string;
  venue: string;
  location: string;
  price: string;
  image: string;
  status: "live" | "selling_fast" | "sold_out" | "upcoming";
  lineup: string[];
}
