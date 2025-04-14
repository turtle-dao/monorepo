import { type FC, type ReactElement, type ReactNode, useState } from "react";
import { Button } from "./button";
import { Flex } from "./flex";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { popoverHeader } from "./popover.css";
import { Text } from "./text";

export function ComboBox<T>({
  title,
  value: [_, setValue],
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
        <Flex direction="column" gap="xs" items="stretch">
          {title && (
            <Text bold size="sm" color="secondary" className={popoverHeader}>
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
              <Render value={option} />
            </Button>
          ))}
        </Flex>
      </PopoverContent>
    </Popover>
  );
}
