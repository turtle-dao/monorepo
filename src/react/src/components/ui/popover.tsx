import type { ComponentPropsWithoutRef, ComponentRef, ReactElement, Ref } from "react";
import { useThemeApply } from "@/theme/apply";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { clsx } from ".";
import { popover } from "./popover.css";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

function PopoverContent({
  className,
  style,
  align = "center",
  sideOffset = 4,
  ref,
  ...props
}: ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
  ref?: Ref<ComponentRef<typeof PopoverPrimitive.Content>>;
}): ReactElement {
  const { style: themeStyle } = useThemeApply();

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={clsx(
          popover,
          className,
        )}
        style={{
          ...themeStyle,
          ...style,
        }}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger };
