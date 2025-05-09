import { card } from "@/components/ui/card.css";
import { flex } from "@/components/ui/flex.css";
import { padding } from "@/theme/constants.css";
import { themeVars } from "@/theme/theme.css";
import { style } from "@vanilla-extract/css";

export const routeCard = style([
  card({ variant: "secondary" }),
  padding({ size: "lg" }),
  {
    background: themeVars.bgTranslucent,
    border: "none",
  },
]);

export const subRouteSeparator = style({
  height: 2,
  background: themeVars.bgTranslucent,
  margin: "0.375rem 0.25rem",
});

export const subRouteCard = style({});

export const indented = style([
  flex({ gap: "md", items: "center" }),
  {
    paddingLeft: "0.5rem",
  },
  {
    ":before": {
      content: "",
      display: "block",
      width: "7px",
      height: "7px",
      background: themeVars.bgTranslucent,
      borderRadius: "50%",
    },
  },
]);
