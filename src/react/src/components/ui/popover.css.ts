import {
  enterKeyframes,
  exitKeyframes,
  turtleEnterOpacity,
  turtleEnterScale,
  turtleEnterTranslateX,
  turtleEnterTranslateY,
  turtleExitOpacity,
  turtleExitScale,
} from "@/theme/animations.css";
import { padding, rounding } from "@/theme/constants.css";
import { themeVars } from "@/theme/theme.css";
import { createVar, style } from "@vanilla-extract/css";

export const popoverWidth = createVar({
  initialValue: "225px",
  inherits: false,
  syntax: "<length>",
});

export const popover = style([
  rounding({ size: "lg" }),
  padding(),
  {
    zIndex: 50,
    width: popoverWidth,
    border: `1px solid ${themeVars.borderColor}`,
    fontWeight: 500,
    background: themeVars.bgPrimary,
    outline: "none",
    transformOrigin: "var(--radix-popover-content-transform-origin)",

    selectors: {
      "&[data-state='open']": {
        animation: `${enterKeyframes} 150ms ease`,
        vars: {
          [turtleEnterOpacity]: "0",
          [turtleEnterScale]: "0.95",
        },
      },
      "&[data-state='closed']": {
        animation: `${exitKeyframes} 150ms ease`,
        vars: {
          [turtleExitOpacity]: "0",
          [turtleExitScale]: "0.95",
        },
      },
      "&[data-side='bottom']": {
        vars: {
          [turtleEnterTranslateY]: "-1rem",
        },
      },
      "&[data-side='left']": {
        vars: {
          [turtleEnterTranslateX]: "-1rem",
        },
      },
      "&[data-side='right']": {
        vars: {
          [turtleEnterTranslateX]: "1rem",
        },
      },
      "&[data-side='top']": {
        vars: {
          [turtleEnterTranslateY]: "1rem",
        },
      },
    },
  },
]);

export const header = style({
  padding: `0 calc(${themeVars.padding} * 0.375)`,
  paddingBottom: `calc(${themeVars.padding} * 0.5)`,
  marginBottom: `calc(${themeVars.padding} * -0.175)`,
  background: themeVars.bgPrimary,
});

export const popoverFooter = style({
  marginTop: `calc(${themeVars.padding} * 0.5)`,
  padding: `0 calc(${themeVars.padding} * 0.375)`,
});

export const active = style({
  width: "6px",
  height: "6px",
  marginRight: "5px",
  borderRadius: "99999px",
  background: themeVars.buttonBgColor,
});
