import { type FC, type ReactElement, type ReactNode, useState } from "react";
import { Button } from "./button";
import * as comboBox from "./combo-box.css";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import * as popover from "./popover.css";
import { Text } from "./text";

export function ComboBox<T>({
  title,
  value: [value, setValue],
  options,
  itemKey: key,
  render: Render,
  children,
  asChild,
}: {
  title?: string;
  value: [value: T, setValue: (value: T) => void];
  options: readonly T[];
  itemKey: (option: T) => string;
  render: FC<{ value: T }>;
  children?: ReactNode;
  asChild?: boolean;
}): ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent>
        <div className={comboBox.content}>
          {title && (
            <Text bold size="sm" color="secondary" className={comboBox.header}>
              {title}
            </Text>
          )}

          {options.map(option => (
            <Button
              key={key(option)}
              asChild={asChild}
              color="ghost"
              size="sm"
              onClick={() => {
                setValue(option);
                setOpen(false);
              }}
            >
              {value === option && (
                <div className={popover.active} />
              )}

              <Render value={option} />
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
