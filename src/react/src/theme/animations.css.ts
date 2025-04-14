import { createVar, keyframes } from "@vanilla-extract/css";
import { varDefault } from "./utils";

export const turtleEnterOpacity = createVar();
export const turtleEnterTranslateX = createVar();
export const turtleEnterTranslateY = createVar();
export const turtleEnterScale = createVar();
export const turtleEnterRotate = createVar();

export const enterKeyframes = keyframes({
  from: {
    opacity: varDefault(turtleEnterOpacity, "1"),
    transform: `translate3d(${varDefault(turtleEnterTranslateX, "0")}, ${varDefault(turtleEnterTranslateY, "0")}, 0) scale3d(${varDefault(turtleEnterScale, "1")}, ${varDefault(turtleEnterScale, "1")}, ${varDefault(turtleEnterScale, "1")}) rotate(${varDefault(turtleEnterRotate, "0")})`,
  },
});

export const turtleExitOpacity = createVar();
export const turtleExitTranslateX = createVar();
export const turtleExitTranslateY = createVar();
export const turtleExitScale = createVar();
export const turtleExitRotate = createVar();

export const exitKeyframes = keyframes({
  to: {
    opacity: varDefault(turtleExitOpacity, "0"),
    transform: `translate3d(${varDefault(turtleExitTranslateX, "0")}, ${varDefault(turtleExitTranslateY, "0")}, 0) scale3d(${varDefault(turtleExitScale, "1")}, ${varDefault(turtleExitScale, "1")}, ${varDefault(turtleExitScale, "1")}) rotate(${varDefault(turtleExitRotate, "0")})`,
  },
});
