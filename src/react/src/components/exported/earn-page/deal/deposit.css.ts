import { style } from "@vanilla-extract/css";
import { card } from "@/components/ui/card.css";
import { flex } from "@/components/ui/flex.css";
import { rounding } from "@/theme/constants.css";
import { themeVars } from "@/theme/theme.css";

export const flowArrowContainer = style([
  flex({ justify: "center", items: "center" }),
  {
    margin: "-22px 0",
  },
]);

export const flowArrow = style([
  flex({ justify: "center", items: "center" }),
  rounding({ size: "md" }),
  {
    width: "24px",
    height: "24px",

    position: "relative",
    zIndex: 1,

    background: themeVars.bgAccent,
    border: `1px solid ${themeVars.bgPrimary}`,
    color: themeVars.textPrimary,
  },
]);

export const outputCard = style([
  card({}),
  rounding({ size: "lg" }),
  {
    background: themeVars.bgAccent,
  },
]);
