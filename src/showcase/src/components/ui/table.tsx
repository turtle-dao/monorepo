import { cn } from "@/components/lib/utils";

import * as React from "react";

function Table({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableElement> & {
  ref?: React.RefObject<HTMLTableElement>;
}): React.ReactElement {
  return (
    <div className="relative w-full not-prose rounded-xl overflow-hidden border">
      <table
        ref={ref}
        className={cn("w-full caption-bottom text-sm bg-card text-card-foreground", className)}
        {...props}
      />
    </div>
  );
}
Table.displayName = "Table";

function TableHeader({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement> & {
  ref?: React.RefObject<HTMLTableSectionElement>;
}): React.ReactElement {
  return (
    <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
  );
}
TableHeader.displayName = "TableHeader";

function TableBody({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement> & {
  ref?: React.RefObject<HTMLTableSectionElement>;
}): React.ReactElement {
  return (
    <tbody
      ref={ref}
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}
TableBody.displayName = "TableBody";

function TableFooter({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement> & {
  ref?: React.RefObject<HTMLTableSectionElement>;
}): React.ReactElement {
  return (
    <tfoot
      ref={ref}
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}
TableFooter.displayName = "TableFooter";

function TableRow({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement> & {
  ref?: React.RefObject<HTMLTableRowElement>;
}): React.ReactElement {
  return (
    <tr
      ref={ref}
      className={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className,
      )}
      {...props}
    />
  );
}
TableRow.displayName = "TableRow";

function TableHead({
  ref,
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement> & {
  ref?: React.RefObject<HTMLTableCellElement>;
}): React.ReactElement {
  return (
    <th
      ref={ref}
      className={cn(
        "h-10 px-3 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}
TableHead.displayName = "TableHead";

function TableCell({
  ref,
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement> & {
  ref?: React.RefObject<HTMLTableCellElement>;
}): React.ReactElement {
  return (
    <td
      ref={ref}
      className={cn(
        "px-3 py-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}
TableCell.displayName = "TableCell";

function TableCaption({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableCaptionElement> & {
  ref?: React.RefObject<HTMLTableCaptionElement>;
}): React.ReactElement {
  return (
    <caption
      ref={ref}
      className={cn("py-2 text-sm text-muted-foreground bg-card border-t", className)}
      {...props}
    />
  );
}
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
