import { cn } from "@/components/lib/utils";

export function Mdx({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <article className={cn(
      "prose prose-zinc lg:prose-lg dark:prose-invert",
      "prose-pre:overflow-x-auto prose-pre:p-4 prose-pre:px-0 prose-pre:!bg-muted prose-pre:rounded-lg prose-pre:border prose-pre:border-ringed",
    )}
    >
      {children}
    </article>
  );
}
