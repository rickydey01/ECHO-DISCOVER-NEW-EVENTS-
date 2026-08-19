export interface TicketPass {
  id: string;
  serialNumber: string;
  eventTitle: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  image: string;
  tierName: string;
  quantity: number;
  totalPaid: number;
  qrCodeUrl?: string;
  status: "ACTIVE" | "USED" | "UPCOMING";
  gate: string;
  seatZone: string;
}

export interface BookingDetails {
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

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  membership: string;
  city: string;
  avatar: string;
  points: number;
}
