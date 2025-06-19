export const TAB_TURTLE_EARN = "earn";
export const TAB_DISCOVER = "discover";
export const TAB_PORTFOLIO = "portfolio";

export const tabButtons = [
  { label: "Portfolio", value: TAB_PORTFOLIO },
  { label: "Earn", value: TAB_TURTLE_EARN },
  { label: "Discover", value: TAB_DISCOVER },
] as const;

export type TabType = (typeof tabButtons)[number]["value"];
