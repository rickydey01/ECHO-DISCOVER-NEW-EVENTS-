export interface SearchableEvent {
  id: string;
  title: string;
  category: string;
  genre: "MUSIC" | "FESTIVAL" | "NIGHTLIFE" | "TALKS" | "ARTS";
  date: string;
  fullDate?: string;
  time: string;
  venue: string;
  city: string;
  location: string;
  price: string;
  basePrice: number;
  image: string;
  tag: string;
  description: string;
  lineup?: string[];
  isTrending?: boolean;
  isHeadliner?: boolean;
}

export interface SearchCategoryTab {
  id: string;
  label: string;
  genre?: "ALL" | "MUSIC" | "FESTIVAL" | "NIGHTLIFE" | "TALKS" | "ARTS";
}

export interface SearchLocationTab {
  id: string;
  city: string;
}

export interface GlobalLocationItem {
  id: string;
  name: string;
  region: string;
  country: string;
  flag: string;
  eventCount: number;
}
