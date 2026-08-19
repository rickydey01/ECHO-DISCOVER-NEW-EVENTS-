export interface BookingState {
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  image: string;
  basePrice: number;
  initialTier?: "GA" | "VIP" | "BACKSTAGE";
}

export interface UserPass {
  id: string;
  serialNumber: string;
  eventTitle: string;
  category: string;
  tierName: string;
  quantity: number;
  date: string;
  time: string;
  venue: string;
  city: string;
  gate: string;
  seatZone: string;
  image: string;
  qrPayload: string;
  pricePaid: number;
}
