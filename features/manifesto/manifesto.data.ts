import { Flame, Users, Compass, Shield } from "lucide-react";
import type { ManifestoStat } from "./manifesto.types";

export const manifestoStatsData: ManifestoStat[] = [
  {
    label: "NIGHTS CURATED",
    value: "120+",
    icon: Flame,
    desc: "Across warehouses, amphitheaters & secret rooftops",
  },
  {
    label: "ATTENDEES UNITED",
    value: "54,000+",
    icon: Users,
    desc: "Music lovers, artists, creators & night owls",
  },
  {
    label: "CITIES ACTIVE",
    value: "04",
    icon: Compass,
    desc: "Guwahati, Shillong, Jorhat, Dibrugarh",
  },
  {
    label: "AUTHENTICITY RATING",
    value: "99.4%",
    icon: Shield,
    desc: "Official tickets, zero counterfeit guarantee",
  },
];
