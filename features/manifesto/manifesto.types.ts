import type { LucideIcon } from "lucide-react";

export interface ManifestoStat {
  label: string;
  value: string;
  icon: LucideIcon;
  desc: string;
}

export interface ManifestoData {
  title: string;
  lead: string;
  body: string;
  quote: string;
  stampCity: string;
}
