export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  membership: "VIP Founder" | "VIP Gold" | "Citizen" | string;
  points: number;
  city: string;
  avatar: string;
}
