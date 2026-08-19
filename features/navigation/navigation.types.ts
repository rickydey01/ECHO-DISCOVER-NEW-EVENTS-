export interface NavRoute {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface NavAction {
  type: "modal" | "link";
  label: string;
  actionId?: "passes" | "profile";
}
