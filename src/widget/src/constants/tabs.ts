export const TAB_TURTLE_EARN = "swap";
export const TAB_YOUR_POSITIONS = "positions";

export const tabButtons = [
  { label: "Turtle Earn", value: TAB_TURTLE_EARN },
  { label: "Your Positions", value: TAB_YOUR_POSITIONS },
] as const;

export type TabType = (typeof tabButtons)[number]["value"];
