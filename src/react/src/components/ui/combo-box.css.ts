import { style } from "@vanilla-extract/css";
import { flex } from "./flex.css";
import * as popover from "./popover.css";

export const content = style([
  flex({ direction: "column", gap: "xs", items: "stretch" }),
  {
    maxHeight: "14rem",
    overflowY: "auto",
  },
]);

export const header = style([
  popover.header,
  {
    position: "sticky",
    top: 0,
    zIndex: 1,
  },
]);
