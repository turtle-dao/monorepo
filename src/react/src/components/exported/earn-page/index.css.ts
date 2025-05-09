import { flex } from "@/components/ui/flex.css";
import { text } from "@/components/ui/text.css";
import { themeVars } from "@/theme/theme.css";
import { style } from "@vanilla-extract/css";

export const main = style([
  flex({ justify: "center", items: "stretch" }),
  {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: themeVars.bgSecondary,
  },
]);

export const pageContainer = style([
  flex({ direction: "column", items: "stretch" }),
  {
    width: "100%",
    maxWidth: "1200px",
    padding: "0 1rem",
  },
]);

export const header = style([
  flex({ justify: "between", items: "center" }),
  {
    position: "sticky",
    top: 0,
    zIndex: 100,
    margin: "0 -0.5rem",

    minHeight: "4rem",
    maxHeight: "4rem",
    padding: "0 1rem",

    background: themeVars.bgSecondary,
    border: `1px solid ${themeVars.borderColor}`,
    borderTop: "none",
    borderBottomLeftRadius: `calc(${themeVars.borderRadius} * 2)`,
    borderBottomRightRadius: `calc(${themeVars.borderRadius} * 2)`,
  },
]);

export const headerText = style([text(), {
  fontSize: "1.5rem",
  fontWeight: 600,
}]);
