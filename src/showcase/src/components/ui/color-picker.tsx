import type { IColor } from "react-color-palette";
import * as React from "react";
import { ColorPicker as ColorPickerComponent } from "react-color-palette";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface IColorPickerProps {
  readonly height?: number;
  readonly hideAlpha?: boolean;
  readonly hideInput?: (keyof IColor)[] | boolean;
  readonly color: IColor;
  readonly disabled?: boolean;
  readonly onChange: (color: IColor) => void;
  readonly onChangeComplete?: (color: IColor) => void;
}

export interface ColorPickerProps extends IColorPickerProps {
  color: IColor;
}

function ColorPicker({
  ref,
  color,
  ...props
}: ColorPickerProps & {
  ref?: React.RefObject<typeof ColorPickerComponent>;
}): React.ReactElement {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Popover>
          <PopoverTrigger asChild>
            <div className="w-14 h-8 rounded-md border border-ringed cursor-pointer" style={{ backgroundColor: color.hex }} />
          </PopoverTrigger>
          <PopoverContent>
            <ColorPickerComponent
              ref={ref}
              color={color}
              {...props}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="text-sm text-foreground font-medium">
        {color.hex}
      </div>
    </div>
  );
}

export { ColorPicker };
