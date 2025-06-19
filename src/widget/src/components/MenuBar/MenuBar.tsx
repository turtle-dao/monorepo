import type { JSX } from "react";
import { useCallback, useEffect, useRef } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/shadcn/select";
import { cn } from "@/utils";

interface PartnerTableFilterProps<T extends string> {
  selectedValue: T;
  onValueChange: (value: T) => void;
  items: {
    label: string;
    value: T;
  }[];
  className?: string;
  selectClassName?: string;
}

export function MenuBar<T extends string>({
  selectedValue,
  onValueChange,
  items,
  className,
  selectClassName,
}: PartnerTableFilterProps<T>): JSX.Element {
  const handleClick = (value: T): void => {
    onValueChange(value);
  };

  const containerRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);

  // Function to update the indicator position and size based on the active button
  const updateIndicatorPosition = useCallback(() => {
    if (!containerRef.current || !indicatorRef.current)
      return;

    const activeButton = containerRef.current.querySelector(`[data-active="true"]`) as HTMLElement;
    if (activeButton) {
      indicatorRef.current.style.width = `${activeButton.offsetWidth}px`;
      indicatorRef.current.style.left = `${activeButton.offsetLeft}px`;
    }
  }, []);

  // Create ResizeObserver to handle indicator container size changes
  useEffect(() => {
    updateIndicatorPosition();

    const resizeObserver = new ResizeObserver(updateIndicatorPosition);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [selectedValue, updateIndicatorPosition]);

  const labelFromSelectedValue = items.find(item => item.value === selectedValue)?.label;

  return (
    <>
      <div
        ref={containerRef}
        className={cn(
          "relative hidden h-10 w-full gap-2.5 rounded-full border border-wise-white/10 bg-[var(--color-surface-primary)] dark:bg-[var(--color-surface-primary-dark)] font-medium sm:flex",
          className,
        )}
      >
        <div
          ref={indicatorRef}
          className="absolute bottom-0 h-full origin-left rounded-full bg-[var(--color-surface-secondary)] dark:bg-[var(--color-surface-secondary-dark)] transition-all duration-300"
        />

        {items.map(button => (
          <button
            type="button"
            key={button.label}
            data-active={selectedValue === button.value}
            className={`relative z-[1] w-full whitespace-nowrap rounded-full px-2 py-[6px] cursor-pointer text-sm text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] transition-all sm:grow-0 ${
              selectedValue === button.value ? "!text-[var(--color-text-accent)] dark:!text-[var(--color-text-accent-dark)]" : "hover:text-[var(--color-text-accent)] dark:hover:text-[var(--color-text-accent-dark)]"
            }`}
            onClick={() => handleClick(button.value)}
          >
            {button.label}
          </button>
        ))}
      </div>
      <div className={cn("block w-full sm:hidden", selectClassName)}>
        <Select value={selectedValue} onValueChange={onValueChange}>
          <SelectTrigger className="h-[38px] gap-2 rounded-full border border-wise-white/10 bg-ninja-black p-0 pr-2.5 text-wise-white/50 shadow-[0px_0px_40px_0px_rgba(0,0,0,0.40)] focus:ring-0">
            <div className="flex h-full w-[calc(100%-40px)] flex-1 items-center justify-center rounded-full border border-wise-white/10 bg-wise-white/10 capitalize text-neon-green">
              <SelectValue>{labelFromSelectedValue}</SelectValue>
            </div>
          </SelectTrigger>
          <SelectContent className="z-[9999] min-w-[200px] rounded-[19px] bg-ninja-black px-0.5 py-1 shadow-[0px_0px_40px_0px_rgba(0,0,0,0.40)]">
            {items.map(({ label, value }, index) => (
              <SelectItem
                key={label}
                value={value}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-full border border-wise-white/10 bg-ninja-black p-2 hover:bg-wise-white/10",
                  index !== 0 && "mt-2",
                )}
              >
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
