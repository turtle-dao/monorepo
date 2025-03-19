import { cn } from "@/components/lib/utils";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";

const Tabs = TabsPrimitive.Root;

function TabsList({
  ref,
  className,
  noBg = false,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
  noBg?: boolean;
  ref?: React.RefObject<React.ElementRef<typeof TabsPrimitive.List>>;
}): React.ReactElement {
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-lg p-1 text-muted-foreground",
        !noBg && "bg-muted border border-ringed",
        className,
      )}
      {...props}
    />
  );
}
TabsList.displayName = TabsPrimitive.List.displayName;

function TabsTrigger({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
  ref?: React.RefObject<React.ElementRef<typeof TabsPrimitive.Trigger>>;
}): React.ReactElement {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
        className,
      )}
      {...props}
    />
  );
}
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

function TabsContent({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & {
  ref?: React.RefObject<React.ElementRef<typeof TabsPrimitive.Content>>;
}): React.ReactElement {
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    />
  );
}
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
