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
import { style } from "@vanilla-extract/css";

export const popover = style([
  rounding({ size: "lg" }),
  padding(),
  {
    zIndex: 50,
    width: "225px",
    border: `1px solid ${themeVars.borderColor}`,
    fontWeight: 500,
    background: themeVars.bgPrimary,
    outline: "none",
    transformOrigin: "var(--radix-popover-content-transform-origin)",

    // TODO: Shadow?

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

export const popoverHeader = style({
  marginBottom: `calc(${themeVars.padding} * 0.5)`,
  padding: `0 calc(${themeVars.padding} * 0.375)`,
});

export const popoverFooter = style({
  marginTop: `calc(${themeVars.padding} * 0.5)`,
  padding: `0 calc(${themeVars.padding} * 0.375)`,
});
