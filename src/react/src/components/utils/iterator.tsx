import { Fragment, type ReactElement, type ReactNode } from "react";

export function Iterator<T>({
  items,
  render: Render,
  join: Join,
  keyFn,
}: {
  items: T[];
  render: ({ item, index }: { item: T; index: number }) => ReactNode;
  keyFn: (item: T) => string;
  join?: ({ index }: { index: number }) => ReactNode;
}): ReactElement {
  return (
    <>
      {items.map((item, index) => (
        <Fragment key={keyFn(item)}>
          {index > 0 && Join && <Join index={index - 1} />}
          <Render item={item} index={index} />
        </Fragment>
      ))}
    </>
  );
}
