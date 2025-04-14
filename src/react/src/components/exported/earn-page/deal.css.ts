import { card } from "@/components/ui/card.css";
import { flexItem } from "@/components/ui/flex.css";
import { padding, rounding } from "@/theme/constants.css";
import { style } from "@vanilla-extract/css";

export const actionCard = style([
  card,
  rounding({ size: "xl" }),
  {
    position: "sticky",
    top: "6rem",
    minWidth: "350px",
    maxWidth: "350px",
  },
]);

export const content = style([
  flexItem,
  padding(),
]);
